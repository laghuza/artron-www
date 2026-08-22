'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  TrendingUp, 
  Cpu, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

export const BusinessStatsShowcase: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="business-stats" className="py-20 px-4 md:px-8 bg-[#0B0F17] relative overflow-hidden border-b border-white/5 studio-grain">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" /> [SYS: BUSINESS_METRICS]
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t('stats_sec_title')}
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium">
            {t('stats_sec_subtitle')}
          </p>
        </div>

        {/* 4-Card Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: LTV & Churn Recovery */}
          <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 163, 255, 0.2)">
            <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/30 transition-colors duration-300 h-full">
            {/* L-Shape Corner Brackets — brand blue */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00A3FF]/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono text-[#00A3FF]/70 font-bold">[ MODULE: WIN_BACK_CRM ]</span>
                <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center border border-[#00A3FF]/20">
                  <TrendingUp className="w-4.5 h-4.5 text-[#00A3FF]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{t('stats_card_ltv_title')}</h3>
              <div className="text-3xl font-black text-[#00A3FF] font-mono mb-1">{t('stats_card_ltv_metric')}</div>
              <p className="text-[10px] text-[#94A3B8] uppercase font-mono tracking-wider mb-4">{t('stats_card_ltv_sub')}</p>
              
              <ul className="space-y-2 border-t border-white/5 pt-4 mb-6">
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_ltv_feat1')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_ltv_feat2')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_ltv_feat3')}</span>
                </li>
              </ul>
            </div>

            {/* Custom SVG Mini-Chart */}
            <div className="bg-[#0B0F17]/50 border border-white/5 rounded-xl p-2.5">
              <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 50">
                <path d="M10 40 Q 50 15, 90 35 T 180 10" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                <path d="M10 40 Q 50 15, 90 35 T 180 10 L 180 45 L 10 45 Z" fill="rgba(0,229,255,0.05)" />
                <circle cx="90" cy="35" r="2.5" fill="#00e5ff" />
                <circle cx="180" cy="10" r="3" fill="#00ff87" />
                <text x="180" y="24" fill="#00ff87" fontSize="7" fontWeight="bold" fontFamily="monospace">RECOVERED</text>
              </svg>
            </div>
            </div>
          </TiltSpotlightCard>

          {/* Card 2: IoT Access Automation */}
          <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 163, 255, 0.2)">
            <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/30 transition-colors duration-300 h-full">
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00A3FF]/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono text-[#00A3FF]/70 font-bold">[ MODULE: IoT_RELAY_GATE ]</span>
                <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center border border-[#00A3FF]/20">
                  <Cpu className="w-4.5 h-4.5 text-[#00A3FF]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{t('stats_card_iot_title')}</h3>
              <div className="text-3xl font-black text-[#00A3FF] font-mono mb-1">{t('stats_card_iot_metric')}</div>
              <p className="text-[10px] text-[#94A3B8] uppercase font-mono tracking-wider mb-4">{t('stats_card_iot_sub')}</p>
              
              <ul className="space-y-2 border-t border-white/5 pt-4 mb-6">
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_iot_feat1')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_iot_feat2')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_iot_feat3')}</span>
                </li>
              </ul>
            </div>

            {/* Custom SVG Peak hour Bar Chart */}
            <div className="bg-[#0B0F17]/50 border border-white/5 rounded-xl p-2.5">
              <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 50">
                <rect x="10" y="35" width="12" height="10" fill="rgba(255,255,255,0.1)" rx="1" />
                <rect x="30" y="30" width="12" height="15" fill="rgba(255,255,255,0.1)" rx="1" />
                <rect x="50" y="25" width="12" height="20" fill="rgba(255,255,255,0.2)" rx="1" />
                <rect x="70" y="15" width="12" height="30" fill="url(#blue-accent)" rx="1" />
                <rect x="90" y="10" width="12" height="35" fill="url(#blue-accent)" rx="1" />
                <rect x="110" y="5" width="12" height="40" fill="url(#green-accent)" rx="1" />
                <rect x="130" y="15" width="12" height="30" fill="url(#blue-accent)" rx="1" />
                <rect x="150" y="28" width="12" height="17" fill="rgba(255,255,255,0.1)" rx="1" />
                <rect x="170" y="32" width="12" height="13" fill="rgba(255,255,255,0.1)" rx="1" />
                <defs>
                  <linearGradient id="blue-accent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="green-accent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff87" />
                    <stop offset="100%" stopColor="#00ff87" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            </div>
          </TiltSpotlightCard>

          {/* Card 3: Labor Compliance (Order №01-15/ნ) */}
          <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 163, 255, 0.2)">
            <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/30 transition-colors duration-300 h-full">
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00A3FF]/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono text-[#00A3FF]/70 font-bold">[ REG: LABOR_COMPLIANCE ]</span>
                <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center border border-[#00A3FF]/20">
                  <Clock className="w-4.5 h-4.5 text-[#00A3FF]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{t('stats_card_labor_title')}</h3>
              <div className="text-3xl font-black text-[#00A3FF] font-mono mb-1">{t('stats_card_labor_metric')}</div>
              <p className="text-[10px] text-[#94A3B8] uppercase font-mono tracking-wider mb-4">{t('stats_card_labor_sub')}</p>
              
              <ul className="space-y-2 border-t border-white/5 pt-4 mb-6">
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_labor_feat1')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_labor_feat2')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_labor_feat3')}</span>
                </li>
              </ul>
            </div>

            {/* Custom Terminal log simulator */}
            <div className="bg-[#0B0F17]/70 border border-white/5 rounded-xl p-2.5 font-mono text-[8px] text-[#94A3B8] space-y-1 select-none">
              <div className="flex items-center gap-1 text-emerald-400">
                <Terminal className="w-3 h-3" />
                <span>AUDIT_LOG // SYSTEM_OK</span>
              </div>
              <div>[09:00:15] Shift 01: CHECK_IN (NFC)</div>
              <div>[18:00:42] Shift 02: CHECK_OUT (NFC)</div>
              <div className="text-[#00ff87] font-bold">[VERIFY: 100% COMPLIANT]</div>
            </div>
            </div>
          </TiltSpotlightCard>

          {/* Card 4: Trainer Performance */}
          <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 163, 255, 0.2)">
            <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/30 transition-colors duration-300 h-full">
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00A3FF]/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00A3FF]/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono text-[#00A3FF]/70 font-bold">[ MODULE: PT_COMMISSION ]</span>
                <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center border border-[#00A3FF]/20">
                  <Users className="w-4.5 h-4.5 text-[#00A3FF]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{t('stats_card_trainers_title')}</h3>
              <div className="text-3xl font-black text-[#00A3FF] font-mono mb-1">{t('stats_card_trainers_metric')}</div>
              <p className="text-[10px] text-[#94A3B8] uppercase font-mono tracking-wider mb-4">{t('stats_card_trainers_sub')}</p>
              
              <ul className="space-y-2 border-t border-white/5 pt-4 mb-6">
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_trainers_feat1')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_trainers_feat2')}</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                  <span>{t('stats_card_trainers_feat3')}</span>
                </li>
              </ul>
            </div>

            {/* Custom Leaderboard visualization */}
            <div className="bg-[#0B0F17]/50 border border-white/5 rounded-xl p-2.5 space-y-1.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono">
                  <span className="text-white">PT Bookings Growth</span>
                  <span className="text-[#00ff87] font-bold">135%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00e5ff] to-[#00ff87] h-full rounded-full w-[85%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono">
                  <span className="text-white">Trainer Rating Avg</span>
                  <span className="text-[#00e5ff] font-bold">4.85 ★</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00e5ff] h-full rounded-full w-[95%]" />
                </div>
              </div>
            </div>
            </div>
          </TiltSpotlightCard>

        </div>

      </div>
    </section>
  );
};
