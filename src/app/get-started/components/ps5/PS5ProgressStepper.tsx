'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Check } from 'lucide-react';

export interface StepperStep {
  number: number;
  title: string;
  subtitle: string;
}

interface PS5ProgressStepperProps {
  currentStep: number;
  steps: StepperStep[];
  onStepClick?: (step: number) => void;
}

export const PS5ProgressStepper: React.FC<PS5ProgressStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100));

  const handleStepClick = (stepNum: number) => {
    if (stepNum < currentStep && onStepClick) {
      ps5Audio.playNavigate();
      onStepClick(stepNum);
    }
  };

  return (
    <div className="w-full mb-6 select-none" data-testid="ps5-progress-stepper">
      {/* Outer Frosted Glass Chamber */}
      <div className="relative p-2 sm:p-2.5 rounded-2xl bg-[#090E1B]/80 border border-white/[0.1] backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle Cyber Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#00A3FF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Dynamic Glowing Laser Progress Underline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00E5FF]"
            style={{
              boxShadow: '0 0 16px #00E5FF, 0 0 30px #00A3FF',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{
              duration: shouldReduceMotion ? 0.05 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>

        {/* Stepper Items Track */}
        <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.number;
            const isPassed = currentStep > s.number;
            const isClickable = isPassed && !!onStepClick;

            return (
              <React.Fragment key={s.number}>
                {/* Step Pill */}
                <button
                  type="button"
                  onClick={() => handleStepClick(s.number)}
                  disabled={!isClickable && !isActive}
                  className={`flex-1 flex items-center gap-2 sm:gap-3 p-1.5 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 relative group text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00A3FF]/20 via-[#0055FF]/15 to-transparent border border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,163,255,0.2)] cursor-default'
                      : isPassed
                      ? 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.15] cursor-pointer opacity-85 hover:opacity-100'
                      : 'opacity-40 border border-transparent cursor-not-allowed'
                  }`}
                >
                  {/* Step Status Orb */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#00E5FF] to-[#00A3FF] text-black shadow-[0_0_15px_#00E5FF] ring-2 ring-[#00E5FF]/40'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,135,0.2)]'
                        : 'bg-white/[0.04] text-white/40 border border-white/10'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `0${s.number}`}
                  </div>

                  {/* Title & Subtitle Info (Hidden on ultra-small screens, shown on sm+) */}
                  <div className="hidden sm:flex flex-col min-w-0">
                    <span
                      className={`text-[10.5px] font-bold tracking-wider uppercase truncate transition-colors font-mono ${
                        isActive ? 'text-[#00E5FF]' : isPassed ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate font-sans">
                      {s.subtitle}
                    </span>
                  </div>
                </button>

                {/* Cyber Connector between pills */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block w-3 h-[1px] bg-white/10 shrink-0 relative">
                    {isPassed && (
                      <div className="absolute inset-0 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
