'use client';

import React from 'react';
import {
  MOBILE_SCREENS_CONFIG,
  SHOWCASE_RGB,
  SHOWCASE_PALE,
  SCREEN_ORDER,
} from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface MobileFeatureDeckProps {
  activeId: number;
  onSelect: (id: number) => void;
  flips: number;
  bridgeW: number;
  wide: boolean;
  cardsRef: React.RefObject<HTMLDivElement | null>;
}

// 4 slots: [frontId, backId]
const SLOTS_PAIR: [number, number][] = [
  [0, 4], // Slot 0: 01 Entry Pass vs 05 Progress
  [1, 5], // Slot 1: 02 Mentor vs 06 Freeze
  [2, 6], // Slot 2: 03 Legal Shield vs 07 Guest Pass
  [3, 7], // Slot 3: 04 Renewal vs 08 Live Load
];

export const MobileFeatureDeck: React.FC<MobileFeatureDeckProps> = ({
  activeId,
  onSelect,
  flips,
  bridgeW,
  wide,
  cardsRef,
}) => {
  const isGroup2 = activeId >= 4;

  const handleGroupToggle = (groupIndex: number) => {
    soundEngine.playPulseNode();
    if (groupIndex === 0 && activeId >= 4) {
      onSelect(0);
    } else if (groupIndex === 1 && activeId < 4) {
      onSelect(4);
    }
  };

  const flipTf = `rotateX(${flips * 180}deg)`;
  const peF = flips % 2 ? 'none' : 'auto';
  const peB = flips % 2 ? 'auto' : 'none';

  return (
    <div className="flex-1 min-w-[320px] max-w-[560px] flex flex-col gap-3.5 relative z-10">
      {/* Category Pills & Progress Counter */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div
          className="flex gap-1 p-1 rounded-2xl bg-black/40 border border-slate-700/30"
          style={{
            boxShadow:
              'inset 0 1px 2px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(226,232,240,0.07)',
          }}
        >
          <button
            type="button"
            onClick={() => handleGroupToggle(0)}
            className={`flex items-center gap-2.5 min-h-[42px] px-4 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              !isGroup2
                ? 'bg-gradient-to-b from-white/10 to-white/[0.03] text-white border border-white/20 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="font-mono text-xs text-[#00A3FF]">I</span>
            <span>წვდომა · გადახდა</span>
          </button>
          <button
            type="button"
            onClick={() => handleGroupToggle(1)}
            className={`flex items-center gap-2.5 min-h-[42px] px-4 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              isGroup2
                ? 'bg-gradient-to-b from-white/10 to-white/[0.03] text-white border border-white/20 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="font-mono text-xs text-[#FFAE85]">II</span>
            <span>პროგრესი · კონტროლი</span>
          </button>
        </div>

        {/* 01 / 08 Indicator & Ticks */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-slate-400 tabular-nums">
            <span className="text-white font-semibold">
              {String(activeId + 1).padStart(2, '0')}
            </span>{' '}
            / 08
          </span>
          <div className="flex items-center gap-1">
            {SCREEN_ORDER.map((id, idx) => {
              const isActive = id === activeId;
              const isGroupActive = (id >= 4) === isGroup2;
              return (
                <span
                  key={id}
                  style={{
                    marginLeft: idx === 4 ? '6px' : '0px',
                    width: isActive ? '18px' : '8px',
                    height: '2px',
                    borderRadius: '1px',
                    backgroundColor: isActive
                      ? MOBILE_SCREENS_CONFIG[id].accent
                      : isGroupActive
                      ? 'rgba(226,232,240,0.35)'
                      : 'rgba(226,232,240,0.12)',
                    transition: 'all 0.4s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Slots with 3D Flip */}
      <div ref={cardsRef} className="flex flex-col gap-2.5">
        {SLOTS_PAIR.map(([frontId, backId], slotIdx) => {
          const frontCfg = MOBILE_SCREENS_CONFIG[frontId];
          const backCfg = MOBILE_SCREENS_CONFIG[backId];
          const isFrontActive = activeId === frontId;
          const isBackActive = activeId === backId;
          const isActive = isFrontActive || isBackActive;
          const activeCfg = isFrontActive ? frontCfg : backCfg;

          return (
            <div key={slotIdx} className="relative [perspective:1600px]">
              {/* Horizontal Bridge Beam extending towards phone */}
              {wide && isActive && (
                <div
                  className="absolute left-full top-1/2 -mt-[0.5px] pointer-events-none z-30 transition-all duration-700 ease-out"
                  style={{
                    width: `${bridgeW}px`,
                    background: `linear-gradient(90deg, rgba(${activeCfg.rgb},0) 0%, rgba(${activeCfg.rgb},0.85) 45%, ${activeCfg.pale} 100%)`,
                    height: '1px',
                    boxShadow: `0 0 6px rgba(${activeCfg.rgb},0.5)`,
                  }}
                >
                  <span
                    className="absolute -right-[2.5px] -top-[2px] w-[5px] h-[5px] rounded-full"
                    style={{
                      background: activeCfg.pale,
                      boxShadow: `0 0 10px 2px rgba(${activeCfg.rgb},0.8)`,
                    }}
                  />
                </div>
              )}

              {/* 3D Flippable Container */}
              <div
                className="grid [transform-style:preserve-3d] transition-transform duration-1000 ease-[cubic-bezier(0.45,0,0.15,1)]"
                style={{
                  transform: flipTf,
                  transitionDelay: `${slotIdx * 65}ms`,
                }}
              >
                {/* FRONT CARD (Group I) */}
                <article
                  tabIndex={0}
                  role="button"
                  data-testid={`b2c-adv-card-${frontId}`}
                  onClick={() => {
                    soundEngine.playPulseNode();
                    onSelect(frontId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(frontId);
                    }
                  }}
                  className={`[grid-area:1/1] relative overflow-hidden rounded-2xl flex flex-col gap-2 cursor-pointer [backface-visibility:hidden] transition-all duration-500 border ${
                    isFrontActive
                      ? 'border-white/20 shadow-2xl'
                      : 'border-white/[0.07] bg-gradient-to-br from-white/[0.032] to-white/[0.008] hover:border-white/15'
                  }`}
                  style={{
                    padding: '21px 26px',
                    pointerEvents: peF as any,
                    boxShadow: isFrontActive
                      ? `0 1px 0 rgba(255,255,255,.04), 0 2px 0 rgba(0,0,0,.6), 0 21px 34px -13px rgba(0,0,0,.8), 0 34px 55px -34px rgba(${frontCfg.rgb},.4)`
                      : '0 1px 0 rgba(255,255,255,.02), 0 13px 21px -13px rgba(0,0,0,.6)',
                  }}
                >
                  {/* Active Card Halo & Radial Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700"
                    style={{
                      opacity: isFrontActive ? 1 : 0,
                      background: `radial-gradient(85% 140% at 100% 50%, rgba(${frontCfg.rgb},.17) 0%, rgba(${frontCfg.rgb},.05) 40%, rgba(${frontCfg.rgb},0) 66%), radial-gradient(70% 90% at 0% 0%, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, rgba(15,22,33,.9), rgba(6,9,14,.92))`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,.32), inset 0 0 0 1px rgba(${frontCfg.rgb},.42), inset 0 -1px 0 rgba(0,0,0,.6), inset 0 0 60px rgba(${frontCfg.rgb},.07)`,
                    }}
                  />

                  {/* Chamfer line on active */}
                  {isFrontActive && (
                    <span
                      className="absolute left-0 top-0 h-[1px] w-[32%] pointer-events-none animate-[arChamfer_1.8s_cubic-bezier(.4,0,.2,1)_.15s_both]"
                      style={{
                        background: `linear-gradient(90deg, rgba(${frontCfg.rgb},0), ${frontCfg.pale} 50%, rgba(${frontCfg.rgb},0))`,
                        boxShadow: `0 0 5px rgba(${frontCfg.rgb},.4)`,
                      }}
                    />
                  )}

                  {/* Header Row */}
                  <div className="relative flex justify-between items-center gap-3 flex-wrap z-10">
                    <span className="font-mono text-xs tracking-wider text-[#8E99A8]">
                      {frontCfg.badge}
                    </span>
                    <span
                      className="flex items-center gap-2 font-mono text-xs tracking-wider"
                      style={{ color: frontCfg.accent }}
                    >
                      <span
                        className="w-[5px] h-[5px] rounded-full"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, #FFFFFF, ${frontCfg.accent} 70%)`,
                          boxShadow: `0 0 0 2px rgba(${frontCfg.rgb},.18), 0 0 8px rgba(${frontCfg.rgb},.8)`,
                        }}
                      />
                      {frontCfg.statusBadge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="relative text-[19px] font-semibold text-[#F8FAFC] tracking-tight leading-[1.3] z-10 m-0">
                    {frontCfg.title}
                  </h3>
                  <p className="relative text-[14.5px] font-normal text-[#9BA8B9] leading-[1.6] max-w-[540px] z-10 m-0">
                    {frontCfg.desc}
                  </p>
                </article>

                {/* BACK CARD (Group II) */}
                <article
                  tabIndex={0}
                  role="button"
                  data-testid={`b2c-adv-card-${backId}`}
                  onClick={() => {
                    soundEngine.playPulseNode();
                    onSelect(backId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(backId);
                    }
                  }}
                  className={`[grid-area:1/1] relative overflow-hidden rounded-2xl flex flex-col gap-2 cursor-pointer [backface-visibility:hidden] [transform:rotateX(180deg)] transition-all duration-500 border ${
                    isBackActive
                      ? 'border-white/20 shadow-2xl'
                      : 'border-white/[0.07] bg-gradient-to-br from-white/[0.032] to-white/[0.008] hover:border-white/15'
                  }`}
                  style={{
                    padding: '21px 26px',
                    pointerEvents: peB as any,
                    boxShadow: isBackActive
                      ? `0 1px 0 rgba(255,255,255,.04), 0 2px 0 rgba(0,0,0,.6), 0 21px 34px -13px rgba(0,0,0,.8), 0 34px 55px -34px rgba(${backCfg.rgb},.4)`
                      : '0 1px 0 rgba(255,255,255,.02), 0 13px 21px -13px rgba(0,0,0,.6)',
                  }}
                >
                  {/* Active Card Halo & Radial Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700"
                    style={{
                      opacity: isBackActive ? 1 : 0,
                      background: `radial-gradient(85% 140% at 100% 50%, rgba(${backCfg.rgb},.17) 0%, rgba(${backCfg.rgb},.05) 40%, rgba(${backCfg.rgb},0) 66%), radial-gradient(70% 90% at 0% 0%, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, rgba(15,22,33,.9), rgba(6,9,14,.92))`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,.32), inset 0 0 0 1px rgba(${backCfg.rgb},.42), inset 0 -1px 0 rgba(0,0,0,.6), inset 0 0 60px rgba(${backCfg.rgb},.07)`,
                    }}
                  />

                  {/* Chamfer line on active */}
                  {isBackActive && (
                    <span
                      className="absolute left-0 top-0 h-[1px] w-[32%] pointer-events-none animate-[arChamfer_1.8s_cubic-bezier(.4,0,.2,1)_.15s_both]"
                      style={{
                        background: `linear-gradient(90deg, rgba(${backCfg.rgb},0), ${backCfg.pale} 50%, rgba(${backCfg.rgb},0))`,
                        boxShadow: `0 0 5px rgba(${backCfg.rgb},.4)`,
                      }}
                    />
                  )}

                  {/* Header Row */}
                  <div className="relative flex justify-between items-center gap-3 flex-wrap z-10">
                    <span className="font-mono text-xs tracking-wider text-[#8E99A8]">
                      {backCfg.badge}
                    </span>
                    <span
                      className="flex items-center gap-2 font-mono text-xs tracking-wider"
                      style={{ color: backCfg.accent }}
                    >
                      <span
                        className="w-[5px] h-[5px] rounded-full"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, #FFFFFF, ${backCfg.accent} 70%)`,
                          boxShadow: `0 0 0 2px rgba(${backCfg.rgb},.18), 0 0 8px rgba(${backCfg.rgb},.8)`,
                        }}
                      />
                      {backCfg.statusBadge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="relative text-[19px] font-semibold text-[#F8FAFC] tracking-tight leading-[1.3] z-10 m-0">
                    {backCfg.title}
                  </h3>
                  <p className="relative text-[14.5px] font-normal text-[#9BA8B9] leading-[1.6] max-w-[540px] z-10 m-0">
                    {backCfg.desc}
                  </p>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
