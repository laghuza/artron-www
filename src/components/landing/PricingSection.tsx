'use client';

import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { VerticalType, PricingMode, BillingCycle, PricingTier, CustomModule } from '@/types/pricing';
import { PricingVerticalSelector } from './pricing/PricingVerticalSelector';
import { PricingTiersView } from './pricing/PricingTiersView';
import { PricingCustomBuilder } from './pricing/PricingCustomBuilder';
import { PricingDemoModal } from './pricing/PricingDemoModal';

export const PricingSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const [vertical, setVertical] = useState<VerticalType>('gym');
  const [mode, setMode] = useState<PricingMode>('tiers');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');

  // Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedTierForDemo, setSelectedTierForDemo] = useState<PricingTier | null>(null);
  const [selectedModulesForDemo, setSelectedModulesForDemo] = useState<CustomModule[] | null>(null);

  // Currency symbols and rates based on locale
  const currencySymbol = locale === 'ka' ? '₾' : locale === 'ru' ? '₽' : '$';
  const currencyMultiplier = locale === 'ka' ? 1 : locale === 'ru' ? 33 : 0.37;

  const handleRequestTierDemo = (tier: PricingTier) => {
    setSelectedTierForDemo(tier);
    setSelectedModulesForDemo(null);
    setIsDemoModalOpen(true);
  };

  const handleRequestCustomDemo = (modules: CustomModule[]) => {
    setSelectedTierForDemo(null);
    setSelectedModulesForDemo(modules);
    setIsDemoModalOpen(true);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0B0E14] border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#00A3FF]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#00ff87]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#00A3FF] text-xs font-mono tracking-wider uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>[ ARTRON_PRICING_ENGINE_V2 ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-normal">
            {t('pricing_subtitle')}
          </p>
        </div>

        {/* 1. Main Vertical & Mode Selector */}
        <PricingVerticalSelector
          vertical={vertical}
          setVertical={setVertical}
          mode={mode}
          setMode={setMode}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          currencySymbol={currencySymbol}
          currencyMultiplier={currencyMultiplier}
          t={t}
        />

        {/* 2. Main Body: Ready Tiers vs Custom Plan Builder */}
        {mode === 'tiers' ? (
          <PricingTiersView
            vertical={vertical}
            billingCycle={billingCycle}
            currencySymbol={currencySymbol}
            currencyMultiplier={currencyMultiplier}
            onRequestDemo={handleRequestTierDemo}
            t={t}
          />
        ) : (
          <PricingCustomBuilder
            vertical={vertical}
            billingCycle={billingCycle}
            currencySymbol={currencySymbol}
            currencyMultiplier={currencyMultiplier}
            onRequestCustomDemo={handleRequestCustomDemo}
            t={t}
          />
        )}

        {/* Guarantee Banner & Compliance Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-gray-400 font-mono">
            {t('pricing_guarantee')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-gray-500 uppercase tracking-widest font-mono flex-wrap">
            <span>🏛️ BANK OF GEORGIA</span>
            <span>•</span>
            <span>💳 VISA / MASTERCARD</span>
            <span>•</span>
            <span>⚡ 24/7 ARTRON CORE SUPPORT</span>
            <span>•</span>
            <span>🔒 AES-256 PII ENCRYPTION</span>
          </div>
        </div>
      </div>

      {/* Demo Request Modal */}
      <PricingDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        vertical={vertical}
        billingCycle={billingCycle}
        selectedTier={selectedTierForDemo}
        selectedModules={selectedModulesForDemo}
        currencySymbol={currencySymbol}
        currencyMultiplier={currencyMultiplier}
        t={t}
      />
    </section>
  );
};
