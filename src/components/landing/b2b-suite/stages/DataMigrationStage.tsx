'use client';

import React from 'react';
import { MIG, MIG_N, fmt } from '../constants';

interface DataMigrationStageProps {
  migProgress: number; // 0 to 1
  isMigrating: boolean;
  onRunMigration: () => void;
}

export const DataMigrationStage: React.FC<DataMigrationStageProps> = ({
  migProgress,
  isMigrating,
  onRunMigration,
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Migration Streams List */}
      <div className="flex flex-col divide-y divide-[#BAE6FD]/10">
        {MIG.map((m) => {
          const done = Math.round(m.rec * migProgress);
          const share = ((m.rec / MIG_N) * 100).toFixed(1);
          const wPct = (migProgress * 100).toFixed(1);

          return (
            <div key={m.name} className="flex flex-col gap-2 py-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#F0F9FF] font-medium">{m.name}</span>
                <span className="font-mono text-xs text-[#A9B9CA]">
                  {fmt(done)} / {fmt(m.rec)}
                </span>
              </div>

              {/* Progress Track */}
              <div className="relative h-2 rounded-full bg-[#BAE6FD]/10 overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#059669] to-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.7)] transition-all duration-150"
                  style={{ width: `${wPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#76869A] font-mono">
                <span>წილი ჯამში: {share}%</span>
                <span>{migProgress >= 1 ? '100% ✓' : `${wPct}%`}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-white/5">
        <span
          className={`font-mono text-xs font-semibold ${
            migProgress >= 1 ? 'text-[#10B981]' : isMigrating ? 'text-[#F59E0B]' : 'text-[#A9B9CA]'
          }`}
        >
          {isMigrating
            ? 'ნაკადი აქტიურია…'
            : migProgress >= 1
            ? 'დასრულდა · 0 დანაკარგი'
            : 'მზადაა გასაშვებად'}
        </span>

        <button
          type="button"
          onClick={onRunMigration}
          disabled={isMigrating}
          className="min-h-[44px] px-6 rounded-full bg-gradient-to-b from-[#10B981] to-[#059669] border border-[#a7f3d0]/45 text-[#022c22] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all cursor-pointer"
        >
          {migProgress >= 1 ? 'ხელახლა გაშვება' : 'მიგრაციის გაშვება'}
        </button>
      </div>
    </div>
  );
};
