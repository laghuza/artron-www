'use client';

import React from 'react';
import { MEMBERS } from '../constants';

interface ChurnRadarStageProps {
  selectedMember: number;
  onSelectMember: (idx: number) => void;
}

export const ChurnRadarStage: React.FC<ChurnRadarStageProps> = ({
  selectedMember,
  onSelectMember,
}) => {
  const orbits = [25, 50, 75, 100];

  return (
    <div className="flex justify-center w-full py-2">
      <div className="relative w-full max-w-[380px] aspect-square">
        {/* Regular Orbit Circles */}
        {orbits.map((val) => (
          <div
            key={val}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BAE6FD]/15 pointer-events-none"
            style={{ width: `${val}%`, height: `${val}%` }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-1.5 bg-[#0A0F16] font-mono text-[9px] text-[#76869A]">
              {val}%
            </span>
          </div>
        ))}

        {/* 60% Threshold Dashed Orbit Ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#F59E0B]/60 pointer-events-none"
          style={{ width: '60%', height: '60%' }}
        >
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#0A0F16] font-mono text-[9px] text-[#F59E0B] font-semibold">
            ზღვარი 60%
          </span>
        </div>

        {/* Central Safe Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#10B981] shadow-[0_0_18px_#10B981] pointer-events-none" />

        {/* Interactive Members */}
        {MEMBERS.map((m, i) => {
          const theta = ((-90 + i * 72) * Math.PI) / 180;
          const r = m.R / 2; // radius percentage (0 to 50%)
          const x = 50 + r * Math.cos(theta);
          const y = 50 + r * Math.sin(theta);
          const isSelected = selectedMember === i;
          const isHighRisk = m.R >= 60;
          const color = isHighRisk ? '#F59E0B' : '#10B981';

          return (
            <button
              key={m.n}
              type="button"
              onClick={() => onSelectMember(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 min-w-[50px] min-h-[50px] justify-center bg-transparent border-none p-0 cursor-pointer transition-all group focus:outline-none"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Member Node Dot */}
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width: isSelected ? '14px' : '10px',
                  height: isSelected ? '14px' : '10px',
                  backgroundColor: color,
                  boxShadow: `0 0 ${isSelected ? '16px' : '8px'} ${color}`,
                  outline: isSelected ? `2px solid ${color}` : 'none',
                  outlineOffset: '3px',
                }}
              />

              {/* Name & Risk Label */}
              <span
                className={`text-[10px] sm:text-[11px] whitespace-nowrap transition-colors ${
                  isSelected ? 'text-[#F0F9FF] font-bold' : 'text-[#A9B9CA] group-hover:text-white'
                }`}
              >
                {m.n} · {m.R}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
