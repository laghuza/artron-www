'use client';

import React from 'react';

interface Step1FacilityViewProps {
  clubName: string;
  setClubName: (v: string) => void;
  clubLegalForm: string;
  setClubLegalForm: (v: string) => void;
  clubCode: string;
  setClubCode: (v: string) => void;
  clubServices: string;
  setClubServices: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  isStep1Valid: boolean;
  onNext: () => void;
  onCancel: () => void;
}

import { Dumbbell, Waves, Sparkles, Shield, Building2, LucideIcon } from 'lucide-react';

interface FacilityTypeItem {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const FACILITY_TYPES: FacilityTypeItem[] = [
  { id: 'gym', label: 'ფიტნეს დარბაზი', sub: 'Gym & Fitness Center', icon: Dumbbell },
  { id: 'pool', label: 'საცურაო აუზი & სპა', sub: 'Pool & Aqua Zone', icon: Waves },
  { id: 'studio', label: 'იოგა / პილატეს სტუდია', sub: 'Group Classes & Yoga', icon: Sparkles },
  { id: 'combat', label: 'CrossFit / საბრძოლო', sub: 'Combat & Strength Arena', icon: Shield },
  { id: 'multi', label: 'სპორტული კომპლექსი', sub: 'Multi-Sport Complex', icon: Building2 },
];

const CITIES = ['თბილისი', 'ბათუმი', 'ქუთაისი', 'რუსთავი', 'ზუგდიდი', 'თელავი', 'სხვა'];

export const Step1FacilityView: React.FC<Step1FacilityViewProps> = ({
  clubName,
  setClubName,
  clubLegalForm,
  setClubLegalForm,
  clubCode,
  setClubCode,
  clubServices,
  setClubServices,
  city,
  setCity,
  isStep1Valid,
  onNext,
  onCancel,
}) => {
  // Format 9-digit code with spaces (e.g. 204 123 456)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    const formatted = raw.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    setClubCode(formatted);
  };

  const rawCodeLength = clubCode.replace(/\s/g, '').length;

  return (
    <div className="w-full flex flex-col justify-between gap-6 animate-fadeIn">
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            🚀 B2B რეგისტრაცია & გააქტიურება // ნაბიჯი 1
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          სისტემის შეძენა და ობიექტის რეგისტრაცია
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          დაარეგისტრირეთ თქვენი ობიექტი 2 წუთში და მიიღეთ სამართავი პანელის სრული ფუნქციონალი.
        </p>
      </div>

      {/* Inputs Area */}
      <div className="space-y-5">
        {/* Facility Name */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            ობიექტის / ბრენდის სახელი <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="მაგ: ProFit Arena Tbilisi"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
            {clubName.trim().length > 0 && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm">✓</span>
            )}
          </div>
        </div>

        {/* Facility Category Selection (PS5 Interactive Cards) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            ობიექტის კატეგორია <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {FACILITY_TYPES.map((type) => {
              const isSelected = clubServices === type.label;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setClubServices(type.label)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between gap-2 group relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#00A3FF]/20 to-[#0055FF]/10 border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.25)] ring-1 ring-[#00A3FF]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#00A3FF]/20 text-[#00A3FF]' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {type.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">
                      {type.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Legal Form & Registry Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Legal Form */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              იურიდიული ფორმა
            </label>
            <select
              value={clubLegalForm}
              onChange={(e) => setClubLegalForm(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F1420] border border-white/[0.12] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-white text-sm transition-all duration-300 outline-none cursor-pointer"
            >
              <option value="შპს">შპს (შეზღუდული პასუხისმგებლობის საზოგადოება)</option>
              <option value="ააიპ">ააიპ (არაკომერციული იურიდიული პირი)</option>
              <option value="ინდ. მეწარმე">ინდ. მეწარმე</option>
              <option value="სხვა">სხვა ფორმა</option>
            </select>
          </div>

          {/* Identification Code */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                საიდენტიფიკაციო კოდი <span className="text-[#00A3FF]">*</span>
              </label>
              <span className={`text-[10px] font-mono ${rawCodeLength === 9 ? 'text-emerald-400' : 'text-slate-400'}`}>
                {rawCodeLength}/9 ციფრი
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={clubCode}
                onChange={handleCodeChange}
                placeholder="204 123 456"
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm font-mono tracking-wider transition-all duration-300 outline-none"
              />
              {rawCodeLength === 9 && (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm">✓</span>
              )}
            </div>
          </div>
        </div>

        {/* City Selection Pills */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            ქალაქი / ლოკაცია <span className="text-[#00A3FF]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => {
              const isSelected = city === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                      : 'bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  {c}
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
          onClick={onCancel}
          className="px-5 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
        >
          გაუქმება
        </button>

        <button
          type="button"
          disabled={!isStep1Valid}
          onClick={onNext}
          className={`px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
            isStep1Valid
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
