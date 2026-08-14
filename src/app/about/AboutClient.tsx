'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Footer } from '@/components/landing/Footer';
import { AIBotWidget } from '@/components/landing/AIBotWidget';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { 
  Cpu, 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Landmark, 
  Shield, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function AboutClient() {
  const { locale, t } = useLanguage();

  // Set browser tab title dynamically for SEO and UX consistency
  useEffect(() => {
    document.title = `${t('about_title')} | ARTRON`;
  }, [t]);

  return (
    <div className="min-h-screen bg-[#0B0F17] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121b2d] via-[#0B0F17] to-[#080b11] text-white flex flex-col overflow-x-hidden font-sans selection:bg-[#00A3FF]/30 selection:text-white">
      
      {/* Background Neon Grid Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Sticky Header */}
      <Header isSticky={true} showBackToHome={true} />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        
        {/* Navigation arrow */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] hover:text-[#00A3FF] transition-all group px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00A3FF]/30 hover:bg-[#00A3FF]/5 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50"
            style={{ minHeight: '44px' }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t('legal_back_to_home')}</span>
          </Link>
        </div>

        {/* Hero Section Banner with glowing effects */}
        <div className="relative text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-full px-4 py-1.5 text-xs text-[#00A3FF] font-bold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
            {t('logo_sub')}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            {t('about_title')}
          </h1>
          <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed">
            {t('about_subtitle')}
          </p>
        </div>

        {/* Presentation Core Layout (Mission, Who We Are, Compliance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 sm:mb-24">
          {/* Company Mission */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#121722]/50 backdrop-blur-sm hover:border-[#00A3FF]/30 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t('about_mission_title')}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                {t('about_mission_body')}
              </p>
            </div>
          </div>

          {/* Who We Are */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#121722]/50 backdrop-blur-sm hover:border-[#00A3FF]/30 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t('about_who_title')}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                {t('about_who_body')}
              </p>
            </div>
          </div>

          {/* Local Compliance */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#121722]/50 backdrop-blur-sm hover:border-[#00A3FF]/30 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t('about_compliance_title')}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                {t('about_compliance_body')}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid Highlighting Artron Strengths */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {locale === 'ka' ? 'რატომ ართრონი?' : locale === 'ru' ? 'Почему Artron?' : 'Why Artron?'}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              {locale === 'ka' ? 'ჩვენი სისტემის მთავარი უპირატესობები და ტექნოლოგიური სტანდარტები' : locale === 'ru' ? 'Основные преимущества и технологические стандарты нашей системы' : 'Key advantages and technical standards of our system'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Local Support */}
            <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121722]/30 hover:border-[#00A3FF]/20 transition-all duration-300 flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PhoneCall className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white group-hover:text-[#00A3FF] transition-colors">
                  {t('about_feat_support_title')}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {t('about_feat_support_desc')}
                </p>
              </div>
            </div>

            {/* IoT Hardware Reliability */}
            <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121722]/30 hover:border-[#00A3FF]/20 transition-all duration-300 flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white group-hover:text-[#00A3FF] transition-colors">
                  {t('about_feat_iot_title')}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {t('about_feat_iot_desc')}
                </p>
              </div>
            </div>

            {/* Data Privacy & AES-256-GCM */}
            <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121722]/30 hover:border-[#00A3FF]/20 transition-all duration-300 flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white group-hover:text-[#00A3FF] transition-colors">
                  {t('about_feat_privacy_title')}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {t('about_feat_privacy_desc')}
                </p>
              </div>
            </div>

            {/* Legal Compliance */}
            <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121722]/30 hover:border-[#00A3FF]/20 transition-all duration-300 flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-[#00A3FF]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white group-hover:text-[#00A3FF] transition-colors">
                  {t('about_feat_legal_title')}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {t('about_feat_legal_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Identity & Official Details */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-24 relative">
          <div className="absolute inset-0 bg-[#00A3FF]/5 rounded-2xl filter blur-xl pointer-events-none"></div>
          
          <div className="relative p-6 sm:p-10 rounded-2xl border border-[#00A3FF]/20 bg-[#121722]/80 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
              <Landmark className="w-6 h-6 text-[#00A3FF]" />
              {t('about_identity_title')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#94A3B8]">
              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-semibold text-[#00A3FF] uppercase tracking-wider mb-1">
                    {locale === 'ka' ? 'იურიდიული სახელი' : locale === 'ru' ? 'Юридическое название' : 'Legal Name'}
                  </span>
                  <span className="text-white font-medium">
                    {locale === 'ka' ? 'შპს ართრონი' : locale === 'ru' ? 'ООО Артрон' : 'Artron LLC'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#00A3FF] uppercase tracking-wider mb-1">
                    {locale === 'ka' ? 'საიდენტიფიკაციო კოდი' : locale === 'ru' ? 'Идентификационный номер' : 'Company ID / Registration Code'}
                  </span>
                  <span className="text-white font-mono font-medium">412799431</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-semibold text-[#00A3FF] uppercase tracking-wider mb-1">
                    {locale === 'ka' ? 'იურიდიული მისამართი' : locale === 'ru' ? 'Юридический адрес' : 'Legal Address'}
                  </span>
                  <span className="text-white font-medium flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                    {t('footer_address')}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#00A3FF] uppercase tracking-wider mb-1">
                    {locale === 'ka' ? 'ოფიციალური კონტაქტი' : locale === 'ru' ? 'Официальный контакт' : 'Official Contact'}
                  </span>
                  <a href="mailto:info@artron.ge" className="text-white hover:text-[#00A3FF] font-medium transition-colors flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#00A3FF]" />
                    info@artron.ge
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/20 to-[#00D2FF]/20 z-0"></div>
          <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#00A3FF]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative p-8 sm:p-12 z-10 text-center space-y-6 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('about_cta_title')}
            </h3>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              {t('about_cta_desc')}
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@artron.ge?subject=Requesting B2B Admin Demo"
                className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-sm font-bold shadow-lg shadow-[#00A3FF]/25 hover:shadow-[#00A3FF]/45 hover:brightness-115 hover:scale-[1.02] active:scale-98 transition-all"
                style={{ minHeight: '48px' }}
              >
                {t('about_cta_button')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Embedded Global Components */}
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
