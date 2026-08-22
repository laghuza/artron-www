'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { Calendar, Terminal, Globe, Lock, ShieldCheck } from 'lucide-react';
import { BookingStep1Facility } from './booking/BookingStep1Facility';
import { BookingStep2Channel } from './booking/BookingStep2Channel';
import { BookingStep3Slot } from './booking/BookingStep3Slot';
import { BookingRadarMap } from './booking/BookingRadarMap';

export const BookingEngine: React.FC = () => {
  const { t } = useLanguage();
  
  // Wizard state: step 1, 2, or 3
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [facilityType, setFacilityType] = useState<string>('gym');
  const [platform, setPlatform] = useState<string>('meet');
  const [contactValue, setContactValue] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('today');
  const [selectedTime, setSelectedTime] = useState<string>('15:00');
  const [name, setName] = useState<string>('');
  
  // Submission & Cyber Log States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [detectedTimezone, setDetectedTimezone] = useState('Europe/Tbilisi');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setDetectedTimezone(tz || 'Europe/Tbilisi');
      } catch {
        setDetectedTimezone('Europe/Tbilisi');
      }
    }
  }, []);

  const handleStepNext = (nextStep: 2 | 3) => {
    soundEngine.playPulseNode();
    setStep(nextStep);
  };

  const handleStepBack = (prevStep: 1 | 2) => {
    soundEngine.playPulseNode();
    setStep(prevStep);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEngine.playPulseNode();
    setIsSubmitting(true);
    setLogs(['> INITIATING ARTRON GATEWAY HANDSHAKE...']);

    const payload = {
      name,
      email: platform === 'meet' || platform === 'zoom' ? contactValue : '',
      phone: platform === 'whatsapp' || platform === 'telegram' ? contactValue : '+995',
      facilityType,
      platform,
      date: selectedDay,
      timeSlot: selectedTime,
      timezone: detectedTimezone,
    };

    try {
      const response = await fetch('/api/v1/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gateway returned invalid response.');
      }

      const logSteps = [
        '> GATEWAY SECURE SHIELD ESTABLISHED...',
        `> FACILITY: [ ${facilityType.toUpperCase()} ] · PLATFORM: [ ${platform.toUpperCase()} ]`,
        `> SLOT: ${selectedDay.toUpperCase()} @ ${selectedTime} (${detectedTimezone})`,
        `> AES-256-GCM ENCRYPTION APPLIED TO CONTACT...`,
        '> DISPATCHING INSTANT NOTIFICATION TO ARTRON DISPATCHER...',
        '> DEMO SESSION ALLOCATED // REPRESENTATIVE READY.'
      ];

      logSteps.forEach((stepText, idx) => {
        setTimeout(() => {
          setLogs(prev => [...prev, stepText]);
          if (idx === logSteps.length - 1) {
            setIsSubmitting(false);
            setIsSuccess(true);
          }
        }, (idx + 1) * 260);
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setLogs(prev => [...prev, `> CONNECTION ERROR: ${err.message || 'TRY AGAIN'}`]);
    }
  };

  return (
    <section id="booking-engine" className="py-20 md:py-28 relative overflow-hidden bg-[#080B10] border-y border-white/5 studio-grain">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" /> [SYS: INSTANT_MICRO_BOOKING]
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('booking_title')}
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('booking_subtitle')}
          </p>
        </div>

        {/* Outer Grid: 3-Step Interactive Booking Engine + Cyber Radar Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Block (7 Cols): 3-Step Wizard */}
          <div className="lg:col-span-7 bg-[#05070a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/40" />

            <div className="flex flex-col h-full space-y-6">
              {/* Header Status Bar & Step Progress */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#121722] border border-white/10 px-3 py-1 rounded-lg">
                    <Terminal className="w-3.5 h-3.5 text-[#00ff87]" />
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                      {t('booking_step_counter')} {step}/3
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step 
                            ? 'w-6 bg-[#00A3FF]' 
                            : s < step 
                            ? 'w-3 bg-[#00ff87]' 
                            : 'w-2 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] bg-[#121722]/60 px-2.5 py-1 rounded-lg border border-white/5">
                  <Globe className="w-3.5 h-3.5 text-[#00A3FF] animate-pulse" />
                  <span className="truncate max-w-[110px] sm:max-w-none">{detectedTimezone}</span>
                </div>
              </div>

              {/* Wizard Body */}
              <div className="flex-grow flex flex-col justify-center">
                {!isSuccess ? (
                  <div>
                    {step === 1 && (
                      <BookingStep1Facility
                        facilityType={facilityType}
                        setFacilityType={setFacilityType}
                        onNext={() => handleStepNext(2)}
                      />
                    )}
                    {step === 2 && (
                      <BookingStep2Channel
                        platform={platform}
                        setPlatform={setPlatform}
                        contactValue={contactValue}
                        setContactValue={setContactValue}
                        onNext={() => handleStepNext(3)}
                        onBack={() => handleStepBack(1)}
                      />
                    )}
                    {step === 3 && (
                      <BookingStep3Slot
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        name={name}
                        setName={setName}
                        detectedTimezone={detectedTimezone}
                        isSubmitting={isSubmitting}
                        logs={logs}
                        onSubmit={handleFinalSubmit}
                        onBack={() => handleStepBack(2)}
                      />
                    )}
                  </div>
                ) : (
                  <div className="font-mono text-xs text-[#00ff87] space-y-4 border border-[#00ff87]/30 bg-[#00ff87]/5 p-6 rounded-2xl animate-fadeIn">
                    <div className="flex items-center gap-2 text-sm font-black">
                      <ShieldCheck className="w-5 h-5 text-[#00ff87]" />
                      <span>[ DEMO_SESSION_CONFIRMED // SYNC_ACTIVE ]</span>
                    </div>
                    <div className="border-t border-[#00ff87]/20 my-2" />
                    <p className="normal-case text-gray-200 font-sans text-sm leading-relaxed">
                      {t('booking_fallback_success')}
                    </p>
                    <div className="text-[10px] text-[#00ff87]/80 bg-[#121722]/80 p-3 rounded-xl border border-white/5 space-y-1">
                      <div>&gt; HOST: ARTRON SAAS ARCHITECT DISPATCH</div>
                      <div>&gt; CLIENT: {name.toUpperCase()} · TYPE: {facilityType.toUpperCase()}</div>
                      <div>&gt; CHANNEL: {platform.toUpperCase()} · TIME: {selectedDay.toUpperCase()} @ {selectedTime} ({detectedTimezone})</div>
                      <div>&gt; SECURITY: AES-256-GCM SSL ENCRYPTED</div>
                    </div>
                    <button 
                      onClick={() => { setIsSuccess(false); setStep(1); setName(''); setContactValue(''); }}
                      className="text-[11px] uppercase font-bold text-[#00e5ff] hover:text-[#00ff87] transition-all cursor-pointer underline decoration-dotted min-h-[44px] inline-flex items-center"
                    >
                      [ ← BOOK_ANOTHER_SESSION ]
                    </button>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8]/60 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[#00ff87]/70">
                  <Lock className="w-3 h-3" />
                  <span>AES-256-GCM SSL ENCRYPTED GATEWAY</span>
                </div>
                <span>ORDER №01-15/ნ COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Right Block (5 Cols): Cyber Radar Map */}
          <BookingRadarMap />
        </div>
      </div>
    </section>
  );
};
