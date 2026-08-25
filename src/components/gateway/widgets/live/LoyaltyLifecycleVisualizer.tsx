"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface LoyaltyLifecycleVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const LoyaltyLifecycleVisualizer: React.FC<LoyaltyLifecycleVisualizerProps> = ({
  cardType,
}) => {
  const [cashbackRate, setCashbackRate] = useState(10);
  const [pointsBank, setPointsBank] = useState(140);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeDaysLeft, setFreezeDaysLeft] = useState(14);

  const handleToggleFreeze = () => {
    soundEngine.playPulseNode();
    if (!isFrozen) {
      setIsFrozen(true);
      setFreezeDaysLeft((prev) => Math.max(0, prev - 1));
    } else {
      setIsFrozen(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#D4AF37]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] font-bold tracking-wider uppercase text-[11px]">
            LOYALTY &amp; CASHBACK ENGINE // SUBSCRIPTION LIFECYCLE
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 05 // LOYALTY
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-3 bg-[#121722] p-3 rounded-lg border border-white/10">
            {/* Cashback Slider */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-400">ქეშბექის წილი აბონემენტზე:</div>
              <div className="text-base font-bold text-[#D4AF37]">{cashbackRate}% ქეშბექი</div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={cashbackRate}
                onChange={(e) => setCashbackRate(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            {/* Points Bank */}
            <div className="space-y-1.5 border-l border-white/10 pl-3">
              <div className="text-[10px] text-gray-400">სპორტსმენის ქულების ბანკი:</div>
              <div className="text-base font-bold text-[#00ff87]">{pointsBank} PTS (₾{pointsBank / 10})</div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSystemAccess();
                  setPointsBank((p) => p + 25);
                }}
                className="px-2 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 rounded text-[10px] text-[#D4AF37]"
              >
                +25 PTS ბონუსი
              </button>
            </div>
          </div>

          {/* Subscription Freeze / Unfreeze Simulator */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-white">აბონემენტის გაყინვის მართვა</div>
              <div className="text-[9px] text-gray-400">
                დარჩენილი გაყინვის ლიმიტი: <strong className="text-[#00B0FF]">{freezeDaysLeft} დღე</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleFreeze}
              className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                isFrozen
                  ? 'bg-[#00B0FF]/20 border border-[#00B0FF] text-[#00B0FF]'
                  : 'bg-white/5 border border-white/15 text-gray-300 hover:text-white'
              }`}
            >
              {isFrozen ? '❄️ გაყინულია (განყინვა)' : '🧊 აბონემენტის გაყინვა'}
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              ფინანსური წესები &amp; გაყინვის პოლიტიკა
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">გაყინვის მაქსიმალური ვადა:</span>
                <span className="text-[#D4AF37] font-bold">14 დღე / წელიწადში (ავტო-განყინვა)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">ქულების გადაცემა / მეგობრის ბარათზე:</span>
                <span className="text-[#00ff87] font-bold">მხარდაჭერილია (Points Transfer)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              მომხმარებელთა ლოიალობა და LTV ზრდა
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">განმეორებითი შეძენა</div>
                <div className="text-sm font-bold text-[#00ff87]">+44.2%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">გაყინვებით გადარჩენილი</div>
                <div className="text-sm font-bold text-[#D4AF37]">92 კლიენტი</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ქეშბექის ROI</div>
                <div className="text-sm font-bold text-[#00ff87]">4.8x</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>POINTS BANK BALANCED</span>
        <span className="text-[#D4AF37]">AUTOMATED EXPIRY CRON</span>
      </div>
    </div>
  );
};
