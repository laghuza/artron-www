'use client';

import React from 'react';
import { SEGS } from '../constants';

interface WinbackMatrixStageProps {
  selectedSeg: number;
  launched: boolean;
  onSelectSeg: (idx: number) => void;
  onToggleLaunch: () => void;
}

export const WinbackMatrixStage: React.FC<WinbackMatrixStageProps> = ({
  selectedSeg,
  launched,
  onSelectSeg,
  onToggleLaunch,
}) => {
  const currentSeg = SEGS[selectedSeg];
  const R = Math.round(currentSeg.n * currentSeg.c);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 3 Segment Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SEGS.map((sg, i) => {
          const isSelected = selectedSeg === i;

          return (
            <button
              key={sg.k}
              type="button"
              onClick={() => onSelectSeg(i)}
              className={`flex flex-col items-start justify-center gap-1 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#10B981]/15 border-[#10B981] shadow-[0_0_16px_rgba(16,185,129,0.25)]'
                  : 'bg-transparent border-[#BAE6FD]/15 hover:border-[#BAE6FD]/35'
              }`}
            >
              <span className={`text-xs font-semibold ${isSelected ? 'text-[#F0F9FF]' : 'text-[#A9B9CA]'}`}>
                {sg.k}
              </span>
              <span className="font-mono text-[11px] text-[#76869A]">
                n={sg.n} · c={(sg.c * 100).toFixed(0)}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Member Dot Matrix Grid (24 cols) */}
      <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-3 rounded-xl bg-[#06090e]/40 border border-[#BAE6FD]/10">
        {Array.from({ length: currentSeg.n }, (_, i) => {
          const isHit = i < R;
          return (
            <span
              key={i}
              className="aspect-square rounded-full transition-all duration-500"
              style={{
                backgroundColor: isHit
                  ? launched
                    ? '#10B981'
                    : 'rgba(16, 185, 129, 0.45)'
                  : 'rgba(186, 230, 253, 0.12)',
                boxShadow: isHit && launched ? '0 0 6px #10B981' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Controls Footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
        <span className="font-mono text-xs text-[#76869A]">1 წერტილი = 1 წევრი</span>
        <button
          type="button"
          onClick={onToggleLaunch}
          className="min-h-[44px] px-6 rounded-full bg-gradient-to-b from-[#10B981] to-[#059669] border border-[#a7f3d0]/45 text-[#022c22] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          {launched ? 'გადატვირთვა' : 'კამპანიის გაშვება'}
        </button>
      </div>
    </div>
  );
};
