'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TelemetryNode {
  id: string;
  label: string;
  code: string;
  topPercent: number; // 0 to 100%
  color: string;
  side: 'left' | 'right' | 'center';
}

const TELEMETRY_NODES: TelemetryNode[] = [
  { id: 'node-hero', label: 'CORE_ENTRY', code: '01 // HERO', topPercent: 4, color: '#00A3FF', side: 'left' },
  { id: 'node-dual', label: 'DUAL_SYNC', code: '02 // DUAL_CORE', topPercent: 18, color: '#00D2FF', side: 'right' },
  { id: 'node-services', label: 'IoT_GATEWAY', code: '03 // SERVICES', topPercent: 36, color: '#10B981', side: 'left' },
  { id: 'node-analytics', label: 'AI_TELEMETRY', code: '04 // ANALYTICS', topPercent: 54, color: '#00A3FF', side: 'right' },
  { id: 'node-roi', label: 'FIN_MATRIX', code: '05 // ROI_ENGINE', topPercent: 72, color: '#00D2FF', side: 'left' },
  { id: 'node-booking', label: 'TERMINAL_GATE', code: '06 // BOOKING', topPercent: 90, color: '#10B981', side: 'right' },
];

export const LaserDataStreamConnectors: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Direct hardware-accelerated scroll transforms (zero spring latency / zero modulo overhead)
  const packetY1 = useTransform(scrollYProgress, [0, 1], ['2%', '98%']);
  const packetY2 = useTransform(scrollYProgress, [0, 1], ['15%', '95%']);
  const packetY3 = useTransform(scrollYProgress, [0, 1], ['50%', '98%']);

  // Left & Right conduit path dash-array transformations
  const laserGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.65, 0.45]);

  const nodes = useMemo(() => TELEMETRY_NODES, []);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* ── Left Neon Laser Conduit (Primary Stream) ── */}
      <div className="absolute left-4 sm:left-8 lg:left-14 top-0 bottom-0 w-8">
        {/* Core Laser Hairline */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00A3FF]/10 via-[#00A3FF]/30 to-[#10B981]/20" />
        
        {/* Ambient Laser Glow Tube */}
        <motion.div
          style={{ opacity: laserGlowOpacity }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#0066FF]/20 via-[#00A3FF]/40 to-[#00D2FF]/20 blur-[1px] will-change-opacity"
        />

        {/* Dynamic Flowing Data Packet A (GPU Accelerated) */}
        <motion.div
          style={{ top: packetY1 }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-6 rounded-full bg-gradient-to-b from-[#00D2FF] via-[#00A3FF] to-transparent shadow-[0_0_8px_#00A3FF] will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#FFFFFF]" />
        </motion.div>

        {/* Dynamic Flowing Data Packet B (Offset) */}
        <motion.div
          style={{ top: packetY3 }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-4 rounded-full bg-[#10B981] opacity-75 shadow-[0_0_6px_#10B981] will-change-transform"
        />
      </div>

      {/* ── Right Neon Laser Conduit (Secondary Stream) ── */}
      <div className="absolute right-4 sm:right-8 lg:right-14 top-0 bottom-0 w-8 hidden md:block">
        {/* Core Laser Hairline */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00D2FF]/20 via-[#00A3FF]/30 to-[#10B981]/20" />
        
        {/* Ambient Glow */}
        <motion.div
          style={{ opacity: laserGlowOpacity }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00D2FF]/20 via-[#00A3FF]/40 to-[#10B981]/30 blur-[1px] will-change-opacity"
        />

        {/* Dynamic Flowing Data Packet C */}
        <motion.div
          style={{ top: packetY2 }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-6 rounded-full bg-gradient-to-b from-[#00FF87] via-[#10B981] to-transparent shadow-[0_0_8px_#10B981] will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#FFFFFF]" />
        </motion.div>
      </div>

      {/* ── Connecting Diagonal Laser Wave Bridges (Between Sections - Crisp & GPU Optimized) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 lg:opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="laserGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Diagonal Conduits crossing at proportional heights */}
        <line
          x1="5%"
          y1="8%"
          x2="95%"
          y2="22%"
          stroke="url(#laserGradCyan)"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          className="animate-[laser-pulse-flow_35s_linear_infinite]"
        />
        <line
          x1="95%"
          y1="26%"
          x2="5%"
          y2="42%"
          stroke="url(#laserGradCyan)"
          strokeWidth="1.2"
          strokeDasharray="8 14"
          className="animate-[laser-pulse-flow_45s_linear_infinite_reverse]"
        />
        <line
          x1="5%"
          y1="46%"
          x2="95%"
          y2="60%"
          stroke="url(#laserGradCyan)"
          strokeWidth="1.2"
          strokeDasharray="6 10"
          className="animate-[laser-pulse-flow_38s_linear_infinite]"
        />
        <line
          x1="95%"
          y1="64%"
          x2="5%"
          y2="78%"
          stroke="url(#laserGradCyan)"
          strokeWidth="1.2"
          strokeDasharray="10 16"
          className="animate-[laser-pulse-flow_40s_linear_infinite_reverse]"
        />
        <line
          x1="5%"
          y1="82%"
          x2="95%"
          y2="94%"
          stroke="url(#laserGradCyan)"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          className="animate-[laser-pulse-flow_30s_linear_infinite]"
        />
      </svg>

      {/* ── Telemetry Node Hubs Along the Spine ── */}
      {nodes.map((node) => {
        const isLeft = node.side === 'left';
        return (
          <div
            key={node.id}
            style={{ top: `${node.topPercent}%` }}
            className={`absolute flex items-center gap-2.5 z-10 transition-transform duration-300 ${
              isLeft
                ? 'left-2.5 sm:left-6 lg:left-12'
                : 'right-2.5 sm:right-6 lg:right-12 flex-row-reverse'
            }`}
          >
            {/* Pulsing Beacon Hub */}
            <div className="relative flex items-center justify-center w-5 h-5">
              {/* Outer Subtle Aura */}
              <div
                className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                style={{ backgroundColor: node.color }}
              />
              {/* Mid Glow Beacon */}
              <div
                className="absolute w-3.5 h-3.5 rounded-full opacity-50"
                style={{ backgroundColor: node.color }}
              />
              {/* Inner Diamond Core */}
              <div
                className="relative w-2 h-2 rounded-[2px] rotate-45 shadow-[0_0_6px_#00A3FF]"
                style={{ backgroundColor: node.color }}
              />
            </div>

            {/* Micro Cyber Telemetry Tag (Desktop Only) */}
            <div
              className={`hidden xl:flex flex-col text-[9px] font-mono tracking-wider px-2 py-0.5 rounded border border-white/5 bg-[#080B10]/80 backdrop-blur-sm shadow-sm ${
                isLeft ? 'text-left' : 'text-right'
              }`}
            >
              <span className="text-white/60 font-semibold">{node.code}</span>
              <span style={{ color: node.color }} className="text-[8px] opacity-80 uppercase tracking-widest">
                {node.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaserDataStreamConnectors;
