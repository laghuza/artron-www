'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubPillItem } from './mirrorDataMatrix';

interface MirrorMasterDockProps {
  pills: SubPillItem[];
  activePillId: string;
  onSelectPill: (id: string) => void;
  playTactileClick: () => void;
}

export const MirrorMasterDock: React.FC<MirrorMasterDockProps> = ({
  pills,
  activePillId,
  onSelectPill,
  playTactileClick,
}) => {
  const handleSelect = (id: string) => {
    if (id !== activePillId) {
      playTactileClick();
      onSelectPill(id);
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-7 pb-3 pt-3">
      {/* Dock ambient label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A3FF]/25 to-transparent" />
        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF]/70 uppercase font-semibold">
          HERO MODULE CARDS • SELECT TO REVEAL
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A3FF]/25 to-transparent" />
      </div>

      {/* Scrollable / Centered PS5 Hero Module Row */}
      <div
        className="flex items-end justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto pt-3 pb-3 px-1 scrollbar-none snap-x snap-mandatory"
        role="tablist"
        aria-label="Module Selector"
      >
        {pills.map((pill) => {
          const isActive = pill.id === activePillId;
          return (
            <motion.button
              key={pill.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(pill.id)}
              animate={{
                y: isActive ? -8 : 0,
                scale: isActive ? 1.05 : 1,
              }}
              whileHover={{ y: isActive ? -8 : -4, scale: isActive ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.6 }}
              className={`
                snap-start relative flex-shrink-0 flex flex-col items-center justify-between p-3
                w-[110px] sm:w-[124px] lg:w-[132px] h-[110px] sm:h-[120px]
                rounded-2xl select-none transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]
                ${isActive
                  ? 'bg-gradient-to-b from-[#00A3FF]/25 via-[#0066FF]/15 to-[#060910] text-white'
                  : 'bg-[#0A0E18]/85 hover:bg-[#111827] text-slate-400 hover:text-slate-200'
                }
              `}
              style={isActive ? {
                border: '1.5px solid #00E5FF',
                boxShadow: '0 10px 30px rgba(0, 229, 255, 0.35), inset 0 1px 0 rgba(0, 229, 255, 0.4)',
              } : {
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Glow base under active tile */}
              {isActive && (
                <motion.div
                  layoutId="activeDockGlowBase"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-[#00E5FF] blur-[2px]"
                  style={{ boxShadow: '0 0 12px #00E5FF, 0 0 24px rgba(0,229,255,0.6)' }}
                />
              )}

              {/* Scan line overlay for active tile */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent" />
                </div>
              )}

              {/* Top Row: Active Indicator Dot */}
              <div className="w-full flex justify-end items-center h-2">
                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-[#00E5FF]"
                    style={{ boxShadow: '0 0 8px #00E5FF' }}
                  />
                )}
              </div>

              {/* 40x40px Dedicated 3D/Vector Symbol Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                  isActive
                    ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 scale-110'
                    : 'bg-white/[0.04] border border-white/[0.06]'
                }`}
                style={isActive ? { boxShadow: '0 0 16px rgba(0,229,255,0.3)' } : undefined}
              >
                <span
                  className="text-2xl sm:text-3xl leading-none select-none"
                  style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.75))' } : undefined}
                >
                  {pill.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] sm:text-xs font-bold tracking-tight text-center leading-tight px-1 transition-colors ${
                  isActive ? 'text-[#00E5FF]' : 'text-slate-300'
                }`}
                style={{ fontFamily: 'var(--font-noto-sans-georgian, system-ui)' }}
              >
                {pill.shortLabel || pill.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
