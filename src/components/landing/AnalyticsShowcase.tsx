'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsKpiTab } from './AnalyticsKpiTab';
import { AnalyticsChurnTab } from './AnalyticsChurnTab';
import { AnalyticsHeatmapTab } from './AnalyticsHeatmapTab';
import { AnalyticsWinbackTab } from './AnalyticsWinbackTab';

export const AnalyticsShowcase: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'kpi' | 'churn' | 'heatmap' | 'winback'>('kpi');
  
  // Churn predictions interactive state
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  
  // Capacity Heatmap interactive state
  const [selectedCell, setSelectedCell] = useState<{ day: string, hour: string, load: number } | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<'tbilisi' | 'batumi'>('tbilisi');

  const churnMock = useMemo(() => [
    { 
      id: 1, 
      name: locale === 'ka' ? 'ლაშა მ.' : locale === 'ru' ? 'Лаша М.' : 'Lasha M.', 
      risk: 89, 
      factor: locale === 'ka' ? 'ვიზიტების კლება (4 -> 1 / კვირაში)' : locale === 'ru' ? 'Снижение визитов (4 -> 1 / нед)' : 'Visits drop (4 -> 1 / week)',
      trigger: locale === 'ka' ? 'გაგზავნილია SMS (-15% ფასდაკლება)' : locale === 'ru' ? 'Отправлено SMS (-15% скидка)' : 'SMS Sent (-15% discount)',
      status: 'HIGH'
    },
    { 
      id: 2, 
      name: locale === 'ka' ? 'ანი ტ.' : locale === 'ru' ? 'Ани Т.' : 'Ani T.', 
      risk: 64, 
      factor: locale === 'ka' ? 'აბონემენტი იწურება 4 დღეში' : locale === 'ru' ? 'Срок истекает через 4 дня' : 'Expires in 4 days',
      trigger: locale === 'ka' ? 'ავტო-შეთავაზება: +7 დღე საჩუქრად' : locale === 'ru' ? 'Авто-оффер: +7 дней в подарок' : 'Auto-Offer: +7 days free',
      status: 'MEDIUM'
    },
    { 
      id: 3, 
      name: locale === 'ka' ? 'ზურა კ.' : locale === 'ru' ? 'Зура К.' : 'Zura K.', 
      risk: 18, 
      factor: locale === 'ka' ? 'აქტიური და სტაბილური' : locale === 'ru' ? 'Активный и стабильный' : 'Active and stable check-ins',
      trigger: locale === 'ka' ? 'კამპანია არ სჭირდება' : locale === 'ru' ? 'Кампания не требуется' : 'No campaign needed',
      status: 'LOW'
    }
  ], [locale]);

  const activeTabContent = useMemo(() => {
    switch (activeSubTab) {
      case 'kpi':
        return <AnalyticsKpiTab t={t} locale={locale} />;
      case 'churn':
        return (
          <AnalyticsChurnTab 
            t={t} 
            locale={locale} 
            churnMock={churnMock} 
            selectedUserIndex={selectedUserIndex} 
            setSelectedUserIndex={setSelectedUserIndex} 
          />
        );
      case 'heatmap':
        return (
          <AnalyticsHeatmapTab 
            t={t} 
            locale={locale} 
            selectedCell={selectedCell} 
            setSelectedCell={setSelectedCell} 
            selectedBranch={selectedBranch} 
            setSelectedBranch={setSelectedBranch} 
          />
        );
      case 'winback':
        return <AnalyticsWinbackTab t={t} locale={locale} />;
      default:
        return null;
    }
  }, [activeSubTab, t, locale, churnMock, selectedUserIndex, selectedCell, selectedBranch]);

  return (
    <section id="analytics-showcase" className="py-20 md:py-28 px-4 md:px-8 bg-[#0B0F17] relative overflow-hidden border-b border-white/5 studio-grain">
      {/* Background Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-xs font-mono font-bold text-[#00e5ff] mb-4 tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" /> [SYS: ANALYTICS_ENGINE]
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t('analytics_showcase_title')}
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium">
            {t('analytics_showcase_subtitle')}
          </p>
        </div>

        {/* HUD Sub-Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(['kpi', 'churn', 'heatmap', 'winback'] as const).map((tab) => {
            const isActive = activeSubTab === tab;
            const themeColor = (tab === 'churn' || tab === 'winback') ? '#00ff87' : '#00e5ff';
            
            let label = '';
            if (tab === 'kpi') label = locale === 'ka' ? 'KPI პანელი' : locale === 'ru' ? 'Панель KPI' : 'KPI Dashboard';
            else if (tab === 'churn') label = t('analytics_tab_churn');
            else if (tab === 'heatmap') label = t('analytics_tab_heatmap');
            else if (tab === 'winback') label = t('analytics_tab_winback');

            return (
              <button
                key={tab}
                data-testid={`analytics-tab-${tab}`}
                onClick={() => setActiveSubTab(tab)}
                className={`relative px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'border-transparent text-white'
                    : 'bg-[#121722]/50 border-white/5 text-[#94A3B8] hover:border-white/10 hover:text-white'
                }`}
                style={{ minHeight: '40px' }}
              >
                <span className="relative z-10">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeSubTabBg"
                    className="absolute inset-0 -z-0"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}35 100%)`,
                      border: `1px solid ${themeColor}`,
                      borderRadius: '11px',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="bg-[#05070a]/90 border border-[#8a99ad]/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl min-h-[480px] flex flex-col justify-between">
          {/* L-Shape Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff]/35" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff]/35" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff]/35" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff]/35" />


          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full flex-grow flex flex-col justify-between"
            >
              {activeTabContent}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
