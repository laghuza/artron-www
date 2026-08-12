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
    <div className="fixed inset-0 z-50 bg-[#060709]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none font-mono animate-fadeIn">
      {/* Background Ambient Radial Spotlight */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00E676]/5 blur-[170px] pointer-events-none" />

      {/* Top Right Floating Exit Button */}
      <div className="absolute top-8 right-10 z-20">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onClose();
          }}
          className="text-[11px] text-[#9CA3AF] hover:text-[#00E676] transition-colors cursor-pointer tracking-[2px] uppercase"
        >
          [ ESC // CLOSE ]
        </button>
      </div>

      {/* Main Choice Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-8">
        {/* Header HUD */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[11px] font-bold text-[#9CA3AF] tracking-[2.5px] uppercase">
              ARTRON OS // DUAL-PATH ACCESS SELECTION
            </span>
          </div>
          <h2 className="text-[22px] font-bold text-[#E5E7EB] tracking-[3px] uppercase">
            CHOOSE ACCESS PROTOCOL
          </h2>
          <p className="text-[12px] text-[#9CA3AF] max-w-md mx-auto font-sans leading-relaxed">
            Select your authorization credentials path to proceed into the Artron Sports OS matrix.
          </p>
        </div>

        {/* 2 Path Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {/* PATH 01: B2B OPERATOR ACCESS */}
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/20 hover:border-[#00E676]/60 rounded-xl p-6 flex flex-col justify-between space-y-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,230,118,0.15)] group">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-[#00E676] font-bold tracking-[1.5px] uppercase">
                <span>PATH 01</span>
                <span>B2B MATRIX</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#E5E7EB] tracking-[1.5px] uppercase group-hover:text-white transition-colors">
                REGISTERED B2B OPERATOR
              </h3>
              <p className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                Full-tier access for sports facility managers, club admins, and federation operators with verified credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSystemAccess();
                onSelectPath('FULL_B2B');
              }}
              className="w-full py-3 bg-[rgba(0,230,118,0.12)] hover:bg-[#00E676] text-[#00E676] hover:text-[#060709] font-bold text-[12px] tracking-[2px] uppercase rounded border border-[#00E676]/40 transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
            >
              [ SELECT B2B OPERATOR PATH → ]
            </button>
          </div>

          {/* PATH 02: TEMPORARY OTP GUEST ACCESS */}
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/20 hover:border-[#00E676]/60 rounded-xl p-6 flex flex-col justify-between space-y-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,230,118,0.15)] group">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-[#00E676] font-bold tracking-[1.5px] uppercase">
                <span>PATH 02</span>
                <span>OTP GUEST PASS</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#E5E7EB] tracking-[1.5px] uppercase group-hover:text-white transition-colors">
                TEMPORARY OTP PASSHOLDER
              </h3>
              <p className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                Streamlined 1-day access pass for athletes, guests, and temporary telemetry monitoring via a 6-digit OTP code.
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  setOtpError('');
                }}
                placeholder="ENTER 6-DIGIT OTP PASS"
                className="w-full px-3 py-2 bg-[#060709] border border-[#9CA3AF]/20 focus:border-[#00E676] rounded text-[12px] text-[#D1D5DB] focus:outline-none tracking-[2px] uppercase text-center font-mono placeholder-[#9CA3AF]/30"
              />
              {otpError && (
                <div className="text-[10px] text-[#FF5252] text-center font-bold">
                  {otpError}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-[rgba(0,230,118,0.12)] hover:bg-[#00E676] text-[#00E676] hover:text-[#060709] font-bold text-[12px] tracking-[2px] uppercase rounded border border-[#00E676]/40 transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
              >
                [ ENTER OTP PASSHOLDER → ]
              </button>
            </form>
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
