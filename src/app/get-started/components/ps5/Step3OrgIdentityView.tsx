'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Building, MapPin, CheckCircle2 } from 'lucide-react';

interface Step3OrgIdentityViewProps {
  clubName: string;
  setClubName: (v: string) => void;
  clubLegalForm: string;
  setClubLegalForm: (v: string) => void;
  clubCode: string;
  setClubCode: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  clubAddress: string;
  setClubAddress: (v: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export const Step3OrgIdentityView: React.FC<Step3OrgIdentityViewProps> = ({
  clubName,
  setClubName,
  clubLegalForm,
  setClubLegalForm,
  clubCode,
  setClubCode,
  city,
  setCity,
  clubAddress,
  setClubAddress,
}) => {
  const { t, locale } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const citiesList = useMemo(() => {
    if (locale === 'en') {
      return ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', t('ps5_onboarding.city_other')];
    }
    if (locale === 'ru') {
      return ['Тбилиси', 'Батуми', 'Кутаиси', 'Рустави', 'Зугдиди', 'Телави', t('ps5_onboarding.city_other')];
    }
    return ['თბილისი', 'ბათუმი', 'ქუთაისი', 'რუსთავი', 'ზუგდიდი', 'თელავი', t('ps5_onboarding.city_other')];
  }, [locale, t]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    const formatted = raw.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    setClubCode(formatted);
  };

  const rawCodeLength = clubCode.replace(/\s/g, '').length;
  const isNameValid = clubName.trim().length > 0;
  const isCodeValid = rawCodeLength === 9;
  const isAddressValid = clubAddress.trim().length > 0;

  return (
    <div className="w-full flex flex-col gap-6 select-none" data-testid="step3-org-identity">
      {/* Step Header */}
      <div className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            {t('ps5_onboarding.step3_badge')}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {t('ps5_onboarding.step3_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {t('ps5_onboarding.step3_desc')}
        </p>
      </div>

      <div className="space-y-5">
        {/* Organization Name with Floating-style Container */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.org_name_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            {isNameValid && (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> {t('ps5_onboarding.badge_validated')}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder={t('ps5_onboarding.org_name_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* 2-Column: Legal Form & 9-Digit ID Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Legal Form */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.org_legal_form_label')}
            </label>
            <select
              value={clubLegalForm}
              onChange={(e) => {
                ps5Audio.playNavigate();
                setClubLegalForm(e.target.value);
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-[#0E1424] border border-white/[0.12] focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00A3FF]/30 text-white text-sm transition-all duration-200 outline-none cursor-pointer"
            >
              <option value="შპს">{t('ps5_onboarding.legal_llc')}</option>
              <option value="ინდ. მეწარმე">{t('ps5_onboarding.legal_ie')}</option>
              <option value="სს">{t('ps5_onboarding.legal_jsc')}</option>
              <option value="ააიპ">{t('ps5_onboarding.legal_nnle')}</option>
            </select>
          </div>

          {/* Identification Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                {t('ps5_onboarding.org_code_label')} <span className="text-[#00E5FF]">*</span>
              </label>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isCodeValid ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {rawCodeLength}/9 {t('col_hours_worked') ? '' : ''}
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={clubCode}
                onChange={handleCodeChange}
                placeholder={t('ps5_onboarding.org_code_placeholder')}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm font-mono tracking-wider transition-all duration-200 outline-none"
              />
              {isCodeValid && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">
                  ✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* City Selection Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            {t('ps5_onboarding.city_label')} <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {citiesList.map((c) => {
              const isSelected = city === c || (city === 'თბილისი' && c === 'Tbilisi') || (city === 'თბილისი' && c === 'Тбилиси');
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    ps5Audio.playNavigate();
                    setCity(c);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                      : 'bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Physical Address Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('ps5_onboarding.address_label')} <span className="text-[#00E5FF]">*</span>
            </label>
            {isAddressValid && (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> {t('ps5_onboarding.badge_validated')}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={clubAddress}
              onChange={(e) => setClubAddress(e.target.value)}
              placeholder={t('ps5_onboarding.address_placeholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
