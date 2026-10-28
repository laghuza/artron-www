import { DualCoreSyncState } from './types';

const CODE_SNIPPETS = ['gRPC // SYNTAX-PIPE', 'TLS_1.3', 'TOKEN: VERIFIED', 'LATENCY: 8ms', 'HANDSHAKE · OK', '0x4471::SIG', 'ZERO-TRUST'];

export interface SyntaxBridgeAnimMemory {
  T: number;
  rf: number;
  pAcc: number;
  sAcc: number;
  flash: number;
  flashB: number;
  bL: number;
  bR: number;
  sparks: Array<{ life: number; max: number; bulge: number; big?: boolean }>;
  packets: Array<{ side: number; i: number; u: number; sp: number; tag: string | null }>;
  codes: Array<{ txt: string; x: number; y: number; life: number; max: number }>;
  pktT0: number;
  revT0: number;
  crossed: boolean;
  crossedB: boolean;
}

export function drawSyntaxBridgeFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  dt: number,
  mem: SyntaxBridgeAnimMemory,
  state: DualCoreSyncState
) {
  const addSpark = (n = 1, big = false) => {
    for (let k = 0; k < n; k++) {
      mem.sparks.push({
        life: 0,
        max: 0.16 + Math.random() * 0.26,
        bulge: (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * (big ? 58 : 30)),
        big,
      });
    }
  };

  const T = (mem.T += dt);
  const cx = W / 2;
  const cy = H / 2;
  const G = 16;
  const SP = Math.min(150, H * 0.34);
  const N = 7;
  const TAU = Math.PI * 2;

  mem.bL = Math.max(0, mem.bL - dt * 1.3);
  mem.bR = Math.max(0, mem.bR - dt * 1.3);
  mem.flash = Math.max(0, mem.flash - dt * 1.4);
  mem.flashB = Math.max(0, mem.flashB - dt * 1.4);

  // Bezier point generator
  const pt = (side: number, i: number, u: number): [number, number] => {
    const s = (i / (N - 1) - 0.5) * 2;
    const y0 = cy + s * SP;
    const m = 1 - u;
    const x0 = side < 0 ? 0 : W;
    const x1 = cx + side * G;
    const c = x0 + (x1 - x0) * 0.62;
    const cyc = cy + s * SP * 0.12;
    const y = m * m * y0 + 2 * m * u * cyc + u * u * cy;
    return [m * m * x0 + 2 * m * u * c + u * u * x1, side < 0 ? y : y + Math.sin(u * 10 - T * 2.4 + i * 1.3) * 7 * (1 - u)];
  };

  // 1. Draw 9-Point Ennea polygon on Canvas
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(T * 0.04);
  const R = Math.min(118, W * 0.27);
  ctx.strokeStyle = 'rgba(224,242,254,0.07)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let k = 0; k <= 9; k++) {
    const a = (((k * 4) % 9) / 9) * TAU - Math.PI / 2;
    const x = Math.cos(a) * R;
    const y = Math.sin(a) * R;
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([1, 5]);
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);

  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * TAU - Math.PI / 2;
    ctx.fillStyle = k === 0 ? 'rgba(234,179,8,0.85)' : 'rgba(224,242,254,0.35)';
    ctx.beginPath();
    ctx.arc(Math.cos(a) * R, Math.sin(a) * R, k === 0 ? 2 : 1.3, 0, TAU);
    ctx.fill();
  }
  ctx.restore();

  // 2. Central glow pulse
  const amb = 0.1 + 0.04 * Math.sin(T * 1.6) + mem.flash * 0.45;
  const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90 + mem.flash * 70);
  rg.addColorStop(0, `rgba(234,179,8,${amb})`);
  rg.addColorStop(1, 'rgba(234,179,8,0)');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, W, H);

  // 3. Floating terminal code snippets
  if (mem.codes.length < 5 && Math.random() < dt * 1.3) {
    const top = Math.random() < 0.5;
    mem.codes.push({
      txt: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: W * (0.18 + Math.random() * 0.64),
      y: top ? H * (0.07 + Math.random() * 0.14) : H * (0.82 + Math.random() * 0.12),
      life: 0,
      max: 4 + Math.random() * 3,
    });
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '8.5px "JetBrains Mono", monospace';
  mem.codes = mem.codes.filter((c) => {
    c.life += dt;
    if (c.life > c.max) return false;
    const k = c.life / c.max;
    ctx.fillStyle = `rgba(148,163,184,${Math.sin(k * Math.PI) * 0.32})`;
    ctx.fillText(c.txt, c.x, c.y - k * 10);
    return true;
  });

  // 4. Neural fibers (Left & Right)
  for (const side of [-1, 1]) {
    const b = side < 0 ? mem.bL : mem.bR;
    for (let i = 0; i < N; i++) {
      const s = Math.abs(i / (N - 1) - 0.5) * 2;
      const core = i === (N - 1) / 2;
      const rgb = side < 0 ? (i % 2 ? '148,163,184' : '224,242,254') : i === 1 || i === 5 ? '16,185,129' : '245,158,11';
      const a = (core ? 0.5 : 0.24 - s * 0.08) * (1 + b * 2.4);
      const x0 = pt(side, i, 0)[0];
      const x1 = pt(side, i, 1)[0];
      const g = ctx.createLinearGradient(x0, 0, x1, 0);
      g.addColorStop(0, `rgba(${rgb},0)`);
      g.addColorStop(0.35, `rgba(${rgb},${a * 0.6})`);
      g.addColorStop(1, `rgba(${rgb},${Math.min(1, a * 1.6)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = core ? 1.1 : 0.7;
      if (side < 0 && i % 2) ctx.setLineDash([2, 5]);
      ctx.beginPath();
      for (let k = 0; k <= 36; k++) {
        const [x, y] = pt(side, i, k / 36);
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // 5. Dual arterial rails
  const RO = 22;
  const ry = (x: number, d: number) => {
    const k = Math.min(1, Math.abs(x - cx) / (W / 2));
    return cy + d * RO * k * (2 - k);
  };
  const rail = (x0: number, x1: number, d: number) => {
    ctx.beginPath();
    for (let k = 0; k <= 24; k++) {
      const x = x0 + ((x1 - x0) * k) / 24;
      if (k === 0) ctx.moveTo(x, ry(x, d));
      else ctx.lineTo(x, ry(x, d));
    }
    ctx.stroke();
  };

  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(245,158,11,${0.16 + (state.pktOn ? 0.25 : 0)})`;
  rail(0, W, -1);
  ctx.strokeStyle = `rgba(56,189,248,${0.16 + (state.revOn ? 0.3 : state.dispatch ? 0.14 : 0)})`;
  rail(0, W, 1);

  // Ambient dots on rails
  mem.rf += dt;
  for (let j = 0; j < 6; j++) {
    let u = (mem.rf * 0.09 + j / 6) % 1;
    let x = W - u * W;
    ctx.fillStyle = `rgba(245,158,11,${0.5 * Math.sin(Math.PI * u)})`;
    ctx.beginPath();
    ctx.arc(x, ry(x, -1), 1.2, 0, TAU);
    ctx.fill();

    u = (mem.rf * 0.08 + j / 6 + 0.06) % 1;
    x = u * W;
    ctx.fillStyle = `rgba(56,189,248,${0.55 * Math.sin(Math.PI * u)})`;
    ctx.beginPath();
    ctx.arc(x, ry(x, 1), 1.2, 0, TAU);
    ctx.fill();
  }

  // 6. PHOTON PACKET: Transit from Right (B2C) to Left (B2B)
  const el = performance.now() - mem.pktT0;
  const D = 420;
  if (mem.pktT0 && el < D) {
    const k = el / D;
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const x = W - W * e;
    const y = ry(x, -1);

    if (x > cx) mem.bR = 1;
    else mem.bL = 1;

    if (!mem.crossed && x <= cx) {
      mem.crossed = true;
      mem.flash = 1;
      addSpark(8, true);
    }

    const tw = Math.min(170, W - x);
    const tr = ctx.createLinearGradient(x, 0, x + tw, 0);
    tr.addColorStop(0, 'rgba(254,243,199,1)');
    tr.addColorStop(0.15, 'rgba(245,158,11,0.85)');
    tr.addColorStop(1, 'rgba(245,158,11,0)');
    ctx.strokeStyle = tr;
    ctx.lineWidth = 3;
    rail(x, x + tw, -1);

    if (x < cx) {
      const eg = ctx.createLinearGradient(x, 0, cx, 0);
      eg.addColorStop(0, 'rgba(16,185,129,0.85)');
      eg.addColorStop(1, 'rgba(16,185,129,0.1)');
      ctx.strokeStyle = eg;
      ctx.lineWidth = 2;
      rail(x, cx, -1);
    }

    ctx.shadowColor = 'rgba(245,158,11,1)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 7. REVERSE DISPATCH: From Left (B2B) to Right (B2C)
  const el2 = performance.now() - mem.revT0;
  const D2 = 560;
  if (mem.revT0 && el2 < D2) {
    const k = el2 / D2;
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const x = W * e;
    const y = ry(x, 1);

    if (!mem.crossedB && x >= cx) {
      mem.crossedB = true;
      mem.flashB = 1;
    }

    const tw = Math.min(170, x);
    const tr = ctx.createLinearGradient(x, 0, x - tw, 0);
    tr.addColorStop(0, 'rgba(224,242,254,1)');
    tr.addColorStop(0.15, 'rgba(56,189,248,0.9)');
    tr.addColorStop(0.6, 'rgba(16,185,129,0.35)');
    tr.addColorStop(1, 'rgba(16,185,129,0)');
    ctx.strokeStyle = tr;
    ctx.lineWidth = 3;
    rail(x - tw, x, 1);

    ctx.shadowColor = 'rgba(56,189,248,1)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#E0F2FE';
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

