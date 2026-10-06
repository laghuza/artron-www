import * as THREE from 'three';
import { M, createBox } from '../sceneUtils';
import { CYAN, WHITE } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * Olympic Pool Digital Twin (50x25m FINA standard).
 * 8 lanes, Gerstner deep-water waves with analytic normals, 7 floating lane divider ropes,
 * starting blocks with angled platforms, backstroke turn flags, deck depth markers,
 * wireframe caustics lattice, and atmospheric water spray.
 */
export const buildPool = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const S = 0.2;
  const L = 50 * S;
  const W = 25 * S;
  const LW = 2.5 * S;
  const SPAN = 8 * LW;

  // 1. Deck perimeter apron
  g.add(createBox(L + 2.6, 0.2, W + 2.4, M.std(0x101922, 0.8, 0.1), 0, -1.32, 0));

  // 2. Pool inner basin walls / curbs
  [
    [L + 0.4, 0.9, 0.22, 0, -0.9, W / 2 + 0.1],
    [L + 0.4, 0.9, 0.22, 0, -0.9, -W / 2 - 0.1],
    [0.22, 0.9, W + 0.4, L / 2 + 0.1, -0.9, 0],
    [0.22, 0.9, W + 0.4, -L / 2 - 0.1, -0.9, 0],
  ].forEach((v) =>
    g.add(createBox(v[0], v[1], v[2], M.std(0x16222d, 0.7, 0.2), v[3], v[4], v[5]))
  );

  // 3. Pool floor
  g.add(createBox(L, 0.06, W, M.paint(0x062634, 1), 0, -1.28, 0));

  // 4. Floor lane lines and end crosses
  for (let i = 0; i < 8; i++) {
    const z = -SPAN / 2 + (i + 0.5) * LW;
    g.add(createBox(L - 4 * S * 2, 0.02, 0.05, M.paint(0x03323f, 0.92), 0, -1.24, z));
    [-1, 1].forEach((s) =>
      g.add(
        createBox(0.5, 0.02, 0.05, M.paint(0x03323f, 0.92), s * (L / 2 - 2 * S - 0.25), -1.24, z)
      )
    );
  }

  // 5. Water surface mesh with physical material
  const geo = new THREE.PlaneGeometry(L, W, 110, 56);
  const water = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({
      color: 0x0a6f9e,
      roughness: 0.06,
      metalness: 0.25,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
    })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.84;
  g.add(water);

  // 6. Caustics Wireframe overlay
  const caus = new THREE.Mesh(new THREE.PlaneGeometry(L, W, 46, 26), M.wire(CYAN, 0.13));
  caus.rotation.x = -Math.PI / 2;
  caus.position.y = -0.82;
  g.add(caus);

  // 7. Gerstner waves configuration (3 wave components)
  const base = geo.attributes.position.array.slice();
  const GW = [
    [1, 0.16, 1.3, 0.032, 0.62],
    [0.42, -1, 0.78, 0.019, 0.74],
    [-0.72, 0.5, 0.44, 0.009, 0.86],
  ].map(([dx, dz, lam, amp, q]) => {
    const l = Math.hypot(dx, dz);
    const kk = (2 * Math.PI) / lam;
    return { dx: dx / l, dz: dz / l, k: kk, w: Math.sqrt(9.81 * S * kk), a: amp, q: q / kk };
  });

  // 8. 7 Floating Lane Divider ropes with 52 spheres each
  const floats: { im: THREE.InstancedMesh; z: number }[] = [];
  for (let i = 1; i < 8; i++) {
    const z = -SPAN / 2 + i * LW;
    const im = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.05, 12, 8),
      M.std(i % 2 ? 0xe8f6ff : a, 0.35, 0.2),
      52
    );
    const d = new THREE.Object3D();
    for (let k = 0; k < 52; k++) {
      d.position.set(-L / 2 + (k / 51) * L, -0.8, z);
      d.updateMatrix();
      im.setMatrixAt(k, d.matrix);
    }
    g.add(im);
    floats.push({ im, z });
  }

  // 9. Backstroke turn flags at 5 m from each wall
  [-1, 1].forEach((s) =>
    g.add(createBox(0.03, 0.02, SPAN, M.glow(a, 0.5), s * (L / 2 - 5 * S), -0.55, 0))
  );

  // 10. Starting blocks, one per lane centre
  for (let i = 0; i < 8; i++) {
    const z = -SPAN / 2 + (i + 0.5) * LW;
    const x = -L / 2 - 0.45;
    g.add(createBox(0.42, 0.34, 0.42, M.std(0x1d2732, 0.55, 0.4), x, -1.05, z));
    const top = createBox(0.44, 0.04, 0.44, M.glow(i % 2 ? CYAN : a, 0.7), x, -0.87, z);
    top.rotation.x = -0.12;
    g.add(top);
    g.add(createBox(0.06, 0.26, 0.06, M.std(0x2b3742, 0.5, 0.6), x + 0.16, -0.72, z));
  }

  // 11. Depth markers along deck
  for (let i = 0; i < 9; i++) {
    const x = -L / 2 + (i / 8) * L;
    g.add(createBox(0.04, 0.02, 0.3, M.glow(WHITE, 0.5), x, -1.2, W / 2 + 0.55));
    if (i % 2 === 0) {
      g.add(createBox(0.16, 0.02, 0.06, M.glow(a, 0.6), x, -1.2, W / 2 + 0.82));
    }
  }

  // 12. Water spray / mist particle cloud
  const nSpray = 240;
  const sprayPos = new Float32Array(nSpray * 3);
  for (let i = 0; i < nSpray; i++) {
    sprayPos[i * 3] = (Math.random() - 0.5) * L;
    sprayPos[i * 3 + 1] = -0.8 + Math.random() * 0.5;
    sprayPos[i * 3 + 2] = (Math.random() - 0.5) * W;
  }
  const sprayGeo = new THREE.BufferGeometry();
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));
  const sprayPts = new THREE.Points(sprayGeo, M.dot(0xdff6ff, 0.05, 0.6));
  g.add(sprayPts);

  return {
    group: g,
    update(t: number) {
      const p = geo.attributes.position.array as Float32Array;
      const nr = geo.attributes.normal.array as Float32Array;
      for (let i = 0; i < p.length; i += 3) {
        const x0 = base[i];
        const y0 = base[i + 1];
        let dx = 0;
        let dy = 0;
        let h = 0;
        let nx = 0;
        let ny = 0;
        for (let j = 0; j < GW.length; j++) {
          const q = GW[j];
          const ph = q.k * (q.dx * x0 + q.dz * y0) - q.w * t;
          const c = Math.cos(ph);
          const s = Math.sin(ph);
          dx += q.q * q.a * q.dx * c;
          dy += q.q * q.a * q.dz * c;
          h += q.a * s;
          nx += q.a * q.k * q.dx * c;
          ny += q.a * q.k * q.dz * c;
        }
        p[i] = x0 + dx;
        p[i + 1] = y0 + dy;
        p[i + 2] = h;
        const il = 1 / Math.hypot(nx, ny, 1);
        nr[i] = -nx * il;
        nr[i + 1] = -ny * il;
        nr[i + 2] = il;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.normal.needsUpdate = true;

      caus.rotation.z = Math.sin(t * 0.2) * 0.02;
      const causMat = caus.material as THREE.MeshBasicMaterial & { userData: { o0?: number } };
      if (causMat.userData.o0 === undefined) causMat.userData.o0 = 0.13;
      causMat.opacity = causMat.userData.o0 * (0.6 + 0.4 * Math.sin(t * 1.4));

      floats.forEach((f, i) => {
        f.im.position.y = Math.sin(t * 1.8 + i * 0.6) * 0.022;
      });
      sprayPts.rotation.y = Math.sin(t * 0.1) * 0.05;
    },
  };
};
