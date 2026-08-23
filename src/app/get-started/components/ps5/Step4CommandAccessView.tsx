'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface Step4CommandAccessViewProps {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  position: string;
  setPosition: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  personalId: string;
  setPersonalId: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  isAgreed: boolean;
  setIsAgreed: (v: boolean) => void;
  isBiometricAgreed: boolean;
  setIsBiometricAgreed: (v: boolean) => void;
  submitError?: string | null;
}

export const Step4CommandAccessView: React.FC<Step4CommandAccessViewProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  position,
  setPosition,
  phone,
  setPhone,
  email,
  setEmail,
  personalId,
  setPersonalId,
  password,
  setPassword,
  isAgreed,
  setIsAgreed,
  isBiometricAgreed,
  setIsBiometricAgreed,
  submitError,
}) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  // Phone formatting: +995 (5XX) XX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+995')) {
      val = '+995';
    }
    const digits = val.replace(/\D/g, '').slice(3, 12);
    let formatted = '+995';
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += `) ${digits.slice(3, 5)}`;
    if (digits.length >= 5) formatted += `-${digits.slice(5, 7)}`;
    if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
    setPhone(formatted);
  };

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: t('ps5_onboarding.pwd_prompt'), color: 'bg-white/10' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 1) return { level: 1, text: t('ps5_onboarding.pwd_weak'), color: 'bg-amber-400' };
    if (score === 2) return { level: 2, text: t('ps5_onboarding.pwd_good'), color: 'bg-[#00A3FF]' };
    return { level: 3, text: t('ps5_onboarding.pwd_strong'), color: 'bg-[#00E5FF]' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="w-full flex flex-col gap-6 select-none" data-testid="step4-command-access">
      {/* Step Header */}
      <div className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            {t('ps5_onboarding.step4_badge')}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {t('ps5_onboarding.step4_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {t('ps5_onboarding.step4_desc')}
        </p>
      </div>

      <div className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_name_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('ps5_onboarding.admin_name_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_lastname_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t('ps5_onboarding.admin_lastname_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Position & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_position_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder={t('ps5_onboarding.pos_founder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_phone_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+995 (599) 00-00-00"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white font-mono text-sm transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Email & 11-digit Personal ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_email_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('ps5_onboarding.admin_email_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                {t('ps5_onboarding.admin_pid_label')} <span className="text-[#00E5FF]">*</span>
              </label>
              <span className="text-[9.5px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                AES-256-GCM
              </span>
            </div>
            <input
              type="text"
              maxLength={11}
              value={personalId}
              onChange={(e) => setPersonalId(e.target.value.replace(/\D/g, ''))}
              placeholder={t('ps5_onboarding.admin_pid_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white font-mono text-sm tracking-wider transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Master Password with Entropy Meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.admin_pwd_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            <span className="text-[10px] text-slate-300 font-mono">
              {strength.text}
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('ps5_onboarding.admin_pwd_placeholder')}
              className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white text-sm transition-all duration-200 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* PS5 Glowing Strength Meter */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[1, 2, 3].map((lvl) => (
              <div
                key={lvl}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  strength.level >= lvl
                    ? `${strength.color} shadow-[0_0_8px_currentColor]`
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Legal & Biometric Consents */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => {
                ps5Audio.playNavigate();
                setIsAgreed(e.target.checked);
              }}
              className="mt-0.5 w-4 h-4 rounded-lg border-white/20 bg-white/5 text-[#00A3FF] focus:ring-[#00A3FF]/30 accent-[#00A3FF] cursor-pointer"
            />
            <span className="text-[11px] text-slate-300 leading-relaxed">
              {t('ps5_onboarding.terms_agree')}{' '}
              <Link href="/terms" target="_blank" className="text-[#00E5FF] hover:underline font-bold">
                {t('system.terms') || 'Terms'}
              </Link>{' '}
              &{' '}
              <Link href="/privacy" target="_blank" className="text-[#00E5FF] hover:underline font-bold">
                {t('system.privacy') || 'Privacy'}
              </Link>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none pt-2.5 border-t border-white/[0.06]">
            <input
              type="checkbox"
              checked={isBiometricAgreed}
              onChange={(e) => {
                ps5Audio.playNavigate();
                setIsBiometricAgreed(e.target.checked);
              }}
              className="mt-0.5 w-4 h-4 rounded-lg border-white/20 bg-white/5 text-[#00A3FF] focus:ring-[#00A3FF]/30 accent-[#00A3FF] cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 leading-relaxed">
              {t('ps5_onboarding.biometric_agree')}
            </span>
          </label>
        </div>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{submitError}</span>
        </div>
      )}
    </div>
  );
};
