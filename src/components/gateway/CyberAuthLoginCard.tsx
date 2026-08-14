"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

interface CyberAuthLoginCardProps {
  onAuthenticate: (
    mode: 'FULL_B2B' | 'TEMP_OTP',
    credentials: { username?: string; password?: string; otpCode?: string }
  ) => void;
  onClose?: () => void;
}

export const CyberAuthLoginCard: React.FC<CyberAuthLoginCardProps> = ({
  onAuthenticate,
  onClose,
}) => {
  const { t } = useI18n();
  const [username, setUsername] = useState('operator@artron.ge');
  const [password, setPassword] = useState('••••••••••••');
  const [errorMsg, setErrorMsg] = useState('');

  // Global ESC key listener for instant return to core
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        soundEngine.playPulseNode();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg(t('system.credentials_required'));
      soundEngine.playPulseNode();
      return;
    }
    soundEngine.playSystemAccess();
    onAuthenticate('FULL_B2B', { username, password });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#060709] overflow-y-auto flex items-center justify-center p-4 md:p-8 select-none font-mono animate-fadeIn">
      {/* Subtle Ambient Radial Glow in Center */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00ff87]/5 blur-[160px] pointer-events-none" />

      {/* Floating Top Right Exit Control */}
      {onClose && (
        <div className="absolute top-4 right-4 md:top-8 md:right-10 z-20">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onClose();
            }}
            className="text-[10px] md:text-[11px] text-[#9CA3AF] hover:text-[#00ff87] transition-colors cursor-pointer tracking-[2px] uppercase"
          >
            {t('actions.esc_return')}
          </button>
        </div>
      )}

      {/* Main Frameless Floating Container */}
      <div className="relative w-full max-w-lg flex flex-col items-center text-center z-10 space-y-6 md:space-y-8 my-auto py-8">
        {/* Minimalist Core Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-[9px] md:text-[11px] font-bold text-[#9CA3AF] tracking-[2.5px] uppercase">
              {t('system.invisible_matrix')}
            </span>
          </div>
          <h2 className="text-[16px] md:text-[20px] font-bold text-[#E5E7EB] tracking-[3px] uppercase">
            {t('system.gateway_entry')}
          </h2>
          <p className="text-[11px] md:text-[12px] text-[#9CA3AF] max-w-md leading-relaxed font-sans px-2">
            {t('system.gateway_desc')}
          </p>
        </div>

        {/* Frameless Form with Underline Line Inputs */}
        <form onSubmit={handleSubmit} className="w-full space-y-6 md:space-y-8 pt-2 md:pt-4">
          <div className="text-left space-y-2">
            <label className="block text-[9px] md:text-[10px] text-[#9CA3AF] tracking-[2px] uppercase font-semibold">
              {t('system.operator_identifier')}
            </label>
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-[#9CA3AF]/25 focus:border-[#00ff87] py-2 md:py-3 text-[13px] md:text-[14px] text-[#D1D5DB] focus:outline-none transition-all tracking-[1px] placeholder-[#9CA3AF]/30"
              placeholder="operator@artron.ge"
            />
          </div>

          <div className="text-left space-y-2">
            <label className="block text-[9px] md:text-[10px] text-[#9CA3AF] tracking-[2px] uppercase font-semibold">
              {t('system.security_access_key')}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#9CA3AF]/25 focus:border-[#00ff87] py-2 md:py-3 text-[13px] md:text-[14px] text-[#D1D5DB] focus:outline-none transition-all tracking-[1px] placeholder-[#9CA3AF]/30"
              placeholder="••••••••••••"
            />
          </div>

          {errorMsg && (
            <div className="text-[10px] md:text-[11px] text-[#FF5252] bg-[#FF5252]/10 py-2 rounded border border-[#FF5252]/30 text-center font-bold tracking-wider">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="pt-4 md:pt-6">
            <button
              type="submit"
              className="w-full py-3 md:py-4 text-[#00ff87] hover:text-[#060709] bg-[rgba(0,255,135,0.08)] hover:bg-[#00ff87] font-bold text-[12px] md:text-[13px] tracking-[3px] uppercase rounded-sm border border-[#00ff87]/30 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.15)] hover:shadow-[0_0_35px_rgba(0,255,135,0.5)]"
            >
              {t('actions.initialize_gateway')}
            </button>
          </div>
        </form>

        {/* Minimal Bottom Footer */}
        <div className="pt-6 flex items-center justify-between w-full text-[9px] text-[#9CA3AF] tracking-[2px]">
          <span>{t('system.aes_encrypted_layer')}</span>
          <span className="text-[#00ff87]/70">{t('system.state_encryption_active')}</span>
        </div>
      </div>
    </div>
  );
};
