import { DaisiCluster, DaisiMeshModel, DaisiPoint, TimelineState, clamp } from './daisiModels';

const TAU = Math.PI * 2;
const RND = Math.random;
const randSphere = (): number[] => {
  const u = Math.random() * 2 - 1, t = Math.random() * TAU, r = Math.sqrt(Math.max(0, 1 - u * u));
  return [r * Math.cos(t), u, r * Math.sin(t)];
};
const sph = randSphere;
const P = (x: number, y: number, z: number, c: number, f: number = 0, g: { x: number; y: number; z: number } | null = null): DaisiPoint => ({ x, y, z, c, f, g });
const fill = (arr: DaisiPoint[], n: number, fn: (t: number) => DaisiPoint) => {
  for (let i = 0; i < n; i++) arr.push(fn(i / n));
};
const sm3 = (t: number) => t * t * (3 - 2 * t);

// Master Black Belt
export function mBelt(): DaisiMeshModel {
  const a: DaisiPoint[] = [], W = 12, rib = (c: number, e: number) => Math.abs(e) > 0.8 ? 2 : c;
  fill(a, 800, () => { const t = RND() * TAU, e = RND() * 2 - 1, layer = RND() < 0.5 ? -1 : 1; return P(Math.cos(t) * 112, e * W + layer * 13, Math.sin(t) * 58, rib(11, e)); });
  fill(a, 330, () => { const v = sph(), x = v[0] * 22, y = v[1] * 17; return P(x, y, 66 + v[2] * 10, Math.abs(x * 0.7 - y) < 3 ? 2 : 11); });
  for (const s of [-1, 1]) {
    const dl = Math.hypot(34, 104), px = 104 / dl, py = -s * 34 / dl;
    fill(a, 310, () => { const u = RND(), e = RND() * 2 - 1, c = u > 0.72 && u < 0.86 ? 2 : rib(11, e); return P(s * (6 + 34 * u) + e * W * px, 14 + 104 * u + e * W * py, 70 + 10 * u + e * 2, c); });
  }
  return { pts: a, n: a.length, rb: 130 };
}

// Figure Skate
export function mSkate(): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  const ht = (x: number) => { let h = Math.max(34, 112 - Math.max(0, x + 8) * 1.05); if (x > 50) h *= Math.sqrt(Math.max(0.04, 1 - Math.pow((x - 50) / 22, 2))); return h; };
  const wd = (x: number) => { let w = 23 + 7 * sm3(clamp((x + 20) / 60, 0, 1)); if (x < -52) w *= Math.sqrt(Math.max(0, 1 - Math.pow((-52 - x) / 10, 2))); if (x > 52) w *= Math.sqrt(Math.max(0, 1 - Math.pow((x - 52) / 20, 2))); return w; };
  const sq = (v: number, e: number) => Math.sign(v) * Math.pow(Math.abs(v), e);
  fill(a, 1150, () => {
    let x: number, th: number, s: number, c: number;
    for (;;) { x = -62 + RND() * 134; th = RND() * TAU; s = Math.sin(th); if (!(x < -8 && s > 0.9)) break; }
    const h = ht(x), w = wd(x), y = -h / 2 - (h / 2) * sq(s, 0.55), z = w * sq(Math.cos(th), 0.55);
    c = 14;
    if (x < -8 && s > 0.82) c = 2; else if (s < -0.93) c = 2; else if (x < -34 && s < 0.25) c = 11; else if (x > 50) c = 11;
    return P(x, y, z, c, c === 14 && RND() < 0.03 ? 2 : 0);
  });
  fill(a, 90, () => { const x = -16 + RND() * 14, hh = RND(); return P(x, -112 - hh * 12, (RND() - 0.5) * 18, 11); });
  for (let k = 0; k < 7; k++) {
    const x0 = -6 + k * 8;
    fill(a, 34, () => { const u = RND(), x = x0 + u * 8, sgn = RND() < 0.5 ? 1 : -1; return P(x, -ht(x) - 1.6, sgn * (-10 + 20 * u), 0); });
    for (const zs of [-1, 1]) fill(a, 8, () => { const v = sph(); return P(x0 + v[0] * 1.6, -ht(x0) - 1 + v[1] * 1.6, zs * 11 + v[2] * 1.6, 2, k === 0 ? 1 : 0); });
  }
  fill(a, 260, () => { const x = RND() < 0.5 ? -58 + RND() * 30 : 12 + RND() * 46, yy = 2 + RND() * 24; return P(x, yy, (RND() < 0.5 ? -1 : 1) * (3.2 - yy * 0.06), 7); });
  fill(a, 140, () => P(-58 + RND() * 116, 24 + RND() * 4, (RND() - 0.5) * 3, 7));
  const yb = (x: number) => 46 - 3 * Math.pow(x / 120, 2);
  fill(a, 520, () => { const x = -78 + RND() * 154; return P(x, 28 + RND() * (yb(x) - 28), (RND() < 0.5 ? -1 : 1) * 0.9, 6); });
  fill(a, 230, () => { const x = -76 + RND() * 150; return P(x, yb(x) + (RND() - 0.5) * 0.8, (RND() - 0.5) * 0.6, 12, RND() < 0.25 ? 2 : 0); });
  fill(a, 90, () => { const t = RND(), x = 76 + t * 8 * (0.6 + 0.4 * Math.abs(Math.sin(t * Math.PI * 4))); return P(x, 28 + t * 16, (RND() - 0.5) * 1.6, 6); });
  return { pts: a, n: a.length, rb: 140 };
}

// Aero Helmet
export function mHelmet(count: number): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  while (a.length < count * 0.9) {
    const x = -1 + RND() * 2.9, r = x < 0 ? Math.sqrt(Math.max(0, 1 - x * x)) : Math.pow(Math.max(0, 1 - x / 1.9), 0.78);
    if (RND() > r) continue;
    const t = RND() * TAU, ct = Math.cos(t), st = Math.sin(t);
    const cutoff = -0.4 + 0.5 * sm3(clamp((x - 0.6) / 0.9, 0, 1));
    if (ct < cutoff && x < 1.5) continue;
    const yc = 0.2 * Math.pow(Math.max(0, x) / 1.9, 1.4);
    let c = 0, f = 0, rr = r;
    const vis = x < 0.1 && ct < 0.22;
    if (vis) { c = 12; rr = r * 1.012; if (Math.abs(st * 0.7 + ct - 0.05) < 0.06) { c = 0; f = 2; } }
    else if (x < 0.16 && ct < 0.3) c = 2;
    else if (Math.abs(st) < 0.06 && ct > 0) c = 2;
    else if (ct - cutoff < 0.06) c = 7;
    else if (x > -0.75 && x < -0.45 && ct > 0.55 && Math.abs(st) > 0.12 && Math.abs(st) < 0.42) c = 14;
    else if (x > 1.05 && x < 1.4 && Math.abs(Math.abs(st) - 0.75) < 0.12 && Math.abs(ct) < 0.4) c = 14;
    else if (x > 0.25 && x < 1.3 && Math.abs(ct - 0.15 - 0.15 * x) < 0.035 && ct > 0) c = 5;
    a.push(P(x, yc - ct * rr * 0.86, st * rr * 0.92, c, f));
  }
  for (const s of [-1, 1]) {
    const ear = [0.25, 0.42, s * 0.88], chin = [-0.55, 1.02, 0];
    fill(a, count * 0.04, () => { const u = RND(), sag = 0.08 * Math.sin(Math.PI * u); return P(ear[0] + (chin[0] - ear[0]) * u, ear[1] + (chin[1] - ear[1]) * u + sag, ear[2] * (1 - u) + (RND() - 0.5) * 0.02, 11); });
  }
  fill(a, count * 0.015, () => { const v = sph(); return P(-0.55 + v[0] * 0.05, 1.02 + v[1] * 0.04, v[2] * 0.06, 2, 1); });
  return { pts: a, n: a.length, rb: 125 };
}

// Track Disc Wheel
export function mWheel(): DaisiMeshModel {
  const a: DaisiPoint[] = [];
  fill(a, 1150, () => {
    const r = 0.12 + 0.72 * Math.sqrt(RND()), t = RND() * TAU, s = RND() < 0.5 ? -1 : 1;
    const tw = (Math.floor(t * 40 / TAU + r * 18) + Math.floor(r * 18)) % 2;
    let c = tw ? 11 : 14, f = 0;
    if (Math.abs(r - 0.62) < 0.016) c = 2; else if (r > 0.66 && r < 0.75 && ((t * 3 / TAU) % 1) < 0.22) { c = 2; f = RND() < 0.2 ? 2 : 0; }
    return P(Math.cos(t) * r, Math.sin(t) * r, s * (0.09 * (1 - r * r) + 0.012), c, f);
  });
  fill(a, 200, () => { const r = 0.84 + RND() * 0.08, t = RND() * TAU, s = RND() < 0.5 ? -1 : 1; return P(Math.cos(t) * r, Math.sin(t) * r, s * (0.03 + (0.92 - r) * 0.12), 7, RND() < 0.06 ? 2 : 0); });
  fill(a, 330, () => { const t = RND() * TAU, ph = RND() * TAU, R = 0.965 + 0.04 * Math.cos(ph), c = Math.abs(Math.sin(ph)) > 0.82 && Math.abs(Math.sin(ph)) < 0.9 ? 0 : 1; return P(Math.cos(t) * R, Math.sin(t) * R, 0.048 * Math.sin(ph), c); });
  fill(a, 20, () => { const v = sph(); return P(0.8 + v[0] * 0.02, v[1] * 0.02, 0.05 + v[2] * 0.01, 2, 1); });
  fill(a, 150, () => { const t = RND() * TAU; return P(Math.cos(t) * 0.085, Math.sin(t) * 0.085, (RND() * 2 - 1) * 0.16, 2); });
  for (let k = 0; k < 4; k++) {
    const R = 0.2 - k * 0.025, zz = -0.11 - k * 0.018;
    fill(a, 50, () => { const t = RND() * TAU, tooth = ((t * (36 - k * 4) / TAU) % 1) < 0.5 ? 0.012 : 0; return P(Math.cos(t) * (R + tooth), Math.sin(t) * (R + tooth), zz, 6); });
  }
  fill(a, 30, () => { const v = sph(); return P(v[0] * 0.03, v[1] * 0.03, (RND() < 0.5 ? -1 : 1) * 0.18, 2, 1); });
  return { pts: a, n: a.length, rb: 125 };
}

export function evaluateTimeline(
  T: number,
  CL: DaisiCluster[],
  LOOP: number
): TimelineState {
  const HOLD = 4.2, MORPH = 1.3, WAVE = 2.6, INTRO_ORBIT = 2.4, INTRO_COND = 1.9;
  const smooth = (t: number) => t * t * (3 - 2 * t);
  if (T < INTRO_ORBIT) return { st: 0 };
  if (T < INTRO_ORBIT + INTRO_COND) {
    return { st: 1, p: (T - INTRO_ORBIT) / INTRO_COND, A: CL[0].s[0], B: CL[0].s[0], mix: 0, sa: CL[0].side, sb: CL[0].side };
  }
  const tt = (T - INTRO_ORBIT - INTRO_COND) % (LOOP || 1);
  let ci = CL.length - 1;
  while (ci > 0 && (CL[ci].t0 || 0) > tt) ci--;
  const c = CL[ci], lt = tt - (c.t0 || 0);
  const sd = c.sd || 0;
  if (lt < sd) {
    const j = Math.min(Math.floor(lt / (HOLD + MORPH)), c.s.length - 1);
    const r = lt - j * (HOLD + MORPH);
    const m = r > HOLD && j < c.s.length - 1 ? smooth(clamp((r - HOLD) / MORPH, 0, 1)) : 0;
    return { st: 2, A: c.s[j], B: c.s[Math.min(j + 1, c.s.length - 1)], mix: m, sa: c.side, sb: c.side };
  }
  const nx = CL[(ci + 1) % CL.length];
  return { st: 3, p: (lt - sd) / WAVE, A: c.s[c.s.length - 1], B: nx.s[0], mix: 0, sa: c.side, sb: nx.side };
}

export interface DaisiAnchorResult {
  x: number;
  y: number;
  k: number;
  rs: number;
}

export function calculateDaisiAnchor(
  side: number,
  w: number,
  h: number,
  R: number,
  S: number,
  letterBounds?: { top: number; bottom: number; left: number; right: number; width: number; height: number }
): DaisiAnchorResult {
  const mg = 22, cx = w * 0.5, cy = h * 0.5;
  const LR = letterBounds && letterBounds.width > 0 ? letterBounds : {
    left: cx - 440 * S,
    right: cx + 440 * S,
    top: cy - 65,
    bottom: cy + 65,
    width: 880 * S,
    height: 130,
  };

  let k = clamp(w / 1440, 0.75, 1.15);
  let rs = R * k * 1.06;
  const maxR = Math.max(Math.min(w * 0.25 - mg, h * 0.5 - mg), 20);
  if (rs > maxR) {
    k *= maxR / rs;
    rs = maxR;
  }

  const gap = side > 0 ? w - LR.right : LR.left;
  let ax: number, ay: number;

  if ((gap - 2 * mg) / 2 >= rs) {
    ax = cx + side * Math.max(440 * S, LR.width * 0.5 + mg + rs);
    ax = side > 0 ? clamp(ax, LR.right + mg + rs, w - mg - rs) : clamp(ax, mg + rs, LR.left - mg - rs);
    ay = clamp(cy, rs + 16, h - rs - 16);
    return { x: ax, y: ay, k, rs };
  }

  ax = clamp(cx + side * 440 * S, rs + mg, w - rs - mg);
  if (side > 0 ? ax - rs < cx + mg : ax + rs > cx - mg) {
    ax = cx + side * (rs + mg);
  }

  const above = LR.top - mg;
  const below = h - LR.bottom - mg - 40;
  const room = Math.max(above, below);
  if (room < rs * 2) {
    const r2 = Math.max(room / 2, 40);
    k *= r2 / rs;
    rs = r2;
  }

  ay = above >= below ? LR.top - mg - rs : LR.bottom + mg + rs;
  ay = clamp(ay, rs + 8, h - rs - 8);

  return { x: ax, y: ay, k, rs };
}
