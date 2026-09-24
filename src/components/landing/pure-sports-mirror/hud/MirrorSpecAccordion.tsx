'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPEC_TILE_CATEGORIES, MetricRow } from '../data/mirrorDataTypes';

interface MirrorSpecAccordionProps {
  specRows: [MetricRow[], MetricRow[], MetricRow[], MetricRow[]];
  cameraTags?: string[];
  notes?: string[];
  accentColor: string;
  activeTileIndex: number | null;
  onToggleTile: (index: number) => void;
}

export const MirrorSpecAccordion: React.FC<MirrorSpecAccordionProps> = ({
  specRows,
  cameraTags,
  notes,
  accentColor,
  activeTileIndex,
  onToggleTile,
}) => {
  // Claude Design grid logic: when one tile is open, last closed tile spans 2 columns
  const closedIndices = [0, 1, 2, 3].filter((i) => i !== activeTileIndex);
  const lastClosed = closedIndices.length % 2 === 1 ? closedIndices[closedIndices.length - 1] : -1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-3">
      {SPEC_TILE_CATEGORIES.map((cat, i) => {
        const isOpen = activeTileIndex === i;
        const rows = specRows[i] || [];
        const camTag = cameraTags?.[i] || ['WIDE ESTABLISH', 'DISCIPLINE PASS', 'TECH CLOSE-UP', 'STANDARD SWEEP'][i];
        const note = notes?.[i];
        const shouldSpan2 = isOpen || i === lastClosed;

        return (
          <div
            key={cat.title}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              shouldSpan2 ? 'sm:col-span-2' : 'sm:col-span-1'
            }`}
            style={{
              backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.065)' : 'rgba(255, 255, 255, 0.028)',
              borderColor: isOpen ? `${accentColor}66` : 'rgba(255, 255, 255, 0.08)',
              boxShadow: isOpen
                ? `inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 14px 34px rgba(0, 0, 0, 0.34)`
                : 'none',
            }}
          >
            {/* Tile Header Button */}
            <button
              type="button"
              onClick={() => onToggleTile(i)}
              className="w-full flex items-center justify-between gap-2 p-3 sm:px-4 sm:py-3 border-none bg-transparent cursor-pointer text-left transition-transform active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-0.5 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
                  style={{ backgroundColor: isOpen ? accentColor : 'rgba(255, 255, 255, 0.12)' }}
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-xs sm:text-[13px] font-semibold truncate transition-colors duration-300"
                    style={{ color: isOpen ? accentColor : '#EAF2F8' }}
                  >
                    {cat.title}
                  </span>
                  <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.18em] text-slate-400 truncate uppercase">
                    {cat.subtitle}
                  </span>
                </div>
              </div>
              <span
                className="font-mono text-base transition-colors duration-300 flex-shrink-0 pr-1"
                style={{ color: isOpen ? accentColor : '#EAF2F8' }}
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>

            {/* Expandable Content with Dot Leaders and Camera Cue */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 0.84, 0.44, 1] }}
                  className="overflow-hidden px-3 sm:px-4 pb-3 sm:pb-3.5 flex flex-col gap-2.5"
                >
                  <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(to right, ${accentColor}66, transparent)` }}
                  />

                  {/* Dot Leader Rows with Repeating Gradient */}
                  <div className="flex flex-col gap-2">
                    {rows.map((row, ri) => (
                      <div key={ri} className="flex items-baseline gap-2">
                        <span className="text-[10.8px] sm:text-[11.5px] text-[#E6EFF6]/60 flex-shrink-0 font-normal">
                          {row.label}
                        </span>
                        <span
                          className="flex-1 min-w-4 h-px -translate-y-1"
                          style={{
                            background:
                              'repeating-linear-gradient(to right, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 4px)',
                          }}
                        />
                        <span className="font-mono text-[10.8px] sm:text-[11.5px] tracking-tight text-[#F0F7FC]/95 font-medium tabular-nums text-right flex-shrink-0">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Optional Note */}
                  {note && (
                    <p className="text-[11px] leading-relaxed text-slate-300 mt-1 italic border-l-2 pl-2 border-white/15">
                      {note}
                    </p>
                  )}

                  {/* Camera Cue Badge */}
                  <div
                    className="inline-flex items-center gap-2 self-start mt-1 px-2.5 py-1 rounded-full border border-white/10 select-none cursor-pointer transition-colors hover:bg-white/[0.08]"
                    style={{
                      borderColor: `${accentColor}44`,
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTile(i);
                    }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                    <span className="font-mono text-[9px] tracking-[0.2em] font-medium" style={{ color: accentColor }}>
                      CAMERA → {camTag}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
