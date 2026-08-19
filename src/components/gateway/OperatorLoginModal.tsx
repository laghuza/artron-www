"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

interface OperatorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { username: string; orgName?: string; discipline?: string }) => void;
}

export const OperatorLoginModal: React.FC<OperatorLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg(t('auth.err_email_required') || 'გთხოვთ შეიყვანოთ მომხმარებელი ან ელ.ფოსტა');
      return;
    }
    if (!password.trim()) {
      setErrorMsg(t('auth.err_password_required') || 'გთხოვთ შეიყვანოთ პაროლი');
      return;
    }

    setIsLoading(true);
    soundEngine.playPulseNode();

    setTimeout(() => {
      setIsLoading(false);
      soundEngine.playSystemAccess();
      onLoginSuccess({
        username: email.includes('@') ? email : `${email}@artron.ge`,
        orgName: 'LLC ARTRON MASTER MATRIX',
        discipline: 'B2B Operator Console',
      });
    }, 450);
  };

  const handleQuickDemoFill = () => {
    soundEngine.playHoverChip();
    setEmail('operator@artron.ge');
    setPassword('••••••••••••');
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      soundEngine.playSystemAccess();
      onLoginSuccess({
        username: 'operator@artron.ge',
        orgName: 'LLC ARTRON MASTER MATRIX',
        discipline: 'Matrix Operations Core',
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      {/* Discord-styled Card Container */}
      <div className="relative w-full max-w-md bg-[#1E1F22] border border-[#313338] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Glowing Laser Border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00ff87] to-transparent" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#2B2D31] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2B2D31] border border-white/10 flex items-center justify-center text-[18px] shadow-inner">
              🔐
            </div>
            <div>
              <div className="text-[14px] font-bold text-white tracking-wide font-mono flex items-center gap-2">
                <span>ARTRON OS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2] font-semibold border border-[#5865F2]/30">
                  SYSTEM B2B
                </span>
              </div>
              <p className="text-[12px] text-[#949BA4] font-sans">
                {t('auth.operator_auth_subtitle') || 'ოპერატორის ავტორიზაცია'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#2B2D31] hover:bg-[#35373C] text-[#949BA4] hover:text-white flex items-center justify-center text-[13px] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Discord Embed-styled Notice */}
        <div className="px-6 pt-4">
          <div className="bg-[#2B2D31] border-l-4 border-[#00ff87] p-3 rounded-r-lg text-[12px] text-[#DBDEE1] font-sans flex items-start gap-2.5">
            <span className="text-[14px]">🤖</span>
            <div>
              <div className="font-semibold text-white flex items-center gap-1.5 font-mono text-[11px]">
                <span>ARTRON BOT</span>
                <span className="text-[9px] px-1 rounded bg-[#5865F2] text-white">BOT</span>
              </div>
              <div className="text-[#949BA4] text-[11.5px] mt-0.5">
                {t('auth.bot_instruction') || 'შეიყვანეთ თქვენი უფლებამოსილი ოპერატორის ან ადმინის მონაცემები სამართავ კონსოლში შესასვლელად.'}
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4 font-sans">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[12px] flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#B5BAC1] uppercase tracking-wider font-mono">
              {t('auth.input_email_label') || 'მომხმარებელი / ელ.ფოსტა'} <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@artron.ge"
                className="w-full bg-[#111214] border border-[#383A40] focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87] text-white placeholder-[#5C6067] px-3.5 py-2.5 rounded-lg text-[13px] outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#B5BAC1] uppercase tracking-wider font-mono">
                {t('auth.input_password_label') || 'პაროლი'} <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#00A3FF] hover:underline cursor-pointer"
              >
                {showPassword ? 'დამალვა' : 'გამოჩენა'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#111214] border border-[#383A40] focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87] text-white placeholder-[#5C6067] px-3.5 py-2.5 rounded-lg text-[13px] outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#00ff87] hover:bg-[#00df74] disabled:opacity-50 text-[#090b0e] font-mono text-[12px] font-bold tracking-wider uppercase rounded-lg shadow-[0_0_20px_rgba(0,255,135,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>მიმდინარეობს გადამოწმება...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>{t('auth.btn_submit_login') || 'სისტემაში შესვლა →'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoFill}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-[#2B2D31] hover:bg-[#35373C] border border-[#383A40] hover:border-[#00ff87]/50 text-[#00ff87] font-mono text-[11px] font-semibold tracking-wide uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡</span>
              <span>{t('auth.btn_demo_fill') || 'სატესტო დემო-შესვლა (1-Click)'}</span>
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#111214] border-t border-[#2B2D31] text-[10px] text-[#949BA4] flex items-center justify-between font-mono">
          <span>🔒 AES-256 ENCRYPTED</span>
          <span>RLS PROTECTED</span>
        </div>
      </div>
    </div>
  );
};
