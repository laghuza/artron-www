'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Building2, Sparkles } from 'lucide-react';
import { gymClients, fintechPartners } from './partners/PartnerData';
import { GymClientCard } from './partners/GymClientCard';
import { PartnerCard } from './partners/PartnerCard';

export const PartnerEcosystem: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'fintech'>('all');

  return (
    <section id="partner-ecosystem" className="py-20 md:py-28 relative overflow-hidden bg-[#0B0F17] border-b border-white/5 studio-grain">
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/4 left-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00A3FF]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00ff87]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/25 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('partner_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('partner_title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('partner_subtitle')}
          </p>

          {/* Interactive Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-[#121722]/80 border border-white/10 rounded-2xl backdrop-blur-md max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              {t('partner_tab_all')}
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {t('partner_tab_clients')}
            </button>
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
                activeTab === 'fintech'
                  ? 'bg-[#635BFF] text-white shadow-[0_0_20px_rgba(99,91,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              {t('partner_tab_fintech')}
            </button>
          </div>
        </div>

        {/* SECTION 1: CLIENT FITNESS CLUBS (Social Proof) */}
        {(activeTab === 'all' || activeTab === 'clients') && (
          <div className="mb-14">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CCFF00]/10 rounded-xl text-[#CCFF00] border border-[#CCFF00]/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white font-mono flex items-center gap-2">
                    {t('partner_tab_clients')}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      LIVE IN PRODUCTION
                    </span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {t('partner_clients_desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4.5 sm:gap-5">
              {gymClients.map((gym) => (
                <GymClientCard key={gym.id} gym={gym} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: FINTECH & BILLING */}
        {(activeTab === 'all' || activeTab === 'fintech') && (
          <div className="pt-4">
            <div className="flex flex-col items-center text-center pb-6 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5E00]/10 border border-[#FF5E00]/25 text-xs font-mono font-bold text-[#FFA066] mb-3 tracking-wider uppercase shadow-[0_0_15px_rgba(255,94,0,0.15)]">
                <CreditCard className="w-3.5 h-3.5 text-[#FF5E00]" />
                <span>BOG CHECKOUT & iPAY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-wide uppercase text-white font-mono">
                {t('partner_fintech')}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mt-1.5 leading-relaxed">
                {t('partner_fintech_desc')}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                {fintechPartners.map((p) => (
                  <PartnerCard key={p.id} partner={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
