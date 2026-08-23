'use client';

import React from 'react';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { DoorOpen, QrCode, CreditCard, Laptop, ShieldCheck } from 'lucide-react';

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
    icon: DoorOpen,
    title: 'ტურნიკეტები & ბარიერები',
    desc: 'პირდაპირი TCP/Socket რელეების მართვა',
  },
  {
    id: 'qr',
    icon: QrCode,
    title: 'მობილური QR სკანერი',
    desc: 'სმარტფონიდან მომენტალური Cloud იდენტიფიკაცია',
  },
  {
    id: 'rfid',
    icon: CreditCard,
    title: 'RFID / NFC ბარათები & სამაჯურები',
    desc: 'უკონტაქტო ჩიპების ავტომატური კითხვა',
  },
  {
    id: 'crm_only',
    icon: Laptop,
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
  const handleSelectMember = (label: string) => {
    ps5Audio.playSelect();
    setMembersScale(label);
  };

  const handleSelectBranch = (label: string) => {
    ps5Audio.playNavigate();
    setBranchesCount(label);
  };

  const handleSelectHardware = (title: string) => {
    ps5Audio.playSelect();
    setHardwareType(title);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* PS5 Header Section */}
      <div className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            STAGE 02 // მასშტაბი & IoT ინფრასტრუქტურა
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          დარბაზის მასშტაბი & ტექნიკური აღჭურვილობა
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          განსაზღვრეთ ობიექტის ლოკაცია, წევრთა ნაკადის მოცულობა და ტურნიკეტების/აპარატურის ტიპი.
        </p>
      </div>

      {/* Inputs Matrix */}
      <div className="space-y-5">
        {/* Physical Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            ძირითადი მისამართი / ქუჩა <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={clubAddress}
              onChange={(e) => setClubAddress(e.target.value)}
              placeholder="მაგ: ჭავჭავაძის გამზ. 37, თბილისი"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
            {clubAddress.trim().length > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00E5FF] font-bold text-sm">
                ✓
              </span>
            )}
          </div>
        </div>

        {/* Active Members Scale (PS5 Interactive Chips) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            აქტიური წევრების სავარაუდო რაოდენობა <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {MEMBERS_OPTIONS.map((opt) => {
              const isSelected = membersScale === opt.label;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectMember(opt.label)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#00A3FF]/25 to-[#0055FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,163,255,0.3)] ring-1 ring-[#00E5FF] scale-[1.02]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isSelected ? 'text-[#00E5FF]' : 'text-white'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                    )}
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
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            ფილიალების რაოდენობა <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {BRANCHES_OPTIONS.map((b) => {
              const isSelected = branchesCount === b.label;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBranch(b.label)}
                  className={`py-3 px-3 rounded-2xl border text-center text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF] text-black shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware / Turnstile Integration Grid */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            სასურველი ტექნიკური წვდომა & IoT აპარატურა <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HARDWARE_INTEGRATIONS.map((hw) => {
              const isSelected = hardwareType === hw.title;
              const Icon = hw.icon;
              return (
                <button
                  key={hw.id}
                  type="button"
                  onClick={() => handleSelectHardware(hw.title)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00A3FF]/25 via-[#0055FF]/10 to-transparent border-[#00E5FF] shadow-[0_0_20px_rgba(0,163,255,0.3)] ring-1 ring-[#00E5FF]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#00A3FF]/30 text-[#00E5FF]'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#00E5FF]' : 'text-white'
                      }`}
                    >
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
    </div>
  );
};
