import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  MIN_D,
  MAX_D,
  MAP_MIN_D,
  MAP_MAX_D,
  fitDistance,
  smoothstep,
  damp,
} from "./EnneaMath";
import { GlobeBundle } from "./EnneaGlobeBuilder";
import { RegionEntry, PinEntry } from "./EnneaMapBuilder";
import { GlobeCountryVisual } from "./EnneaGlobeCountries";
import { placeHudPoint, updateRetinaLeaderBadge } from "./EnneaSceneInteractions";
import { ViewMode } from "./types";

export interface AnimState {
  isTransitioning: boolean;
  progress: number;
  to: ViewMode;
  startCamPos: THREE.Vector3;
  targetCamPos: THREE.Vector3;
  startLookAt: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  stageMix: number;
}

export interface TickContext {
  dt: number;
  time: number;
  anim: AnimState;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  globeBundle: GlobeBundle;
  mapStageGroup: THREE.Group | null;
  globeCountryVisual: GlobeCountryVisual | null;
  regionEntries: RegionEntry[];
  pinEntries: PinEntry[];
  mapFadeMats: Array<THREE.Material & { opacity: number }>;
  baseOpacity: Map<THREE.Material, number>;
  hoverRegionId: string | null;
  selectedRegionId: string | null;
  selectedVenueId: string | null;
  isHot: boolean;
  userZoomedRef: React.MutableRefObject<boolean>;
  cachedW: number;
  cachedH: number;
  pinLabelRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  regionLabelRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  proj: THREE.Vector3;
}

export function applyEnneaMix(
  anim: AnimState,
  globeBundle: GlobeBundle,
  mapStageGroup: THREE.Group | null,
  globeCountryVisual: GlobeCountryVisual | null,
  mapFadeMats: Array<THREE.Material & { opacity: number }>,
  baseOpacity: Map<THREE.Material, number>
) {
  globeBundle.uniforms.uGlobal.value = 1 - anim.stageMix;
  globeBundle.shellMaterial.opacity = 1 - anim.stageMix;
  globeBundle.latticeMaterial.opacity = 0.65 * (1 - anim.stageMix);
  globeCountryVisual?.setOpacity(1 - anim.stageMix);
  globeBundle.globeGroup.visible = anim.stageMix < 0.985;
  if (mapStageGroup) mapStageGroup.visible = anim.stageMix > 0.015;
  for (const m of mapFadeMats) m.opacity = (baseOpacity.get(m) ?? 1) * anim.stageMix;
  globeBundle.starsMaterial.opacity = 0.35 * (1 - anim.stageMix * 0.45);
}

export function updateEnneaTick(ctx: TickContext) {
  const {
    dt,
    time,
    anim,
    camera,
    controls,
    globeBundle,
    mapStageGroup,
    globeCountryVisual,
    regionEntries,
    pinEntries,
    mapFadeMats,
    baseOpacity,
    hoverRegionId,
    selectedRegionId,
    selectedVenueId,
    isHot,
    userZoomedRef,
    cachedW,
    cachedH,
    pinLabelRefs,
    regionLabelRefs,
    badgeRef,
    proj,
  } = ctx;

  globeBundle.uniforms.uTime.value = time;

  if (anim.isTransitioning) {
    anim.progress += dt * 1.2;
    const tVal = Math.min(anim.progress, 1);
    const ease = tVal < 0.5 ? 4 * tVal * tVal * tVal : 1 - Math.pow(-2 * tVal + 2, 3) / 2;

    camera.position.lerpVectors(anim.startCamPos, anim.targetCamPos, ease);
    controls.target.lerpVectors(anim.startLookAt, anim.targetLookAt, ease);
    camera.lookAt(controls.target);
    camera.updateMatrixWorld();

    const fade = smoothstep(Math.min(1, tVal * 1.25));
    anim.stageMix = anim.to === "GEORGIA_DETAIL" ? fade : 1 - fade;

    if (tVal >= 1) {
      anim.isTransitioning = false;
      camera.position.copy(anim.targetCamPos);
      controls.target.copy(anim.targetLookAt);
      if (anim.to === "GLOBE") {
        controls.minDistance = MIN_D;
        controls.maxDistance = Math.max(MAX_D, fitDistance(camera.fov, camera.aspect) + 0.8);
        controls.minPolarAngle = 0.35;
        controls.maxPolarAngle = Math.PI - 0.35;
        userZoomedRef.current = false;
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

  globeBundle.starFieldMesh.rotation.y -= dt * 0.006;
  globeCountryVisual?.tick(time, isHot);

  /* Region hover & elevation */
  for (const r of regionEntries) {
    const on = hoverRegionId === r.id || selectedRegionId === r.id;
    const target = on ? 0.46 : r.live ? 0.14 : 0.04;
    r.faceMat.emissiveIntensity += (target - r.faceMat.emissiveIntensity) * damp(8, dt);
    baseOpacity.set(r.borderMat, on ? 1 : r.live ? 0.95 : 0.3);
    baseOpacity.set(r.glowMat, on ? 0.95 : r.live ? 0.65 : 0.18);
    r.mesh.scale.y += ((on ? 1.35 : 1) - r.mesh.scale.y) * damp(7, dt);
  }

  /* Venue pin animations */
  const hasVenueSelection = !!selectedVenueId;
  for (const p of pinEntries) {
    const isSelected = selectedVenueId === p.id;
    p.group.visible = hasVenueSelection ? isSelected : true;
    if (!p.group.visible) continue;

    const beat = (time * (isSelected ? 1.5 : 0.85) + p.seed) % 1;
    p.ring.scale.setScalar(1 + beat * (isSelected ? 2.6 : 1.8));
    baseOpacity.set(p.ringMat, (1 - beat) * (isSelected ? 0.95 : 0.6));
    p.head.rotation.y += dt * (isSelected ? 2.4 : 0.9);
    p.head.position.y = 0.42 + Math.sin(time * 1.7 + p.seed) * 0.012 + (isSelected ? 0.05 : 0);
    baseOpacity.set(p.haloMat, isSelected ? 1 : 0.7);
  }

  applyEnneaMix(anim, globeBundle, mapStageGroup, globeCountryVisual, mapFadeMats, baseOpacity);

  /* DOM HUD Positioning */
  const w = cachedW;
  const h = cachedH;

  if (anim.stageMix > 0.02) {
    for (const p of pinEntries) {
      const isSelected = selectedVenueId === p.id;
      const node = pinLabelRefs.current.get(p.id);
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
      const at = placeHudPoint(node, p.anchor, anim.stageMix * (isSelected ? 1 : 0.85), w, h, camera, proj);
      const chip = node?.firstElementChild as HTMLElement | undefined;
      if (at && chip) {
        const flipDown = p.down || at.y - p.fan - 44 < 170;
        const yOff = flipDown ? `${34 + p.slot * 50}px` : `calc(-100% - ${p.fan}px)`;
        const xShift = (flipDown && at.x > 200) || at.x > w - 200 ? "calc(-100% - 12px)" : "12px";
        chip.style.transform = `translate(${xShift}, ${yOff})`;
      }
    }
    for (const r of regionEntries) {
      const on = hoverRegionId === r.id || selectedRegionId === r.id;
      placeHudPoint(regionLabelRefs.current.get(r.id), r.center, anim.stageMix * (on ? 1 : 0.55), w, h, camera, proj);
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
  updateRetinaLeaderBadge(badgeRef.current, globeBundle.beaconGroup, camera, anim.stageMix, w, h);
}
