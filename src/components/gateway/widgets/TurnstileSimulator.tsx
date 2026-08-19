"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

export const TurnstileSimulator: React.FC = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'GRANTED'>('IDLE');
  const [logCount, setLogCount] = useState(1482);

  const handleScan = () => {
    if (status === 'SCANNING') return;
    setStatus('SCANNING');
    soundEngine.playPulseNode();

    setTimeout(() => {
      setStatus('GRANTED');
      soundEngine.playSystemAccess();
      setLogCount((prev) => prev + 1);

      setTimeout(() => {
        setStatus('IDLE');
      }, 3500);
    }, 800);
  };

  return (
    <div className="w-full bg-[#12161A]/90 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-md animate-fadeIn select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
          <h4 className="text-[12px] font-mono font-bold text-white uppercase tracking-[1.5px]">
            {t('simulators.turnstile_title')}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#9CA3AF]">
          LOG #{logCount}
        </span>
      </div>

      <p className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
        {t('simulators.turnstile_desc')}
      </p>

      {/* Visual Barrier State Box */}
      <div className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-300 ${
        status === 'GRANTED'
          ? 'bg-[#00ff87]/15 border-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.25)]'
          : status === 'SCANNING'
          ? 'bg-[#00B0FF]/15 border-[#00B0FF] animate-pulse'
          : 'bg-[#0D0F13] border-white/5'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-[14px] font-bold transition-all ${
            status === 'GRANTED'
              ? 'bg-[#00ff87] text-[#0A0D10] shadow-[0_0_15px_#00ff87]'
              : status === 'SCANNING'
              ? 'bg-[#00B0FF] text-white'
              : 'bg-white/10 text-[#9CA3AF]'
          }`}>
            {status === 'GRANTED' ? '🔓' : status === 'SCANNING' ? '⚡' : '🔒'}
          </div>
          <div>
            <div className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">
              {status === 'GRANTED'
                ? t('simulators.turnstile_granted')
                : status === 'SCANNING'
                ? t('simulators.turnstile_scanning')
                : 'TURNIKET_BARRIER_01: LOCKED'}
            </div>
            <div className="text-[10px] font-mono text-[#9CA3AF]">
              RFID: 48A9-FC21 | SPEED: 0.8s | ANTI-PASSBACK: ON
            </div>
          </div>
        </div>

        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
          status === 'GRANTED' ? 'bg-[#00ff87] text-[#090b0e]' : 'bg-white/5 text-[#9CA3AF]'
        }`}>
          {status === 'GRANTED' ? 'OPEN' : 'STANDBY'}
        </span>
      </div>

      <button
        type="button"
        onClick={handleScan}
        disabled={status === 'SCANNING'}
        className="w-full py-3 bg-[#00ff87] hover:bg-[#00e676] text-[#0A0D10] font-mono text-[12px] font-bold uppercase tracking-[1.5px] rounded-lg shadow-[0_0_15px_rgba(0,255,135,0.3)] transition-all cursor-pointer disabled:opacity-50"
      >
        {status === 'SCANNING' ? t('simulators.turnstile_scanning') : t('simulators.turnstile_scan_btn')}
      </button>
    </div>
  );
};
