'use client';

import React from 'react';

interface ScreenLiveLoadProps {
  occupancy: number;
  occRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenLiveLoad: React.FC<ScreenLiveLoadProps> = ({
  occupancy,
  occRef,
}) => {
  const occVal = occupancy || 35;
  const occDeg = occVal * 3.6;

  return (
    <div className="flex flex-col items-center gap-2 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* Live Badge Indicator */}
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#63DBCD]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#63DBCD] animate-pulse shadow-[0_0_8px_#63DBCD]" />
        <span>LIVE · 11:24</span>
      </div>

      {/* Photorealistic Circular Occupancy Gauge with Tick Marks */}
      <div
        ref={occRef}
        className="relative w-36 h-36 rounded-full flex items-center justify-center my-0.5"
      >
        {/* Progress Arc Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, #64748B 0deg, #F8FAFC ${occDeg}deg, rgba(226,232,240,0.08) ${occDeg}deg 360deg)`,
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
          }}
        />

        {/* Tick Marks Layer */}
        <div
          className="absolute inset-[11px] rounded-full pointer-events-none"
          style={{
            background:
              'repeating-conic-gradient(from -1deg, rgba(226,232,240,0.35) 0deg 1.5deg, transparent 1.5deg 15deg)',
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
          }}
        />

        {/* Center Metallic Depth Dial */}
        <div
          className="w-[102px] h-[102px] rounded-full border border-white/10 flex flex-col items-center justify-center gap-0.5 shadow-2xl"
          style={{
            background:
              'radial-gradient(circle at 40% 30%, #14283A 0%, #0A1420 60%, #05080D 100%)',
            boxShadow:
              '0 0 0 1px rgba(226,232,240,.12), inset 0 2px 6px rgba(0,0,0,.7)',
          }}
        >
          <span className="text-3xl font-extralight font-mono text-white leading-none tracking-tight">
            {occVal}
            <span className="text-sm text-[#63DBCD] ml-0.5">%</span>
          </span>
          <span className="text-[9px] text-[#94A3B8]">დატვირთვა</span>
        </div>
      </div>

      {/* Headcount */}
      <span className="text-[11px] text-[#CBD5E1]">
        დარბაზში ახლა <span className="text-white font-mono font-medium">44</span> ადამიანია
      </span>

      {/* Hourly Forecast Chart */}
      <div className="w-full p-2.5 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.012] border border-white/10 flex flex-col gap-1.5 shadow-inner">
        <div className="flex justify-between items-baseline text-[10px]">
          <span className="text-slate-400">დღის პროგნოზი</span>
          <span className="text-[#63DBCD] font-medium">საუკეთესო · 13:00</span>
        </div>
        <div className="flex items-end gap-1 h-9">
          {[25, 45, 65, 45, 35, 25, 20, 28, 48, 75, 90, 85, 60, 38].map(
            (h, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-sm transition-all duration-500"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    idx === 4
                      ? '#63DBCD'
                      : idx === 5
                      ? '#F8FAFC'
                      : 'rgba(148,163,184,0.3)',
                }}
              />
            )
          )}
        </div>
        <div className="flex justify-between font-mono text-[8.5px] text-[#64748B] pt-0.5">
          <span>07</span>
          <span>12</span>
          <span>17</span>
          <span>22</span>
        </div>
      </div>

      {/* 3 Zones Bars */}
      <div className="w-full flex flex-col gap-1 text-[10px] text-slate-400">
        <div className="grid grid-cols-[62px_1fr_28px] items-center gap-2">
          <span>ძალოვანი</span>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[52%] h-full bg-gradient-to-r from-slate-400 to-white rounded-full" />
          </div>
          <span className="font-mono text-white text-right">52%</span>
        </div>
        <div className="grid grid-cols-[62px_1fr_28px] items-center gap-2">
          <span>კარდიო</span>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[31%] h-full bg-gradient-to-r from-slate-400 to-white rounded-full" />
          </div>
          <span className="font-mono text-white text-right">31%</span>
        </div>
        <div className="grid grid-cols-[62px_1fr_28px] items-center gap-2">
          <span>აუზი</span>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[18%] h-full bg-gradient-to-r from-slate-400 to-white rounded-full" />
          </div>
          <span className="font-mono text-white text-right">18%</span>
        </div>
      </div>
    </div>
  );
};
