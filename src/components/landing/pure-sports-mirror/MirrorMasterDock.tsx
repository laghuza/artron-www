'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubPillItem } from './mirrorDataMatrix';
import { MirrorIcon } from './MirrorIcon';

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
                group snap-start relative flex-shrink-0 flex flex-col items-center justify-between p-3
                w-[110px] sm:w-[124px] lg:w-[132px] h-[110px] sm:h-[120px]
                rounded-2xl select-none transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]
                border-[1.5px]
                ${isActive
                  ? 'bg-gradient-to-b from-[#00A3FF]/25 via-[#0066FF]/15 to-[#060910] text-white border-[#00E5FF] shadow-[0_10px_30px_rgba(0,229,255,0.35),inset_0_1px_0_rgba(0,229,255,0.4)]'
                  : 'bg-[#0A0E18]/60 hover:bg-[#0D1524]/85 text-slate-400 hover:text-white border-transparent hover:border-[#00E5FF]/40 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(0,229,255,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]'
                }
              `}
            >
              {/* Subtle ambient hover glow backdrop for unselected cards */}
              {!isActive && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-b from-[#00E5FF]/10 via-[#00A3FF]/5 to-transparent"
                  aria-hidden="true"
                />
              )}

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

              {/* 40x40px Dedicated High-Tech Vector Symbol Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#00E5FF]/20 via-[#00A3FF]/15 to-[#0066FF]/25 border border-[#00E5FF]/50 scale-110 shadow-[0_0_16px_rgba(0,229,255,0.35)]'
                    : 'bg-white/[0.03] border border-transparent group-hover:border-[#00E5FF]/35 group-hover:bg-[#00E5FF]/10 group-hover:shadow-[0_0_14px_rgba(0,229,255,0.25)]'
                }`}
              >
                <MirrorIcon
                  name={pill.icon}
                  isActive={isActive}
                  size={22}
                  strokeWidth={isActive ? 2 : 1.8}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[11px] sm:text-xs font-bold tracking-tight text-center leading-tight px-1 transition-colors duration-200 ${
                  isActive ? 'text-[#00E5FF]' : 'text-slate-400 group-hover:text-[#00E5FF]'
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
