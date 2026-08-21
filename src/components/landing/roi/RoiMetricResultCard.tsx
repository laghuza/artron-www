'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

interface RoiMetricResultCardProps {
  icon: LucideIcon;
  code: string;
  label: string;
  value?: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  subtext: string;
  accent: string;
  growthAmplitude?: string;
}

export const RoiMetricResultCard: React.FC<RoiMetricResultCardProps> = ({
  icon: Icon,
  code,
  label,
  value,
  numericValue,
  prefix = '',
  suffix = '',
  subtext,
  accent,
  growthAmplitude,
}) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#0F141C] border border-white/[0.08] relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
      {/* Top Meta Line */}
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
        <span className="text-slate-500">{code}</span>
        <div className="flex items-center gap-1.5">
          {growthAmplitude && (
            <span
              className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono tracking-wider border"
              style={{
                backgroundColor: `${accent}15`,
                borderColor: `${accent}30`,
                color: accent,
              }}
            >
              {growthAmplitude}
            </span>
          )}
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      </div>

      {/* Icon & Label */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center border"
          style={{
            backgroundColor: `${accent}15`,
            borderColor: `${accent}30`,
            color: accent,
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs sm:text-sm text-slate-300 font-medium">{label}</span>
      </div>

      {/* Main Calculated Value with Animated CountUp */}
      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mb-2 flex items-baseline gap-1">
        {numericValue !== undefined ? (
          <AnimatedNumber
            value={numericValue}
            prefix={prefix}
            suffix={suffix}
            duration={500}
            className="text-white"
          />
        ) : (
          <span>{value}</span>
        )}
      </div>

      {/* Subtext */}
      <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
        {subtext}
      </p>
    </div>
  );
};
