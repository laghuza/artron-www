'use client';

import React from 'react';
import { SubPillItem } from './mirrorDataMatrix';
import { MirrorIcon } from './MirrorIcon';

interface MirrorSubPillsProps {
  pills: SubPillItem[];
  activePillId: string;
  onSelectPill: (pillId: string) => void;
  playTactileClick: () => void;
}

export const MirrorSubPills: React.FC<MirrorSubPillsProps> = ({
  pills,
  activePillId,
  onSelectPill,
  playTactileClick,
}) => {
  const handlePillClick = (id: string) => {
    if (id !== activePillId) {
      playTactileClick();
      onSelectPill(id);
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Scrollable Chip Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {pills.map((pill) => {
          const isActive = pill.id === activePillId;
          return (
            <button
              key={pill.id}
              onClick={() => handlePillClick(pill.id)}
              className={`snap-start flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] ${
                isActive
                  ? 'bg-[#00A3FF]/15 border-[#00A3FF] text-white shadow-[0_0_18px_rgba(0,163,255,0.25)]'
                  : 'bg-[#0D121B]/70 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-[#121824]'
              }`}
            >
              <MirrorIcon name={pill.icon} isActive={isActive} size={16} />
              <span className="tracking-tight">{pill.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
