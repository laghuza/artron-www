import * as THREE from 'three';
import { M, createBox, createLoop4, createFigure, createParts4 } from '../sceneUtils';
import { CYAN, GOLD } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

export const buildCoach = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number) => void)[] = [];

  // 0 · Staff command table
  const suit = M.std(0x1e2a35, 0.6, 0.25);
  const hd = M.glow(a, 0.9);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.62, 0.16, 36), M.std(0x121a23, 0.55, 0.35));
  disc.position.y = -0.78;
  P[0].add(disc);
  const top = new THREE.Mesh(new THREE.CircleGeometry(1.46, 36), M.glow(CYAN, 0.13));
  top.rotation.x = -Math.PI / 2;
  top.position.y = -0.69;
  P[0].add(top);
  P[0].add(createBox(0.9, 0.62, 0.9, M.std(0x0e151d, 0.6, 0.3), 0, -1.15, 0));

  const st: THREE.Group[] = [];
  for (let i = 0; i < 8; i++) {
    const th = (i / 8) * Math.PI * 2;
    const f = createFigure(suit, hd, 0.9);
    f.position.set(Math.cos(th) * 2.16, -1.3, Math.sin(th) * 2.16);
    f.rotation.y = -th + Math.PI / 2;
    P[0].add(f);
    st.push(f);
  }
  acts.push((t) => {
    st.forEach((f, i) => {
      f.position.y = -1.3 + Math.sin(t * 1.1 + i * 0.7) * 0.02;
    });
  });

  // 1 · Holographic game model
  const hb = new THREE.Group();
  hb.position.set(0, 0.92, 0);
  hb.rotation.x = -0.18;
  P[1].add(hb);
  hb.add(createLoop4(3.2, 2.0, 0.004, M.line(a, 0.55)));
  const nodes = [
    [-1.35, 0], [-0.8, -0.62], [-0.8, 0.62], [-0.2, -0.3], [0.2, 0.3], [0.8, -0.4], [1.2, 0],
  ].map(([x, z], i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), M.glow(i ? a : 0xffffff, 0.95));
    m.position.set(x, 0.06, z);
    hb.add(m);
    return { m, x, z, i };
  });
  acts.push((t) => {
    nodes.forEach((n) => {
      n.m.position.x = n.x + Math.sin(t * 0.6 + n.i) * 0.09;
      n.m.position.z = n.z + Math.cos(t * 0.5 + n.i * 1.3) * 0.07;
    });
  });

  // 2 · GPS / RPE / ACWR gauges
  const G2 = new THREE.Group();
  G2.position.set(2.85, 0.25, 0);
  G2.rotation.y = -0.5;
  P[2].add(G2);
  const arcs = [0, 1].map((i) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.22 + i * 0.11, 0.26 + i * 0.11, 32, 1, 0, Math.PI * 1.2), M.glow(i === 1 ? a : CYAN, 0.7));
    m.position.set(0, 0.16, 0.03);
    G2.add(m);
    return m;
  });
  acts.push((t) => {
    arcs.forEach((m, i) => {
      m.rotation.z = t * (0.5 - i * 0.14) * (i % 2 ? -1 : 1);
    });
  });

  // 3 · Licence / safeguarding wall
  const G3 = new THREE.Group();
  G3.position.set(-2.9, 0.4, 0);
  G3.rotation.y = 0.5;
  P[3].add(G3);
  [0, 1, 2].forEach((i) => {
    const c = new THREE.Group();
    c.position.set(0, 0.4 - i * 0.3, 0.03);
    G3.add(c);
    c.add(createBox(1.4, 0.2, 0.02, M.std(0x16202a, 0.5, 0.3)));
    const tick = createBox(0.1, 0.1, 0.02, M.glow(a, 0.9), -0.6, 0, 0.02);
    c.add(tick);
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};

export const buildMed = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number) => void)[] = [];

  // 0 · Treatment bays
  [-1.6, 1.6].forEach((x) => {
    const T = new THREE.Group();
    T.position.set(x, 0, 0);
    P[0].add(T);
    T.add(createBox(1.5, 0.08, 0.66, M.paint(0x0d222c, 0.95), 0, -0.78, 0));
    T.add(createBox(1.4, 0.05, 0.6, M.glow(CYAN, 0.22), 0, -0.73, 0));
  });

  // 1 · Joint scan spine & markers
  const G1 = new THREE.Group();
  G1.position.set(0, 0.2, 0);
  P[1].add(G1);
  const bone = M.glow(CYAN, 0.8);
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 6), bone);
    s.position.set(0, -0.4 + i * 0.11, 0);
    G1.add(s);
  }
  const scan = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.44, 32), M.glow(a, 0.4));
  scan.rotation.x = -Math.PI / 2;
  G1.add(scan);
  acts.push((t) => {
    const u = (t * 0.5) % 1;
    scan.position.y = -0.6 + u * 1.5;
  });

  // 2 · Biometrics HRV
  const G2 = new THREE.Group();
  G2.position.set(2.7, 0.45, 0);
  G2.rotation.y = -0.45;
  P[2].add(G2);
  const hrv = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 32, 1, 0, Math.PI * 1.4), M.glow(a, 0.8));
  hrv.position.set(-0.52, -0.3, 0.04);
  G2.add(hrv);
  acts.push((t) => {
    hrv.rotation.z = -t * 0.7;
  });

  // 3 · Return-to-play gate
  const G3 = new THREE.Group();
  G3.position.set(-2.8, 0, 0);
  P[3].add(G3);
  [0, 1].forEach((i) => {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.026, 8, 30, Math.PI), M.glow(a, 0.75));
    arch.position.set(0, -0.95, -0.6 + i * 1.2);
    arch.rotation.y = Math.PI / 2;
    G3.add(arch);
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};

export const buildGroup = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number) => void)[] = [];

  // 0 · Studio Floor & Mats
  P[0].add(createBox(6.2, 0.12, 4.2, M.std(0x0b1218, 0.75, 0.12), 0, -1.32, 0));
  const matM = M.paint(0x102730, 0.95);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const x = -1.8 + c * 1.2;
      const z = -0.8 + r * 1.0;
      P[0].add(createBox(0.8, 0.03, 0.62, matM, x, -1.24, z));
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.23, 20), M.glow(a, 0.6));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, -1.21, z);
      P[0].add(ring);
    }
  }

  // 1 · Studio cycling wheel
  const w = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.025, 8, 24), M.glow(a, 0.7));
  w.position.set(0, -1.0, 2.0);
  w.rotation.y = Math.PI / 2;
  P[1].add(w);
  acts.push((t) => {
    w.rotation.x = t * 2.5;
  });

  // 2 · HR board
  const G2 = new THREE.Group();
  G2.position.set(0, 1.15, -2.0);
  P[2].add(G2);
  const bars: THREE.Mesh[] = [];
  const zn = [0xff5a5a, 0xffb347, 0x7fe8b8, 0x00f0ff];
  for (let i = 0; i < 8; i++) {
    const b = createBox(0.14, 0.5, 0.02, M.glow(zn[i % 4], 0.8), -1.0 + i * 0.28, -0.2, 0.03);
    G2.add(b);
    bars.push(b);
  }
  acts.push((t) => {
    bars.forEach((b, i) => {
      const h = 0.12 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.55));
      b.scale.y = h / 0.5;
    });
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};

export const buildOps = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number) => void)[] = [];

  // 0 · 24/7 Rota Ring
  const G0 = new THREE.Group();
  G0.position.set(0, -0.5, 0);
  P[0].add(G0);
  const base = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.05, 10, 60), M.std(0x18222c, 0.45, 0.55));
  base.rotation.x = Math.PI / 2;
  G0.add(base);

  const ringGlow = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.3, 40, 1, 0, Math.PI * 1.4), M.glow(a, 0.6));
  ringGlow.rotation.x = -Math.PI / 2;
  ringGlow.position.y = 0.02;
  G0.add(ringGlow);

  const hand = createBox(2.0, 0.02, 0.03, M.glow(0xffffff, 0.75), 0, 0.06, 0);
  G0.add(hand);
  acts.push((t) => {
    hand.rotation.y = t * 0.35;
    ringGlow.rotation.z = t * 0.1;
  });

  // 2 · Server Rack & Clock-in
  const G2 = new THREE.Group();
  G2.position.set(3.0, 0, 0);
  G2.rotation.y = -0.5;
  P[2].add(G2);
  G2.add(createBox(0.7, 2.0, 0.7, M.std(0x131c25, 0.5, 0.5), 0, -0.3, 0));
  const scan = createBox(0.3, 0.04, 0.02, M.glow(a, 0.9), 0, -0.8, 0.36);
  G2.add(scan);
  acts.push((t) => {
    scan.position.y = -0.8 + Math.sin(t * 1.6) * 0.15;
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};

export const buildGuard = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number) => void)[] = [];

  // 0 · Basin & Guard Tower
  P[0].add(createBox(7.2, 0.16, 5.4, M.std(0x0e1620, 0.8, 0.1), 0, -1.34, 0));
  const towers = [[-2.5, -1.8], [2.5, 1.8]].map(([x, z], i) => {
    const T = new THREE.Group();
    T.position.set(x, -1.26, z);
    P[0].add(T);
    const seat = createFigure(M.std(0xff6b4a, 0.6, 0.15), M.glow(0xffffff, 0.95), 0.8);
    seat.position.set(0, 0.94, 0);
    T.add(seat);
    return { seat, i };
  });
  acts.push((t) => {
    towers.forEach((tw) => {
      tw.seat.rotation.y = Math.sin(t * 0.5 + tw.i) * 0.8;
    });
  });

  // 2 · Response Radar dial
  const dial = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.016, 8, 48), M.glow(a, 0.7));
  dial.rotation.x = Math.PI / 2;
  dial.position.y = 0.8;
  P[2].add(dial);
  acts.push((t) => {
    dial.rotation.z = t * 0.6;
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};
