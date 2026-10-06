'use client';

import React, { useEffect, useRef } from 'react';
import { DualCoreSyncState } from './types';

const CODE_SNIPPETS = ['gRPC // SYNTAX-PIPE', 'TLS_1.3', 'TOKEN: VERIFIED', 'LATENCY: 8ms', 'HANDSHAKE · OK', '0x4471::SIG', 'ZERO-TRUST'];
const L_TAGS = ['LEDGER_COMMIT', 'LABOR_AUDIT_OK', 'AES_256', 'TABEL_SYNC'];
const R_TAGS = ['AUTH_TOKEN', 'DYNAMIC_UUID', 'RELAY_ACK', 'PASS_4471'];

interface SyntaxBridgeCanvasProps {
  state: DualCoreSyncState;
}

export const SyntaxBridgeCanvas: React.FC<SyntaxBridgeCanvasProps> = ({ state }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Animation state refs for continuous 60fps loop without React re-render overhead
  const animRef = useRef({
    T: 0,
    rf: 0,
    pAcc: 0,
    sAcc: 0,
    flash: 0,
    flashB: 0,
    bL: 0,
    bR: 0,
    sparks: [] as Array<{ life: number; max: number; bulge: number; big?: boolean }>,
    packets: [] as Array<{ side: number; i: number; u: number; sp: number; tag: string | null }>,
    codes: [] as Array<{ txt: string; x: number; y: number; life: number; max: number }>,
    pktT0: 0,
    revT0: 0,
    crossed: false,
    crossedB: false,
  });

  // Track packet triggers from props
  useEffect(() => {
    if (state.pktOn) {
      animRef.current.pktT0 = performance.now();
      animRef.current.crossed = false;
    }
  }, [state.pktOn]);

  useEffect(() => {
    if (state.revOn) {
      animRef.current.revT0 = performance.now();
      animRef.current.crossedB = false;
    }
  }, [state.revOn]);

  // IntersectionObserver to pause loop when not on screen (0% CPU/GPU waste)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main 60 FPS Canvas render loop
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let lastTime = performance.now();

    const addSpark = (n = 1, big = false) => {
      for (let k = 0; k < n; k++) {
        animRef.current.sparks.push({
          life: 0,
          max: 0.16 + Math.random() * 0.26,
          bulge: (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * (big ? 58 : 30)),
          big,
        });
      }
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (!isVisibleRef.current) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const W = cv.clientWidth;
      const H = cv.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      if (!W || !H) return;

      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const mem = animRef.current;
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
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [state.pktOn, state.revOn, state.dispatch]);

  const lit = state.phase === 'synced' || state.pktOn;
  const pipeColor = state.revOn || state.dispatch ? '#38BDF8' : state.phase === 'synced' ? '#10B981' : state.phase === 'transit' ? '#F59E0B' : '#E0F2FE';
  const pipeText = state.phase === 'synced' ? (state.revOn ? 'DISPATCH' : state.dispatch ? 'LOOP CLOSED' : 'COMMITTED') : state.phase === 'transit' ? 'DISCHARGE' : state.phase === 'processing' ? 'HANDSHAKE' : 'ACTIVE';

  return (
    <div
      ref={containerRef}
      className="flex-[0_1_300px] max-w-[320px] min-w-[260px] relative preserve-3d"
      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(16px)' }}
    >
      {/* Station Tag */}
      <div className="absolute left-1.5 -top-11 flex items-center gap-2.5 text-[10.5px] tracking-[0.18em] text-slate-400 whitespace-nowrap">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#05080C] border transition-all duration-400"
          style={{
            borderColor: state.revOn ? '#38BDF8' : lit ? '#10B981' : 'rgba(224,242,254,0.3)',
            color: state.revOn ? '#38BDF8' : lit ? '#10B981' : '#94A3B8',
            boxShadow: lit ? '0 0 14px -2px #10B981, inset 0 2px 4px rgba(0,0,0,0.9)' : 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }}
        >
          02
        </span>
        <span className="font-sans font-medium text-slate-300">ხიდი · პროგრამული სინაფსი</span>
      </div>

      <div className="relative preserve-3d flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
        {/* Protocol Chip */}
        <div
          className="relative px-4 py-2 flex flex-col items-center gap-1 text-[10px] tracking-wider leading-snug text-center whitespace-nowrap"
          style={{ transform: 'translateZ(44px)' }}
        >
          <span className="absolute left-0 inset-y-0 w-1.5 border border-sky-100/25 border-r-0" />
          <span className="absolute right-0 inset-y-0 w-1.5 border border-sky-100/25 border-l-0" />
          <span className="text-sky-100 font-mono font-medium">PROTOCOL // ARTRON-SYNTAX-v4</span>
          <span className="text-slate-400 font-mono text-[9px]">[ZERO-HARDWARE / IOT DUAL-ENGINE]</span>
        </div>

        {/* 3D Stage with Canvas & 3D CSS Sphere */}
        <div className="relative w-full h-[440px] preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
          <canvas ref={canvasRef} className="absolute inset-y-0 -left-[72px] w-[calc(100%+144px)] h-full pointer-events-none" />
          <div className="absolute left-1/2 top-0 h-28 w-px bg-gradient-to-b from-sky-100/30 to-transparent" />
          <div className="absolute left-1/2 bottom-0 h-28 w-px bg-gradient-to-t from-amber-500/30 to-transparent" />

          {/* Central 3D CSS EnneaCore Armillary Sphere */}
          <div className="absolute left-1/2 top-1/2 w-0 h-0 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
            {/* Ambient Halo */}
            <div
              className="absolute -left-20 -top-20 w-40 h-40 rounded-full pointer-events-none transition-all duration-500 animate-[halo_4s_ease-in-out_infinite]"
              style={{
                background: `radial-gradient(circle, rgba(234,179,8,${lit ? '0.55' : '0.28'}) 0%, rgba(234,179,8,0.08) 45%, rgba(234,179,8,0) 70%)`,
              }}
            />

            {/* Main 3D Armillary Sphere (Rotating Cage) */}
            <div
              className="absolute left-0 top-0 preserve-3d"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'orbit 48s linear infinite',
              }}
            >
              {/* 9 Longitudinal Meridian Rings (Ennea Symmetry) */}
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={`m${i}`}
                  className="absolute -left-[76px] -top-[76px] w-[152px] h-[152px] rounded-full pointer-events-none"
                  style={{
                    border: `${i % 3 === 0 ? '1.5px' : '1px'} solid ${i % 2 ? 'rgba(74,82,92,0.95)' : 'rgba(214,224,234,0.5)'}`,
                    boxShadow: i % 2 ? 'none' : '0 0 6px rgba(224,242,254,0.18)',
                    transform: `rotateY(${i * 20}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                />
              ))}

              {/* Primary Equatorial Ring with Amber Glow */}
              <div
                className="absolute -left-[76px] -top-[76px] w-[152px] h-[152px] rounded-full pointer-events-none"
                style={{
                  border: '1.5px solid rgba(234,179,8,0.6)',
                  boxShadow: '0 0 10px rgba(234,179,8,0.35)',
                  transform: 'rotateX(90deg)',
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* Gyroscopic Cross-Axis Rings for complete 360° spherical circularity */}
              <div
                className="absolute -left-[76px] -top-[76px] w-[152px] h-[152px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(56,189,248,0.4)',
                  boxShadow: '0 0 6px rgba(56,189,248,0.2)',
                  transform: 'rotateX(45deg) rotateY(45deg)',
                  transformStyle: 'preserve-3d',
                }}
              />
              <div
                className="absolute -left-[76px] -top-[76px] w-[152px] h-[152px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(56,189,248,0.4)',
                  boxShadow: '0 0 6px rgba(56,189,248,0.2)',
                  transform: 'rotateX(-45deg) rotateY(-45deg)',
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>

            {/* Counter-Rotating Gyroscopic Ring for dynamic high-tech movement */}
            <div
              className="absolute left-0 top-0 preserve-3d pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'orbitRev 36s linear infinite',
              }}
            >
              <div
                className="absolute -left-[80px] -top-[80px] w-[160px] h-[160px] rounded-full border border-sky-400/35"
                style={{
                  boxShadow: '0 0 10px rgba(56,189,248,0.25)',
                  transform: 'rotateX(65deg) rotateZ(20deg)',
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>

            {/* Central Pulsing Golden Solar Core */}
            <div
              className="absolute -left-[14px] -top-[14px] w-[28px] h-[28px] rounded-full transition-all duration-400 animate-[breathe_4s_ease-in-out_infinite]"
              style={{
                background: 'radial-gradient(circle at 36% 30%, #FFFFFF 0%, #FEF3C7 20%, #FACC15 45%, #EAB308 70%, #854D0E 100%)',
                boxShadow: lit
                  ? '0 0 28px rgba(234,179,8,1), 0 0 80px rgba(234,179,8,0.6), inset 0 -2px 4px rgba(120,53,15,0.7)'
                  : '0 0 20px rgba(234,179,8,0.85), 0 0 50px rgba(234,179,8,0.35), inset 0 -2px 4px rgba(120,53,15,0.7)',
              }}
            />
          </div>
        </div>

        {/* Lower Status Chip */}
        <div
          className="relative px-4 py-2 flex flex-col items-center gap-1 text-[10px] tracking-wider leading-snug text-center whitespace-nowrap text-slate-400 font-mono"
          style={{ transform: 'translateZ(44px)' }}
        >
          <span className="absolute left-0 inset-y-0 w-1.5 border border-sky-100/25 border-r-0" />
          <span className="absolute right-0 inset-y-0 w-1.5 border border-sky-100/25 border-l-0" />
          <span>
            PIPELINE: <span style={{ color: pipeColor }}>{pipeText}</span> · LATENCY: <span className="text-sky-100">{state.latency ? `${state.latency}ms` : '<12ms'}</span>
          </span>
          <span className="text-[9px] text-slate-500">ENCRYPTION: TLS 1.3 / ZERO-TRUST</span>
        </div>

        {/* Artery Directions */}
        <div className="mt-3.5 w-full flex flex-col gap-1 text-[9.5px] font-mono tracking-widest">
          <div className="flex justify-between text-amber-500/90">
            <span>◂ PASS</span>
            <span>UPPER ARTERY</span>
          </div>
          <div className="flex justify-between text-sky-400/90">
            <span>LOWER ARTERY</span>
            <span>DISPATCH ▸</span>
          </div>
        </div>

        {/* LEDGER & PASS Indicators from Claude */}
        <div className="mt-3 w-full flex justify-between items-center text-[9.5px] font-mono tracking-[0.14em] text-slate-400">
          <span>LEDGER · B2B</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
            <span className="text-slate-300">ENNEA</span>
          </span>
          <span>PASS · B2C</span>
        </div>
      </div>
    </div>
  );
};
