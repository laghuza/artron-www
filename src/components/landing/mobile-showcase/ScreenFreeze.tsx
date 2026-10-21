'use client';

import React from 'react';
import { soundEngine } from '@/core';

interface ScreenFreezeProps {
  frzDays: number;
  frzDone: boolean;
  onFreeze: () => void;
  freezeRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenFreeze: React.FC<ScreenFreezeProps> = ({
  frzDays,
  frzDone,
  onFreeze,
  freezeRef,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* Header */}
      <div className="flex justify-between items-baseline p-1">
        <span className="text-xs font-semibold text-white">
          გაყინვა · სექტემბერი
        </span>
        <span className="font-mono text-[10px] text-cyan-300">
          {frzDays ? `${frzDays} დღე · უფასოდ` : 'მაქს. 14 დღე'}
        </span>
      </div>

      {/* Calendar Days Target Box */}
      <div
        ref={freezeRef}
        className="grid grid-cols-7 gap-1 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center font-mono text-xs"
      >
        {['ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა', 'კვ'].map((d) => (
          <span key={d} className="text-[8px] text-slate-500 mb-1">
            {d}
          </span>
        ))}
        {Array.from({ length: 21 }, (_, k) => {
          const n = k + 7;
          const inRange = n >= 21 && n < 21 + (frzDays || 7);
          return (
            <div
              key={n}
              className={`h-6 rounded-md flex items-center justify-center text-[10px] transition-all ${
                inRange
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                  : n === 15
                  ? 'border border-white/40 text-white'
                  : n < 15
                  ? 'text-slate-600'
                  : 'text-slate-300'
              }`}
            >
              {n}
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="flex flex-col border-t border-white/10 pt-1 text-[10.5px]">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-slate-400">პერიოდი</span>
          <span className="text-white font-mono text-[11px]">
            {frzDays > 1 ? `21–${20 + frzDays} სექტემბერი` : '21–27 სექტემბერი'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-slate-400">აბონემენტის ვადა</span>
          <span className="text-[#E0F2FE] font-mono text-[11px]">
            16 ოქტ → {16 + (frzDays || 7)} ოქტ
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-slate-400">ღირებულება</span>
          <span className="text-white text-[11px]">უფასო</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-slate-400">ადრე დაბრუნება</span>
          <span className="text-white text-[11px]">დღეები აღდგება</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          onFreeze();
        }}
        className={`min-h-[46px] rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide cursor-pointer transition-all ${
          frzDone
            ? 'bg-cyan-400 text-slate-950 shadow-lg'
            : 'bg-white text-slate-950 hover:bg-slate-200'
        }`}
      >
        {frzDone
          ? `გაყინულია ${20 + (frzDays || 7)} სექტემბრამდე`
          : `${frzDays || 7} დღით გაყინვა`}
      </button>
    </div>
  );
};
