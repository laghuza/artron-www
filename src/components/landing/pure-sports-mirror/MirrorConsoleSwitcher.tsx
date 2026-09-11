'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MasterDimensionId, MIRROR_DIMENSIONS } from './mirrorDataMatrix';
import { MirrorIcon } from './MirrorIcon';

interface MirrorConsoleSwitcherProps {
  activeTab: MasterDimensionId;
  onSelectTab: (tabId: MasterDimensionId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  playTactileThud: () => void;
}

const TABS: { id: MasterDimensionId; label: string; icon: string; shortLabel: string }[] = [
  { id: 'venues', label: 'I. სპორტული სივრცეები', icon: 'landmark', shortLabel: 'I. სივრცეები' },
  { id: 'workforce', label: 'II. ადამიანური კაპიტალი', icon: 'users', shortLabel: 'II. კაპიტალი' },
  { id: 'mastery', label: 'III. ოსტატობა & ტიტულები', icon: 'trophy', shortLabel: 'III. ოსტატობა' },
];

export const MirrorConsoleSwitcher: React.FC<MirrorConsoleSwitcherProps> = ({
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  playTactileThud,
}) => {
  const handleTabClick = (tabId: MasterDimensionId) => {
    if (tabId !== activeTab) {
      playTactileThud();
      onSelectTab(tabId);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
      {/* 3 Master Console Switcher Tabs */}
      <div
        role="tablist"
        aria-label="Sports Mirror Console Tabs"
        className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center p-1.5 rounded-2xl bg-[#0D121B]/95 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.45)] backdrop-blur-xl"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`mirror-tabpanel-${tab.id}`}
              id={`mirror-tab-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-3 sm:px-6 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMasterConsoleTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0055FF]/30 via-[#00A3FF]/20 to-[#00E5FF]/20 border border-[#00A3FF]/60 shadow-[0_0_24px_rgba(0,163,255,0.4)]"
                />
              )}
              <MirrorIcon name={tab.icon} isActive={isActive} size={16} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline tracking-wide">{tab.label}</span>
              <span className="relative z-10 sm:hidden tracking-tight">{tab.shortLabel}</span>
              {isActive && (
                <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Audio Haptic Feedback & Status Toggle */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'ხმის ჩართვა' : 'ხმის გათიშვა'}
          title={isMuted ? 'ტაქტილური ხმის ჩართვა' : 'ტაქტილური ხმის გათიშვა'}
          className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl bg-[#0F1622]/80 hover:bg-[#162030] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]"
        >
          <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
          <span className="hidden md:inline">{isMuted ? 'AUDIO OFF' : 'PS5 AUDIO ON'}</span>
        </button>
      </div>
    </div>
  );
};
