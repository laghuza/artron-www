"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

export const Node01FederationWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3.5 rounded font-mono text-[11px] space-y-2.5 leading-relaxed">
    <div className="text-[#00E676] font-semibold flex justify-between">
      <span>&gt; CONNECTED FEDERATIONS:</span><span className="text-[10px] text-gray-500">AES-256</span>
    </div>
    <div className="space-y-1 text-gray-300">
      <div className="flex justify-between"><span>GEO_FOOTBALL_FED:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_BASKETBALL_FED:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_RUGBY_UNION:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
    </div>
  </div>
);

export const Node02BlueprintWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded space-y-2">
    <svg viewBox="0 0 380 120" strokeWidth="0.8" className="w-full stroke-gray-600/30 fill-none">
      <rect x="5" y="5" width="370" height="110" rx="3" />
      <line x1="110" y1="5" x2="110" y2="115" /><line x1="260" y1="5" x2="260" y2="115" />
      <path d="M50 100 L170 30 M170 30 L185 80 M185 80 L310 30" className="stroke-[#00E676]/40 stroke-[1] stroke-dasharray-[3_3]" />
      <circle cx="50" cy="100" r="6" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
      <circle cx="185" cy="80" r="6" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
      <circle cx="170" cy="30" r="8" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
    </svg>
    <div className="flex justify-between items-center font-mono text-[10px] text-gray-400">
      <span>TURNSTILE: <span className="text-[#00E676]">RFID_ACTIVE</span></span><span>LATENCY: 0.2ms</span>
    </div>
  </div>
);

export const Node03ProWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5 text-gray-300">
    <div className="text-[#D97736] font-bold">&gt; ATHLETE_PROFESSIONAL_NODES</div>
    <div className="flex justify-between"><span>SCHEDULING_ENGINE:</span><span className="text-[#00E676]">SYNC_OK</span></div>
    <div className="flex justify-between"><span>CONTRACT_LEDGER:</span><span className="text-[#00E676]">VERIFIED</span></div>
  </div>
);

export const Node04MobileWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5">
    <div className="text-[#00E676] font-bold">&gt; ATHLETE_MOBILE_OS_TELEMETRY</div>
    <div className="grid grid-cols-2 gap-2 text-gray-300">
      <div>HEART_RATE: <span className="text-[#00E676]">142 BPM</span></div>
      <div>GPS_TRACK: <span className="text-[#00E676]">LAT:41.71</span></div>
    </div>
  </div>
);

export const Node05MarketplaceWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded flex items-center justify-between font-mono text-[10px]">
    <div className="space-y-1">
      <div className="text-[#D4AF37] font-bold">COINS & ACHIEVEMENTS</div>
      <div className="text-gray-400">REWARD_TOKEN: <span className="text-[#00E676]">ARTRON_COIN</span></div>
    </div>
    <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">A</div>
  </div>
);

export const Node06MarketWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#D4AF37] font-bold">&gt; B2B_MARKETPLACE_GATEWAY</div>
    <div className="flex justify-between"><span>API_PARTNERS:</span><span className="text-[#00E676]">24 ACTIVE</span></div>
  </div>
);

export const Node07AnalyticsWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#9CA3AF] font-bold">&gt; ENNEACORE_ANALYTICS_ENGINE</div>
    <div className="flex justify-between"><span>TELEMETRY_NODES:</span><span className="text-[#00E676]">9 ONLINE</span></div>
  </div>
);

export const Node08GdprShieldWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-xs flex items-center space-x-3">
    <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-gray-400 fill-none">
      <path d="M50 10 C65 10, 80 15, 80 15 C80 15, 80 50, 50 80 C20 50, 20 15, 20 15 C20 15, 35 10, 50 10 Z" strokeWidth="1.5" />
      <path d="M35 45 L45 55 L65 35" className="stroke-[#00E676]" strokeWidth="2.5" strokeLinecap="round" />
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
  return (
    <div className="w-full space-y-5 font-mono animate-fadeIn pt-1">
      {/* Philosophical Header Badge */}
      <div className="text-[11px] text-[#00FF66] uppercase tracking-[0.18em] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
        [ ACCESS_GATEWAY // SELECTION ]
      </div>
      <p className="font-sans text-[13px] text-[#C2C7D0] leading-relaxed">
        სისტემური თვითორგანიზების ორი უნიკალური წერტილი. აირჩიეთ სესიის ტიპი:
      </p>

      {/* Choice Buttons Stack (Screen 2 Style: Wide, Reduced Height, Soft Glow) */}
      <div className="space-y-4 pt-1">
        {/* Button 1: MEMBERSHIP INIT */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onSelectSubChapter?.('membership-init');
            }}
            className="w-full py-2.5 px-4 bg-[#121418]/90 border border-[#00FF66]/60 hover:border-[#00FF66] hover:bg-[#00FF66]/10 text-[#00FF66] font-mono text-[12px] font-bold uppercase tracking-[1.8px] rounded-md transition-all duration-200 text-center shadow-sm cursor-pointer"
          >
            01 // MEMBERSHIP INIT
          </button>
          <p className="font-sans text-[12px] text-[#9CA3AF]/90 leading-relaxed px-1">
            სპორტულ-გამაჯანსაღებელი სუბიექტის (ფედერაცია, კლუბი, ათლეტი) პირველადი ინიციაცია და ბირთვთან დაკავშირება.
          </p>
        </div>

        {/* Button 2: CONSOLE ACCESS */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onSelectSubChapter?.('console-access');
            }}
            className="w-full py-2.5 px-4 bg-[#121418]/90 border border-[#00FF66]/60 hover:border-[#00FF66] hover:bg-[#00FF66]/10 text-[#00FF66] font-mono text-[12px] font-bold uppercase tracking-[1.8px] rounded-md transition-all duration-200 text-center shadow-sm cursor-pointer"
          >
            02 // CONSOLE ACCESS
          </button>
          <p className="font-sans text-[12px] text-[#9CA3AF]/90 leading-relaxed px-1">
            რეგისტრირებული ოპერატორის ავტორიზებული შესვლა მართვისა და ტელემეტრიის კონსოლში.
          </p>
        </div>
      </div>
    </div>
  );
};

