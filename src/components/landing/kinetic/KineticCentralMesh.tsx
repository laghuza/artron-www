'use client';

import React, { useMemo } from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';

interface KineticCentralMeshProps {
  meshScale: MotionValue<number>;
  meshOpacity: MotionValue<number>;
  meshRotate: MotionValue<number>;
}

// 8 Perimeter Quantum Nodes mapped along the Diamond Geometry
// Coordinates inside 400x400 viewBox with Center Core at (200, 200)
const MATRIX_NODES = [
  { id: 1, name: 'IoT_GATEWAY', code: '01', x: 200, y: 30, color: '#00D2FF' },
  { id: 2, name: 'DUAL_SYNC', code: '02', x: 285, y: 115, color: '#00A3FF' },
  { id: 3, name: 'BIOMETRIC_PASS', code: '03', x: 370, y: 200, color: '#00E676' },
  { id: 4, name: 'AES_256_GCM', code: '04', x: 285, y: 285, color: '#00A3FF' },
  { id: 5, name: 'CLOUD_ERP', code: '05', x: 200, y: 370, color: '#00D2FF' },
  { id: 6, name: 'TURNSTILE_RELAY', code: '06', x: 115, y: 285, color: '#00E676' },
  { id: 7, name: 'AI_TELEMETRY', code: '07', x: 30, y: 200, color: '#00A3FF' },
  { id: 8, name: 'SOCKET_STREAM', code: '08', x: 115, y: 115, color: '#00D2FF' },
];

export const KineticCentralMesh: React.FC<KineticCentralMeshProps> = ({
  meshScale,
  meshOpacity,
  meshRotate,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const nodes = useMemo(() => MATRIX_NODES, []);

  return (
    <motion.div
      suppressHydrationWarning
      style={{
        scale: shouldReduceMotion ? 1 : meshScale,
        opacity: shouldReduceMotion ? 0.85 : meshOpacity,
        rotate: shouldReduceMotion ? 0 : meshRotate,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 gpu-accelerated max-w-full overflow-hidden"
    >
      <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] will-change-transform">
        
        {/* ── Background Ambient Cyber Glow ── */}
        <div className="absolute inset-10 sm:inset-14 rounded-full bg-radial from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl" />
        <div className="absolute inset-24 sm:inset-32 rounded-full bg-radial from-emerald-400/25 via-transparent to-transparent blur-2xl animate-pulse" />

        {/* ── Subtle Holographic Orbit Rings ── */}
        <div
          className={`absolute inset-6 sm:inset-8 rounded-full border border-cyan-500/10 border-dashed ${
            shouldReduceMotion ? '' : 'animate-[spin_70s_linear_infinite]'
          }`}
        />
        <div
          className={`absolute inset-14 sm:inset-18 rounded-full border border-emerald-500/15 ${
            shouldReduceMotion ? '' : 'animate-[spin_45s_linear_infinite_reverse]'
          }`}
        />

        {/* ── SVG Kinetic Mesh (Points & Moving Impulses Only) ── */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full overflow-visible select-none pointer-events-none drop-shadow-[0_0_30px_rgba(0,230,118,0.35)]"
        >
          <defs>
            {/* Neon Glow Filter for Core and Impulses */}
            <filter id="neonPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Emerald Core Radial Gradient */}
            <radialGradient id="emeraldCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#00FF87" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#00E676" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── 1. Dynamic Moving Light Impulses Between Nodes (No static lines) ── */}
          {!shouldReduceMotion && (
            <g filter="url(#neonPulseGlow)">
              {/* Radial Impulses: Center Emerald Core (200,200) <-> Perimeter Nodes */}
              {nodes.map((n, i) => (
                <g key={`radial-pulse-${n.id}`}>
                  {/* Outward Impulse: Core -> Node */}
                  <circle r="2.8" fill="#00FF87">
                    <animate
                      attributeName="cx"
                      from="200"
                      to={n.x}
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from="200"
                      to={n.y}
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.2;0.8;1"
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Return Impulse: Node -> Core */}
                  <circle r="2.2" fill="#00D2FF">
                    <animate
                      attributeName="cx"
                      from={n.x}
                      to="200"
                      dur={`${1.6 + ((i + 2) % 3) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from={n.y}
                      to="200"
                      dur={`${1.6 + ((i + 2) % 3) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.9;0.9;0"
                      keyTimes="0;0.15;0.85;1"
                      dur={`${1.6 + ((i + 2) % 3) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Micro Trail Glow Particle */}
                  <circle r="1.4" fill="#FFFFFF">
                    <animate
                      attributeName="cx"
                      from="200"
                      to={n.x}
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      begin="0.08s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from="200"
                      to={n.y}
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      begin="0.08s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.7;0.7;0"
                      keyTimes="0;0.2;0.8;1"
                      dur={`${1.2 + (i % 4) * 0.25}s`}
                      begin="0.08s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}

              {/* Perimeter Impulses: Moving along perimeter between adjacent nodes */}
              {nodes.map((n, i) => {
                const nextNode = nodes[(i + 1) % nodes.length];
                return (
                  <circle key={`perimeter-pulse-${n.id}`} r="2" fill="#00FF87">
                    <animate
                      attributeName="cx"
                      from={n.x}
                      to={nextNode.x}
                      dur={`${2.2 + (i % 2) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from={n.y}
                      to={nextNode.y}
                      dur={`${2.2 + (i % 2) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.85;0.85;0"
                      keyTimes="0;0.2;0.8;1"
                      dur={`${2.2 + (i % 2) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          )}

          {/* ── 2. The 8 Perimeter Quantum Nodes ── */}
          {nodes.map((n) => (
            <g key={`node-${n.id}`} transform={`translate(${n.x}, ${n.y})`}>
              {/* Outer Pulsing Aura Ring */}
              <circle
                r="14"
                fill={n.color}
                fillOpacity="0.08"
                className={shouldReduceMotion ? '' : 'animate-pulse'}
              />
              <circle
                r="8"
                fill="none"
                stroke={n.color}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              {/* Dark Core Disc */}
              <circle
                r="5"
                fill="#0B0E14"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                filter="drop-shadow(0 0 6px rgba(0,210,255,0.7))"
              />
              {/* Micro LED Beacon */}
              <circle r="2" fill={n.color} />
            </g>
          ))}

          {/* ── 3. Central Monumental Emerald Neon Point Glow (Center Core 200,200) ── */}
          <g transform="translate(200, 200)">
            {/* Outer Giant Emerald Aura */}
            <circle
              r="34"
              fill="url(#emeraldCoreGrad)"
              className={shouldReduceMotion ? '' : 'animate-pulse'}
            />

            {/* Neon Shockwave Expanding Ring 1 */}
            <circle
              r="22"
              fill="none"
              stroke="#00E676"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="4 3"
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="20s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Neon Shockwave Ring 2 */}
            <circle
              r="14"
              fill="none"
              stroke="#00FF87"
              strokeWidth="1.4"
              strokeOpacity="0.7"
              filter="url(#neonPulseGlow)"
            />

            {/* Radiant Dark Crystal Base */}
            <circle
              r="8"
              fill="#06120D"
              stroke="#00FF87"
              strokeWidth="1.8"
              filter="drop-shadow(0 0 12px rgba(0,255,135,0.9))"
            />

            {/* Intense Emerald Glowing Center Point */}
            <circle
              r="4.5"
              fill="#00FF87"
              filter="drop-shadow(0 0 8px #00FF87)"
            />

            {/* Pure White Hotspot Core */}
            <circle
              r="2"
              fill="#FFFFFF"
              filter="drop-shadow(0 0 4px #FFFFFF)"
            />
          </g>
        </svg>

        {/* ── 4. Sci-Fi HUD Badges & Orbital Metadata ── */}
        {/* Top North Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 sm:-translate-y-2 px-2.5 py-0.5 rounded-full bg-[#0B0E14]/90 border border-cyan-500/40 font-mono text-[8px] sm:text-[9.5px] text-cyan-300 shadow-[0_0_15px_rgba(0,163,255,0.3)] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>9-NODE MATRIX // ONLINE</span>
        </div>

        {/* Bottom South Badge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 sm:translate-y-2 px-2.5 py-0.5 rounded-full bg-[#0B0E14]/90 border border-emerald-500/40 font-mono text-[8px] sm:text-[9.5px] text-emerald-300 shadow-[0_0_15px_rgba(0,230,118,0.3)] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
          <span>AES-256 GCM // SYNC 0ms</span>
        </div>

        {/* Left West Indicator */}
        <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/30 font-mono text-[8px] text-cyan-400 whitespace-nowrap">
          LATENCY 0ms
        </div>

        {/* Right East Indicator */}
        <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/30 font-mono text-[8px] text-emerald-400 whitespace-nowrap">
          TCP 60 FPS
        </div>

      </div>
    </motion.div>
  );
};

