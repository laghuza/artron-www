'use client';

import React from 'react';
import { soundEngine } from '@/core';

interface ScreenEntryPassProps {
  qrCells: { c: string }[];
  sec: number;
  tap: 'idle' | 'reading' | 'ok';
  visits: number;
  onTap: () => void;
  qrRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenEntryPass: React.FC<ScreenEntryPassProps> = ({
  qrCells,
  sec,
  tap,
  visits,
  onTap,
  qrRef,
}) => {
  return (
    <div className="flex flex-col gap-3 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* 3D Entry Pass Glass Card */}
      <div className="relative h-[320px] rounded-[22px] overflow-hidden p-4 flex flex-col justify-between bg-gradient-to-b from-[#18263A] via-[#0E1828] to-[#08101B] border border-white/10 shadow-2xl">
        {/* Holographic Watermark behind QR */}
        <div className="absolute -left-2 -bottom-3 font-mono text-[64px] font-bold tracking-tight text-white/[0.04] pointer-events-none select-none">
          ARTRON
        </div>

        {/* Top Header */}
        <div className="flex justify-between items-center z-10">
          <span className="font-mono text-[9.5px] tracking-[0.25em] text-white/90 font-bold">
            ARTRON
          </span>
          <span className="font-mono text-[9px] tracking-wider text-slate-400">
            MEMBER PASS
          </span>
        </div>

        {/* Central Animated QR Container */}
        <div className="relative w-full h-[180px] flex items-center justify-center">
          <div
            className="absolute w-36 h-36 rounded-full opacity-35 animate-spin"
            style={{
              animationDuration: '24s',
              background:
                'conic-gradient(from 180deg, #64748B 0%, #E2E8F0 25%, #475569 50%, #F8FAFC 75%, #64748B 100%)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
            }}
          />
          <div
            className="absolute w-44 h-44 rounded-full opacity-20 animate-spin"
            style={{
              animationDuration: '36s',
              animationDirection: 'reverse',
              background:
                'conic-gradient(from 220deg, #64748B 0%, #E2E8F0 25%, #475569 50%, #F8FAFC 75%, #64748B 100%)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))',
            }}
          />

          <div
            ref={qrRef}
            className="relative w-24 h-24 p-2 rounded-2xl bg-gradient-to-br from-white to-slate-200 shadow-2xl flex items-center justify-center z-10"
          >
            <div className="grid grid-cols-15 w-full h-full gap-[0.5px]">
              {qrCells.map((cell, idx) => (
                <div
                  key={idx}
                  className="w-full h-full rounded-[0.5px]"
                  style={{ backgroundColor: cell.c }}
                />
              ))}
            </div>

            <div className="absolute inset-x-0 h-[2px] bg-[#00A3FF] animate-[scan_2s_linear_infinite]" />

            {tap === 'ok' && (
              <div className="absolute inset-0 rounded-2xl bg-[#04140E]/95 flex flex-col items-center justify-center gap-1 animate-[arOk_2.6s_both]">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  ✓
                </div>
                <span className="font-mono text-[7px] text-emerald-300 tracking-wider">
                  GRANTED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="flex flex-col gap-2 z-10">
          <div className="h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#80DAAC] to-transparent animate-[shimmer_3s_linear_infinite]" />
          </div>
          <div className="flex justify-between items-end text-[9px] font-mono text-slate-400">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-wider text-slate-500">
                HOLDER
              </span>
              <span className="text-white font-medium text-[11px]">
                გიორგი მ.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-slate-500">
                TOKEN · {String(sec).padStart(2, '0')}s
              </span>
              <span className="text-white text-[10px]">ART-88924</span>
            </div>
          </div>
        </div>
      </div>

      {/* NFC Interactive Tap Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playSystemAccess();
          onTap();
        }}
        className={`min-h-[44px] rounded-full flex items-center justify-center gap-2.5 px-4 text-xs font-medium cursor-pointer transition-all duration-300 border ${
          tap === 'ok'
            ? 'bg-emerald-950/80 border-emerald-500/50 text-[#D5F4E2] shadow-[0_0_20px_rgba(76,189,136,0.3)]'
            : tap === 'reading'
            ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200'
            : 'bg-white/[0.05] border-white/15 text-slate-200 hover:bg-white/10'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            tap === 'ok'
              ? 'bg-emerald-400 animate-pulse'
              : tap === 'reading'
              ? 'bg-cyan-400 animate-ping'
              : 'bg-slate-400'
          }`}
        />
        <span>
          {tap === 'ok'
            ? `დაშვებულია · დარჩა ${visits} ვიზიტი`
            : tap === 'reading'
            ? 'კავშირი ტურნიკეტთან…'
            : 'NFC მზადაა · მიადეთ ტურნიკეტს'}
        </span>
      </button>
    </div>
  );
};
