"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { SubChapter } from '@/types/gateway';
import { soundEngine } from '@/core';

interface NodeDetailPanelProps {
  activeSubChapter: SubChapter | null;
  onBackToNode: () => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  activeSubChapter,
  onBackToNode
}) => {
  const { t } = useI18n();
  const [entityType, setEntityType] = useState<'FEDERATION' | 'CLUB' | 'ATHLETE' | 'SPECIALIST'>('FEDERATION');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entityName, setEntityName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!activeSubChapter) return null;

  const isAccessForm = activeSubChapter.id === 'membership-init' || activeSubChapter.id === 'console-access';
  const isRegister = activeSubChapter.id === 'membership-init';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSystemAccess();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full lg:w-[60%] bg-[#0B0C0E] p-6 lg:p-7 flex flex-col justify-between select-none overflow-y-auto border-l border-[rgba(156,163,175,0.12)]">
      <div className="w-full flex flex-col flex-1 min-h-0 mb-6">
        {/* Top Header Control Alignment Line (Matches 40% Sidebar Horizon Line) */}
        <div className="w-full border-b border-[rgba(156,163,175,0.12)] pb-3.5 mb-6 flex items-center justify-between h-[42px]">
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
        <div className="animate-fadeIn w-full flex-1 flex flex-col justify-between p-6 lg:p-8 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md">
          <div className="space-y-6">
            {/* Section Header */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono text-[#00ff87] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                {isRegister ? t('system.gateway_membership_init') : t('system.gateway_console_access')}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight uppercase font-mono">
                {t(`subchapters.${activeSubChapter.id}`) || activeSubChapter.title}
              </h2>
            </div>

            {/* Render Interactive Form for Membership Init or Console Access */}
            {isAccessForm ? (
              <div className="space-y-6 animate-fadeIn">
                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-mono bg-[#121418]/90 border border-[#00ff87]/40 rounded-xl p-8">
                    <div className="w-14 h-14 rounded-full border border-[#00ff87] bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] text-2xl">
                      ✓
                    </div>
                    <div className="text-white font-bold text-lg tracking-wider uppercase">
                      {isRegister ? t('system.init_dispatched') : t('system.session_authorized')}
                    </div>
                    <p className="text-sm text-[#9CA3AF] max-w-md leading-relaxed font-sans">
                      {isRegister
                        ? t('system.init_dispatched_desc')
                        : t('system.session_authorized_desc')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-xs font-mono text-[#00ff87] underline hover:text-white cursor-pointer"
                    >
                      {t('actions.edit_form_data')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-mono">
                    {isRegister && (
                      <>
                        <div>
                          <label className="block text-[10px] uppercase text-[#9CA3AF] mb-2 tracking-widest font-semibold">
                            {t('system.entity_category')}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {(['FEDERATION', 'CLUB', 'ATHLETE', 'SPECIALIST'] as const).map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  soundEngine.playPulseNode();
                                  setEntityType(cat);
                                }}
                                className={`py-2.5 px-3 border rounded text-center text-[10px] font-bold transition-all cursor-pointer ${
                                  entityType === cat
                                    ? 'bg-[#16191E] border-[#00ff87] text-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                                    : 'bg-[#121418] border-white/10 text-[#9CA3AF] hover:text-white'
                                }`}
                              >
                                ● {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase text-[#9CA3AF] mb-2 tracking-widest font-semibold">
                            {t('system.entity_name')}
                          </label>
                          <input
                            type="text"
                            required
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            placeholder={t('system.placeholder_org')}
                            className="w-full bg-[#121418] border border-white/15 focus:border-[#00ff87] rounded-md px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-[10px] uppercase text-[#9CA3AF] mb-2 tracking-widest font-semibold">
                        {isRegister ? t('system.operator_email') : t('system.operator_email').replace('03 //', '01 //')}
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
                      <label className="block text-[10px] uppercase text-[#9CA3AF] mb-2 tracking-widest font-semibold">
                        {isRegister ? t('system.security_key') : t('system.security_key').replace('04 //', '02 //')}
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

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full h-[52px] bg-[#00ff87] text-[#0A0D10] font-mono text-[13px] font-bold tracking-[2px] uppercase rounded-md shadow-[0_0_25px_rgba(0,255,135,0.3)] hover:brightness-110 hover:shadow-[0_0_35px_rgba(0,255,135,0.5)] transition-all cursor-pointer"
                      >
                        {isRegister ? t('actions.submit_membership') : t('actions.authorize_console')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pt-2">
                {activeSubChapter.doctrines.map((doctrine, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded bg-[#121418] border border-[#262a33] hover:border-[#00ff87]/50 transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/30">
                        0{idx + 1}
                      </span>
                      <p className="text-gray-300 text-sm leading-relaxed font-sans">
                        {doctrine}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#262a33]/60 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase mt-4">
            <span>{t('system.security_classified')}</span>
            <span>{t('system.encryption_aes')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
