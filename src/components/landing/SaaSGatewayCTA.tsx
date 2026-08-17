'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Calendar, ArrowRight, Building2, Sparkles } from 'lucide-react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

export const SaaSGatewayCTA: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('booking-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="saas-gateway-cta" className="py-24 relative overflow-hidden bg-[#0B0F17] border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#00A3FF]/10 to-[#00ff87]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main box */}
        <div className="bg-gradient-to-r from-[#121722]/90 via-[#0d1017]/95 to-[#121722]/90 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden group">
          {/* L-Shape Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff87]/45" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff87]/45" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff87]/45" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff87]/45" />
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent" />

          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> [SYS: CONVERSION_BRIDGE]
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {t('cta_title')}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed max-w-xl mx-auto">
              {t('cta_subtitle')}
            </p>

            {/* Action Buttons Grid */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4">
              
              {/* Scroll to Booking Calendar */}
              <button
                onClick={handleScrollToBooking}
                className="py-3 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#E2E8F0] text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ minHeight: '48px' }}
              >
                <Calendar className="w-4.5 h-4.5 text-[#00ff87] drop-shadow-[0_0_6px_#00ff87]" />
                <span>{t('cta_btn_book')}</span>
              </button>

              {/* Navigate to Onboarding flow */}
              <Link
                href="/get-started"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#00ff87]/25 hover:shadow-[#00ff87]/45 hover:brightness-110 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                style={{ minHeight: '48px' }}
              >
                <Building2 className="w-4.5 h-4.5" />
                <span>{t('cta_btn_register')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Mobile Store Badges for Athletes */}
            <div className="pt-6 border-t border-white/5">
              <AppStoreBadges align="center" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
