'use client';

import React from 'react';

interface Step2CapacityViewProps {
  clubAddress: string;
  setClubAddress: (v: string) => void;
  branchesCount: string;
  setBranchesCount: (v: string) => void;
  membersScale: string;
  setMembersScale: (v: string) => void;
  hardwareType: string;
  setHardwareType: (v: string) => void;
  isStep2Valid: boolean;
  onNext: () => void;
  onBack: () => void;
}

const MEMBERS_OPTIONS = [
  { id: 'small', label: '< 100 წევრი', sub: 'სტარტაპი / მცირე სტუდია' },
  { id: 'medium', label: '100 – 500 წევრი', sub: 'საშუალო ფიტნეს ცენტრი' },
  { id: 'large', label: '500 – 1500 წევრი', sub: 'დიდი სპორტული კომპლექსი' },
  { id: 'enterprise', label: '1500+ წევრი', sub: 'პრემიუმ ქსელი / არენა' },
];

const BRANCHES_OPTIONS = [
  { id: '1', label: '1 ფილიალი' },
  { id: '2-3', label: '2 – 3 ფილიალი' },
  { id: '4+', label: 'ქსელი (4+ ფილიალი)' },
];

const HARDWARE_INTEGRATIONS = [
  {
    id: 'turnstile',
    icon: '🚪',
    title: 'ტურნიკეტები & ბარიერები',
    desc: 'პირდაპირი Socket/TCP რელეების ინტეგრაცია',
  },
  {
    id: 'qr',
    icon: '📱',
    title: 'მობილური QR სკანერი',
    desc: 'სმარტფონიდან მომენტალური Cloud იდენტიფიკაცია',
  },
  {
    id: 'rfid',
    icon: '💳',
    title: 'RFID / NFC ბარათები & სამაჯურები',
    desc: 'უკონტაქტო ჩიპების ავტომატური კითხვა',
  },
  {
    id: 'crm_only',
    icon: '💻',
    title: 'მხოლოდ CRM მართვა',
    desc: 'ადმინისტრაციული პროგრამა აპარატურის გარეშე',
  },
];

export const Step2CapacityView: React.FC<Step2CapacityViewProps> = ({
  clubAddress,
  setClubAddress,
  branchesCount,
  setBranchesCount,
  membersScale,
  setMembersScale,
  hardwareType,
  setHardwareType,
  isStep2Valid,
  onNext,
  onBack,
}) => {
  return (
    <div className="w-full flex flex-col justify-between gap-6 animate-fadeIn">
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            ✨ ორგანიზაციის რეგისტრაცია // ნაბიჯი 2
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          დარბაზის მასშტაბი & ტექნიკური აღჭურვილობა
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          აირჩიეთ ფილიალების რაოდენობა, წევრთა სავარაუდო ნაკადი და საჭირო ტექნიკა.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Physical Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            ძირითადი მისამართი / ლოკაცია <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={clubAddress}
              onChange={(e) => setClubAddress(e.target.value)}
              placeholder="მაგ: ჭავჭავაძის გამზ. 37, თბილისი"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
            {clubAddress.trim().length > 0 && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm">✓</span>
            )}
          </div>
        </div>

        {/* Active Members Scale (PS5 Interactive Chips) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            აქტიური წევრების სავარაუდო რაოდენობა <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {MEMBERS_OPTIONS.map((opt) => {
              const isSelected = membersScale === opt.label;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMembersScale(opt.label)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF]/15 border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)] ring-1 ring-[#00A3FF]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                      {opt.label}
                    </span>
                    {isSelected && <span className="text-xs text-[#00A3FF]">●</span>}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    {opt.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Branches Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            ფილიალების რაოდენობა <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {BRANCHES_OPTIONS.map((b) => {
              const isSelected = branchesCount === b.label;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranchesCount(b.label)}
                  className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_15px_rgba(0,163,255,0.3)]'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware / Turnstile Integration Grid */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            სასურველი ტექნიკური წვდომა & IoT აპარატურა <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HARDWARE_INTEGRATIONS.map((hw) => {
              const isSelected = hardwareType === hw.title;
              return (
                <button
                  key={hw.id}
                  type="button"
                  onClick={() => setHardwareType(hw.title)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00A3FF]/20 to-transparent border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <span className="text-xl shrink-0 p-2 rounded-lg bg-white/[0.04] border border-white/5">
                    {hw.icon}
                  </span>
                  <div>
                    <div className={`text-xs font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                      {hw.title}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {hw.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
        >
          ← უკან
        </button>

        <button
          type="button"
          disabled={!isStep2Valid}
          onClick={onNext}
          className={`px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
            isStep2Valid
              ? 'bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] hover:scale-[1.02] cursor-pointer'
              : 'bg-white/[0.05] text-white/30 border border-white/[0.05] cursor-not-allowed'
          }`}
        >
          <span>შემდეგი ეტაპი</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
