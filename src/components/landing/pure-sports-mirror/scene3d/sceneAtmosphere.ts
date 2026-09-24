import * as THREE from 'three';
import { createSoftTex, createRayTex } from './sceneUtils';

export interface AmbientParticleSystem {
  group: THREE.Group;
  update: (t: number) => void;
  dispose: () => void;
}

export interface VolumetricRaysSystem {
  group: THREE.Group;
  setColor: (c: THREE.Color) => void;
  update: (t: number) => void;
  dispose: () => void;
}

export const createAmbientField = (isMobile = false): AmbientParticleSystem => {
  const group = new THREE.Group();
  const tex = createSoftTex();

  // Mobile adaptive throttling: reduce particles by ~75% for 60fps on mobile
  const layers = [
    { n: isMobile ? 80 : 540, r: 17, h: 14, s: 0.085, o: 0.5, c: 0xb6d6f2, v: 0.05 },
    { n: isMobile ? 50 : 340, r: 11, h: 10, s: 0.14, o: 0.36, c: 0x9fd8ff, v: 0.08 },
    { n: isMobile ? 20 : 140, r: 6.6, h: 7, s: 0.22, o: 0.28, c: 0xffffff, v: 0.12 },
  ].map((L) => {
    const pos = new Float32Array(L.n * 3);
    const seed: { x: number; z: number; y: number; w: number; p: number }[] = [];
    for (let i = 0; i < L.n; i++) {
      const th = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(Math.random()) * L.r;
      seed.push({
        x: Math.cos(th) * rr,
        z: Math.sin(th) * rr,
        y: Math.random() * L.h,
        w: 0.4 + Math.random() * 0.9,
        p: Math.random() * 6.28,
      });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        map: tex,
        color: L.c,
        size: L.s,
        transparent: true,
        opacity: L.o,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    pts.frustumCulled = false;
    group.add(pts);
    return { L, pos, seed, geo, pts };
  });

  return {
    group,
    update(t: number) {
      layers.forEach(({ L, pos, seed, geo }) => {
        for (let i = 0; i < L.n; i++) {
          const s = seed[i];
          let y = (s.y + t * L.v * s.w) % L.h;
          if (y < 0) y += L.h;
          pos[i * 3] = s.x + Math.sin(t * 0.17 * s.w + s.p) * 0.36;
          pos[i * 3 + 1] = y - 2.4;
          pos[i * 3 + 2] = s.z + Math.cos(t * 0.14 * s.w + s.p) * 0.36;
        }
        geo.attributes.position.needsUpdate = true;
      });
      group.rotation.y = t * 0.011;
    },
    dispose() {
      tex.dispose();
      layers.forEach(({ geo, pts }) => {
        geo.dispose();
        if (Array.isArray(pts.material)) pts.material.forEach((m) => m.dispose());
        else pts.material.dispose();
      });
    },
  };
};

export const createLightRays = (isMobile = false): VolumetricRaysSystem => {
  const group = new THREE.Group();
  if (isMobile) {
    // Disabled on mobile to save GPU fill-rate
    return {
      group,
      setColor: () => {},
      update: () => {},
      dispose: () => {},
    };
  }

  const tex = createRayTex();
  const rawBeams: [number, number, number, number][] = [
    [-6.6, 0.3, -3.2, 1.0],
    [-2.5, -0.15, -1.0, 1.65],
    [2.3, 0.12, -2.4, 1.25],
    [6.1, -0.32, -4.0, 0.85],
    [0.5, 0.06, 2.6, 0.7],
  ];

  const beams = rawBeams.map(([x, rz, z, k], i) => {
    const geo = new THREE.PlaneGeometry(2.7 * k, 16);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      color: 0xcfe9ff,
      transparent: true,
      opacity: 0.08 * k,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, 4.6, z);
    m.rotation.set(0, -0.22 + i * 0.15, rz);
    group.add(m);
    return { m, o: 0.08 * k, p: i, geo, mat };
  });

  return {
    group,
    setColor(c: THREE.Color) {
      beams.forEach((b) => b.m.material.color.copy(c).lerp(new THREE.Color(0xe4f3ff), 0.62));
    },
    update(t: number) {
      beams.forEach((b) => {
        b.m.material.opacity = b.o * (0.5 + 0.5 * Math.sin(t * 0.33 + b.p * 1.3));
      });
    },
    dispose() {
      tex.dispose();
      beams.forEach((b) => {
        b.geo.dispose();
        b.mat.dispose();
      });
    },
  };
};
