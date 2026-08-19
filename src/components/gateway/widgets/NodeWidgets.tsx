"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { useI18n } from '@/context/I18nContext';

export const Node01FederationWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3.5 rounded font-mono text-[11px] space-y-2.5 leading-relaxed">
    <div className="text-[#00ff87] font-semibold flex justify-between">
      <span>&gt; CONNECTED FEDERATIONS:</span><span className="text-[10px] text-gray-500">AES-256</span>
    </div>
    <div className="space-y-1 text-gray-300">
      <div className="flex justify-between"><span>GEO_FOOTBALL_FED:</span><span className="text-[#00ff87] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_BASKETBALL_FED:</span><span className="text-[#00ff87] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_RUGBY_UNION:</span><span className="text-[#00ff87] font-bold">● ACTIVE</span></div>
    </div>
  </div>
);

export const Node02BlueprintWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded space-y-2">
    <svg viewBox="0 0 380 120" strokeWidth="0.8" className="w-full stroke-gray-600/30 fill-none">
      <rect x="5" y="5" width="370" height="110" rx="3" />
      <line x1="110" y1="5" x2="110" y2="115" /><line x1="260" y1="5" x2="260" y2="115" />
      <path d="M50 100 L170 30 M170 30 L185 80 M185 80 L310 30" className="stroke-[#00ff87]/40 stroke-[1] stroke-dasharray-[3_3]" />
      <circle cx="50" cy="100" r="6" className="fill-[#121418] stroke-[#00ff87] stroke-[1.5]" />
      <circle cx="185" cy="80" r="6" className="fill-[#121418] stroke-[#00ff87] stroke-[1.5]" />
      <circle cx="170" cy="30" r="8" className="fill-[#121418] stroke-[#00ff87] stroke-[1.5]" />
    </svg>
    <div className="flex justify-between items-center font-mono text-[10px] text-gray-400">
      <span>TURNSTILE: <span className="text-[#00ff87]">RFID_ACTIVE</span></span><span>LATENCY: 0.2ms</span>
    </div>
  </div>
);

export const Node03ProWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5 text-gray-300">
    <div className="text-[#D97736] font-bold">&gt; ATHLETE_PROFESSIONAL_NODES</div>
    <div className="flex justify-between"><span>SCHEDULING_ENGINE:</span><span className="text-[#00ff87]">SYNC_OK</span></div>
    <div className="flex justify-between"><span>CONTRACT_LEDGER:</span><span className="text-[#00ff87]">VERIFIED</span></div>
  </div>
);

export const Node04MobileWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5">
    <div className="text-[#00ff87] font-bold">&gt; ATHLETE_MOBILE_OS_TELEMETRY</div>
    <div className="grid grid-cols-2 gap-2 text-gray-300">
      <div>HEART_RATE: <span className="text-[#00ff87]">142 BPM</span></div>
      <div>GPS_TRACK: <span className="text-[#00ff87]">LAT:41.71</span></div>
    </div>
  </div>
);

export const Node05MarketplaceWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded flex items-center justify-between font-mono text-[10px]">
    <div className="space-y-1">
      <div className="text-[#D4AF37] font-bold">COINS & ACHIEVEMENTS</div>
      <div className="text-gray-400">REWARD_TOKEN: <span className="text-[#00ff87]">ARTRON_COIN</span></div>
    </div>
    <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">A</div>
  </div>
);

export const Node06MarketWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#D4AF37] font-bold">&gt; B2B_MARKETPLACE_GATEWAY</div>
    <div className="flex justify-between"><span>API_PARTNERS:</span><span className="text-[#00ff87]">24 ACTIVE</span></div>
  </div>
);

export const Node07AnalyticsWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#9CA3AF] font-bold">&gt; ENNEACORE_ANALYTICS_ENGINE</div>
    <div className="flex justify-between"><span>TELEMETRY_NODES:</span><span className="text-[#00ff87]">9 ONLINE</span></div>
  </div>
);

export const Node08GdprShieldWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-xs flex items-center space-x-3">
    <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-gray-400 fill-none">
      <path d="M50 10 C65 10, 80 15, 80 15 C80 15, 80 50, 50 80 C20 50, 20 15, 20 15 C20 15, 35 10, 50 10 Z" strokeWidth="1.5" />
      <path d="M35 45 L45 55 L65 35" className="stroke-[#00ff87]" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <div>
      <div className="text-white font-bold text-[11px]">GDPR & ISO 27001 SECURE</div>
      <div className="text-[9px] text-gray-400">AES-256 PII Encrypted • 14-Day Purge</div>
    </div>
  </div>
);

/**
 * NODE 09: SYSTEM ACCESS GATEWAY (3-STEP ACCESSIBLE FLOW IN 40% SIDEBAR)
 */
export const Node09AccessWidget: React.FC<{ onSelectSubChapter?: (subId: string) => void }> = ({ onSelectSubChapter }) => {
  const { t } = useI18n();

  return (
    <div className="w-full space-y-3 font-mono animate-fadeIn pt-2">
      {/* Button 1: ORGANIZATION REGISTRATION / ONBOARDING */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          onSelectSubChapter?.('09.1');
        }}
        className="group w-full px-4 py-3.5 bg-[rgba(10,11,13,0.7)] border border-[rgba(0,176,255,0.35)] hover:border-[#00B0FF] hover:bg-[rgba(0,176,255,0.08)] rounded-md transition-all duration-200 flex items-center justify-between cursor-pointer hover:translate-x-[2px] shadow-sm"
      >
        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-white tracking-[1.2px] uppercase group-hover:text-[#00B0FF] transition-colors text-left">
          {t('gateway.membership_init_btn')}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-[#00B0FF] bg-[#00B0FF]/10 px-2 py-0.5 rounded border border-[#00B0FF]/30 uppercase tracking-wider">
            {t('gateway.membership_init_badge')}
          </span>
          <span className="font-mono text-[13px] text-[#00B0FF] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </div>
      </button>

      {/* Button 2: GUEST 1-HOUR DEMO ACCESS */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          onSelectSubChapter?.('09.2');
        }}
        className="group w-full px-4 py-3.5 bg-[rgba(10,11,13,0.7)] border border-[rgba(0,255,135,0.35)] hover:border-[#00ff87] hover:bg-[rgba(0,255,135,0.08)] rounded-md transition-all duration-200 flex items-center justify-between cursor-pointer hover:translate-x-[2px] shadow-sm"
      >
        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-white tracking-[1.2px] uppercase group-hover:text-[#00ff87] transition-colors text-left">
          {t('gateway.guest_demo_btn')}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30 uppercase tracking-wider">
            {t('gateway.guest_demo_badge')}
          </span>
          <span className="font-mono text-[13px] text-[#00ff87] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </div>
      </button>

      {/* Button 3: OPERATOR AUTHENTICATION */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          onSelectSubChapter?.('09.3');
        }}
        className="group w-full px-4 py-3.5 bg-[rgba(10,11,13,0.7)] border border-white/15 hover:border-white/40 hover:bg-white/5 rounded-md transition-all duration-200 flex items-center justify-between cursor-pointer hover:translate-x-[2px] shadow-sm"
      >
        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-gray-300 tracking-[1.2px] uppercase group-hover:text-white transition-colors text-left">
          {t('gateway.console_access_btn')}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/15 uppercase tracking-wider">
            {t('gateway.console_access_badge')}
          </span>
          <span className="font-mono text-[13px] text-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </div>
      </button>
    </div>
  );
};

