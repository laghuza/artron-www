import * as THREE from 'three';
import { M, createBox, createLoop4 } from '../sceneUtils';
import { CYAN, EMER, WHITE } from '../sceneConfig';

export interface SceneModelHandle {
  group: THREE.Group;
  parts?: THREE.Group[];
  update: (t: number, dt: number) => void;
}

export const buildGym = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  g.add(createBox(9.4, 0.14, 6.6, M.std(0x0a1017, 0.72, 0.15), 0, -1.31, 0));
  const zones = [
    [-2.6, -1.4, 3.4, 3.2],
    [1.6, -1.6, 3.6, 2.6],
    [1.8, 1.9, 3.4, 2.4],
    [-2.8, 2.0, 3.2, 2.2],
  ];
  const zl: THREE.LineLoop[] = [];
  zones.forEach(([x, z, w, d], i) => {
    const l = createLoop4(w, d, -1.23, M.line(i % 2 ? a : CYAN, 0.55));
    l.position.set(x, 0, z);
    g.add(l);
    zl.push(l);
    const f = new THREE.Mesh(new THREE.PlaneGeometry(w, d), M.glow(i % 2 ? a : CYAN, 0.035));
    f.rotation.x = -Math.PI / 2;
    f.position.set(x, -1.225, z);
    g.add(f);
  });

  const screens: THREE.Mesh[] = [];
  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < 6; i++) {
      const x = -3.0 + i * 0.86;
      const z = -2.35 + r * 0.95;
      g.add(createBox(0.58, 0.16, 1.0, M.std(0x171f28, 0.55, 0.45), x, -1.16, z));
      g.add(createBox(0.5, 0.03, 0.86, M.paint(0x0c1218, 0.9), x, -1.07, z + 0.02));
      g.add(createBox(0.5, 0.52, 0.06, M.std(0x1c242e, 0.5, 0.5), x, -0.82, z - 0.46));
      const s = createBox(0.34, 0.2, 0.02, M.glow(CYAN, 0.8), x, -0.72, z - 0.42);
      g.add(s);
      screens.push(s);
    }
  }

  const plates: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const x = 1.2 + i * 1.5;
    const z = 1.6;
    [-0.62, 0.62].forEach((o) => g.add(createBox(0.1, 1.5, 0.1, M.std(0x222b34, 0.45, 0.6), x + o, -0.55, z)));
    g.add(createBox(1.4, 0.08, 0.08, M.std(0x2b343d, 0.35, 0.75), x, -0.05, z));
    [-0.5, 0.5].forEach((o) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 26), M.std(0x151c24, 0.4, 0.5));
      p.rotation.z = Math.PI / 2;
      p.position.set(x + o, -0.05, z);
      g.add(p);
      const rr = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 6, 36), M.glow(a, 0.75));
      rr.rotation.y = Math.PI / 2;
      rr.position.set(x + o, -0.05, z);
      g.add(rr);
      plates.push(rr);
    });
  }

  const beams: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const z = -0.9 + i * 0.9;
    [-0.34, 0.34].forEach((o) => {
      g.add(createBox(0.16, 1.0, 0.5, M.std(0x1a222b, 0.5, 0.5), -4.1, -0.8, z + o * 0.62));
    });
    const b = createBox(0.06, 0.5, 1.1, M.glow(a, 0.55), -4.1, -0.75, z);
    g.add(b);
    beams.push(b);
    const rd = createBox(0.14, 0.1, 0.16, M.glow(CYAN, 0.95), -3.96, -0.4, z + 0.56);
    g.add(rd);
    beams.push(rd);
  }
  g.add(createBox(0.07, 2.3, 6.4, M.wire(0x2a3946, 0.22), -4.4, -0.2, 0));

  const N = 80;
  const pos = new Float32Array(N * 3);
  const ph: { u: number; z: number; s: number }[] = [];
  for (let i = 0; i < N; i++) ph.push({ u: Math.random(), z: (Math.random() - 0.5) * 5.6, s: 0.5 + Math.random() * 0.8 });
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.add(new THREE.Points(pg, M.dot(WHITE, 0.07, 0.8)));

  return {
    group: g,
    update(t: number) {
      screens.forEach((s, i) => {
        (s.material as THREE.MeshBasicMaterial).opacity = 0.8 * (0.55 + 0.45 * Math.abs(Math.sin(t * 1.6 + i)));
      });
      beams.forEach((b, i) => {
        (b.material as THREE.MeshBasicMaterial).opacity = 0.6 * (0.4 + 0.6 * Math.abs(Math.sin(t * 2.4 + i * 0.7)));
      });
      plates.forEach((p, i) => {
        p.rotation.x = t * (0.6 + i * 0.05);
      });
      zl.forEach((l, i) => {
        (l.material as THREE.LineBasicMaterial).opacity = 0.55 * (0.6 + 0.4 * Math.sin(t * 0.9 + i * 1.3));
      });
      for (let i = 0; i < N; i++) {
        const p = ph[i];
        const u = (p.u + t * 0.06 * p.s) % 1;
        pos[i * 3] = -4.3 + u * 8.4;
        pos[i * 3 + 1] = -1.0 + Math.sin(t * 3 + i) * 0.03;
        pos[i * 3 + 2] = p.z * (0.35 + u * 0.8);
      }
      pg.attributes.position.needsUpdate = true;
    },
  };
};

export { buildPool } from './poolBuilder';


export const buildCourt = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const S = 0.3; // 1 unit = 3.33 m scale
  const LEN = 23.77 * S;
  const SL = 10.97 * S;
  const WID = 8.23 * S;
  const SVC = 6.4 * S; // ITF doubles / singles / service

  // Apron and court floor surface
  g.add(createBox(LEN + 2.6, 0.12, SL + 1.6, M.std(0x0a1a20, 0.9, 0.05), 0, -1.3, 0));
  const surf = createBox(LEN + 1.6, 0.04, SL + 0.9, M.paint(0x0d3040, 1), 0, -1.23, 0);
  g.add(surf);

  // Regulation lines
  const line = M.paint(0xf2f8ff, 0.95);
  const L = (w: number, d: number, x: number, z: number) => g.add(createBox(w, 0.02, d, line, x, -1.2, z));
  L(0.055, SL, -LEN / 2, 0); // baselines
  L(0.055, SL, LEN / 2, 0);
  L(LEN, 0.055, 0, -SL / 2); // doubles sidelines
  L(LEN, 0.055, 0, SL / 2);
  L(LEN, 0.05, 0, -WID / 2); // singles sidelines
  L(LEN, 0.05, 0, WID / 2);
  L(0.05, WID, -SVC, 0); // service lines
  L(0.05, WID, SVC, 0);
  L(SVC * 2, 0.05, 0, 0); // centre service line
  L(0.05, 0.22, -LEN / 2 + 0.03, 0); // centre marks
  L(0.05, 0.22, LEN / 2 - 0.03, 0);

  // Net: 1.07 m at posts sagging to 0.914 m at centre — parabolic cord
  const NW = SL + 2 * 0.914 * S;
  const HP = 1.07 * S;
  const SAG = (1.07 - 0.914) * S;
  const NY = -1.22;
  const ng = new THREE.PlaneGeometry(NW, HP, 64, 8);
  const np = ng.attributes.position.array as Float32Array;
  for (let i = 0; i < np.length; i += 3) {
    const u = np[i] / NW;
    const v = (np[i + 1] + HP / 2) / HP;
    np[i + 1] -= SAG * (1 - 4 * u * u) * v;
  }
  ng.computeVertexNormals();

  const netMat = M.wire(0xa9c8d8, 0.5);
  (netMat as any).userData = { o0: 0.5 };
  const net = new THREE.Mesh(ng, netMat);
  net.rotation.y = Math.PI / 2;
  net.position.y = NY + HP / 2;
  g.add(net);

  // Curved cord across the top of the net
  const cordCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, NY + HP, -NW / 2),
    new THREE.Vector3(0, NY + HP - 2 * SAG, 0),
    new THREE.Vector3(0, NY + HP, NW / 2)
  );
  const cord = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 44, 0.018, 8), M.paint(0xffffff, 0.95));
  g.add(cord);

  // Net posts
  [-1, 1].forEach((s) => {
    g.add(createBox(0.07, HP + 0.06, 0.07, M.std(0x263340, 0.5, 0.6), 0, NY + HP / 2, (s * NW) / 2));
  });

  // Padel glass walls + wire perimeter frames
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xa9e6ff,
    roughness: 0.03,
    metalness: 0,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  });
  [-1, 1].forEach((s) => {
    const w = createBox(0.04, 1.5, SL + 0.9, glass, s * (LEN / 2 + 0.7), -0.5, 0);
    g.add(w);
    const loop = createLoop4(0.04, SL + 0.9, 0, M.line(a, 0.45));
    loop.translateX(s * (LEN / 2 + 0.7)).translateY(0.25);
    g.add(loop);
  });

  // Glowing tennis ball & aura glow
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.075, 22, 16), M.paint(0xe8ff5a, 1));
  const bglow = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 12), M.glow(a, 0.45));
  g.add(ball, bglow);

  // Signature Green Trajectory Arc Trail (140-point trailing line)
  const tg = new THREE.BufferGeometry();
  const TP = new Float32Array(140 * 3);
  tg.setAttribute('position', new THREE.BufferAttribute(TP, 3));
  const trailLine = new THREE.Line(tg, M.line(a, 0.65));
  g.add(trailLine);

  // Dwell heat spots (telemetry IoT activity spots)
  const heat: THREE.Mesh[] = [];
  [
    [-2.6, 0.9],
    [-2.4, -1.0],
    [2.5, 0.8],
    [2.3, -0.9],
    [0.6, 0],
  ].forEach(([x, z]) => {
    const hm = M.glow(a, 0.09);
    (hm as any).userData = { o0: 0.09 };
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), hm);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, -1.19, z);
    g.add(m);
    heat.push(m);
  });

  // Rally: projectile physics, g = 9.81·S, ITF rebound coefficient e = 0.75
  const G = 9.81 * S;
  const E = 0.75;
  const FL = -1.2 + 0.075;
  const B = { x: -LEN / 2 + 0.6, y: FL + 0.85, z: 0.5, vx: 3.1, vy: 1.5, vz: -0.45 };

  // Prime trajectory points with initial position
  for (let i = 0; i < 140; i++) {
    TP[i * 3] = B.x;
    TP[i * 3 + 1] = B.y;
    TP[i * 3 + 2] = B.z;
  }
  tg.attributes.position.needsUpdate = true;

  return {
    group: g,
    update(t: number, dt: number) {
      B.vy -= G * dt;
      B.x += B.vx * dt;
      B.y += B.vy * dt;
      B.z += B.vz * dt;
      if (B.y < FL) {
        B.y = FL;
        B.vy = -B.vy * E;
        if (Math.abs(B.vy) < 0.4) B.vy = 1.5 + Math.random() * 0.8;
      }
      if (B.x > LEN / 2 - 0.3 || B.x < -LEN / 2 + 0.3) {
        // baseline strike
        B.x = Math.max(-LEN / 2 + 0.3, Math.min(LEN / 2 - 0.3, B.x));
        B.vx = -Math.sign(B.x) * (2.9 + Math.random() * 0.9);
        B.vy = 1.8 + Math.random() * 0.7;
        B.vz = (Math.random() - 0.5) * 1.2;
      }
      if (Math.abs(B.z) > SL / 2 - 0.15) B.vz = -B.vz;

      ball.position.set(B.x, B.y, B.z);
      bglow.position.copy(ball.position);

      const x = B.x;
      const y = B.y;
      const z = B.z;
      for (let i = 139; i > 0; i--) {
        TP[i * 3] = TP[(i - 1) * 3];
        TP[i * 3 + 1] = TP[(i - 1) * 3 + 1];
        TP[i * 3 + 2] = TP[(i - 1) * 3 + 2];
      }
      TP[0] = x;
      TP[1] = y;
      TP[2] = z;
      tg.attributes.position.needsUpdate = true;

      heat.forEach((h, i) => {
        const mat = h.material as THREE.Material & { opacity: number; userData?: { o0?: number } };
        mat.opacity = (mat.userData?.o0 || 0.09) * (0.5 + 0.5 * Math.sin(t * 1.1 + i));
        h.scale.setScalar(0.9 + 0.12 * Math.sin(t + i));
      });

      const nm = net.material as THREE.Material & { opacity: number; userData?: { o0?: number } };
      nm.opacity = (nm.userData?.o0 || 0.5) * (0.85 + 0.15 * Math.sin(t * 2));
    },
  };
};

export { buildOctagon } from './octagonBuilder';
export { buildArena } from './arenaBuilder';

