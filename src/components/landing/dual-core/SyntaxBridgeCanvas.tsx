'use client';

import React, { useEffect, useRef } from 'react';
import { DualCoreSyncState } from './types';
import { drawSyntaxBridgeFrame, SyntaxBridgeAnimMemory } from './syntaxBridgeDraw';

interface SyntaxBridgeCanvasProps {
  state: DualCoreSyncState;
}

export const SyntaxBridgeCanvas: React.FC<SyntaxBridgeCanvasProps> = ({ state }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const stateRef = useRef<DualCoreSyncState>(state);
  stateRef.current = state;

  // Animation state refs for continuous 60fps loop without React re-render overhead
  const animRef = useRef<SyntaxBridgeAnimMemory>({
    T: 0,
    rf: 0,
    pAcc: 0,
    sAcc: 0,
    flash: 0,
    flashB: 0,
    bL: 0,
    bR: 0,
    sparks: [],
    packets: [],
    codes: [],
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

  // Main 60 FPS Canvas render loop (initialized once, pauses RAF when off-screen)
  useEffect(() => {
    const cv = canvasRef.current;
    const el = containerRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastTime = performance.now();

    let w = cv.clientWidth || 400;
    let h = cv.clientHeight || 200;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      if (!cv) return;
      const nw = cv.clientWidth;
      const nh = cv.clientHeight;
      const ndpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nw > 0 && nh > 0) {
        w = nw;
        h = nh;
        dpr = ndpr;
        const bw = Math.round(w * dpr);
        const bh = Math.round(h * dpr);
        if (cv.width !== bw || cv.height !== bh) {
          cv.width = bw;
          cv.height = bh;
        }
      }
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(cv);

    const loop = (now: number) => {
      if (!isVisibleRef.current || document.hidden) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(loop);

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const W = w;
      const H = h;
      if (!W || !H) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      drawSyntaxBridgeFrame(ctx, W, H, dt, animRef.current, stateRef.current);
    };

    const startLoop = () => {
      if (!rafId && isVisibleRef.current && !document.hidden) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    let observer: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) {
              startLoop();
            } else if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    }

    startLoop();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      observer?.disconnect();
    };
  }, []);

  const lit = state.phase === 'synced' || state.pktOn;

  return (
    <div
      ref={containerRef}
      className="hidden lg:block flex-[0_1_300px] max-w-[320px] min-w-[260px] relative preserve-3d"
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
        <span className="font-sans font-medium text-slate-300">02 · რეალურ დროში კავშირი (0.01 წმ)</span>
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

        {/* Artery Directions */}
        <div className="mt-3.5 w-full flex flex-col gap-1 text-[9.5px] font-mono tracking-widest">
          <div className="flex justify-between text-amber-500/90">
            <span>◂ QR საშვი</span>
            <span>ზედა არტერია</span>
          </div>
          <div className="flex justify-between text-sky-400/90">
            <span>ქვედა არტერია</span>
            <span>ტურნიკეტის სიგნალი ▸</span>
          </div>
        </div>

        {/* LEDGER & PASS Indicators from Claude */}
        <div className="mt-3 w-full flex justify-between items-center text-[9.5px] font-mono tracking-[0.14em] text-slate-400">
          <span>მართვის პანელი</span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FACC15]"
              style={{
                boxShadow: '0 0 5px 1px rgba(234,179,8,0.95), 0 0 14px rgba(234,179,8,0.4)',
              }}
            />
            <span className="text-slate-300">ARTRON</span>
          </span>
          <span>მობილური აპლიკაცია</span>
        </div>
      </div>
    </div>
  );
};
