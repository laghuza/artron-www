import * as THREE from 'three';

export type MaterialWithBase = (THREE.LineBasicMaterial | THREE.MeshBasicMaterial) & {
  userData: { base: number };
};

export interface FaqModelObject {
  g: THREE.Group;
  mats: MaterialWithBase[];
  update: (t: number, dt?: number) => void;
}

export function kit() {
  const mats: MaterialWithBase[] = [];
  const L = (c: THREE.ColorRepresentation, o: number) => {
    const m = new THREE.LineBasicMaterial({
      color: c,
      transparent: true,
      opacity: o,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }) as THREE.LineBasicMaterial & { userData: { base: number } };
    m.userData = { base: o };
    mats.push(m);
    return m;
  };
  const S = (c: THREE.ColorRepresentation, o: number) => {
    const m = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: o,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }) as THREE.MeshBasicMaterial & { userData: { base: number } };
    m.userData = { base: o };
    mats.push(m);
    return m;
  };
  const E = (geo: THREE.BufferGeometry, m: THREE.LineBasicMaterial, th?: number) =>
    new THREE.LineSegments(new THREE.EdgesGeometry(geo, th || 1), m);

  const circle = (r: number, n: number, m: THREE.LineBasicMaterial) => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      p.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(p), m);
  };

  const dashed = (r: number, n: number, gap: number, m: THREE.LineBasicMaterial) => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const b = a + (Math.PI * 2 / n) * (1 - gap);
      p.push(
        new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0),
        new THREE.Vector3(Math.cos(b) * r, Math.sin(b) * r, 0)
      );
    }
    return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(p), m);
  };

  return { mats, L, S, E, circle, dashed };
}

export function rr(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}

export const slab = (k: ReturnType<typeof kit>, shape: THREE.Shape, depth: number, c: string, fo: number, lo: number) => {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 1,
    curveSegments: 6,
  });
  geo.center();
  const grp = new THREE.Group();
  grp.add(new THREE.Mesh(geo, k.S(c, fo)), k.E(geo, k.L(c, lo), 30));
  return grp;
};

