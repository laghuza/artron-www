import * as THREE from 'three';
import { FaqModelObject, MaterialWithBase, kit, rr, slab } from './faqModelsKit';

export function buildWallet(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group(), w = new THREE.Group();
  g.add(w);
  w.add(slab(k, rr(2.1, 1.35, 0.16), 0.28, c, 0.07, 0.85));

  const flap = new THREE.Group();
  flap.position.set(0.72, -0.05, 0.2);
  w.add(flap);
  const fs = rr(0.8, 0.56, 0.12);
  flap.add(
    new THREE.Mesh(new THREE.ShapeGeometry(fs), k.S(c, 0.1)),
    new THREE.Line(new THREE.BufferGeometry().setFromPoints(fs.getPoints().map((p) => new THREE.Vector3(p.x, p.y, 0))), k.L(c, 0.8))
  );

  const btn = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), k.S(c, 0.9));
  btn.position.set(0.2, 0, 0.01);
  flap.add(btn);

  const card = new THREE.Group();
  w.add(card);
  card.add(slab(k, rr(1.75, 1.1, 0.1), 0.02, c, 0.1, 0.9));

  const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.14), k.S(c, 0.35));
  stripe.position.set(0, 0.28, 0.03);
  card.add(stripe);

  const chip = k.E(new THREE.PlaneGeometry(0.26, 0.2), k.L(c, 0.8));
  chip.position.set(-0.55, 0, 0.03);
  card.add(chip);

  const arr = new THREE.Group();
  arr.rotation.x = 0.25;
  g.add(arr);

  const R = 1.55, arcM = k.S(c, 0.85), headM = k.S(c, 0.95);
  [0, Math.PI].forEach((b) => {
    const pts: THREE.Vector3[] = [];
    for (let a = b + 0.25; a <= b + 2.55; a += 0.1) pts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0));
    arr.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.028, 6, false), arcM));
    const a1 = b + 2.55;
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.24, 12), headM);
    head.position.set(Math.cos(a1) * R - Math.sin(a1) * 0.08, Math.sin(a1) * R + Math.cos(a1) * 0.08, 0);
    head.rotation.z = a1;
    arr.add(head);
  });

  const update = (t: number) => {
    arr.rotation.z = t * 1.1;
    arcM.userData.base = 0.65 + 0.3 * Math.sin(t * 2.2);
    const ph = 0.5 - 0.5 * Math.cos(t * 1.2);
    card.position.set(-0.08, 0.05 + 0.65 * ph, 0);
    w.rotation.y = Math.sin(t * 0.6) * 0.22;
    g.position.y = Math.sin(t * 1.1) * 0.05;
  };
  return { g, mats: k.mats, update };
}

export function buildQR(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group(), spin = new THREE.Group();
  g.add(spin);
  spin.add(slab(k, rr(1.5, 2.05, 0.16), 0.05, c, 0.07, 0.9));

  const Z = 0.05;
  const slot = k.E(new THREE.PlaneGeometry(0.4, 0.08), k.L(c, 0.8));
  slot.position.set(0, 0.84, Z);
  spin.add(slot);

  const tl = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.05), k.S(c, 0.5));
  tl.position.set(0, 0.62, Z);
  spin.add(tl);

  const N = 11, cell = 0.085, oy = -0.02;
  const cells: THREE.Mesh[] = [];
  const cellG = new THREE.PlaneGeometry(cell * 0.84, cell * 0.84), cellM = k.S(c, 0.95);
  const finder = (i: number, j: number) => (i < 3 && j < 3) || (i > 7 && j < 3) || (i < 3 && j > 7);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const m = new THREE.Mesh(cellG, cellM);
      m.position.set((i - 5) * cell, oy + (5 - j) * cell, Z);
      spin.add(m);
      if (!finder(i, j)) cells.push(m);
    }
  }

  const frame = k.E(new THREE.PlaneGeometry(N * cell + 0.12, N * cell + 0.12), k.L(c, 0.55));
  frame.position.set(0, oy, Z);
  spin.add(frame);

  const barM = k.S(c, 0.8);
  const bar = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.04), barM);
  bar.position.set(0, -0.72, Z);
  spin.add(bar);

  const track = k.E(new THREE.PlaneGeometry(1, 0.04), k.L(c, 0.3));
  track.position.set(0, -0.72, Z);
  spin.add(track);

  const scanM = k.S(c, 0.6);
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(N * cell + 0.16, 0.012), scanM);
  spin.add(scan);

  const base = new THREE.Group();
  base.position.y = -1.45;
  g.add(base);

  const b1 = k.circle(0.62, 64, k.L(c, 0.8));
  const b2 = k.dashed(0.9, 40, 0.55, k.L(c, 0.45));
  b1.rotation.x = b2.rotation.x = Math.PI / 2;
  base.add(b1, b2);

  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.62, 0.45, 40, 1, true), k.S(c, 0.06));
  cone.position.y = 0.23;
  base.add(cone);
  g.position.y = 0.2;

  const refresh = () => cells.forEach((m) => { m.visible = Math.random() > 0.48; });
  refresh();
  let last = 0;

  const update = (t: number) => {
    if (t - last > 1.5 || t < last) {
      last = t;
      refresh();
    }
    const ph = (t - last) / 1.5;
    bar.scale.x = Math.max(0.001, 1 - ph);
    bar.position.x = -0.5 * ph;
    scan.position.set(0, oy + (N * cell) / 2 - ph * N * cell, Z + 0.01);
    scanM.userData.base = 0.7 * Math.sin(ph * Math.PI);
    spin.rotation.y = t * 0.8;
    spin.position.y = Math.sin(t * 1.3) * 0.05;
    b2.rotation.z = t * 0.4;
  };
  return { g, mats: k.mats, update };
}

export function buildHub(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group(), hub = new THREE.Group();
  hub.position.y = -0.35;
  g.add(hub);

  const hb = new THREE.BoxGeometry(1.7, 0.36, 1.05);
  hub.add(new THREE.Mesh(hb, k.S(c, 0.07)), k.E(hb, k.L(c, 0.9)));

  const top = k.E(new THREE.PlaneGeometry(1.3, 0.7), k.L(c, 0.35));
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.185;
  hub.add(top);

  const coreM = k.S(c, 0.8);
  const core = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), coreM);
  core.rotation.x = -Math.PI / 2;
  core.position.y = 0.19;
  hub.add(core);

  const coreR = k.circle(0.26, 40, k.L(c, 0.6));
  coreR.rotation.x = Math.PI / 2;
  coreR.position.y = 0.19;
  hub.add(coreR);

  const leds: MaterialWithBase[] = [], ledG = new THREE.PlaneGeometry(0.12, 0.05);
  for (let i = 0; i < 6; i++) {
    const m = k.S(c, 0.6);
    const l = new THREE.Mesh(ledG, m);
    l.position.set(-0.62 + i * 0.18, 0, 0.53);
    hub.add(l);
    leds.push(m);
  }

  const port = k.E(new THREE.PlaneGeometry(0.22, 0.12), k.L(c, 0.7));
  port.position.set(0.6, 0, 0.53);
  hub.add(port);

  const tips: MaterialWithBase[] = [];
  [-0.7, 0.7].forEach((x) => {
    const ag = new THREE.CylinderGeometry(0.018, 0.018, 0.8, 6);
    ag.translate(0, 0.4, 0);
    const a = new THREE.Mesh(ag, k.S(c, 0.7));
    a.position.set(x, 0.18, -0.4);
    hub.add(a);
    const m = k.S(c, 0.9);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), m);
    tip.position.set(x, 0.98, -0.4);
    hub.add(tip);
    tips.push(m);
  });

  const nodes = new THREE.Group();
  g.add(nodes);
  const C = new THREE.Vector3(0, -0.2, 0);
  const pk: { s: THREE.Mesh; m: MaterialWithBase; P: THREE.Vector3; off: number }[] = [];
  const octG = new THREE.OctahedronGeometry(0.13);
  const hy = [0.45, -0.1, 0.75, 0.1, 0.6, -0.25];

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const P = new THREE.Vector3(Math.cos(a) * 1.75, hy[i], Math.sin(a) * 1.75);
    const o = new THREE.Group();
    o.position.copy(P);
    o.add(new THREE.Mesh(octG, k.S(c, 0.15)), k.E(octG, k.L(c, 0.8)));
    nodes.add(o);
    nodes.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([P, C]), k.L(c, 0.22)));
    const m = k.S(c, 0.9);
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), m);
    nodes.add(s);
    pk.push({ s, m, P, off: i / 6 });
  }

  const floor = new THREE.Group();
  floor.position.y = -0.55;
  floor.rotation.x = Math.PI / 2;
  g.add(floor);

  const pa = k.circle(1, 64, k.L(c, 0.6));
  const pb = k.circle(1, 64, k.L(c, 0.6));
  const fr = k.dashed(1.3, 48, 0.55, k.L(c, 0.3));
  floor.add(pa, pb, fr);

  const update = (t: number) => {
    leds.forEach((m, i) => {
      m.userData.base = 0.2 + 0.75 * Math.max(0, Math.sin(t * 4 - i * 0.8));
    });
    const cp = 0.5 + 0.5 * Math.sin(t * 3);
    coreM.userData.base = 0.45 + 0.5 * cp;
    coreR.scale.setScalar(1 + 0.25 * cp);
    tips.forEach((m, i) => {
      m.userData.base = 0.4 + 0.55 * (0.5 + 0.5 * Math.sin(t * 5 + i * 2));
    });
    pk.forEach((q) => {
      const p = (t * 0.5 + q.off) % 1;
      q.s.position.lerpVectors(q.P, C, p);
      q.m.userData.base = 0.9 * Math.sin(p * Math.PI);
    });
    nodes.rotation.y = t * 0.15;
    fr.rotation.z = t * 0.2;
    [pa, pb].forEach((r, i) => {
      const p = (t * 0.55 + i * 0.5) % 1;
      r.scale.setScalar(0.3 + p * 1.6);
      r.material.userData.base = 0.6 * (1 - p);
    });
  };
  return { g, mats: k.mats, update };
}

export function buildBridge(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group();
  const legacy = new THREE.Group();
  legacy.position.set(-1.05, 0, 0);
  g.add(legacy);

  const lg = new THREE.BoxGeometry(0.6, 1.8, 0.6);
  legacy.add(new THREE.Mesh(lg, k.S(c, 0.03)), k.E(lg, k.L(c, 0.38)));

  const slots: MaterialWithBase[] = [];
  for (let i = 0; i < 4; i++) {
    const m = k.L(c, 0.25);
    const p = k.E(new THREE.PlaneGeometry(0.38, 0.1), m);
    p.position.set(0, 0.6 - i * 0.2, 0.302);
    legacy.add(p);
    slots.push(m);
  }

  const armG = new THREE.BoxGeometry(0.06, 0.06, 1.05);
  armG.translate(0, 0, 0.525);
  const arm = new THREE.Group();
  arm.position.set(0, 0.25, 0.3);
  arm.add(new THREE.Mesh(armG, k.S(c, 0.18)), k.E(armG, k.L(c, 0.55)));
  legacy.add(arm);

  const lport = k.E(new THREE.PlaneGeometry(0.16, 0.1), k.L(c, 0.8));
  lport.rotation.y = Math.PI / 2;
  lport.position.set(0.302, -0.35, 0);
  legacy.add(lport);

  const hs = k.circle(0.12, 32, k.L(c, 0.7));
  hs.rotation.y = Math.PI / 2;
  hs.position.set(0.31, -0.35, 0);
  legacy.add(hs);

  const ctl = new THREE.Group();
  ctl.position.set(0.95, -0.55, 0);
  g.add(ctl);

  const cb = new THREE.BoxGeometry(0.7, 0.4, 0.5);
  ctl.add(new THREE.Mesh(cb, k.S(c, 0.1)), k.E(cb, k.L(c, 0.95)));

  const leds: MaterialWithBase[] = [], ledG = new THREE.PlaneGeometry(0.07, 0.04);
  for (let i = 0; i < 4; i++) {
    const m = k.S(c, 0.6);
    const l = new THREE.Mesh(ledG, m);
    l.position.set(-0.2 + i * 0.11, 0.06, 0.251);
    ctl.add(l);
    leds.push(m);
  }

  for (let i = 0; i < 3; i++) {
    const p = k.E(new THREE.PlaneGeometry(0.1, 0.07), k.L(c, 0.6));
    p.position.set(-0.15 + i * 0.15, -0.08, 0.251);
    ctl.add(p);
  }

  const antG = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6);
  antG.translate(0, 0.25, 0);
  const ant = new THREE.Mesh(antG, k.S(c, 0.7));
  ant.position.set(0.25, 0.2, -0.15);
  ctl.add(ant);

  const tipM = k.S(c, 0.9);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), tipM);
  tip.position.set(0.25, 0.72, -0.15);
  ctl.add(tip);

  const wave = k.circle(0.1, 32, k.L(c, 0.6));
  wave.rotation.x = Math.PI / 2;
  wave.position.set(0.25, 0.72, -0.15);
  ctl.add(wave);

  const halo = k.dashed(0.62, 36, 0.55, k.L(c, 0.45));
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -0.2;
  ctl.add(halo);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.74, -0.35, 0),
    new THREE.Vector3(-0.35, -0.8, 0.15),
    new THREE.Vector3(0.25, -0.78, 0.1),
    new THREE.Vector3(0.6, -0.55, 0),
  ]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.018, 6, false), k.S(c, 0.5)));

  const pk: { s: THREE.Mesh; m: MaterialWithBase; off: number; rev: boolean }[] = [];
  const pG = new THREE.SphereGeometry(0.035, 8, 6);
  for (let i = 0; i < 4; i++) {
    const m = k.S(c, 0.95);
    const s = new THREE.Mesh(pG, m);
    g.add(s);
    pk.push({ s, m, off: i / 4, rev: i % 2 === 1 });
  }

  const floor = new THREE.Group();
  floor.position.y = -0.95;
  floor.rotation.x = Math.PI / 2;
  g.add(floor);

  const fr = k.dashed(1.7, 56, 0.55, k.L(c, 0.28));
  const pulse = k.circle(1, 64, k.L(c, 0.55));
  pulse.position.x = 0.95;
  floor.add(fr, pulse);
  g.position.y = 0.1;

  const update = (t: number) => {
    const s = (t * 0.4) % 1;
    const open = Math.max(0, Math.sin((s - 0.5) * Math.PI * 2));
    arm.rotation.x = -1.35 * Math.pow(open, 0.6);
    slots.forEach((m, i) => {
      m.userData.base = 0.2 + 0.5 * open * (i === 0 ? 1 : 0.4);
    });
    pk.forEach((q) => {
      const p = (t * 0.45 + q.off) % 1;
      q.s.position.copy(curve.getPointAt(q.rev ? 1 - p : p));
      q.m.userData.base = 0.95 * Math.sin(p * Math.PI);
    });
    leds.forEach((m, i) => {
      m.userData.base = 0.25 + 0.7 * Math.max(0, Math.sin(t * 5 - i * 0.9));
    });
    const hp = (t * 0.9) % 1;
    hs.scale.setScalar(1 + hp * 1.6);
    hs.material.userData.base = 0.7 * (1 - hp);
    const wp = (t * 0.7) % 1;
    wave.scale.setScalar(1 + wp * 3);
    wave.material.userData.base = 0.6 * (1 - wp);
    tipM.userData.base = 0.5 + 0.45 * Math.sin(t * 4);
    halo.rotation.z = t * 0.4;
    fr.rotation.z = -t * 0.12;
    const pp = (t * 0.5) % 1;
    pulse.scale.setScalar(0.25 + pp * 0.9);
    pulse.material.userData.base = 0.55 * (1 - pp);
  };
  return { g, mats: k.mats, update };
}

