'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/landing/Footer';
import { AIBotWidget } from '@/components/landing/AIBotWidget';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { PS5AuroraBackground } from './components/ps5/PS5AuroraBackground';
import { PS5RegistrationWizard } from './components/ps5/PS5RegistrationWizard';
import { QuickDemoBookingView } from './components/ps5/QuickDemoBookingView';
import { soundEngine } from '@/core';

export default function GetStartedClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'demo' ? 'DEMO' : 'REGISTER';
  const [activeMode, setActiveMode] = useState<'REGISTER' | 'DEMO'>(initialMode);

  useEffect(() => {
    document.title = activeMode === 'REGISTER'
      ? `სისტემის შეძენა და ობიექტის რეგისტრაცია | ARTRON`
      : `სტუმრის 1-საათიანი დემო წვდომა | ARTRON`;
  }, [activeMode]);

  const handleReset = () => {
    router.push('/');
  };

  const initialPlan = (searchParams.get('plan') || 'pro').toLowerCase();
  const initialCycle = (searchParams.get('cycle') || 'monthly').toLowerCase();

  return (
    <PS5AuroraBackground>
      {/* Sticky Header */}
      <Header isSticky={true} showBackToHome={true} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10 flex flex-col items-center justify-center">
        {/* Central Card */}
        <div className="w-full max-w-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.12] bg-[#0C111C]/85 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Top Edge Laser Accent */}
          <div className={`absolute top-0 left-12 right-12 h-[1.5px] bg-gradient-to-r from-transparent ${
            activeMode === 'REGISTER' ? 'via-[#00E5FF]' : 'via-emerald-400'
          } to-transparent opacity-80 transition-all duration-500`} />

          {/* Render Active Path */}
          {activeMode === 'REGISTER' ? (
            <PS5RegistrationWizard 
              onReset={handleReset} 
              initialPlan={initialPlan}
              initialCycle={initialCycle}
            />
          ) : (
            <QuickDemoBookingView 
              onCancel={handleReset} 
              onSwitchToRegister={() => {
                setActiveMode('REGISTER');
                router.replace('/get-started?mode=register');
              }}
            />
          )}
        </div>
      </main>

      {/* Global Footer & Widgets */}
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </PS5AuroraBackground>
  );
}
