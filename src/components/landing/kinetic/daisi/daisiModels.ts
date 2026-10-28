// ── DAISI SPATIAL CHOREOGRAPHY: 3D SPORT MODELS & TIMELINE ──
// Mathematical procedural generators for 11 dynamic sports sculptures.

export interface DaisiPoint { x: number; y: number; z: number; c: number; f?: number; g?: { x: number; y: number; z: number } | null; }
export interface DaisiLineSet { rgb: string; w: number; a: number; segs: number[][][]; }
export interface DaisiRim { rgb: string; w: number; a: number; }
export interface DaisiMeshModel { pts: DaisiPoint[]; n: number; rb: number; lines?: DaisiLineSet[]; rim?: DaisiRim; }
export interface DaisiCluster { side: number; s: DaisiMeshModel[]; sd?: number; t0?: number; }
export interface TimelineState { st: number; p?: number; A?: DaisiMeshModel; B?: DaisiMeshModel; mix?: number; sa?: number; sb?: number; }

export const PAL: [string, number, number?][] = [
  ['255,255,255', 1], ['11,17,31', 1, 1], ['212,175,55', 1], ['194,65,12', 1], ['212,150,60', 1],
  ['203,213,225', 0.9], ['226,232,240', 0.95], ['158,170,184', 0.95], ['133,77,14', 1], ['150,84,38', 1],
  ['190,214,70', 1], ['84,92,108', 1], ['186,230,253', 0.95], ['16,185,129', 1], ['26,24,22', 1, 1], ['176,120,36', 1],
  ['204,32,42', 1], ['128,16,26', 1], ['96,50,24', 1]
];
export const PALN: number[][] = PAL.map(p => p[0].split(',').map(Number));

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
export const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
export const norm = (v: number[]): number[] => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const randSphere = (): number[] => {
  const u = Math.random() * 2 - 1, t = Math.random() * TAU, r = Math.sqrt(Math.max(0, 1 - u * u));
  return [r * Math.cos(t), u, r * Math.sin(t)];
};
const RND = Math.random, sph = randSphere;
const P = (x: number, y: number, z: number, c: number, f: number = 0, g: { x: number; y: number; z: number } | null = null): DaisiPoint => ({ x, y, z, c, f, g });
const fill = (arr: DaisiPoint[], n: number, fn: (t: number) => DaisiPoint) => {
  for (let i = 0; i < n; i++) arr.push(fn(i / n));
};
const ring = (r: number, a: number): [number, number] => [Math.cos(a) * r, Math.sin(a) * r];
const cross = (a: number[], b: number[]): number[] => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];
const sm3 = (t: number) => t * t * (3 - 2 * t);

// Telstar Football
function mFootball(count: number): DaisiMeshModel {
  const C: number[][] = [];
  [[0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI]].forEach(([p, q, r]) => {
    C.push(norm([p, q, r]), norm([q, r, p]), norm([r, p, q]));
  });
  const ip = 1 / PHI;
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) C.push(norm([sx, sy, sz]));
  [[0, ip, PHI], [0, -ip, PHI], [0, ip, -PHI], [0, -ip, -PHI]].forEach(([p, q, r]) => {
    C.push(norm([p, q, r]), norm([q, r, p]), norm([r, p, q]));
  });
  const cls = (v: number[]) => {
    let b1 = 1e9, b2 = 1e9, k = 0;
    for (let j = 0; j < C.length; j++) {
      const a = Math.acos(clamp(v[0] * C[j][0] + v[1] * C[j][1] + v[2] * C[j][2], -1, 1)) / (j < 12 ? 0.730 : 0.866);
      if (a < b1) { b2 = b1; b1 = a; k = j; } else if (a < b2) b2 = a;
    }
    return { pent: k < 12, d: b1, gap: (b2 - b1) * 0.78 };
  };
  const pts: DaisiPoint[] = []; let g = 0;
  while (pts.length < count * 0.16 && g++ < 300000) {
    const v = sph(), c = cls(v);
    if (c.gap < 0.026) { pts.push(P(v[0] * 0.965, v[1] * 0.965, v[2] * 0.965, c.pent ? 14 : 7)); }
  }
  while (pts.length < count) {
    const v = sph(), c = cls(v);
    if (c.gap < 0.026) continue;
    const r = 1 - 0.045 * c.d * c.d, edge = c.gap < 0.06;
    pts.push(P(v[0] * r, v[1] * r, v[2] * r, c.pent ? (edge ? 14 : 1) : (edge ? 5 : 0), !c.pent && RND() < 0.04 ? 2 : 0));
  }
  const IV = C.slice(0, 12), d3 = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const nb = IV.map((a, i) => IV.map((_, j) => j).filter(j => j !== i && d3(a, IV[j]) > 0.4));
  const Q = (i: number, j: number) => norm([2 * IV[i][0] + IV[j][0], 2 * IV[i][1] + IV[j][1], 2 * IV[i][2] + IV[j][2]]);
  const lerpN = (a: number[], b: number[], t: number) => norm([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
  const arc = (a: number[], b: number[], n: number, r: number) => {
    const o: number[][] = [];
    for (let k = 0; k <= n; k++) { const p = lerpN(a, b, k / n); o.push([p[0] * r, p[1] * r, p[2] * r]); }
    return o;
  };
  const seams: number[][][] = [], pipes: number[][][] = [];
  for (let i = 0; i < 12; i++) {
    for (const j of nb[i]) if (i < j) seams.push(arc(Q(i, j), Q(j, i), 6, 0.99));
    for (const a of nb[i]) for (const b of nb[i]) if (a < b && d3(IV[a], IV[b]) > 0.4) {
      seams.push(arc(Q(i, a), Q(i, b), 5, 0.99));
      pipes.push(arc(lerpN(IV[i], Q(i, a), 0.72), lerpN(IV[i], Q(i, b), 0.72), 4, 0.995));
    }
  }
  return {
    pts, n: pts.length, rb: 120,
    lines: [{ rgb: '6,8,14', w: 1.8, a: 0.96, segs: seams }, { rgb: '238,242,248', w: 0.95, a: 0.82, segs: pipes }],
    rim: { rgb: '238,242,248', w: 1.25, a: 0.6 }
  };
}

// Basketball
function mBasket(count: number): DaisiMeshModel {
  const pts: DaisiPoint[] = [], jit = () => (RND() - 0.5) * 0.03, rs = 0.972;
  const off = (t: number) => 0.6 + 0.24 * Math.cos(2 * t);
  const seam = (n: number, fn: (t: number) => number[]) => {
    for (let i = 0; i < n; i++) { const p = fn((i / n) * TAU); pts.push(P(p[0] * rs + jit(), p[1] * rs + jit(), p[2] * rs + jit(), 1)); }
  };
  const per = Math.floor(count * 0.08);
  seam(per, t => [Math.cos(t), 0, Math.sin(t)]);
  seam(per, t => [0, Math.cos(t), Math.sin(t)]);
  for (const s of [-1, 1]) seam(Math.floor(per * 1.1), t => norm([s * off(t), Math.cos(t), Math.sin(t)]));
  const G = 0.06;
  while (pts.length < count) {
    const v = sph();
    if (Math.abs(v[1]) < G || Math.abs(v[0]) < G) continue;
    const t = Math.atan2(v[2], v[1]), ph = Math.atan2(Math.abs(v[0]), Math.hypot(v[1], v[2]));
    if (Math.abs(ph - Math.atan(off(t))) < G) continue;
    const r = 1 + (RND() - 0.5) * 0.014, shade = 0.18 + 0.42 * (0.5 - 0.5 * v[1]);
    pts.push(P(v[0] * r, v[1] * r, v[2] * r, RND() < shade ? 4 : 3, RND() < 0.05 ? 2 : 0));
  }
  const bs: number[][][] = [], circ = (fn: (t: number) => number[]) => {
    const o: number[][] = [];
    for (let i = 0; i <= 128; i++) { const p = fn((i / 128) * TAU); o.push([p[0] * 0.99, p[1] * 0.99, p[2] * 0.99]); }
    bs.push(o);
  };
  circ(t => [Math.cos(t), 0, Math.sin(t)]); circ(t => [0, Math.cos(t), Math.sin(t)]);
  for (const s of [-1, 1]) circ(t => norm([s * off(t), Math.cos(t), Math.sin(t)]));
  return {
    pts, n: pts.length, rb: 120,
    lines: [{ rgb: '255,234,204', w: 1.6, a: 0.94, segs: bs }],
    rim: { rgb: '255,216,174', w: 1.25, a: 0.55 }
  };
}

// American football (Rugby)
function mRugby(count: number): DaisiMeshModel {
  const A = 1.55, rad = (x: number) => Math.pow(Math.max(0, 1 - (x / A) * (x / A)), 0.7) * 0.92;
  const pts: DaisiPoint[] = [], sp = Math.floor(count * 0.04);
  for (let s = 0; s < 4; s++) {
    const ang = s * Math.PI / 2;
    for (let i = 0; i < sp; i++) {
      const x = -A * 0.97 + ((i + 0.5) / sp) * 1.94 * A, r = rad(x) * 0.975, d = (RND() - 0.5) * 0.05;
      pts.push(P(x, Math.cos(ang + d) * r, Math.sin(ang + d) * r, 14));
    }
  }
  const lp = Math.floor(count * 0.035);
  for (let i = 0; i < lp; i++) { const x = -0.52 + (i / lp) * 1.04, r = rad(x) * 1.03; pts.push(P(x, -r, (RND() - 0.5) * 0.04, 0)); }
  const per = Math.floor(count * 0.012);
  for (let k = 0; k < 8; k++) {
    const x0 = -0.45 + (k / 7) * 0.9;
    for (let i = 0; i < per; i++) {
      const zz = (i / per - 0.5) * 0.34, r = rad(x0) * 1.045;
      pts.push(P(x0 + (RND() - 0.5) * 0.035, -Math.sqrt(Math.max(0, r * r - zz * zz)), zz, 0, RND() < 0.1 ? 2 : 0));
    }
  }
  while (pts.length < count) {
    const x = (RND() * 2 - 1) * A, r = rad(x);
    if (RND() > r / 0.92) continue;
    const t = RND() * TAU, ax = Math.abs(x), cy = Math.cos(t), sm = Math.abs(((t + Math.PI / 4) % (Math.PI / 2)) - Math.PI / 4);
    if (sm < 0.035 && ax < A * 0.95) continue;
    let c = RND() < 0.15 + 0.4 * (0.5 + 0.5 * cy) + (sm < 0.1 ? 0.25 : 0) ? 18 : 9;
    if (ax > 0.98 && ax < 1.1) c = 0;
    else if (ax > 1.38) c = 8;
    const rr = r * (1 + (RND() - 0.5) * 0.012 - (sm < 0.1 ? 0.012 * (1 - sm / 0.1) : 0));
    pts.push(P(x, cy * rr, Math.sin(t) * rr, c, c === 9 && RND() < 0.08 ? 2 : 0));
  }
  const seams: number[][][] = [], stripes: number[][][] = [], lace: number[][][] = [];
  const ringAt = (x: number, k: number) => {
    const o: number[][] = [], r = rad(x) * k;
    for (let i = 0; i <= 72; i++) { const t = (i / 72) * TAU; o.push([x, Math.cos(t) * r, Math.sin(t) * r]); }
    return o;
  };
  for (let s = 0; s < 4; s++) {
    const ang = s * Math.PI / 2, o: number[][] = [];
    for (let i = 0; i <= 64; i++) { const x = -A * 0.985 + (i / 64) * 1.97 * A, r = rad(x) * 0.995; o.push([x, Math.cos(ang) * r, Math.sin(ang) * r]); }
    seams.push(o);
  }
  for (const sg of [-1, 1]) for (const xs of [0.985, 1.04, 1.095]) stripes.push(ringAt(sg * xs, 1.006));
  { const o: number[][] = []; for (let i = 0; i <= 40; i++) { const x = -0.54 + (i / 40) * 1.08; o.push([x, -rad(x) * 1.035, 0]); } lace.push(o); }
  for (let k = 0; k < 8; k++) {
    const x0 = -0.45 + (k / 7) * 0.9, r = rad(x0) * 1.05, o: number[][] = [];
    for (let i = 0; i <= 8; i++) { const zz = (i / 8 - 0.5) * 0.34; o.push([x0, -Math.sqrt(Math.max(0, r * r - zz * zz)), zz]); }
    lace.push(o);
  }
  return {
    pts, n: pts.length, rb: 135,
    lines: [{ rgb: '34,16,8', w: 1.5, a: 0.92, segs: seams }, { rgb: '246,242,232', w: 1.4, a: 0.9, segs: stripes }, { rgb: '250,248,240', w: 2.2, a: 0.97, segs: lace }]
  };
}

// Épée (fencing)
function mEpee(): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  fill(a, 470, () => { const u = RND(), y = -172 + u * 168, [x, z] = ring(0.8 + 2 * u, RND() * TAU); return P(x, y, z, RND() < 0.8 ? 6 : 12); });
  fill(a, 70, () => { const v = sph(), r = 3.6; return P(v[0] * r, -176 + v[1] * r, v[2] * r, 2, 1); });
  fill(a, 680, () => { const v = sph(), hh = Math.abs(v[1]); return P(v[0] * 42, -hh * 28, v[2] * 42, hh > 0.93 ? 2 : (RND() < 0.55 ? 6 : 7)); });
  fill(a, 130, u => { const [x, z] = ring(42, u * TAU); return P(x, (RND() - 0.5) * 1.6, z, 2); });
  fill(a, 240, () => { const u = RND(), [x, z] = ring(4.6 + 0.6 * Math.sin(u * Math.PI), RND() * TAU); return P(x + 5 * Math.sin(u * 1.4), 4 + u * 62, z, RND() < 0.85 ? 11 : 2, RND() < 0.1 ? 2 : 0); });
  fill(a, 90, () => { const v = sph(); return P(5 * Math.sin(1.4) + v[0] * 7, 73 + v[1] * 8, v[2] * 7, 2); });
  return { pts: a, n: a.length, rb: 140 };
}

// Golf Driver
function mDriver(): DaisiMeshModel {
  const a: DaisiPoint[] = [], N: number[][] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) N.push(norm([sx * 0.9, sy, sz * 0.9]));
  const sx = (y: number) => -4 + ((y + 130) / 226) * 4;
  fill(a, 190, () => { const y = -130 + RND() * 62, [x, z] = ring(3.8 - ((y + 130) / 62) * 0.6, RND() * TAU); return P(sx(y) + x, y, z, 11, RND() < 0.1 ? 2 : 0); });
  fill(a, 340, () => { const y = -68 + RND() * 164, [x, z] = ring(1.7 - ((y + 68) / 164) * 0.6, RND() * TAU); return P(sx(y) + x, y, z, 7); });
  fill(a, 60, () => { const u = RND(), [x, z] = ring(2 + 2.5 * u, RND() * TAU); return P(x, 96 + u * 12, z, 6); });
  fill(a, 860, () => {
    const v = sph(); let m1 = 0, m2 = 0;
    for (const n of N) { const d = v[0] * n[0] + v[1] * n[1] + v[2] * n[2]; if (d > m1) { m2 = m1; m1 = d; } else if (d > m2) m2 = d; }
    const p = [v[0] / m1, v[1] / m1, v[2] / m1], X = p[0] * 48, Y = p[1] * 21, Z = p[2] * 38;
    let c = p[1] < -0.15 ? 11 : 7;
    if (m1 - m2 < 0.035) c = 6;
    if (p[2] > 0.62) c = Math.abs((Y + 40) % 5) < 0.9 ? 1 : 6;
    if (p[1] < -0.3 && Math.abs(X - 6) < 1.8 && p[2] > 0.1) c = 2;
    return P(34 + X, 128 + Y, Z, c);
  });
  fill(a, 250, () => { const v = sph(), r = 13; return P(40 + v[0] * r, 136 + v[1] * r, 74 + v[2] * r, 0, RND() < 0.3 ? 2 : 0); });
  return { pts: a, n: a.length, rb: 140 };
}

// Technical Ice Axe & Carabiner
function mAxe(): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  const shx = (y: number) => -9 * Math.sin(Math.PI * (y + 92) / 200) + (y > 60 ? -(y - 60) * 0.18 : 0);
  fill(a, 430, () => { const y = -92 + RND() * 196, [x, z] = ring(4.2, RND() * TAU), grip = y > 56; return P(shx(y) + x * 1.1, y, z * 0.75, grip ? 11 : 7, grip && RND() < 0.12 ? 2 : 0); });
  fill(a, 60, u => { const y = u < 0.5 ? 56 : 104, [x, z] = ring(4.7, RND() * TAU); return P(shx(y) + x, y + (RND() - 0.5) * 2, z * 0.8, 2); });
  fill(a, 40, () => { const u = RND(); return P(shx(56) - 4 - u * 9, 56 + u * 4, (RND() - 0.5) * 5, 2); });
  fill(a, 70, () => { const u = RND(), [x, z] = ring(3.6 * (1 - u) + 0.3, RND() * TAU); return P(shx(104) + x, 104 + u * 18, z, 6); });
  fill(a, 90, () => P(-9 + RND() * 18, -104 + RND() * 14, (RND() * 2 - 1) * 4.5, 6));
  fill(a, 340, () => { const s = RND(), yc = -98 + 48 * Math.pow(s, 1.7), hh = 8 * (1 - s) + 1.5; return P(8 + 96 * s, yc + (RND() * 2 - 1) * hh, (RND() * 2 - 1) * 2.4 * (1 - 0.6 * s), 6); });
  fill(a, 160, () => { const s = 0.35 + RND() * 0.62, yc = -98 + 48 * Math.pow(s, 1.7), hh = 8 * (1 - s) + 1.5; return P(8 + 96 * s, yc + hh + 4.5 * ((s * 28) % 1), (RND() * 2 - 1) * 1.6, 12); });
  fill(a, 24, () => { const v = sph(); return P(104 + v[0] * 2.6, -50 + v[1] * 2.6, v[2] * 2.6, 2, 1); });
  fill(a, 170, () => { const s = RND(); return P(-8 - 36 * s, -100 + 6 * s * s + (RND() * 2 - 1) * 1.4, (RND() * 2 - 1) * (4 + 8 * s), 6); });
  fill(a, 40, () => P(-44 + (RND() - 0.5) * 1.2, -94 + (RND() - 0.5) * 2, (RND() * 2 - 1) * 12, 2));
  const g = { x: -64, y: 30, z: 0 };
  const D = (t: number) => [g.x + 15 * Math.cos(t) * (1 + 0.22 * Math.sin(t)), g.y + 28 * Math.sin(t)];
  fill(a, 380, () => {
    const t = RND() * TAU, p0 = D(t), p1 = D(t + 0.01), tx = p1[0] - p0[0], ty = p1[1] - p0[1], tl = Math.hypot(tx, ty);
    const nx = ty / tl, ny = -tx / tl, sleeve = t > 0.05 && t < 0.75, r = sleeve ? 4.2 : 2.8, ph = RND() * TAU;
    return P(p0[0] + nx * Math.cos(ph) * r, p0[1] + ny * Math.cos(ph) * r, Math.sin(ph) * r, sleeve ? 2 : 6, 0, g);
  });
  return { pts: a, n: a.length, rb: 135 };
}

// Boxing Glove
function mGlove(): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  const fist = (v0: number, v1: number, v2: number): number[] => {
    const fr = v2 > 0 ? 1 + 0.08 * v2 * (1 - Math.abs(v1)) : 0.86;
    return [v0 * 50, -30 + v1 * 58 * (v1 < 0 ? 1.04 : 1), v2 * 47 * fr];
  };
  fill(a, 1000, () => {
    const v = sph(), p = fist(v[0], v[1], v[2]);
    if (Math.abs(v[2] + 0.3) < 0.035 && v[1] > -0.35) return P(p[0], p[1], p[2], 14);
    let c = RND() < 0.12 + 0.45 * (0.5 + 0.5 * v[1]) ? 17 : 16;
    if (v[2] < -0.3 && v[1] > -0.35) c = 17;
    if (v[2] > 0.55 && Math.abs(v[1] + 0.25) < 0.03) c = 0;
    return P(p[0], p[1], p[2], c, c === 16 && RND() < 0.06 ? 2 : 0);
  });
  const tA = [-46, 14, 6], tB = [-28, -40, 32], d = norm([tB[0] - tA[0], tB[1] - tA[1], tB[2] - tA[2]]), e1 = norm(cross(d, [0, 0, 1])), e2 = cross(d, e1);
  const tc = (u: number) => [tA[0] + (tB[0] - tA[0]) * u - 9 * Math.sin(Math.PI * u), tA[1] + (tB[1] - tA[1]) * u, tA[2] + (tB[2] - tA[2]) * u], trr = (u: number) => 15 * (1 - 0.25 * u * u);
  fill(a, 340, () => {
    const u = RND(), c = tc(u), r = trr(u), ph = RND() * TAU, cp = Math.cos(ph), spp = Math.sin(ph);
    return P(c[0] + r * (cp * e1[0] + spp * e2[0]), c[1] + r * (cp * e1[1] + spp * e2[1]), c[2] + r * (cp * e1[2] + spp * e2[2]), spp > 0.2 ? 17 : 16, RND() < 0.05 ? 2 : 0);
  });
  fill(a, 70, () => { const v = sph(); return P(tB[0] + v[0] * 11.5, tB[1] + v[1] * 11.5, tB[2] + v[2] * 11.5, 16); });
  fill(a, 80, () => { const u = RND(), w = (RND() - 0.5) * 6; return P(tB[0] + 8 + u * 22, tB[1] - 4 + u * 2 + w * 0.3, tB[2] + 6 - u * 2 + w, 14); });
  const cr = (y: number) => 38 - ((y - 28) / 80) * 4;
  fill(a, 130, () => { const y = 24 + RND() * 10, t = RND() * TAU; return P(Math.cos(t) * (cr(y) + 2), y, Math.sin(t) * (cr(y) + 2) * 0.9, 0); });
  fill(a, 400, () => { const y = 34 + RND() * 74, t = RND() * TAU; return P(Math.cos(t) * cr(y), y, Math.sin(t) * cr(y) * 0.9, 14); });
  fill(a, 60, () => { const y = 40 + Math.floor(RND() * 7) * 10, th = Math.PI / 2 + (RND() < 0.5 ? 1 : -1) * 0.45, r = cr(y) + 1; return P(Math.cos(th) * r + (RND() - 0.5) * 1.5, y + (RND() - 0.5) * 1.5, Math.sin(th) * r * 0.9, 2, 2); });
  fill(a, 160, u => { const y = u < 0.5 ? 35 : 108, t = RND() * TAU, r = cr(y) + 1; return P(Math.cos(t) * r, y + (RND() - 0.5) * 2.5, Math.sin(t) * r * 0.9, 2); });
  const ln = (n: number, fn: (t: number) => number[]) => { const o: number[][] = []; for (let i = 0; i <= n; i++) o.push(fn(i / n)); return o; };
  const pipe: number[][][] = [], white: number[][][] = [], laces: number[][][] = [];
  const pr = Math.sqrt(1 - 0.09), t0 = Math.asin(-0.35 / pr);
  pipe.push(ln(96, u => { const t = t0 + u * (Math.PI - 2 * t0); return fist(pr * Math.cos(t) * 1.01, pr * Math.sin(t), -0.3 * 1.01); }));
  const qr = Math.sqrt(1 - 0.1225), s0 = Math.asin(-0.3 / qr);
  pipe.push(ln(48, u => { const s = Math.PI - s0 + u * (Math.PI + 2 * s0); return fist(qr * Math.cos(s) * 1.01, -0.35, qr * Math.sin(s) * 1.01); }));
  for (const sg of [-1, 1]) pipe.push(ln(40, u => { const c = tc(u), r = trr(u) * 1.03; return [c[0] + sg * r * e1[0], c[1] + sg * r * e1[1], c[2] + sg * r * e1[2]]; }));
  const kr = Math.sqrt(1 - 0.0625), k0 = Math.asin(0.55 / kr);
  white.push(ln(40, u => { const s = k0 + u * (Math.PI - 2 * k0); return fist(kr * Math.cos(s) * 1.01, -0.25, kr * Math.sin(s) * 1.01); }));
  const cring = (y: number, k: number) => ln(72, u => { const t = u * TAU, r = cr(y) + k; return [Math.cos(t) * r, y, Math.sin(t) * r * 0.9]; });
  white.push(cring(24, 2.2)); pipe.push(cring(35, 1.6), cring(108, 1.6));
  const ey = (y: number, s: number) => { const th = Math.PI / 2 + s * 0.45, r = cr(y) + 1.8; return [Math.cos(th) * r, y, Math.sin(th) * r * 0.9]; };
  for (let k = 0; k < 6; k++) for (const s of [-1, 1]) {
    const y0 = 40 + k * 10;
    laces.push(ln(8, u => { const th = Math.PI / 2 + s * 0.45 * (1 - 2 * u), y = y0 + 10 * u, r = cr(y) + 2; return [Math.cos(th) * r, y, Math.sin(th) * r * 0.9]; }));
  }
  laces.push(ln(4, u => { const p = ey(40, -1), q = ey(40, 1); return [p[0] + (q[0] - p[0]) * u, 40, p[2] + (q[2] - p[2]) * u + 3 * Math.sin(Math.PI * u)]; }));
  return {
    pts: a, n: a.length, rb: 125,
    lines: [{ rgb: '236,192,92', w: 1.6, a: 0.95, segs: pipe }, { rgb: '248,246,240', w: 2.2, a: 0.95, segs: white }, { rgb: '244,240,230', w: 1.5, a: 0.92, segs: laces }]
  };
}

import { mBelt, mSkate, mHelmet, mWheel, evaluateTimeline, calculateDaisiAnchor, DaisiAnchorResult } from './daisiTimeline';
export { evaluateTimeline, calculateDaisiAnchor };
export type { DaisiAnchorResult };

// Normalizer
const mk = (model: DaisiMeshModel, R: number, roll?: number): DaisiMeshModel => {
  const pts = model.pts;
  const piv = new Set<{ x: number; y: number; z: number }>();
  for (const p of pts) if (p.g) piv.add(p.g);
  const all = (pts as any[]).concat([...piv]);
  const LS = model.lines ? model.lines.flatMap(l => l.segs.flat()) : [];
  if (roll) {
    const c = Math.cos(roll), s = Math.sin(roll);
    for (const p of all) { const x = p.x * c - p.y * s, y = p.x * s + p.y * c; p.x = x; p.y = y; }
    for (const q of LS) { const x = q[0] * c - q[1] * s, y = q[0] * s + q[1] * c; q[0] = x; q[1] = y; }
  }
  const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
  for (const p of pts) {
    lo[0] = Math.min(lo[0], p.x); lo[1] = Math.min(lo[1], p.y); lo[2] = Math.min(lo[2], p.z);
    hi[0] = Math.max(hi[0], p.x); hi[1] = Math.max(hi[1], p.y); hi[2] = Math.max(hi[2], p.z);
  }
  const mx = (lo[0] + hi[0]) / 2, my = (lo[1] + hi[1]) / 2, mz = (lo[2] + hi[2]) / 2;
  for (const p of all) { p.x -= mx; p.y -= my; p.z -= mz; }
  for (const q of LS) { q[0] -= mx; q[1] -= my; q[2] -= mz; }
  let rb = 0; for (const p of pts) rb = Math.max(rb, Math.hypot(p.x, p.y, p.z));
  const f = R / (rb || 1);
  for (const p of all) { p.x *= f; p.y *= f; p.z *= f; }
  for (const q of LS) { q[0] *= f; q[1] *= f; q[2] *= f; }
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (RND() * (i + 1)) | 0;
    const t = pts[i]; pts[i] = pts[j]; pts[j] = t;
  }
  return { pts, n: pts.length, rb: R, lines: model.lines, rim: model.rim };
};

export function buildDaisiClusters(): { clusters: DaisiCluster[]; loop: number } {
  const M = {
    football: mk(mFootball(1800), 120),
    basket: mk(mBasket(1800), 120),
    rugby: mk(mRugby(1800), 135, -0.32),
    epee: mk(mEpee(), 140, -0.62),
    driver: mk(mDriver(), 140, 0.3),
    axe: mk(mAxe(), 135, 0.16),
    glove: mk(mGlove(), 125, -0.1),
    belt: mk(mBelt(), 130),
    skate: mk(mSkate(), 140, -0.08),
    helmet: mk(mHelmet(1800), 125, 0.1),
    wheel: mk(mWheel(), 125)
  };

  const CL: DaisiCluster[] = [
    { side: -1, s: [M.football, M.basket, M.rugby] },
    { side: 1, s: [M.epee, M.driver, M.axe] },
    { side: -1, s: [M.glove, M.belt] },
    { side: 1, s: [M.skate, M.helmet, M.wheel] }
  ];

  const HOLD = 4.2, MORPH = 1.3, WAVE = 2.6;
  let LOOP = 0;
  for (const c of CL) {
    c.sd = c.s.length * HOLD + (c.s.length - 1) * MORPH;
    c.t0 = LOOP;
    LOOP += c.sd + WAVE;
  }
  return { clusters: CL, loop: LOOP };
}


