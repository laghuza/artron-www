'use client';

import React, { useMemo, useState } from 'react';
import { Calendar, Zap, BellRing, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsHeatmapTabProps {
  t: (key: string) => string;
  locale: string;
  selectedCell: { day: string; hour: string; load: number } | null;
  setSelectedCell: (cell: { day: string; hour: string; load: number } | null) => void;
  selectedBranch: 'tbilisi' | 'batumi';
  setSelectedBranch: (branch: 'tbilisi' | 'batumi') => void;
}

export const AnalyticsHeatmapTab: React.FC<AnalyticsHeatmapTabProps> = ({
  t,
  locale,
  selectedCell,
  setSelectedCell,
  selectedBranch,
  setSelectedBranch,
}) => {
  const [promoTriggered, setPromoTriggered] = useState<string | null>(null);

  const daysOfWeek = useMemo(
    () =>
      locale === 'ka'
        ? ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი']
        : locale === 'ru'
        ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [locale]
  );

  const hoursOfDay = useMemo(
    () => ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    []
  );

  const heatmapData = useMemo<Record<'tbilisi' | 'batumi', number[][]>>(
    () => ({
      tbilisi: [
        [30, 45, 60, 50, 40, 75, 90, 40], // Mon
        [25, 40, 55, 45, 35, 80, 85, 35], // Tue
        [35, 50, 65, 55, 45, 85, 95, 45], // Wed
        [30, 45, 60, 50, 40, 75, 90, 40], // Thu
        [40, 55, 70, 60, 50, 90, 80, 50], // Fri
        [20, 35, 50, 65, 70, 60, 50, 30], // Sat
        [15, 25, 40, 55, 60, 50, 40, 20], // Sun
      ],
      batumi: [
        [20, 35, 50, 45, 55, 70, 80, 30], // Mon
        [20, 30, 45, 40, 50, 75, 75, 30], // Tue
        [25, 35, 50, 45, 55, 80, 85, 35], // Wed
        [20, 35, 50, 40, 50, 70, 80, 30], // Thu
        [30, 45, 60, 55, 65, 85, 80, 45], // Fri
        [25, 40, 65, 75, 80, 70, 60, 35], // Sat
        [20, 30, 55, 70, 75, 60, 45, 25], // Sun
      ],
    }),
    []
  );

  const getHeatmapColor = (load: number) => {
    if (load >= 80) return 'bg-[#FF4A5A]/35 border-[#FF4A5A]/50 shadow-[0_0_8px_rgba(255,74,90,0.25)]';
    if (load >= 60) return 'bg-[#00A3FF]/30 border-[#00A3FF]/50 shadow-[0_0_8px_rgba(0,163,255,0.2)]';
    if (load >= 40) return 'bg-[#00ff87]/25 border-[#00ff87]/40';
    return 'bg-white/5 border-white/5';
  };

  const handleTriggerPromo = (cellKey: string) => {
    setPromoTriggered(cellKey);
    setTimeout(() => setPromoTriggered(null), 3500);
  };

  return (
    <div className="flex flex-col space-y-6 flex-grow">
      {/* Header & Branch Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00e5ff]" />
            <span>
              {locale === 'ka'
                ? 'დარბაზის პიკური საათების სითბური რუკა'
                : locale === 'ru'
                ? 'Тепловая карта загруженности зала'
                : 'Facility Occupancy Heatmap'}
            </span>
          </h3>
          <p className="text-xs text-[#94A3B8]">
            {locale === 'ka'
              ? 'დატვირთვა გადანაწილდება დღეების და საათების მიხედვით არაპიკური საათების გამოსავლენად.'
              : locale === 'ru'
              ? 'Распределение трафика по дням и часам для выявления непиковых окон.'
              : 'Load distribution by day and hour to identify off-peak discount windows.'}
          </p>
        </div>

        {/* Branch Switcher */}
        <div className="flex p-0.5 bg-[#121722] border border-white/5 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => {
              setSelectedBranch('tbilisi');
              setSelectedCell(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer relative overflow-hidden ${
              selectedBranch === 'tbilisi' ? 'text-[#00e5ff]' : 'text-[#64748B] hover:text-white'
            }`}
            style={{ minHeight: '32px' }}
          >
            <span className="relative z-10">Tbilisi Central</span>
            {selectedBranch === 'tbilisi' && (
              <motion.div
                layoutId="branchToggleBg"
                className="absolute inset-0 bg-[#00e5ff]/20 border border-[#00e5ff]/30 rounded-lg -z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => {
              setSelectedBranch('batumi');
              setSelectedCell(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer relative overflow-hidden ${
              selectedBranch === 'batumi' ? 'text-[#00e5ff]' : 'text-[#64748B] hover:text-white'
            }`}
            style={{ minHeight: '32px' }}
          >
            <span className="relative z-10">Batumi Boulevard</span>
            {selectedBranch === 'batumi' && (
              <motion.div
                layoutId="branchToggleBg"
                className="absolute inset-0 bg-[#00e5ff]/20 border border-[#00e5ff]/30 rounded-lg -z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto w-full pb-4">
        <div className="min-w-[640px] space-y-2.5">
          {/* Hours Header Row */}
          <div className="grid grid-cols-9 gap-2 pl-12 text-center text-[10px] font-mono text-[#64748B]">
            {hoursOfDay.map((h, i) => (
              <div key={i}>{h}</div>
            ))}
          </div>

          {/* Grid Rows */}
          {daysOfWeek.map((day, dayIdx) => (
            <div key={dayIdx} className="grid grid-cols-9 gap-2 items-center">
              {/* Day label */}
              <div className="w-10 text-xs font-bold text-[#94A3B8] text-right pr-2.5 font-mono">{day}</div>

              {/* Hours Cells */}
              {hoursOfDay.map((hour, hrIdx) => {
                const load = heatmapData[selectedBranch][dayIdx][hrIdx];
                const isSelected = selectedCell && selectedCell.day === day && selectedCell.hour === hour;
                return (
                  <motion.button
                    key={hrIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: (dayIdx * 8 + hrIdx) * 0.005,
                      ease: 'easeOut',
                    }}
                    whileHover={{ scale: 1.08, filter: 'brightness(1.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCell({ day, hour, load })}
                    className={`h-11 rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none flex flex-col justify-end p-1.5 relative overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-white scale-105 border-white shadow-[0_0_15px_rgba(0,163,255,0.4)] z-10 bg-opacity-100'
                        : getHeatmapColor(load)
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    <span className="text-[8px] font-mono font-extrabold text-white leading-none">{load}%</span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Active Selection Details Overlay */}
      <div className="p-5 rounded-2xl bg-[#05070a]/90 border border-cyan-500/20 min-h-[105px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedCell ? (
            <motion.div
              key={`${selectedCell.day}-${selectedCell.hour}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full"
            >
              <div className="space-y-1.5 flex-1">
                <div className="text-[10px] font-mono text-[#00ff87] uppercase font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                  <span>[ CELL_TELEMETRY: {selectedCell.day} @ {selectedCell.hour} ]</span>
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedCell.day} • {selectedCell.hour}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      selectedCell.load >= 80
                        ? 'bg-[#FF4A5A]/15 text-[#FF4A5A] border border-[#FF4A5A]/30'
                        : 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30'
                    }`}
                  >
                    {selectedCell.load}% დატვირთვა
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                    (~{Math.round(selectedCell.load * 1.8)} ადამიანი დარბაზში)
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {selectedCell.load >= 80
                    ? locale === 'ka'
                      ? 'პიკური საათი: რეკომენდებულია ტურნიკეტის Anti-passback მკაცრი კონტროლი ან პიკური ტარიფის გამოყენება.'
                      : locale === 'ru'
                      ? 'Пиковый час: рекомендуется строгий Anti-passback или применение пикового тарифа.'
                      : 'Peak hour: recommend strict Anti-passback enforcement or peak pricing adjust.'
                    : locale === 'ka'
                    ? 'არაპიკური ფანჯარა: გაუშვით ავტომატური SMS/Push შეთავაზება (-15% ფასდაკლება Check-in-ზე).'
                    : locale === 'ru'
                    ? 'Непиковое окно: запустите SMS/Push оффер (-15% скидка на Check-in).'
                    : 'Off-peak window: trigger automated SMS/Push promo (-15% discount on Check-in).'}
                </p>
              </div>

              {/* Action Trigger Button */}
              <div className="flex items-center gap-3 shrink-0">
                {selectedCell.load < 80 ? (
                  <button
                    onClick={() => handleTriggerPromo(`${selectedCell.day}-${selectedCell.hour}`)}
                    className="px-3.5 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,163,255,0.15)]"
                  >
                    {promoTriggered === `${selectedCell.day}-${selectedCell.hour}` ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Push გაგზავნილია!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Off-Peak Push ტრიგერი (-15%)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                    PEAK HOUR SURGE
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center text-xs text-[#64748B] font-mono py-2"
            >
              {locale === 'ka'
                ? 'დააჭირეთ ნებისმიერ უჯრას საათობრივი დატვირთვისა და ავტომატიზაციის ტრიგერის გასააქტიურებლად'
                : locale === 'ru'
                ? 'Нажмите на любую ячейку для активации почасовой аналитики и триггеров'
                : 'Click on any cell to retrieve specific hourly occupancy telemetry and automation triggers'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
