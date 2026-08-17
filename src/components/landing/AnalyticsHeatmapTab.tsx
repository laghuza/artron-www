import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsHeatmapTabProps {
  t: (key: string) => string;
  locale: string;
  selectedCell: { day: string, hour: string, load: number } | null;
  setSelectedCell: (cell: { day: string, hour: string, load: number } | null) => void;
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
  const daysOfWeek = useMemo(() => (locale === 'ka' 
    ? ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'] 
    : locale === 'ru' 
    ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] 
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']), [locale]);

  const hoursOfDay = useMemo(() => ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'], []);

  const heatmapData = useMemo<Record<'tbilisi' | 'batumi', number[][]>>(() => ({
    tbilisi: [
      [30, 45, 60, 50, 40, 75, 90, 40], // Mon
      [25, 40, 55, 45, 35, 80, 85, 35], // Tue
      [35, 50, 65, 55, 45, 85, 95, 45], // Wed
      [30, 45, 60, 50, 40, 75, 90, 40], // Thu
      [40, 55, 70, 60, 50, 90, 80, 50], // Fri
      [20, 35, 50, 65, 70, 60, 50, 30], // Sat
      [15, 25, 40, 55, 60, 50, 40, 20]  // Sun
    ],
    batumi: [
      [20, 35, 50, 45, 55, 70, 80, 30], // Mon
      [20, 30, 45, 40, 50, 75, 75, 30], // Tue
      [25, 35, 50, 45, 55, 80, 85, 35], // Wed
      [20, 35, 50, 40, 50, 70, 80, 30], // Thu
      [30, 45, 60, 55, 65, 85, 80, 45], // Fri
      [25, 40, 65, 75, 80, 70, 60, 35], // Sat
      [20, 30, 55, 70, 75, 60, 45, 25]  // Sun
    ]
  }), []);

  const getHeatmapColor = (load: number) => {
    if (load >= 80) return 'bg-[#FF4A5A]/35 border-[#FF4A5A]/50 shadow-[0_0_8px_rgba(255,74,90,0.25)]';
    if (load >= 60) return 'bg-[#00A3FF]/30 border-[#00A3FF]/50';
    if (load >= 40) return 'bg-[#00ff87]/25 border-[#00ff87]/40';
    return 'bg-white/5 border-white/5';
  };

  return (
    <div className="flex flex-col space-y-6 flex-grow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00e5ff]" />
            {locale === 'ka' ? 'დარბაზის პიკური საათების სითბური რუკა' : locale === 'ru' ? 'Тепловая карта загруженности зала' : 'Facility Occupancy Heatmap'}
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
            onClick={() => { setSelectedBranch('tbilisi'); setSelectedCell(null); }}
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
            onClick={() => { setSelectedBranch('batumi'); setSelectedCell(null); }}
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
                      ease: 'easeOut' 
                    }}
                    whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCell({ day, hour, load })}
                    className={`h-11 rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none flex flex-col justify-end p-1.5 relative overflow-hidden ${
                      isSelected 
                        ? 'ring-2 ring-white scale-105 border-white shadow-[0_0_12px_rgba(255,255,255,0.2)] z-10 bg-opacity-100' 
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
      <div className="p-5 rounded-2xl bg-[#05070a]/90 border border-[#8a99ad]/10 min-h-[96px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedCell ? (
            <motion.div 
              key={`${selectedCell.day}-${selectedCell.hour}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full"
            >
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[#00ff87] uppercase font-bold">[ GRID_CELL_TELEMETRY ]</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedCell.day} • {selectedCell.hour}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                    selectedCell.load >= 80 ? 'bg-[#FF4A5A]/10 text-[#FF4A5A]' : 'bg-[#00ff87]/10 text-[#00ff87]'
                  }`}>
                    {selectedCell.load}% Capacity Load
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {selectedCell.load >= 80 
                    ? (locale === 'ka' ? 'ურჩიეთ მომხმარებლებს სხვა საათები ან გაზარდეთ ტარიფი პიკურ პერიოდზე.' : locale === 'ru' ? 'Рекомендуйте другое время или повысьте тариф в пиковый период.' : 'Advise off-peak hours to members or apply peak-time pricing adjust.')
                    : (locale === 'ka' ? 'შესანიშნავი დროა აქციებისთვის: ჩართეთ -10% ფასდაკლების ტრიგერი.' : locale === 'ru' ? 'Отличное время для акций: запустите триггер скидки -10%.' : 'Optimal window for promos: trigger a -10% check-in discount.')
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono font-bold text-white bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  {selectedCell.load >= 80 ? 'PEAK HOUR' : 'OFF-PEAK'}
                </span>
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
              {locale === 'ka' ? 'დააჭირეთ ნებისმიერ უჯრას დეტალური ანალიზისთვის' : locale === 'ru' ? 'Нажмите на любую ячейку для детального анализа' : 'Click on any cell to retrieve specific occupancy analytics'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
