'use client';

import React, { useRef } from 'react';
import { MOBILE_SCREENS_CONFIG, SCREEN_ORDER } from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface MobileActiveCardRailProps {
  activeId: number;
  onSelect: (id: number) => void;
}

export const MobileActiveCardRail: React.FC<MobileActiveCardRailProps> = ({
  activeId,
  onSelect,
}) => {
  const touchStartX = useRef<number | null>(null);
  const cfg = MOBILE_SCREENS_CONFIG[activeId] || MOBILE_SCREENS_CONFIG[0];

  const handlePrev = () => {
    soundEngine.playPulseNode();
    const prevId = (activeId - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length;
    onSelect(prevId);
  };

  const handleNext = () => {
    soundEngine.playPulseNode();
    const nextId = (activeId + 1) % SCREEN_ORDER.length;
    onSelect(nextId);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 42) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full max-w-[420px] mx-auto flex flex-col gap-3 px-1 select-none"
    >
      {/* Active Card Body */}
      <article
        className="relative overflow-hidden rounded-2xl flex flex-col gap-2.5 p-5 border border-white/20 transition-all duration-300"
        style={{
          background: `radial-gradient(85% 140% at 100% 50%, rgba(${cfg.rgb},.18) 0%, rgba(${cfg.rgb},.05) 40%, rgba(${cfg.rgb},0) 66%), linear-gradient(180deg, rgba(15,22,33,.94), rgba(6,9,14,.96))`,
          boxShadow: `0 1px 0 rgba(255,255,255,.08), 0 16px 32px -10px rgba(0,0,0,.8), 0 24px 44px -24px rgba(${cfg.rgb},.4)`,
        }}
      >
        {/* Chamfer Top Glow Line */}
        <span
          className="absolute left-0 top-0 h-[1.5px] w-[45%]"
          style={{
            background: `linear-gradient(90deg, rgba(${cfg.rgb},0), ${cfg.pale} 50%, rgba(${cfg.rgb},0))`,
            boxShadow: `0 0 8px rgba(${cfg.rgb},.6)`,
          }}
        />

        {/* Header Row: Badge & Status */}
        <div className="relative flex justify-between items-center gap-2 flex-wrap z-10">
          <span className="font-mono text-xs tracking-wider text-[#8E99A8]">
            {cfg.badge}
          </span>
          <span
            className="flex items-center gap-1.5 font-mono text-xs tracking-wider font-medium"
            style={{ color: cfg.accent }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full animate-pulse"
              style={{
                background: cfg.accent,
                boxShadow: `0 0 8px rgba(${cfg.rgb},.9)`,
              }}
            />
            {cfg.statusBadge}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative text-lg font-semibold text-[#F8FAFC] tracking-tight leading-[1.3] z-10 m-0">
          {cfg.title}
        </h3>

        {/* Description */}
        <p className="relative text-sm font-normal text-[#9BA8B9] leading-[1.55] z-10 m-0">
          {cfg.desc}
        </p>
      </article>

      {/* Swipe & Navigation Controls */}
      <div className="flex items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous screen"
          className="min-w-[44px] min-h-[44px] px-3.5 flex items-center justify-center gap-1.5 rounded-xl text-xs font-mono tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-[#00A3FF]">◄</span>
          <span>წინა</span>
        </button>

        {/* 8 Dot Indicators */}
        <div className="flex items-center gap-1.5 py-2">
          {SCREEN_ORDER.map((id) => {
            const isActive = id === activeId;
            const screenCfg = MOBILE_SCREENS_CONFIG[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onSelect(id);
                }}
                aria-label={`Go to screen ${id + 1}`}
                className="min-w-[20px] min-h-[44px] flex items-center justify-center cursor-pointer p-0 bg-transparent border-0"
              >
                <span
                  style={{
                    width: isActive ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: isActive ? screenCfg.accent : 'rgba(226,232,240,0.22)',
                    boxShadow: isActive ? `0 0 8px rgba(${screenCfg.rgb}, 0.8)` : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next screen"
          className="min-w-[44px] min-h-[44px] px-3.5 flex items-center justify-center gap-1.5 rounded-xl text-xs font-mono tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
        >
          <span>შემდეგი</span>
          <span className="text-[#00A3FF]">►</span>
        </button>
      </div>
    </div>
  );
};
