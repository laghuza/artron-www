const COLORS: [number, number, number][] = [
  [255, 255, 255], // Diamond White
  [212, 175, 55],  // Titanium Gold
  [16, 185, 129],  // Emerald Status
  [147, 197, 253], // Cyber Blue
];

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  r: number;
  ph: number;
  sp: number;
  core: string;
  halo: string;
  hk?: number;
  hx?: number;
  hy?: number;
}

export interface ShockWave {
  x: number;
  y: number;
  r: number;
  s: number;
  max: number;
}

export interface RimInfo {
  k: string;
  l: number;
  t: number;
  r: number;
  b: number;
  rad: number;
}

export interface GlyphInfo {
  l: number;
  t: number;
  r: number;
  b: number;
  cx: number;
  cy: number;
}

export function spawnCosmicParticles(w: number, h: number, count = 80): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const z = 0.35 + Math.random() * 0.65;
    const c = COLORS[i % 4];
    const a = 0.25 + Math.random() * 0.2;
    return {
      x: Math.random() * (w || 1000),
      y: Math.random() * (h || 600),
      vx: 0,
      vy: 0,
      z,
      r: 0.6 + z * 1.4,
      ph: Math.random() * 6.283,
      sp: 0.0002 + Math.random() * 0.0003,
      core: `rgba(${c[0]},${c[1]},${c[2]},${a})`,
      halo: `rgba(${c[0]},${c[1]},${c[2]},${a * 0.22})`,
    };
  });
}

const jag = (x1: number, y1: number, x2: number, y2: number, disp: number, depth: number, out: number[]) => {
  if (depth <= 0 || disp < 0.6) {
    out.push(x2, y2);
    return;
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
  jag(x1, y1, mx, my, disp / 2, depth - 1, out);
  jag(mx, my, x2, y2, disp / 2, depth - 1, out);
};

export const buildLightningBolt = (x1: number, y1: number, x2: number, y2: number) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const main = [x1, y1];
  jag(x1, y1, x2, y2, L * 0.22, 6, main);
  const br: number[][] = [];
  const n = L > 50 ? 2 : 1;
  for (let b = 0; b < n; b++) {
    const i = 2 * (4 + Math.floor(Math.random() * (main.length / 2 - 8)));
    if (i < 2 || i >= main.length - 2) continue;
    const bx = main[i];
    const by = main[i + 1];
    const a = Math.atan2(y2 - y1, x2 - x1) + (Math.random() < 0.5 ? -1 : 1) * (0.45 + Math.random() * 0.5);
    const bl = L * (0.16 + Math.random() * 0.16);
    const seg = [bx, by];
    jag(bx, by, bx + Math.cos(a) * bl, by + Math.sin(a) * bl, bl * 0.3, 4, seg);
    br.push(seg);
  }
  return { main, br };
};

export const strokePolyPath = (c: CanvasRenderingContext2D, pts: number[]) => {
  c.beginPath();
  c.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
};

const cl = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const RIM = 240;

export function drawRimHighlights(
  fctx: CanvasRenderingContext2D,
  w: number,
  mx: number,
  my: number,
  rimA: number,
  rims: RimInfo[]
) {
  const glint = (px: number, py: number, d: number, len: number) => {
    const I = 1 - d / RIM;
    const a = I * I * rimA;
    if (a < 0.01) return null;
    const g = fctx.createRadialGradient(px, py, 0, px, py, len);
    g.addColorStop(0, `rgba(240,236,226,${(0.55 * a).toFixed(3)})`);
    g.addColorStop(0.3, `rgba(212,175,55,${(0.4 * a).toFixed(3)})`);
    g.addColorStop(1, 'rgba(212,175,55,0)');
    return g;
  };

  fctx.save();
  fctx.globalCompositeOperation = 'lighter';
  {
    const a = w / 2;
    const x = cl(mx, 0, w);
    const u = (x - a) / a;
    const y = 24 - 24 * Math.sqrt(Math.max(0, 1 - u * u));
    const d = Math.hypot(mx - x, my - y);
    const g = d < RIM ? glint(x, y, d, 110) : null;
    if (g) {
      fctx.strokeStyle = g;
      fctx.lineWidth = 1.5;
      fctx.beginPath();
      fctx.ellipse(a, 24, a - 0.75, 23.25, 0, Math.PI, 2 * Math.PI);
      fctx.stroke();
    }
  }
  fctx.lineWidth = 1;
  for (const o of rims) {
    let px = 0;
    let py = 0;
    let rr = 0;
    if (o.k === 'v') {
      px = o.l + 0.5;
      py = cl(my, o.t, o.b);
    } else if (o.k !== 'rect') {
      py = o.t + 0.5;
      px = cl(mx, o.l, o.r);
    } else {
      rr = Math.min(o.rad, (o.r - o.l) / 2, (o.b - o.t) / 2);
      if (mx >= o.l && mx <= o.r && my >= o.t && my <= o.b) {
        const e = [mx - o.l, o.r - mx, my - o.t, o.b - my];
        const m = Math.min(...e);
        const k = e.indexOf(m);
        px = k === 0 ? o.l : k === 1 ? o.r : mx;
        py = k === 2 ? o.t : k === 3 ? o.b : my;
      } else {
        const cx = cl(mx, o.l + rr, o.r - rr);
        const cy = cl(my, o.t + rr, o.b - rr);
        const dx = mx - cx;
        const dy = my - cy;
        const L = Math.hypot(dx, dy) || 1;
        px = cx + (dx / L) * rr;
        py = cy + (dy / L) * rr;
        if (rr === 0) {
          px = cl(mx, o.l, o.r);
          py = cl(my, o.t, o.b);
        }
      }
    }
    const d = Math.hypot(mx - px, my - py);
    if (d >= RIM) continue;
    const g = glint(px, py, d, o.k === 'rect' ? 40 : 85);
    if (!g) continue;
    fctx.strokeStyle = g;
    fctx.beginPath();
    if (o.k === 'v') {
      fctx.moveTo(o.l + 0.5, o.t);
      fctx.lineTo(o.l + 0.5, o.b);
    } else if (o.k !== 'rect') {
      fctx.moveTo(o.l, o.t + 0.5);
      fctx.lineTo(o.r, o.t + 0.5);
    } else if (fctx.roundRect) {
      fctx.roundRect(o.l + 0.5, o.t + 0.5, o.r - o.l - 1, o.b - o.t - 1, Math.max(0, rr - 0.5));
    } else {
      fctx.rect(o.l + 0.5, o.t + 0.5, o.r - o.l - 1, o.b - o.t - 1);
    }
    fctx.stroke();
  }
  fctx.restore();
}

export function drawLightningArc(
  fctx: CanvasRenderingContext2D,
  arc: { main: number[]; br: number[][] },
  T: { x: number; y: number; d: number },
  mx: number,
  my: number,
  tA: number
) {
  const near = 1 - Math.min(1, T.d / 120);
  const A = tA * (0.55 + near * 0.45);
  fctx.save();
  fctx.lineCap = 'round';
  fctx.lineJoin = 'round';
  fctx.globalCompositeOperation = 'lighter';

  fctx.strokeStyle = `rgba(162,201,242,${(0.12 * A).toFixed(3)})`;
  fctx.lineWidth = 3.2;
  strokePolyPath(fctx, arc.main);
  fctx.stroke();

  fctx.strokeStyle = `rgba(162,201,242,${(0.6 * A).toFixed(3)})`;
  fctx.lineWidth = 0.8;
  strokePolyPath(fctx, arc.main);
  fctx.stroke();

  fctx.strokeStyle = `rgba(232,242,255,${(0.35 * A).toFixed(3)})`;
  fctx.lineWidth = 0.35;
  strokePolyPath(fctx, arc.main);
  fctx.stroke();

  fctx.strokeStyle = `rgba(162,201,242,${(0.32 * A).toFixed(3)})`;
  fctx.lineWidth = 0.5;
  for (const b of arc.br) {
    strokePolyPath(fctx, b);
    fctx.stroke();
  }

  const fl = 0.75 + Math.random() * 0.5;
  const gr = fctx.createRadialGradient(T.x, T.y, 0, T.x, T.y, 11 * fl);
  gr.addColorStop(0, `rgba(255,248,220,${(0.9 * A).toFixed(3)})`);
  gr.addColorStop(0.25, `rgba(243,217,138,${(0.55 * A).toFixed(3)})`);
  gr.addColorStop(1, 'rgba(212,175,55,0)');
  fctx.fillStyle = gr;
  fctx.beginPath();
  fctx.arc(T.x, T.y, 11 * fl, 0, 6.2832);
  fctx.fill();

  fctx.fillStyle = `rgba(243,217,138,${(0.8 * A).toFixed(3)})`;
  for (let i = 0; i < 3; i++) {
    const a = Math.random() * 6.2832;
    const rr = 3 + Math.random() * 7;
    fctx.fillRect(T.x + Math.cos(a) * rr, T.y + Math.sin(a) * rr, 0.9, 0.9);
  }
  fctx.fillStyle = `rgba(232,242,255,${(0.7 * A).toFixed(3)})`;
  fctx.beginPath();
  fctx.arc(mx, my, 1.1, 0, 6.2832);
  fctx.fill();
  fctx.restore();
}
