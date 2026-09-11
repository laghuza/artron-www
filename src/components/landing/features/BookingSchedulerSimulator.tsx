'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  Waves, 
  Dumbbell, 
  HeartHandshake, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '@/core';

interface ScheduleClass {
  id: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  time: string;
  trainer: string;
  type: 'group' | 'pool' | 'trainer';
  enrolled: number;
  capacity: number;
  room: string;
  isBooked?: boolean;
}

export const BookingSchedulerSimulator: React.FC = () => {
  const { locale } = useLanguage();

  const [classes, setClasses] = useState<ScheduleClass[]>([
    {
      id: 'c1',
      nameKa: 'CrossFit ინტენსივი',
      nameEn: 'CrossFit Intensive',
      nameRu: 'Кроссфит интенсив',
      time: '09:00 - 10:00',
      trainer: 'გიორგი მ.',
      type: 'group',
      enrolled: 17,
      capacity: 18,
      room: 'Area A (CrossZone)',
      isBooked: false
    },
    {
      id: 'c2',
      nameKa: 'ოლიმპიური აუზი (ბილიკი #3)',
      nameEn: 'Olympic Pool (Lane #3)',
      nameRu: 'Олимпийский бассейн (Дор. #3)',
      time: '11:00 - 12:00',
      trainer: 'სალომე წ.',
      type: 'pool',
      enrolled: 4,
      capacity: 6,
      room: 'Aquatics Zone',
      isBooked: false
    },
    {
      id: 'c3',
      nameKa: 'პერსონალური ვარჯიში 1-on-1',
      nameEn: 'Personal 1-on-1 Coaching',
      nameRu: 'Персональная тренировка 1-на-1',
      time: '14:30 - 15:30',
      trainer: 'დავით კ.',
      type: 'trainer',
      enrolled: 1,
      capacity: 1,
      room: 'Private VIP Pod',
      isBooked: true
    },
    {
      id: 'c4',
      nameKa: 'Pilates & Mobility Flow',
      nameEn: 'Pilates & Mobility Flow',
      nameRu: 'Пилатес и мобильность',
      time: '18:00 - 19:00',
      trainer: 'ნინო ბ.',
      type: 'group',
      enrolled: 12,
      capacity: 15,
      room: 'Mind & Body Studio',
      isBooked: false
    }
  ]);

  const [selectedClassId, setSelectedClassId] = useState<string>('c1');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  const handleToggleBooking = (id: string) => {
    soundEngine.playPulseNode();
    setClasses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.isBooked;
          const newEnrolled = newStatus ? Math.min(item.capacity, item.enrolled + 1) : Math.max(0, item.enrolled - 1);
          return { ...item, isBooked: newStatus, enrolled: newEnrolled };
        }
        return item;
      })
    );

    const isNowBooked = !classes.find((c) => c.id === id)?.isBooked;
    const msg = isNowBooked
      ? (locale === 'ka' ? 'ჯავშანი დადასტურებულია! QR კოდი გააქტიურდა მობილურ აპში.' : locale === 'ru' ? 'Бронь подтверждена! QR активен в приложении.' : 'Booking confirmed! QR pass activated in Mobile App.')
      : (locale === 'ka' ? 'ჯავშანი გაუქმდა. ადგილი გათავისუფლდა.' : locale === 'ru' ? 'Бронь отменена. Место освобождено.' : 'Booking released. Slot freed.');

    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const getClassName = (c: ScheduleClass) => {
    if (locale === 'ka') return c.nameKa;
    if (locale === 'ru') return c.nameRu;
    return c.nameEn;
  };

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between">
      {/* Top Notification Toast */}
      {successToast && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Grid: Left classes list, Right Live Slot Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: Daily Schedule List */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
              <CalendarDays className="w-4 h-4 text-[#00A3FF]" />
              <span>{locale === 'ka' ? 'დღის აქტივობების განრიგი' : locale === 'ru' ? 'Расписание на сегодня' : 'Today\'s Schedule Grid'}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30">
              Live Sync
            </span>
          </div>

          <div className="space-y-2">
            {classes.map((cls) => {
              const isSelected = cls.id === selectedClassId;
              const isAlmostFull = cls.enrolled >= cls.capacity - 1;
              const isFull = cls.enrolled >= cls.capacity;

              return (
                <div
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#00A3FF]/10 border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.15)]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      cls.type === 'pool' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : cls.type === 'trainer'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {cls.type === 'pool' ? <Waves className="w-4 h-4" /> : cls.type === 'trainer' ? <HeartHandshake className="w-4 h-4" /> : <Dumbbell className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {getClassName(cls)}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#00A3FF]" /> {cls.time}</span>
                        <span>•</span>
                        <span>{cls.trainer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold">
                      <span className={isFull ? 'text-rose-400' : isAlmostFull ? 'text-amber-400' : 'text-emerald-400'}>
                        {cls.enrolled}
                      </span>
                      <span className="text-[#94A3B8]">/{cls.capacity}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#94A3B8] block">
                      {isFull ? 'გადავსებული' : `${cls.capacity - cls.enrolled} თავისუფალი`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Class Inspector & One-Click Booking */}
        <div className="md:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-[10px] font-mono text-[#00A3FF] uppercase font-bold tracking-wider">
                {locale === 'ka' ? 'ჯავშნის ინსპექტორი' : locale === 'ru' ? 'Инспектор слота' : 'Slot Inspector'}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Overbooking Guard</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-black text-white leading-snug">
                {getClassName(selectedClass)}
              </h4>
              <p className="text-[11px] text-[#94A3B8] font-mono">
                {selectedClass.room}
              </p>
            </div>

            {/* Capacity Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">{locale === 'ka' ? 'დაკავებულობა:' : 'Capacity:'}</span>
                <span className="text-white font-bold">{Math.round((selectedClass.enrolled / selectedClass.capacity) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    selectedClass.enrolled >= selectedClass.capacity ? 'bg-rose-500' : 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF]'
                  }`}
                  style={{ width: `${Math.min(100, (selectedClass.enrolled / selectedClass.capacity) * 100)}%` }}
                />
              </div>
            </div>

            {/* Sync Features Badge */}
            <div className="mt-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono">
                <Smartphone className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>{locale === 'ka' ? 'მობილური აპიდან 1-კლიკიანი ჯავშანი' : 'Mobile App 1-Click Booking'}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'ka' ? 'ავტო-ჩამოჭრა ტურნიკეტზე შესვლისას' : 'Auto-deduction at Turnstile QR check-in'}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => handleToggleBooking(selectedClass.id)}
            className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedClass.isBooked
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)] hover:shadow-[0_0_25px_rgba(0,163,255,0.6)]'
            }`}
          >
            {selectedClass.isBooked ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>{locale === 'ka' ? 'ჯავშნის გაუქმება' : locale === 'ru' ? 'Отменить бронь' : 'Cancel Booking'}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{locale === 'ka' ? 'ადგილის დაჯავშნა' : locale === 'ru' ? 'Забронировать место' : 'Reserve Slot'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
