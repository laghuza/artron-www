import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MIN_D, MAX_D, homePosition } from "./EnneaMath";

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  world: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
}

export function initEnneaScene(
  canvas: HTMLCanvasElement,
  wrap: HTMLDivElement,
  accentColor: THREE.Color
): SceneContext {
  const disposables: Array<{ dispose: () => void }> = [];

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

  const world = new THREE.Group();
  scene.add(world);

  scene.add(new THREE.AmbientLight(0x93b6c9, 0.85));
  const keyLight = new THREE.DirectionalLight(0xdff2ff, 1.25);
  keyLight.position.set(2.6, 5.2, 3.1);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(accentColor.getHex(), 0.6);
  rimLight.position.set(-3.4, 2.2, -2.8);
  scene.add(rimLight);

  return {
    scene,
    camera,
    renderer,
    controls,
    world,
    disposables,
  };
}
