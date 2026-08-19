'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Step3AuthorityViewProps {
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  position: string; setPosition: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  personalId: string; setPersonalId: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  isAgreed: boolean; setIsAgreed: (v: boolean) => void;
  isBiometricAgreed: boolean; setIsBiometricAgreed: (v: boolean) => void;
  isStep3Valid: boolean;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

export const Step3AuthorityView: React.FC<Step3AuthorityViewProps> = ({
  firstName, setFirstName,
  lastName, setLastName,
  position, setPosition,
  phone, setPhone,
  email, setEmail,
  personalId, setPersonalId,
  password, setPassword,
  isAgreed, setIsAgreed,
  isBiometricAgreed, setIsBiometricAgreed,
  isStep3Valid,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Phone auto-format: +995 (5XX) XX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+995')) {
      val = '+995';
    }
    const digits = val.replace(/\D/g, '').slice(3, 12);
    let formatted = '+995';
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += `) ${digits.slice(3, 5)}`;
    if (digits.length >= 5) formatted += `-${digits.slice(5, 7)}`;
    if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
    setPhone(formatted);
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: 'შეიყვანეთ პაროლი', color: 'bg-white/10' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 1) return { level: 1, text: 'სუსტი (Weak)', color: 'bg-amber-400' };
    if (score === 2) return { level: 2, text: 'საშუალო (Good)', color: 'bg-blue-400' };
    return { level: 3, text: 'მაღალი (Cyber-Secure)', color: 'bg-emerald-400' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="w-full flex flex-col justify-between gap-6 animate-fadeIn">
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase">
            ✨ ორგანიზაციის რეგისტრაცია // ნაბიჯი 3
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          ადმინისტრატორის ანგარიშის შექმნა
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          მიუთითეთ საკონტაქტო პირი, რომელიც მართავს სამართავ პანელს.
        </p>
      </div>

      {/* Form Area */}
      <div className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              სახელი <span className="text-[#00A3FF]">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="დავით"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              გვარი <span className="text-[#00A3FF]">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="თოდუა"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
          </div>
        </div>

        {/* Position & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              თანამდებობა <span className="text-[#00A3FF]">*</span>
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="დამფუძნებელი / დირექტორი"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              მობილური ტელეფონი <span className="text-[#00A3FF]">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+995 (599) 00-00-00"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white font-mono text-sm transition-all duration-300 outline-none"
            />
          </div>
        </div>

        {/* Email & Personal ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              სამუშაო ელფოსტა <span className="text-[#00A3FF]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@arena.ge"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white placeholder-slate-500 text-sm transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                პირადი ნომერი <span className="text-[#00A3FF]">*</span>
              </label>
              <span className="text-[9.5px] text-[#00E5FF] font-mono">
                AES-256 დაშიფვრა
              </span>
            </div>
            <input
              type="text"
              maxLength={11}
              value={personalId}
              onChange={(e) => setPersonalId(e.target.value.replace(/\D/g, ''))}
              placeholder="11 ციფრი"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white font-mono text-sm transition-all duration-300 outline-none"
            />
          </div>
        </div>

        {/* Password & Strength Meter */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              სისტემური პაროლი <span className="text-[#00A3FF]">*</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {strength.text}
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="მინიმუმ 8 სიმბოლო"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#00A3FF] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00A3FF]/20 text-white text-sm transition-all duration-300 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              {showPassword ? 'დამალვა' : 'ჩვენება'}
            </button>
          </div>

          {/* PS5 Glowing Strength Meter */}
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            {[1, 2, 3].map((lvl) => (
              <div
                key={lvl}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  strength.level >= lvl
                    ? `${strength.color} shadow-[0_0_8px_currentColor]`
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Legal & Biometric Consents */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#00A3FF] focus:ring-[#00A3FF]/30 accent-[#00A3FF] cursor-pointer"
            />
            <span className="text-[11px] text-slate-300 leading-relaxed">
              ვადასტურებ, რომ ვარ ორგანიზაციის უფლებამოსილი წარმომადგენელი და ვეთანხმები{' '}
              <Link href="/terms" target="_blank" className="text-[#00E5FF] hover:underline font-semibold">
                მომსახურების პირობებს
              </Link>{' '}
              და{' '}
              <Link href="/privacy" target="_blank" className="text-[#00E5FF] hover:underline font-semibold">
                კონფიდენციალურობის პოლიტიკას
              </Link>.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer select-none pt-2 border-t border-white/[0.06]">
            <input
              type="checkbox"
              checked={isBiometricAgreed}
              onChange={(e) => setIsBiometricAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#00A3FF] focus:ring-[#00A3FF]/30 accent-[#00A3FF] cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 leading-relaxed">
              თანხმობას ვაცხადებ ტურნიკეტებსა და ჭიშკრებზე ბიომეტრიული იდენტიფიკაციის (Face/RFID) უსაფრთხო დამუშავებაზე.
            </span>
          </label>
        </div>
      </div>

      {/* Error Display */}
      {submitError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
        >
          ← უკან
        </button>

        <button
          type="button"
          disabled={!isStep3Valid || isSubmitting}
          onClick={onSubmit}
          className={`px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
            isStep3Valid && !isSubmitting
              ? 'bg-gradient-to-r from-[#00A3FF] via-[#0077FF] to-[#00D2FF] text-white shadow-[0_0_30px_rgba(0,163,255,0.5)] hover:shadow-[0_0_40px_rgba(0,163,255,0.8)] hover:scale-[1.02] cursor-pointer'
              : 'bg-white/[0.05] text-white/30 border border-white/[0.05] cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>მუშავდება...</span>
            </>
          ) : (
            <>
              <span>🚀 ორგანიზაციის რეგისტრაციის გააქტიურება</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
