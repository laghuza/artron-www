"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { SubChapter } from '@/types/gateway';
import { soundEngine } from '@/core';
import { UnifiedRegistrationWizard } from './UnifiedRegistrationWizard';

interface NodeDetailPanelProps {
  activeSubChapter: SubChapter | null;
  onBackToNode: () => void;
  onAuthenticate?: (
    mode: 'FULL_B2B' | 'TEMP_OTP',
    credentials?: { username?: string; password?: string; orgName?: string; isTrial?: boolean }
  ) => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  activeSubChapter,
  onBackToNode,
  onAuthenticate,
}) => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!activeSubChapter) return null;

  const isRegister = activeSubChapter.id === 'membership-init' || activeSubChapter.id === '09.1';
  const isConsole = activeSubChapter.id === 'console-access' || activeSubChapter.id === '09.3';

  const handleConsoleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSystemAccess();
    setIsSubmitted(true);
    if (onAuthenticate) {
      setTimeout(() => {
        onAuthenticate('FULL_B2B', { username: email, isTrial: false });
      }, 800);
    }
  };

  return (
    <div className="w-full lg:w-[60%] bg-[#0B0C0E] p-4 lg:p-7 flex flex-col justify-between select-none overflow-y-auto border-l border-[rgba(156,163,175,0.12)]">
      <div className="w-full flex flex-col flex-1 min-h-0 mb-6">
        {/* Top Header Control Alignment Line */}
        <div className="w-full border-b border-[rgba(156,163,175,0.12)] pb-3.5 mb-5 flex items-center justify-between h-[42px]">
          <button
            onClick={() => {
              soundEngine.playPulseNode();
              setIsSubmitted(false);
              onBackToNode();
            }}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00ff87] hover:text-white border border-[#00ff87]/30 hover:border-[#00ff87] bg-[#121418]/80 px-3.5 py-1.8 rounded transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>{t('actions.return_to_canvas')}</span>
          </button>
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
            {t('system.security_level')}: <span className="text-[#00ff87]">{t('system.classified')}</span>
          </div>
        </div>

        {/* Card Content Matrix */}
        <div className="animate-fadeIn w-full flex-1 flex flex-col justify-between p-5 lg:p-7 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md">
          <div className="space-y-5">
            {/* Section Header */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono text-[#00ff87] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                {isRegister ? t('system.gateway_membership_init') : isConsole ? t('system.gateway_console_access') : t('system.classified')}
              </span>
              <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight uppercase font-mono">
                {t(`subchapters.${activeSubChapter.id}`) || activeSubChapter.title}
              </h2>
            </div>

            {/* If Subchapter 09.1 (Registration / Onboarding), render Clean Onboarding Launchpad */}
            {isRegister ? (
              <div className="space-y-5 animate-fadeIn font-mono">
                <div className="p-5 rounded-xl bg-[#121418] border border-[#00B0FF]/40 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        {t('gateway.membership_init_btn')}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] font-sans mt-0.5">
                        {t('registration.subtitle') || 'სრული ციფრული წვდომა · საკრედიტო ბარათის გარეშე'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10 text-xs font-sans text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00B0FF]">✓</span>
                      <span>5-წუთიანი დამოუკიდებელი ონბორდინგი და RLS ბაზის იზოლაცია</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00B0FF]">✓</span>
                      <span>IoT ტურნიკეტების & RFID სკანერების ავტომატური სინქრონიზაცია</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00B0FF]">✓</span>
                      <span>სამუშაო დროის აღრიცხვა (ბრძანება №01-15/ნ) & მწვრთნელთა ჰაბი</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/get-started?mode=register"
                      onClick={() => soundEngine.playSystemAccess()}
                      className="flex-1 py-3 px-4 rounded-lg bg-[#00B0FF] hover:bg-[#0090DF] text-[#0A0D10] text-center font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,176,255,0.35)] transition-all cursor-pointer hover:scale-[1.02]"
                    >
                      🚀 {t('registration.submit_btn') || 'ორგანიზაციის რეგისტრაცია →'}
                    </Link>
                    <Link
                      href="/get-started?mode=demo"
                      onClick={() => soundEngine.playPulseNode()}
                      className="py-3 px-4 rounded-lg bg-[#00ff87]/15 hover:bg-[#00ff87]/25 border border-[#00ff87]/50 text-[#00ff87] text-center font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.02]"
                    >
                      ⚡ {t('gateway.guest_demo_btn') || 'სტუმრის Guest დემო'}
                    </Link>
                  </div>
                </div>
              </div>
            ) : isConsole ? (
              /* Console Access Form */
              <div className="space-y-5 animate-fadeIn">
                {isSubmitted ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 font-mono bg-[#121418]/90 border border-[#00ff87]/40 rounded-xl p-6">
                    <div className="w-12 h-12 rounded-full border border-[#00ff87] bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] text-xl">
                      ✓
                    </div>
                    <div className="text-white font-bold text-base tracking-wider uppercase">
                      {t('system.session_authorized')}
                    </div>
                    <p className="text-xs text-[#9CA3AF] max-w-md leading-relaxed font-sans">
                      {t('system.session_authorized_desc')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConsoleLogin} className="space-y-4 font-mono">
                    <div>
                      <label className="block text-[10px] uppercase text-[#9CA3AF] mb-1.5 tracking-widest font-semibold">
                        01 // {t('registration.admin_email_label') || 'ოპერატორის ელ-ფოსტა'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operator@artron.ge"
                        className="w-full bg-[#121418] border border-white/15 focus:border-[#00ff87] rounded-md px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-[#9CA3AF] mb-1.5 tracking-widest font-semibold">
                        02 // {t('system.security_key') || 'უსაფრთხოების პაროლი'}
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#121418] border border-white/15 focus:border-[#00ff87] rounded-md px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-[48px] bg-[#00ff87] text-[#0A0D10] font-mono text-[12px] font-bold tracking-[2px] uppercase rounded-md shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] transition-all cursor-pointer mt-2"
                    >
                      {t('actions.authorize_console') || 'ავტორიზაცია'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Other Subchapters doctrines */
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 gap-2.5">
                  {activeSubChapter.doctrines.map((doctrine, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded bg-[#121418] border border-[#262a33] hover:border-[#00ff87]/50 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/30">
                          0{idx + 1}
                        </span>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                          {doctrine}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {activeSubChapter.id === '09.2' && (
                  <div className="pt-2">
                    <Link
                      href="/get-started?mode=demo"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-[#00ff87]/15 hover:bg-[#00ff87]/25 border border-[#00ff87]/50 text-[#00ff87] text-xs font-mono font-bold tracking-wider uppercase transition-all"
                    >
                      <span>🎮 {t('gateway.btn_run_sandbox')}</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#262a33]/60 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase mt-4">
            <span>{t('system.security_classified')}</span>
            <span>{t('system.encryption_aes')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

