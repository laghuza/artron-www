"use client";

/**
 * ArtronEnneaEcosystem.tsx
 * Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS
 *
 * Vanilla three.js — intentionally NO @react-three/fiber or @react-three/drei
 * (React 19 peer conflict). OrbitControls is imported directly from the
 * three/examples ESM path.
 *
 * Layout: 35% glassmorphic data dock / 65% WebGL viewport.
 * Two stages live in one scene graph and cross-fade:
 *   'GLOBE'          → Fibonacci lattice sphere + Georgia beacon
 *   'GEORGIA_DETAIL' → extruded ADM1 vector map, hub regions, venue pins
 * All typography lives in HTML over the canvas for retina sharpness.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* ────────────────────────────── types ────────────────────────────── */

export type CoreGroup = "VENUE" | "FINTECH_IOT";
export type ViewMode = "GLOBE" | "GEORGIA_DETAIL";

export interface EnneaCore {
  id: string;
  label: string;
  meta: string;
  group: CoreGroup;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface EnneaRegion {
  id: string;
  /** Dock / HUD label. */
  name: string;
  /** ADM1 `shapeName` values this hub maps to. */
  shapeNames: string[];
  city: string;
  live: boolean;
}

export interface EnneaVenue {
  id: string;
  name: string;
  /** Region id this venue is rendered inside. */
  regionId: string;
  category: string;
  city: string;
  lat: number;
  lon: number;
  accent: string;
  members: string;
  status: string;
  turnstile: string;
  gateway: string;
}

export interface EnneaStrings {
  kicker: string;
  title: string;
  subtitle: string;
  breadcrumbWorld: string;
  breadcrumbCountry: string;
  backToWorld: string;
  exploreGeorgia: string;
  filters: { all: string; venues: string; fintech: string };
  badgeTitle: string;
  badgeCoords: string;
  hint: string;
  hintDetail: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  regionsLabel: string;
  venuesLabel: string;
  membersLabel: string;
  techLabel: string;
  loadingMap: string;
  mapError: string;
  close: string;
}

export interface ArtronEnneaEcosystemProps {
  cores?: EnneaCore[];
  stats?: HeroStat[];
  regions?: EnneaRegion[];
  venues?: EnneaVenue[];
  strings?: Partial<EnneaStrings>;
  /** Beacon / drill-down target. Defaults to Tbilisi, Georgia. */
  coordinates?: { lat: number; lon: number };
  /** ADM1 boundary source for the extruded vector map. */
  adm1Url?: string;
  accent?: string;
  pointCount?: number;
  autoRotate?: boolean;
  showStats?: boolean;
  className?: string;
  onCoreSelect?: (core: EnneaCore | null) => void;
  onBeaconSelect?: () => void;
  onViewModeChange?: (mode: ViewMode) => void;
  onVenueSelect?: (venue: EnneaVenue | null) => void;
}

/* ──────────────────────────── defaults ──────────────────────────── */

const DEFAULT_CORES: EnneaCore[] = [
  { id: "EC-01", label: "Ingress & Turnstile Core", meta: "5 Venues", group: "VENUE" },
  { id: "EC-02", label: "Biometric & IoT Grid", meta: "ZKTeco Active", group: "FINTECH_IOT" },
  { id: "EC-03", label: "Member Telemetry", meta: "20,000+ Athletes", group: "VENUE" },
  { id: "EC-04", label: "FinTech Settlement Ledger", meta: "Bank of Georgia 1-Click", group: "FINTECH_IOT" },
  { id: "EC-05", label: "Attendance Compliance", meta: "ბრძანება №01-15/ნ", group: "VENUE" },
  { id: "EC-06", label: "Dynamic QR Vault", meta: "Sub-0.2s Access", group: "FINTECH_IOT" },
  { id: "EC-07", label: "Offline Relay Autonomy", meta: "100% Uptime", group: "FINTECH_IOT" },
  { id: "EC-08", label: "Venue Capacity Analytics", meta: "Real-time Flow", group: "VENUE" },
  { id: "EC-09", label: "Federation Integration Mesh", meta: "Federations & Academies", group: "FINTECH_IOT" },
];

const DEFAULT_STATS: HeroStat[] = [
  { value: "20,000+", label: "ათლეტი" },
  { value: "5+", label: "დარბაზი" },
  { value: "0.18s", label: "დაშვება" },
  { value: "100%", label: "ავტონომია" },
];

const DEFAULT_REGIONS: EnneaRegion[] = [
  { id: "tbilisi", name: "Tbilisi Hub", shapeNames: ["Tbilisi"], city: "Tbilisi", live: true },
  { id: "imereti", name: "Imereti / Kutaisi Hub", shapeNames: ["Imereti"], city: "Kutaisi", live: true },
];

const DEFAULT_VENUES: EnneaVenue[] = [
  {
    id: "x-area",
    name: "X AREA GYM",
    regionId: "tbilisi",
    category: "Premium Club",
    city: "Tbilisi",
    lat: 41.7245,
    lon: 44.7735,
    accent: "#CCFF00",
    members: "11,000+",
    status: "LIVE IN PRODUCTION // 24/7 ACTIVE",
    turnstile: "ZKTeco IoT Turnstiles",
    gateway: "Bank of Georgia 1-Click Gateway",
  },
  {
    id: "flex",
    name: "Flex Fitness",
    regionId: "tbilisi",
    category: "Premium Club",
    city: "Tbilisi",
    lat: 41.7168,
    lon: 44.7948,
    accent: "#00D2FF",
    members: "3,000+",
    status: "LIVE IN PRODUCTION // 24/7 ACTIVE",
    turnstile: "ZKTeco IoT Turnstiles",
    gateway: "Bank of Georgia 1-Click Gateway",
  },
  {
    id: "pixl",
    name: "PIXL Fitness",
    regionId: "tbilisi",
    category: "Functional Gym",
    city: "Tbilisi",
    lat: 41.7402,
    lon: 44.7431,
    accent: "#FF4D4D",
    members: "2,800+",
    status: "LIVE IN PRODUCTION // 24/7 ACTIVE",
    turnstile: "ZKTeco IoT Turnstiles",
    gateway: "Bank of Georgia 1-Click Gateway",
  },
  {
    id: "zona-15",
    name: "Fitness Zona 15",
    regionId: "tbilisi",
    category: "Functional Gym",
    city: "Tbilisi",
    lat: 41.7042,
    lon: 44.7592,
    accent: "#22C55E",
    members: "1,400+",
    status: "LIVE IN PRODUCTION // 24/7 ACTIVE",
    turnstile: "ZKTeco IoT Turnstiles",
    gateway: "Bank of Georgia 1-Click Gateway",
  },
  {
    id: "athletic",
    name: "Athletic.ათლეტიკი",
    regionId: "imereti",
    category: "Performance Gym",
    city: "Kutaisi",
    lat: 42.2471,
    lon: 42.6693,
    accent: "#FF9900",
    members: "840+",
    status: "LIVE IN PRODUCTION // 24/7 ACTIVE",
    turnstile: "ZKTeco IoT Turnstiles",
    gateway: "Bank of Georgia 1-Click Gateway",
  },
];

const DEFAULT_STRINGS: EnneaStrings = {
  kicker: "ENNEA CORE // ECOSYSTEM",
  title: "Nine Cores. One Sports Mesh.",
  subtitle: "საქართველოს წამყვანი სპორტული ინფრასტრუქტურის ცენტრალიზებული ბირთვი.",
  breadcrumbWorld: "მსოფლიო",
  breadcrumbCountry: "საქართველო",
  backToWorld: "← დაბრუნება მსოფლიოზე",
  exploreGeorgia: "EXPLORE GEORGIA",
  filters: { all: "ყველა", venues: "დარბაზები", fintech: "ფინტექი & IoT" },
  badgeTitle: "GEORGIA // ACTIVE CORE",
  badgeCoords: "41.7°N / 44.8°E · 9 CORES LIVE",
  hint: "drag to orbit · scroll to zoom",
  hintDetail: "click a pin · drag to orbit",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  resetView: "Reset view",
  regionsLabel: "ACTIVE HUBS",
  venuesLabel: "LIVE VENUES",
  membersLabel: "MEMBER CAPACITY",
  techLabel: "INTEGRATED TECH",
  loadingMap: "RESOLVING ADM1 VECTORS…",
  mapError: "ADM1 VECTOR SOURCE UNREACHABLE",
  close: "Close",
};

const DEFAULT_ADM1_URL =
  "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/GEO/ADM1/geoBoundaries-GEO-ADM1_simplified.geojson";

const BG = 0x0a0d12;
const SPHERE_R = 2.0;
const MIN_D = 3.8;
const MAX_D = 8.5;

/* map stage tuning */
const MAP_SCALE = 34;
const MAP_CENTER = { lat: 42.05, lon: 43.5 };
const DEPTH_INERT = 0.09;
const DEPTH_LIVE = 0.24;
const MAP_MIN_D = 2.0;
const MAP_MAX_D = 9.0;
const MAP_CAM = new THREE.Vector3(0.35, 3.55, 3.5);
const CHIP_H = 44;

type FilterKey = "ALL" | "VENUE" | "FINTECH_IOT";

/* ───────────────────────── geometry helpers ───────────────────────── */

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/** Web-Mercator, metres-free, recentred on Georgia and scaled to scene units. */
function mercator(lon: number, lat: number): [number, number] {
  const la = (Math.max(-85, Math.min(85, lat)) * Math.PI) / 180;
  return [(lon * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + la / 2))];
}

const MAP_ORIGIN = mercator(MAP_CENTER.lon, MAP_CENTER.lat);

/** Plan-space projection (shape XY, before the −90° X rotation). */
function projectFlat(lon: number, lat: number): [number, number] {
  const [mx, my] = mercator(lon, lat);
  return [(mx - MAP_ORIGIN[0]) * MAP_SCALE, (my - MAP_ORIGIN[1]) * MAP_SCALE];
}

/** World-space position on the extruded map top face. */
function projectWorld(lon: number, lat: number, y: number): THREE.Vector3 {
  const [x, z] = projectFlat(lon, lat);
  return new THREE.Vector3(x, y, -z);
}

function radialGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.22, "rgba(255,255,255,0.5)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function fitDistance(fov: number, aspect: number): number {
  const half = Math.tan((fov * Math.PI) / 360);
  return (SPHERE_R * 1.22) / (half * Math.min(1, aspect));
}

function homePosition(lat: number, lon: number, dist = 6.0): THREE.Vector3 {
  const dir = latLonToVec3(lat, lon, 1).normalize();
  const theta = Math.atan2(dir.x, dir.z) - 0.3;
  const phi = Math.min(Math.PI - 0.4, Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1)) + 0.24);
  const s = Math.sin(phi);
  return new THREE.Vector3(dist * s * Math.sin(theta), dist * Math.cos(phi), dist * s * Math.cos(theta));
}

/** Smoothstep — C1-continuous, used for the stage cross-fade so it never steps. */
const smoothstep = (x: number) => {
  const c = THREE.MathUtils.clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
};

/** Frame-rate independent damping factor (delta-time clamped lerp). */
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

/* ─────────────── DIRECTIVE 3 · EXACT LINE MATERIAL ───────────────
   Every connection line and border in both stages is built from this one
   factory. depthWrite:false kills the z-fighting that made borders drop in
   and out per frame; additive blending keeps them readable over the fog. */
const LINE_CYAN = 0x00e5ff;

function makeLineMaterial(color: number = LINE_CYAN, opacity = 0.65): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false, // FIXES Z-FIGHTING
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
}

/** Same hardening for line materials three.js allocates for us (GridHelper). */
function hardenLineMaterial(m: THREE.Material) {
  m.transparent = true;
  m.depthWrite = false;
  (m as THREE.LineBasicMaterial).depthTest = true;
  m.blending = THREE.AdditiveBlending;
  m.needsUpdate = true;
}

/** Never let the GPU cull these — high-velocity spins used to pop geometry out. */
function pinInFrustum(root: THREE.Object3D) {
  root.frustumCulled = false;
  root.traverse((o) => {
    o.frustumCulled = false;
    const g = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
    if (g && g.isBufferGeometry && !g.boundingSphere) g.computeBoundingSphere();
  });
}

/** 1.0 facing the camera, 0.15 on the far hemisphere + exponential fog. */
const DEPTH_FADE_GLSL = /* glsl */ `
  uniform float uFogDensity;
  uniform float uBack;
  varying float vFade;
  float depthFade(vec4 mv, vec3 nrmLocal) {
    vec3 n = normalize(mat3(modelViewMatrix) * nrmLocal);
    vec3 v = normalize(-mv.xyz);
    float facing = dot(n, v);
    float f = mix(uBack, 1.0, smoothstep(-0.25, 0.5, facing));
    float d = -mv.z;
    return f * exp(-uFogDensity * uFogDensity * d * d);
  }
`;

/* ─────────────────────── geojson → three.js ─────────────────────── */

type Ring = number[][];

interface Adm1Feature {
  properties?: { shapeName?: string; [k: string]: unknown };
  geometry?: { type: string; coordinates: unknown };
}

function ringToPoints(ring: Ring): THREE.Vector2[] {
  const out: THREE.Vector2[] = [];
  for (const c of ring) {
    const [x, y] = projectFlat(c[0], c[1]);
    out.push(new THREE.Vector2(x, y));
  }
  return out;
}

function featureShapes(feature: Adm1Feature): THREE.Shape[] {
  const geom = feature.geometry;
  if (!geom) return [];
  const polys: Ring[][] =
    geom.type === "Polygon" ? [geom.coordinates as Ring[]] : (geom.coordinates as Ring[][]);
  const shapes: THREE.Shape[] = [];
  for (const poly of polys || []) {
    const outer = poly?.[0];
    if (!outer || outer.length < 4) continue;
    const shape = new THREE.Shape(ringToPoints(outer));
    for (let i = 1; i < poly.length; i++) {
      if (poly[i].length > 3) shape.holes.push(new THREE.Path(ringToPoints(poly[i])));
    }
    shapes.push(shape);
  }
  return shapes;
}

/** Closed top-face outline segments for crisp glowing borders. */
function outlinePositions(shapes: THREE.Shape[], y: number): number[] {
  const pos: number[] = [];
  const push = (pts: THREE.Vector2[]) => {
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      pos.push(a.x, y, -a.y, b.x, y, -b.y);
    }
  };
  for (const s of shapes) {
    push(s.getPoints(2));
    for (const h of s.holes) push((h as THREE.Path).getPoints(2));
  }
  return pos;
}

/* ──────────────────────────── component ──────────────────────────── */

export default function ArtronEnneaEcosystem({
  cores = DEFAULT_CORES,
  stats = DEFAULT_STATS,
  regions = DEFAULT_REGIONS,
  venues = DEFAULT_VENUES,
  strings,
  coordinates = { lat: 41.7, lon: 44.8 },
  adm1Url = DEFAULT_ADM1_URL,
  accent = "#7FD4FF",
  pointCount = 2400,
  autoRotate = true,
  showStats = true,
  className = "",
  onCoreSelect,
  onBeaconSelect,
  onViewModeChange,
  onVenueSelect,
}: ArtronEnneaEcosystemProps) {
  const t = useMemo<EnneaStrings>(
    () => ({ ...DEFAULT_STRINGS, ...strings, filters: { ...DEFAULT_STRINGS.filters, ...strings?.filters } }),
    [strings]
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const hotRef = useRef<boolean>(false);
  const userZoomed = useRef<boolean>(false);

  /* HUD anchors projected every frame */
  const pinLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const regionLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  /* imperative bridge into the three.js closure */
  const stageRef = useRef<{
    flyTo: (mode: ViewMode) => void;
    focusRegion: (id: string | null) => void;
    focusVenue: (id: string | null) => void;
  } | null>(null);

  const viewRef = useRef<ViewMode>("GLOBE");
  const hoverRegionRef = useRef<string | null>(null);
  const selectedRegionRef = useRef<string | null>(null);
  const selectedVenueRef = useRef<string | null>(null);

  /* ─── SINGLE MUTABLE ANIMATION RECORD ─────────────────────────────
     Every value the render loop reads or writes lives here. No setState
     is ever called from requestAnimationFrame, pointermove or a tween. */
  const animState = useRef({
    isTransitioning: false,
    progress: 0,
    to: "GLOBE" as ViewMode,
    startCamPos: new THREE.Vector3(),
    targetCamPos: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
    targetLookAt: new THREE.Vector3(),
    /** 0 = globe owns the frame, 1 = map owns the frame */
    stageMix: 0,
    haloAlpha: 0.6,
    pulseAlpha: 0.35,
  });

  const [activeCore, setActiveCore] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [beaconSelected, setBeaconSelected] = useState(true);

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<EnneaVenue | null>(null);
  const [mapStatus, setMapStatus] = useState<"IDLE" | "LOADING" | "READY" | "ERROR">("IDLE");

  const activeCoreObj = useMemo(() => cores.find((c) => c.id === activeCore) ?? null, [cores, activeCore]);

  /* commit-phase mirror — refs are written AFTER render, never during it */
  useLayoutEffect(() => {
    hotRef.current = beaconSelected || !!activeCore;
    viewRef.current = viewMode;
    selectedRegionRef.current = selectedRegion;
    selectedVenueRef.current = selectedVenue?.id ?? null;
  }, [beaconSelected, activeCore, viewMode, selectedRegion, selectedVenue]);

  /* hover is pure ref state: the GPU loop reads it, React never re-renders */
  const setHoverRegion = useCallback((id: string | null) => {
    hoverRegionRef.current = id;
  }, []);

  /* live prop bridge — lets the scene effect mount ONCE and still read fresh props */
  const propsRef = useRef({ accent, autoRotate, coordinates, pointCount, adm1Url, regions, venues });
  useLayoutEffect(() => {
    propsRef.current = { accent, autoRotate, coordinates, pointCount, adm1Url, regions, venues };
  });

  /* Structural signature: a primitive that changes ONLY when the scene graph
     genuinely has to be rebuilt. New-but-equal default arrays / coordinate
     objects no longer destroy and recreate the WebGL context every render,
     and `autoRotate` deliberately is not part of it. */
  const sceneSignature = useMemo(
    () =>
      JSON.stringify([
        accent,
        pointCount,
        adm1Url,
        coordinates.lat,
        coordinates.lon,
        regions.map((r) => `${r.id}:${r.live}:${r.shapeNames.join("|")}`),
        venues.map((v) => `${v.id}:${v.regionId}:${v.accent}`),
      ]),
    [accent, pointCount, adm1Url, coordinates.lat, coordinates.lon, regions, venues]
  );

  const liveRegions = useMemo(() => regions.filter((r) => r.live), [regions]);
  const venuesByRegion = useCallback((id: string) => venues.filter((v) => v.regionId === id), [venues]);

  const isDimmed = useCallback((core: EnneaCore) => filter !== "ALL" && core.group !== filter, [filter]);

  const handleCore = useCallback(
    (core: EnneaCore) => {
      if (isDimmed(core)) return;
      const next = activeCore === core.id ? null : core.id;
      setActiveCore(next);
      onCoreSelect?.(next ? core : null);
    },
    [activeCore, isDimmed, onCoreSelect]
  );

  const handleBeacon = useCallback(() => {
    setBeaconSelected((v) => !v);
    onBeaconSelect?.();
  }, [onBeaconSelect]);

  /* ── view-mode transitions ── */
  const enterGeorgia = useCallback(() => {
    if (viewRef.current === "GEORGIA_DETAIL") return;
    setViewMode("GEORGIA_DETAIL");
    setBeaconSelected(true);
    onViewModeChange?.("GEORGIA_DETAIL");
    stageRef.current?.flyTo("GEORGIA_DETAIL");
  }, [onViewModeChange]);

  const exitToGlobe = useCallback(() => {
    if (viewRef.current === "GLOBE") return;
    setSelectedVenue(null);
    setSelectedRegion(null);
    setHoverRegion(null);
    onVenueSelect?.(null);
    setViewMode("GLOBE");
    onViewModeChange?.("GLOBE");
    stageRef.current?.flyTo("GLOBE");
  }, [onViewModeChange, onVenueSelect]);

  const pickRegion = useCallback((id: string | null) => {
    setSelectedRegion((cur) => (cur === id ? null : id));
    stageRef.current?.focusRegion(id);
  }, []);

  const pickVenue = useCallback(
    (venue: EnneaVenue | null) => {
      setSelectedVenue(venue);
      if (venue) setSelectedRegion(venue.regionId);
      onVenueSelect?.(venue ?? null);
      stageRef.current?.focusVenue(venue?.id ?? null);
    },
    [onVenueSelect]
  );

  /* stale-closure guard: the mount-once scene effect calls handlers through
     this ref, so it never captures a render-1 copy of a callback */
  const handlersRef = useRef({ enterGeorgia, exitToGlobe, pickRegion, pickVenue, onVenueSelect });
  useLayoutEffect(() => {
    handlersRef.current = { enterGeorgia, exitToGlobe, pickRegion, pickVenue, onVenueSelect };
  });

  /* ── zoom / reset are driven through the controls instance ── */
  const zoomBy = useCallback((factor: number) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const cam = controls.object;
    const dir: THREE.Vector3 = cam.position.clone().sub(controls.target);
    userZoomed.current = true;
    const next = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
    cam.position.copy(controls.target).add(dir.setLength(next));
    controls.update();
  }, []);

  const resetView = useCallback(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    userZoomed.current = false;
    if (viewRef.current === "GEORGIA_DETAIL") {
      setSelectedVenue(null);
      setSelectedRegion(null);
      controls.object.position.copy(MAP_CAM);
      controls.target.set(0, 0, 0);
      controls.update();
      return;
    }
    const d = THREE.MathUtils.clamp(
      fitDistance(controls.object.fov, controls.object.aspect),
      MIN_D,
      controls.maxDistance
    );
    controls.object.position.copy(homePosition(coordinates.lat, coordinates.lon, d));
    controls.target.set(0, 0, 0);
    controls.update();
  }, [coordinates.lat, coordinates.lon]);

  /* ─────────────────────── three.js lifecycle ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    /* build-time snapshot: the scene is constructed ONCE. Live values that the
       loop must respect are read off propsRef per frame instead. */
    const { accent, coordinates, pointCount, adm1Url, regions, venues } = propsRef.current;

    const accentColor = new THREE.Color(accent);
    const titanium = new THREE.Color(0xc9d8e0);
    const ice = new THREE.Color(0xe8f8ff);
    const disposables: Array<{ dispose: () => void }> = [];
    let disposed = false;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.03);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    /* explicit clip planes — a loose near plane was clipping the map at close dolly */
    camera.near = 0.1;
    camera.far = 100.0;
    camera.updateProjectionMatrix();
    camera.position.copy(homePosition(coordinates.lat, coordinates.lon));

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
    controls.autoRotate = propsRef.current.autoRotate;
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

    scene.add(new THREE.AmbientLight(0x93b6c9, 0.75));
    const key = new THREE.DirectionalLight(0xdff2ff, 1.15);
    key.position.set(2.6, 5.2, 3.1);
    scene.add(key);
    const rim = new THREE.DirectionalLight(accentColor.getHex(), 0.5);
    rim.position.set(-3.4, 2.2, -2.8);
    scene.add(rim);

    /* ═════════════════════ STAGE 1 · GLOBE ═════════════════════ */

    const shellGeo = new THREE.SphereGeometry(SPHERE_R * 0.975, 64, 48);
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x0b1117, transparent: true, opacity: 1 });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.frustumCulled = false;
    globe.add(shell);
    disposables.push(shellGeo, shellMat);

    const N = Math.max(400, pointCount);
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

    /** Shared stage opacity — 1 on the globe, 0 once the map owns the frame. */
    const uniforms = {
      uColor: { value: accentColor.clone() },
      uHot: { value: titanium.clone() },
      uSize: { value: 2.6 },
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
    globe.add(pointCloud);
    disposables.push(pointGeo, pointMat);

    /* lattice lines ride 0.3% above the point shell so they can never z-fight it */
    const LINE_LIFT = 1.003;
    const segments: number[] = [];
    const maxLen = SPHERE_R * 0.115;
    for (const off of [34, 55]) {
      for (let i = 0; i + off < N; i++) {
        const a = pts[i];
        const b = pts[i + off];
        if (a.distanceTo(b) > maxLen) continue;
        segments.push(
          a.x * LINE_LIFT, a.y * LINE_LIFT, a.z * LINE_LIFT,
          b.x * LINE_LIFT, b.y * LINE_LIFT, b.z * LINE_LIFT
        );
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    lineGeo.computeBoundingSphere();
    const LATTICE_OPACITY = 0.65;
    const lineMat = makeLineMaterial(LINE_CYAN, LATTICE_OPACITY);
    const latticeLines = new THREE.LineSegments(lineGeo, lineMat);
    latticeLines.frustumCulled = false;
    globe.add(latticeLines);
    disposables.push(lineGeo, lineMat);

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
          gl_FragColor = vec4(uRim, f * 0.85 * uGlobal);
        }
      `,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.frustumCulled = false;
    globe.add(rimMesh);
    disposables.push(rimGeo, rimMat);

    /* Georgia beacon — the globe-side entry point into the drill-down */
    const glow = radialGlowTexture();
    disposables.push(glow);
    const beacon = new THREE.Group();
    const beaconPos = latLonToVec3(coordinates.lat, coordinates.lon, SPHERE_R * 1.005);
    beacon.position.copy(beaconPos);
    beacon.lookAt(beaconPos.clone().multiplyScalar(2));
    beacon.frustumCulled = false;
    globe.add(beacon);

    const coreGeo = new THREE.SphereGeometry(0.032, 18, 14);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
    const beaconCore = new THREE.Mesh(coreGeo, coreMat);
    beaconCore.userData.hit = "BEACON";
    beacon.add(beaconCore);
    disposables.push(coreGeo, coreMat);

    /* generous invisible hit sphere so the globe node itself is clickable */
    const beaconHitGeo = new THREE.SphereGeometry(0.16, 12, 10);
    const beaconHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const beaconHit = new THREE.Mesh(beaconHitGeo, beaconHitMat);
    beaconHit.userData.hit = "BEACON";
    beacon.add(beaconHit);
    disposables.push(beaconHitGeo, beaconHitMat);

    const ringGeo = new THREE.TorusGeometry(0.075, 0.005, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentColor.getHex(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    beacon.add(ring);
    const pulseMat = ringMat.clone();
    const pulse = new THREE.Mesh(ringGeo, pulseMat);
    beacon.add(pulse);
    disposables.push(ringGeo, ringMat, pulseMat);

    const haloMat = new THREE.SpriteMaterial({
      map: glow,
      color: accentColor.getHex(),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(0.46);
    beacon.add(halo);
    disposables.push(haloMat);

    /* far field — shared by both stages */
    const farPos: number[] = [];
    for (let i = 0; i < 420; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 14);
      farPos.push(v.x, v.y, v.z);
    }
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute("position", new THREE.Float32BufferAttribute(farPos, 3));
    farGeo.computeBoundingSphere();
    const farMat = new THREE.PointsMaterial({
      color: accentColor.getHex(),
      size: 0.05,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      fog: false,
    });
    const field = new THREE.Points(farGeo, farMat);
    field.frustumCulled = false;
    world.add(field);
    disposables.push(farGeo, farMat);

    /* ═══════════════ STAGE 2 · GEORGIA EXTRUDED VECTOR MAP ═══════════════ */

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
      regions.find((r) => r.shapeNames.some((s) => s.toLowerCase() === String(shapeName).toLowerCase())) ?? null;

    const buildPin = (venue: EnneaVenue, top: number, idx: number, siblings: number) => {
      const col = new THREE.Color(venue.accent);
      const group = new THREE.Group();
      /* venues inside one city sit metres apart — fan them on a small ring around
         the hub centroid so each pin stays individually hoverable / clickable */
      const hubEntry = regionEntries.find((r) => r.id === venue.regionId);
      const anchor =
        siblings > 1 && hubEntry
          ? new THREE.Vector3(
              hubEntry.center.x + Math.cos(-Math.PI / 2 + (idx * 2 * Math.PI) / siblings) * 0.105,
              top,
              hubEntry.center.z + Math.sin(-Math.PI / 2 + (idx * 2 * Math.PI) / siblings) * 0.105
            )
          : projectWorld(venue.lon, venue.lat, top);
      group.position.copy(anchor);
      mapStage.add(group);

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

      const headGeo = new THREE.OctahedronGeometry(0.042, 0);
      const headMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 1 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = H;
      group.add(head);
      disposables.push(headGeo, headMat);
      registerFade(headMat, 1);

      const haloM = new THREE.SpriteMaterial({
        map: glow,
        color: col,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const hl = new THREE.Sprite(haloM);
      hl.scale.setScalar(0.3);
      hl.position.y = H;
      group.add(hl);
      disposables.push(haloM);
      registerFade(haloM, 0.75);

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

      const hitGeo = new THREE.SphereGeometry(0.115, 10, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.y = H;
      hit.userData.hit = "PIN";
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
        mesh.userData.hit = "REGION";
        mesh.userData.regionId = region?.id ?? null;
        mapStage.add(mesh);
        mapMeshes.push(mesh);
        disposables.push(geo, faceMat);
        registerFade(faceMat, 1);

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

        /* additive twin, lifted a hair — reads as a glowing border */
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

      for (const venue of venues) {
        const entry = regionEntries.find((r) => r.id === venue.regionId);
        const sibs = venues.filter((v) => v.regionId === venue.regionId);
        buildPin(venue, entry ? entry.top : DEPTH_LIVE, sibs.indexOf(venue), sibs.length);
      }

      /* grid pad under the country for depth reading */
      const grid = new THREE.GridHelper(14, 28, accentColor.getHex(), 0x16222c);
      const gm = grid.material as THREE.Material & { opacity: number };
      gm.opacity = 0.055;
      hardenLineMaterial(gm);
      grid.frustumCulled = false;
      grid.position.y = -0.01;
      mapStage.add(grid);
      registerFade(gm, 0.055);
      disposables.push(grid.geometry as unknown as { dispose: () => void }, gm);

      pinInFrustum(mapStage);
      setMapStatus("READY");
    };

    setMapStatus("LOADING");
    fetch(adm1Url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: { features?: Adm1Feature[] }) => {
        if (disposed) return;
        const feats = json?.features ?? [];
        if (!feats.length) throw new Error("empty");
        buildMap(feats);
      })
      .catch(() => {
        if (!disposed) setMapStatus("ERROR");
      });

    /* ═════════════════════ camera choreography ═════════════════════ */

    /* ALL tween / per-frame state lives in one ref record. Nothing here is
       React state, so no frame can schedule a re-render. */
    const anim = animState.current;
    Object.assign(anim, { isTransitioning: false, progress: 0, to: "GLOBE" as ViewMode, stageMix: 0, haloAlpha: 0.6, pulseAlpha: 0.35 });
    anim.startCamPos.set(0, 0, 0);
    anim.targetCamPos.set(0, 0, 0);
    anim.startLookAt.set(0, 0, 0);
    anim.targetLookAt.set(0, 0, 0);

    const applyMix = () => {
      uniforms.uGlobal.value = 1 - anim.stageMix;
      shellMat.opacity = 1 - anim.stageMix;
      /* the lattice is a plain LineBasicMaterial now — fade it by opacity */
      lineMat.opacity = LATTICE_OPACITY * (1 - anim.stageMix);
      const beaconOp = 1 - anim.stageMix;
      coreMat.opacity = beaconOp;
      ringMat.opacity = beaconOp * (hotRef.current ? 1 : 0.8);
      haloMat.opacity = beaconOp * anim.haloAlpha;
      pulseMat.opacity = beaconOp * anim.pulseAlpha;
      globe.visible = anim.stageMix < 0.985;
      mapStage.visible = anim.stageMix > 0.015;
      for (const m of mapFadeMats) m.opacity = (baseOpacity.get(m) ?? 1) * anim.stageMix;
      farMat.opacity = 0.3 * (1 - anim.stageMix * 0.45);
    };

    const flyTo = (mode: ViewMode) => {
      /* DIRECTIVE 4 · start transition — hand the rig fully to the tween.
         User input, damping inertia and auto-rotate all fight a programmatic
         move and read as jitter, so controls go dark for the whole flight. */
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
        anim.targetCamPos.copy(homePosition(coordinates.lat, coordinates.lon, d));
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
      /* bias right so the selected pin lands clear of the detail card */
      controls.target.set(pin.group.position.x + 0.5, pin.group.position.y + 0.22, pin.group.position.z);
      controls.object.position.copy(controls.target).add(new THREE.Vector3(0.2, 1.5, 1.6));
      controls.update();
    };

    stageRef.current = { flyTo, focusRegion, focusVenue };
    pinInFrustum(globe);
    applyMix();

    /* ═════════════════════ pointer interaction ═════════════════════ */

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
        const hit = raycaster.intersectObjects([beaconHit], false);
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
        if (raycaster.intersectObjects([beaconHit], false).length) handlersRef.current.enterGeorgia();
        return;
      }
      const pinHit = raycaster.intersectObjects(pinHits, false)[0];
      if (pinHit) {
        const vid = pinHit.object.userData.venueId as string;
        const venue = venues.find((v) => v.id === vid) ?? null;
        if (venue) handlersRef.current.pickVenue(selectedVenueRef.current === vid ? null : venue);
        return;
      }
      const regionHit = raycaster.intersectObjects(mapMeshes, false)[0];
      const rid = (regionHit?.object.userData.regionId as string | null) ?? null;
      if (rid) handlersRef.current.pickRegion(rid);
      else handlersRef.current.pickVenue(null);
    };

    const dom = renderer.domElement;
    dom.style.cursor = "grab";
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointerup", onPointerUp);

    /* ═════════════════════════ resize ═════════════════════════ */

    /* DIRECTIVE 2 · canvas buffer === CSS box × devicePixelRatio.
       setSize(w, h, false) is mandatory: `true` would write inline width/height
       styles onto the canvas and fight the absolutely-positioned layout, which
       is what produced the half-resolution, soft-edged render. */
    const resize = () => {
      const width = wrap.clientWidth || 1;
      const height = wrap.clientHeight || 1;
      const pixelRatio = Math.min(window.devicePixelRatio, 2);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false); // CRITICAL: 'false' prevents canvas style override
      uniforms.uPixelRatio.value = pixelRatio;

      const fit = fitDistance(camera.fov, camera.aspect);
      if (viewRef.current === "GLOBE") {
        controls.maxDistance = Math.max(MAX_D, fit + 0.8);
        if (!userZoomed.current && !anim.isTransitioning) {
          camera.position.copy(homePosition(coordinates.lat, coordinates.lon, fit));
          controls.update();
        }
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    /* ═════════════════════════ render loop ═════════════════════════ */

    const worldPos = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    const proj = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;

    const placeHud = (
      node: HTMLDivElement | null | undefined,
      point: THREE.Vector3,
      opacity: number,
      w: number,
      h: number
    ) => {
      if (!node) return null;
      proj.copy(point).project(camera);
      /* snap to whole device pixels — sub-pixel offsets blur the chip typography */
      const x = Math.round((proj.x * 0.5 + 0.5) * w);
      const y = Math.round((-proj.y * 0.5 + 0.5) * h);
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      node.style.opacity = proj.z > 1 ? "0" : opacity.toFixed(3);
      return { x, y };
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.05);
      const dt = delta;
      const time = clock.elapsedTime;
      uniforms.uTime.value = time;

      /* DIRECTIVE 4 · zero-jitter transition. Pure ref state, time-based
         progress, cubic ease-in-out, single lerp pair. No setState, no
         controls.update() while the tween owns the camera. */
      if (anim.isTransitioning) {
        anim.progress += delta * 1.2;
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
          /* settle the rig on the exact end pose BEFORE handing control back */
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
          controls.enabled = true; // Re-enable ONLY here
          controls.autoRotate = anim.to === "GLOBE" ? propsRef.current.autoRotate : false;
          controls.update();
        }
      } else if (controls.enabled) {
        controls.update(); // Only update controls when NOT transitioning
      }

      field.rotation.y -= dt * 0.006;

      const hot = hotRef.current;
      ring.rotation.z += dt * (hot ? 1.2 : 0.35);
      anim.haloAlpha = (hot ? 0.95 : 0.6) + Math.sin(time * 1.8) * 0.06;
      halo.scale.setScalar(hot ? 0.62 : 0.46);
      const span = hot ? 1.1 : 1.9;
      const cyc = (time % span) / span;
      pulse.scale.setScalar(1 + cyc * 3.4);
      anim.pulseAlpha = (1 - cyc) * (hot ? 0.65 : 0.35);

      /* region hover / selection emphasis */
      for (const r of regionEntries) {
        const on = hoverRegionRef.current === r.id || selectedRegionRef.current === r.id;
        const target = on ? 0.46 : r.live ? 0.14 : 0.04;
        r.faceMat.emissiveIntensity += (target - r.faceMat.emissiveIntensity) * damp(8, dt);
        baseOpacity.set(r.borderMat, on ? 1 : r.live ? 0.95 : 0.3);
        baseOpacity.set(r.glowMat, on ? 0.95 : r.live ? 0.65 : 0.18);
        r.mesh.scale.y += ((on ? 1.35 : 1) - r.mesh.scale.y) * damp(7, dt);
      }

      /* pulsing venue pins */
      for (const p of pinEntries) {
        const sel = selectedVenueRef.current === p.id;
        const beat = (time * (sel ? 1.5 : 0.85) + p.seed) % 1;
        p.ring.scale.setScalar(1 + beat * (sel ? 2.6 : 1.8));
        baseOpacity.set(p.ringMat, (1 - beat) * (sel ? 0.95 : 0.6));
        p.head.rotation.y += dt * (sel ? 2.4 : 0.9);
        p.head.position.y = 0.42 + Math.sin(time * 1.7 + p.seed) * 0.012 + (sel ? 0.05 : 0);
        baseOpacity.set(p.haloMat, sel ? 1 : 0.7);
      }

      applyMix();

      /* DOM HUD anchors */
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      if (anim.stageMix > 0.02) {
        for (const p of pinEntries) {
          const sel = selectedVenueRef.current === p.id;
          const node = pinLabelRefs.current.get(p.id);
          if (node) node.style.visibility = "visible";
          const at = placeHud(node, p.anchor, anim.stageMix * (sel ? 1 : 0.85), w, h);
          const chip = node?.firstElementChild as HTMLElement | undefined;
          if (at && chip) {
            /* reserve the top-left chrome band (breadcrumb + hub panel) and keep the
               upward stack inside the viewport — otherwise the stack flips downward */
            const topLimit = at.x < 600 ? 170 : 56;
            const flipDown = p.down || at.y - p.fan - CHIP_H < topLimit;
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
        /* globe stage owns the frame — park the map HUD so it can't catch clicks */
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
    tick();

    /* full teardown */
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointerup", onPointerUp);
      controls.dispose();
      controlsRef.current = null;
      stageRef.current = null;
      disposables.forEach((d) => d.dispose());
      scene.clear();
      renderer.dispose();
    };
    /* Rebuilds ONLY on a structural signature change — never on hover, view
       mode, autoRotate, selection or any per-frame value.
       eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [sceneSignature]);

  /* keep autoRotate reactive without rebuilding the scene */
  useEffect(() => {
    const controls = controlsRef.current;
    if (controls && viewMode === "GLOBE") controls.autoRotate = autoRotate;
  }, [autoRotate, viewMode]);

  /* Esc steps back out of the drill-down */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selectedVenue) pickVenue(null);
      else if (viewMode === "GEORGIA_DETAIL") exitToGlobe();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exitToGlobe, pickVenue, selectedVenue, viewMode]);

  /* ─────────────────────────── markup ─────────────────────────── */

  const filterTabs: Array<{ key: FilterKey; label: string }> = [
    { key: "ALL", label: t.filters.all },
    { key: "VENUE", label: t.filters.venues },
    { key: "FINTECH_IOT", label: t.filters.fintech },
  ];

  const detail = viewMode === "GEORGIA_DETAIL";

  return (
    <div
      className={`w-full min-h-screen bg-[#0A0D12] text-white antialiased [font-variant-numeric:tabular-nums] flex flex-col lg:flex-row relative overflow-hidden ${className}`}
      style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textRendering: "optimizeLegibility" }}
    >
      {/* ── LEFT DOCK · 35% ── */}
      <aside className="w-full lg:w-[35%] backdrop-blur-2xl bg-[#0D1117]/70 border-r border-white/5 p-6 lg:p-10 flex flex-col justify-between gap-8 z-10">
        <div className="flex min-h-0 flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7FD4FF] shadow-[0_0_12px_2px_rgba(127,212,255,0.85)] animate-pulse" />
            <span className="font-mono text-[10.5px] tracking-[0.28em] text-[#6E8DA0] uppercase">{t.kicker}</span>
          </div>

          <h1 className="text-[clamp(28px,2.9vw,42px)] leading-[1.06] font-semibold tracking-[-0.03em] text-[#F4FAFF] text-balance">
            {t.title}
          </h1>

          <p className="max-w-[46ch] text-[14.5px] leading-[1.7] text-[#8AA3B2] text-pretty">{t.subtitle}</p>

          <button
            type="button"
            onClick={detail ? exitToGlobe : enterGeorgia}
            className={`group flex items-center justify-between gap-3 border px-4 py-3 text-left transition-colors duration-200 ${
              detail
                ? "border-white/10 bg-white/[0.03] hover:border-[#7FD4FF]/40"
                : "border-[#7FD4FF]/40 bg-[#7FD4FF]/[0.07] hover:bg-[#7FD4FF]/[0.14]"
            }`}
          >
            <span className="font-mono text-[11.5px] font-semibold tracking-[0.18em] text-[#EAF4FF]">
              {detail ? t.backToWorld : t.exploreGeorgia}
            </span>
            <span className="font-mono text-[12px] text-[#7FD4FF] transition-transform duration-200 group-hover:translate-x-0.5">
              {detail ? "◎" : "→"}
            </span>
          </button>

          <ul className="flex min-h-0 flex-col overflow-y-auto border-t border-white/[0.07]">
            {cores.map((core) => {
              const dim = isDimmed(core);
              const on = activeCore === core.id;
              return (
                <li key={core.id}>
                  <button
                    type="button"
                    onClick={() => handleCore(core)}
                    aria-pressed={on}
                    className={`group relative w-full flex items-baseline gap-3.5 border-b border-white/[0.07] px-3 py-2.5 text-left transition-all duration-200 hover:bg-[#7FD4FF]/5 ${
                      dim ? "opacity-25 cursor-default" : "opacity-100 cursor-pointer"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#7FD4FF] shadow-[0_0_12px_rgba(127,212,255,0.9)] transition-opacity duration-200 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="font-mono text-[10.5px] tabular-nums tracking-[0.1em] text-[#5B7C8E] min-w-[42px]">
                      {core.id}
                    </span>
                    <span className="flex-1 min-w-0 flex flex-col gap-[3px]">
                      <span className="font-mono text-[12.5px] font-medium text-[#E6F3FB] leading-tight">
                        {core.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.06em] text-[#5F8296] leading-tight">
                        {core.meta}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {showStats && (
          <dl className="grid grid-cols-4 gap-x-2.5 gap-y-3.5 border-t border-white/[0.07] pt-5">
            {stats.slice(0, 4).map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 min-w-0">
                <dt className="order-2 font-mono text-[10px] tracking-[0.1em] text-[#6E8DA0] uppercase">{s.label}</dt>
                <dd className="order-1 text-[clamp(17px,1.55vw,23px)] font-semibold tabular-nums tracking-[-0.025em] text-[#F4FAFF] whitespace-nowrap">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </aside>

      {/* ── RIGHT VIEWPORT · 65% ── */}
      <div ref={wrapRef} className="w-full lg:w-[65%] h-[550px] lg:h-screen relative flex-1">
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(62%_58%_at_52%_46%,rgba(127,212,255,0.09),rgba(10,13,18,0)_72%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />

        {/* beacon leader line + retina DOM badge (globe stage) */}
        <div
          ref={badgeRef}
          className="absolute z-[6] h-0 w-0 opacity-0 transition-opacity duration-300"
          style={{ left: "var(--bx, 50%)", top: "var(--by, 50%)" }}
        >
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#F4FAFF] shadow-[0_0_14px_3px_rgba(127,212,255,0.9)]" />
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
            <div
              className={`flex flex-col gap-1.5 whitespace-nowrap border bg-[#0D1117]/85 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md ${
                beaconSelected ? "border-[#7FD4FF]/55" : "border-white/10"
              }`}
            >
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-[#EAF4FF]">
                {t.badgeTitle}
              </span>
              <span className="font-mono text-[9.5px] tabular-nums tracking-[0.13em] text-[#7FA6BA]">
                {activeCoreObj ? `${activeCoreObj.id} · ${activeCoreObj.meta}` : t.badgeCoords}
              </span>
            </div>
          </div>
          {/* frictionless hitbox — select, then drill in */}
          <button
            type="button"
            onClick={handleBeacon}
            onDoubleClick={enterGeorgia}
            aria-label={t.badgeTitle}
            className="pointer-events-auto absolute -left-[25px] -top-[25px] h-[50px] w-[50px] cursor-pointer bg-transparent"
          />
        </div>

        {/* region name chips (map stage) */}
        {liveRegions.map((r) => (
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

        {/* venue pin labels (map stage) */}
        {venues.map((v) => {
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
                onClick={() => pickVenue(selectedVenue?.id === v.id ? null : v)}
                className="pointer-events-auto cursor-pointer whitespace-nowrap border bg-[#0D1117]/78 px-2.5 py-1.5 text-left backdrop-blur-md transition-colors duration-200"
                style={{
                  transform: `translate(12px, calc(-100% - ${fan}px))`,
                  borderColor: selectedVenue?.id === v.id ? v.accent : "rgba(255,255,255,0.12)",
                  boxShadow:
                    selectedVenue?.id === v.id ? `0 0 22px -6px ${v.accent}` : "0 10px 26px rgba(0,0,0,0.45)",
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.accent }} />
                  <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-[#EAF4FF]">{v.name}</span>
                </span>
                <span className="mt-0.5 block font-mono text-[9px] tabular-nums tracking-[0.14em] text-[#7FA6BA]">
                  {v.members} · {v.city}
                </span>
              </button>
            </div>
          );
        })}

        {/* breadcrumb — doubles as the back navigation in detail mode */}
        <nav className="absolute left-5 top-5 z-[8] flex items-center gap-2 border border-white/[0.08] bg-[#0D1117]/65 px-3 py-2 backdrop-blur-xl">
          {detail ? (
            <button
              type="button"
              onClick={exitToGlobe}
              className="px-1 font-mono text-[11px] tracking-[0.12em] text-[#EAF4FF] transition-colors hover:text-[#7FD4FF]"
            >
              [ {t.backToWorld} ]
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={resetView}
                className="px-1 text-[11px] tracking-[0.12em] text-[#EAF4FF] transition-colors hover:text-[#7FD4FF]"
              >
                [ {t.breadcrumbWorld} ]
              </button>
              <span className="font-mono text-[9px] text-[#3A5464]">▸</span>
              <button
                type="button"
                onClick={enterGeorgia}
                className="px-1 text-[11px] tracking-[0.12em] text-[#6E8DA0] transition-colors hover:text-[#EAF4FF]"
              >
                [ {t.breadcrumbCountry} ]
              </button>
            </>
          )}
          {detail && selectedRegion && (
            <>
              <span className="font-mono text-[9px] text-[#3A5464]">▸</span>
              <button
                type="button"
                onClick={() => pickRegion(null)}
                className="px-1 font-mono text-[11px] tracking-[0.12em] text-[#7FD4FF]"
              >
                [ {regions.find((r) => r.id === selectedRegion)?.name ?? selectedRegion} ]
              </button>
            </>
          )}
        </nav>

        {/* glass zoom controls */}
        <div className="absolute right-5 top-5 z-[8] flex flex-col gap-px border border-white/[0.08] bg-white/[0.07] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => zoomBy(0.85)}
            aria-label={t.zoomIn}
            className="flex h-11 w-11 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF]"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoomBy(1.18)}
            aria-label={t.zoomOut}
            className="flex h-11 w-11 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF]"
          >
            −
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label={t.resetView}
            className="flex h-11 w-11 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF]"
          >
            ◎
          </button>
        </div>

        {/* hub switcher (map stage) */}
        {detail && (
          <div className="absolute left-5 top-[74px] z-[8] flex flex-col gap-px border border-white/[0.08] bg-[#0D1117]/65 backdrop-blur-xl">
            <span className="px-3 pt-2 pb-1 font-mono text-[8.5px] tracking-[0.24em] text-[#4A6A7C]">
              {t.regionsLabel}
            </span>
            {liveRegions.map((r) => {
              const on = selectedRegion === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => pickRegion(r.id)}
                  onPointerEnter={() => setHoverRegion(r.id)}
                  onPointerLeave={() => setHoverRegion(null)}
                  className={`flex min-w-[168px] items-center justify-between gap-4 px-3 py-2 text-left transition-colors duration-200 ${
                    on ? "bg-[#7FD4FF]/12 text-[#F4FAFF]" : "text-[#8AA3B2] hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-mono text-[10.5px] tracking-[0.08em]">{r.name}</span>
                  <span className="font-mono text-[9px] tabular-nums tracking-[0.12em] text-[#5F8296]">
                    {venuesByRegion(r.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* venue details card — glassmorphic DOM HUD */}
        {selectedVenue && (
          <div className="absolute bottom-[100px] right-5 z-[12] w-[300px] border border-white/[0.12] bg-[#0D1117]/80 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <span
              className="absolute left-0 right-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, ${selectedVenue.accent}, transparent)` }}
            />
            <button
              type="button"
              onClick={() => pickVenue(null)}
              aria-label={t.close}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center font-mono text-[13px] text-[#6E8DA0] transition-colors hover:text-[#EAF4FF]"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: selectedVenue.accent, boxShadow: `0 0 12px 2px ${selectedVenue.accent}` }}
                  />
                  <span className="font-mono text-[9px] tracking-[0.22em] text-[#7FA6BA] uppercase">
                    {selectedVenue.category} · {selectedVenue.city}
                  </span>
                </span>
                <h2 className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-[#F4FAFF]">
                  {selectedVenue.name}
                </h2>
              </div>

              <div className="flex items-center gap-2 border border-[#22C55E]/25 bg-[#22C55E]/[0.07] px-2.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_2px_rgba(34,197,94,0.7)] animate-pulse" />
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#B9F3CE]">{selectedVenue.status}</span>
              </div>

              <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#5F8296] uppercase">{t.membersLabel}</span>
                <span className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-[#F4FAFF]">
                  {selectedVenue.members}
                </span>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-3">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#5F8296] uppercase">{t.techLabel}</span>
                <span className="flex items-start gap-2 font-mono text-[10.5px] leading-[1.5] text-[#CFE6F2]">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#7FD4FF]" />
                  {selectedVenue.turnstile}
                </span>
                <span className="flex items-start gap-2 font-mono text-[10.5px] leading-[1.5] text-[#CFE6F2]">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#FF9900]" />
                  {selectedVenue.gateway}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* segmented filter pill */}
        <div className="absolute bottom-6 left-1/2 z-[8] flex -translate-x-1/2 gap-0.5 rounded-full border border-white/[0.09] bg-[#0D1117]/70 p-[3px] shadow-[0_18px_44px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setFilter(tab.key);
                setActiveCore(null);
                onCoreSelect?.(null);
              }}
              className={`min-h-[38px] rounded-full px-[18px] text-[12.5px] transition-colors duration-200 ${
                filter === tab.key ? "bg-[#EAF4FF] text-[#0A0D12]" : "text-[#8AA3B2] hover:text-[#EAF4FF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="pointer-events-none absolute bottom-[72px] right-6 z-[7] font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#4A6A7C]">
          {detail
            ? mapStatus === "READY"
              ? `${t.venuesLabel} · ${venues.length}`
              : mapStatus === "ERROR"
              ? t.mapError
              : t.loadingMap
            : activeCoreObj
            ? `${activeCoreObj.id} isolated`
            : t.hint}
        </span>
      </div>
    </div>
  );
}
