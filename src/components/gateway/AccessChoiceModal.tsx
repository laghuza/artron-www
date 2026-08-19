"use client";

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/core';

interface AccessChoiceModalProps {
  onSelectPath: (mode: 'FULL_B2B' | 'TEMP_OTP', otpCode?: string) => void;
  onClose: () => void;
}

export const AccessChoiceModal: React.FC<AccessChoiceModalProps> = ({
  onSelectPath,
  onClose,
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  // Global ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        soundEngine.playPulseNode();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setOtpError('ENTER VALID 6-DIGIT OTP CODE');
      soundEngine.playPulseNode();
      return;
    }
    soundEngine.playSystemAccess();
    onSelectPath('TEMP_OTP', otpCode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060709]/95 backdrop-blur-2xl overflow-y-auto flex items-center justify-center p-4 md:p-6 select-none font-mono animate-fadeIn">
      {/* Background Ambient Radial Spotlight */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00ff87]/5 blur-[170px] pointer-events-none" />

      {/* Top Right Floating Exit Button */}
      <div className="absolute top-4 right-4 md:top-8 md:right-10 z-20">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onClose();
          }}
          className="text-[10px] md:text-[11px] text-[#9CA3AF] hover:text-[#00ff87] transition-colors cursor-pointer tracking-[2px] uppercase"
        >
          [ ESC // CLOSE ]
        </button>
      </div>

      {/* Main Choice Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-6 md:space-y-8 my-auto py-8">
        {/* Header HUD */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-bold text-[#9CA3AF] tracking-[2.5px] uppercase">
              ARTRON OS // DUAL-PATH ACCESS SELECTION
            </span>
          </div>
          <h2 className="text-[18px] md:text-[22px] font-bold text-[#E5E7EB] tracking-[3px] uppercase">
            CHOOSE ACCESS PROTOCOL
          </h2>
          <p className="text-[11px] md:text-[12px] text-[#9CA3AF] max-w-md mx-auto font-sans leading-relaxed px-2">
            Select your authorization credentials path to proceed into the Artron Sports OS matrix.
          </p>
        </div>

        {/* 2 Path Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {/* PATH 01: B2B PURCHASE & FULL REGISTRATION */}
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/20 hover:border-[#00A3FF]/60 rounded-xl p-5 md:p-6 flex flex-col justify-between space-y-4 md:space-y-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] group">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] md:text-[10px] text-[#00A3FF] font-bold tracking-[1.5px] uppercase font-mono">
                <span>PATH 01</span>
                <span>B2B REGISTRATION</span>
              </div>
              <h3 className="text-[14px] md:text-[16px] font-bold text-[#E5E7EB] tracking-[1.5px] uppercase group-hover:text-white transition-colors">
                სისტემის შეძენა / რეგისტრაცია
              </h3>
              <p className="text-[11px] md:text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                დარბაზის, აუზის ან სტუდიის პირდაპირი B2B რეგისტრაცია და სამართავი პანელის შეძენა.
              </p>
            </div>

            <a
              href="/get-started?mode=register"
              onClick={() => soundEngine.playSystemAccess()}
              className="w-full py-2.5 md:py-3 bg-[#00A3FF]/15 hover:bg-[#00A3FF] text-[#00A3FF] hover:text-slate-950 font-bold text-[11px] md:text-[12px] tracking-[2px] uppercase rounded border border-[#00A3FF]/40 transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] text-center block"
            >
              [ 🚀 სისტემის შეძენა / რეგისტრაცია → ]
            </a>
          </div>

          {/* PATH 02: 1-HOUR GUEST TEST DRIVE */}
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/20 hover:border-emerald-400/60 rounded-xl p-5 md:p-6 flex flex-col justify-between space-y-4 md:space-y-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] group">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] md:text-[10px] text-emerald-400 font-bold tracking-[1.5px] uppercase font-mono">
                <span>PATH 02</span>
                <span>1-HOUR GUEST DEMO</span>
              </div>
              <h3 className="text-[14px] md:text-[16px] font-bold text-[#E5E7EB] tracking-[1.5px] uppercase group-hover:text-white transition-colors">
                ⚡ 1-საათიანი GUEST დემო წვდომა
              </h3>
              <p className="text-[11px] md:text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                მყისიერი ერთჯერადი წვდომა სამართავ პანელში რეალური საჩვენებელი მონაცემებით (სატესტო პერიოდის ლოდინის გარეშე).
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href="/get-started?mode=demo"
                onClick={() => soundEngine.playSystemAccess()}
                className="w-full py-2.5 md:py-3 bg-emerald-500/15 hover:bg-emerald-400 text-emerald-400 hover:text-slate-950 font-bold text-[11px] md:text-[12px] tracking-[2px] uppercase rounded border border-emerald-400/40 transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] text-center block"
              >
                [ ⚡ GUEST დემოს მიღება → ]
              </a>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSystemAccess();
                  onSelectPath('TEMP_OTP', 'GUEST1');
                }}
                className="w-full py-1.5 text-[10px] text-slate-400 hover:text-white text-center font-mono uppercase tracking-wider transition-colors"
              >
                ან მყისიერად გახსენით საჩვენებელი Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="text-[9px] text-[#9CA3AF] tracking-[2px]">
          AES-256 PII ENCRYPTED MULTI-TENANT ACCESS LAYER
        </div>
      </div>
    </div>
  );
};
