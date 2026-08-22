'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const AboutCTABanner: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 sm:mb-16 border border-cyan-500/30 shadow-[0_20px_80px_rgba(0,163,255,0.2)]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/25 via-cyan-600/20 to-purple-600/25 z-0" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -top-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8 sm:p-14 z-10 text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white font-mono text-[11px] backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>{locale === 'ka' ? 'ავტომატიზაცია დღესვე' : 'Automate Your Facility Today'}</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {t('about_cta_title')}
        </h3>

        <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-xl mx-auto">
          {t('about_cta_desc')}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-started"
            className="group relative inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-full font-bold text-sm text-white overflow-hidden shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-98 transition-all min-h-[48px] w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #0066FF, #00D2FF)' }}
          >
            <span className="relative">{t('about_cta_button')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="mailto:info@artron.ge?subject=B2B Demo Request"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] hover:border-cyan-400/40 hover:text-white transition-all min-h-[48px] w-full sm:w-auto"
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>{locale === 'ka' ? 'პირდაპირი კონტაქტი' : 'Direct Contact'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
