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
    <div className="w-full sm:w-auto mx-auto grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-2xl sm:rounded-full border border-white/[0.10] bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {dimensions.map((dim, i) => {
        const isActive = i === activeDimensionIndex;
        return (
          <button
            key={dim.id}
            type="button"
            onClick={() => onSelectDimension(i)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-2 sm:px-4 py-2 sm:py-2 rounded-xl sm:rounded-full border-none cursor-pointer transition-all duration-300 text-center sm:text-left select-none ${
              isActive
                ? 'bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] scale-[1.01]'
                : 'bg-transparent hover:bg-white/[0.06] opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span
                className="w-1 sm:w-0.5 h-3 sm:h-4 rounded-full transition-colors duration-300"
                style={{ backgroundColor: isActive ? dim.accentColor : 'rgba(255,255,255,0.2)' }}
              />
              <span
                className="font-mono text-[10px] sm:text-[11px] font-bold sm:font-normal tracking-wider transition-colors duration-300"
                style={{ color: isActive ? dim.accentColor : 'rgba(234,242,248,0.5)' }}
              >
                {dim.numeral}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-[11px] sm:text-[13px] font-semibold truncate transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
              >
                <span className="sm:hidden">{dim.shortName || dim.name}</span>
                <span className="hidden sm:inline whitespace-nowrap">{dim.name}</span>
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
