'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/landing/Footer';
import { AIBotWidget } from '@/components/landing/AIBotWidget';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import RegistryIntakeWizard from './components/RegistryIntakeWizard';

export default function GetStartedClient() {
  const { t } = useLanguage();
  const router = useRouter();

  // Set browser tab title dynamically
  useEffect(() => {
    document.title = `რეგისტრაცია | Get Started | ARTRON`;
  }, []);

  const handleReset = () => {
    // Redirect to home page when cancel/reset is triggered
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121b2d] via-[#0B0F17] to-[#080b11] text-white flex flex-col overflow-x-hidden font-sans selection:bg-[#00A3FF]/30 selection:text-white">
      
      {/* Background Neon Grid Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Sticky Header */}
      <Header isSticky={true} showBackToHome={true} />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10 flex flex-col items-center justify-center">
        
        {/* Glow effect back drop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#00A3FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Central Form Card */}
        <div className="w-full max-w-lg p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#121722]/80 backdrop-blur-md shadow-2xl relative">
          {/* Subtle line glow */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent"></div>
          
          <RegistryIntakeWizard onReset={handleReset} />
        </div>
      </main>

      {/* Embedded Global Components */}
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
