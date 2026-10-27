'use client';

import React, { useEffect, useRef } from 'react';
import { MOBILE_SCREENS_CONFIG, SCREEN_ORDER } from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface MobileSlimCardCarouselProps {
  activeId: number;
  onSelect: (id: number) => void;
}

export const MobileSlimCardCarousel: React.FC<MobileSlimCardCarouselProps> = ({
  activeId,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smoothly center the active card in the horizontal track without affecting window scroll
  useEffect(() => {
    const el = cardRefs.current[activeId];
    const container = containerRef.current;
    if (el && container) {
      const targetScrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  return (
    <div className="w-full relative py-1">
      {/* Edge gradient fades for clean peek indication */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#0B0F17] to-transparent z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#0B0F17] to-transparent z-10 pointer-events-none"
      />

      {/* Horizontal Snap Scroll Track */}
      <div
        ref={containerRef}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar px-4 py-1.5 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {SCREEN_ORDER.map((id) => {
          const cfg = MOBILE_SCREENS_CONFIG[id];
          const isActive = id === activeId;

          return (
            <button
              key={id}
              ref={(el) => {
                cardRefs.current[id] = el;
              }}
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                onSelect(id);
              }}
              className={`snap-center flex-shrink-0 min-w-[210px] max-w-[240px] h-[66px] rounded-xl px-3.5 py-2 flex flex-col justify-center text-left transition-all duration-300 cursor-pointer border relative overflow-hidden select-none ${
                isActive
                  ? 'bg-gradient-to-b from-white/[0.09] to-white/[0.03] text-white shadow-lg'
                  : 'bg-black/30 hover:bg-white/[0.04] text-slate-300 border-white/10 hover:border-white/20'
              }`}
              style={{
                borderColor: isActive ? `rgba(${cfg.rgb}, 0.5)` : undefined,
                boxShadow: isActive
                  ? `0 4px 18px -4px rgba(${cfg.rgb}, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)`
                  : 'none',
              }}
            >
              {/* Active Chamfer / Top Glow Line */}
              {isActive && (
                <span
                  className="absolute left-0 top-0 h-[2px] w-[60%]"
                  style={{
                    background: `linear-gradient(90deg, rgba(${cfg.rgb},0), ${cfg.accent} 60%, rgba(${cfg.rgb},0))`,
                    boxShadow: `0 0 8px ${cfg.accent}`,
                  }}
                />
              )}

              {/* Row 1: Status Badge & 01..08 ID */}
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase font-medium"
                  style={{ color: isActive ? cfg.accent : '#94A3B8' }}
                >
                  <span
                    className={`w-[5px] h-[5px] rounded-full ${isActive ? 'animate-pulse' : ''}`}
                    style={{
                      background: isActive ? cfg.accent : 'rgba(255,255,255,0.3)',
                      boxShadow: isActive ? `0 0 6px ${cfg.accent}` : 'none',
                    }}
                  />
                  <span>{cfg.statusBadge}</span>
                </span>

                <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                  0{id + 1}
                </span>
              </div>

              {/* Row 2: Screen Title */}
              <p
                className={`m-0 text-xs font-semibold tracking-tight truncate leading-[1.3] ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
              >
                {cfg.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
