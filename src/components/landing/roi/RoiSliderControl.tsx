'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RoiSliderControlProps {
  id: string;
  icon: LucideIcon;
  label: string;
  valueText: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  accentColor?: string;
}

export const RoiSliderControl: React.FC<RoiSliderControlProps> = ({
  id,
  icon: Icon,
  label,
  valueText,
  min,
  max,
  step,
  value,
  onChange,
  accentColor = '#00A3FF'
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#0F141C] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Icon className="w-4 h-4" />
          </div>
          <label htmlFor={id} className="text-xs sm:text-sm font-semibold text-slate-300">
            {label}
          </label>
        </div>
        <span className="text-base sm:text-lg font-mono font-bold text-white bg-white/5 px-3 py-0.5 rounded-lg border border-white/5">
          {valueText}
        </span>
      </div>

      {/* Slider Input */}
      <div className="relative pt-2">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00A3FF]"
          style={{ accentColor }}
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
