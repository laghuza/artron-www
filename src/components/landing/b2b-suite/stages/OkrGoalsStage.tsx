'use client';

import React from 'react';
import { OKR, Q_DONE, Q_LEN } from '../constants';

interface OkrGoalsStageProps {
  selectedOkr: number;
  onSelectOkr: (idx: number) => void;
}

export const OkrGoalsStage: React.FC<OkrGoalsStageProps> = ({
  selectedOkr,
  onSelectOkr,
}) => {
  const tau = Q_DONE / Q_LEN;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 3 OKR Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {OKR.map((o, i) => {
          const isSelected = selectedOkr === i;
          const pDeg = (o.p * 3.6).toFixed(1);
          const tDeg = (tau * 360).toFixed(1);
          const pace = (o.p / 100 / tau).toFixed(2);

          return (
            <button
              key={o.t}
              type="button"
              onClick={() => onSelectOkr(i)}
              className={`flex flex-col items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#10B981]/10 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'bg-transparent border-[#BAE6FD]/15 hover:border-[#BAE6FD]/35'
              }`}
            >
              {/* Concentric Conic Progress Rings */}
              <div
                className="relative w-full max-w-[130px] aspect-square rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#10B981 0 ${pDeg}deg, rgba(186,230,253,0.1) 0)`,
                }}
              >
                {/* Spacer ring */}
                <div className="absolute inset-[6%] rounded-full bg-[#070B11]" />

                {/* Inner time ring */}
                <div
                  className="absolute inset-[13%] rounded-full"
                  style={{
                    background: `conic-gradient(#F59E0B 0 ${tDeg}deg, rgba(245,158,11,0.12) 0)`,
                  }}
                />

                {/* Center Core */}
                <div className="absolute inset-[18%] rounded-full bg-[#070B11] flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-semibold text-[#F0F9FF] leading-none">
                    {o.p}%
                  </span>
                  <span className="font-mono text-[9px] text-[#F59E0B] font-medium mt-1">
                    π {pace}
                  </span>
                </div>
              </div>

              {/* Text metadata */}
              <div className="flex flex-col gap-0.5 text-center">
                <span className="text-xs sm:text-[13px] font-semibold text-[#F0F9FF]">{o.t}</span>
                <span className="text-[10px] sm:text-[11px] text-[#76869A]">{o.kr}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-[#A9B9CA] pt-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#10B981]" />
          <span>გარე რკალი — შესრულება p</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#F59E0B]" />
          <span>შიდა რკალი — გასული დრო τ</span>
        </div>
      </div>
    </div>
  );
};
