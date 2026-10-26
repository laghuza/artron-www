'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPEC_TILE_CATEGORIES, MetricRow } from '../data/mirrorDataTypes';

interface MirrorSpecAccordionProps {
  description: string;
  specRows?: [MetricRow[], MetricRow[], MetricRow[], MetricRow[]];
  cameraTags?: string[];
  notes?: string[];
  accentColor: string;
  activeTileIndex: number | null;
  onToggleTile: (index: number) => void;
}

export const MirrorSpecAccordion: React.FC<MirrorSpecAccordionProps> = ({
  description,
  specRows,
  cameraTags,
  notes,
  accentColor,
  activeTileIndex,
  onToggleTile,
}) => {
  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* ── 1. DYNAMIC TELEMETRY VIEWPORT: Replaces Main Description when any button is active ── */}
      <div className="w-full min-h-[90px] sm:min-h-[100px] flex items-center">
        <AnimatePresence mode="wait">
          {activeTileIndex === null ? (
            /* DEFAULT STATE: Primary Narrative Description */
            <motion.div
              key="primary-description"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="text-xs sm:text-[12.5px] leading-[1.6] text-[#E6EFF6]/85 font-normal max-w-[62ch]">
                {description}
              </p>
            </motion.div>
          ) : (
            /* ACTIVE SPEC INSPECTOR: Detailed Spec Rows & Telemetry */
            <motion.div
              key={`spec-inspector-${activeTileIndex}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full rounded-2xl border p-3 sm:p-3.5 flex flex-col gap-2 transition-all duration-300"
              style={{
                borderColor: `${accentColor}55`,
                backgroundColor: 'rgba(6, 10, 18, 0.75)',
                backdropFilter: 'blur(16px)',
                boxShadow: `0 14px 34px rgba(0,0,0,0.4), 0 0 24px ${accentColor}12, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Header Bar inside inspector */}
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-[12px] font-bold text-white tracking-tight truncate">
                    {SPEC_TILE_CATEGORIES[activeTileIndex]?.title}
                  </span>
                  <span className="font-mono text-[8.5px] tracking-wider text-slate-400 uppercase hidden xs:inline">
                    / {SPEC_TILE_CATEGORIES[activeTileIndex]?.subtitle}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Camera tag badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[8.5px] font-mono tracking-wider"
                    style={{
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}10`,
                      color: accentColor,
                    }}
                  >
                    <span>CAMERA — {cameraTags?.[activeTileIndex] || 'STANDARD SWEEP'}</span>
                  </div>

                  {/* Close button to return to primary description */}
                  <button
                    type="button"
                    onClick={() => onToggleTile(activeTileIndex)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-slate-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors cursor-pointer border border-white/10 active:scale-95"
                    title="საწყის ტექსტზე დაბრუნება (ESC)"
                    aria-label="დახურვა"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Spec metric rows with dotted leaders */}
              <div className="flex flex-col gap-1.5">
                {(specRows?.[activeTileIndex] || []).map((row, rIdx) => (
                  <div key={rIdx} className="flex items-baseline gap-2">
                    <span className="text-[11px] text-[#E6EFF6]/75 flex-shrink-0 max-w-[55%] truncate">
                      {row.label}
                    </span>
                    <span
                      className="flex-1 min-w-[12px] h-px translate-y-[-3px]"
                      style={{
                        background:
                          'repeating-linear-gradient(to right, rgba(255,255,255,0.18) 0 1px, transparent 1px 4px)',
                      }}
                    />
                    <span className="font-mono text-[10.5px] tracking-[0.03em] font-tabular text-[#F0F7FC]/95 text-right flex-shrink-0 max-w-[45%] truncate">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Explanatory note */}
              {notes?.[activeTileIndex] && (
                <p className="text-[11px] leading-[1.55] text-[#E6EFF6]/70 font-normal border-t border-white/[0.04] pt-1 mt-0.5">
                  {notes[activeTileIndex]}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. MASTER 2x2 FIXED GRID: The 4 Category Buttons ── */}
      <div className="grid grid-cols-2 gap-2 w-full mt-0.5">
        {SPEC_TILE_CATEGORIES.map((cat, i) => {
          const isOpen = activeTileIndex === i;

          return (
            <button
              key={cat.title}
              type="button"
              onClick={() => onToggleTile(i)}
              aria-expanded={isOpen}
              className="relative flex items-center justify-between gap-1.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl border text-left transition-all duration-200 outline-none active:scale-[0.98] cursor-pointer"
              style={{
                borderColor: isOpen ? `${accentColor}99` : 'rgba(255, 255, 255, 0.08)',
                backgroundColor: isOpen ? `${accentColor}18` : 'rgba(255, 255, 255, 0.028)',
                boxShadow: isOpen
                  ? `0 0 16px ${accentColor}22, inset 0 0 0 1px ${accentColor}44`
                  : 'none',
              }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className="w-1 h-4 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: isOpen ? accentColor : 'rgba(255, 255, 255, 0.18)',
                    boxShadow: isOpen ? `0 0 8px ${accentColor}` : 'none',
                  }}
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className="text-[11.5px] sm:text-[12.5px] font-semibold tracking-tight transition-colors duration-200 leading-tight truncate"
                    style={{ color: isOpen ? '#FFFFFF' : '#EAF2F8' }}
                  >
                    {cat.title}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[8.5px] tracking-[0.14em] text-slate-400/80 uppercase truncate">
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              <span
                className="font-mono text-[13px] leading-none flex-shrink-0 transition-colors duration-200 pl-1 font-light"
                style={{ color: isOpen ? accentColor : 'rgba(255, 255, 255, 0.4)' }}
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
