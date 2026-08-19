'use client';

import React from 'react';

interface PS5ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
  steps: Array<{
    number: number;
    title: string;
    subtitle: string;
  }>;
  onStepClick?: (step: number) => void;
}

export const PS5ProgressStepper: React.FC<PS5ProgressStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Capsule Container with Frosted Glass */}
      <div className="relative p-2 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 overflow-hidden">
        {/* Subtle glowing bar indicator */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00A3FF] via-[#00E5FF] to-transparent transition-all duration-700 ease-out"
          style={{
            width: `${((currentStep) / steps.length) * 100}%`,
            boxShadow: '0 0 12px #00A3FF'
          }}
        />

        {steps.map((s, idx) => {
          const isActive = currentStep === s.number;
          const isPassed = currentStep > s.number;
          const isClickable = isPassed && onStepClick;

          return (
            <React.Fragment key={s.number}>
              {/* Step Item */}
              <div
                onClick={() => isClickable && onStepClick(s.number)}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00A3FF]/15 to-transparent border border-[#00A3FF]/30 shadow-[0_0_20px_rgba(0,163,255,0.15)]'
                    : isPassed
                    ? 'opacity-80 hover:opacity-100 cursor-pointer'
                    : 'opacity-40'
                }`}
              >
                {/* Number Orb */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-500 shrink-0 ${
                    isActive
                      ? 'bg-[#00A3FF] text-black shadow-[0_0_15px_#00A3FF] ring-2 ring-[#00A3FF]/40'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/5 text-white/50 border border-white/10'
                  }`}
                >
                  {isPassed ? '✓' : s.number}
                </div>

                {/* Text Labels (Hidden on extra small mobile, shown on sm+) */}
                <div className="hidden sm:flex flex-col text-left">
                  <span className={`text-[11px] font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#00E5FF]' : isPassed ? 'text-white' : 'text-white/40'
                  }`}>
                    {s.title}
                  </span>
                  <span className="text-[9.5px] text-slate-400 font-medium line-clamp-1">
                    {s.subtitle}
                  </span>
                </div>
              </div>

              {/* Connector between steps */}
              {idx < steps.length - 1 && (
                <div className="hidden sm:block w-6 h-[1px] bg-white/10 shrink-0 relative">
                  {isPassed && (
                    <div className="absolute inset-0 bg-[#00A3FF] shadow-[0_0_6px_#00A3FF]" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
