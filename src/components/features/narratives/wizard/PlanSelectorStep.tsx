"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface PlanSelectorStepProps {
  onBack: () => void;
  onContinue: () => void;
  selectedPlan: string;
  setSelectedPlan: (p: string) => void;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  setBillingCycle: (c: 'MONTHLY' | 'ANNUAL') => void;
}

export default function PlanSelectorStep({
  onBack,
  onContinue,
  selectedPlan,
  setSelectedPlan,
  billingCycle,
  setBillingCycle,
}: PlanSelectorStepProps) {
  const [paymentProvider, setPaymentProvider] = useState<'TBC' | 'BOG' | 'STRIPE'>('TBC');

  const plans = [
    { id: 'STARTER', name: 'STARTER', basePrice: 350, features: ['1 Branch', 'Max 100 Members', 'QR Check-in & CRM'] },
    { id: 'PRO', name: 'PRO PROFESSIONAL', basePrice: 565, features: ['1-3 Branches', 'Max 1000 Members', 'IoT Turnstiles + №01-15/ნ'] },
    { id: 'ENTERPRISE', name: 'ENTERPRISE OS', basePrice: 950, features: ['Unlimited Branches', 'Unlimited Members', 'Pools & Dedicated SLA'] },
  ];

  const calculatePrice = (base: number) => {
    if (billingCycle === 'ANNUAL') {
      return Math.round(base * 0.8); // 20% discount
    }
    return base;
  };

  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CLUB_INTEGRATION: STEP_04_OF_05 ]</span>
            <span><span className="text-[#9CA3AF]/30">○ ○ ○</span> <span className="text-[#00ff87]">●</span> <span className="text-[#9CA3AF]/10">○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">PLAN & SUBSCRIPTION</h2>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex bg-[#121418] border border-white/5 p-1 rounded-lg mb-4 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => { soundEngine.playPulseNode(); setBillingCycle('MONTHLY'); }}
            className={`flex-1 py-1.5 rounded text-center transition-all cursor-pointer font-bold ${billingCycle === 'MONTHLY' ? 'bg-[#00ff87] text-[#121418]' : 'text-gray-400 hover:text-white'}`}
          >
            MONTHLY / ყოველთვიური
          </button>
          <button
            type="button"
            onClick={() => { soundEngine.playPulseNode(); setBillingCycle('ANNUAL'); }}
            className={`flex-1 py-1.5 rounded text-center transition-all cursor-pointer font-bold relative ${billingCycle === 'ANNUAL' ? 'bg-[#00ff87] text-[#121418]' : 'text-gray-400 hover:text-white'}`}
          >
            ANNUAL / ყოველწლიური
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black tracking-normal animate-pulse">
              -20%
            </span>
          </button>
        </div>

        {/* Pricing Tiers Selection Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {plans.map((p) => {
            const price = calculatePrice(p.basePrice);
            const isSelected = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => { soundEngine.playPulseNode(); setSelectedPlan(p.id); }}
                className={`p-3 border rounded text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-[#16191E] border-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.15)]'
                    : 'bg-[#121418]/60 border-white/5 hover:border-[#9CA3AF]/30'
                }`}
              >
                <div>
                  <div className={`font-mono text-[9px] font-bold ${isSelected ? 'text-[#00ff87]' : 'text-gray-400'}`}>
                    {p.name}
                  </div>
                  <div className="text-[16px] font-black text-white mt-1">
                    ₾{price}
                    <span className="text-[8px] text-gray-500 font-normal">/MO</span>
                  </div>
                </div>
                <div className="text-[7.5px] font-mono text-gray-500 leading-normal mt-2">
                  {p.features[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Payment Gateways Selection (TBC, BOG, Stripe) */}
        <div className="space-y-2">
          <label className="block font-mono text-[9px] text-[#9CA3AF] tracking-widest uppercase">
            [ SELECT GATEWAY PROVIDER // გადახდის არხი ]
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['TBC', 'BOG', 'STRIPE'] as const).map((prov) => (
              <button
                key={prov}
                type="button"
                onClick={() => { soundEngine.playPulseNode(); setPaymentProvider(prov); }}
                className={`py-2 px-3 border rounded font-mono text-[10px] font-bold tracking-widest text-center cursor-pointer transition-all ${
                  paymentProvider === prov
                    ? 'bg-[#121418] border-[#00ff87] text-[#00ff87]'
                    : 'bg-[#121418]/30 border-white/5 text-gray-500 hover:text-white'
                }`}
              >
                {prov} BANK
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex gap-4 font-mono text-xs">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer"
          >
            [ BACK ]
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 py-3 px-4 font-bold border border-[#00ff87] text-[#00ff87] bg-[#00ff87]/10 hover:bg-[#00ff87] hover:text-[#121418] transition-all uppercase cursor-pointer"
          >
            [ SECURE CHECKOUT ]
          </button>
        </div>
      </div>
    </div>
  );
}
