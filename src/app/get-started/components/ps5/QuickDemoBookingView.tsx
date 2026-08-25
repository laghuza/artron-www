'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { Dumbbell, Waves, Sparkles, Shield, Rocket, CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';

interface QuickDemoBookingViewProps {
  onCancel: () => void;
  onSwitchToRegister?: () => void;
}

interface FacilityTypeDemoItem {
  id: string;
  labelKey: string;
  icon: LucideIcon;
}

const FACILITY_TYPES: FacilityTypeDemoItem[] = [
  { id: 'gym', labelKey: 'booking_type_gym', icon: Dumbbell },
  { id: 'pool', labelKey: 'booking_type_pool', icon: Waves },
  { id: 'studio', labelKey: 'booking_type_studio', icon: Sparkles },
  { id: 'federation', labelKey: 'booking_type_federation', icon: Shield },
];

export const QuickDemoBookingView: React.FC<QuickDemoBookingViewProps> = ({ onCancel, onSwitchToRegister }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const facilityParam = searchParams.get('facility');
  const [name, setName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState(
    facilityParam && ['gym', 'pool', 'studio', 'federation'].includes(facilityParam)
      ? facilityParam
      : 'gym'
  );
  const [phone, setPhone] = useState('+995');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestCredentials, setGuestCredentials] = useState({
    userId: 'GUEST-8842',
    passCode: 'ART-9921',
    validity: '60 min',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+995')) val = '+995';
    const digits = val.replace(/\D/g, '').slice(3, 12);
    let formatted = '+995';
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += `) ${digits.slice(3, 5)}`;
    if (digits.length >= 5) formatted += `-${digits.slice(5, 7)}`;
    if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
    setPhone(formatted);
  };

  const isValid = 
    name.trim().length > 0 && 
    facilityName.trim().length > 0 && 
    phone.replace(/\D/g, '').length === 12;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    soundEngine.playSystemAccess();
    
    // Fast-track generation of 1-time guest session
    setTimeout(() => {
      const randomId = `GST-${Math.floor(1000 + Math.random() * 9000)}`;
      const randomCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
      setGuestCredentials({
        userId: randomId,
        passCode: randomCode,
        validity: '60 min',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col items-center text-center py-4 animate-fadeIn">
        {/* Glowing Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-3xl mb-3 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
          ✓
        </div>
        
        <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
          ⚡ {t('ps5_onboarding.demo_success_badge')}
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          {t('ps5_onboarding.demo_welcome_prefix')}, {name}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
          {t('ps5_onboarding.demo_ready_desc')} (<span className="text-emerald-400 font-bold">{facilityName}</span>).
        </p>

        {/* Credentials Box */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 text-left font-mono text-xs w-full max-w-md mb-6 space-y-2 text-slate-300 shadow-xl">
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">{t('ps5_onboarding.demo_field_facility')}:</span>
            <span className="text-white font-bold">{facilityName}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">{t('ps5_onboarding.demo_field_guest_id')}:</span>
            <span className="text-emerald-400 font-bold">{guestCredentials.userId}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">{t('ps5_onboarding.demo_field_passcode')}:</span>
            <span className="text-[#00E5FF] font-bold">{guestCredentials.passCode}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">{t('ps5_onboarding.demo_field_validity')}:</span>
            <span className="text-amber-400 font-bold">⏱️ 60 {t('system.minutes') || 'წუთი'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-2.5">
          <Link
            href="/sports-os?demo=true"
            onClick={() => soundEngine.playSystemAccess()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2"
          >
            <span>{t('ps5_onboarding.demo_btn_enter')}</span>
            <span>→</span>
          </Link>

          <Link
            href="/get-started?mode=register"
            onClick={() => soundEngine.playPulseNode()}
            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center"
          >
            {t('ps5_onboarding.demo_btn_upgrade')}
          </Link>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setIsSubmitted(false);
            }}
            className="w-full py-2 px-4 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <span>←</span>
            <span>{t('ps5_onboarding.dock_btn_back')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between gap-5 animate-fadeIn">
      {/* Switch to Full Registration High-Conversion Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#00A3FF]/15 via-[#0055FF]/10 to-transparent border border-[#00A3FF]/30 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🚀</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">{t('ps5_onboarding.demo_switch_title')}</span>
            <span className="text-[11px] text-slate-300">{t('ps5_onboarding.demo_switch_desc')}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            if (onSwitchToRegister) onSwitchToRegister();
            else router.push('/get-started?mode=register');
          }}
          className="w-full sm:w-auto py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0066FF] hover:from-[#00E5FF] hover:to-[#00A3FF] text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(0,163,255,0.4)] text-center"
        >
          {t('ps5_onboarding.demo_switch_btn')} →
        </button>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
            [ ⚡ {t('ps5_onboarding.demo_mode_badge')} ]
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('ps5_onboarding.demo_headline')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 mt-2">
          ⚡ <strong>{t('ps5_onboarding.demo_instant_bold')}:</strong> {t('ps5_onboarding.demo_instant_desc')}
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Facility Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            {t('ps5_onboarding.demo_field_facility_type')} <span className="text-emerald-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FACILITY_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = facilityType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playPulseNode();
                    setFacilityType(type.id);
                  }}
                  className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500/20 border border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} strokeWidth={1.8} />
                  <span className="text-[11px] font-bold">{t(type.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Facility Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            {t('ps5_onboarding.demo_field_facility_name')} <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            required
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            placeholder={t('ps5_onboarding.demo_facility_placeholder')}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
          />
        </div>

        {/* Contact Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              {t('ps5_onboarding.demo_field_name')} <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('ps5_onboarding.demo_name_placeholder')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              {t('ps5_onboarding.demo_field_phone')} <span className="text-emerald-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+995 (5XX) XX-XX-XX"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm font-mono outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isValid && !isSubmitting
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
              : 'bg-white/10 text-slate-500 border border-white/5 cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? t('ps5_onboarding.dock_submitting') : `${t('ps5_onboarding.demo_btn_get_access')} →`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-3.5 px-5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>←</span>
          <span>{t('ps5_onboarding.dock_btn_back')}</span>
        </button>
      </div>
    </form>
  );
};
