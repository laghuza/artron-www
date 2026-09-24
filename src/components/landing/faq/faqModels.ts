import * as THREE from 'three';

export type MaterialWithBase = (THREE.LineBasicMaterial | THREE.MeshBasicMaterial) & {
  userData: { base: number };
};

export interface FaqModelObject {
  g: THREE.Group;
  mats: MaterialWithBase[];
  update: (t: number, dt?: number) => void;
}

function kit() {
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

function rr(w: number, h: number, r: number) {
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

const slab = (k: ReturnType<typeof kit>, shape: THREE.Shape, depth: number, c: string, fo: number, lo: number) => {
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

export function buildTurnstile(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group();
  const cab = new THREE.BoxGeometry(0.8, 1.9, 0.7);
  const body = new THREE.Group();
  body.position.set(-0.5, 0, 0);
  body.add(new THREE.Mesh(cab, k.S(c, 0.05)), k.E(cab, k.L(c, 0.9)));

  const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.2), k.S(c, 0.55));
  panel.position.set(0, 0.7, 0.352);
  body.add(panel);

  const reader = k.circle(0.17, 28, k.L(c, 0.9));
  reader.rotation.x = Math.PI / 2;
  reader.position.y = 0.952;
  body.add(reader);

  const readerIn = k.circle(0.08, 20, k.L(c, 0.6));
  readerIn.rotation.x = Math.PI / 2;
  readerIn.position.y = 0.952;
  body.add(readerIn);
  g.add(body);

  const tilt = new THREE.Group();
  tilt.position.set(-0.08, 0.4, 0);
  tilt.rotation.z = -0.6;
  g.add(tilt);

  const rotor = new THREE.Group();
  tilt.add(rotor);

  const hub = new THREE.CylinderGeometry(0.13, 0.13, 0.26, 8);
  hub.rotateZ(Math.PI / 2);
  rotor.add(new THREE.Mesh(hub, k.S(c, 0.25)), k.E(hub, k.L(c, 0.9)));

  const armG = new THREE.CylinderGeometry(0.035, 0.035, 1.15, 6);
  armG.translate(0, 0.575, 0);
  const armM = k.S(c, 0.95);
  for (let i = 0; i < 3; i++) {
    const a = new THREE.Mesh(armG, armM);
    a.position.x = 0.06;
    a.rotation.x = (i * Math.PI * 2) / 3;
    rotor.add(a);
  }

  const floor = new THREE.Group();
  floor.position.y = -0.95;
  floor.rotation.x = Math.PI / 2;
  g.add(floor);

  const r1 = k.circle(1.25, 64, k.L(c, 0.5));
  const r2 = k.dashed(1.6, 48, 0.55, k.L(c, 0.3));
  const pulse = k.circle(1, 64, k.L(c, 0.6));
  floor.add(r1, r2, pulse);

  const scanM = k.S(c, 0.2);
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.95), scanM);
  scan.rotation.x = -Math.PI / 2;
  scan.position.x = -0.5;
  g.add(scan);
  g.position.x = 0.2;

  const ease = (p: number) => 1 - Math.pow(1 - p, 4);
  const update = (t: number) => {
    const s = t * 0.55, f = Math.floor(s), p = s - f;
    rotor.rotation.x = (f + (p < 0.45 ? ease(p / 0.45) : 1)) * ((Math.PI * 2) / 3);
    const ph = (t * 0.45) % 1;
    scan.position.y = -0.95 + ph * 1.9;
    scanM.userData.base = 0.22 * Math.sin(ph * Math.PI);
    const pp = (t * 0.6) % 1;
    pulse.scale.setScalar(0.4 + pp * 1.4);
    pulse.material.userData.base = 0.6 * (1 - pp);
    r2.rotation.z = t * 0.2;
  };
  return { g, mats: k.mats, update };
}

export function buildShield(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group();
  const s = new THREE.Shape();
  s.moveTo(0, 1.1);
  s.bezierCurveTo(0.45, 0.96, 0.75, 0.92, 0.9, 0.86);
  s.lineTo(0.86, 0.1);
  s.bezierCurveTo(0.8, -0.5, 0.42, -0.9, 0, -1.15);
  s.bezierCurveTo(-0.42, -0.9, -0.8, -0.5, -0.86, 0.1);
  s.lineTo(-0.9, 0.86);
  s.bezierCurveTo(-0.75, 0.92, -0.45, 0.96, 0, 1.1);

  const hole = new THREE.Path();
  hole.moveTo(-0.09, 0.08);
  hole.lineTo(-0.16, -0.42);
  hole.lineTo(0.16, -0.42);
  hole.lineTo(0.09, 0.08);
  hole.absarc(0, 0.22, 0.1664, Math.atan2(-0.14, 0.09), Math.atan2(-0.14, -0.09) + Math.PI * 2, false);
  s.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 1,
    curveSegments: 12,
  });
  geo.center();
  g.add(new THREE.Mesh(geo, k.S(c, 0.07)), k.E(geo, k.L(c, 0.85), 25));

  const coreM = k.S(c, 0.8);
  const core = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(hole.getPoints(16))), coreM);
  core.position.set(0, 0.025, 0);
  g.add(core);

  const inner = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(
      s.getPoints(12).map((p) => new THREE.Vector3(p.x * 0.8, p.y * 0.8 + 0.02, 0.15))
    ),
    k.L(c, 0.35)
  );
  g.add(inner);

  const rings = new THREE.Group();
  rings.rotation.x = 1.15;
  g.add(rings);
  const ra = k.circle(1.55, 72, k.L(c, 0.4));
  const rb = k.dashed(1.75, 36, 0.6, k.L(c, 0.55));
  rings.add(ra, rb);

  const rings2 = new THREE.Group();
  rings2.rotation.set(-0.5, 0.9, 0);
  g.add(rings2);
  const rc = k.dashed(1.4, 60, 0.7, k.L(c, 0.4));
  rings2.add(rc);

  const bits = new THREE.Group();
  rings.add(bits);
  const bitG = new THREE.BoxGeometry(0.07, 0.07, 0.07), bitM = k.S(c, 0.9);
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(bitG, bitM);
    const a = (i / 6) * Math.PI * 2;
    b.position.set(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0);
    bits.add(b);
  }

  const update = (t: number) => {
    rb.rotation.z = t * 0.35;
    bits.rotation.z = t * 0.35;
    ra.rotation.z = -t * 0.1;
    rc.rotation.z = -t * 0.5;
    coreM.userData.base = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.4));
  };
  return { g, mats: k.mats, update };
}

export function buildVault(c: string): FaqModelObject {
  const o = buildShield(c), k = kit();
  const hexG = new THREE.CylinderGeometry(1.95, 1.95, 2.5, 6, 1, true);
  const hex = k.E(hexG, k.L(c, 0.28));
  o.g.add(hex);
  const wallM = k.S(c, 0.035);
  const wall = new THREE.Mesh(hexG, wallM);
  o.g.add(wall);
  const sweepM = k.S(c, 0.5);
  const sweep = new THREE.Mesh(new THREE.CylinderGeometry(1.96, 1.96, 0.02, 6, 1, true), sweepM);
  o.g.add(sweep);

  const up = o.update;
  return {
    g: o.g,
    mats: o.mats.concat(k.mats),
    update: (t: number, dt?: number) => {
      up(t, dt);
      hex.rotation.y = t * 0.12;
      wall.rotation.y = hex.rotation.y;
      sweep.rotation.y = hex.rotation.y;
      const p = (t * 0.4) % 1;
      sweep.position.y = -1.25 + p * 2.5;
      sweepM.userData.base = 0.5 * Math.sin(p * Math.PI);
    },
  };
}

export function buildBadge(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group(), inner = new THREE.Group();
  g.add(inner);
  const s = new THREE.Shape(), n = 28;
  for (let i = 0; i <= n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 + Math.PI / 2;
    const r = i % 2 ? 0.91 : 1;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i) s.lineTo(x, y);
    else s.moveTo(x, y);
  }
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 1,
  });
  geo.center();
  inner.add(new THREE.Mesh(geo, k.S(c, 0.08)), k.E(geo, k.L(c, 0.8), 20));

  const Z = 0.1;
  const r1 = k.circle(0.76, 64, k.L(c, 0.75));
  r1.position.z = Z;
  const r2 = k.dashed(0.64, 40, 0.5, k.L(c, 0.45));
  r2.position.z = Z;
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.74, 48), k.S(c, 0.07));
  disc.position.z = Z - 0.01;
  inner.add(r1, r2, disc);

  const V = (x: number, y: number) => new THREE.Vector3(x, y, Z + 0.03);
  const path = new THREE.CurvePath<THREE.Vector3>();
  path.add(new THREE.LineCurve3(V(-0.34, 0.02), V(-0.1, -0.24)));
  path.add(new THREE.LineCurve3(V(-0.1, -0.24), V(0.36, 0.3)));

  const tg = new THREE.TubeGeometry(path, 48, 0.05, 8, false);
  const chkM = k.S(c, 0.95);
  inner.add(new THREE.Mesh(tg, chkM));
  const total = tg.index ? tg.index.count : 48 * 8 * 6;

  [-1, 1].forEach((sd) => {
    const r = new THREE.Shape();
    r.moveTo(sd * 0.2, -0.7);
    r.lineTo(sd * 0.62, -0.62);
    r.lineTo(sd * 0.62, -1.6);
    r.lineTo(sd * 0.41, -1.42);
    r.lineTo(sd * 0.2, -1.6);
    r.lineTo(sd * 0.2, -0.7);
    const m = new THREE.Mesh(new THREE.ShapeGeometry(r), k.S(c, 0.12));
    m.position.z = -0.12;
    m.rotation.y = sd * 0.15;
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(r.getPoints().map((p) => new THREE.Vector3(p.x, p.y, 0))),
      k.L(c, 0.7)
    );
    l.position.z = -0.12;
    l.rotation.y = sd * 0.15;
    inner.add(m, l);
  });

  const orb = new THREE.Group();
  orb.rotation.x = 1.2;
  g.add(orb);
  const oring = k.dashed(1.4, 56, 0.6, k.L(c, 0.4));
  orb.add(oring);
  const spG = new THREE.Group();
  orb.add(spG);
  const sp = new THREE.Mesh(new THREE.OctahedronGeometry(0.07), k.S(c, 1));
  sp.position.x = 1.4;
  spG.add(sp);
  g.position.y = 0.25;

  const update = (t: number) => {
    const pr = Math.min(1, (t % 4) / 0.9), e = 1 - Math.pow(1 - pr, 3);
    tg.setDrawRange(0, Math.floor((total * e) / 48) * 48);
    chkM.userData.base = 0.75 + 0.25 * Math.sin(t * 3);
    r2.rotation.z = -t * 0.3;
    spG.rotation.z = t * 0.9;
    oring.rotation.z = t * 0.2;
    inner.rotation.y = Math.sin(t * 0.8) * 0.28;
  };
  return { g, mats: k.mats, update };
}

export function buildCloud(c: string): FaqModelObject {
  const k = kit(), g = new THREE.Group();
  const box = new THREE.Group();
  box.position.y = -0.85;
  g.add(box);
  const bg = new THREE.BoxGeometry(1.4, 0.8, 0.95);
  box.add(new THREE.Mesh(bg, k.S(c, 0.06)), k.E(bg, k.L(c, 0.85)));

  const lab = k.E(new THREE.PlaneGeometry(0.5, 0.16), k.L(c, 0.7));
  lab.position.set(0, 0.05, 0.48);
  box.add(lab);

  const lidG = new THREE.BoxGeometry(1.5, 0.14, 1.05);
  const lid = new THREE.Group();
  lid.add(new THREE.Mesh(lidG, k.S(c, 0.1)), k.E(lidG, k.L(c, 0.9)));
  lid.position.y = 0.47;
  box.add(lid);

  const cloud = new THREE.Group();
  cloud.position.y = 0.95;
  g.add(cloud);

  [
    [-0.5, -0.05, 0.4],
    [0, 0.12, 0.55],
    [0.5, -0.05, 0.42],
  ].forEach(([x, y, r]) => {
    const ig = new THREE.IcosahedronGeometry(r, 1);
    const e = k.E(ig, k.L(c, 0.45));
    e.position.set(x, y, 0);
    const f = new THREE.Mesh(ig, k.S(c, 0.035));
    f.position.set(x, y, 0);
    cloud.add(e, f);
  });

  const bp: THREE.Vector3[] = [];
  for (let y = -0.35; y < 0.5; y += 0.1) {
    bp.push(new THREE.Vector3(0, y, 0), new THREE.Vector3(0, y + 0.05, 0));
  }
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(bp), k.L(c, 0.3)));

  const cg = new THREE.BoxGeometry(0.11, 0.11, 0.11);
  const cubes: { mesh: THREE.Mesh; m: MaterialWithBase; off: number; x: number; z: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const m = k.S(c, 0.9);
    const mesh = new THREE.Mesh(cg, m);
    g.add(mesh);
    cubes.push({ mesh, m, off: i / 7, x: (Math.random() - 0.5) * 0.7, z: (Math.random() - 0.5) * 0.5 });
  }

  const floor = new THREE.Group();
  floor.position.y = -1.25;
  floor.rotation.x = Math.PI / 2;
  g.add(floor);

  const fr = k.circle(1.2, 64, k.L(c, 0.45));
  const pulse = k.circle(1, 64, k.L(c, 0.6));
  floor.add(fr, pulse);

  const update = (t: number) => {
    const o = 0.5 + 0.5 * Math.sin(t * 1.6);
    lid.position.y = 0.47 + 0.14 * o;
    lid.rotation.z = 0.07 * o;
    cubes.forEach((q) => {
      const p = (t * 0.35 + q.off) % 1;
      q.mesh.position.set(q.x * (1 - p), -0.4 + p * 1.35, q.z * (1 - p));
      q.mesh.rotation.set(t + q.off * 6, t * 1.3, 0);
      q.m.userData.base = 0.9 * Math.sin(p * Math.PI);
      q.mesh.scale.setScalar(1 - 0.5 * p);
    });
    cloud.rotation.y = t * 0.25;
    const pp = (t * 0.5) % 1;
    pulse.scale.setScalar(0.4 + pp * 1.3);
    pulse.material.userData.base = 0.6 * (1 - pp);
  };
  return { g, mats: k.mats, update };
}

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
