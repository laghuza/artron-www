'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Wifi, MapPin, MessageCircle, Send, Radio, ShieldCheck, Server } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact';

export const PartnerNetworkRadar: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#080D17] via-[#05070A] to-[#030508] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden">
      {/* L-Shape Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff87]/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff87]/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff87]/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff87]/40" />

      {/* Atmospheric Glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-[#00A3FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Network Description & Partnership Triggers (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/25 text-[11px] font-mono font-bold text-[#00ff87] tracking-wider uppercase mb-3.5 shadow-[0_0_12px_rgba(0,255,135,0.15)]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#00ff87]" />
              <span>{t('partner_network_badge') || 'საქართველოს დაფარვის ქსელი // LIVE RADAR'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {t('partner_network_title') || 'საოპერაციო ქსელი და ცენტრალური შტაბ-ბინა'}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl font-medium">
              {t('partner_network_desc') || 'ართრონის საოპერაციო ცენტრი, IoT აპარატურის საინჟინრო ლაბორატორია და დაკავშირებული პარტნიორი ობიექტები მთელი საქართველოს მასშტაბით.'}
            </p>
          </div>

          {/* Network Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0C121D]/90 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-[#00ff87] text-[10px] font-mono font-bold uppercase">
                <Server className="w-3.5 h-3.5" />
                <span>KUTAISI HQ</span>
              </div>
              <div className="text-xs font-bold text-white">
                {locale === 'ka' ? 'ცენტრალური ჰაბი' : locale === 'ru' ? 'Центральный хаб' : 'Central Hub'}
              </div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Ping: 4ms // Primary Node</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0C121D]/90 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-[#00A3FF] text-[10px] font-mono font-bold uppercase">
                <Radio className="w-3.5 h-3.5" />
                <span>4 ACTIVE NODES</span>
              </div>
              <div className="text-xs font-bold text-white">
                {locale === 'ka' ? 'ქუთაისი • თერჯოლა • ბათუმი' : locale === 'ru' ? 'Кутаиси • Тержола • Батуми' : 'Kutaisi • Terjola • Batumi'}
              </div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Real-time IoT Sync</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0C121D]/90 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ENCRYPTED</span>
              </div>
              <div className="text-xs font-bold text-white">AES-256-GCM</div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Order №01-15/ნ Ready</div>
            </div>
          </div>

          {/* Partner Action Bar & Instant Deep Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={CONTACT_CONFIG.whatsapp.getUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.15)] min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={CONTACT_CONFIG.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#0088CC]/15 hover:bg-[#0088CC]/25 border border-[#0088CC]/40 text-[#0088CC] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,136,204,0.15)] min-h-[46px]"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Channel</span>
            </a>

            <div className="sm:ml-auto flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 justify-center">
              <MapPin className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>HQ ID: ARTRON-GEO-HQ-01</span>
            </div>
          </div>
        </div>

        {/* Right Column: Cyber Radar Map (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative w-full h-[260px] sm:h-[280px] bg-[#05070a] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center select-none group shadow-inner">
            <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent top-0 animate-[scan_3s_linear_infinite]" />

            <svg viewBox="0 0 400 220" className="w-full h-full opacity-85 transition-transform duration-500 group-hover:scale-105">
              <path
                d="M 50 140 Q 90 90 140 100 T 210 110 T 290 80 T 360 110 L 370 140 L 330 170 L 260 180 L 190 160 L 120 170 L 50 140 Z"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path d="M 90 150 L 155 120" fill="none" stroke="rgba(0,255,135,0.25)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 155 120 L 200 124" fill="none" stroke="rgba(0,255,135,0.4)" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 200 124 L 300 105" fill="none" stroke="rgba(0,163,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Pulsing Sonar Ring on Kutaisi HQ */}
              <circle cx="155" cy="120" r="10" fill="rgba(0,255,135,0.1)" stroke="rgba(0,255,135,0.3)" strokeWidth="1">
                <animate attributeName="r" values="8;32" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Pulse Ring on Terjola Gym */}
              <circle cx="200" cy="124" r="6" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.4)" strokeWidth="0.8">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Nodes */}
              <circle cx="155" cy="120" r="5" fill="#00ff87" className="cursor-pointer" />
              <circle cx="200" cy="124" r="4.5" fill="#38BDF8" className="cursor-pointer" />
              <circle cx="300" cy="105" r="4.5" fill="#00A3FF" className="cursor-pointer" />
              <circle cx="90" cy="150" r="4.5" fill="#00e5ff" className="cursor-pointer" />

              {/* Text Labels */}
              <text x="155" y="107" fill="#00ff87" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">KUTAISI_HQ</text>
              <text x="200" y="140" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TERJOLA_GYM</text>
              <text x="300" y="94" fill="#00A3FF" fontSize="7" fontFamily="monospace" textAnchor="middle">TBILISI_SYS</text>
              <text x="90" y="166" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle">BATUMI_SYS</text>
            </svg>

            {/* Live Ping Status Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#05070a]/90 border border-[#00ff87]/20 text-[9px] font-mono text-[#00ff87]">
              <Wifi className="w-3 h-3 text-[#00ff87] animate-pulse" />
              <span>HQ_PING: 4ms</span>
            </div>

            {/* Live Status Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#05070a]/90 border border-white/10 text-[9px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />
              <span className="text-white font-bold">ONLINE</span>
            </div>

            {/* Coordinates Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-mono text-[#94A3B8]/70">
              <span>{t('booking_map_coords') || '42.2496° N, 42.7015° E'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
