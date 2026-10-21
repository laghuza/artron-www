'use client';

import React from 'react';

interface ScreenProgressProps {
  streak: number;
  todayH: number;
  barsRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenProgress: React.FC<ScreenProgressProps> = ({
  streak,
  todayH,
  barsRef,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* Top Streak Header */}
      <div className="flex justify-between items-end p-1">
        <div>
          <span className="font-mono text-[8px] tracking-wider text-slate-500 block">
            TRAINING STREAK
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-light font-mono text-white">
              {streak}
            </span>
            <span className="text-[10px] text-slate-400">კვირა ზედიზედ</span>
          </div>
        </div>
        <div className="text-right font-mono">
          <span className="text-[8px] text-slate-500 block">RECORD</span>
          <span className="text-xs text-[#FFAE85] font-bold">21</span>
        </div>
      </div>

      {/* 7-Day Chart Target Box */}
      <div
        ref={barsRef}
        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2"
      >
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-300">ბოლო 7 დღე</span>
          <span className="font-mono text-slate-400">4 ვიზიტი</span>
        </div>
        <div className="grid grid-cols-7 gap-2 items-end h-20">
          <div className="h-[80%] rounded-md bg-gradient-to-t from-slate-700 to-slate-400" />
          <div className="h-1 w-1 rounded-full bg-slate-600 mx-auto" />
          <div className="h-[90%] rounded-md bg-gradient-to-t from-slate-700 to-slate-400" />
          <div className="h-1 w-1 rounded-full bg-slate-600 mx-auto" />
          <div className="h-1 w-1 rounded-full bg-slate-600 mx-auto" />
          <div className="h-[64%] rounded-md bg-gradient-to-t from-slate-700 to-slate-400" />
          <div
            className="rounded-md bg-gradient-to-t from-orange-400 to-white shadow-md transition-all duration-700"
            style={{ height: `${todayH * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-[8px] font-mono text-slate-500">
          <span>ოთხ</span>
          <span>ხუთ</span>
          <span>პარ</span>
          <span>შაბ</span>
          <span>კვი</span>
          <span>ორშ</span>
          <span className="text-orange-300 font-bold">სამ</span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[8px] text-slate-500 block">ციკლი</span>
          <span className="font-mono text-xs text-white">10 / 12</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[8px] text-slate-500 block">საშუალო</span>
          <span className="font-mono text-xs text-white">70′</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[8px] text-slate-500 block">ძალა · 30 დღე</span>
          <span className="font-mono text-xs text-orange-300">+8%</span>
        </div>
      </div>

      {/* Coach Feedback Row */}
      <div className="flex items-center gap-2.5 p-1 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[9px] font-mono text-cyan-300 shrink-0">
          DT
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-slate-200 truncate">
            „კვირის მიზანი შესრულდა — გააგრძელე ასე.“
          </span>
          <span className="text-[8.5px] text-slate-500">
            დავით თ. · მწვრთნელი
          </span>
        </div>
      </div>
    </div>
  );
};
