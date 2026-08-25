"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface CrmHierarchyVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const CrmHierarchyVisualizer: React.FC<CrmHierarchyVisualizerProps> = ({
  cardType,
  subChapterId = '01.1',
}) => {
  const [selectedProfile, setSelectedProfile] = useState<'parent' | 'child1' | 'child2'>('parent');
  const [familyBalance, setFamilyBalance] = useState(350);
  const [childLimit, setChildLimit] = useState(80);
  const [medicalVerified, setMedicalVerified] = useState(true);
  const [rlsStrict, setRlsStrict] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>('სისტემა მზად არის ცოცხალი ინტერაქციისთვის');

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
  };

  const handleAdjustBalance = (amount: number) => {
    soundEngine.playPulseNode();
    setFamilyBalance((prev) => {
      const next = Math.max(0, prev + amount);
      triggerFeedback(`⚡ ბალანსი განახლდა: ${next} ₾ (${amount > 0 ? `+${amount}` : amount} ₾)`);
      return next;
    });
  };

  const handleProfileSelect = (p: 'parent' | 'child1' | 'child2', name: string) => {
    soundEngine.playPulseNode();
    setSelectedProfile(p);
    triggerFeedback(`👤 არჩეულია პროფილი: ${name}`);
  };

  const handleToggleMedical = () => {
    soundEngine.playPulseNode();
    const next = !medicalVerified;
    setMedicalVerified(next);
    if (!next) {
      triggerFeedback(`🛑 ტურნიკეტის წვდომა შეიზღუდა: სამედიცინო ფორმა 100 ვადაგასულია`);
    } else {
      triggerFeedback(`✅ სამედიცინო ფორმა 100 დადასტურებულია — წვდომა გახსნილია`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#090D14]/95 border border-[#00B0FF]/30 rounded-xl font-mono text-xs text-white">
      {/* Top Controls & Status Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse" />
          <span className="text-[#00B0FF] font-bold tracking-wider uppercase text-[11px]">
            ARTRON CRM // PROFILE & HIERARCHY MATRIX
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 01 // CRM 360°
        </span>
      </div>

      {/* Live Action Feedback Toast Bar */}
      {actionFeedback && (
        <div className="mb-2.5 px-2.5 py-1.5 rounded-lg bg-[#00B0FF]/10 border border-[#00B0FF]/30 flex items-center justify-between text-[10.5px] text-[#00B0FF] animate-fadeIn">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] animate-ping" />
            <span className="truncate">{actionFeedback}</span>
          </div>
          <span className="text-[9px] text-gray-400 shrink-0 font-mono">LIVE SYNC</span>
        </div>
      )}

      {/* Main Interactive Workspace depending on Card Type */}
      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Family Hierarchy Selector */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              მრავალდონიანი ოჯახური ანგარიშის ხე (Family Tree)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleProfileSelect('parent', 'მშობელი (გიორგი ბერიძე)')}
                className={`p-2 rounded text-left transition-all border ${
                  selectedProfile === 'parent'
                    ? 'bg-[#00B0FF]/20 border-[#00B0FF] text-white shadow-[0_0_12px_rgba(0,176,255,0.3)]'
                    : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-bold">მშობელი (Primary)</div>
                <div className="text-[9px] text-[#00B0FF]">გიორგი ბერიძე</div>
              </button>

              <button
                type="button"
                onClick={() => handleProfileSelect('child1', 'შვილი 1 (ნიკოლოზ ბერიძე)')}
                className={`p-2 rounded text-left transition-all border ${
                  selectedProfile === 'child1'
                    ? 'bg-[#00B0FF]/20 border-[#00B0FF] text-white shadow-[0_0_12px_rgba(0,176,255,0.3)]'
                    : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-bold">შვილი 1 (ცურვა)</div>
                <div className="text-[9px] text-[#00ff87]">ნიკოლოზ ბერიძე</div>
              </button>

              <button
                type="button"
                onClick={() => handleProfileSelect('child2', 'შვილი 2 (ანასტასია ბერიძე)')}
                className={`p-2 rounded text-left transition-all border ${
                  selectedProfile === 'child2'
                    ? 'bg-[#00B0FF]/20 border-[#00B0FF] text-white shadow-[0_0_12px_rgba(0,176,255,0.3)]'
                    : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-bold">შვილი 2 (ძიუდო)</div>
                <div className="text-[9px] text-[#D4AF37]">ანასტასია ბერიძე</div>
              </button>
            </div>
          </div>

          {/* Profile Details & Dynamic Controls */}
          <div className="grid grid-cols-2 gap-3 bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-400">საერთო ოჯახური ბალანსი:</div>
              <div className="text-base font-bold text-[#00B0FF]">{familyBalance} ₾</div>
              <div className="flex gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleAdjustBalance(50)}
                  className="px-2 py-1 bg-[#00B0FF]/20 hover:bg-[#00B0FF]/30 border border-[#00B0FF]/50 rounded text-[10px] text-[#00B0FF]"
                >
                  +50 ₾ ჩარიცხვა
                </button>
                <button
                  type="button"
                  onClick={() => handleAdjustBalance(-20)}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/15 rounded text-[10px] text-gray-300"
                >
                  -20 ₾ ხარჯი
                </button>
              </div>
            </div>

            <div className="space-y-1.5 border-l border-white/10 pl-3">
              <div className="text-[10px] text-gray-400">შვილის ყოველთვიური ლიმიტი:</div>
              <div className="text-base font-bold text-[#00ff87]">{childLimit} ₾ / თვე</div>
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={childLimit}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setChildLimit(val);
                  triggerFeedback(`⚙️ შვილის ყოველთვიური ლიმიტი დაყენდა: ${val} ₾`);
                }}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00ff87]"
              />
            </div>
          </div>

          {/* Medical Compliance Toggle */}
          <div className="flex items-center justify-between bg-[#121722] px-3 py-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${medicalVerified ? 'bg-[#00ff87]' : 'bg-red-500'}`} />
              <span className="text-[11px]">სამედიცინო ფორმა 100 &amp; ვალიდურობა:</span>
            </div>
            <button
              type="button"
              onClick={handleToggleMedical}
              className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                medicalVerified
                  ? 'bg-[#00ff87]/20 border border-[#00ff87] text-[#00ff87]'
                  : 'bg-red-500/20 border border-red-500 text-red-400'
              }`}
            >
              {medicalVerified ? 'დადასტურებულია' : 'ვადაგასული'}
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              Row-Level Security (RLS) & წვდომის იერარქიის მატრიცა
            </div>
            
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">მშობელი (Guardian):</span>
                <span className="text-[#00B0FF] font-bold">FULL_CRUD [ბილინგი, გაყინვა, საშვები]</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">შვილი (Dependent):</span>
                <span className="text-[#00ff87] font-bold">READ_ONLY [ვიზიტები, QR საშვი]</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">კლუბის ადმინისტრატორი:</span>
                <span className="text-[#D4AF37] font-bold">AUDIT_ACCESS [დადასტურება, გადაბმა]</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-white">მკაცრი Multi-Tenant RLS იზოლაცია</div>
              <div className="text-[9px] text-gray-400">სხვა დარბაზისთვის მონაცემების წაკითხვის ბლოკირება</div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                setRlsStrict(!rlsStrict);
              }}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                rlsStrict ? 'bg-[#00ff87]/20 border border-[#00ff87] text-[#00ff87]' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {rlsStrict ? 'აქტიური (ENFORCED)' : 'გათიშული'}
            </button>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              ფინანსური ROI & LTV ოპტიმიზაციის ანალიტიკა
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">LTV ზრდა</div>
                <div className="text-sm font-bold text-[#00ff87]">+38.4%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ადმინ. დანახარჯი</div>
                <div className="text-sm font-bold text-[#00B0FF]">-42.0%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ოჯახური პაკეტები</div>
                <div className="text-sm font-bold text-[#D4AF37]">124 გაყიდვა</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-300">ოჯახური აბონემენტების შეკავება (Retention):</span>
              <span className="text-[#00ff87] font-bold">91.2%</span>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
              <div className="bg-gradient-to-r from-[#00B0FF] to-[#00ff87] h-full w-[91.2%]" />
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>AES-256 ENCRYPTED</span>
        <span className="text-[#00B0FF]">ARTRON CORE V2.4</span>
      </div>
    </div>
  );
};
