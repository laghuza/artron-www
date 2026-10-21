'use client';

import React from 'react';
import { MOBILE_SCREENS_CONFIG } from './mobileShowcaseConfig';

interface MobileLogicPanelProps {
  activeId: number;
}

export const MobileLogicPanel: React.FC<MobileLogicPanelProps> = ({ activeId }) => {
  const cfg = MOBILE_SCREENS_CONFIG[activeId];

  return (
    <div
      className="w-full max-w-[440px] flex flex-col gap-3 p-4 sm:px-5 sm:py-4 rounded-[14px] border border-white/[0.08]"
      style={{
        background:
          'linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008) 55%)',
        boxShadow:
          'inset 0 0 0 1px rgba(226,232,240,0.08), 0 24px 40px -26px rgba(0,0,0,0.8)',
      }}
    >
      <div className="flex justify-between items-center gap-3 flex-wrap font-mono text-[11px]">
        <span className="tracking-[0.12em] text-[#8E99A8]">{cfg.code}</span>
        <span
          className="tracking-[0.14em] font-semibold transition-colors duration-500"
          style={{ color: cfg.accent }}
        >
          ƒ · LOGIC
        </span>
      </div>

      <div className="font-mono text-[15px] leading-[1.5] text-[#F8FAFC] py-2.5 border-t border-b border-white/[0.08] tabular-nums">
        {cfg.logicFormula}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cfg.logicParams.map((p, idx) => (
          <div key={idx} className="flex flex-col gap-1 min-w-0 font-mono">
            <span className="text-[10px] tracking-[0.12em] text-[#8E99A8] uppercase truncate">
              {p.k}
            </span>
            <span className="text-[13px] text-[#F8FAFC] tabular-nums truncate">
              {p.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

