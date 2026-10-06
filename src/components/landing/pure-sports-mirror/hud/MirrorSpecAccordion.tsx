'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPEC_TILE_CATEGORIES, MetricRow } from '../data/mirrorDataTypes';

interface MirrorSpecAccordionProps {
  specRows?: [MetricRow[], MetricRow[], MetricRow[], MetricRow[]];
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
  // Balanced 2-column span logic matching handoff:
  // If one tile is open, the open tile spans 2 cols, and the last of the remaining 3 closed tiles also spans 2 cols.
  const closed = [0, 1, 2, 3].filter((idx) => idx !== activeTileIndex);
  const lastClosed = closed.length % 2 !== 0 ? closed[closed.length - 1] : -1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-2 select-none">
      {SPEC_TILE_CATEGORIES.map((cat, i) => {
        const isOpen = activeTileIndex === i;
        const isSpan2 = isOpen || i === lastClosed;
        const rows = specRows?.[i] || [];
        const note = notes?.[i];
        const camTag = cameraTags?.[i] || 'STANDARD SWEEP';

        return (
          <div
            key={cat.title}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isSpan2 ? 'col-span-1 sm:col-span-2' : 'col-span-1'
            }`}
            style={{
              borderColor: isOpen ? `${accentColor}66` : 'rgba(255, 255, 255, 0.08)',
              backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.065)' : 'rgba(255, 255, 255, 0.028)',
              boxShadow: isOpen
                ? `inset 0 0 0 1px rgba(255,255,255,0.04), 0 14px 34px rgba(0,0,0,0.34), 0 0 20px ${accentColor}14`
                : 'none',
            }}
          >
            {/* Header toggle button */}
            <button
              type="button"
              onClick={() => onToggleTile(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-2 p-3 sm:px-4 sm:py-3 border-none bg-transparent cursor-pointer text-left transition-transform duration-150 active:scale-[0.99] outline-none"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className="w-0.5 h-6 rounded-full flex-shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: isOpen ? accentColor : 'rgba(255, 255, 255, 0.14)',
                    boxShadow: isOpen ? `0 0 8px ${accentColor}` : 'none',
                  }}
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className="text-[13px] font-semibold tracking-tight transition-colors duration-200 leading-snug truncate"
                    style={{ color: isOpen ? accentColor : '#EAF2F8' }}
                  >
                    {cat.title}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-slate-400/80 uppercase truncate">
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              <span
                className="font-mono text-[16px] leading-none flex-shrink-0 transition-colors duration-200 px-1 font-light"
                style={{ color: isOpen ? accentColor : '#EAF2F8' }}
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>

            {/* Accordion Expandable Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 0.84, 0.44, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3.5 pt-0 flex flex-col gap-2">
                    <div
                      className="h-px w-full mb-1"
                      style={{
                        background: `linear-gradient(to right, ${accentColor}44, transparent)`,
                      }}
                    />

                    {/* Spec metric rows with dotted leaders */}
                    {rows.map((row, rIdx) => (
                      <div key={rIdx} className="flex items-baseline gap-2">
                        <span className="text-[10.8px] text-[#E6EFF6]/65 flex-shrink-0">
                          {row.label}
                        </span>
                        <span
                          className="flex-1 min-w-[16px] h-px translate-y-[-3px]"
                          style={{
                            background:
                              'repeating-linear-gradient(to right, rgba(255,255,255,0.18) 0 1px, transparent 1px 4px)',
                          }}
                        />
                        <span className="font-mono text-[10.8px] tracking-[0.04em] font-tabular text-[#F0F7FC]/95 text-right flex-shrink-0">
                          {row.value}
                        </span>
                      </div>
                    ))}

                    {/* Explanatory note */}
                    {note && (
                      <p className="mt-1 text-[11.5px] leading-[1.62] text-[#E6EFF6]/75 font-normal text-pretty">
                        {note}
                      </p>
                    )}

                    {/* Camera tag badge */}
                    <div
                      className="inline-flex self-start items-center gap-2 mt-1 px-2.5 py-1 rounded-full border text-[9px] font-mono tracking-[0.2em]"
                      style={{
                        borderColor: `${accentColor}40`,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        color: accentColor,
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 animate-pulse"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>CAMERA — {camTag}</span>
                    </div>
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
