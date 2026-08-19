"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

export const AiChurnSimulator: React.FC = () => {
  const { t } = useI18n();
  const [isScanned, setIsScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    soundEngine.playPulseNode();

    setTimeout(() => {
      setScanning(false);
      setIsScanned(true);
      soundEngine.playSystemAccess();
    }, 700);
  };

  return (
    <div className="w-full bg-[#12161A]/90 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-md animate-fadeIn select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] animate-pulse" />
          <h4 className="text-[12px] font-mono font-bold text-white uppercase tracking-[1.5px]">
            {t('simulators.churn_title')}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/30">
          ML_ENGINE: ACTIVE
        </span>
      </div>

      <p className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
        {t('simulators.churn_desc')}
      </p>

      {/* AI Diagnostic Output Card */}
      {isScanned ? (
        <div className="space-y-3 animate-fadeIn">
          <div className="p-3 bg-[#00A3FF]/10 border border-[#00A3FF]/30 rounded-lg space-y-2">
            <div className="text-[12px] font-mono font-bold text-[#00A3FF]">
              {t('simulators.churn_recovered')}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-white">
              <div className="bg-[#090b0e] p-2 rounded border border-white/5">
                <span className="text-[#9CA3AF] block text-[9px]">დაბრუნების პროგნოზი</span>
                <span className="text-[#00ff87] font-bold text-[13px]">+22.4% (4-5 წევრი)</span>
              </div>
              <div className="bg-[#090b0e] p-2 rounded border border-white/5">
                <span className="text-[#9CA3AF] block text-[9px]">შენარჩუნებული MRR</span>
                <span className="text-[#00ff87] font-bold text-[13px]">+₾680.00 / თვე</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[#090b0e] border border-white/5 rounded text-[10px] font-mono text-[#9CA3AF]">
            📩 GoSMS Template: <em>„გამარჯობა! გვენატრები Artron Gym-ში. დაბრუნდი 7 დღეში და მიიღე -20% ფასდაკლება ან უფასო პერსონალური ვარჯიში.“</em>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#0D0F13] border border-dashed border-white/10 rounded-lg text-center font-mono text-[11px] text-[#9CA3AF]">
          [ დააჭირეთ ღილაკს 100 წევრის ML ანალიზის გასაშვებად ]
        </div>
      )}

      <button
        type="button"
        onClick={handleScan}
        disabled={scanning}
        className="w-full py-3 bg-[#00A3FF] hover:bg-[#0088CC] text-white font-mono text-[12px] font-bold uppercase tracking-[1.5px] rounded-lg shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
      >
        {scanning ? t('simulators.churn_scanning') : t('simulators.churn_scan_btn')}
      </button>
    </div>
  );
};
