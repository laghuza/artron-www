"use client";

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/core';
import { useI18n } from '@/context/I18nContext';

export interface TenantRegistrationData {
  orgName: string;
  discipline: string;
  adminEmail: string;
  adminName?: string;
  adminPhone?: string;
  isTrial: boolean;
}

interface MembershipRegistrationCardProps {
  onComplete?: (data: TenantRegistrationData) => void;
  onCancel?: () => void;
  onSwitchToLogin?: () => void;
}

export const MembershipRegistrationCard: React.FC<MembershipRegistrationCardProps> = ({
  onComplete,
  onCancel,
  onSwitchToLogin,
}) => {
  const { t } = useI18n();
  const [orgName, setOrgName] = useState('');
  const [discipline, setDiscipline] = useState('FOOTBALL');
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [provisionStep, setProvisionStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  // Global ESC key listener for instant return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        e.preventDefault();
        soundEngine.playPulseNode();
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !adminEmail.trim()) {
      soundEngine.playPulseNode();
      return;
    }

    soundEngine.playSystemAccess();
    setSubmitted(true);
    setProvisionStep(1);

    // 14-Day Auto-Provisioning Pipeline Simulation
    setTimeout(() => {
      setProvisionStep(2);
      soundEngine.playPulseNode();
    }, 700);

    setTimeout(() => {
      setProvisionStep(3);
      soundEngine.playSystemAccess();
    }, 1400);

    setTimeout(() => {
      onComplete?.({
        orgName: orgName.trim(),
        discipline,
        adminEmail: adminEmail.trim(),
        adminName: adminName.trim() || 'Administrator',
        adminPhone: adminPhone.trim(),
        isTrial: true,
      });
    }, 2200);
  };

  if (submitted) {
    return (
      <div className="w-full bg-[#0A0D11]/95 border border-[#00ff87]/50 rounded-xl p-6 font-mono text-center space-y-4 animate-fadeIn shadow-[0_0_35px_rgba(0,255,135,0.2)]">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#00ff87]/20 border border-[#00ff87] flex items-center justify-center text-xl text-[#00ff87] animate-pulse">
          ⚡
        </div>
        <h4 className="text-[13px] font-bold text-white tracking-[2px] uppercase">
          {t('registration.submitted_title')}
        </h4>
        <p className="text-[11px] text-[#9CA3AF]">
          {t('registration.submitted_desc')}{' '}
          <span className="text-[#00ff87] font-semibold">{orgName.toUpperCase()}</span>
        </p>

        {/* Dynamic Multi-Step Generation Feedback */}
        <div className="space-y-2 text-left bg-[#06080B] p-3.5 rounded border border-white/10 text-[10px]">
          <div className={`flex items-center gap-2 ${provisionStep >= 1 ? 'text-[#00ff87]' : 'text-gray-600'}`}>
            <span>{provisionStep >= 1 ? '✓' : '○'}</span>
            <span>{t('registration.step_1')}</span>
          </div>
          <div className={`flex items-center gap-2 ${provisionStep >= 2 ? 'text-[#00ff87]' : 'text-gray-600'}`}>
            <span>{provisionStep >= 2 ? '✓' : '○'}</span>
            <span>{t('registration.step_2')}</span>
          </div>
          <div className={`flex items-center gap-2 ${provisionStep >= 3 ? 'text-[#00ff87] font-bold animate-pulse' : 'text-gray-600'}`}>
            <span>{provisionStep >= 3 ? '✓' : '○'}</span>
            <span>{t('registration.step_3')}</span>
          </div>
        </div>

        <div className="text-[10px] text-[#00ff87] bg-[#00ff87]/10 px-3 py-1.5 rounded border border-[#00ff87]/30 inline-block font-semibold">
          {t('registration.dispatch_code')}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0A0D11]/95 border border-[#00ff87]/30 rounded-xl p-5 md:p-6 font-mono space-y-4 animate-fadeIn select-none shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-[#00ff87]/20 pb-3">
        <div>
          <span className="text-[11px] font-bold text-[#00ff87] tracking-[1.5px] uppercase block">
            {t('registration.title')}
          </span>
          <span className="text-[9px] text-[#9CA3AF] tracking-wider block mt-0.5">
            {t('registration.subtitle')}
          </span>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[11px] text-[#9CA3AF] hover:text-[#00ff87] transition-colors cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[9px] text-[#9CA3AF] tracking-wider uppercase mb-1">
            {t('registration.org_name_label')} *
          </label>
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full px-3 py-2 bg-[#06080B] border border-[#9CA3AF]/20 focus:border-[#00ff87] rounded text-[12px] text-white focus:outline-none transition-all placeholder-[#9CA3AF]/30"
            placeholder={t('registration.org_name_placeholder')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[9px] text-[#9CA3AF] tracking-wider uppercase mb-1">
              {t('registration.sport_discipline_label')}
            </label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080B] border border-[#9CA3AF]/20 focus:border-[#00ff87] rounded text-[11px] text-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="FOOTBALL">{t('registration.discipline_football')}</option>
              <option value="BASKETBALL">{t('registration.discipline_basketball')}</option>
              <option value="RUGBY">{t('registration.discipline_rugby')}</option>
              <option value="SWIMMING">{t('registration.discipline_swimming')}</option>
              <option value="TENNIS">{t('registration.discipline_tennis')}</option>
              <option value="FITNESS">{t('registration.discipline_fitness')}</option>
              <option value="MULTI_SPORT">{t('registration.discipline_multi')}</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] text-[#9CA3AF] tracking-wider uppercase mb-1">
              {t('registration.admin_name_label')}
            </label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080B] border border-[#9CA3AF]/20 focus:border-[#00ff87] rounded text-[12px] text-white focus:outline-none transition-all placeholder-[#9CA3AF]/30"
              placeholder={t('registration.admin_name_placeholder')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[9px] text-[#9CA3AF] tracking-wider uppercase mb-1">
              {t('registration.admin_email_label')} *
            </label>
            <input
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080B] border border-[#9CA3AF]/20 focus:border-[#00ff87] rounded text-[12px] text-white focus:outline-none transition-all placeholder-[#9CA3AF]/30"
              placeholder={t('registration.admin_email_placeholder')}
            />
          </div>

          <div>
            <label className="block text-[9px] text-[#9CA3AF] tracking-wider uppercase mb-1">
              {t('registration.admin_phone_label')}
            </label>
            <input
              type="tel"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080B] border border-[#9CA3AF]/20 focus:border-[#00ff87] rounded text-[12px] text-white focus:outline-none transition-all placeholder-[#9CA3AF]/30"
              placeholder={t('registration.admin_phone_placeholder')}
            />
          </div>
        </div>

        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full py-3 bg-[#00ff87]/20 hover:bg-[#00ff87] text-[#00ff87] hover:text-[#06080B] font-bold text-[12px] tracking-[2px] uppercase rounded border border-[#00ff87]/60 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.2)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)]"
          >
            {t('registration.submit_btn')}
          </button>

          <a
            href="/get-started"
            className="block text-center w-full py-2.5 bg-white/5 hover:bg-[#00ff87]/10 text-gray-300 hover:text-[#00ff87] font-mono text-[11px] tracking-wider uppercase rounded border border-white/10 hover:border-[#00ff87]/40 transition-all"
          >
            ⚡ {t('gateway.ps5_wizard_btn') || 'დაიწყეთ ორგანიზაციის რეგისტრაცია დარბაზისთვის →'}
          </a>
        </div>

        {onSwitchToLogin && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[10px] text-[#9CA3AF] hover:text-[#00ff87] tracking-wider transition-colors cursor-pointer"
            >
              {t('registration.switch_to_login')} →
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

