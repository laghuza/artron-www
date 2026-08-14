'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Cpu, 
  Users, 
  Clock, 
  TrendingUp, 
  Wifi, 
  Terminal 
} from 'lucide-react';
import { IotSimulator } from './landing/features/IotSimulator';
import { DatabaseSimulator } from './landing/features/DatabaseSimulator';
import { LaborCompliance } from './landing/features/LaborCompliance';
import { MultiBranchCrm } from './landing/features/MultiBranchCrm';

export const DashboardFeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  
  const features = [
    {
      id: 0,
      icon: <Cpu className="w-5 h-5" />,
      titleKey: 'dashboardFeatures_feat1_title',
      descKey: 'dashboardFeatures_feat1_desc',
      badge: 'IoT Infrastructure'
    },
    {
      id: 1,
      icon: <Users className="w-5 h-5" />,
      titleKey: 'dashboardFeatures_feat2_title',
      descKey: 'dashboardFeatures_feat2_desc',
      badge: 'Athlete Database'
    },
    {
      id: 2,
      icon: <Clock className="w-5 h-5" />,
      titleKey: 'dashboardFeatures_feat3_title',
      descKey: 'dashboardFeatures_feat3_desc',
      badge: 'Order №01-15/ნ'
    },
    {
      id: 3,
      icon: <TrendingUp className="w-5 h-5" />,
      titleKey: 'dashboardFeatures_feat4_title',
      descKey: 'dashboardFeatures_feat4_desc',
      badge: 'Multi-Branch CRM'
    }
  ];

  return (
    <section id="dashboard-features" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0F1420] to-[#0B0F17] border-b border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase">
            [SYS: CONTROL_HUB]
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('dashboardFeatures_title')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#94A3B8] font-medium leading-relaxed">
            {t('dashboardFeatures_subtitle')}
          </p>
        </div>

        {/* Dual-Core Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Column: Interactive Nav Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {features.map((feat) => {
              const isSelected = activeFeature === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(feat.id)}
                  className={`text-left w-full bg-[#121722]/40 border rounded-2xl p-5 md:p-6 transition-all duration-300 relative group overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00ff87] ${
                    isSelected 
                      ? 'border-[#00ff87] bg-[#05070a]/80 shadow-lg shadow-[#00ff87]/5'
                      : 'border-white/5 hover:border-white/15 hover:bg-[#121722]/60'
                  }`}
                  style={{ minHeight: '110px' }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#00ff87] transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#00ff87]/20 border-[#00ff87]/40 text-[#00ff87] drop-shadow-[0_0_6px_#00ff87]' 
                          : 'bg-white/5 border-white/10 text-[#94A3B8] group-hover:text-white group-hover:border-white/20'
                      }`}>
                        {feat.icon}
                      </div>
                      <h3 className={`text-base font-bold transition-all ${
                        isSelected ? 'text-white' : 'text-[#94A3B8] group-hover:text-[#E2E8F0]'
                      }`}>
                        {t(feat.titleKey)}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#94A3B8] leading-relaxed pl-11">
                    {t(feat.descKey)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Fidelity Interactive Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#05070a]/90 border border-[#8a99ad]/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col w-full min-h-[460px]">
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

              {/* Terminal corner brackets */}
              <div className="absolute top-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┘</div>
              
              {/* Top Window Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F17]/80 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-bold text-[#94A3B8] tracking-wide uppercase">
                  <Terminal className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>{t('dashboardFeatures_panel_title')}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Wifi className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>{t('dashboardFeatures_panel_status')}</span>
                </div>
              </div>

              {/* Mockup Dynamic Content Area */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-[#0B0F17]/30">
                {activeFeature === 0 && <IotSimulator />}
                {activeFeature === 1 && <DatabaseSimulator />}
                {activeFeature === 2 && <LaborCompliance />}
                {activeFeature === 3 && <MultiBranchCrm />}
              </div>

              {/* Bottom decorative neon outline */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
