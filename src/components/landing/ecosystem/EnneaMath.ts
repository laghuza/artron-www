import * as THREE from "three";

export const SPHERE_R = 2.0;
export const MIN_D = 3.8;
export const MAX_D = 8.5;

export const MAP_SCALE = 34;
export const MAP_CENTER = { lat: 42.05, lon: 43.5 };
export const DEPTH_INERT = 0.09;
export const DEPTH_LIVE = 0.24;
export const MAP_MIN_D = 2.0;
export const MAP_MAX_D = 9.0;
export const MAP_CAM = new THREE.Vector3(0.35, 3.55, 3.5);
export const CHIP_H = 44;

export const LINE_CYAN = 0x00e5ff;

export function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function mercator(lon: number, lat: number): [number, number] {
  const la = (Math.max(-85, Math.min(85, lat)) * Math.PI) / 180;
  return [(lon * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + la / 2))];
}

export const MAP_ORIGIN = mercator(MAP_CENTER.lon, MAP_CENTER.lat);

export function projectFlat(lon: number, lat: number): [number, number] {
  const [mx, my] = mercator(lon, lat);
  return [(mx - MAP_ORIGIN[0]) * MAP_SCALE, (my - MAP_ORIGIN[1]) * MAP_SCALE];
}

export function projectWorld(lon: number, lat: number, y: number): THREE.Vector3 {
  const [x, z] = projectFlat(lon, lat);
  return new THREE.Vector3(x, y, -z);
}

export function radialGlowTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
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

export function fitDistance(fov: number, aspect: number): number {
  const half = Math.tan((fov * Math.PI) / 360);
  return (SPHERE_R * 1.22) / (half * Math.min(1, aspect));
}

export function homePosition(lat: number, lon: number, dist = 6.0): THREE.Vector3 {
  const dir = latLonToVec3(lat, lon, 1).normalize();
  const theta = Math.atan2(dir.x, dir.z) - 0.3;
  const phi = Math.min(Math.PI - 0.4, Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1)) + 0.24);
  const s = Math.sin(phi);
  return new THREE.Vector3(dist * s * Math.sin(theta), dist * Math.cos(phi), dist * s * Math.cos(theta));
}

export const smoothstep = (x: number) => {
  const c = THREE.MathUtils.clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
};

export const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

export function makeLineMaterial(color: number = LINE_CYAN, opacity = 0.65): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false, // Fixes z-fighting
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
}

export function hardenLineMaterial(m: THREE.Material) {
  m.transparent = true;
  m.depthWrite = false;
  (m as THREE.LineBasicMaterial).depthTest = true;
  m.blending = THREE.AdditiveBlending;
  m.needsUpdate = true;
}

export function pinInFrustum(root: THREE.Object3D) {
  root.frustumCulled = false;
  root.traverse((o) => {
    o.frustumCulled = false;
    const g = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
    if (g && g.isBufferGeometry && !g.boundingSphere) g.computeBoundingSphere();
  });
}

export const DEPTH_FADE_GLSL = /* glsl */ `
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

export type Ring = number[][];

export interface Adm1Feature {
  properties?: { shapeName?: string; [k: string]: unknown };
  geometry?: { type: string; coordinates: unknown };
}

export function ringToPoints(ring: Ring): THREE.Vector2[] {
  const out: THREE.Vector2[] = [];
  for (const c of ring) {
    const [x, y] = projectFlat(c[0], c[1]);
    out.push(new THREE.Vector2(x, y));
  }
  return out;
}

export function featureShapes(feature: Adm1Feature): THREE.Shape[] {
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

export function outlinePositions(shapes: THREE.Shape[], y: number): number[] {
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
