'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { LogicDefinition } from './types';
import { pad } from './constants';

interface B2BMobileLogicSelectorProps {
  node: number;
  goToNode: (index: number) => void;
  logics: LogicDefinition[];
}

export const B2BMobileLogicSelector: React.FC<B2BMobileLogicSelectorProps> = ({
  node,
  goToNode,
  logics,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScroll = useRef<boolean>(true);
  const isFirstMount = useRef<boolean>(true);

  // Initialize and lock programmatic scroll during initial mount
  useEffect(() => {
    const initTimer = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
    return () => clearTimeout(initTimer);
  }, []);

  // Center the active node in the stationary central lens using exact getBoundingClientRect math
  useEffect(() => {
    const container = containerRef.current;
    const target = itemRefs.current[node];
    if (!container || !target) return;

    isProgrammaticScroll.current = true;

    const alignCenter = (smooth: boolean) => {
      if (!container || !target) return;
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const diff = (targetRect.left + targetRect.width / 2) - (containerRect.left + containerRect.width / 2);

      if (Math.abs(diff) > 1.5) {
        container.scrollBy({
          left: diff,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    };

    const isSmooth = !isFirstMount.current;
    alignCenter(isSmooth);

    const raf = requestAnimationFrame(() => {
      alignCenter(isSmooth);
    });

    if (isFirstMount.current) {
      isFirstMount.current = false;
    }

    const resetTimer = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resetTimer);
    };
  }, [node]);

  // Detect which number is centered after manual user swipe/scroll
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let closestIndex = node;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        const elCenter = elRect.left + elRect.width / 2;
        const distance = Math.abs(containerCenter - elCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== node) {
        goToNode(closestIndex);
      }
    }, 120);
  }, [node, goToNode]);

  return (
    <div className="relative w-full max-w-lg mx-auto py-3 px-2 sm:hidden select-none">
      {/* 
        Stationary Central Liquid Glass Lens (WhatsApp-Style 3D Optical Magnifier)
        Sits completely still in the exact horizontal center, slightly elevated over the dock
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[152px] h-[48px] rounded-full p-[1.5px] bg-gradient-to-r from-white/60 via-[#00A3FF]/50 to-[#10B981]/50 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(0,163,255,0.3)]"
      >
        <div className="relative w-full h-full rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_3px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
          {/* Chromatic iridescent specular flares on rim */}
          <span className="absolute -top-1 right-3 w-6 h-2 bg-gradient-to-r from-cyan-300 via-amber-200 to-transparent rounded-full blur-[1px] opacity-95" />
          <span className="absolute -bottom-1 left-3 w-6 h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-transparent rounded-full blur-[1.5px] opacity-80" />
          {/* Radial clarity highlight */}
          <span className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Outer Dock Bar with Sliding Carousel Track */}
      <div className="relative flex items-center h-12 bg-[#090D15]/90 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Left & Right gradient edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#090D15] to-transparent z-15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#090D15] to-transparent z-15"
        />

        {/* Sliding Navigation Track (Moves under and into the stationary lens) */}
        <nav
          ref={containerRef}
          onScroll={handleScroll}
          aria-label="ARTRON B2B Suite მობილური ქვეთავები"
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-1 touch-pan-x w-full"
        >
          {/* Leading spacer to allow 01 to align in dead center on initial load */}
          <div aria-hidden="true" className="shrink-0 w-[calc(50%-76px)] pointer-events-none" />

          {logics.map((l, i) => {
            const isSelected = node === i;
            return (
              <button
                key={l.s}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onClick={() => goToNode(i)}
                aria-current={isSelected ? 'page' : undefined}
                className={`shrink-0 snap-center transition-all duration-300 ease-out flex items-center justify-center cursor-pointer select-none relative z-30 ${
                  isSelected
                    ? 'h-10 min-w-[152px] px-3 bg-transparent'
                    : 'w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.03] hover:bg-white/[0.08] opacity-55 hover:opacity-90'
                }`}
              >
                {isSelected ? (
                  <div className="flex items-center justify-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#F59E0B] tracking-wider">
                      {pad(i + 1)}
                    </span>
                    <span className="text-xs text-[#10B981]/70 font-mono">·</span>
                    <span className="text-xs font-bold text-white tracking-wide truncate max-w-[90px]">
                      {l.s}
                    </span>
                  </div>
                ) : (
                  <span className="font-mono text-[11px] font-medium text-[#76869A] tracking-wider">
                    {pad(i + 1)}
                  </span>
                )}
              </button>
            );
          })}

          {/* Trailing spacer to allow 10 to align in dead center */}
          <div aria-hidden="true" className="shrink-0 w-[calc(50%-76px)] pointer-events-none" />
        </nav>
      </div>
    </div>
  );
};
