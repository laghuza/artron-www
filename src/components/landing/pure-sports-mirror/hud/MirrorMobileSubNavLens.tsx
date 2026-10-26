'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MirrorModule } from '../data/mirrorDataTypes';

interface MirrorMobileSubNavLensProps {
  modules: MirrorModule[];
  activeModuleIndex: number;
  accentColor: string;
  onSelectModule: (index: number) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export const MirrorMobileSubNavLens: React.FC<MirrorMobileSubNavLensProps> = ({
  modules,
  activeModuleIndex,
  accentColor,
  onSelectModule,
}) => {
  const touchStartX = useRef<number | null>(null);

  // Swipe navigation support for seamless mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0 && activeModuleIndex < modules.length - 1) {
        onSelectModule(activeModuleIndex + 1);
      } else if (deltaX > 0 && activeModuleIndex > 0) {
        onSelectModule(activeModuleIndex - 1);
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-2 w-full max-w-full items-center select-none pt-1"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Progress Ticks & Counter */}
      <div className="flex items-center justify-center gap-2 px-2">
        <div className="flex gap-1 items-center">
          {modules.map((m, i) => {
            const isActive = i === activeModuleIndex;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(i)}
                aria-label={m.name}
                className="h-1 p-0 border-none rounded-full cursor-pointer transition-all duration-300"
                style={{
                  width: isActive ? '24px' : '10px',
                  backgroundColor: isActive ? accentColor : '#eaf2f8',
                  opacity: isActive ? 1 : 0.25,
                }}
              />
            );
          })}
        </div>
        <span className="font-mono text-[9px] tracking-widest text-slate-400 font-tabular">
          {pad(activeModuleIndex + 1)} / {pad(modules.length)}
        </span>
      </div>

      {/* 2. Liquid Glass Sliding Lens Dock */}
      <div className="relative w-full max-w-md mx-auto px-1">
        <div className="relative flex items-center justify-between sm:justify-center gap-1 sm:gap-2 h-12 px-1.5 bg-[#060910]/90 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          {modules.map((m, i) => {
            const isSelected = activeModuleIndex === i;
            const distance = Math.abs(activeModuleIndex - i);
            const isAdjacent = distance === 1;

            if (isSelected) {
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelectModule(i)}
                  aria-current="page"
                  aria-label={`ქვეთავი ${pad(i + 1)}: ${m.name}`}
                  className="relative z-30 flex-1 sm:flex-initial h-9 sm:h-9 min-w-[130px] sm:min-w-[160px] max-w-[210px] px-2.5 rounded-full flex items-center justify-center cursor-pointer select-none border-none bg-transparent"
                >
                  {/* Floating Liquid Glass Lens with Layout Transition */}
                  <motion.div
                    layoutId="activeModuleLensPill"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full p-[1.5px] pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.75) 0%, ${accentColor}88 50%, rgba(255,255,255,0.35) 100%)`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.7), 0 0 18px ${accentColor}44`,
                    }}
                  >
                    <div className="relative w-full h-full rounded-full bg-[#070B13]/95 backdrop-blur-xl border border-white/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_3px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
                      {/* Chromatic specular glints */}
                      <span className="absolute -top-1 right-2 w-5 h-2 bg-gradient-to-r from-cyan-300 via-white to-transparent rounded-full blur-[1px] opacity-90" />
                      <span
                        className="absolute -bottom-1 left-2 w-5 h-2 rounded-full blur-[1.5px] opacity-80"
                        style={{
                          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                        }}
                      />
                      <span className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />

                      {/* Optical Focus Reticle Ticks */}
                      <span
                        className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 0 8px ${accentColor}`,
                        }}
                      />
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 0 8px ${accentColor}`,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Active Content Content Label */}
                  <div className="relative z-10 flex items-center justify-center gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] w-full px-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                      style={{
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${accentColor}`,
                      }}
                    />
                    <span
                      className="font-mono text-xs font-bold tracking-wider flex-shrink-0"
                      style={{ color: accentColor }}
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex-shrink-0">·</span>
                    <span className="text-[11.5px] font-bold text-white tracking-wide truncate max-w-[125px]">
                      {m.name}
                    </span>
                  </div>
                </button>
              );
            }

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(i)}
                aria-label={`ქვეთავი ${pad(i + 1)}: ${m.name}`}
                className={`relative z-20 shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-200 ${
                  isAdjacent
                    ? 'bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.12)] scale-100 hover:scale-105 opacity-90'
                    : 'bg-white/[0.04] border border-white/10 opacity-50 hover:opacity-85'
                }`}
              >
                <span
                  className={`font-mono tracking-wider transition-colors duration-200 ${
                    isAdjacent
                      ? 'text-xs font-bold text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                      : 'text-[11px] font-normal text-slate-400'
                  }`}
                >
                  {pad(i + 1)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
