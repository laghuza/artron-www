'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const AboutHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Navigation back to home */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all group px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-sm"
          style={{ minHeight: '44px' }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
          <span className="font-medium">{t('legal_back_to_home')}</span>
        </Link>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-4xl mx-auto relative"
      >
        {/* Glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[300px] bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-950/60 border border-cyan-500/30 rounded-full px-4 py-1.5 text-xs text-cyan-300 font-mono tracking-wider mb-6 shadow-[0_0_15px_rgba(0,163,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="font-semibold">{t('about_hero_badge')}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
            {t('about_title')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
          {t('about_subtitle')}
        </p>
      </motion.div>
    </div>
  );
};
