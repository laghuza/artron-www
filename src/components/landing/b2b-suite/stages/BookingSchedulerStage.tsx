'use client';

import React from 'react';
import { FAC, HOURS, COACHES } from '../constants';

interface BookingSchedulerStageProps {
  occ: number[][];
  onToggleCell: (r: number, c: number) => void;
}

export const BookingSchedulerStage: React.FC<BookingSchedulerStageProps> = ({
  occ,
  onToggleCell,
}) => {
  const getCoach = (r: number, c: number) => COACHES[(2 * r + c) % COACHES.length];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Hours Header */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
        <span />
        {HOURS.map((h) => (
          <span key={h} className="font-mono text-[10px] sm:text-xs text-[#76869A]">
            {h}:00
          </span>
        ))}
      </div>

      {/* Facilities Rows */}
      <div className="flex flex-col gap-2.5">
        {FAC.map((f, r) => (
          <div key={f.n} className="grid grid-cols-7 gap-1.5 sm:gap-2 items-center">
            {/* Facility Label */}
            <div className="flex flex-col gap-0.5 min-w-0 pr-1 text-left">
              <span className="text-xs sm:text-[13px] font-medium text-[#F0F9FF] truncate">{f.n}</span>
              <span className="text-[10px] sm:text-[11px] text-[#76869A] truncate">{f.a}</span>
            </div>

            {/* Time Slot Cells */}
            {occ[r].map((v, c) => {
              const booked = v === 1;
              const coachName = getCoach(r, c);

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => onToggleCell(r, c)}
                  className={`min-h-[52px] sm:min-h-[58px] rounded-lg border transition-all duration-300 flex flex-col items-center justify-center gap-1 p-1 text-center cursor-pointer overflow-hidden ${
                    booked
                      ? 'bg-[#10B981]/20 border-[#10B981]/70 text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : 'bg-transparent border-[#BAE6FD]/20 hover:border-[#BAE6FD]/50 text-[#76869A]'
                  }`}
                >
                  <span className="font-mono text-[10px] sm:text-xs font-semibold truncate max-w-full">
                    {booked ? `${HOURS[c]}:00` : '+'}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] truncate max-w-full ${booked ? 'text-white font-medium' : 'text-[#76869A]'}`}>
                    {booked ? coachName : '60 წთ'}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[#A9B9CA]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#10B981]/20 border border-[#10B981]/70" />
          <span>დაჯავშნილი · დრო და მწვრთნელი (შეხებით გაუქმება)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border border-dashed border-[#BAE6FD]/40" />
          <span>თავისუფალი (შეხებით დაჯავშნა)</span>
        </div>
      </div>
    </div>
  );
};
