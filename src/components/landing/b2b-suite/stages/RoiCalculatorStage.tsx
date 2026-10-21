'use client';

import React from 'react';

interface RoiCalculatorStageProps {
  visits: number;
  mins: number;
  rate: number;
  onVisitsChange: (v: number) => void;
  onMinsChange: (v: number) => void;
  onRateChange: (v: number) => void;
}

export const RoiCalculatorStage: React.FC<RoiCalculatorStageProps> = ({
  visits,
  mins,
  rate,
  onVisitsChange,
  onMinsChange,
  onRateChange,
}) => {
  const H = (visits * mins * 30) / 60;
  const Ha = (visits * 0.04 * 30) / 3600;
  const artronWidth = Math.max(1, (Ha / H) * 100).toFixed(2);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 3 Interactive Sliders */}
      <div className="flex flex-col gap-4">
        {/* Slider 1: Visits */}
        <label className="flex flex-col gap-1.5 cursor-pointer">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A9B9CA]">ვიზიტი დღეში</span>
            <span className="font-mono text-[#F0F9FF] font-semibold">{visits}</span>
          </div>
          <input
            type="range"
            min={50}
            max={1000}
            step={10}
            value={visits}
            onChange={(e) => onVisitsChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-[#BAE6FD]/15 accent-[#10B981] cursor-pointer"
          />
        </label>

        {/* Slider 2: Manual Registration Time */}
        <label className="flex flex-col gap-1.5 cursor-pointer">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A9B9CA]">ხელით რეგისტრაცია / ვიზიტი</span>
            <span className="font-mono text-[#F0F9FF] font-semibold">{mins.toFixed(2)} წთ</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.05}
            value={mins}
            onChange={(e) => onMinsChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-[#BAE6FD]/15 accent-[#10B981] cursor-pointer"
          />
        </label>

        {/* Slider 3: Admin Hourly Rate */}
        <label className="flex flex-col gap-1.5 cursor-pointer">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A9B9CA]">ადმინისტრატორის განაკვეთი</span>
            <span className="font-mono text-[#F0F9FF] font-semibold">₾ {rate} / სთ</span>
          </div>
          <input
            type="range"
            min={6}
            max={40}
            step={1}
            value={rate}
            onChange={(e) => onRateChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-[#BAE6FD]/15 accent-[#10B981] cursor-pointer"
          />
        </label>
      </div>

      {/* Comparison Bars */}
      <div className="flex flex-col gap-3 pt-3 border-t border-[#BAE6FD]/10">
        {/* Manual Bar */}
        <div className="grid grid-cols-12 items-center gap-3 text-xs">
          <span className="col-span-3 text-[#A9B9CA]">ხელით</span>
          <div className="col-span-6 h-5 rounded-md bg-[#BAE6FD]/5 overflow-hidden">
            <div className="h-full w-full rounded-md bg-gradient-to-r from-[#F59E0B]/60 to-[#F59E0B]" />
          </div>
          <span className="col-span-3 font-mono text-[#F0F9FF] text-right font-medium">
            {H.toFixed(1)} სთ
          </span>
        </div>

        {/* ARTRON Bar */}
        <div className="grid grid-cols-12 items-center gap-3 text-xs">
          <span className="col-span-3 text-[#10B981] font-semibold">ARTRON</span>
          <div className="col-span-6 h-5 rounded-md bg-[#BAE6FD]/5 overflow-hidden">
            <div
              className="h-full rounded-md bg-[#10B981] shadow-[0_0_10px_#10B981] transition-all duration-300"
              style={{ width: `${artronWidth}%` }}
            />
          </div>
          <span className="col-span-3 font-mono text-[#10B981] text-right font-semibold">
            {Ha.toFixed(2)} სთ
          </span>
        </div>
      </div>
    </div>
  );
};
