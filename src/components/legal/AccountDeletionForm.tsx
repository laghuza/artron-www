'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const AccountDeletionForm: React.FC = () => {
  const { t } = useLanguage();
  const [identity, setIdentity] = useState('');
  const [reason, setReason] = useState('');
  const [confirmGrace, setConfirmGrace] = useState(false);
  const [confirmArchival, setConfirmArchival] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ identity?: string; consent?: string }>({});

  const validateForm = () => {
    const newErrors: { identity?: string; consent?: string } = {};
    
    // Simple validation for email or phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,4}[\s-])?(\(?\d{2,3}\)?[\s-])?[\d\s-]{6,15}$/;
    
    const trimmedIdentity = identity.trim();
    if (!trimmedIdentity) {
      newErrors.identity = t('del_acc_error_identity');
    } else if (trimmedIdentity.includes('@')) {
      if (!emailRegex.test(trimmedIdentity)) {
        newErrors.identity = t('del_acc_error_identity');
      }
    } else {
      // Remove spaces, hyphens, parentheses to test digits count
      const digitsOnly = trimmedIdentity.replace(/[\s()+-]/g, '');
      if (digitsOnly.length < 6 || !phoneRegex.test(trimmedIdentity)) {
        newErrors.identity = t('del_acc_error_identity');
      }
    }

    if (!confirmGrace || !confirmArchival) {
      newErrors.consent = t('del_acc_error_checkboxes');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call to register lead/deletion request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      console.error('Account deletion request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#121722]/90 border border-[#00A3FF]/30 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-[#00A3FF]/5 relative overflow-hidden transition-all duration-500 animate-fadeIn">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0066FF] to-[#00D2FF]"></div>
        <div className="w-16 h-16 bg-[#00A3FF]/15 border border-[#00A3FF]/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8 text-[#00A3FF] animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t('del_acc_success_title')}
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md mx-auto">
            {t('del_acc_success_desc')}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setIdentity('');
              setReason('');
              setConfirmGrace(false);
              setConfirmArchival(false);
              setIsSuccess(false);
            }}
            className="text-xs font-bold text-[#00A3FF] hover:underline transition-all py-2.5 px-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-lg"
            style={{ minHeight: '44px' }}
          >
            {t('legal_back_to_home').replace('←', '').trim()}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#121722]/50 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-white/5"></div>
      
      {/* Form Identity Field */}
      <div className="space-y-2">
        <label htmlFor="identity" className="block text-xs font-extrabold text-white uppercase tracking-wider">
          {t('del_acc_label_identity')} <span className="text-[#00A3FF]">*</span>
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            {identity.includes('@') ? (
              <Mail className="w-4 h-4 text-[#64748B]" />
            ) : (
              <Phone className="w-4 h-4 text-[#64748B]" />
            )}
          </div>
          <input
            type="text"
            id="identity"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder={t('del_acc_placeholder_identity')}
            className={`block w-full pl-10 pr-4 py-3 bg-[#0B0F17]/85 border ${
              errors.identity ? 'border-red-500/50 focus:ring-red-500/55' : 'border-white/10 focus:ring-[#00A3FF]/45 focus:border-[#00A3FF]/50'
            } rounded-xl text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 transition-all duration-300`}
            style={{ minHeight: '48px' }}
            disabled={isSubmitting}
          />
        </div>
        {errors.identity && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.identity}</span>
          </p>
        )}
      </div>

      {/* Form Reason Field */}
      <div className="space-y-2">
        <label htmlFor="reason" className="block text-xs font-extrabold text-white uppercase tracking-wider">
          {t('del_acc_label_reason')}
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t('del_acc_placeholder_reason')}
          rows={3}
          className="block w-full px-4 py-3 bg-[#0B0F17]/85 border border-white/10 rounded-xl text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/45 focus:border-[#00A3FF]/50 transition-all duration-300 resize-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Checkboxes Wrapper */}
      <div className="space-y-4 pt-2 border-t border-white/5">
        {/* Checkbox 1: 15-day Grace Period */}
        <label className="flex items-start gap-3.5 group cursor-pointer">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={confirmGrace}
              onChange={(e) => setConfirmGrace(e.target.checked)}
              className="sr-only peer"
              disabled={isSubmitting}
            />
            <div 
              className="w-5 h-5 border border-white/20 rounded bg-[#0B0F17]/85 transition-all duration-300 peer-checked:border-[#00A3FF] peer-checked:bg-[#00A3FF]/15 flex items-center justify-center shadow-inner group-hover:border-white/40 focus-within:ring-2 focus-within:ring-[#00A3FF]/45"
              style={{ minHeight: '44px', minWidth: '44px' }} // Compliant 44x44px touch target
            >
              {confirmGrace && (
                <svg className="w-3 h-3 text-[#00A3FF] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed select-none group-hover:text-white transition-colors duration-200">
            {t('del_acc_check_grace')}
          </span>
        </label>

        {/* Checkbox 2: 3-year Archival */}
        <label className="flex items-start gap-3.5 group cursor-pointer">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={confirmArchival}
              onChange={(e) => setConfirmArchival(e.target.checked)}
              className="sr-only peer"
              disabled={isSubmitting}
            />
            <div 
              className="w-5 h-5 border border-white/20 rounded bg-[#0B0F17]/85 transition-all duration-300 peer-checked:border-[#00A3FF] peer-checked:bg-[#00A3FF]/15 flex items-center justify-center shadow-inner group-hover:border-white/40 focus-within:ring-2 focus-within:ring-[#00A3FF]/45"
              style={{ minHeight: '44px', minWidth: '44px' }} // Compliant 44x44px touch target
            >
              {confirmArchival && (
                <svg className="w-3 h-3 text-[#00A3FF] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed select-none group-hover:text-white transition-colors duration-200">
            {t('del_acc_check_archival')}
          </span>
        </label>

        {errors.consent && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      {/* Form Submission Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative group bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:from-[#0055DD] hover:to-[#00BBE5] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-[#00A3FF]/20 hover:shadow-[#00A3FF]/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50 flex items-center justify-center gap-2"
        style={{ minHeight: '48px' }}
      >
        <span>
          {isSubmitting ? t('del_acc_btn_submitting') : t('del_acc_btn_submit')}
        </span>
        {!isSubmitting && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
};
