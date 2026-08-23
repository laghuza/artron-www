'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Dumbbell, Waves, Sparkles, Shield, Building2, LucideIcon, Check } from 'lucide-react';

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

interface FacilityTypeItem {
  id: string;
  key: string;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const FACILITY_TYPES: FacilityTypeItem[] = [
  { id: 'gym', key: '1', label: 'ფიტნეს დარბაზი', sub: 'Gym & Fitness Center', icon: Dumbbell },
  { id: 'pool', key: '2', label: 'საცურაო აუზი & სპა', sub: 'Pool & Aqua Zone', icon: Waves },
  { id: 'studio', key: '3', label: 'იოგა / პილატესი', sub: 'Group Classes & Studio', icon: Sparkles },
  { id: 'combat', key: '4', label: 'CrossFit / საბრძოლო', sub: 'Combat & Strength Arena', icon: Shield },
  { id: 'multi', key: '5', label: 'სპორტული კომპლექსი', sub: 'Multi-Sport Complex', icon: Building2 },
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
  const shouldReduceMotion = useReducedMotion();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    const formatted = raw.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    setClubCode(formatted);
  };

  const handleSelectService = (label: string) => {
    ps5Audio.playSelect();
    setClubServices(label);
  };

  const handleCityClick = (c: string) => {
    ps5Audio.playNavigate();
    setCity(c);
  };

  const rawCodeLength = clubCode.replace(/\s/g, '').length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-6"
    >
      {/* PS5 Header Section */}
      <motion.div variants={itemVariants} className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            STAGE 01 // ობიექტის პროფილი & იდენტობა
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          სისტემის შეძენა და ობიექტის რეგისტრაცია
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          შეიყვანეთ თქვენი სპორტული ობიექტის ძირითადი პარამეტრები ეკოსისტემაში ინტეგრაციისთვის.
        </p>
      </motion.div>

      {/* Main Input Matrix */}
      <div className="space-y-5">
        {/* Facility Name */}
        <motion.div variants={itemVariants} className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            ობიექტის / ბრენდის სახელი <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="მაგ: ProFit Arena Tbilisi"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
            />
            {clubName.trim().length > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00E5FF] font-bold text-sm">
                ✓
              </span>
            )}
          </div>
        </motion.div>

        {/* Facility Category Selection (Tactile PS5 Cards with spring morph stagger) */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              ობიექტის კატეგორია <span className="text-[#00E5FF]">*</span>
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              აირჩიეთ მიმართულება
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {FACILITY_TYPES.map((type, idx) => {
              const isSelected = clubServices === type.label;
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  type="button"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectService(type.label)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-2.5 group relative cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#00A3FF]/25 via-[#0055FF]/15 to-transparent border-[#00E5FF] shadow-[0_0_25px_rgba(0,163,255,0.35)] ring-1 ring-[#00E5FF]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#00A3FF]/30 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : 'bg-white/5 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                    )}
                  </div>

                  <div>
                    <div
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {type.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {type.sub}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 2-Column: Legal Form & 9-Digit Identification Code */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Legal Form */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              იურიდიული ფორმა
            </label>
            <select
              value={clubLegalForm}
              onChange={(e) => {
                ps5Audio.playNavigate();
                setClubLegalForm(e.target.value);
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-[#090E1A] border border-white/[0.12] focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00A3FF]/30 text-white text-sm transition-all duration-200 outline-none cursor-pointer"
            >
              <option value="შპს">შპს (შეზღუდული პასუხისმგებლობა)</option>
              <option value="ააიპ">ააიპ (არაკომერციული ორგანიზაცია)</option>
              <option value="ინდ. მეწარმე">ინდ. მეწარმე</option>
              <option value="სხვა">სხვა იურიდიული სტატუსი</option>
            </select>
          </div>

          {/* Identification Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                საიდენტიფიკაციო კოდი <span className="text-[#00E5FF]">*</span>
              </label>
              <span
                className={`text-[10px] font-mono font-bold ${
                  rawCodeLength === 9 ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {rawCodeLength}/9 ციფრი
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={clubCode}
                onChange={handleCodeChange}
                placeholder="204 123 456"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00E5FF] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#00A3FF]/30 text-white placeholder-slate-500 text-sm font-mono tracking-wider transition-all duration-200 outline-none"
              />
              {rawCodeLength === 9 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">
                  ✓
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* City Selection Pills */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            ქალაქი / ლოკაცია <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => {
              const isSelected = city === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCityClick(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                      : 'bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
