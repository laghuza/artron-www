'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Smartphone, ArrowRight, Zap, CheckCircle2, ShieldCheck, Wifi } from 'lucide-react';
import Link from 'next/link';

export const AboutDualCoreBridge: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <div className="relative mb-16 sm:mb-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="p-6 sm:p-10 rounded-3xl bg-[#0F141C]/90 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-[11px] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t('about_dualcore_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t('about_dualcore_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            {t('about_dualcore_desc')}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Side 1: B2B Admin */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  ADMIN WEB PANEL
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about_dualcore_admin_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                {t('about_dualcore_admin_desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {locale === 'ka' ? '№01-15/ნ მზადყოფნა' : '№01-15/ნ Ready'}
              </span>
              <span className="text-cyan-400 font-mono text-[11px]">admin.artron.ge</span>
            </div>
          </div>

          {/* Side 2: B2C Mobile Pass */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                  ATHLETE MOBILE APP
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about_dualcore_mobile_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                {t('about_dualcore_mobile_desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-cyan-400">
                <Zap className="w-3.5 h-3.5" />
                {locale === 'ka' ? '1-კლიკიანი QR საშვი' : '1-Tap Dynamic QR'}
              </span>
              <span className="text-blue-400 font-mono text-[11px]">iOS & Android</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
