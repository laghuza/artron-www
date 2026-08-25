'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AuditPnlSummaryCardProps {
  title: string;
  isOptimized?: boolean;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  marginPct: number;
  formatCurrency: (val: number) => string;
  labels: {
    revenue: string;
    expenses: string;
    profit: string;
    margin: string;
  };
}

export const AuditPnlSummaryCard: React.FC<AuditPnlSummaryCardProps> = ({
  title,
  isOptimized = false,
  totalRevenue,
  totalExpenses,
  netProfit,
  marginPct,
  formatCurrency,
  labels,
}) => {
  const isProfitable = netProfit > 0;

  return (
    <div
      className={`p-6 sm:p-7 rounded-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
        isOptimized
          ? 'bg-gradient-to-b from-[#0A1624] via-[#060C14] to-[#04060A] border border-[#00A3FF]/40 shadow-[0_10px_35px_rgba(0,163,255,0.15)]'
          : 'bg-[#05070A]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Corner Cyber Brackets */}
      <div
        className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${
          isOptimized ? 'border-[#00A3FF]' : 'border-slate-500/40'
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${
          isOptimized ? 'border-[#00A3FF]' : 'border-slate-500/40'
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${
          isOptimized ? 'border-[#00A3FF]' : 'border-slate-500/40'
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${
          isOptimized ? 'border-[#00A3FF]' : 'border-slate-500/40'
        }`}
      />

      {/* Ambient Glow */}
      {isOptimized && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isOptimized ? 'bg-[#00A3FF] animate-pulse' : 'bg-slate-500'
            }`}
          />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>

        {isOptimized ? (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[10px] font-mono font-bold text-[#00D2FF]">
            <Sparkles className="w-3 h-3" />
            <span>ARTRON OS</span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            STATUS QUO
          </span>
        )}
      </div>

      {/* Net Profit Big KPI */}
      <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5 relative z-10">
        <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
          <span>{labels.profit}</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isOptimized
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-700/50 text-slate-300'
            }`}
          >
            {labels.margin}: {marginPct}%
          </span>
        </div>
        <div
          className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight flex items-baseline gap-1 ${
            isOptimized
              ? 'text-[#00D2FF]'
              : isProfitable
              ? 'text-white'
              : 'text-rose-400'
          }`}
        >
          <span>{formatCurrency(netProfit)}</span>
          <span className="text-xs font-normal font-sans text-slate-400">/ თვე</span>
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-3 font-mono text-xs relative z-10">
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <span className="text-slate-400">{labels.revenue}</span>
          <span className="text-white font-semibold">{formatCurrency(totalRevenue)}</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <span className="text-slate-400">{labels.expenses}</span>
          <span className="text-rose-300/90 font-semibold">
            -{formatCurrency(totalExpenses)}
          </span>
        </div>
      </div>
    </div>
  );
};
