'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, Shield } from 'lucide-react';

export const LaborCompliance: React.FC = () => {
  const { t } = useLanguage();
  const [showHashes, setShowHashes] = useState<boolean>(false);

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#00ff87]" />
          <span>{t('dashboardFeatures_labor_title')}</span>
        </div>
        <button
          onClick={() => setShowHashes(!showHashes)}
          className={`text-[9px] font-mono font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
            showHashes
              ? 'bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/30'
              : 'bg-white/5 text-[#94A3B8] border-white/5 hover:border-white/10'
          }`}
          style={{ minHeight: '30px' }}
        >
          {t('dashboardFeatures_labor_audits_show')}
        </button>
      </div>

      {/* Table View */}
      <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden flex-grow flex flex-col justify-between">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[10px] md:text-xs">
            <thead>
              <tr className="bg-white/5 text-[#94A3B8] border-b border-white/5 font-bold uppercase tracking-wider">
                <th className="p-3">Employee</th>
                <th className="p-3">Date</th>
                <th className="p-3">In</th>
                <th className="p-3">Out</th>
                <th className="p-3 text-right">Hours</th>
                <th className={`p-3 text-right transition-all duration-300 ${showHashes ? 'w-24 md:w-32 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#E2E8F0] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-white">Lasha K. (Trainer)</td>
                <td className="p-3">2026-08-10</td>
                <td className="p-3 text-emerald-400">09:00:15</td>
                <td className="p-3 text-rose-400">18:02:44</td>
                <td className="p-3 text-right font-sans font-bold">9h 02m</td>
                <td className={`p-3 text-right text-[8px] text-[#00ff87] font-semibold transition-all duration-300 ${showHashes ? 'opacity-100' : 'opacity-0 overflow-hidden'}`}>0x8F3D7...</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-white">Nino M. (Admin)</td>
                <td className="p-3">2026-08-10</td>
                <td className="p-3 text-emerald-400">08:58:10</td>
                <td className="p-3 text-rose-400">17:00:05</td>
                <td className="p-3 text-right font-sans font-bold">8h 01m</td>
                <td className={`p-3 text-right text-[8px] text-[#00ff87] font-semibold transition-all duration-300 ${showHashes ? 'opacity-100' : 'opacity-0 overflow-hidden'}`}>0x4A2E1...</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-white">David T. (Doctor)</td>
                <td className="p-3">2026-08-10</td>
                <td className="p-3 text-emerald-400">10:15:00</td>
                <td className="p-3 text-rose-400">16:30:12</td>
                <td className="p-3 text-right font-sans font-bold">6h 15m</td>
                <td className={`p-3 text-right text-[8px] text-[#00ff87] font-semibold transition-all duration-300 ${showHashes ? 'opacity-100' : 'opacity-0 overflow-hidden'}`}>0x9C1B4...</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom disclaimer */}
        <div className="p-3 bg-white/5 border-t border-white/5 flex items-center gap-2 text-[9px] text-[#94A3B8]">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{t('dashboardFeatures_labor_audits')}</span>
        </div>
      </div>
    </div>
  );
};
