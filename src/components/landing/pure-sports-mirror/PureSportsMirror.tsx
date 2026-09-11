'use client';

import React from 'react';
import { MirrorUnifiedCockpit } from './MirrorUnifiedCockpit';

export const PureSportsMirror: React.FC = () => {
  return (
    <section
      id="pure-sports-mirror"
      aria-labelledby="mirror-heading"
      className="relative w-full py-10 sm:py-16 bg-[#080B10] text-[#F8FAFC] overflow-hidden select-none"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00A3FF]/10 via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* 1. Header & Systemic Mirror Badge */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Glassmorphism Pre-Badge with Pulse */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00A3FF]/30 shadow-[0_0_20px_rgba(0,163,255,0.15)] mb-5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider text-[#00E5FF] uppercase">
              [SYSTEMIC MIRROR] • სპორტული ეკოსისტემის ანატომია
            </span>
          </div>

          {/* Monumental Headline */}
          <h2
            id="mirror-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]"
          >
            დაინახეთ თქვენი სპორტული სამყარო{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] via-[#00E5FF] to-white">
              ერთიან სისტემურ სარკეში.
            </span>
          </h2>

          {/* Subhead */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            თქვენი ინფრასტრუქტურა. თქვენი პროფესიონალები. თქვენი ათლეტების უმაღლესი მწვერვალები.
          </p>
        </div>

        {/* 2. Unified Master Presentation Window */}
        <MirrorUnifiedCockpit />
      </div>
    </section>
  );
};
