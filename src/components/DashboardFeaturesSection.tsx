'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Terminal,
  Wifi,
  Building2,
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Cpu
} from 'lucide-react';
import { 
  B2BCategoryType, 
  B2BFeatureItem, 
  B2B_CORE_FEATURES, 
  B2B_ANALYTICS_FEATURES, 
  ALL_B2B_FEATURES 
} from './landing/features/b2bFeaturesConfig';
import { B2BTerminalStage } from './landing/features/B2BTerminalStage';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { IgnitionButton } from '@/components/ui/IgnitionButton';
import { soundEngine } from '@/core';

export const DashboardFeaturesSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<B2BCategoryType>('core');
  const [activeFeatureId, setActiveFeatureId] = useState<string>('iot');

  // Unified Hash & Event Listener for 100% synchronization with Header Mega-Dropdown
  useEffect(() => {
    const handleNavigationRoute = (targetTab: string) => {
      const isAnalyticsTab = ['roi', 'okr', 'kpi', 'churn', 'heatmap', 'winback'].includes(targetTab);
      const isCoreTab = ['iot', 'booking', 'security', 'migration', 'ai', 'sports_os', 'multimodal-ai', 'enterprise-security'].includes(targetTab);

      if (isAnalyticsTab) {
        setActiveCategory('analytics');
        setActiveFeatureId(targetTab);
      } else if (isCoreTab) {
        setActiveCategory('core');
        if (targetTab === 'multimodal-ai') setActiveFeatureId('ai');
        else if (targetTab === 'enterprise-security') setActiveFeatureId('security');
        else if (targetTab === 'sports_os') setActiveFeatureId('booking');
        else setActiveFeatureId(targetTab);
      }
    };

    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (!hash) return;

      if (hash === '#roi' || hash === '#analytics-showcase') {
        handleNavigationRoute('roi');
      } else if (hash.startsWith('#analytics-')) {
        const tab = hash.replace('#analytics-', '');
        handleNavigationRoute(tab);
      } else if (hash.includes('tab=')) {
        const match = hash.match(/tab=([a-z_]+)/);
        if (match && match[1]) handleNavigationRoute(match[1]);
      } else if (hash === '#booking' || hash === '#schedules') {
        handleNavigationRoute('booking');
      } else if (hash === '#migration' || hash === '#data-migration') {
        handleNavigationRoute('migration');
      } else if (hash === '#enterprise-security' || hash === '#staff-access-roles') {
        handleNavigationRoute('security');
      } else if (hash === '#dashboard-features' || hash === '#iot') {
        handleNavigationRoute('iot');
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);

    const handleCustomTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: string; category?: B2BCategoryType }>;
      if (customEvent.detail?.tab) {
        handleNavigationRoute(customEvent.detail.tab);
      }
    };

    window.addEventListener('artron-select-analytics-tab', handleCustomTab);
    window.addEventListener('artron-select-b2b-tab', handleCustomTab);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('artron-select-analytics-tab', handleCustomTab);
      window.removeEventListener('artron-select-b2b-tab', handleCustomTab);
    };
  }, []);

  const currentFeatures = activeCategory === 'core' ? B2B_CORE_FEATURES : B2B_ANALYTICS_FEATURES;

  const handleCategorySwitch = (cat: B2BCategoryType) => {
    soundEngine.playPulseNode();
    setActiveCategory(cat);
    if (cat === 'core') {
      setActiveFeatureId('iot');
    } else {
      setActiveFeatureId('roi');
    }
  };

  const handleFeatureSelect = (id: string) => {
    soundEngine.playPulseNode();
    setActiveFeatureId(id);
  };

  const currentActiveFeatureObj: B2BFeatureItem = useMemo(() => {
    return ALL_B2B_FEATURES.find((f) => f.id === activeFeatureId) || B2B_CORE_FEATURES[0];
  }, [activeFeatureId]);

  const getFeatureTitle = (feat: B2BFeatureItem) => {
    if (feat.titleKey) {
      const translated = t(feat.titleKey);
      if (translated) return translated;
    }
    const loc = locale as 'ka' | 'en' | 'ru';
    return feat.titles[loc] || feat.titles.ka;
  };

  const getFeatureDesc = (feat: B2BFeatureItem) => {
    if (feat.descKey) {
      const translated = t(feat.descKey);
      if (translated) return translated;
    }
    const loc = locale as 'ka' | 'en' | 'ru';
    return feat.descriptions[loc] || feat.descriptions.ka;
  };

  return (
    <section id="dashboard-features" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0F1420] to-[#0B0F17] border-b border-white/5 scroll-mt-20">
      {/* Anchor Targets for backward compatibility */}
      <span id="analytics-showcase" className="absolute -top-24 pointer-events-none" />
      <span id="roi" className="absolute -top-24 pointer-events-none" />
      <span id="enterprise-security" className="absolute -top-24 pointer-events-none" />
      <span id="staff-access-roles" className="absolute -top-24 pointer-events-none" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#00A3FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(0,255,135,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            [SYS: B2B_CONTROL_SUITE // 10-NODE MATRIX]
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('dashboardFeatures_title') || 'B2B მართვის ცენტრი & ანალიტიკა'}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#94A3B8] font-medium leading-relaxed">
            {t('dashboardFeatures_subtitle') || 'სრული ინფრასტრუქტურა: ტურნიკეტებიდან დაწყებული AI ანალიტიკითა და ფინანსური მართვით დამთავრებული'}
          </p>

          {/* 2-Category Horizontal HUD Switcher (1:1 with Header Dropdown Columns) */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#05070a]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            <button
              type="button"
              onClick={() => handleCategorySwitch('core')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === 'core'
                  ? 'bg-gradient-to-r from-[#00C853]/20 to-[#00ff87]/25 text-[#00ff87] border border-[#00ff87]/50 shadow-[0_0_20px_rgba(0,255,135,0.25)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#00ff87]" />
              <span>{t('dashboardFeatures_cat_core') || (locale === 'ka' ? 'ბირთვული ინფრასტრუქტურა' : locale === 'ru' ? 'Базовая инфраструктура' : 'Core Infrastructure')}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono">4</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategorySwitch('analytics')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === 'analytics'
                  ? 'bg-gradient-to-r from-[#0066FF]/25 to-[#00A3FF]/25 text-[#00A3FF] border border-[#00A3FF]/50 shadow-[0_0_20px_rgba(0,163,255,0.25)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#00A3FF]" />
              <span>{t('dashboardFeatures_cat_analytics') || (locale === 'ka' ? 'ანალიტიკა & ROI კომპლექტი' : locale === 'ru' ? 'Аналитика и ROI' : 'Analytics & ROI Suite')}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono">6</span>
            </button>
          </div>
        </div>

        {/* Dual-Core Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch mb-12">
          
          {/* Left Column: Feature Cards for Active Category */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {currentFeatures.map((feat) => {
              const isSelected = activeFeatureId === feat.id;
              const featColor = feat.color || '#00A3FF';
              const IconComp = feat.icon;

              return (
                <button
                  key={feat.id}
                  onClick={() => handleFeatureSelect(feat.id)}
                  className={`text-left w-full bg-[#05070a]/85 border rounded-2xl p-3.5 sm:p-4 transition-all duration-300 relative group overflow-hidden cursor-pointer backdrop-blur-xl focus:outline-none ${
                    isSelected 
                      ? 'border-[#00E5FF] bg-[#05070a]/95 shadow-[0_0_25px_rgba(0,229,255,0.18)] pl-5 sm:pl-6'
                      : 'border-white/[0.08] hover:border-[#00A3FF]/40 hover:bg-[#0A1018] hover:shadow-[0_0_20px_rgba(0,163,255,0.08)]'
                  }`}
                  style={{ minHeight: activeCategory === 'analytics' ? '82px' : '92px' }}
                >
                  {/* L-Shape Corner Brackets */}
                  <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isSelected ? 'border-[#00E5FF]/70' : 'border-white/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isSelected ? 'border-[#00E5FF]/70' : 'border-white/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isSelected ? 'border-[#00E5FF]/70' : 'border-white/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isSelected ? 'border-[#00E5FF]/70' : 'border-white/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />

                  {/* Active Neon Bar Indicator */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-[4px] transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ backgroundColor: featColor }}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border transition-all duration-300 shrink-0"
                        style={{
                          backgroundColor: isSelected ? `${featColor}25` : 'rgba(255,255,255,0.05)',
                          borderColor: isSelected ? `${featColor}60` : 'rgba(255,255,255,0.1)',
                          color: featColor,
                          boxShadow: isSelected ? `0 0 10px ${featColor}40` : 'none'
                        }}
                      >
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <h3 className={`text-xs sm:text-sm font-bold transition-all truncate ${
                        isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {getFeatureTitle(feat)}
                      </h3>
                    </div>

                    <span 
                      className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase shrink-0 border"
                      style={{
                        backgroundColor: `${featColor}15`,
                        borderColor: `${featColor}30`,
                        color: featColor
                      }}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed pl-9 sm:pl-10 line-clamp-1">
                    {getFeatureDesc(feat)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Fidelity Interactive Master Terminal Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#05070a]/90 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col w-full min-h-[520px]">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00E5FF]/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00E5FF]/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00E5FF]/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00E5FF]/50" />

              <div className="absolute top-2 left-2 text-[#00E5FF]/30 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2 right-2 text-[#00E5FF]/30 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[#00E5FF]/30 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[#00E5FF]/30 font-mono text-[9px] pointer-events-none select-none">┘</div>
              
              {/* Top Window Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F17]/95 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-bold text-[#94A3B8] tracking-wide uppercase truncate max-w-[280px] sm:max-w-none">
                  <Terminal className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  <span className="truncate">{getFeatureTitle(currentActiveFeatureObj)}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-white/10 text-white font-normal">
                    {currentActiveFeatureObj.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 font-mono">
                  <Wifi className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>LIVE // 60 FPS</span>
                </div>
              </div>

              {/* Dynamic Content Area: routes between all 10 simulators */}
              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between bg-[#0B0F17]/40">
                <B2BTerminalStage 
                  activeFeatureId={activeFeatureId} 
                  t={t} 
                  locale={locale} 
                />
              </div>

              {/* Bottom decorative neon outline */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent"></div>
            </div>
          </div>

        </div>

        {/* ── Section CTA Action Dock ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#00A3FF]/20 bg-gradient-to-r from-[#050B14]/90 via-[#071322]/90 to-[#050B14]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,163,255,0.08)]">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#00ff87]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[11px] font-mono font-bold text-[#00A3FF] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#00A3FF] animate-pulse" />
                <span>[ FAST DEPLOYMENT // ZERO SETUP DOWNTIME ]</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
                {t('cta_title') || 'დააჩქარეთ თქვენი სპორტული ბიზნესის ზრდა'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] font-medium leading-relaxed max-w-2xl">
                {t('cta_subtitle') || 'ჩაატარეთ ონლაინ პრეზენტაცია და იხილეთ Artron-ის სრული პოტენციალი თქვენს ობიექტზე'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <IgnitionButton
                href="/get-started?mode=register"
                variant="cyan"
                size="md"
                className="px-6 py-3.5 text-xs sm:text-sm font-extrabold justify-center"
                aria-label="B2B Registration"
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{t('cta_btn_register')}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </IgnitionButton>

              <MagneticButton
                href="/get-started?mode=demo"
                variant="secondary"
                shockwaveColor="rgba(0, 163, 255, 0.6)"
                className="px-6 py-3.5 text-xs sm:text-sm font-bold justify-center"
                style={{ minHeight: '46px' }}
              >
                <Play className="w-4 h-4 fill-[#00A3FF]/30 text-[#00A3FF] shrink-0" />
                <span>{t('cta_btn_book')}</span>
              </MagneticButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
