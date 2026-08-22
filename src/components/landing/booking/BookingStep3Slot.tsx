'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { Clock, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface BookingStep3SlotProps {
  selectedDay: string;
  setSelectedDay: (val: string) => void;
  selectedTime: string;
  setSelectedTime: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  detectedTimezone: string;
  isSubmitting: boolean;
  logs: string[];
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const BookingStep3Slot: React.FC<BookingStep3SlotProps> = ({
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  name,
  setName,
  detectedTimezone,
  isSubmitting,
  logs,
  onSubmit,
  onBack,
}) => {
  const { t } = useLanguage();
  const timeSlots = ['11:00', '13:30', '15:00', '17:30', '19:00'];

  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff87] block">
            [ STEP_03 // INSTANT_SLOT_DISPATCH ]
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            {t('booking_step3_title')}
          </h4>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('booking_btn_back')}</span>
        </button>
      </div>

      {/* Day Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'today', label: t('booking_slot_today') },
          { id: 'tomorrow', label: t('booking_slot_tomorrow') },
          { id: 'after', label: t('booking_slot_after') },
        ].map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setSelectedDay(d.id);
            }}
            className={`py-2 px-2 text-center rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] ${
              selectedDay === d.id
                ? 'bg-[#00ff87]/20 border border-[#00ff87] text-[#00ff87]'
                : 'bg-[#121722]/50 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Time Slot Chips */}
      <div className="space-y-1">
        <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#00A3FF]" />
          <span>1-Click Time Slot ({detectedTimezone}):</span>
        </label>
        <div className="flex flex-wrap gap-2 pt-1">
          {timeSlots.map((ts) => (
            <button
              key={ts}
              type="button"
              data-testid={`booking-slot-${ts}`}
              onClick={() => {
                soundEngine.playPulseNode();
                setSelectedTime(ts);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] ${
                selectedTime === ts
                  ? 'bg-[#00A3FF] text-white shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                  : 'bg-[#121722]/80 border border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {ts}
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-1">
        <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
          {t('booking_fallback_name')}
        </label>
        <input
          type="text"
          required
          data-testid="booking-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. დავით თოდუა"
          className="w-full bg-[#121722]/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all"
          disabled={isSubmitting}
          style={{ minHeight: '44px' }}
        />
      </div>

      {/* 1-Click Confirm Button */}
      <MagneticButton
        type="submit"
        data-testid="booking-submit-btn"
        disabled={isSubmitting || !name.trim()}
        fullWidth
        shockwaveColor="rgba(0, 255, 135, 0.7)"
        className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#00ff87] to-[#00e5ff] !text-slate-950 font-black shadow-lg shadow-[#00ff87]/20 hover:brightness-110"
        style={{ minHeight: '48px' }}
      >
        <Sparkles className="w-4 h-4 text-slate-950" />
        <span className="text-slate-950 font-black">{t('booking_btn_confirm')}</span>
        <ArrowRight className="w-4.5 h-4.5 text-slate-950" />
      </MagneticButton>

      {/* Cyber Log Stream during submission */}
      {isSubmitting && (
        <div className="bg-[#05070a] border border-white/5 rounded-xl p-3.5 font-mono text-[9px] text-[#00ff87] space-y-1 overflow-y-auto max-h-[110px]">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      )}
    </form>
  );
};
