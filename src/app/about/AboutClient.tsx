'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/landing/Footer';
import { AIBotWidget } from '@/components/landing/AIBotWidget';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { AboutHero } from './components/AboutHero';
import { AboutStatsMatrix } from './components/AboutStatsMatrix';
import { AboutPillars } from './components/AboutPillars';
import { AboutDualCoreBridge } from './components/AboutDualCoreBridge';
import { AboutStrengthsGrid } from './components/AboutStrengthsGrid';
import { AboutLegalIdentity } from './components/AboutLegalIdentity';
import { AboutCTABanner } from './components/AboutCTABanner';

export default function AboutClient() {
  const { t } = useLanguage();

  // Set browser tab title dynamically for SEO and UX consistency
  useEffect(() => {
    document.title = `${t('about_title')} | ARTRON`;
  }, [t]);

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F8FAFC] flex flex-col overflow-x-hidden font-sans selection:bg-cyan-500/30 selection:text-white relative">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-500/[0.08] via-blue-600/[0.04] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-0 w-[450px] h-[450px] bg-purple-600/[0.05] rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[65%] left-0 w-[450px] h-[450px] bg-cyan-500/[0.05] rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Cyber Grid Pattern Decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Sticky Header */}
      <Header isSticky={true} />

      {/* Main Content Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10">
        <AboutHero />
        <AboutStatsMatrix />
        <AboutPillars />
        <AboutDualCoreBridge />
        <AboutStrengthsGrid />
        <AboutLegalIdentity />
        <AboutCTABanner />
      </main>

      {/* Embedded Global Components */}
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
