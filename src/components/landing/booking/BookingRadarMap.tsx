'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Wifi, MapPin, MessageCircle, Send } from 'lucide-react';

export const BookingRadarMap: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="lg:col-span-5 bg-[#05070a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
      {/* L-Shape Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/40" />

      <div className="space-y-5 flex flex-col h-full justify-between">
        <div>
          <span className="text-[10px] font-mono text-[#00A3FF] tracking-widest block mb-1 uppercase">
            [ LOC_RADAR // HQ_MAP ]
          </span>
          <h3 className="text-lg font-bold text-white uppercase">{t('booking_map_hq')}</h3>
          <p className="text-[11px] text-[#94A3B8] font-mono mt-1">{t('booking_map_coords')}</p>
        </div>

        {/* SVG Map Container */}
        <div className="relative w-full h-[210px] bg-[#05070a] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center select-none group">
          <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent top-0 animate-[scan_3s_linear_infinite]" />

          <svg viewBox="0 0 400 220" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105">
            <path
              d="M 50 140 Q 90 90 140 100 T 210 110 T 290 80 T 360 110 L 370 140 L 330 170 L 260 180 L 190 160 L 120 170 L 50 140 Z"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path d="M 160 120 L 290 110" fill="none" stroke="rgba(0,163,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 160 120 L 90 150" fill="none" stroke="rgba(0,255,135,0.2)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Pulsing Sonar Ring on Kutaisi HQ */}
            <circle cx="160" cy="120" r="10" fill="rgba(0,255,135,0.1)" stroke="rgba(0,255,135,0.3)" strokeWidth="1">
              <animate attributeName="r" values="8;32" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Nodes */}
            <circle cx="160" cy="120" r="5" fill="#00ff87" className="cursor-pointer" />
            <circle cx="290" cy="110" r="4.5" fill="#00A3FF" className="cursor-pointer" />
            <circle cx="90" cy="150" r="4.5" fill="#00e5ff" className="cursor-pointer" />

            {/* Text Labels */}
            <text x="165" y="115" fill="#00ff87" fontSize="8" fontFamily="monospace" fontWeight="bold">KUTAISI_HQ</text>
            <text x="295" y="105" fill="#00A3FF" fontSize="7" fontFamily="monospace">TBILISI_SYS</text>
            <text x="95" y="145" fill="#00e5ff" fontSize="7" fontFamily="monospace">BATUMI_SYS</text>
          </svg>

          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[8px] font-mono text-[#00ff87]/60">
            <Wifi className="w-3 h-3 text-[#00ff87]" />
            <span>HQ_PING: 4ms</span>
          </div>
        </div>

        {/* Status & Live Messenger Deep Links */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2 font-mono">
            <span className="text-[#94A3B8]">{t('booking_map_status')}</span>
            <span className="text-[#00ff87] font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />
              ONLINE
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <a
              href="https://wa.me/995599000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-[#25D366]/20 transition-all min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://t.me/artron_support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#0088CC]/10 border border-[#0088CC]/30 text-[#0088CC] text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-[#0088CC]/20 transition-all min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[9px] font-mono text-[#00A3FF]">
            <MapPin className="w-3 h-3" />
            <span>HQ ID: ARTRON-GEO-HQ-01</span>
          </div>
        </div>
      </div>
    </div>
  );
};
