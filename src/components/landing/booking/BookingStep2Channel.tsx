'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { Video, Monitor, MessageCircle, Send, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookingStep2ChannelProps {
  platform: string;
  setPlatform: (val: string) => void;
  contactValue: string;
  setContactValue: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BookingStep2Channel: React.FC<BookingStep2ChannelProps> = ({
  platform,
  setPlatform,
  contactValue,
  setContactValue,
  onNext,
  onBack,
}) => {
  const { t } = useLanguage();

  const platformOptions = [
    { id: 'meet', icon: Video, name: t('booking_plat_meet'), desc: t('booking_plat_meet_desc'), color: '#00A3FF' },
    { id: 'zoom', icon: Monitor, name: t('booking_plat_zoom'), desc: t('booking_plat_zoom_desc'), color: '#2D8CFF' },
    { id: 'whatsapp', icon: MessageCircle, name: t('booking_plat_whatsapp'), desc: t('booking_plat_whatsapp_desc'), color: '#25D366' },
    { id: 'telegram', icon: Send, name: t('booking_plat_telegram'), desc: t('booking_plat_telegram_desc'), color: '#0088CC' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff87] block">
            [ STEP_02 // CHANNEL_ROUTING ]
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            {t('booking_step2_title')}
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

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        {platformOptions.map((plat) => {
          const Icon = plat.icon;
          const isSelected = platform === plat.id;
          return (
            <button
              key={plat.id}
              type="button"
              data-testid={`booking-plat-${plat.id}`}
              onClick={() => {
                soundEngine.playPulseNode();
                setPlatform(plat.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-white/10 border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.2)]'
                  : 'bg-[#05070a]/85 border-[#8a99ad]/10 hover:border-[#00ff87]/40 hover:bg-[#0E1420]'
              }`}
            >
              {/* L-Shape Corner Brackets */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isSelected ? 'border-[#00ff87]' : 'border-[#00ff87]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isSelected ? 'border-[#00ff87]' : 'border-[#00ff87]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isSelected ? 'border-[#00ff87]' : 'border-[#00ff87]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isSelected ? 'border-[#00ff87]' : 'border-[#00ff87]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />

              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" style={{ color: isSelected ? '#00ff87' : plat.color }} />
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{plat.name}</div>
                <div className="text-[9px] text-gray-400">{plat.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Direct contact field based on platform */}
      <div className="space-y-1.5 pt-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
          {platform === 'meet' || platform === 'zoom'
            ? t('booking_contact_email_label')
            : platform === 'telegram'
            ? t('booking_contact_telegram_label')
            : t('booking_contact_phone_label')}
        </label>
        <input
          type={platform === 'meet' || platform === 'zoom' ? 'email' : 'text'}
          required
          data-testid="booking-contact-input"
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          placeholder={
            platform === 'meet' || platform === 'zoom'
              ? 'e.g. director@fitness.ge'
              : platform === 'telegram'
              ? '@username or +995...'
              : '+995 599 000 000'
          }
          className="w-full bg-[#121722]/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00ff87] transition-all font-mono"
          style={{ minHeight: '44px' }}
        />
      </div>

      <button
        type="button"
        data-testid="booking-step2-next"
        onClick={onNext}
        disabled={!contactValue.trim()}
        className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00A3FF]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
        style={{ minHeight: '46px' }}
      >
        <span>{t('booking_btn_next')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
