'use client';

import React from 'react';
import { MONTHS, MRR, PROJ } from '../constants';

interface MrrGrowthStageProps {
  selectedMonth: number;
  onSelectMonth: (idx: number) => void;
}

export const MrrGrowthStage: React.FC<MrrGrowthStageProps> = ({
  selectedMonth,
  onSelectMonth,
}) => {
  const guides = [10, 20, 30, 40];

  return (
    <div className="relative h-[280px] w-full flex items-end gap-1.5 sm:gap-2.5 pb-7 pt-4">
      {/* Horizontal guide lines */}
      {guides.map((val) => {
        const bottomPct = (val / 50) * 100;
        return (
          <div
            key={val}
            className="absolute left-0 right-0 border-t border-dashed border-[#BAE6FD]/10 pointer-events-none"
            style={{ bottom: `calc(28px + ${bottomPct}% * 0.85)` }}
          >
            <span className="absolute right-0 -top-4 font-mono text-[10px] text-[#76869A]">
              {val}K
            </span>
          </div>
        );
      })}

      {/* 12 Monthly Bars */}
      {MONTHS.map((m, i) => {
        const v = i < 11 ? MRR[i] : PROJ;
        const isSelected = selectedMonth === i;
        const isProjected = i === 11;
        const heightPct = (v / 50) * 100;

        return (
          <button
            key={m}
            type="button"
            onClick={() => onSelectMonth(i)}
            className="relative flex-1 h-full flex flex-col justify-end items-stretch bg-transparent border-none p-0 cursor-pointer group focus:outline-none"
          >
            {/* Value tooltip above active bar */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none ${
                isSelected
                  ? 'text-[#10B981] opacity-100 scale-100'
                  : 'text-[#BAE6FD] opacity-0 group-hover:opacity-100'
              }`}
              style={{ bottom: `calc(${heightPct}% + 6px)` }}
            >
              {v.toFixed(1)}K
            </span>

            {/* The Bar */}
            <div
              className={`rounded-t-md transition-all duration-300 ${
                isProjected
                  ? 'border-2 border-dashed border-[#F59E0B] bg-[#F59E0B]/15'
                  : isSelected
                  ? 'bg-gradient-to-t from-[#059669] to-[#10B981] border border-[#a7f3d0]/60 shadow-[0_0_22px_rgba(16,185,129,0.7)]'
                  : 'bg-gradient-to-t from-[#BAE6FD]/10 to-[#BAE6FD]/25 border border-[#BAE6FD]/15 group-hover:border-[#BAE6FD]/40'
              }`}
              style={{ height: `${heightPct}%` }}
            />

            {/* Month label below */}
            <span
              className={`absolute left-0 right-0 -bottom-6 text-center text-[10px] sm:text-[11px] font-sans transition-colors ${
                isSelected ? 'text-[#F0F9FF] font-bold' : 'text-[#76869A]'
              }`}
            >
              {m}
            </span>
          </button>
        );
      })}
    </div>
  );
};
