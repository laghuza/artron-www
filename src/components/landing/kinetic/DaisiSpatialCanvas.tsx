'use client';

import React, { useEffect, useRef } from 'react';
import {
  buildDaisiClusters,
  evaluateTimeline,
  calculateDaisiAnchor,
  PAL,
  PALN,
  clamp,
  DaisiCluster,
  DaisiMeshModel
} from './daisi/daisiModels';

interface DaisiSpatialCanvasProps {
  scrollProgress: number;
  letterBounds?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  };
  className?: string;
}

export const DaisiSpatialCanvas: React.FC<DaisiSpatialCanvasProps> = ({
  scrollProgress,
  letterBounds,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<number>(scrollProgress);
  const boundsRef = useRef(letterBounds);

  useEffect(() => {
    scrollRef.current = scrollProgress;
    boundsRef.current = letterBounds;
  }, [scrollProgress, letterBounds]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let w = 0, h = 0, dpr = 1;
    function resize() {
      if (!canvas) return;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const TOTAL = isMobile ? 1200 : 3000, FOV = 850, TAU = Math.PI * 2;
    const pS = new Uint8Array(TOTAL), pU = new Float32Array(TOTAL), pOX = new Float32Array(TOTAL);
    const pOY = new Float32Array(TOTAL), pOZ = new Float32Array(TOTAL), pR = new Float32Array(TOTAL);
    const pA = new Float32Array(TOTAL), pCol = new Uint8Array(TOTAL), pB = new Uint8Array(TOTAL), pMI = new Uint16Array(TOTAL);
    let builderCount = 0;
    const gauss = () => {

      let u = 0;
      while (!u) u = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * Math.random());
    };
    const SCOL = [[133, 77, 14], [176, 120, 36], [212, 175, 55], [186, 230, 253], [255, 255, 255]];
    const NM = Math.floor(TOTAL * 0.55), NF = TOTAL - NM;
    for (let i = 0; i < TOTAL; i++) {
      const male = i < NM, j = male ? i : i - NM, n = male ? NM : NF, sig = male ? 12 : 8, r = Math.random();
      pS[i] = male ? 0 : 1;
      pU[i] = ((j + Math.random()) / n) * TAU;
      const g2 = () => clamp(gauss(), -2, 2) * sig;
      pOX[i] = g2(); pOY[i] = g2(); pOZ[i] = g2();
      pR[i] = male ? 0.75 + Math.random() * 0.85 : 0.5 + Math.random() * 0.55;
      pA[i] = male ? 0.5 + Math.random() * 0.35 : 0.6 + Math.random() * 0.35;
      pCol[i] = male ? (r < 0.5 ? 0 : r < 0.85 ? 1 : 2) : (r < 0.6 ? 3 : 4);
      if (Math.random() < 0.62) { pB[i] = 1; pMI[i] = builderCount++; }
    }

    const { clusters: CL, loop: LOOP } = buildDaisiClusters();
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const smax = (a: number, b: number, k: number) => {
      const q = clamp(0.5 + 0.5 * (b - a) / k, 0, 1);
      return a + (b - a) * q + k * q * (1 - q);
    };

    let railClock = 0, last = performance.now();
    const T0 = performance.now();
    const mouse = { tx: -9999, ty: -9999, x: -9999, y: -9999, on: 0, ton: 0 };
    const handleMove = (e: PointerEvent) => {
      mouse.tx = e.clientX; mouse.ty = e.clientY; mouse.ton = 1;
      if (mouse.x < -9000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    };
    const handleLeave = () => { mouse.ton = 0; };
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    let cY = 1, sY = 0, cP = 1, sP = 0;
    const PJ = { x: 0, y: 0, z: 0, s: 1, sh: 1 };
    function proj(x: number, y: number, z: number, an: { x: number; y: number; k: number }, rb: number) {
      const x1 = x * cY - z * sY, z1 = x * sY + z * cY, y2 = y * cP - z1 * sP, z2 = y * sP + z1 * cP;
      const s = FOV / (FOV + z2 * an.k);
      PJ.x = an.x + x1 * an.k * s; PJ.y = an.y + y2 * an.k * s; PJ.z = z2; PJ.s = s;
      PJ.sh = clamp(0.66 - (z2 / rb) * 0.42, 0.22, 1);
    }


    const oX = new Float32Array(TOTAL), oY = new Float32Array(TOTAL), oS = new Float32Array(TOTAL);
    const oZ = new Float32Array(TOTAL), oA = new Float32Array(TOTAL), oF = new Uint8Array(TOTAL);
    const oC = new Array<string>(TOTAL), oI: number[] = [];
    let oN = 0;

    function drawLines(m: DaisiMeshModel, an: { x: number; y: number; k: number } | null, la: number) {
      if (!ctx || !m.lines || !an || la < 0.01) return;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const L of m.lines) {
        const bk: (Path2D | null)[] = [null, null, null, null];
        for (const seg of L.segs) {
          let x0 = 0, y0 = 0, v0 = 0;
          for (let i = 0; i < seg.length; i++) {
            const q = seg[i]; proj(q[0], q[1], q[2], an, m.rb);
            const v = clamp((-PJ.z / m.rb + 0.05) / 0.3, 0, 1), x = PJ.x, y = PJ.y;
            if (i) {
              const vm = Math.min(v, v0);
              if (vm > 0.03) {
                const b = Math.min(3, (vm * 4) | 0);
                const pth = bk[b] || (bk[b] = new Path2D());
                pth.moveTo(x0, y0); pth.lineTo(x, y);
              }
            }
            x0 = x; y0 = y; v0 = v;
          }
        }
        ctx.lineWidth = Math.max(L.w * an.k, 0.75);
        for (let b = 0; b < 4; b++) {
          if (bk[b]) {
            ctx.strokeStyle = `rgba(${L.rgb},${(L.a * la * (b + 1) / 4).toFixed(3)})`;
            ctx.stroke(bk[b]!);
          }
        }
      }
      if (m.rim) {
        ctx.beginPath(); ctx.arc(an.x, an.y, Math.max(m.rb * an.k * 1.004, 0.5), 0, TAU);
        ctx.lineWidth = Math.max(m.rim.w * an.k, 0.75);
        ctx.strokeStyle = `rgba(${m.rim.rgb},${(m.rim.a * la).toFixed(3)})`;
        ctx.stroke();
      }
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(canvas);

    let rafId: number;
    function renderFrame(now: number) {
      rafId = requestAnimationFrame(renderFrame);
      if (!isVisible || !ctx) return;
      if (w < 10 || h < 10) return;

      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      const sp = scrollRef.current;
      const T = (now - T0) / 1000;
      const tl = evaluateTimeline(T, CL, LOOP);
      const live = 1 - smooth(clamp(sp * 6, 0, 1));
      railClock += dt * (1 + sp * 0.6);

      const depth = smooth(clamp(sp / 0.75, 0, 1));
      const depthK = FOV / (FOV + 450 * depth);
      const depthA = 1 - depth * 0.8125;
      const gM = (TAU / 20) * railClock, gF = (TAU / 20) * railClock;
      const rpT = railClock % 10;
      const ripM = Math.exp(-Math.pow((rpT - 0.6) / 0.35, 2));
      const ripF = Math.exp(-Math.pow((rpT - 1.05) / 0.45, 2));

      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.on += (mouse.ton - mouse.on) * 0.05;
      const mnx = mouse.on * clamp((mouse.x - w * 0.5) / (w * 0.5), -1, 1);
      const mny = mouse.on * clamp((mouse.y - h * 0.5) / (h * 0.5), -1, 1);
      const MR = clamp(w * 0.11, 70, 170);
      const mobile = w < 760, cx = w * 0.5, cy = h * 0.5;

      const LR = boundsRef.current || { width: 880, height: 120, top: cy - 60, bottom: cy + 60 };
      const S = clamp((LR.width * 0.5 + 16) / 430, 0.4, 1.5);
      const Sy = Math.min(S, h * 0.44 / 300);
      const KA = Math.max(430 * S, LR.width * 0.5 + 16);
      const KB = Math.max(120 * Sy, (LR.height || 120) * 0.5 + 14);

      const A = tl.A, B = tl.B;
      const anA = tl.st && A && B ? calculateDaisiAnchor(tl.sa ?? -1, w, h, Math.max(A.rb, B.rb), S, boundsRef.current) : null;
      const anB = tl.st === 3 && B ? calculateDaisiAnchor(tl.sb ?? 1, w, h, B.rb, S, boundsRef.current) : anA;

      const yaw = T * 0.45 + mnx * 0.35, pitch = 0.3142 * Math.sin(T * 0.2) + mny * 0.2;
      cY = Math.cos(yaw); sY = Math.sin(yaw); cP = Math.cos(pitch); sP = Math.sin(pitch);
      const spin = T * 1.25, cG = Math.cos(spin), sG = Math.sin(spin);
      const holdW = tl.st === 2 ? 1 : tl.st === 1 ? smooth(tl.p ?? 0) : tl.st === 3 ? 1 - smooth(clamp((tl.p ?? 0) * 3, 0, 1)) : 0;
      const morphJ = tl.st === 2 ? Math.sin(Math.PI * (tl.mix ?? 0)) : 0;
      const peakY = Math.max(Math.min(LR.top - 46 * Sy, anA ? Math.min(anA.y, anB?.y ?? anA.y) - 50 : 1e9), 30);
      const ctrlY = anA && anB ? 2 * peakY - 0.5 * (anA.y + anB.y) : 0;
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.0065);
      const reach = KA * 2.4;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';
      oN = 0;

      const activeTotal = mobile ? Math.floor(TOTAL * 0.35) : TOTAL;
      for (let i = 0; i < activeTotal; i++) {
        let X: number, Y: number, Z: number, ang: number, rip: number;
        if (pS[i] === 0) {
          const a = pU[i] - gM + 0.44;
          X = 580 * Math.cos(a); Y = 280 * Math.sin(a); Z = 85 * Math.cos(pU[i] - gM); ang = a; rip = ripM;
        } else {
          const th = pU[i], a = th - gF;
          X = (460 + 20 * Math.cos(3 * th - gF)) * Math.cos(a);
          Y = (170 + 12 * Math.sin(3 * th - gF)) * Math.sin(a);
          Z = 35 * Math.sin(2 * a); ang = a; rip = ripF;
        }
        const ca = Math.cos(ang), sa = Math.sin(ang);
        X = (X + ca * pOX[i]) * S; Y = (Y + sa * pOX[i]) * Sy; Z = (Z + pOZ[i]) * S;
        const dz = FOV / (FOV + Z);
        const ox = cx + X, oy = cy + Y;
        const dAng = Math.atan2(Math.sin(ang), Math.cos(ang));
        const glow = rip * Math.exp(-dAng * dAng / 0.18);

        let q = 0, flight = 0;
        if (pB[i] && tl.st && anA) {
          if (tl.st === 1) {
            const s = clamp(Math.hypot(ox - anA.x, oy - anA.y) / reach, 0, 1);
            q = clamp(((tl.p ?? 0) - 0.4 * s) / 0.6, 0, 1);
          } else if (tl.st === 2) {
            q = 1;
          } else {
            q = 1;
            flight = smooth(clamp(((tl.p ?? 0) - 0.38 * ((pMI[i] * 0.6180339) % 1)) / 0.62, 0, 1));
          }
        }
        const hp = smooth(q) * live;
        const inFlight = flight > 0.02 && flight < 0.98;

        let px = ox, py = oy, size = Math.max(pR[i] * dz * (1 + glow * 0.9), 0.5);
        let src: any = null, zd = 0, dark = 0;
        const oc = SCOL[pCol[i]];
        let cr = oc[0], cg = oc[1], cb = oc[2];
        if (glow > 0.01) {
          const tg = pS[i] === 0 ? [255, 214, 120] : [255, 236, 190], gk = glow * 0.75;
          cr += (tg[0] - cr) * gk; cg += (tg[1] - cg) * gk; cb += (tg[2] - cb) * gk;
        }
        let alpha = Math.min(1, pA[i] * (0.62 + 0.38 * Math.sin(pU[i] * 4 - railClock * 2.2)) * clamp(0.55 + 0.6 * dz, 0.35, 1) * (1 + glow * 1.4));

        if (!pB[i] && holdW > 0 && anA) {
          const dd = Math.hypot(ox - anA.x, oy - anA.y) / (anA.rs * 1.1);
          alpha *= 1 - 0.8 * holdW * Math.exp(-dd * dd);
        }

        if (hp > 0 && A && B && anA && anB) {
          const mi = pMI[i], pa = A.pts[mi % A.n], pb = B.pts[mi % B.n];
          const ea = mi < A.n ? 1 : 0, eb = mi < B.n ? 1 : 0;
          let ax_ = pa.x, az_ = pa.z, bx_ = pb.x, bz_ = pb.z;
          if (pa.g) {
            const dx = pa.x - pa.g.x, dzz = pa.z - pa.g.z;
            ax_ = pa.g.x + dx * cG - dzz * sG; az_ = pa.g.z + dx * sG + dzz * cG;
          }
          if (pb.g) {
            const dx = pb.x - pb.g.x, dzz = pb.z - pb.g.z;
            bx_ = pb.g.x + dx * cG - dzz * sG; bz_ = pb.g.z + dx * sG + dzz * cG;
          }
          let tx: number, ty: number, tsc: number, sh: number, exists: number, tr: number, tg2: number, tb: number, pa1: number;
          if (tl.st !== 3) {
            const m = tl.mix ?? 0, jj = morphJ * 1.6;
            proj(ax_ + (bx_ - ax_) * m + pOX[i] * jj, pa.y + (pb.y - pa.y) * m + pOY[i] * jj, az_ + (bz_ - az_) * m + pOZ[i] * jj, anA, A.rb);
            tx = PJ.x; ty = PJ.y; tsc = PJ.s; sh = PJ.sh; zd = PJ.z;
            src = m < 0.5 ? pa : pb; exists = ea + (eb - ea) * m;
            const tc = PALN[src.c]; tr = tc[0]; tg2 = tc[1]; tb = tc[2];
            pa1 = PAL[src.c][1]; dark = PAL[src.c][2] ? 1 : 0;
          } else {
            proj(ax_, pa.y, az_, anA, A.rb);
            const x0 = PJ.x, y0 = PJ.y, s0 = PJ.s, h0 = PJ.sh, z0 = PJ.z;
            proj(bx_, pb.y, bz_, anB, B.rb);
            const f = flight, u = 1 - f, arc = Math.sin(Math.PI * f);
            tx = u * u * x0 + 2 * u * f * (cx + pOX[i] * 2.4) + f * f * PJ.x;
            ty = u * u * y0 + 2 * u * f * (ctrlY + pOY[i] * 2.4) + f * f * PJ.y;
            tsc = s0 + (PJ.s - s0) * f; sh = h0 + (PJ.sh - h0) * f; zd = z0 + (PJ.z - z0) * f;
            src = f < 0.5 ? pa : pb; exists = ea + (eb - ea) * f;
            const c0 = PALN[pa.c], c1 = PALN[pb.c], sd = arc * 0.65;
            tr = c0[0] + (c1[0] - c0[0]) * f; tg2 = c0[1] + (c1[1] - c0[1]) * f; tb = c0[2] + (c1[2] - c0[2]) * f;
            tr += (255 - tr) * sd; tg2 += (236 - tg2) * sd; tb += (190 - tb) * sd;
            pa1 = PAL[src.c][1] * (1 - 0.25 * arc); dark = inFlight ? 0 : (PAL[src.c][2] ? 1 : 0);
          }
          px = ox + (tx - ox) * hp; py = oy + (ty - oy) * hp;
          cr += (tr - cr) * hp; cg += (tg2 - cg) * hp; cb += (tb - cb) * hp;
          const mA = (dark ? pa1 : pa1 * sh) * exists;
          alpha += (mA - alpha) * hp;
          let mSize = (0.95 + sh * 0.85) * tsc * (mobile ? 1.1 : 1) * (dark ? 1.3 : 1);
          if (tl.st === 3) mSize *= 1 - 0.3 * Math.sin(Math.PI * flight);
          size += (mSize - size) * hp;
          if (src?.f === 1) {
            size *= 1 + hp * (0.2 + pulse * 1.1);
            alpha = Math.min(1, alpha * (1 - hp * 0.3 * (1 - pulse)));
          } else if (src?.f === 2) {
            alpha *= 1 - hp * 0.55 * (0.5 - 0.5 * Math.sin(now * 0.005 + i * 0.7));
          }
        }

        if (mouse.on > 0.01) {
          const mdx = px - mouse.x, mdy = py - mouse.y;
          const md = Math.hypot(mdx, mdy) || 1;
          const f = Math.exp(-(md / MR) * (md / MR)) * mouse.on * (1 - hp * 0.85);
          if (f > 0.002) {
            const ux = mdx / md, uy = mdy / md, sw = pS[i] === 0 ? 0.35 : -0.45;
            const cap = (pS[i] === 0 ? 14 : 10) * S;
            px += (ux + uy * sw) * f * cap; py += (uy - ux * sw) * f * cap;
            alpha = Math.min(1, alpha * (1 + f * 0.6));
          }
        }

        const kw = inFlight ? 1 : 1 - hp;
        const ex = (px - cx) / KA, ey = (py - cy) / KB, e = Math.sqrt(ex * ex + ey * ey);
        if (kw > 0.001 && e > 0.001 && e < 1.3) {
          const f = 1 + (smax(e, 1.06, 0.14) / e - 1) * kw;
          px = cx + (px - cx) * f; py = cy + (py - cy) * f;
        }

        if (depth > 0.001) {
          px = cx + (px - cx) * depthK; py = cy + (py - cy) * depthK;
          size = Math.max(size * depthK, 0.5); alpha *= depthA;
        }

        if (px < -30 || px > w + 30 || py < -30 || py > h + 30 || alpha < 0.01) continue;
        const rgb = `${cr | 0},${cg | 0},${cb | 0}`;
        if (hp > 0.6 && !inFlight) {
          oX[oN] = px; oY[oN] = py; oS[oN] = size; oZ[oN] = zd; oA[oN] = alpha;
          oC[oN] = rgb; oF[oN] = src && src.f && hp > 0.5 ? 1 : 0; oN++;
          continue;
        }
        ctx.beginPath(); ctx.arc(px, py, Math.max(size, 0.3), 0, TAU);
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`; ctx.fill();
      }

      if (oN > 0) {
        oI.length = oN; for (let j = 0; j < oN; j++) oI[j] = j;
        oI.sort((a, b) => oZ[b] - oZ[a]);
        ctx.globalCompositeOperation = 'source-over';
        for (let n = 0; n < oN; n++) {
          const j = oI[n];
          if (!(oS[j] > 0)) continue;
          ctx.beginPath(); ctx.arc(oX[j], oY[j], oS[j], 0, TAU);
          ctx.fillStyle = `rgba(${oC[j]},${oA[j].toFixed(3)})`; ctx.fill();
          if (oF[j]) {
            ctx.beginPath(); ctx.arc(oX[j], oY[j], oS[j] * 3.2, 0, TAU);
            ctx.fillStyle = `rgba(${oC[j]},${(oA[j] * 0.14).toFixed(3)})`; ctx.fill();
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      if (tl.st && A) {
        let laA = 0, laB = 0;
        if (tl.st === 1) laA = smooth(clamp(((tl.p ?? 0) - 0.55) / 0.45, 0, 1));
        else if (tl.st === 2) {
          laA = 1 - smooth(clamp((tl.mix ?? 0) * 3, 0, 1));
          laB = A === B ? 0 : smooth(clamp(((tl.mix ?? 0) - 0.67) * 3, 0, 1));
        } else {
          laA = 1 - smooth(clamp((tl.p ?? 0) * 5, 0, 1));
          laB = smooth(clamp(((tl.p ?? 0) - 0.85) / 0.15, 0, 1));
        }
        if (anA) drawLines(A, anA, laA * live);
        if (B && anB && B !== A) drawLines(B, anB, laB * live);
      }
    }

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
