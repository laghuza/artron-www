"use client";

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/core';

interface MobilePassVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const MobilePassVisualizer: React.FC<MobilePassVisualizerProps> = ({
  cardType,
}) => {
  const [countdown, setCountdown] = useState(15);
  const [qrKey, setQrKey] = useState(1001);
  const [membershipActive, setMembershipActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrKey((k) => k + 1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#00B0FF]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse" />
          <span className="text-[#00B0FF] font-bold tracking-wider uppercase text-[11px]">
            MOBILE PASS // DYNAMIC QR &amp; B2C ENGINE
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 04 // MOBILE APP
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Simulated Smartphone Screen */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div className="space-y-2 max-w-[200px]">
              <div className="text-[10px] text-[#00B0FF] font-bold uppercase">
                ARTRON PASS · LIVE QR
              </div>
              <div className="text-[12px] font-bold text-white">გიორგი მაისურაძე</div>
              <div className="text-[9px] text-gray-400">
                სტატუსი: {membershipActive ? <span className="text-[#00ff87]">აქტიური აბონემენტი</span> : <span className="text-red-400">შეჩერებული</span>}
              </div>
              <div className="text-[9px] text-gray-500">
                Anti-Screenshot როტაცია: <strong className="text-[#00B0FF]">{countdown}s</strong>
              </div>
            </div>

            {/* Simulated QR Badge */}
            <div className="w-24 h-24 bg-white p-1.5 rounded-lg flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,176,255,0.4)]">
              <div className="w-full h-full bg-black rounded flex flex-col items-center justify-center p-1 text-[8px] text-center text-white font-mono">
                <div className="text-[#00B0FF] font-bold">QR_ROT_{qrKey}</div>
                <div className="text-[6px] text-gray-400 mt-1">NFC / BLE SYNC</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSystemAccess();
                setMembershipActive(true);
              }}
              className="py-2 px-2.5 bg-[#00B0FF]/20 hover:bg-[#00B0FF]/30 border border-[#00B0FF] text-[#00B0FF] rounded text-[10px] font-bold text-center"
            >
              ⚡ 1-Click განახლება (BOG iPay)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                setCountdown(15);
                setQrKey((k) => k + 1);
              }}
              className="py-2 px-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 rounded text-[10px] text-center"
            >
              🔄 QR-ის განახლება
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              მომხმარებლის უფლებები და 14-დღიანი დაბრუნების გარანტია
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">Apple App Store &amp; Google Play:</span>
                <span className="text-[#00ff87] font-bold">100% COMPLIANT (Account Deletion)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">საქართველოს კანონმდებლობა:</span>
                <span className="text-[#00B0FF] font-bold">14-დღიანი უპირობო დაბრუნება</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              მობილური კონვერსიები &amp; გაყიდვები
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ონლაინ გაყიდვები</div>
                <div className="text-sm font-bold text-[#00ff87]">78.4%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">დარბაზის რიგები</div>
                <div className="text-sm font-bold text-[#00B0FF]">0 წამი</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">აპლიკაციის რეიტინგი</div>
                <div className="text-sm font-bold text-[#00ff87]">4.9 ★</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>DYNAMIC ROTATION &lt; 15S</span>
        <span className="text-[#00B0FF]">APPLE/GOOGLE READY</span>
      </div>
    </div>
  );
};
