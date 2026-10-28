import * as THREE from 'three';
import { MaterialWithBase, FaqModelObject, kit, rr, slab } from './faqModelsKit';

export type { MaterialWithBase, FaqModelObject };
export { buildWallet, buildQR, buildHub, buildBridge } from './faqModelsSecondary';

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

