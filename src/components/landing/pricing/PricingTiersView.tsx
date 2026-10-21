'use client';

import React from 'react';
import { VerticalType, BillingCycle, PricingTier } from '@/types/pricing';
import { PRICING_TIERS_BY_VERTICAL } from '@/data/pricingData';
import { PricingTierCard } from './PricingTierCard';

interface PricingTiersViewProps {
  vertical: VerticalType;
  billingCycle: BillingCycle;
  currencySymbol: string;
  currencyMultiplier: number;
  onRequestDemo: (tier: PricingTier) => void;
  t: (key: string) => string;
}

export const PricingTiersView: React.FC<PricingTiersViewProps> = ({
  vertical,
  billingCycle,
  currencySymbol,
  currencyMultiplier,
  onRequestDemo,
  t,
}) => {
  const tiers = PRICING_TIERS_BY_VERTICAL[vertical] || [];

  return (
    <div className="w-full">
      <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none pb-4 md:pb-0 md:grid-cols-3 gap-6 lg:gap-8 items-stretch animate-fadeIn">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className="snap-center shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none flex flex-col"
          >
            <PricingTierCard
              tier={tier}
              index={index}
              currencySymbol={currencySymbol}
              currencyMultiplier={currencyMultiplier}
              billingCycle={billingCycle}
              onRequestDemo={onRequestDemo}
              t={t}
            />
          </div>
        ))}
      </div>
      {/* Mobile Swipe Hint */}
      <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[11px] font-mono text-slate-500 select-none">
        <span>◂ გადაფურცლეთ ტარიფები ▸</span>
      </div>
    </div>
  );
};
