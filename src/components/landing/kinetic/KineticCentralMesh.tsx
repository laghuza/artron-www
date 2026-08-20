'use client';

import React from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';

interface KineticCentralMeshProps {
  meshScale: MotionValue<number>;
  meshOpacity: MotionValue<number>;
  meshRotate: MotionValue<number>;
}

export const KineticCentralMesh: React.FC<KineticCentralMeshProps> = ({
  meshScale,
  meshOpacity,
  meshRotate
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      style={{ 
        scale: shouldReduceMotion ? 1 : meshScale, 
        opacity: shouldReduceMotion ? 0.8 : meshOpacity, 
        rotate: shouldReduceMotion ? 0 : meshRotate 
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 gpu-accelerated max-w-full overflow-hidden"
    >
      <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] will-change-transform">
        {/* Outer Pulsing Cyber Ring */}
        <div className={`absolute inset-0 rounded-full border border-cyan-500/20 ${shouldReduceMotion ? '' : 'animate-[spin_60s_linear_infinite]'}`} />
        
        {/* Middle Dashed Telemetry Ring */}
        <div className={`absolute inset-6 sm:inset-8 rounded-full border border-dashed border-cyan-400/25 ${shouldReduceMotion ? '' : 'animate-[spin_40s_linear_infinite_reverse]'}`} />
        
        {/* Inner Radial Glow */}
        <div className="absolute inset-12 sm:inset-16 rounded-full bg-radial from-cyan-500/15 via-cyan-900/5 to-transparent blur-2xl" />

        {/* Studio Geometric Crosshairs */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

        {/* Central Core Hexagon/Shield Shape */}
        <div className="absolute inset-[32%] sm:inset-[35%] rounded-2xl bg-[#0F141C] border border-cyan-400/40 shadow-[0_0_50px_rgba(0,163,255,0.2)] flex items-center justify-center backdrop-blur-md">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center shadow-[0_0_20px_#00A3FF]">
            <span className="text-white font-black text-lg sm:text-xl tracking-tighter">A</span>
          </div>
        </div>

        {/* Orbiting Satellite Node 1 */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/70 border border-cyan-500/30 font-mono text-[8.5px] sm:text-[9px] text-cyan-300 whitespace-nowrap">
          AES-256 GCM
        </div>

        {/* Orbiting Satellite Node 2 */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/70 border border-emerald-500/30 font-mono text-[8.5px] sm:text-[9px] text-emerald-300 whitespace-nowrap">
          TCP SOCKET 0ms
        </div>
      </div>
    </motion.div>
  );
};
