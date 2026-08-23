'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PS5AuroraBackground } from './components/ps5/PS5AuroraBackground';
import { PS5TopHUD } from './components/ps5/PS5TopHUD';
import { PS5RegistrationWizard } from './components/ps5/PS5RegistrationWizard';
import { QuickDemoBookingView } from './components/ps5/QuickDemoBookingView';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { ps5Audio } from './core/ps5SoundEngine';

export default function GetStartedClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const activeMode = modeParam === 'demo' ? 'DEMO' : 'REGISTER';
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    document.title =
      activeMode === 'REGISTER'
        ? `სისტემის შეძენა და ობიექტის რეგისტრაცია // PS5 SETUP | ARTRON`
        : `სტუმრის 1-საათიანი დემო წვდომა | ARTRON`;

    // Trigger PS5 boot sound on first user mount
    ps5Audio.playBoot();
  }, [activeMode]);

  const handleBack = () => {
    ps5Audio.playBack();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else if (activeMode === 'DEMO') {
      router.push('/sports-os');
    } else {
      router.push('/#pricing');
    }
  };

  const initialPlan = (searchParams.get('plan') || 'pro').toLowerCase();
  const initialCycle = (searchParams.get('cycle') || 'monthly').toLowerCase();

  return (
    <PS5AuroraBackground>
      {/* PlayStation 5 Top Console Status HUD */}
      <PS5TopHUD
        currentStep={currentStep}
        totalSteps={3}
        onBack={handleBack}
        activeMode={activeMode}
      />

      {/* Main Interactive Stage */}
      <main className="w-full flex-grow flex flex-col justify-center relative z-10">
        {activeMode === 'REGISTER' ? (
          <PS5RegistrationWizard
            onReset={handleBack}
            initialPlan={initialPlan}
            initialCycle={initialCycle}
            onStepChange={setCurrentStep}
          />
        ) : (
          <div className="max-w-3xl mx-auto w-full px-4 py-8">
            <div className="w-full p-6 sm:p-10 rounded-3xl border border-white/[0.12] bg-[#0C111C]/90 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 left-12 right-12 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-90" />
              <QuickDemoBookingView
                onCancel={handleBack}
                onSwitchToRegister={() => {
                  router.replace('/get-started?mode=register');
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mandatory Consent Banner */}
      <CookieConsentBanner />
    </PS5AuroraBackground>
  );
}
