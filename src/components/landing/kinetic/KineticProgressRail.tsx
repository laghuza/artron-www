'use client';

import React from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';

interface KineticProgressRailProps {
  scrollYProgress: MotionValue<number>;
  activeStep: number;
}

export const KineticProgressRail: React.FC<KineticProgressRailProps> = ({
  scrollYProgress,
  activeStep
}) => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { num: '01', title: 'INITIALIZE' },
    { num: '02', title: 'CORE MATRIX' },
    { num: '03', title: 'SYSTEM PILLARS' },
    { num: '04', title: 'OPERATIONAL' },
  ];

  return (
    <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-6 pointer-events-none gpu-accelerated">
      {/* Step Indicators */}
      <div className="flex flex-col items-end gap-3 font-mono">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx + 1;
          return (
            <div key={step.num} className="flex items-center gap-3">
              <span className={`text-[10px] tracking-widest transition-colors duration-300 ${
                isActive ? 'text-[#00A3FF] font-bold' : 'text-slate-600'
              }`}>
                {step.num} // {step.title}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#00A3FF] scale-125 shadow-[0_0_8px_#00A3FF]' 
                  : 'bg-white/10'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Progress Track Line */}
      <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden rounded-full">
        <motion.div 
          style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress, originY: 0 }}
          className="absolute inset-0 bg-[#00A3FF] shadow-[0_0_10px_#00A3FF] will-change-transform"
        />
      </div>

      {/* Live Node Telemetry Ping */}
      <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5 backdrop-blur-sm">
        <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${shouldReduceMotion ? '' : 'animate-ping'}`} />
        <span className="text-[9px] font-mono text-emerald-400">EDGE_ONLINE // 24ms</span>
      </div>
    </div>
  );
};
