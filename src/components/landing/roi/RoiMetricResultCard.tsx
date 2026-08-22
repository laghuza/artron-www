import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

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
    <TiltSpotlightCard maxTilt={6} spotlightColor={`${accent}25`} className="h-full">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 h-full flex flex-col justify-between">
        {/* L-Shape Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30" />

        <div>
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
              <div className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]" style={{ backgroundColor: accent, color: accent }} />
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
        </div>

        {/* Subtext */}
        <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
          {subtext}
        </p>
      </div>
    </TiltSpotlightCard>
  );
};

