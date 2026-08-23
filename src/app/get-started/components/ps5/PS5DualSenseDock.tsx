'use client';

import React from 'react';

interface PS5DualSenseDockProps {
  onNext?: () => void;
  onBack?: () => void;
  onPlanToggle?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
}

export const PS5DualSenseDock: React.FC<PS5DualSenseDockProps> = ({
  onNext,
  onBack,
  onPlanToggle,
  isNextDisabled = false,
  nextLabel = 'შემდეგი ეტაპი',
  isSubmitting = false,
}) => {
  return (
    <div className="w-full py-3 px-4 sm:px-8 border-t border-white/[0.08] bg-[#050811]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 z-20 sticky bottom-0">
      {/* DualSense Controller Shortcuts Legend */}
      <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono text-slate-400">
        {/* Cross Symbol */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#00A3FF]/20 border border-[#00A3FF]/50 text-[#00E5FF] font-bold flex items-center justify-center text-[10px] shadow-[0_0_8px_rgba(0,163,255,0.3)]">
            ✕
          </span>
          <span className="text-slate-300">Enter = დადასტურება</span>
        </div>

        {/* Circle Symbol */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold flex items-center justify-center text-[10px]">
            ◯
          </span>
          <span className="text-slate-300">Esc = უკან</span>
        </div>

        {/* Square Symbol */}
        {onPlanToggle && (
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-300 font-bold flex items-center justify-center text-[10px]">
              ◼
            </span>
            <span className="text-slate-300">Space = პაკეტი</span>
          </div>
        )}

        {/* Triangle Symbol */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-400/20 border border-emerald-400/50 text-emerald-300 font-bold flex items-center justify-center text-[10px]">
            ▲
          </span>
          <span className="text-slate-400">Edge IoT OS v4.2</span>
        </div>
      </div>

      {/* Action Trigger Buttons */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-300 text-[10px] flex items-center justify-center font-bold">
              ◯
            </span>
            <span>უკან</span>
          </button>
        )}

        {onNext && (
          <button
            type="button"
            disabled={isNextDisabled || isSubmitting}
            onClick={onNext}
            className={`px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
              !isNextDisabled && !isSubmitting
                ? 'bg-gradient-to-r from-[#00A3FF] via-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_35px_rgba(0,163,255,0.7)] hover:scale-[1.02] cursor-pointer'
                : 'bg-white/[0.04] text-white/30 border border-white/[0.06] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>მუშავდება...</span>
              </>
            ) : (
              <>
                <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-bold">
                  ✕
                </span>
                <span>{nextLabel}</span>
                <span>→</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
