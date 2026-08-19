'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Wifi, 
  Terminal, 
  ArrowRight, 
  Lock, 
  ShieldCheck 
} from 'lucide-react';

export const BookingEngine: React.FC = () => {
  const { t, locale } = useLanguage();
  
  // States for direct interactive demo booking
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+995');
  const [facilityType, setFacilityType] = useState('gym');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [detectedTimezone, setDetectedTimezone] = useState('UTC');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setDetectedTimezone(tz);
      } catch (e) {
        setDetectedTimezone('Europe/Tbilisi');
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    
    setIsSubmitting(true);
    setLogs(['> CONNECTING TO ARTRON GATEWAY API...']);

    try {
      const response = await fetch('/api/v1/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, facilityType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected lead request.');
      }

      // Simulated cyber API onboarding logs to run on successful real connection
      const logSteps = [
        '> GATEWAY SECURE SHIELD ESTABLISHED...',
        '> LOCATING IDLE B2B AGENT MODULE...',
        `> INTAKE REGISTERED FOR [ ${name.toUpperCase()} ]`,
        `> VALIDATING EMAIL: ${email.toLowerCase()}`,
        `> INITIATING ENCRYPTION PROCESS (AES-256-GCM)...`,
        '> WRITING SECURE RECORD TO MULTI-TENANT POSTGRESQL...',
        '> TELEGRAM / SLACK NOTIFICATION DISPATCHED...',
        '> PROTOCOL SUCCESSFUL // REPRESENTATIVE ASSIGNED.'
      ];

      logSteps.forEach((stepText, idx) => {
        setTimeout(() => {
          setLogs(prev => [...prev, stepText]);
          if (idx === logSteps.length - 1) {
            setIsSubmitting(false);
            setIsSuccess(true);
          }
        }, (idx + 1) * 300);
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setLogs(prev => [
        ...prev,
        `> CONNECTION FAILED: ${err.message || 'GATEWAY UNREACHABLE'}`,
        '> PROTOCOL TERMINATED.'
      ]);
    }
  };

  return (
    <section id="booking-engine" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0E1321] to-[#0B0F17] border-b border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 right-1/4 w-[380px] h-[380px] bg-[#00A3FF]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] bg-[#00ff87]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" /> [SYS: BOOKING_ENGINE]
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('booking_title')}
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('booking_subtitle')}
          </p>
        </div>

        {/* Outer Grid: Scheduling Layout + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Block (60% width): Booking Widget */}
          <div className="lg:col-span-7 bg-[#05070a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 md:p-8">
            
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

            <div className="flex flex-col h-full space-y-6">
              
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 bg-[#121722]/80 border border-white/10 px-3.5 py-1.5 rounded-xl">
                  <Terminal className="w-4 h-4 text-[#00ff87]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {locale === 'ka' ? 'პირდაპირი დემო მოთხოვნა' : locale === 'ru' ? 'Запрос демонстрации' : 'Direct Demo Intake'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] bg-[#121722]/60 px-3 py-1 rounded-lg border border-white/5">
                  <Globe className="w-3.5 h-3.5 text-[#00A3FF] animate-pulse" />
                  <span>[ TZ: {detectedTimezone} ]</span>
                </div>
              </div>

              {/* Direct Intake Form */}
              <div className="flex-grow flex flex-col justify-center">
                {!isSuccess ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
                        {t('booking_fallback_name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. დავით თოდუა"
                        className="w-full bg-[#121722]/50 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all"
                        disabled={isSubmitting}
                        style={{ minHeight: '44px' }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
                          {t('booking_fallback_email')}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          placeholder="e.g. info@artron.ge"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#121722]/50 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all"
                          disabled={isSubmitting}
                          style={{ minHeight: '44px' }}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
                          {t('booking_fallback_phone')}
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#121722]/50 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all font-mono"
                          disabled={isSubmitting}
                          style={{ minHeight: '44px' }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
                        {t('booking_fallback_type')}
                      </label>
                      <select
                        value={facilityType}
                        onChange={(e) => setFacilityType(e.target.value)}
                        className="w-full bg-[#121722]/80 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all cursor-pointer"
                        disabled={isSubmitting}
                        style={{ minHeight: '44px' }}
                      >
                        <option value="gym" className="bg-[#121722]">{locale === 'ka' ? 'ფიტნეს დარბაზი / კლუბი' : locale === 'ru' ? 'Фитнес-клуб / Зал' : 'Fitness Club / Gym'}</option>
                        <option value="pool" className="bg-[#121722]">{locale === 'ka' ? 'საცურაო აუზი / სპა' : locale === 'ru' ? 'Бассейн / Спа' : 'Swimming Pool / Spa'}</option>
                        <option value="studio" className="bg-[#121722]">{locale === 'ka' ? 'სტუდია (იოგა, კროსფიტი)' : locale === 'ru' ? 'Студия (Йога, Кроссфит)' : 'Studio (Yoga, CrossFit)'}</option>
                        <option value="federation" className="bg-[#121722]">{locale === 'ka' ? 'სპორტული ფედერაცია' : locale === 'ru' ? 'Спортивная Федерация' : 'Sports Federation'}</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 font-extrabold shadow-lg shadow-[#00ff87]/20 hover:brightness-110 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      style={{ minHeight: '48px' }}
                    >
                      <span>{t('booking_fallback_submit')}</span>
                      <ArrowRight className="w-4.5 h-4.5" />
                    </button>

                    {/* Direct quick contact links */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#94A3B8]">
                      <span className="text-[10px] text-[#94A3B8]/70 uppercase">
                        {locale === 'ka' ? 'ან დაგვიკავშირდით პირდაპირ:' : locale === 'ru' ? 'Или свяжитесь напрямую:' : 'Or contact us directly:'}
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://wa.me/995599000000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00ff87] hover:underline flex items-center gap-1 text-[11px]"
                        >
                          WhatsApp
                        </a>
                        <a
                          href="https://t.me/artron_support"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00A3FF] hover:underline flex items-center gap-1 text-[11px]"
                        >
                          Telegram
                        </a>
                      </div>
                    </div>

                    {isSubmitting && (
                      <div className="bg-[#05070a] border border-white/5 rounded-xl p-4 font-mono text-[9px] text-[#00ff87] space-y-1 overflow-y-auto max-h-[120px] transition-all">
                        {logs.map((log, i) => (
                          <div key={i}>{log}</div>
                        ))}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="font-mono text-xs text-[#00ff87] space-y-4 border border-[#00ff87]/20 bg-[#00ff87]/5 p-6 rounded-xl animate-fadeIn">
                    <div className="flex items-center gap-2 text-sm font-black">
                      <ShieldCheck className="w-5 h-5 text-[#00ff87]" />
                      <span>[ INTAKE_PROTOCOL_SUCCESSFUL // ONLINE_SYNCED ]</span>
                    </div>
                    <div className="border-t border-[#00ff87]/20 my-2" />
                    <p className="normal-case text-[#94A3B8] font-sans leading-relaxed">
                      {t('booking_fallback_success')}
                    </p>
                    <div className="text-[10px] text-[#00ff87]/60">
                      &gt; DEPLOY_NODE: NODE_03_DEMO_CLIENT<br />
                      &gt; GEO_IP_TRACE: KUTAISI, GEORGIA<br />
                      &gt; ACCESS_GRANT: GRANTED (PENDING ENGINEER CALLBACK)
                    </div>
                    <button 
                      onClick={() => { setIsSuccess(false); setName(''); setEmail(''); }}
                      className="text-[10px] uppercase font-bold text-[#00e5ff] hover:text-[#00ff87] transition-all cursor-pointer underline decoration-dotted"
                    >
                      [ ← SEND_ANOTHER_REQUEST ]
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

          {/* Right Block (40% width): Cyber Map */}
          <div className="lg:col-span-5 bg-[#05070a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 md:p-8">
            
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />
            
            <div className="space-y-6 flex flex-col h-full justify-between">
              
              <div>
                <span className="text-[10px] font-mono text-[#00A3FF] tracking-widest block mb-1 uppercase">[ LOC_RADAR // HQ_MAP ]</span>
                <h3 className="text-lg font-bold text-white uppercase">{t('booking_map_hq')}</h3>
                <p className="text-[11px] text-[#94A3B8] font-mono mt-1">{t('booking_map_coords')}</p>
              </div>

              {/* SVG Map Container */}
              <div className="relative w-full h-[220px] bg-[#05070a] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center select-none group">
                
                {/* Horizontal scanline */}
                <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent top-0 animate-[scan_3s_linear_infinite]" />
                
                <svg viewBox="0 0 400 220" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105">
                  {/* SVG Georgia Contour Outline Dots representation */}
                  {/* Outer boundaries representation lines */}
                  <path 
                    d="M 50 140 Q 90 90 140 100 T 210 110 T 290 80 T 360 110 L 370 140 L 330 170 L 260 180 L 190 160 L 120 170 L 50 140 Z" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                  />
                  
                  {/* Network flow lines */}
                  {/* Kutaisi -> Tbilisi */}
                  <path d="M 160 120 L 290 110" fill="none" stroke="rgba(0,163,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Kutaisi -> Batumi */}
                  <path d="M 160 120 L 90 150" fill="none" stroke="rgba(0,255,135,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Pulsing Sonar Ring on Kutaisi HQ */}
                  <circle cx="160" cy="120" r="10" fill="rgba(0,255,135,0.1)" stroke="rgba(0,255,135,0.3)" strokeWidth="1">
                    <animate attributeName="r" values="8;32" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="160" cy="120" r="22" fill="rgba(0,163,255,0.05)" stroke="rgba(0,163,255,0.2)" strokeWidth="1">
                    <animate attributeName="r" values="12;50" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="4s" repeatCount="indefinite" />
                  </circle>

                  {/* Nodes */}
                  {/* Kutaisi HQ */}
                  <circle cx="160" cy="120" r="5" fill="#00ff87" className="cursor-pointer" />
                  
                  {/* Tbilisi Client Node */}
                  <circle cx="290" cy="110" r="4.5" fill="#00A3FF" className="cursor-pointer" />
                  
                  {/* Batumi Client Node */}
                  <circle cx="90" cy="150" r="4.5" fill="#00e5ff" className="cursor-pointer" />

                  {/* Text Labels */}
                  <text x="165" y="115" fill="#00ff87" fontSize="8" fontFamily="monospace" fontWeight="bold">KUTAISI_HQ</text>
                  <text x="295" y="105" fill="#00A3FF" fontSize="7" fontFamily="monospace">TBILISI_SYS</text>
                  <text x="95" y="145" fill="#00e5ff" fontSize="7" fontFamily="monospace">BATUMI_SYS</text>
                </svg>

                {/* Cyber corner metadata overlays */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[8px] font-mono text-[#00ff87]/50">
                  <Wifi className="w-3 h-3 text-[#00ff87]" />
                  <span>HQ_PING: 4ms</span>
                </div>
                
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-[#94A3B8]/60">
                  SECURE IoT ROUTING GRAPH
                </div>
              </div>

              {/* Metadata Details */}
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2 font-mono">
                  <span className="text-[#94A3B8]">{t('booking_map_status')}</span>
                  <span className="text-[#00ff87] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />
                    ONLINE
                  </span>
                </div>
                
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                  {t('booking_map_desc')}
                </p>
                
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[9px] font-mono text-[#00A3FF]">
                    <MapPin className="w-3 h-3" />
                    <span>HQ ID: ARTRON-GEO-HQ-01</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
