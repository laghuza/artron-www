'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { soundEngine } from '@/core';

interface QuickDemoBookingViewProps {
  onCancel: () => void;
  onSwitchToRegister?: () => void;
}

const FACILITY_TYPES = [
  { id: 'gym', label: 'ფიტნეს დარბაზი', icon: '🏋️‍♂️' },
  { id: 'pool', label: 'საცურაო აუზი & სპა', icon: '🏊‍♂️' },
  { id: 'studio', label: 'ჯგუფური სტუდია', icon: '🧘‍♀️' },
  { id: 'club', label: 'სპორტული კლუბი', icon: '🥊' },
];

export const QuickDemoBookingView: React.FC<QuickDemoBookingViewProps> = ({ onCancel, onSwitchToRegister }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState('gym');
  const [phone, setPhone] = useState('+995');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestCredentials, setGuestCredentials] = useState({
    userId: 'GUEST-8842',
    passCode: 'ART-9921',
    validity: '60 წუთი',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+995')) val = '+995';
    const digits = val.replace(/\D/g, '').slice(3, 12);
    let formatted = '+995';
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += `) ${digits.slice(3, 5)}`;
    if (digits.length >= 5) formatted += `-${digits.slice(5, 7)}`;
    if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
    setPhone(formatted);
  };

  const isValid = 
    name.trim().length > 0 && 
    facilityName.trim().length > 0 && 
    phone.replace(/\D/g, '').length === 12;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    soundEngine.playSystemAccess();
    
    // Fast-track generation of 1-time guest session
    setTimeout(() => {
      const randomId = `GST-${Math.floor(1000 + Math.random() * 9000)}`;
      const randomCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
      setGuestCredentials({
        userId: randomId,
        passCode: randomCode,
        validity: '60 წუთი',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col items-center text-center py-4 animate-fadeIn">
        {/* Glowing Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-3xl mb-3 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
          ✓
        </div>
        
        <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
          ⚡ ერთჯერადი GUEST წვდომა გააქტიურებულია
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          მოგესალმებით, {name}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
          თქვენი 1-საათიანი სტუმრის სესია (<span className="text-emerald-400 font-bold">{facilityName}</span>) მზად არის. შეგიძლიათ გადაქექოთ სამართავი პანელის ყველა მოდული რეალური საჩვენებელი მონაცემებით.
        </p>

        {/* Credentials Box */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 text-left font-mono text-xs w-full max-w-md mb-6 space-y-2 text-slate-300 shadow-xl">
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">ობიექტის პროფილი:</span>
            <span className="text-white font-bold">{facilityName}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">სტუმრის USER ID:</span>
            <span className="text-emerald-400 font-bold">{guestCredentials.userId}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
            <span className="text-slate-400">ერთჯერადი წვდომის კოდი:</span>
            <span className="text-[#00E5FF] font-bold">{guestCredentials.passCode}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">სესიის ხანგრძლივობა:</span>
            <span className="text-amber-400 font-bold">⏱️ {guestCredentials.validity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-2.5">
          <Link
            href="/sports-os?demo=true"
            onClick={() => soundEngine.playSystemAccess()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2"
          >
            <span>⚡ შესვლა სამართავ პანელში (1-საათიანი სესია)</span>
            <span>→</span>
          </Link>

          <Link
            href="/get-started?mode=register"
            onClick={() => soundEngine.playPulseNode()}
            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center"
          >
            🚀 გადასვლა სისტემის შეძენასა და რეგისტრაციაზე
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between gap-5 animate-fadeIn">
      {/* Switch to Full Registration High-Conversion Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#00A3FF]/15 via-[#0055FF]/10 to-transparent border border-[#00A3FF]/30 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🚀</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">გადაიფიქრეთ დემო?</span>
            <span className="text-[11px] text-slate-300">პირდაპირ გაააქტიურეთ ობიექტი და შეიძინეთ სრული პანელი</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            if (onSwitchToRegister) onSwitchToRegister();
            else router.push('/get-started?mode=register');
          }}
          className="w-full sm:w-auto py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0066FF] hover:from-[#00E5FF] hover:to-[#00A3FF] text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(0,163,255,0.4)] text-center"
        >
          სისტემის შეძენა / რეგისტრაცია →
        </button>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
            [ ⚡ FAST-TRACK GUEST ACCESS ]
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          მიიღეთ 1-საათიანი სტუმრის (Guest) წვდომა
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 mt-2">
          ⚡ <strong>მყისიერი ტესტ-დრაივი:</strong> შეავსეთ 3 ველი და მომენტალურად შეაბიჯეთ სამართავ პანელში. არანაირი ლოდინი, ზარები ან საბანკო ბარათი.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Facility Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            ობიექტის ტიპი <span className="text-emerald-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FACILITY_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setFacilityType(type.id);
                }}
                className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  facilityType === type.id
                    ? 'bg-emerald-500/20 border border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-base">{type.icon}</span>
                <span className="text-[11px] font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Facility Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            ობიექტის / დარბაზის სახელი <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            required
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            placeholder="მაგ: Champion Gym & Fitness"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
          />
        </div>

        {/* Contact Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              თქვენი სახელი და გვარი <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="მაგ: დავით ბერიძე"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              მობილურის ნომერი <span className="text-emerald-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+995 (5XX) XX-XX-XX"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.07] text-white placeholder-slate-500 text-xs sm:text-sm font-mono outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isValid && !isSubmitting
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
              : 'bg-white/10 text-slate-500 border border-white/5 cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? 'სტუმრის წვდომის გენერაცია...' : '⚡ მყისიერი 1-საათიანი Guest წვდომის მიღება →'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-3.5 px-5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
        >
          გაუქმება
        </button>
      </div>
    </form>
  );
};
