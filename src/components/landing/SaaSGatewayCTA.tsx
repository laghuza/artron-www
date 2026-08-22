'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Building2, ArrowRight } from 'lucide-react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const SaaSGatewayCTA: React.FC = () => {
  const { t, locale } = useLanguage();

  // Locale-aware "14 days free" sub-label under the display number
  const trialLabel =
    locale === 'ka' ? '/ დღე / უფასოდ' :
    locale === 'ru' ? '/ дней / бесплатно' :
    '/ days / free';

  return (
    <section
      id="saas-gateway-cta"
      className="relative overflow-hidden bg-[#070A0F] border-t border-white/5 studio-grain"
    >
      {/* ── Radial burst from bottom-left ── */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-[#00A3FF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0066FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent" />

      {/* ── Mono system tag ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="pt-8 pb-3">
          <span className="text-[9px] font-mono font-bold text-[#00A3FF]/50 tracking-[0.25em] uppercase select-none">
            [ SYS: CONVERSION_BRIDGE // ARTRON_CTA_GATE ]
          </span>
        </div>
      </div>

      {/* ── Editorial asymmetric layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

          {/* LEFT: Display Number — pure editorial anchor */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center select-none">
            {/* Giant "14" — the entire left panel is this number */}
            <div className="relative leading-none">
              {/* Background ghost number — depth layer */}
              <span
                className="absolute inset-0 text-[clamp(160px,20vw,240px)] font-black text-white/[0.03] pointer-events-none"
                aria-hidden="true"
                style={{ letterSpacing: '-0.05em', lineHeight: 1 }}
              >
                14
              </span>
              {/* Foreground — brand gradient */}
              <span
                className="block text-[clamp(140px,18vw,220px)] font-black tracking-[-0.05em] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #00A3FF 0%, #0066FF 50%, #00D2FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                14
              </span>
            </div>

            {/* Locale-aware sub-label */}
            <div className="flex items-center gap-3 mt-2 ml-1">
              <div className="h-[1px] w-8 bg-[#00A3FF]/40" />
              <span className="text-[11px] font-mono font-bold text-[#00A3FF]/70 uppercase tracking-[0.2em]">
                {trialLabel}
              </span>
            </div>

            {/* Small descriptor */}
            <p className="mt-6 ml-1 text-xs text-[#475569] font-mono leading-relaxed max-w-[280px]">
              {locale === 'ka'
                ? 'სრული ეკოსისტემა, ყოველგვარი ვალდებულების გარეშე.'
                : locale === 'ru'
                ? 'Полная экосистема. Без обязательств.'
                : 'Full ecosystem access. No commitment.'}
            </p>
          </div>

          {/* Vertical divider — desktop only */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-full min-h-[320px] bg-gradient-to-b from-transparent via-[#00A3FF]/15 to-transparent" />
          </div>

          {/* RIGHT: Content panel */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-12">

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight mb-5">
              {t('cta_title')}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed mb-10 max-w-lg">
              {t('cta_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">

              {/* Primary — Register */}
              <MagneticButton
                href="/get-started?mode=register"
                variant="primary"
                shockwaveColor="rgba(0, 210, 255, 0.8)"
                className="px-7 py-4 text-sm font-extrabold"
                style={{ minHeight: '52px' }}
              >
                <Building2 className="w-4.5 h-4.5 shrink-0" />
                <span>{t('cta_btn_register')}</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200" />
              </MagneticButton>

              {/* Secondary — Book Demo */}
              <MagneticButton
                href="/get-started?mode=demo"
                variant="secondary"
                shockwaveColor="rgba(0, 163, 255, 0.6)"
                className="px-7 py-4 text-sm font-bold"
                style={{ minHeight: '52px' }}
              >
                <Calendar className="w-4.5 h-4.5 text-[#00A3FF] shrink-0" />
                <span>{t('cta_btn_book')}</span>
              </MagneticButton>
            </div>

            {/* App Store badges */}
            <div className="pt-8 border-t border-white/[0.06]">
              <AppStoreBadges align="left" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070A0F] to-transparent pointer-events-none" />
    </section>
  );
};
