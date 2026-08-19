'use client';

import React from 'react';

export const PS5AuroraBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#050811] overflow-hidden text-white flex flex-col justify-between">
      {/* Dynamic Cosmic Aurora Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Center Electric Cyan Aurora */}
        <div 
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-25 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #00A3FF 0%, #0055FF 50%, transparent 80%)',
            animationDuration: '8s'
          }}
        />

        {/* Left Bottom Indigo Nebula */}
        <div 
          className="absolute bottom-[-10%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #4F46E5 0%, #1E1B4B 60%, transparent 80%)',
          }}
        />

        {/* Right Fluid Violet / Cyan Ribbon */}
        <div 
          className="absolute top-[30%] -right-[15%] w-[800px] h-[800px] rounded-full blur-[180px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, #3B82F6 40%, transparent 75%)',
          }}
        />

        {/* Ambient Subtle Grid Mesh with Mask */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_60%,transparent_100%)]"
        />

        {/* Floating Stardust Dots (Subtle PS5 Ambient Light Dust) */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#00A3FF] blur-[1px] opacity-40 animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-cyan-300 blur-[0.5px] opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-blue-400 blur-[2px] opacity-25" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};
