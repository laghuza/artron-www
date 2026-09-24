'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles } from 'lucide-react';
import { ArtronEnneaEcosystem } from './ecosystem/ArtronEnneaEcosystem';

export const PartnerEcosystem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="partner-ecosystem" className="py-16 md:py-24 relative overflow-hidden bg-[#0B0F17] border-b border-white/5 studio-grain">
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/4 left-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00A3FF]/6 rounded-full blur-[120px] pointer-events-none [transform:translate3d(0,0,0)]" />
      <div className="absolute bottom-1/4 right-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00ff87]/6 rounded-full blur-[120px] pointer-events-none [transform:translate3d(0,0,0)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unified Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
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
        </div>

        {/* 3D Dynamic Ecosystem: Globe + Live Georgia Map + Shuffled Clients + FinTech Partners */}
        <ArtronEnneaEcosystem />
      </div>
    </section>
  );
};
