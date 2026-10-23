import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EnneaVenue } from "./types";
import { soundEngine } from "./EnneaAudioEngine";
import { GlobeCountryVisual } from "./EnneaGlobeCountries";
import { MIN_D, fitDistance, homePosition, MAP_CAM } from "./EnneaMath";

export interface RaycastingOptions {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  beaconHitMesh: THREE.Mesh;
  globeCountryVisual: () => GlobeCountryVisual | null;
  pinHits: () => THREE.Object3D[];
  mapMeshes: () => THREE.Object3D[];
  venues: () => EnneaVenue[];
  getViewMode: () => string;
  getSelectedVenueId: () => string | null;
  onEnterGeorgia: () => void;
  onSelectVenue: (venue: EnneaVenue | null) => void;
  onSelectRegion: (id: string | null) => void;
  setHoverRegion: (id: string | null) => void;
}

export function setupEnneaRaycasting(opts: RaycastingOptions) {
  const {
    renderer,
    camera,
    beaconHitMesh,
    globeCountryVisual,
    pinHits,
    mapMeshes,
    venues,
    getViewMode,
    getSelectedVenueId,
    onEnterGeorgia,
    onSelectVenue,
    onSelectRegion,
    setHoverRegion,
  } = opts;

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
    if (getViewMode() === "GLOBE") {
      const gcv = globeCountryVisual();
      const hitTargets = [beaconHitMesh, ...(gcv ? gcv.group.children : [])];
      const hit = raycaster.intersectObjects(hitTargets, false);
      renderer.domElement.style.cursor = hit.length ? "pointer" : "grab";
      return;
    }
    const pinHit = raycaster.intersectObjects(pinHits(), false)[0];
    if (pinHit) {
      renderer.domElement.style.cursor = "pointer";
      setHoverRegion(null);
      return;
    }
    const regionHit = raycaster.intersectObjects(mapMeshes(), false)[0];
    const id = (regionHit?.object.userData.regionId as string | null) ?? null;
    renderer.domElement.style.cursor = id ? "pointer" : "grab";
    setHoverRegion(id);
  };

  const onPointerDown = (e: PointerEvent) => {
    downAt = { x: e.clientX, y: e.clientY, time: performance.now() };
  };

  const onPointerUp = (e: PointerEvent) => {
    const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
    if (moved > 6 || performance.now() - downAt.time > 650) return;
    setNdc(e);

    if (getViewMode() === "GLOBE") {
      const gcv = globeCountryVisual();
      const hitTargets = [beaconHitMesh, ...(gcv ? gcv.group.children : [])];
      if (raycaster.intersectObjects(hitTargets, false).length) {
        soundEngine.cue("enter");
        onEnterGeorgia();
      }
      return;
    }

    const pinHit = raycaster.intersectObjects(pinHits(), false)[0];
    if (pinHit) {
      const vid = pinHit.object.userData.venueId as string;
      const venue = venues().find((v) => v.id === vid) ?? null;
      soundEngine.cue("click");
      onSelectVenue(getSelectedVenueId() === vid ? null : venue);
      return;
    }

    const regionHit = raycaster.intersectObjects(mapMeshes(), false)[0];
    const rid = (regionHit?.object.userData.regionId as string | null) ?? null;
    if (rid) {
      soundEngine.cue("click");
      onSelectRegion(rid);
    } else {
      onSelectVenue(null);
    }
  };

  const dom = renderer.domElement;
  dom.style.cursor = "grab";
  dom.addEventListener("pointermove", onPointerMove);
  dom.addEventListener("pointerdown", onPointerDown);
  dom.addEventListener("pointerup", onPointerUp);

  return () => {
    dom.removeEventListener("pointermove", onPointerMove);
    dom.removeEventListener("pointerdown", onPointerDown);
    dom.removeEventListener("pointerup", onPointerUp);
  };
}

export function placeHudPoint(
  node: HTMLDivElement | null | undefined,
  point: THREE.Vector3,
  opacity: number,
  w: number,
  h: number,
  camera: THREE.Camera,
  proj: THREE.Vector3
) {
  if (!node) return null;
  proj.copy(point).project(camera);
  const x = Math.round((proj.x * 0.5 + 0.5) * w);
  const y = Math.round((-proj.y * 0.5 + 0.5) * h);
  node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  node.style.opacity = proj.z > 1 ? "0" : opacity.toFixed(3);
  return { x, y };
}

export function updateRetinaLeaderBadge(
  badge: HTMLDivElement | null,
  beaconGroup: THREE.Group,
  camera: THREE.Camera,
  stageMix: number,
  w: number,
  h: number
) {
  if (!badge) return;
  if (stageMix > 0.05) {
    badge.style.opacity = "0";
    return;
  }
  const worldPos = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  beaconGroup.getWorldPosition(worldPos);
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
  badge.style.opacity = facing ? `${(1 - stageMix).toFixed(2)}` : "0";
}

export function zoomSceneCamera(controls: OrbitControls, factor: number) {
  soundEngine.cue("zoom");
  const cam = controls.object;
  const dir = cam.position.clone().sub(controls.target);
  const next = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
  cam.position.copy(controls.target).add(dir.setLength(next));
  controls.update();
}

export function resetSceneCamera(
  controls: OrbitControls,
  viewMode: string,
  onResetDetail: () => void
) {
  soundEngine.cue("reset");
  if (viewMode === "GEORGIA_DETAIL") {
    onResetDetail();
    controls.object.position.copy(MAP_CAM);
    controls.target.set(0, 0, 0);
    controls.update();
    return;
  }
  const cam = controls.object as THREE.PerspectiveCamera;
  const d = THREE.MathUtils.clamp(fitDistance(cam.fov, cam.aspect), MIN_D, controls.maxDistance);
  controls.object.position.copy(homePosition(41.7, 44.8, d));
  controls.target.set(0, 0, 0);
  controls.update();
}
