import * as THREE from "three";
import {
  DEPTH_INERT,
  DEPTH_LIVE,
  makeLineMaterial,
  hardenLineMaterial,
  pinInFrustum,
  featureShapes,
  outlinePositions,
  projectWorld,
  Adm1Feature,
  LINE_CYAN,
} from "./EnneaMath";
import { EnneaRegion, EnneaVenue } from "./types";

export interface RegionEntry {
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

export interface PinEntry {
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

export interface MapBundle {
  mapStage: THREE.Group;
  regionEntries: RegionEntry[];
  pinEntries: PinEntry[];
  mapMeshes: THREE.Object3D[];
  pinHits: THREE.Object3D[];
  mapFadeMats: Array<THREE.Material & { opacity: number }>;
  baseOpacity: Map<THREE.Material, number>;
  disposables: Array<{ dispose: () => void }>;
}

export function buildGeorgiaMap(
  features: Adm1Feature[],
  regList: EnneaRegion[],
  venList: EnneaVenue[],
  accentColor: THREE.Color,
  iceColor: THREE.Color,
  pinGlow: THREE.Texture
): MapBundle {
  const disposables: Array<{ dispose: () => void }> = [];
  const mapStage = new THREE.Group();
  mapStage.visible = false;

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

  const buildPin = (venue: EnneaVenue, top: number, idx: number, siblings: number) => {
    const col = new THREE.Color(venue.accent);
    const group = new THREE.Group();
    const hubEntry = regionEntries.find((r) => r.id === venue.regionId);

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

    const outline = outlinePositions(shapes, top + 0.004);
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute("position", new THREE.Float32BufferAttribute(outline, 3));
    bGeo.computeBoundingSphere();
    const borderMat = makeLineMaterial(live ? 0xffffff : iceColor.getHex(), live ? 0.95 : 0.3);
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

  const grid = new THREE.GridHelper(14, 28, accentColor.getHex(), 0x16222c);
  const gm = grid.material as THREE.Material & { opacity: number };
  gm.opacity = 0.055;
  hardenLineMaterial(gm);
  grid.position.y = -0.01;
  mapStage.add(grid);
  registerFade(gm, 0.055);
  disposables.push(grid.geometry as unknown as { dispose: () => void }, gm);

  pinInFrustum(mapStage);

  return {
    mapStage,
    regionEntries,
    pinEntries,
    mapMeshes,
    pinHits,
    mapFadeMats,
    baseOpacity,
    disposables,
  };
}

export function fetchAndBuildAdm1(
  url: string,
  regList: EnneaRegion[],
  venList: EnneaVenue[],
  accentColor: THREE.Color,
  ice: THREE.Color,
  pinGlow: THREE.Texture,
  onLoaded: (mapBundle: MapBundle, features: Adm1Feature[]) => void,
  onError: (err: unknown) => void
) {
  let isCancelled = false;
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then((json: { features?: Adm1Feature[] }) => {
      if (isCancelled) return;
      const feats = json?.features ?? [];
      if (!feats.length) throw new Error("empty");
      requestAnimationFrame(() => {
        if (isCancelled) return;
        const bundle = buildGeorgiaMap(feats, regList, venList, accentColor, ice, pinGlow);
        onLoaded(bundle, feats);
      });
    })
    .catch((err) => {
      if (!isCancelled) onError(err);
    });

  return () => {
    isCancelled = true;
  };
}
