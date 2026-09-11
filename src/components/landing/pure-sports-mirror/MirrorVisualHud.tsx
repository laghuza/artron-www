'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HotspotItem, MasterDimensionId } from './mirrorDataMatrix';

interface MirrorVisualHudProps {
  dimensionId: MasterDimensionId;
  hotspots: HotspotItem[];
  playTactileClick: () => void;
}

export const MirrorVisualHud: React.FC<MirrorVisualHudProps> = ({
  dimensionId,
  hotspots,
  playTactileClick,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(hotspots[0]?.id || null);

  const handleHotspotToggle = (id: string) => {
    playTactileClick();
    setActiveHotspotId((prev) => (prev === id ? null : id));
  };

  const activeSpot = hotspots.find((h) => h.id === activeHotspotId);

  return (
    <div
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
      style={{
        background: 'rgba(8, 12, 20, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 163, 255, 0.18)',
        boxShadow: '0 16px 50px rgba(0,0,0,0.7), 0 0 25px rgba(0,163,255,0.08)',
      }}
    >
      {/* HUD Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            VECTOR HUD • {dimensionId.toUpperCase()} ARCHITECTURE
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
          <span className="hidden sm:inline">60 FPS REALTIME</span>
          <span
            className="px-2 py-0.5 rounded text-slate-300"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            ARTRON OS
          </span>
        </div>
      </div>

      {/* 2.5D Isometric SVG Blueprint (pointer-events-none) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
        style={{
          opacity: 0.85,
          transform: 'perspective(900px) rotateX(8deg) rotateY(-4deg)',
          filter: 'drop-shadow(0 16px 32px rgba(0,163,255,0.18))',
        }}
      >
        {dimensionId === 'venues' && <VenuesSvgBlueprint />}
        {dimensionId === 'workforce' && <WorkforceSvgBlueprint />}
        {dimensionId === 'mastery' && <MasterySvgBlueprint />}
      </div>

      {/* Ambient Micro-Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,229,255,0.9) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* SVG Ray Connector (active hotspot → tooltip) */}
      {activeSpot && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.line
            x1={`${activeSpot.x}%`}
            y1={`${activeSpot.y}%`}
            x2={activeSpot.x > 50 ? '15%' : '85%'}
            y2="12%"
            stroke="url(#rayGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          {/* Ray endpoint dot */}
          <motion.circle
            cx={activeSpot.x > 50 ? '15%' : '85%'}
            cy="12%"
            r="3"
            fill="#00E5FF"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.2 }}
            style={{ filter: 'drop-shadow(0 0 4px #00E5FF)' }}
          />
        </svg>
      )}

      {/* Interactive Hotspot Pins with 3-Ring Radar Ping */}
      <div className="relative z-20 w-full h-full">
        {hotspots.map((spot) => {
          const isActive = activeHotspotId === spot.id;
          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              {/* Radar Ping — 3 concentric rings */}
              {isActive && (
                <>
                  <RadarRing delay={0} />
                  <RadarRing delay={0.4} />
                  <RadarRing delay={0.8} />
                </>
              )}

              {/* Hotspot Button */}
              <button
                type="button"
                onClick={() => handleHotspotToggle(spot.id)}
                aria-expanded={isActive}
                aria-label={`Hotspot: ${spot.label}`}
                className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00A3FF]/30 scale-125'
                      : 'bg-white/8 group-hover:bg-[#00A3FF]/20'
                  }`}
                />
                {/* Core Dot */}
                <span
                  className="relative w-4 h-4 rounded-full bg-[#00E5FF] border-2 border-[#090D14]"
                  style={{
                    boxShadow: isActive
                      ? '0 0 18px #00E5FF, 0 0 6px #00E5FF'
                      : '0 0 8px rgba(0,229,255,0.6)',
                  }}
                />
                <span className="sr-only">{spot.label}</span>
              </button>

              {/* Tooltip Card */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.94 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 p-3.5 rounded-2xl text-left"
                    style={{
                      background: 'rgba(10, 14, 24, 0.95)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      boxShadow:
                        '0 12px 40px rgba(0,0,0,0.8), 0 0 20px rgba(0,163,255,0.2)',
                    }}
                  >
                    {/* Top edge glow */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent rounded-t-2xl" />

                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-white tracking-wide">
                        ● {spot.label}
                      </span>
                      <span
                        className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded text-[#00E5FF]"
                        style={{ background: 'rgba(0,163,255,0.15)', border: '1px solid rgba(0,163,255,0.3)' }}
                      >
                        {spot.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {spot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* HUD Bottom Telemetry Hint */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
          დააჭირეთ წერტილებს (Hotspots) სტანდარტების სანახავად
        </span>
        <span className="text-slate-500">SYSTEMIC BLUEPRINT</span>
      </div>
    </div>
  );
};

// ── 3-Ring Radar Ping Component ──────────────────────────────────────
function RadarRing({ delay }: { delay: number }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        width: 48,
        height: 48,
        border: '1.5px solid rgba(0,229,255,0.7)',
      }}
      initial={{ scale: 0.6, opacity: 0.7 }}
      animate={{ scale: 2.8, opacity: 0 }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

// ── Lightweight SVG Blueprints ───────────────────────────────────────
function VenuesSvgBlueprint() {
  return (
    <svg className="w-full h-full max-w-[520px] max-h-[300px]" viewBox="0 0 600 340" fill="none">
      {/* Stadium outer */}
      <rect x="50" y="30" width="500" height="280" rx="20" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" />
      {/* Inner track */}
      <rect x="90" y="60" width="420" height="220" rx="14" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.25" />
      {/* Center line */}
      <line x1="300" y1="60" x2="300" y2="280" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Center circle */}
      <circle cx="300" cy="170" r="45" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Penalty boxes */}
      <rect x="90" y="110" width="60" height="120" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.3" />
      <rect x="450" y="110" width="60" height="120" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.3" />
      {/* Combat zone polygon */}
      <polygon points="380,120 460,120 440,200 360,200" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" fill="#10B981" fillOpacity="0.05" />
      {/* Swimming lanes */}
      <line x1="140" y1="80" x2="260" y2="80" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="140" y1="95" x2="260" y2="95" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="140" y1="110" x2="260" y2="110" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.3" />
      {/* Isometric depth lines */}
      <line x1="50" y1="30" x2="30" y2="50" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="550" y1="30" x2="570" y2="50" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.2" />
    </svg>
  );
}

function WorkforceSvgBlueprint() {
  return (
    <svg className="w-full h-full max-w-[520px] max-h-[300px]" viewBox="0 0 600 340" fill="none">
      {/* Outer orbit */}
      <circle cx="300" cy="170" r="120" stroke="#00A3FF" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 3" />
      {/* Inner ring */}
      <circle cx="300" cy="170" r="70" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.25" />
      {/* Telemetry links */}
      <line x1="180" y1="120" x2="300" y2="170" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="420" y1="120" x2="300" y2="170" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="300" y1="170" x2="230" y2="255" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />
      <line x1="300" y1="170" x2="390" y2="255" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.45" />
      {/* EKG Pulse */}
      <path
        d="M 110 185 L 165 185 L 177 155 L 193 215 L 210 168 L 225 185 L 275 185"
        stroke="#10B981"
        strokeWidth="2"
        strokeOpacity="0.65"
        fill="none"
      />
      {/* Node circles */}
      <circle cx="180" cy="120" r="14" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.55" fill="#00A3FF" fillOpacity="0.08" />
      <circle cx="420" cy="120" r="14" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.55" fill="#00A3FF" fillOpacity="0.08" />
      <circle cx="300" cy="170" r="20" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.75" fill="#00E5FF" fillOpacity="0.1" />
      {/* Isometric depth indicator */}
      <line x1="300" y1="50" x2="300" y2="290" stroke="#00A3FF" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="2 4" />
    </svg>
  );
}

function MasterySvgBlueprint() {
  return (
    <svg className="w-full h-full max-w-[520px] max-h-[300px]" viewBox="0 0 600 340" fill="none">
      {/* 1st place podium */}
      <rect x="250" y="110" width="100" height="150" stroke="#F59E0B" strokeWidth="1.8" strokeOpacity="0.6" fill="#F59E0B" fillOpacity="0.06" rx="6" />
      {/* 2nd */}
      <rect x="160" y="150" width="90" height="110" stroke="#CBD5E1" strokeWidth="1.5" strokeOpacity="0.5" fill="#CBD5E1" fillOpacity="0.04" rx="6" />
      {/* 3rd */}
      <rect x="350" y="180" width="90" height="80" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.5" fill="#D97706" fillOpacity="0.04" rx="6" />
      {/* Gold medal */}
      <circle cx="300" cy="72" r="24" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.85" fill="#F59E0B" fillOpacity="0.12" />
      {/* Inner medal ring */}
      <circle cx="300" cy="72" r="14" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      {/* Champion arc */}
      <path d="M 235 82 C 235 40, 365 40, 365 82" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.45" />
      {/* Belt rank line */}
      <line x1="80" y1="285" x2="520" y2="285" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Dan progression dots */}
      {[100, 150, 200, 250, 300, 350, 400, 450, 500].map((x, i) => (
        <circle key={x} cx={x} cy="285" r="3" fill="#00A3FF" fillOpacity={0.2 + i * 0.08} />
      ))}
    </svg>
  );
}
