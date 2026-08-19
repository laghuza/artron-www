"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

export const LaborTimesheetSimulator: React.FC = () => {
  const { t } = useI18n();
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    soundEngine.playPulseNode();

    setTimeout(() => {
      setLoading(false);
      setIsGenerated(true);
      soundEngine.playSystemAccess();
    }, 600);
  };

  return (
    <div className="w-full bg-[#12161A]/90 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-md animate-fadeIn select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97736] animate-pulse" />
          <h4 className="text-[12px] font-mono font-bold text-white uppercase tracking-[1.5px]">
            {t('simulators.labor_title')}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30">
          ORDER №01-15/ნ READY
        </span>
      </div>

      <p className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
        {t('simulators.labor_desc')}
      </p>

      {/* Generated Timesheet Preview Table */}
      {isGenerated ? (
        <div className="space-y-2 animate-fadeIn">
          <div className="text-[11px] font-mono text-[#00ff87] font-bold">
            {t('simulators.labor_generated')}
          </div>
          <div className="overflow-x-auto bg-[#090b0e] border border-white/10 rounded-lg p-3">
            <table className="w-full text-left font-mono text-[10px] text-[#9CA3AF]">
              <thead>
                <tr className="border-b border-white/10 text-white">
                  <th className="pb-1">STAFF / TRAINER</th>
                  <th className="pb-1">IN / OUT</th>
                  <th className="pb-1">HOURS</th>
                  <th className="pb-1 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-1 text-white">გიორგი მ. (Head Trainer)</td>
                  <td className="py-1">08:00 - 16:30</td>
                  <td className="py-1 text-[#00ff87]">8.5h</td>
                  <td className="py-1 text-right text-[#00ff87]">VERIFIED</td>
                </tr>
                <tr>
                  <td className="py-1 text-white">ნინო კ. (Fitness Instructor)</td>
                  <td className="py-1">10:00 - 18:00</td>
                  <td className="py-1 text-[#00ff87]">8.0h</td>
                  <td className="py-1 text-right text-[#00ff87]">VERIFIED</td>
                </tr>
                <tr>
                  <td className="py-1 text-white">დავით თ. (Duty Admin)</td>
                  <td className="py-1">07:45 - 16:00</td>
                  <td className="py-1 text-[#00ff87]">8.25h</td>
                  <td className="py-1 text-right text-[#00ff87]">VERIFIED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#0D0F13] border border-dashed border-white/10 rounded-lg text-center font-mono text-[11px] text-[#9CA3AF]">
          [ დააჭირეთ ღილაკს რეალური სატესტო ტაბელის სანახავად ]
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 bg-[#D97736] hover:bg-[#EA580C] text-white font-mono text-[12px] font-bold uppercase tracking-[1.5px] rounded-lg shadow-[0_0_15px_rgba(217,119,54,0.3)] transition-all cursor-pointer disabled:opacity-50"
      >
        {loading ? "გენერირება..." : t('simulators.labor_generate_btn')}
      </button>
    </div>
  );
};
