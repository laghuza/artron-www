'use client';

import React from 'react';

export const PS5AuroraBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#03060E] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#00A3FF]/30 selection:text-[#00E5FF]">
      {/* PS5 Cinematic Cosmic Aurora & Light Waves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-Center Electric Cyan Aurora */}
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] rounded-full blur-[150px] opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #00A3FF 0%, #0044EE 45%, transparent 75%)',
            animationDuration: '9s',
          }}
        />

        {/* Left Bottom Deep Indigo Ribbon */}
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[850px] h-[850px] rounded-full blur-[170px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, #1E1B4B 60%, transparent 80%)',
          }}
        />

        {/* Right Fluid Violet / Cyan Nebula */}
        <div
          className="absolute top-[25%] -right-[15%] w-[800px] h-[800px] rounded-full blur-[180px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #00E5FF 0%, #4F46E5 40%, transparent 75%)',
          }}
        />

        {/* Ambient Subtle Cyber Grid Mesh with Mask */}
        <div
          className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_40%,#000_60%,transparent_100%)]"
        />

        {/* Floating PS5 Geometric Glyphs (▲ ✖ ◼ ●) */}
        <div className="absolute top-[18%] left-[8%] text-white/[0.04] text-7xl font-mono select-none">
          ▲
        </div>
        <div className="absolute top-[65%] left-[5%] text-white/[0.03] text-8xl font-mono select-none">
          ◼
        </div>
        <div className="absolute top-[22%] right-[7%] text-white/[0.04] text-8xl font-mono select-none">
          ●
        </div>
        <div className="absolute bottom-[15%] right-[9%] text-white/[0.03] text-7xl font-mono select-none">
          ✕
        </div>

        {/* Floating Stardust Dots (Subtle PS5 Ambient Light Dust) */}
        <div
          className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#00E5FF] blur-[1px] opacity-50 animate-ping"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-cyan-300 blur-[0.5px] opacity-40 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-blue-400 blur-[2px] opacity-30" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
