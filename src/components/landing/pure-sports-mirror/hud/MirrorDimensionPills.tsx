'use client';

import React from 'react';
import { MirrorDimension } from '../data/mirrorDataTypes';

interface MirrorDimensionPillsProps {
  dimensions: MirrorDimension[];
  activeDimensionIndex: number;
  onSelectDimension: (index: number) => void;
}

export const MirrorDimensionPills: React.FC<MirrorDimensionPillsProps> = ({
  dimensions,
  activeDimensionIndex,
  onSelectDimension,
}) => {
  return (
    <div className="self-start flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full border border-white/[0.12] bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-full overflow-x-auto scrollbar-none">
      {dimensions.map((dim, i) => {
        const isActive = i === activeDimensionIndex;
        return (
          <button
            key={dim.id}
            type="button"
            onClick={() => onSelectDimension(i)}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-none cursor-pointer transition-all duration-300 text-left flex-shrink-0 ${
              isActive
                ? 'bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] scale-[1.01]'
                : 'bg-transparent hover:bg-white/[0.06] opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-0.5 h-3.5 sm:h-4 rounded-full transition-colors duration-300"
                style={{ backgroundColor: isActive ? dim.accentColor : 'rgba(255,255,255,0.2)' }}
              />
              <span
                className="font-mono text-[10px] sm:text-[11px] tracking-wider transition-colors duration-300"
                style={{ color: isActive ? dim.accentColor : 'rgba(234,242,248,0.5)' }}
              >
                {dim.numeral}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
              >
                {dim.name}
              </span>
              <span className="hidden sm:inline-block font-mono text-[8.5px] tracking-widest text-slate-400 whitespace-nowrap">
                {dim.subtitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
