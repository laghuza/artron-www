"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

interface TemporaryGuestDashboardProps {
  onExit: () => void;
}

export const TemporaryGuestDashboard: React.FC<TemporaryGuestDashboardProps> = ({ onExit }) => {
  const { t } = useI18n();
  const [secondsRemaining, setSecondsRemaining] = useState(3599);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleExitPass = () => {
    soundEngine.playPulseNode();
    onExit();
  };


  return (
    <div className="w-full h-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden bg-[#0A0B0D] text-white font-mono flex flex-col justify-between p-4 md:p-6 select-none animate-fadeIn">
      {/* Header HUD Bar */}
      <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#00ff87]/30 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#00ff87] animate-pulse" />
          <h1 className="text-[11px] md:text-[14px] font-bold text-[#00ff87] tracking-[2px] uppercase">
            {t('dashboard.guest_telemetry')}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-[#1A1D23] px-3 py-1 rounded md:py-1.5 border border-[#00ff87]/20 text-[10px] md:text-[11px]">
            <span className="text-[#9CA3AF]">{t('dashboard.session_timer')}</span>
            <span className="text-[#00ff87] font-bold tracking-widest">{formatTime(secondsRemaining)}</span>
          </div>

          <button
            type="button"
            onClick={handleExitPass}
            className="px-3.5 py-1 rounded bg-[#FF5252]/10 hover:bg-[#FF5252] text-[#FF5252] hover:text-white border border-[#FF5252]/30 text-[10px] md:text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
            style={{ minHeight: '36px' }}
          >
            ✕ {t('actions.exit_guest_pass')}
          </button>
        </div>
      </header>

      {/* Main Single-Page Grid Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 my-6 overflow-y-auto">
        {/* Metric Card 1: Active Athletes */}
        <div className="bg-[#101318] border border-[rgba(156,163,175,0.15)] rounded-lg p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex justify-between items-center text-[11px] text-[#9CA3AF] mb-3">
              <span>METRIC #01</span>
              <span className="text-[#00ff87]">LIVE</span>
            </div>
            <h3 className="text-[13px] font-bold text-white tracking-wider uppercase mb-1">
              {t('dashboard.active_athletes')}
            </h3>
            <p className="text-[28px] font-bold text-[#00ff87] tracking-tight">142 / 150</p>
          </div>
          <p className="text-[10px] text-[#9CA3AF] border-t border-[rgba(156,163,175,0.15)] pt-3 mt-4">
            {t('dashboard.read_only_stream')}
          </p>
        </div>

        {/* Metric Card 2: Biometric Stream */}
        <div className="bg-[#101318] border border-[rgba(156,163,175,0.15)] rounded-lg p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex justify-between items-center text-[11px] text-[#9CA3AF] mb-3">
              <span>METRIC #02</span>
              <span className="text-[#00B0FF]">STREAMING</span>
            </div>
            <h3 className="text-[13px] font-bold text-white tracking-wider uppercase mb-1">
              {t('dashboard.heart_rate_sensors')}
            </h3>
            <p className="text-[28px] font-bold text-[#00B0FF] tracking-tight">99.4% SYNC</p>
          </div>
          <p className="text-[10px] text-[#9CA3AF] border-t border-[rgba(156,163,175,0.15)] pt-3 mt-4">
            {t('dashboard.mqtt_active')}
          </p>
        </div>

        {/* Metric Card 3: Gate RFID Status */}
        <div className="bg-[#101318] border border-[rgba(156,163,175,0.15)] rounded-lg p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex justify-between items-center text-[11px] text-[#9CA3AF] mb-3">
              <span>METRIC #03</span>
              <span className="text-[#D4AF37]">SECURE</span>
            </div>
            <h3 className="text-[13px] font-bold text-white tracking-wider uppercase mb-1">
              {t('dashboard.facility_turnstiles')}
            </h3>
            <p className="text-[28px] font-bold text-[#D4AF37] tracking-tight">ALL ONLINE</p>
          </div>
          <p className="text-[10px] text-[#9CA3AF] border-t border-[rgba(156,163,175,0.15)] pt-3 mt-4">
            {t('dashboard.edge_scans_ready')}
          </p>
        </div>
      </main>

      {/* Footer Info Bar */}
      <footer className="w-full flex items-center justify-between border-t border-[rgba(156,163,175,0.15)] pt-3 text-[10px] text-[#9CA3AF]">
        <span>ARTRON OS // GUEST ACCESS PROTOCOL V10.6</span>
        <span>{t('actions.press_esc_exit')}</span>
      </footer>
    </div>
  );
};
