'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { Dumbbell, Waves, Activity, Trophy, ArrowRight } from 'lucide-react';

interface BookingStep1FacilityProps {
  facilityType: string;
  setFacilityType: (val: string) => void;
  onNext: () => void;
}

export const BookingStep1Facility: React.FC<BookingStep1FacilityProps> = ({
  facilityType,
  setFacilityType,
  onNext,
}) => {
  const { t } = useLanguage();

  const facilityOptions = [
    { id: 'gym', icon: Dumbbell, name: t('booking_type_gym'), desc: t('booking_type_gym_desc') },
    { id: 'pool', icon: Waves, name: t('booking_type_pool'), desc: t('booking_type_pool_desc') },
    { id: 'studio', icon: Activity, name: t('booking_type_studio'), desc: t('booking_type_studio_desc') },
    { id: 'federation', icon: Trophy, name: t('booking_type_federation'), desc: t('booking_type_federation_desc') },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A3FF] block">
          [ STEP_01 // FACILITY_DISCIPLINE ]
        </span>
        <h4 className="text-base sm:text-lg font-bold text-white mt-1">
          {t('booking_step1_title')}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {facilityOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = facilityType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              data-testid={`booking-type-${opt.id}`}
              onClick={() => {
                soundEngine.playPulseNode();
                setFacilityType(opt.id);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#00A3FF]/15 border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.25)]'
                  : 'bg-[#05070a]/85 border-[#8a99ad]/10 hover:border-[#00A3FF]/40 hover:bg-[#0E1420] hover:shadow-[0_0_15px_rgba(0,163,255,0.1)]'
              }`}
            >
              {/* L-Shape Corner Brackets */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isSelected ? 'border-[#00A3FF]' : 'border-[#00A3FF]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isSelected ? 'border-[#00A3FF]' : 'border-[#00A3FF]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isSelected ? 'border-[#00A3FF]' : 'border-[#00A3FF]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isSelected ? 'border-[#00A3FF]' : 'border-[#00A3FF]/20 opacity-0 group-hover:opacity-100 transition-opacity'}`} />

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00A3FF] animate-ping" />
              )}
              <div className={`p-2.5 rounded-lg shrink-0 transition-all ${isSelected ? 'bg-[#00A3FF] text-white shadow-[0_0_12px_rgba(0,163,255,0.4)]' : 'bg-white/5 text-gray-400 group-hover:text-[#00A3FF] group-hover:border-[#00A3FF]/30'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">{opt.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        data-testid="booking-step1-next"
        onClick={onNext}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00A3FF]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
        style={{ minHeight: '46px' }}
      >
        <span>{t('booking_btn_next')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
