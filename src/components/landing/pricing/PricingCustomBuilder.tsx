'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield, Cpu, Smartphone, CreditCard, TrendingUp, Users, UserCheck, FileText,
  QrCode, Layers, Sparkles, Calendar, ShoppingBag, Receipt, Coins, Zap, Send,
  Activity, BarChart3, Bot, Check,
} from 'lucide-react';
import { VerticalType, BillingCycle, CustomModule } from '@/types/pricing';
import { MODULE_CATEGORIES, CUSTOM_MODULES } from '@/data/pricingData';
import { soundEngine } from '@/core';
import { PricingBuilderSummary } from './PricingBuilderSummary';
import { PricingBuilderSidebar } from './PricingBuilderSidebar';

interface PricingCustomBuilderProps {
  vertical: VerticalType;
  billingCycle: BillingCycle;
  currencySymbol: string;
  currencyMultiplier: number;
  onRequestCustomDemo: (selectedModules: CustomModule[]) => void;
  t: (key: string) => string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Cpu, Smartphone, CreditCard, TrendingUp, Users, UserCheck, FileText,
  QrCode, Layers, Sparkles, Calendar, ShoppingBag, Receipt, Coins, Zap, Send,
  Activity, BarChart3, Bot,
};

export const PricingCustomBuilder: React.FC<PricingCustomBuilderProps> = ({
  vertical,
  billingCycle,
  currencySymbol,
  currencyMultiplier,
  onRequestCustomDemo,
  t,
}) => {
  // Initialize with recommended modules for the selected vertical
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return CUSTOM_MODULES.filter(
      (m) => m.isCore || m.recommendedFor.includes(vertical)
    ).map((m) => m.id);
  });

  // When vertical changes, update default selection
  useEffect(() => {
    setSelectedIds(
      CUSTOM_MODULES.filter(
        (m) => m.isCore || m.recommendedFor.includes(vertical)
      ).map((m) => m.id)
    );
  }, [vertical]);

  const toggleModule = (id: string, isCore?: boolean) => {
    if (isCore) return; // Core cannot be disabled
    soundEngine.playPulseNode();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const setPreset = (preset: 'recommended' | 'all' | 'minimal') => {
    soundEngine.playPulseNode();
    if (preset === 'recommended') {
      setSelectedIds(
        CUSTOM_MODULES.filter(
          (m) => m.isCore || m.recommendedFor.includes(vertical)
        ).map((m) => m.id)
      );
    } else if (preset === 'all') {
      setSelectedIds(CUSTOM_MODULES.map((m) => m.id));
    } else if (preset === 'minimal') {
      setSelectedIds(CUSTOM_MODULES.filter((m) => m.isCore).map((m) => m.id));
    }
  };

  const selectedModulesList = CUSTOM_MODULES.filter((m) =>
    selectedIds.includes(m.id)
  );

  return (
    <div className="w-full max-w-7xl mx-auto animate-fadeIn">
      {/* 2-Column Responsive Layout: Modules (Left) + Sticky Live Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Preset Bar & 5 Category Groups */}
        <div className="lg:col-span-8 space-y-6">
          {/* Preset Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
            <div className="text-gray-400">
              <span className="text-white font-bold">{CUSTOM_MODULES.length} {t('pricing_modules_available_label')}</span>
              <span className="mx-2">•</span>
              <span>{t('pricing_builder_instruction')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreset('recommended')}
                className="px-3 py-1.5 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF] hover:bg-[#00A3FF]/20 border border-[#00A3FF]/30 transition-all cursor-pointer font-bold"
              >
                ✨ {t('pricing_preset_recommended')}
              </button>
              <button
                type="button"
                onClick={() => setPreset('all')}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                {t('pricing_preset_all')}
              </button>
              <button
                type="button"
                onClick={() => setPreset('minimal')}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                {t('pricing_preset_minimal')}
              </button>
            </div>
          </div>

          {/* 5 Categories Cards */}
          <div className="space-y-6">
            {MODULE_CATEGORIES.map((category) => {
              const categoryModules = CUSTOM_MODULES.filter(
                (m) => m.category === category.id
              );
              const CategoryIcon = ICON_MAP[category.iconName] || Shield;

              return (
                <div
                  key={category.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#070a0f]/80 border border-white/5 backdrop-blur-xl"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
                    <div className="p-2 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF]">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-wide">
                        {t(category.titleKey)}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {t(category.descKey)}
                      </p>
                    </div>
                  </div>

                  {/* Modules Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {categoryModules.map((mod) => {
                      const isSelected = selectedIds.includes(mod.id);
                      const Icon = ICON_MAP[mod.iconName] || Shield;
                      const isRecommended = mod.recommendedFor.includes(vertical);
                      const modPrice = Math.round(mod.basePrice * currencyMultiplier);

                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id, mod.isCore)}
                          className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group border ${
                            isSelected
                              ? 'bg-[#0f1724] border-[#00A3FF]/60 shadow-[0_0_20px_rgba(0,163,255,0.15)]'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                          }`}
                        >
                          <div>
                            {/* Top row: Icon + Name + Selection Indicator */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`p-2 rounded-lg transition-colors ${
                                    isSelected
                                      ? 'bg-[#00A3FF] text-[#070a0f]'
                                      : 'bg-white/5 text-gray-400 group-hover:text-white'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white leading-snug">
                                    {t(mod.nameKey)}
                                  </div>
                                  {isRecommended && (
                                    <span className="inline-block text-[9px] font-mono text-[#00ff87] uppercase tracking-wider">
                                      ✓ {t('pricing_badge_recommended')}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Checkbox badge */}
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-[#00ff87] text-[#070a0f]'
                                    : 'border border-white/20 text-transparent'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                              {t(mod.descKey)}
                            </p>
                          </div>

                          {/* Bottom row: Price tag */}
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
                            <span className="text-gray-500">
                              {mod.isCore ? t('pricing_core_included') : t('pricing_addon_label')}
                            </span>
                            <span
                              className={`font-bold ${
                                mod.isCore ? 'text-[#00ff87]' : 'text-[#00A3FF]'
                              }`}
                            >
                              {mod.isCore ? (
                                t('pricing_free_in_core')
                              ) : (
                                `+${currencySymbol}${modPrice}/${t('pricing_mo')}`
                              )}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Live Calculation Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-20 xl:top-24 z-20 self-start">
          <PricingBuilderSidebar
            vertical={vertical}
            billingCycle={billingCycle}
            selectedModules={selectedModulesList}
            currencySymbol={currencySymbol}
            currencyMultiplier={currencyMultiplier}
            onToggleModule={toggleModule}
            onSetPreset={setPreset}
            onRequestCustomDemo={() => onRequestCustomDemo(selectedModulesList)}
            t={t}
          />
        </div>
      </div>

      {/* Floating Bottom Summary on Mobile/Tablet */}
      <div className="lg:hidden">
        <PricingBuilderSummary
          vertical={vertical}
          billingCycle={billingCycle}
          selectedModules={selectedModulesList}
          currencySymbol={currencySymbol}
          currencyMultiplier={currencyMultiplier}
          onRequestCustomDemo={() => onRequestCustomDemo(selectedModulesList)}
          t={t}
        />
      </div>
    </div>
  );
};
