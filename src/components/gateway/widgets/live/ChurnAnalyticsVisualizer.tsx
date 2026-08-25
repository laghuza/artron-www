"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface ChurnAnalyticsVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const ChurnAnalyticsVisualizer: React.FC<ChurnAnalyticsVisualizerProps> = ({
  cardType,
}) => {
  const [campaignSent, setCampaignSent] = useState(false);
  const [selectedMember, setSelectedMember] = useState<'high' | 'medium' | 'low'>('high');

  const handleSendAiTrigger = () => {
    soundEngine.playSystemAccess();
    setCampaignSent(true);
    setTimeout(() => setCampaignSent(false), 4000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#00ff87]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-[#00ff87] font-bold tracking-wider uppercase text-[11px]">
            AI CHURN PREDICTION // WIN-BACK RETENTION MATRIX
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 07 // AI ANALYTICS
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Member Risk Roster */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              მოვარჯიშეთა რისკის სეგმენტაცია (ML პროგნოზი)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setSelectedMember('high');
                }}
                className={`p-2 rounded text-left transition-all border ${
                  selectedMember === 'high'
                    ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'bg-black/30 border-white/10 text-gray-400'
                }`}
              >
                <div className="text-[10px] font-bold text-red-400">🔴 მაღალი რისკი (88%)</div>
                <div className="text-[9px] text-gray-300">დავით კვარაცხელია</div>
                <div className="text-[8px] text-gray-400 mt-0.5">18 დღეა არ უვარჯიშია</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setSelectedMember('medium');
                }}
                className={`p-2 rounded text-left transition-all border ${
                  selectedMember === 'medium'
                    ? 'bg-yellow-500/20 border-yellow-500 text-white'
                    : 'bg-black/30 border-white/10 text-gray-400'
                }`}
              >
                <div className="text-[10px] font-bold text-yellow-400">🟡 საშუალო (54%)</div>
                <div className="text-[9px] text-gray-300">მარიამ შენგელია</div>
                <div className="text-[8px] text-gray-400 mt-0.5">ვიზიტები -50% კვირაში</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setSelectedMember('low');
                }}
                className={`p-2 rounded text-left transition-all border ${
                  selectedMember === 'low'
                    ? 'bg-[#00ff87]/20 border-[#00ff87] text-white'
                    : 'bg-black/30 border-white/10 text-gray-400'
                }`}
              >
                <div className="text-[10px] font-bold text-[#00ff87]">🟢 ლოიალური (12%)</div>
                <div className="text-[9px] text-gray-300">ირაკლი ჯაფარიძე</div>
                <div className="text-[8px] text-gray-400 mt-0.5">4 ვიზიტი/კვირაში</div>
              </button>
            </div>
          </div>

          {/* AI Win-back Trigger */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-white">AI სამოტივაციო შეთავაზება (GoSMS/Push)</div>
              <div className="text-[9px] text-gray-400">
                შეთავაზება: &quot;დაბრუნდი დარბაზში და მიიღე -15% განახლებაზე + 1 უფასო PT სესია&quot;
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendAiTrigger}
              className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${
                campaignSent
                  ? 'bg-[#00ff87] text-black shadow-[0_0_15px_rgba(0,255,135,0.4)]'
                  : 'bg-[#00ff87]/20 hover:bg-[#00ff87]/30 border border-[#00ff87] text-[#00ff87]'
              }`}
            >
              {campaignSent ? '✓ გაიგზავნა!' : '⚡ AI რეაქტივაცია'}
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              ავტომატური მარკეტინგული კამპანიების წესები
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">Cooldown ფილტრი:</span>
                <span className="text-[#00ff87] font-bold">მაქს. 1 SMS / 14 დღეში (სპამის პრევენცია)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">Open-Meteo ამინდის ტრიგერი:</span>
                <span className="text-[#00B0FF] font-bold">წვიმიან/ცივ ამინდში სამოტივაციო Push</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              გადინების (Churn) შემცირება და დაბრუნებული შემოსავალი
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">Churn შემცირება</div>
                <div className="text-sm font-bold text-[#00ff87]">-34.8%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">დაბრუნებული წევრები</div>
                <div className="text-sm font-bold text-[#00ff87]">22.4%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">Win-Back ROI</div>
                <div className="text-sm font-bold text-[#00ff87]">6.2x</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>AI ML PIPELINE ACTIVE</span>
        <span className="text-[#00ff87]">GOSMS GATEWAY LINKED</span>
      </div>
    </div>
  );
};
