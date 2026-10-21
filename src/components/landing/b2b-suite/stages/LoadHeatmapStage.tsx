'use client';

import React from 'react';
import { DAYS, BANDS, LOAD } from '../constants';

interface LoadHeatmapStageProps {
  selectedCell: [number, number]; // [dayIndex, bandIndex]
  onSelectCell: (day: number, band: number) => void;
}

export const LoadHeatmapStage: React.FC<LoadHeatmapStageProps> = ({
  selectedCell,
  onSelectCell,
}) => {
  const [selDay, selBand] = selectedCell;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Header Hours Row */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
        <span />
        {BANDS.map((b) => (
          <span key={b} className="font-mono text-[10px] sm:text-xs text-[#76869A]">
            {b}:00
          </span>
        ))}
      </div>

      {/* 7 Days Grid */}
      <div className="flex flex-col gap-1.5">
        {LOAD.map((row, di) => (
          <div key={DAYS[di]} className="grid grid-cols-7 gap-1.5 sm:gap-2 items-center">
            {/* Day Name */}
            <span className="text-xs sm:text-[13px] text-[#A9B9CA] font-medium text-left">
              {DAYS[di]}
            </span>

            {/* 6 Band Cells */}
            {row.map((v, bi) => {
              const isSelected = di === selDay && bi === selBand;
              const isPeak = v > 85;
              const bgAlpha = (v / 100) * 0.7;

              return (
                <button
                  key={`${di}-${bi}`}
                  type="button"
                  onClick={() => onSelectCell(di, bi)}
                  className={`min-h-[36px] sm:min-h-[42px] rounded-lg border font-mono text-[11px] sm:text-xs transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'border-2 border-white text-white font-bold shadow-[0_0_14px_rgba(255,255,255,0.4)] scale-105 z-10'
                      : isPeak
                      ? 'border border-[#F59E0B] text-[#F0F9FF] font-semibold'
                      : 'border border-[#BAE6FD]/10 text-[#A9B9CA] hover:border-[#BAE6FD]/30'
                  }`}
                  style={{
                    backgroundColor: `rgba(16, 185, 129, ${bgAlpha.toFixed(2)})`,
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[#A9B9CA]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border border-[#F59E0B]" />
          <span>პიკური · L &gt; 85</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#10B981]/50" />
          <span>შეფერილობა ∝ დატვირთვა</span>
        </div>
      </div>
    </div>
  );
};
