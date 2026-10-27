'use client';

import React from 'react';
import { MOBILE_SCREENS_CONFIG, SCREEN_ORDER } from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface MobileTopControlsProps {
  activeId: number;
  onSelect: (id: number) => void;
}

export const MobileTopControls: React.FC<MobileTopControlsProps> = ({
  activeId,
  onSelect,
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

  return (
    <div className="w-full max-w-[420px] mx-auto flex items-center justify-between gap-3 flex-wrap px-1">
      {/* Group Pills */}
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
          className={`flex items-center gap-2 min-h-[44px] px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
            !isGroup2
              ? 'bg-gradient-to-b from-white/10 to-white/[0.03] text-white border border-white/20 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <span className="font-mono text-xs text-[#00A3FF]">I</span>
          <span>წვდომა</span>
        </button>
        <button
          type="button"
          onClick={() => handleGroupToggle(1)}
          className={`flex items-center gap-2 min-h-[44px] px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
            isGroup2
              ? 'bg-gradient-to-b from-white/10 to-white/[0.03] text-white border border-white/20 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <span className="font-mono text-xs text-[#FFAE85]">II</span>
          <span>პროგრესი</span>
        </button>
      </div>

      {/* 01 / 08 Indicator & Ticks */}
      <div className="flex items-center gap-2.5">
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
                  marginLeft: idx === 4 ? '4px' : '0px',
                  width: isActive ? '14px' : '6px',
                  height: '3px',
                  borderRadius: '1.5px',
                  backgroundColor: isActive
                    ? MOBILE_SCREENS_CONFIG[id].accent
                    : isGroupActive
                    ? 'rgba(226,232,240,0.35)'
                    : 'rgba(226,232,240,0.12)',
                  transition: 'all 0.3s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
