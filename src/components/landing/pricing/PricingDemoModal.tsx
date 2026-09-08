'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Send, Shield, Building, Phone, Mail, User, Sparkles } from 'lucide-react';
import { PricingTier, CustomModule, VerticalType, BillingCycle } from '@/types/pricing';
import { VERTICAL_DETAILS } from '@/data/pricingData';
import { soundEngine } from '@/core';

interface PricingDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  vertical: VerticalType;
  billingCycle: BillingCycle;
  selectedTier?: PricingTier | null;
  selectedModules?: CustomModule[] | null;
  currencySymbol: string;
  currencyMultiplier: number;
  t: (key: string) => string;
}

export const PricingDemoModal: React.FC<PricingDemoModalProps> = ({
  isOpen,
  onClose,
  vertical,
  billingCycle,
  selectedTier,
  selectedModules,
  currencySymbol,
  currencyMultiplier,
  t,
}) => {
  const [formData, setFormData] = useState({
    facilityName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate estimated price
  let estimatedPrice = 0;
  if (selectedTier) {
    const base = Math.round(selectedTier.basePrice * currencyMultiplier);
    estimatedPrice = billingCycle === 'ANNUAL' ? Math.round(base * 0.8) : base;
  } else if (selectedModules) {
    const base = VERTICAL_DETAILS[vertical].minPrice;
    const addons = selectedModules
      .filter((m) => !m.isCore)
      .reduce((acc, m) => acc + m.basePrice, 0);
    const monthly = Math.round((base + addons) * currencyMultiplier);
    estimatedPrice = billingCycle === 'ANNUAL' ? Math.round(monthly * 0.8) : monthly;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEngine.playSystemAccess();

    // Simulate request dispatch (and payload generation)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundEngine.playPulseNode();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#090d14] border border-[#00A3FF]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,163,255,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow behind modal */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#00A3FF]/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClose();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              {t('pricing_modal_success_title')}
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              {t('pricing_modal_success_desc')}
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs text-gray-300">
              ⚡ {t('pricing_modal_success_eta')}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 py-3 px-8 rounded-xl bg-[#00A3FF] text-[#090d14] font-mono font-bold text-xs uppercase cursor-pointer"
            >
              {t('pricing_modal_btn_close')}
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-[#00A3FF] font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>[ ARTRON_DEMO_DISPATCH ]</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              {t('pricing_modal_title')}
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">
              {t('pricing_modal_subtitle')}
            </p>

            {/* Selected Plan / Config Summary Card */}
            <div className="mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-gray-500 uppercase block text-[10px]">
                  {t('pricing_modal_selected_package')}
                </span>
                <span className="font-bold text-white text-sm">
                  {selectedTier
                    ? t(selectedTier.nameKey)
                    : `${t(VERTICAL_DETAILS[vertical].titleKey)} (${selectedModules?.length || 0} ${t('pricing_modules_label')})`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 uppercase block text-[10px]">
                  {t('pricing_modal_estimated_price')}
                </span>
                <span className="font-bold text-[#00A3FF] text-base">
                  {currencySymbol}{estimatedPrice}
                  <span className="text-[10px] text-gray-400 font-normal">/{t('pricing_mo')}</span>
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 font-sans">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  {t('pricing_form_facility_name')} *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    placeholder={t('pricing_form_facility_placeholder')}
                    className="w-full bg-[#121722] border border-white/10 focus:border-[#00A3FF] rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    {t('pricing_form_contact_name')} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder={t('pricing_form_name_placeholder')}
                      className="w-full bg-[#121722] border border-white/10 focus:border-[#00A3FF] rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    {t('pricing_form_phone')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+995 5XX XX XX XX"
                      className="w-full bg-[#121722] border border-white/10 focus:border-[#00A3FF] rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  {t('pricing_form_email')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="manager@gym.ge"
                    className="w-full bg-[#121722] border border-white/10 focus:border-[#00A3FF] rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#00ff87] text-[#05070a] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,163,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,135,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t('pricing_modal_btn_sending') : t('pricing_modal_btn_submit')}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
