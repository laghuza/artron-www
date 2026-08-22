'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileSpreadsheet, Download, CheckCircle2, Lock, X, Clock, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LaborComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaborComplianceModal: React.FC<LaborComplianceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { locale } = useLanguage();
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'done'>('idle');

  const timesheetData = [
    { id: 'EMP-01', name: 'გიორგი მაისურაძე', role: 'მთავარი მწვრთნელი', checkIn: '08:58:12', checkOut: '17:02:45', totalHours: '8 სთ 04 წთ', status: 'COMPLIANT' },
    { id: 'EMP-02', name: 'მარიამ ბერიძე', role: 'ადმინისტრატორი', checkIn: '09:00:04', checkOut: '18:01:20', totalHours: '9 სთ 01 წთ', status: 'COMPLIANT' },
    { id: 'EMP-03', name: 'ირაკლი კაპანაძე', role: 'ფიტნეს ინსტრუქტორი', checkIn: '13:55:30', checkOut: '22:00:15', totalHours: '8 სთ 05 წთ', status: 'COMPLIANT' },
    { id: 'EMP-04', name: 'ნინო ჯაფარიძე', role: 'ექიმი / მედპერსონალი', checkIn: '10:02:11', checkOut: '16:00:00', totalHours: '5 სთ 58 წთ', status: 'COMPLIANT' },
  ];

  const handleSimulatedExport = (format: 'xlsx' | 'pdf') => {
    setExportState('exporting');
    setTimeout(() => {
      setExportState('done');
      setTimeout(() => setExportState('idle'), 3000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-3xl bg-[#090D14] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,163,255,0.15)] overflow-hidden z-10 p-6 md:p-8"
          >
            {/* Top Accent Light */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GEORGIAN LABOR LAW COMPLIANCE</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>ბრძანება №01-15/ნ ტაბელის აუდიტი</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  სამუშაო დროის ელექტრონული აღრიცხვა IoT ტურნიკეტების ბიომეტრიული/RFID სინქრონიზაციით.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compliance Badges Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">იურიდიული სტატუსი</div>
                  <div className="text-xs font-bold text-emerald-400">100% შესაბამისობა</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">დაშიფვრა (PII / ID)</div>
                  <div className="text-xs font-bold text-cyan-400 font-mono">AES-256-GCM</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">ვალიდაცია</div>
                  <div className="text-xs font-bold text-indigo-300 font-mono">ავტომატური ტაბელი</div>
                </div>
              </div>
            </div>

            {/* Simulated Live Table */}
            <div className="border border-white/10 rounded-xl overflow-hidden mb-6 bg-[#06090E]">
              <div className="p-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>მიმდინარე სამუშაო დღის რეესტრი</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE SYNCED
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-[10px] uppercase text-slate-500 bg-white/[0.01] border-b border-white/5">
                    <tr>
                      <th className="py-2.5 px-3">თანამშრომელი</th>
                      <th className="py-2.5 px-3">პოზიცია</th>
                      <th className="py-2.5 px-3">შესვლა</th>
                      <th className="py-2.5 px-3">გასვლა</th>
                      <th className="py-2.5 px-3">ნამუშევარი დრო</th>
                      <th className="py-2.5 px-3 text-right">აუდიტი</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[11px]">
                    {timesheetData.map((row) => (
                      <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-white font-sans">{row.name}</td>
                        <td className="py-2.5 px-3 text-slate-400">{row.role}</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">{row.checkIn}</td>
                        <td className="py-2.5 px-3 text-rose-400 font-bold">{row.checkOut}</td>
                        <td className="py-2.5 px-3 text-cyan-300 font-bold">{row.totalHours}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            №01-15/ნ OK
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/5">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                ინსპექციისთვის მზა ოფიციალური ფორმატი
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleSimulatedExport('xlsx')}
                  disabled={exportState === 'exporting'}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,163,255,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {exportState === 'exporting' ? (
                    <span>გენერირდება...</span>
                  ) : exportState === 'done' ? (
                    <span className="flex items-center gap-1 text-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ექსპორტირებულია!
                    </span>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>ექსპორტი (Excel №01-15/ნ)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
