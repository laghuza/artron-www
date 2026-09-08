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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch animate-fadeIn">
      {tiers.map((tier, index) => (
        <PricingTierCard
          key={tier.id}
          tier={tier}
          index={index}
          currencySymbol={currencySymbol}
          currencyMultiplier={currencyMultiplier}
          billingCycle={billingCycle}
          onRequestDemo={onRequestDemo}
          t={t}
        />
      ))}
    </div>
  );
};
