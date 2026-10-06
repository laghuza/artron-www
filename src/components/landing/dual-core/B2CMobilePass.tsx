'use client';

import React, { useEffect, useRef } from 'react';
import { DualCoreSyncState } from './types';

interface B2CMobilePassProps {
  state: DualCoreSyncState;
  onRun: () => void;
  onBtnHover: (hover: boolean) => void;
  onBtnPress: (press: boolean) => void;
}

export const B2CMobilePass: React.FC<B2CMobilePassProps> = ({ state, onRun, onBtnHover, onBtnPress }) => {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic QR Code Generator based on state.seed
  useEffect(() => {
    const cv = qrCanvasRef.current;
    if (!cv) return;
    const N = 25;
    const s = 6.5;
    const dpr = window.devicePixelRatio || 1;
    cv.width = N * s * dpr;
    cv.height = N * s * dpr;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, N * s, N * s);

    // Simple pseudo-random generator seeded from state.seed
    let a = (state.seed >>> 0) || 123456;
    const nextRand = () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const isCorner = (x: number, y: number) =>
      (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);

    ctx.fillStyle = '#070A0E';
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (isCorner(x, y)) continue;
        if (y === 6 || x === 6 ? (x + y) % 2 === 0 : nextRand() > 0.5) {
          ctx.fillRect(x * s, y * s, s, s);
        }
      }
    }

    // Three Finder corner squares
    [[0, 0], [N - 7, 0], [0, N - 7]].forEach(([fx, fy]) => {
      ctx.fillStyle = '#070A0E';
      ctx.fillRect(fx * s, fy * s, 7 * s, 7 * s);
      ctx.fillStyle = '#E0F2FE';
      ctx.fillRect((fx + 1) * s, (fy + 1) * s, 5 * s, 5 * s);
      ctx.fillStyle = '#070A0E';
      ctx.fillRect((fx + 2) * s, (fy + 2) * s, 3 * s, 3 * s);
    });
  }, [state.seed]);

  const busy = state.phase === 'processing' || state.phase === 'transit';
  const isSynced = state.phase === 'synced';
  const ttlSec = (state.ttl / 1000).toFixed(1).padStart(4, '0');
  const ttlPct = `${(state.ttl / state.maxTtl) * 100}%`;
  const ttlColor = state.ttl < 2500 ? '#F59E0B' : '#10B981';

  const btnLabel =
    state.phase === 'idle'
      ? 'დაჯავშნე, გადაიხადე & გამოსცადე საშვი'
      : state.phase === 'processing'
      ? 'მუშავდება გადახდა & სკანირება...'
      : state.phase === 'transit'
      ? 'კარი ღიაა · წვდომა დაშვებულია'
      : 'ჯავშანი & დაშვება წარმატებულია (თავიდან)';

  return (
    <div className="flex-none preserve-3d relative">
      {/* Station Tag */}
      <div className="absolute left-1.5 -top-11 flex items-center gap-2.5 text-[10.5px] tracking-[0.18em] text-slate-400 whitespace-nowrap">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#05080C] border transition-all duration-400"
          style={{
            borderColor: isSynced ? '#10B981' : busy ? '#F59E0B' : 'rgba(224,242,254,0.3)',
            color: isSynced ? '#10B981' : busy ? '#F59E0B' : '#94A3B8',
            boxShadow: isSynced ? '0 0 14px -2px #10B981' : busy ? '0 0 14px -2px #F59E0B' : 'none',
          }}
        >
          01
        </span>
        <span className="font-sans font-medium text-slate-300">B2C · მომხმარებლის საშვი</span>
      </div>

      {/* 3D Smartphone Frame */}
      <div
        className="relative preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-8deg) rotateX(4deg)',
        }}
      >
        <div
          className="absolute inset-0 rounded-[56px] bg-[#05070B] shadow-[0_70px_120px_-20px_rgba(0,0,0,1)] pointer-events-none"
          style={{ transform: 'translateZ(-14px)' }}
        />
        <div
          className="absolute inset-0 rounded-[56px] bg-gradient-to-br from-[#1B2330] to-[#0A0D13] pointer-events-none"
          style={{ transform: 'translateZ(-7px)' }}
        />

        <div className="relative w-[334px] p-2.5 rounded-[56px] bg-gradient-to-b from-[#303C4B] via-[#1B2330] to-[#1E1710] shadow-[0_2px_2px_rgba(0,0,0,0.6),0_35px_80px_-20px_rgba(0,0,0,0.95)]">
          {/* Side Hardware Buttons */}
          <div className="absolute -right-1 top-42 w-1.5 h-19 rounded-r bg-gradient-to-r from-[#111620] to-[#3A4658]" />
          <div className="absolute -left-1 top-32 w-1.5 h-8 rounded-l bg-gradient-to-l from-[#111620] to-[#3A4658]" />
          <div className="absolute -left-1 top-44 w-1.5 h-13 rounded-l bg-gradient-to-l from-[#111620] to-[#3A4658]" />
          <div className="absolute -left-1 top-60 w-1.5 h-13 rounded-l bg-gradient-to-l from-[#111620] to-[#3A4658]" />

          {/* Ingress Synapse Connector Node */}
          <div className="absolute -left-3 top-74 w-3 h-18 rounded-md bg-gradient-to-r from-[#05080C] via-[#1B2330] to-[#3A4658] border border-sky-100/15 flex flex-col items-center py-2 z-10">
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: busy ? '#F59E0B' : '#94A3B8',
                boxShadow: busy ? '0 0 8px #F59E0B' : 'none',
              }}
            />
            <span className="flex-1 w-px my-1 bg-gradient-to-b from-amber-500/30 to-sky-400/30" />
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: state.revOn ? '#38BDF8' : state.dispatch ? '#10B981' : '#1E293B',
                boxShadow: state.revOn ? '0 0 8px #38BDF8' : state.dispatch ? '0 0 8px #10B981' : 'none',
              }}
            />
          </div>

          {/* Screen Bezel */}
          <div className="p-1 rounded-[47px] bg-[#05070B]">
            <div className="relative w-[308px] h-[648px] rounded-[44px] bg-[#070A0E] overflow-hidden flex flex-col font-mono">
              {/* Dynamic Island */}
              <div
                className="absolute left-1/2 top-3 -translate-x-1/2 overflow-hidden flex flex-col z-20 transition-all duration-500 ease-[cubic-bezier(0.3,1.25,0.5,1)]"
                style={{
                  width: state.dispatch ? '288px' : busy ? '150px' : isSynced ? '172px' : '112px',
                  height: state.dispatch ? '78px' : '33px',
                  borderRadius: state.dispatch ? '26px' : '20px',
                  background: state.dispatch ? 'linear-gradient(180deg,#151B24 0%,#06080C 38%,#000 100%)' : '#000',
                  boxShadow: state.dispatch
                    ? '0 10px 24px -8px rgba(56,189,248,0.45), inset 0 1px 0 rgba(224,242,254,0.22)'
                    : 'inset 0 2px 4px rgba(0,0,0,1)',
                }}
              >
                <div className="flex-none h-8 flex items-center justify-between px-3 gap-2">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: isSynced ? '#10B981' : busy ? '#F59E0B' : '#64748B',
                        boxShadow: isSynced ? '0 0 8px #10B981' : busy ? '0 0 8px #F59E0B' : 'none',
                      }}
                    />
                    {state.dispatch && (
                      <span className="text-emerald-400 font-bold text-[9px]">[LIVE] DISPATCH // ACK {state.ackMs}ms</span>
                    )}
                  </div>
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700/60" />
                </div>
                {state.dispatch && (
                  <div className="px-3 pb-2 text-[10px] text-slate-300 font-sans leading-tight">
                    <div className="text-sky-100 font-semibold truncate">Tbilisi Arena // კორტი #1 მზადაა</div>
                    <div className="text-slate-400 text-[9px]">19:00 – 20:00 · <span className="text-sky-400">მწვრთნელი ადგილზეა</span></div>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center px-7 pt-4 text-xs font-bold text-slate-300 h-12">
                <span>19:00</span>
                <span className="text-[10px] text-sky-200 tracking-wider">5G ▪▪▪</span>
              </div>

              {/* Body Content */}
              <div className="flex-1 flex flex-col gap-3 p-4 pt-1">
                {/* Athlete ID Card */}
                <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#05080C] border border-white/5 text-[10.5px]">
                  <span className="text-slate-500 text-[9px] tracking-wider">ATHLETE // ID: 4471</span>
                  <span className="text-slate-200 font-semibold flex items-center justify-between">
                    გიორგი მ. <span className="text-emerald-400 text-[10px]">[PASS ACTIVE]</span>
                  </span>
                </div>

                {/* Dynamic Pass Box with QR */}
                <div className="relative rounded-2xl p-3.5 bg-slate-900/60 border border-sky-100/15 shadow-xl flex flex-col gap-2.5">
                  {/* Haptic Ring Shockwave */}
                  {state.hapticId > 0 && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <span className="w-64 h-64 rounded-full border border-emerald-400/80 animate-[haptic_1100ms_cubic-bezier(0.2,0.7,0.3,1)_forwards]" />
                    </div>
                  )}

                  <div className="flex justify-between text-[10px] tracking-wider">
                    <span className="text-slate-400">DYNAMIC PASS</span>
                    <span style={{ color: ttlColor }} className="font-bold tabular-nums">
                      TTL {ttlSec}s
                    </span>
                  </div>

                  {/* TTL Progress Line */}
                  <div className="h-1 rounded bg-black/60 overflow-hidden">
                    <div className="h-full transition-all duration-100 linear" style={{ width: ttlPct, background: ttlColor }} />
                  </div>

                  {/* QR Canvas Box */}
                  <div className="relative self-center p-2 rounded-xl bg-[#E0F2FE] shadow-lg overflow-hidden">
                    <canvas ref={qrCanvasRef} className="block w-36 h-36" style={{ opacity: busy ? 0.45 : 1 }} />

                    {/* Scanning Laser */}
                    {busy && (
                      <div className="absolute inset-x-1 h-8 bg-gradient-to-b from-transparent to-emerald-500/30 border-b-2 border-emerald-400 shadow-[0_8px_16px_rgba(16,185,129,0.9)] animate-[laser_520ms_ease-in-out_infinite] pointer-events-none" />
                    )}

                    {/* Success Overlay */}
                    {isSynced && (
                      <div className="absolute inset-0 rounded-xl bg-emerald-500/95 flex flex-col items-center justify-center gap-1 text-slate-950 font-bold">
                        <span className="text-sm tracking-wider">ACCESS · OK</span>
                        <span className="text-[10px] font-sans font-medium text-slate-900">43 / 60 · +50 ₾</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>კორტი #1 · 60 წთ</span>
                    <span className="text-sky-100 font-bold">50.00 ₾</span>
                  </div>
                </div>

                <div className="flex-1" />

                {/* State Tag */}
                <div className="flex justify-between text-[10px] tracking-widest text-slate-500">
                  <span>STATE</span>
                  <span style={{ color: isSynced ? '#10B981' : busy ? '#F59E0B' : '#94A3B8' }}>
                    {isSynced ? 'SYNCED' : busy ? 'PROCESSING' : 'STANDBY'}
                  </span>
                </div>

                {/* Big Action Button */}
                <div className="p-1 rounded-2xl bg-gradient-to-b from-[#05080C] to-[#0B1017] border border-white/5">
                  <button
                    onClick={onRun}
                    onMouseEnter={() => onBtnHover(true)}
                    onMouseLeave={() => onBtnHover(false)}
                    onMouseDown={() => onBtnPress(true)}
                    onMouseUp={() => onBtnPress(false)}
                    className="relative overflow-hidden w-full min-h-[56px] rounded-xl px-3 py-2 text-xs font-bold leading-snug transition-all duration-200 cursor-pointer font-sans"
                    style={{
                      background: isSynced
                        ? '#0B1017'
                        : busy
                        ? '#05080C'
                        : 'linear-gradient(180deg,#10B981 0%,#059669 60%,#047857 100%)',
                      color: isSynced ? '#10B981' : busy ? '#F59E0B' : '#041A12',
                      border: isSynced
                        ? '1px solid rgba(16,185,129,0.5)'
                        : busy
                        ? '1px solid rgba(245,158,11,0.6)'
                        : '1px solid rgba(4,120,87,0.9)',
                      boxShadow: isSynced
                        ? '0 0 25px rgba(16,185,129,0.28)'
                        : busy
                        ? '0 0 30px rgba(245,158,11,0.45)'
                        : '0 8px 25px -4px rgba(16,185,129,0.5)',
                    }}
                  >
                    {state.phase === 'idle' && (
                      <span className="absolute inset-x-2 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                    )}
                    <span className="relative z-10">{btnLabel}</span>
                  </button>
                </div>

                {/* Bottom Home Indicator */}
                <div className="self-center w-28 h-1 rounded-full bg-slate-700/60 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
