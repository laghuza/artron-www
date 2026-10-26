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
  const scrollSettleTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);
  const isProgrammaticScroll = useRef<boolean>(true);
  const isUserInteracting = useRef<boolean>(false);
  const isFirstMount = useRef<boolean>(true);
  const lastActiveNode = useRef<number>(node);

  lastActiveNode.current = node;

  // Initialize and unlock after initial mount positioning
  useEffect(() => {
    const initTimer = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
    return () => clearTimeout(initTimer);
  }, []);

  // Center the active node in the stationary central lens
  useEffect(() => {
    // If the active node was updated from active user touch dragging,
    // do not issue a competing scrollBy command that fights the user's gesture
    if (isUserInteracting.current) return;

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
    }, 350);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resetTimer);
    };
  }, [node]);

  // Real-Time (60 FPS) Nearest Node Detection during scroll
  const evaluateNearestNode = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestIndex = lastActiveNode.current;
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

    if (closestIndex !== lastActiveNode.current) {
      lastActiveNode.current = closestIndex;
      goToNode(closestIndex);
    }
  }, [goToNode]);

  // Handle continuous smooth scroll events with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      evaluateNearestNode();
    });

    // When scrolling stops (momentum ends), smoothly settle dead-center into the lens
    if (scrollSettleTimeout.current) clearTimeout(scrollSettleTimeout.current);
    scrollSettleTimeout.current = setTimeout(() => {
      if (!isUserInteracting.current) {
        const container = containerRef.current;
        const target = itemRefs.current[lastActiveNode.current];
        if (container && target) {
          const containerRect = container.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const diff = (targetRect.left + targetRect.width / 2) - (containerRect.left + containerRect.width / 2);
          if (Math.abs(diff) > 2) {
            container.scrollBy({ left: diff, behavior: 'smooth' });
          }
        }
      }
    }, 140);
  }, [evaluateNearestNode]);

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

          {/* Central Optical Focus Reticle / Ticks (Top & Bottom Center Alignment Marks) */}
          <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-cyan-400/90 shadow-[0_0_8px_#00A3FF]" />
          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-emerald-400/90 shadow-[0_0_8px_#10B981]" />
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
          onTouchStart={() => {
            isUserInteracting.current = true;
            isProgrammaticScroll.current = false;
          }}
          onTouchEnd={() => {
            isUserInteracting.current = false;
          }}
          onPointerDown={() => {
            isUserInteracting.current = true;
            isProgrammaticScroll.current = false;
          }}
          onPointerUp={() => {
            isUserInteracting.current = false;
          }}
          aria-label="ARTRON B2B Suite მობილური ქვეთავები"
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-1 touch-pan-x w-full"
        >
          {/* Dynamic Leading spacer to allow 01 to align in dead center on initial load and approach */}
          <div
            aria-hidden="true"
            className="shrink-0 pointer-events-none transition-all duration-300"
            style={{ width: `calc(50% - ${node === 0 ? 76 : 16}px)` }}
          />

          {logics.map((l, i) => {
            const isSelected = node === i;
            const distance = Math.abs(node - i);
            const isAdjacent = distance === 1;
            const isSecondary = distance === 2;

            return (
              <button
                key={l.s}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onClick={() => goToNode(i)}
                aria-current={isSelected ? 'page' : undefined}
                aria-label={`ქვეთავი ${pad(i + 1)}: ${l.s}`}
                className={`shrink-0 snap-center transition-all duration-200 ease-out flex items-center justify-center cursor-pointer select-none relative z-30 ${
                  isSelected
                    ? 'h-10 min-w-[152px] px-3 bg-transparent'
                    : isAdjacent
                      ? 'w-8 h-8 rounded-full bg-gradient-to-b from-white/15 to-white/5 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,163,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-105'
                      : isSecondary
                        ? 'w-7 h-7 rounded-full bg-white/[0.06] border border-white/15 shadow-[0_2px_6px_rgba(0,0,0,0.4)] opacity-75'
                        : 'w-7 h-7 rounded-full bg-white/[0.02] border border-transparent opacity-40 hover:opacity-75'
                }`}
              >
                {isSelected ? (
                  <div className="flex items-center justify-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#F59E0B] tracking-wider">
                      {pad(i + 1)}
                    </span>
                    <span className="text-xs text-[#10B981]/70 font-mono">·</span>
                    <span className="text-xs font-bold text-white tracking-wide truncate max-w-[92px]">
                      {l.s}
                    </span>
                  </div>
                ) : (
                  <span
                    className={`font-mono tracking-wider transition-colors duration-200 ${
                      isAdjacent
                        ? 'text-xs font-bold text-cyan-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                        : isSecondary
                          ? 'text-[11px] font-medium text-slate-300'
                          : 'text-[11px] font-normal text-slate-500'
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                )}
              </button>
            );
          })}

          {/* Dynamic Trailing spacer to allow 10 to align in dead center */}
          <div
            aria-hidden="true"
            className="shrink-0 pointer-events-none transition-all duration-300"
            style={{ width: `calc(50% - ${node === logics.length - 1 ? 76 : 16}px)` }}
          />
        </nav>
      </div>
    </div>
  );
};
