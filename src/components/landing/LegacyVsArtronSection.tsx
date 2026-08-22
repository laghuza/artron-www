'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Zap, 
  ShieldCheck, 
  FileSpreadsheet, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  Clock, 
  ShieldAlert,
  DownloadCloud
} from 'lucide-react';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

export const LegacyVsArtronSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'speed' | 'revenue' | 'compliance'>('all');

  const comparisonRows = [
    {
      id: 'speed',
      category: t('comparison.checkin_title'),
      icon: Zap,
      accentColor: '#00A3FF',
      legacy: {
        title: t('comparison.checkin_legacy'),
        detail: '3-4 წთ რიგები რეცეფციასთან, ხელით ძებნა ჟურნალში ან Excel-ში',
        detailEn: '3-4 min desk queues, manual search in logbook or Excel',
        detailRu: '3-4 мин очереди на стойке, ручной поиск в журнале или Excel',
        status: 'negative',
      },
      artron: {
        title: t('comparison.checkin_artron'),
        detail: 'Dynamic QR / NFC / Face ID მყისიერი ვალიდაცია, 0 რიგი',
        detailEn: 'Dynamic QR / NFC / Face ID instant validation, 0 queue',
        detailRu: 'Dynamic QR / NFC / Face ID мгновенная валидация, 0 очередей',
        badge: '+450% SPEED',
        status: 'positive',
      },
    },
    {
      id: 'revenue',
      category: t('comparison.leakage_title'),
      icon: ShieldCheck,
      accentColor: '#00ff87',
      legacy: {
        title: t('comparison.leakage_legacy'),
        detail: '10-15% გაპარული ან გაუვალიდებელი ვიზიტორი, მეგობრული დაშვებები',
        detailEn: '10-15% unpaid / unverified visits, unauthorized friend entries',
        detailRu: '10-15% неоплаченных визитов, пропуски по знакомству',
        status: 'negative',
      },
      artron: {
        title: t('comparison.leakage_artron'),
        detail: 'მკაცრი Anti-Passback & სოკეტ-რელე ტურნიკეტის ავტო-ბლოკით',
        detailEn: 'Strict Anti-Passback & direct socket relay hardware auto-lock',
        detailRu: 'Строгий Anti-Passback и аппаратная авто-блокировка турникета',
        badge: '0% LEAKAGE',
        status: 'positive',
      },
    },
    {
      id: 'compliance',
      category: t('comparison.labor_title'),
      icon: FileSpreadsheet,
      accentColor: '#00A3FF',
      legacy: {
        title: t('comparison.labor_legacy'),
        detail: '40+ საათი თვეში ხელით ტაბელირება, შრომის ინსპექციის ჯარიმების რისკი',
        detailEn: '40+ hrs/mo manual logging, high labor audit penalty risk',
        detailRu: '40+ ч/мес ручное заполнение табелей, риск штрафов трудовой инспекции',
        status: 'negative',
      },
      artron: {
        title: t('comparison.labor_artron'),
        detail: 'ტურნიკეტის ტელემეტრიიდან ავტომატური გენერირება კანონის 100% დაცვით',
        detailEn: 'Auto-generated from turnstile telemetry, 100% labor law compliant',
        detailRu: 'Авто-генерация из телеметрии турникета, 100% соблюдение закона',
        badge: '1-CLICK EXPORT',
        status: 'positive',
      },
    },
    {
      id: 'winback',
      category: t('comparison.winback_title'),
      icon: RotateCcw,
      accentColor: '#00ff87',
      legacy: {
        title: t('comparison.winback_legacy'),
        detail: 'ვადაგასული აბონემენტების 0% რეაქტივაცია, დაკარგული მომხმარებელი',
        detailEn: '0% reactivation of lapsed memberships, permanent customer loss',
        detailRu: '0% реактивации истекших абонементов, безвозвратная потеря клиентов',
        status: 'negative',
      },
      artron: {
        title: t('comparison.winback_artron'),
        detail: 'AI Pipeline & პერსონალიზებული SMS/Push ტრიგერები ავტო-დაბრუნებისთვის',
        detailEn: 'AI Pipeline & automated personalized SMS/Push triggers for retention',
        detailRu: 'AI Pipeline и автоматические SMS/Push триггеры возврата',
        badge: '+22% WIN-BACK',
        status: 'positive',
      },
    },
  ];

  const filteredRows = activeTab === 'all' 
    ? comparisonRows 
    : comparisonRows.filter(r => r.id === activeTab);

  return (
    <section id="legacy-vs-artron" className="py-20 md:py-28 px-4 md:px-8 bg-[#080B10] relative overflow-hidden border-b border-white/5 studio-grain">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A3FF]/8 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00ff87]/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header & Brand Philosophy */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/25 text-xs font-mono font-bold text-[#00A3FF] mb-5 tracking-wider uppercase shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
            <span>[ SYS: PARADIGM_SHIFT // LEGACY VS ARTRON ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 uppercase font-sans">
            ARTRON SPORTS OS
          </h2>

          <div className="inline-block border-l-2 md:border-l-0 md:border-y border-[#00A3FF]/40 pl-3 md:pl-0 md:py-1.5 mb-5">
            <p className="font-mono text-xs sm:text-sm md:text-base text-[#00A3FF] tracking-[0.2em] uppercase font-bold">
              {t('system.motto')}
            </p>
          </div>

          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('system.description')}
          </p>
        </div>

        {/* The Comparison Board */}
        <div className="bg-[#0B0F17]/90 border border-white/10 rounded-3xl p-5 sm:p-7 md:p-10 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] relative overflow-hidden mb-12">
          {/* Top Board Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#00A3FF] text-lg">⚡</span>
                <h3 className="text-base sm:text-xl font-bold font-mono text-white tracking-wide uppercase">
                  {t('comparison.title')}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#64748B] mt-1">
                [ DIRECT IMPACT ON GYM OPERATIONAL EBITDA & CUSTOMER FLOW ]
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-[#00A3FF] bg-[#00A3FF]/15 px-3.5 py-1.5 rounded-lg border border-[#00A3FF]/30 shadow-[0_0_12px_rgba(0,163,255,0.2)]">
                ROI +300%
              </span>
              <span className="text-xs font-mono font-bold text-[#00ff87] bg-[#00ff87]/15 px-3.5 py-1.5 rounded-lg border border-[#00ff87]/30 shadow-[0_0_12px_rgba(0,255,135,0.15)]">
                0% LEAKAGE
              </span>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            {filteredRows.map((row) => {
              const IconComponent = row.icon;
              return (
                <TiltSpotlightCard
                  key={row.id}
                  maxTilt={5}
                  spotlightColor={row.accentColor === '#00ff87' ? 'rgba(0, 255, 135, 0.15)' : 'rgba(0, 163, 255, 0.15)'}
                >
                  <div className="bg-[#05070a]/90 border border-white/10 hover:border-[#00A3FF]/40 transition-all duration-300 rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between h-full group">
                    {/* Corner Accent Brackets */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00A3FF]/30" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00A3FF]/30" />

                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center border"
                            style={{
                              backgroundColor: `${row.accentColor}15`,
                              borderColor: `${row.accentColor}35`,
                              color: row.accentColor
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-[#64748B] tracking-widest uppercase block">
                              [ PILLAR: {row.id.toUpperCase()} ]
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-white font-sans">
                              {row.category}
                            </h4>
                          </div>
                        </div>

                        <span 
                          className="text-[10px] font-mono font-black px-2.5 py-1 rounded-md border"
                          style={{
                            backgroundColor: `${row.accentColor}15`,
                            borderColor: `${row.accentColor}40`,
                            color: row.accentColor
                          }}
                        >
                          {row.artron.badge}
                        </span>
                      </div>

                      {/* Side-by-side comparison blocks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {/* Legacy Way */}
                        <div className="bg-[#12161f]/60 border border-red-500/15 rounded-xl p-3.5 relative overflow-hidden">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span className="text-[10px] font-mono font-bold uppercase text-red-400 tracking-wider">
                              {locale === 'ka' ? 'EXCEL / ქაღალდი' : locale === 'ru' ? 'EXCEL / БУМАГА' : 'EXCEL / PAPER'}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-300 mb-1">
                            {row.legacy.title}
                          </div>
                          <p className="text-[11px] text-[#64748B] leading-relaxed">
                            {locale === 'ka' ? row.legacy.detail : locale === 'ru' ? row.legacy.detailRu : row.legacy.detailEn}
                          </p>
                        </div>

                        {/* Artron Way */}
                        <div className="bg-[#0c1424]/80 border border-[#00A3FF]/30 rounded-xl p-3.5 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,163,255,0.05)]">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />
                            <span className="text-[10px] font-mono font-bold uppercase text-[#00A3FF] tracking-wider">
                              ARTRON SPORTS OS
                            </span>
                          </div>
                          <div className="text-xs font-bold text-white mb-1">
                            {row.artron.title}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {locale === 'ka' ? row.artron.detail : locale === 'ru' ? row.artron.detailRu : row.artron.detailEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Micro-Bar */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span>STATUS: OPERATIONAL GAIN</span>
                      <span className="text-[#00A3FF] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {locale === 'ka' ? 'ავტომატიზაცია აქტიურია →' : locale === 'ru' ? 'Автоматизация активна →' : 'Automation Active →'}
                      </span>
                    </div>
                  </div>
                </TiltSpotlightCard>
              );
            })}
          </div>
        </div>

        {/* 48-Hour Free Data Migration Guarantee Banner */}
        <div className="bg-gradient-to-r from-[#00A3FF]/15 via-[#0B0F17] to-[#00ff87]/15 border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-[0_12px_40px_rgba(0,163,255,0.1)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('migration.badge')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {locale === 'ka' 
                  ? 'გადმოიტანეთ თქვენი არსებული ბაზა უმტკივნეულოდ' 
                  : locale === 'ru' 
                    ? 'Перенесите вашу базу без задержек и потерь' 
                    : 'Seamlessly Migrate Your Existing Database in 48 Hours'}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
                {t('migration.desc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/sports-os"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052cc] hover:to-[#0090e0] border border-[#00A3FF]/50 shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('migration.cta_instant_sandbox')}</span>
              </Link>

              <Link
                href="/get-started?mode=demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-slate-200 bg-[#0d131f] hover:bg-[#131c2e] hover:text-white border border-white/10 hover:border-[#00A3FF]/40 transition-all"
              >
                <span>{t('migration.cta_book_demo')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
