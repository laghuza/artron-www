"use client";

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  SPHERE_R,
  MIN_D,
  MAX_D,
  MAP_MIN_D,
  MAP_MAX_D,
  MAP_CAM,
  DEPTH_INERT,
  DEPTH_LIVE,
  latLonToVec3,
  homePosition,
  fitDistance,
  smoothstep,
  damp,
  makeLineMaterial,
  hardenLineMaterial,
  pinInFrustum,
  featureShapes,
  outlinePositions,
  projectWorld,
  radialGlowTexture,
  Adm1Feature,
  DEPTH_FADE_GLSL,
  LINE_CYAN,
} from "./EnneaMath";
import { EnneaRegion, EnneaVenue, EnneaStrings, ViewMode } from "./types";
import { soundEngine } from "./EnneaAudioEngine";
import { createSphericalCountryMesh, GlobeCountryVisual } from "./EnneaGlobeCountries";
import { Volume2, VolumeX, Plus, Minus, RotateCcw, Crosshair } from "lucide-react";

interface EnneaSceneCanvasProps {
  viewMode: ViewMode;
  accent?: string;
  regions: EnneaRegion[];
  venues: EnneaVenue[];
  t: EnneaStrings;
  adm1Url?: string;
  onEnterGeorgia: () => void;
  onExitToGlobe: () => void;
  onSelectRegion: (id: string | null) => void;
  onSelectVenue: (venue: EnneaVenue | null) => void;
  selectedRegion: string | null;
  selectedVenue: EnneaVenue | null;
  activeCore: string | null;
}

export const EnneaSceneCanvas: React.FC<EnneaSceneCanvasProps> = ({
  viewMode,
  accent = "#7FD4FF",
  regions,
  venues,
  t,
  adm1Url = "/geo/georgia-adm1.json",
  onEnterGeorgia,
  onExitToGlobe,
  onSelectRegion,
  onSelectVenue,
  selectedRegion,
  selectedVenue,
  activeCore,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [soundOn, setSoundOn] = useState(soundEngine.isSoundEnabled());
  const [mapStatus, setMapStatus] = useState<"IDLE" | "LOADING" | "READY" | "ERROR">("IDLE");

  const pinLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const regionLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const stageBridgeRef = useRef<{
    flyTo: (mode: ViewMode) => void;
    focusRegion: (id: string | null) => void;
    focusVenue: (id: string | null) => void;
  } | null>(null);

  const viewRef = useRef<ViewMode>(viewMode);
  const hoverRegionRef = useRef<string | null>(null);
  const selectedRegionRef = useRef<string | null>(selectedRegion);
  const selectedVenueRef = useRef<string | null>(selectedVenue?.id ?? null);
  const hotRef = useRef<boolean>(!!activeCore);
  const userZoomed = useRef<boolean>(false);

  const animState = useRef({
    isTransitioning: false,
    progress: 0,
    to: "GLOBE" as ViewMode,
    startCamPos: new THREE.Vector3(),
    targetCamPos: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
    targetLookAt: new THREE.Vector3(),
    stageMix: 0,
    haloAlpha: 0.6,
    pulseAlpha: 0.35,
  });

  useLayoutEffect(() => {
    viewRef.current = viewMode;
    selectedRegionRef.current = selectedRegion;
    selectedVenueRef.current = selectedVenue?.id ?? null;
    hotRef.current = !!activeCore;
  }, [viewMode, selectedRegion, selectedVenue, activeCore]);

  const propsRef = useRef({ accent, adm1Url, regions, venues });
  useLayoutEffect(() => {
    propsRef.current = { accent, adm1Url, regions, venues };
  });

  const handlersRef = useRef({ onEnterGeorgia, onExitToGlobe, onSelectRegion, onSelectVenue });
  useLayoutEffect(() => {
    handlersRef.current = { onEnterGeorgia, onExitToGlobe, onSelectRegion, onSelectVenue };
  });

  /* Zoom handlers */
  const handleZoom = useCallback((factor: number) => {
    const controls = controlsRef.current;
    if (!controls) return;
    soundEngine.cue("zoom");
    userZoomed.current = true;
    const cam = controls.object;
    const dir = cam.position.clone().sub(controls.target);
    const next = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
    cam.position.copy(controls.target).add(dir.setLength(next));
    controls.update();
  }, []);

  const handleReset = useCallback(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    soundEngine.cue("reset");
    userZoomed.current = false;
    if (viewRef.current === "GEORGIA_DETAIL") {
      handlersRef.current.onSelectVenue(null);
      handlersRef.current.onSelectRegion(null);
      controls.object.position.copy(MAP_CAM);
      controls.target.set(0, 0, 0);
      controls.update();
      return;
    }
    const d = THREE.MathUtils.clamp(
      fitDistance((controls.object as THREE.PerspectiveCamera).fov, (controls.object as THREE.PerspectiveCamera).aspect),
      MIN_D,
      controls.maxDistance
    );
    controls.object.position.copy(homePosition(41.7, 44.8, d));
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  /* ────────────────────── Three.js Lifecycle ────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const { accent: accStr, adm1Url: url, regions: regList, venues: venList } = propsRef.current;
    const accentColor = new THREE.Color(accStr);
    const titanium = new THREE.Color(0xc9d8e0);
    const ice = new THREE.Color(0xe8f8ff);
    const disposables: Array<{ dispose: () => void }> = [];
    let disposed = false;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d12, 0.03);

    const camera = new THREE.PerspectiveCamera(38, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.copy(homePosition(41.7, 44.8));

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = MIN_D;
    controls.maxDistance = MAX_D;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.7;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.32;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI - 0.35;
    controlsRef.current = controls;

    const world = new THREE.Group();
    scene.add(world);
    const globe = new THREE.Group();
    world.add(globe);
    const mapStage = new THREE.Group();
    mapStage.visible = false;
    world.add(mapStage);

    scene.add(new THREE.AmbientLight(0x93b6c9, 0.85));
    const keyLight = new THREE.DirectionalLight(0xdff2ff, 1.25);
    keyLight.position.set(2.6, 5.2, 3.1);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(accentColor.getHex(), 0.6);
    rimLight.position.set(-3.4, 2.2, -2.8);
    scene.add(rimLight);

    /* ── STAGE 1: GLOBE ── */
    const shellGeo = new THREE.SphereGeometry(SPHERE_R * 0.975, 64, 48);
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x0b1117, transparent: true, opacity: 1 });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.frustumCulled = false;
    shell.renderOrder = 0;
    globe.add(shell);
    disposables.push(shellGeo, shellMat);

    const N = 2400;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const positions = new Float32Array(N * 3);
    const seeds = new Float32Array(N);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      const v = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(SPHERE_R);
      pts.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
      seeds[i] = Math.random();
    }

    const uniforms = {
      uColor: { value: accentColor.clone() },
      uHot: { value: titanium.clone() },
      uSize: { value: 2.8 },
      uOpacity: { value: 0.92 },
      uTime: { value: 0 },
      uFogDensity: { value: 0.03 },
      uBack: { value: 0.15 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uGlobal: { value: 1 },
    };

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    pointGeo.computeBoundingSphere();
    const pointMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uSize;
        uniform float uTime;
        uniform float uPixelRatio;
        ${DEPTH_FADE_GLSL}
        varying float vSeed;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vFade = depthFade(mv, normalize(position));
          vSeed = aSeed;
          float tw = 0.75 + 0.45 * sin(uTime * 1.4 + aSeed * 31.4);
          gl_PointSize = uSize * tw * uPixelRatio * (6.5 / max(0.001, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uHot;
        uniform float uOpacity;
        uniform float uGlobal;
        varying float vFade;
        varying float vSeed;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float shape = smoothstep(0.5, 0.05, d);
          vec3 col = mix(uColor, uHot, step(0.93, vSeed));
          gl_FragColor = vec4(col, shape * vFade * uOpacity * uGlobal);
        }
      `,
    });
    const pointCloud = new THREE.Points(pointGeo, pointMat);
    pointCloud.frustumCulled = false;
    pointCloud.renderOrder = 2;
    globe.add(pointCloud);
    disposables.push(pointGeo, pointMat);

    /* Lattice lines between Fibonacci neighbors */
    const segments: number[] = [];
    const maxLen = SPHERE_R * 0.115;
    for (const off of [8, 13, 21, 34, 55]) {
      for (let i = 0; i + off < N; i++) {
        const a = pts[i];
        const b = pts[i + off];
        if (a.distanceTo(b) > maxLen) continue;
        segments.push(a.x * 1.003, a.y * 1.003, a.z * 1.003, b.x * 1.003, b.y * 1.003, b.z * 1.003);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    lineGeo.computeBoundingSphere();
    const lineMat = makeLineMaterial(LINE_CYAN, 0.65);
    const latticeLines = new THREE.LineSegments(lineGeo, lineMat);
    latticeLines.frustumCulled = false;
    latticeLines.renderOrder = 1;
    globe.add(latticeLines);
    disposables.push(lineGeo, lineMat);

    /* Atmospheric Fresnel rim glow */
    const rimGeo = new THREE.SphereGeometry(SPHERE_R * 1.012, 64, 48);
    const rimMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      uniforms: {
        uRim: { value: accentColor.clone().lerp(titanium, 0.45) },
        uPower: { value: 3.4 },
        uGlobal: uniforms.uGlobal,
      },
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(mat3(modelViewMatrix) * normal);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uRim; uniform float uPower; uniform float uGlobal;
        varying vec3 vN; varying vec3 vV;
        void main() {
          float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), uPower);
          gl_FragColor = vec4(uRim, f * 0.88 * uGlobal);
        }
      `,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.frustumCulled = false;
    rimMesh.renderOrder = 3;
    globe.add(rimMesh);
    disposables.push(rimGeo, rimMat);

    /* Georgia beacon anchor & raycast target (No central blob overlaying Georgia) */
    const beacon = new THREE.Group();
    const beaconPos = latLonToVec3(41.7, 44.8, SPHERE_R * 1.005);
    beacon.position.copy(beaconPos);
    beacon.lookAt(beaconPos.clone().multiplyScalar(2));
    beacon.frustumCulled = false;
    beacon.renderOrder = 4;
    globe.add(beacon);

    const beaconHitGeo = new THREE.SphereGeometry(0.26, 14, 12);
    const beaconHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const beaconHit = new THREE.Mesh(beaconHitGeo, beaconHitMat);
    beacon.add(beaconHit);
    disposables.push(beaconHitGeo, beaconHitMat);

    /* Far field stars */
    const farPos: number[] = [];
    for (let i = 0; i < 450; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 15);
      farPos.push(v.x, v.y, v.z);
    }
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute("position", new THREE.Float32BufferAttribute(farPos, 3));
    farGeo.computeBoundingSphere();
    const farMat = new THREE.PointsMaterial({
      color: accentColor.getHex(),
      size: 0.055,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      fog: false,
    });
    const field = new THREE.Points(farGeo, farMat);
    world.add(field);
    disposables.push(farGeo, farMat);

    /* ── STAGE 2: GEORGIA EXTRUDED MAP ── */
    interface RegionEntry {
      id: string;
      name: string;
      live: boolean;
      mesh: THREE.Mesh;
      faceMat: THREE.MeshStandardMaterial;
      borderMat: THREE.LineBasicMaterial;
      glowMat: THREE.LineBasicMaterial;
      top: number;
      center: THREE.Vector3;
    }
    interface PinEntry {
      id: string;
      group: THREE.Group;
      stemMat: THREE.MeshBasicMaterial;
      headMat: THREE.MeshBasicMaterial;
      haloMat: THREE.SpriteMaterial;
      ringMat: THREE.MeshBasicMaterial;
      ring: THREE.Mesh;
      head: THREE.Mesh;
      anchor: THREE.Vector3;
      fan: number;
      slot: number;
      down: boolean;
      seed: number;
    }

    const regionEntries: RegionEntry[] = [];
    const pinEntries: PinEntry[] = [];
    const mapMeshes: THREE.Object3D[] = [];
    const pinHits: THREE.Object3D[] = [];
    const mapFadeMats: Array<THREE.Material & { opacity: number }> = [];
    const baseOpacity = new Map<THREE.Material, number>();

    const registerFade = (m: THREE.Material & { opacity: number }, base = m.opacity) => {
      m.transparent = true;
      baseOpacity.set(m, base);
      mapFadeMats.push(m);
    };

    const regionFor = (shapeName: string) =>
      regList.find((r) => r.shapeNames.some((s) => s.toLowerCase() === String(shapeName).toLowerCase())) ?? null;

    const pinGlow = radialGlowTexture();
    disposables.push(pinGlow);

    const buildPin = (venue: EnneaVenue, top: number, idx: number, siblings: number) => {
      const col = new THREE.Color(venue.accent);
      const group = new THREE.Group();
      const hubEntry = regionEntries.find((r) => r.id === venue.regionId);

      /* Fan clustered venues in Tbilisi */
      const anchor =
        siblings > 1 && hubEntry
          ? new THREE.Vector3(
              hubEntry.center.x + Math.cos(-Math.PI / 2 + (idx * 2 * Math.PI) / siblings) * 0.11,
              top,
              hubEntry.center.z + Math.sin(-Math.PI / 2 + (idx * 2 * Math.PI) / siblings) * 0.11
            )
          : projectWorld(venue.lon, venue.lat, top);
      group.position.copy(anchor);
      mapStage.add(group);

      /* Tall vertical laser light beam */
      const H = 0.42;
      const stemGeo = new THREE.CylinderGeometry(0.006, 0.006, H, 6, 1, true);
      const stemMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = H / 2;
      group.add(stem);
      disposables.push(stemGeo, stemMat);
      registerFade(stemMat, 0.55);

      /* Rotating Octahedron diamond head */
      const headGeo = new THREE.OctahedronGeometry(0.042, 0);
      const headMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 1 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = H;
      group.add(head);
      disposables.push(headGeo, headMat);
      registerFade(headMat, 1);

      /* Glow halo sprite at the top */
      const haloM = new THREE.SpriteMaterial({
        map: pinGlow,
        color: col,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const hl = new THREE.Sprite(haloM);
      hl.scale.setScalar(0.32);
      hl.position.y = H;
      group.add(hl);
      disposables.push(haloM);
      registerFade(haloM, 0.75);

      /* Ground pulsing ripple ring */
      const ringGeo2 = new THREE.RingGeometry(0.05, 0.062, 40);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const gRing = new THREE.Mesh(ringGeo2, ringMat2);
      gRing.rotation.x = -Math.PI / 2;
      gRing.position.y = 0.004;
      group.add(gRing);
      disposables.push(ringGeo2, ringMat2);
      registerFade(ringMat2, 0.8);

      /* Invisible click target */
      const hitGeo = new THREE.SphereGeometry(0.12, 10, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.y = H;
      hit.userData.venueId = venue.id;
      group.add(hit);
      pinHits.push(hit);
      disposables.push(hitGeo, hitMat);
      pinInFrustum(group);

      pinEntries.push({
        id: venue.id,
        group,
        stemMat,
        headMat,
        haloMat: haloM,
        ringMat: ringMat2,
        ring: gRing,
        head,
        anchor: siblings > 1 && hubEntry ? hubEntry.center.clone().setY(top + H) : anchor.clone().setY(top + H),
        fan: 14 + idx * 50,
        slot: idx,
        down: siblings === 1,
        seed: Math.random() * 6.28,
      });
    };

    const buildMap = (features: Adm1Feature[]) => {
      const built = new Set<string>();
      for (const feature of features) {
        const shapeName = String(feature.properties?.shapeName ?? "");
        const shapes = featureShapes(feature);
        if (!shapes.length) continue;
        const region = regionFor(shapeName);
        const live = !!region?.live;
        const top = live ? DEPTH_LIVE : DEPTH_INERT;

        const geo = new THREE.ExtrudeGeometry(shapes, { depth: top, bevelEnabled: false, curveSegments: 2 });
        geo.rotateX(-Math.PI / 2);
        geo.computeVertexNormals();

        const faceMat = new THREE.MeshStandardMaterial({
          color: live ? 0x16222c : 0x0f171e,
          roughness: 0.66,
          metalness: 0.22,
          emissive: new THREE.Color(live ? accentColor.getHex() : 0x0a1016),
          emissiveIntensity: live ? 0.14 : 0.04,
          transparent: true,
          opacity: 1,
        });
        geo.computeBoundingSphere();
        const mesh = new THREE.Mesh(geo, faceMat);
        mesh.frustumCulled = false;
        mesh.userData.regionId = region?.id ?? null;
        mapStage.add(mesh);
        mapMeshes.push(mesh);
        disposables.push(geo, faceMat);
        registerFade(faceMat, 1);

        /* Crisp borders + elevated glow border */
        const outline = outlinePositions(shapes, top + 0.004);
        const bGeo = new THREE.BufferGeometry();
        bGeo.setAttribute("position", new THREE.Float32BufferAttribute(outline, 3));
        bGeo.computeBoundingSphere();
        const borderMat = makeLineMaterial(live ? 0xffffff : ice.getHex(), live ? 0.95 : 0.3);
        const borderLines = new THREE.LineSegments(bGeo, borderMat);
        borderLines.frustumCulled = false;
        mapStage.add(borderLines);
        disposables.push(bGeo, borderMat);
        registerFade(borderMat, live ? 0.95 : 0.3);

        const glowMat = makeLineMaterial(LINE_CYAN, live ? 0.65 : 0.18);
        const glowLines = new THREE.LineSegments(bGeo, glowMat);
        glowLines.position.y = 0.008;
        glowLines.frustumCulled = false;
        mapStage.add(glowLines);
        disposables.push(glowMat);
        registerFade(glowMat, live ? 0.65 : 0.18);

        const box = new THREE.Box3().setFromObject(mesh);
        const center = box.getCenter(new THREE.Vector3());
        center.y = top;

        if (region && !built.has(region.id)) {
          built.add(region.id);
          regionEntries.push({
            id: region.id,
            name: region.name,
            live,
            mesh,
            faceMat,
            borderMat,
            glowMat,
            top,
            center,
          });
        }
      }

      for (const venue of venList) {
        const entry = regionEntries.find((r) => r.id === venue.regionId);
        const sibs = venList.filter((v) => v.regionId === venue.regionId);
        buildPin(venue, entry ? entry.top : DEPTH_LIVE, sibs.indexOf(venue), sibs.length);
      }

      /* Depth grid pad */
      const grid = new THREE.GridHelper(14, 28, accentColor.getHex(), 0x16222c);
      const gm = grid.material as THREE.Material & { opacity: number };
      gm.opacity = 0.055;
      hardenLineMaterial(gm);
      grid.position.y = -0.01;
      mapStage.add(grid);
      registerFade(gm, 0.055);
      disposables.push(grid.geometry as unknown as { dispose: () => void }, gm);

      pinInFrustum(mapStage);
      setMapStatus("READY");
    };

    let globeCountryVisual: GlobeCountryVisual | null = null;
    setMapStatus("LOADING");
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: { features?: Adm1Feature[] }) => {
        if (disposed) return;
        const feats = json?.features ?? [];
        if (!feats.length) throw new Error("empty");

        // Defer heavy 3D geometry extrusion so scroll thread is never blocked
        requestAnimationFrame(() => {
          if (disposed) return;
          buildMap(feats);

          // Build 3D spherical country contour & skin directly on the globe
          try {
            globeCountryVisual = createSphericalCountryMesh(feats, accentColor.getHex());
            globe.add(globeCountryVisual.group);
            disposables.push(...globeCountryVisual.disposables);
          } catch (err) {
            console.warn("Spherical country mesh error:", err);
          }
        });
      })
      .catch((err) => {
        console.warn("ADM1 map vector load error:", err);
        if (!disposed) setMapStatus("ERROR");
      });

    /* Camera stage mix & transitions */
    const anim = animState.current;
    Object.assign(anim, {
      isTransitioning: false,
      progress: 0,
      to: "GLOBE" as ViewMode,
      stageMix: 0,
      haloAlpha: 0.6,
      pulseAlpha: 0.35,
    });
    anim.startCamPos.set(0, 0, 0);
    anim.targetCamPos.set(0, 0, 0);
    anim.startLookAt.set(0, 0, 0);
    anim.targetLookAt.set(0, 0, 0);

    const applyMix = () => {
      uniforms.uGlobal.value = 1 - anim.stageMix;
      shellMat.opacity = 1 - anim.stageMix;
      lineMat.opacity = 0.65 * (1 - anim.stageMix);
      const beaconOp = 1 - anim.stageMix;
      globeCountryVisual?.setOpacity(beaconOp);
      globe.visible = anim.stageMix < 0.985;
      mapStage.visible = anim.stageMix > 0.015;
      for (const m of mapFadeMats) m.opacity = (baseOpacity.get(m) ?? 1) * anim.stageMix;
      farMat.opacity = 0.35 * (1 - anim.stageMix * 0.45);
    };

    const flyTo = (mode: ViewMode) => {
      controls.enabled = false;
      controls.autoRotate = false;
      controls.enableDamping = false;
      anim.isTransitioning = true;
      anim.progress = 0;
      anim.to = mode;
      anim.startCamPos.copy(camera.position);
      anim.startLookAt.copy(controls.target);

      if (mode === "GEORGIA_DETAIL") {
        anim.targetCamPos.copy(MAP_CAM);
        anim.targetLookAt.set(0, 0, 0);
      } else {
        const d = THREE.MathUtils.clamp(fitDistance(camera.fov, camera.aspect), MIN_D, MAX_D + 1.2);
        anim.targetCamPos.copy(homePosition(41.7, 44.8, d));
        anim.targetLookAt.set(0, 0, 0);
      }
      userZoomed.current = mode === "GEORGIA_DETAIL";
    };

    const focusRegion = (id: string | null) => {
      const entry = id ? regionEntries.find((r) => r.id === id) : null;
      if (!entry) {
        controls.target.set(0, 0, 0);
        controls.object.position.copy(MAP_CAM);
        controls.update();
        return;
      }
      controls.target.copy(entry.center);
      controls.object.position.copy(entry.center).add(new THREE.Vector3(0.2, 1.75, 1.65));
      controls.update();
    };

    const focusVenue = (id: string | null) => {
      const pin = id ? pinEntries.find((p) => p.id === id) : null;
      if (!pin) return;
      controls.target.set(pin.group.position.x + 0.45, pin.group.position.y + 0.2, pin.group.position.z);
      controls.object.position.copy(controls.target).add(new THREE.Vector3(0.2, 1.5, 1.6));
      controls.update();
    };

    stageBridgeRef.current = { flyTo, focusRegion, focusVenue };
    pinInFrustum(globe);
    applyMix();

    /* Pointer Raycasting */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let downAt = { x: 0, y: 0, time: 0 };

    const setNdc = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
    };

    const onPointerMove = (e: PointerEvent) => {
      setNdc(e);
      if (viewRef.current === "GLOBE") {
        const hitTargets = [beaconHit, ...(globeCountryVisual ? globeCountryVisual.group.children : [])];
        const hit = raycaster.intersectObjects(hitTargets, false);
        renderer.domElement.style.cursor = hit.length ? "pointer" : "grab";
        return;
      }
      const pinHit = raycaster.intersectObjects(pinHits, false)[0];
      if (pinHit) {
        renderer.domElement.style.cursor = "pointer";
        hoverRegionRef.current = null;
        return;
      }
      const regionHit = raycaster.intersectObjects(mapMeshes, false)[0];
      const id = (regionHit?.object.userData.regionId as string | null) ?? null;
      renderer.domElement.style.cursor = id ? "pointer" : "grab";
      hoverRegionRef.current = id;
    };

    const onPointerDown = (e: PointerEvent) => {
      downAt = { x: e.clientX, y: e.clientY, time: performance.now() };
    };

    const onPointerUp = (e: PointerEvent) => {
      const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
      if (moved > 6 || performance.now() - downAt.time > 650) return;
      setNdc(e);

      if (viewRef.current === "GLOBE") {
        const hitTargets = [beaconHit, ...(globeCountryVisual ? globeCountryVisual.group.children : [])];
        if (raycaster.intersectObjects(hitTargets, false).length) {
          soundEngine.cue("enter");
          handlersRef.current.onEnterGeorgia();
        }
        return;
      }

      const pinHit = raycaster.intersectObjects(pinHits, false)[0];
      if (pinHit) {
        const vid = pinHit.object.userData.venueId as string;
        const venue = venList.find((v) => v.id === vid) ?? null;
        soundEngine.cue("click");
        handlersRef.current.onSelectVenue(selectedVenueRef.current === vid ? null : venue);
        return;
      }

      const regionHit = raycaster.intersectObjects(mapMeshes, false)[0];
      const rid = (regionHit?.object.userData.regionId as string | null) ?? null;
      if (rid) {
        soundEngine.cue("click");
        handlersRef.current.onSelectRegion(rid);
      } else {
        handlersRef.current.onSelectVenue(null);
      }
    };

    const dom = renderer.domElement;
    dom.style.cursor = "grab";
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointerup", onPointerUp);

    /* Resize & Cached Layout Dimensions (Prevents Layout Thrashing) */
    let cachedW = wrap.clientWidth || 1;
    let cachedH = wrap.clientHeight || 1;

    const resize = () => {
      cachedW = wrap.clientWidth || 1;
      cachedH = wrap.clientHeight || 1;
      const width = cachedW;
      const height = cachedH;
      const pixelRatio = Math.min(window.devicePixelRatio, 2);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      uniforms.uPixelRatio.value = pixelRatio;

      const fit = fitDistance(camera.fov, camera.aspect);
      if (viewRef.current === "GLOBE") {
        controls.maxDistance = Math.max(MAX_D, fit + 0.8);
        if (!userZoomed.current && !anim.isTransitioning) {
          camera.position.copy(homePosition(41.7, 44.8, fit));
          controls.update();
        }
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    /* Animation Loop with Viewport Lifecycle (Pauses when off-screen) */
    const worldPos = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    const proj = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    let isVisible = false;
    let isDisposed = false;

    const placeHud = (node: HTMLDivElement | null | undefined, point: THREE.Vector3, opacity: number, w: number, h: number) => {
      if (!node) return null;
      proj.copy(point).project(camera);
      const x = Math.round((proj.x * 0.5 + 0.5) * w);
      const y = Math.round((-proj.y * 0.5 + 0.5) * h);
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      node.style.opacity = proj.z > 1 ? "0" : opacity.toFixed(3);
      return { x, y };
    };

    const tick = () => {
      if (isDisposed || !isVisible) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      uniforms.uTime.value = time;

      if (anim.isTransitioning) {
        anim.progress += dt * 1.2;
        const t = Math.min(anim.progress, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        camera.position.lerpVectors(anim.startCamPos, anim.targetCamPos, ease);
        controls.target.lerpVectors(anim.startLookAt, anim.targetLookAt, ease);
        camera.lookAt(controls.target);
        camera.updateMatrixWorld();

        const fade = smoothstep(Math.min(1, t * 1.25));
        anim.stageMix = anim.to === "GEORGIA_DETAIL" ? fade : 1 - fade;

        if (t >= 1) {
          anim.isTransitioning = false;
          camera.position.copy(anim.targetCamPos);
          controls.target.copy(anim.targetLookAt);
          if (anim.to === "GLOBE") {
            controls.minDistance = MIN_D;
            controls.maxDistance = Math.max(MAX_D, fitDistance(camera.fov, camera.aspect) + 0.8);
            controls.minPolarAngle = 0.35;
            controls.maxPolarAngle = Math.PI - 0.35;
            userZoomed.current = false;
          } else {
            controls.minDistance = MAP_MIN_D;
            controls.maxDistance = MAP_MAX_D;
            controls.minPolarAngle = 0.18;
            controls.maxPolarAngle = 1.27;
          }
          controls.enableDamping = true;
          controls.enabled = true;
          controls.autoRotate = anim.to === "GLOBE";
          controls.update();
        }
      } else if (controls.enabled) {
        controls.update();
      }

      field.rotation.y -= dt * 0.006;

      const hot = hotRef.current;
      globeCountryVisual?.tick(time, hot);

      /* Region hover & elevation */
      for (const r of regionEntries) {
        const on = hoverRegionRef.current === r.id || selectedRegionRef.current === r.id;
        const target = on ? 0.46 : r.live ? 0.14 : 0.04;
        r.faceMat.emissiveIntensity += (target - r.faceMat.emissiveIntensity) * damp(8, dt);
        baseOpacity.set(r.borderMat, on ? 1 : r.live ? 0.95 : 0.3);
        baseOpacity.set(r.glowMat, on ? 0.95 : r.live ? 0.65 : 0.18);
        r.mesh.scale.y += ((on ? 1.35 : 1) - r.mesh.scale.y) * damp(7, dt);
      }

      /* Venue pin animations */
      const hasVenueSelection = !!selectedVenueRef.current;
      for (const p of pinEntries) {
        const isSelected = selectedVenueRef.current === p.id;
        
        // When a venue is selected, ONLY show that venue!
        if (hasVenueSelection) {
          p.group.visible = isSelected;
        } else {
          p.group.visible = true;
        }

        if (!p.group.visible) continue;

        const sel = isSelected;
        const beat = (time * (sel ? 1.5 : 0.85) + p.seed) % 1;
        p.ring.scale.setScalar(1 + beat * (sel ? 2.6 : 1.8));
        baseOpacity.set(p.ringMat, (1 - beat) * (sel ? 0.95 : 0.6));
        p.head.rotation.y += dt * (sel ? 2.4 : 0.9);
        p.head.position.y = 0.42 + Math.sin(time * 1.7 + p.seed) * 0.012 + (sel ? 0.05 : 0);
        baseOpacity.set(p.haloMat, sel ? 1 : 0.7);
      }

      applyMix();

      /* DOM HUD Anchors — uses cached layout dimensions to eliminate forced reflows */
      const w = cachedW;
      const h = cachedH;

      if (anim.stageMix > 0.02) {
        for (const p of pinEntries) {
          const isSelected = selectedVenueRef.current === p.id;
          const node = pinLabelRefs.current.get(p.id);

          // If a venue is selected and this is not the selected venue, hide HUD chip completely
          if (hasVenueSelection && !isSelected) {
            if (node) {
              node.style.opacity = "0";
              node.style.visibility = "hidden";
              node.style.pointerEvents = "none";
            }
            continue;
          }

          if (node) {
            node.style.visibility = "visible";
            node.style.pointerEvents = "auto";
          }
          const at = placeHud(node, p.anchor, anim.stageMix * (isSelected ? 1 : 0.85), w, h);
          const chip = node?.firstElementChild as HTMLElement | undefined;
          if (at && chip) {
            const flipDown = p.down || at.y - p.fan - 44 < 170;
            const yOff = flipDown ? `${34 + p.slot * 50}px` : `calc(-100% - ${p.fan}px)`;
            const xShift = (flipDown && at.x > 200) || at.x > w - 200 ? "calc(-100% - 12px)" : "12px";
            chip.style.transform = `translate(${xShift}, ${yOff})`;
          }
        }
        for (const r of regionEntries) {
          const on = hoverRegionRef.current === r.id || selectedRegionRef.current === r.id;
          placeHud(regionLabelRefs.current.get(r.id), r.center, anim.stageMix * (on ? 1 : 0.55), w, h);
        }
      } else {
        for (const p of pinEntries) {
          const node = pinLabelRefs.current.get(p.id);
          if (node) {
            node.style.opacity = "0";
            node.style.visibility = "hidden";
          }
        }
        for (const r of regionEntries) {
          const node = regionLabelRefs.current.get(r.id);
          if (node) node.style.opacity = "0";
        }
      }

      /* Retina Leader Badge */
      const badge = badgeRef.current;
      if (badge) {
        if (anim.stageMix > 0.05) {
          badge.style.opacity = "0";
        } else {
          beacon.getWorldPosition(worldPos);
          camera.getWorldDirection(camDir);
          const facing = worldPos.clone().normalize().dot(camDir) < -0.08;
          const p = worldPos.clone().project(camera);
          const bx = (p.x * 0.5 + 0.5) * w;
          const by = (-p.y * 0.5 + 0.5) * h;
          const flipX = bx > w - 320;
          const flipY = by < 130;
          badge.style.setProperty("--bx", `${bx.toFixed(1)}px`);
          badge.style.setProperty("--by", `${by.toFixed(1)}px`);
          badge.style.setProperty("--brot", `${flipX ? (flipY ? 135 : -135) : flipY ? 45 : -45}deg`);
          badge.style.setProperty("--blx", `${flipX ? -74 : 74}px`);
          badge.style.setProperty("--bty", `${flipY ? 74 : -74}px`);
          badge.style.setProperty("--bsx", flipX ? "-100%" : "0%");
          badge.style.setProperty("--bsy", flipY ? "0%" : "-100%");
          badge.style.opacity = facing ? `${(1 - anim.stageMix).toFixed(2)}` : "0";
        }
      }

      renderer.render(scene, camera);
    };

    // Viewport IntersectionObserver — completely freezes RAF when offscreen
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible && !isDisposed) {
            clock.getDelta(); // flush delta to avoid huge leap
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      isDisposed = true;
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointerup", onPointerUp);
      controls.dispose();
      controlsRef.current = null;
      stageBridgeRef.current = null;
      disposables.forEach((d) => d.dispose());
      scene.clear();
      renderer.dispose();
    };
  }, []);

  /* Sync mode transitions with camera flyTo */
  useEffect(() => {
    stageBridgeRef.current?.flyTo(viewMode);
  }, [viewMode]);

  /* Focus on venue / region changes */
  useEffect(() => {
    if (selectedVenue) {
      stageBridgeRef.current?.focusVenue(selectedVenue.id);
    } else if (selectedRegion) {
      stageBridgeRef.current?.focusRegion(selectedRegion);
    } else if (viewMode === "GEORGIA_DETAIL") {
      stageBridgeRef.current?.focusRegion(null);
    }
  }, [selectedVenue, selectedRegion, viewMode]);

  return (
    <div ref={wrapRef} className="relative flex-1 w-full h-[550px] md:h-[680px] lg:h-full bg-[#0A0D12] overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(62%_58%_at_52%_46%,rgba(127,212,255,0.09),rgba(10,13,18,0)_72%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none block" />

      {/* Georgia Beacon Leader Badge (Globe stage) */}
      <div
        ref={badgeRef}
        className="absolute z-[6] h-0 w-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ left: "var(--bx, 50%)", top: "var(--by, 50%)" }}
      >
        <span
          className="absolute left-0 top-0 h-px w-[104px] origin-left bg-gradient-to-r from-[#7FD4FF]/85 to-[#7FD4FF]/35"
          style={{ transform: "rotate(var(--brot, -45deg))" }}
        />
        <div
          className="absolute py-2.5"
          style={{
            left: "var(--blx, 74px)",
            top: "var(--bty, -74px)",
            transform: "translate(var(--bsx, 0%), var(--bsy, -100%))",
          }}
        >
          <div className="flex flex-col gap-1.5 whitespace-nowrap border border-[#7FD4FF]/55 bg-[#0D1117]/85 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-[#EAF4FF]">
              {t.badgeTitle}
            </span>
            <span className="font-mono text-[9.5px] tabular-nums tracking-[0.13em] text-[#7FA6BA]">
              {t.badgeCoords}
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.cue("enter");
                onEnterGeorgia();
              }}
              className="pointer-events-auto mt-1 px-2.5 py-1 rounded bg-[#7FD4FF]/20 hover:bg-[#7FD4FF]/35 border border-[#7FD4FF]/50 text-white font-mono text-[10px] font-semibold transition-all cursor-pointer text-center"
            >
              {t.exploreGeorgia}
            </button>
          </div>
        </div>
      </div>

      {/* Region Name Chips (Map stage) */}
      {regions
        .filter((r) => r.live)
        .map((r) => (
          <div
            key={r.id}
            ref={(el) => {
              regionLabelRefs.current.set(r.id, el);
            }}
            className="pointer-events-none absolute left-0 top-0 z-[9] opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="translate-y-6 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-[#0D1117]/60 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] text-[#CFE6F2] uppercase backdrop-blur-sm">
              {r.name}
            </div>
          </div>
        ))}

      {/* Floating Venue Pin Labels (Map stage) */}
      {venues.map((v) => {
        const isSelected = selectedVenue?.id === v.id;
        if (selectedVenue && !isSelected) return null;
        const sibs = venues.filter((x) => x.regionId === v.regionId);
        const fan = 14 + Math.max(0, sibs.indexOf(v)) * 50;
        return (
          <div
            key={v.id}
            ref={(el) => {
              pinLabelRefs.current.set(v.id, el);
            }}
            className="pointer-events-none absolute left-0 top-0 z-[9] opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <button
              type="button"
              onClick={() => {
                soundEngine.cue("click");
                onSelectVenue(isSelected ? null : v);
              }}
              className="pointer-events-auto cursor-pointer whitespace-nowrap border bg-[#0D1117]/80 px-2.5 py-1.5 text-left backdrop-blur-md transition-colors duration-200"
              style={{
                transform: `translate(12px, calc(-100% - ${fan}px))`,
                borderColor: isSelected ? v.accent : "rgba(255,255,255,0.12)",
                boxShadow: isSelected ? `0 0 22px -6px ${v.accent}` : "0 10px 26px rgba(0,0,0,0.45)",
              }}
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.accent }} />
                <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-[#EAF4FF]">{v.name}</span>
              </span>
              <span className="mt-0.5 block font-mono text-[9px] tabular-nums tracking-[0.14em] text-[#7FA6BA]">
                LIVE · {v.regionCity || v.city}
              </span>
            </button>
          </div>
        );
      })}

      {/* Glass Top-Right Controls (Zoom, Reset, Sound) */}
      <div className="absolute right-5 top-5 z-[15] flex flex-col items-end gap-2.5">
        <div className="flex flex-col gap-px border border-white/[0.08] bg-white/[0.07] backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={() => handleZoom(0.85)}
            aria-label={t.zoomIn}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(1.18)}
            aria-label={t.zoomOut}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label={t.resetView}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[14px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={() => {
            const next = soundEngine.toggleSound();
            setSoundOn(next);
          }}
          className={`px-2.5 py-1.5 rounded-none border flex items-center gap-2 font-mono text-[9px] tracking-wider transition-all cursor-pointer backdrop-blur-xl shadow-lg ${
            soundOn
              ? "bg-[#7FD4FF]/15 border-[#7FD4FF]/40 text-[#7FD4FF] shadow-[0_0_15px_rgba(127,212,255,0.2)]"
              : "bg-[#0D1117]/80 border-white/10 text-[#8AA3B2] hover:text-white"
          }`}
        >
          {soundOn ? <Volume2 className="w-3 h-3 text-[#7FD4FF]" /> : <VolumeX className="w-3 h-3" />}
          <span>{soundOn ? t.soundOn : t.soundOff}</span>
        </button>
      </div>

      {/* Bottom Readout Hint */}
      <span className="pointer-events-none absolute bottom-4 right-5 z-[7] flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#4A6A7C] bg-[#0D1117]/70 px-2.5 py-1 border border-white/5 backdrop-blur-sm">
        <Crosshair className="w-3 h-3 text-[#7FD4FF]" />
        {viewMode === "GEORGIA_DETAIL"
          ? mapStatus === "READY"
            ? `${t.venuesLabel} · ${venues.length}`
            : mapStatus === "ERROR"
            ? t.mapError
            : t.loadingMap
          : activeCore
          ? `${activeCore} ISOLATED`
          : t.hint}
      </span>
    </div>
  );
};
