"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface LaborTimesheetVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const LaborTimesheetVisualizer: React.FC<LaborTimesheetVisualizerProps> = ({
  cardType,
}) => {
  const [trainerVisits, setTrainerVisits] = useState(14);
  const [trainerRate] = useState(25); // 25 GEL per visit
  const [timesheetStatus, setTimesheetStatus] = useState<'ON_SHIFT' | 'BREAK' | 'COMPLETED'>('ON_SHIFT');

  const handleAdjustVisits = (delta: number) => {
    soundEngine.playPulseNode();
    setTrainerVisits((prev) => Math.max(0, prev + delta));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#D97736]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97736] animate-pulse" />
          <span className="text-[#D97736] font-bold tracking-wider uppercase text-[11px]">
            LABOR COMPLIANCE // ბრძანება №01-15/ნ &amp; TRAINER HUB
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 03 // STAFF
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Timesheet Row */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400 uppercase">თანამშრომლის ელექტრონული ტაბელი</span>
              <span className="text-[9px] text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30">
                სამინისტროს სტანდარტი
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] bg-black/30 p-2 rounded">
              <div>
                <div className="text-gray-500 text-[9px]">შესვლა</div>
                <div className="font-bold text-[#00B0FF]">08:58:12</div>
              </div>
              <div>
                <div className="text-gray-500 text-[9px]">გასვლა</div>
                <div className="font-bold text-gray-300">--:--:--</div>
              </div>
              <div>
                <div className="text-gray-500 text-[9px]">ნამუშევარი</div>
                <div className="font-bold text-[#00ff87]">5 სთ 42 წთ</div>
              </div>
              <div>
                <div className="text-gray-500 text-[9px]">სტატუსი</div>
                <div className="font-bold text-[#D97736]">ცვლაშია</div>
              </div>
            </div>
          </div>

          {/* Trainer Session Counter */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[11px] font-bold text-white">მწვრთნელის PT სესიების აღრიცხვა (Todo)</div>
                <div className="text-[9px] text-gray-400">ლევან კალაძე · პერსონალური ტრენერი</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[#D97736]">{trainerVisits * trainerRate} ₾</div>
                <div className="text-[9px] text-gray-400">ჯამური ჰონორარი</div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
              <span className="text-[11px] text-gray-300">ჩატარებული ვარჯიშები: <strong className="text-white">{trainerVisits}</strong></span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAdjustVisits(-1)}
                  className="w-7 h-7 rounded bg-white/5 hover:bg-white/15 border border-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleAdjustVisits(1)}
                  className="w-7 h-7 rounded bg-[#D97736]/20 hover:bg-[#D97736]/40 border border-[#D97736] text-[#D97736] font-bold flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              უფლებამოსილებები და შრომის ინსპექციის ექსპორტი
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">HR / ბუღალტერი:</span>
                <span className="text-[#D97736] font-bold">EXCEL/PDF ექსპორტი (ბრძანება №01-15/ნ)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">პერსონალური მწვრთნელი:</span>
                <span className="text-[#00B0FF] font-bold">მხოლოდ საკუთარი კლიენტების მართვა</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => soundEngine.playPulseNode()}
            className="w-full py-2.5 bg-[#D97736]/20 hover:bg-[#D97736]/30 border border-[#D97736] text-[#D97736] rounded font-bold uppercase text-[10px] tracking-wider transition-all"
          >
            📄 გადმოწერეთ შრომის ინსპექციის ოფიციალური ფორმატი
          </button>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              პროდუქტიულობა და რისკების ნულოვანი ზღვარი
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ინსპექციის ჯარიმები</div>
                <div className="text-sm font-bold text-[#00ff87]">0 ₾ (100% დაცვა)</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ტაბელის შევსების დრო</div>
                <div className="text-sm font-bold text-[#00B0FF]">0 წთ (ავტომატური)</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">მწვრთნელის შემოსავალი</div>
                <div className="text-sm font-bold text-[#D97736]">+32.5%</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-300">პერსონალის აღრიცხვის ავტომატიზაცია:</span>
              <span className="text-[#D97736] font-bold">100% ციფრული</span>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
              <div className="bg-[#D97736] h-full w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>MINISTRY COMPLIANCE VERIFIED</span>
        <span className="text-[#D97736]">ORDER №01-15/N</span>
      </div>
    </div>
  );
};
