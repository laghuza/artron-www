import React from 'react';

export const SectionSkeleton: React.FC<{ minHeight?: string; label?: string }> = ({
  minHeight = 'min-h-[480px]',
  label = 'ARTRON CORE LOADING...',
}) => (
  <div
    className={`w-full ${minHeight} flex flex-col items-center justify-center relative overflow-hidden bg-[#080B10]/60 border-y border-white/[0.03]`}
    aria-busy="true"
    aria-label="Loading section"
  >
    <div className="w-8 h-8 rounded-full border-2 border-[#00A3FF]/20 border-t-[#00A3FF] animate-spin mb-3" />
    <span className="text-[10px] font-mono tracking-widest text-[#00A3FF]/70 uppercase animate-pulse">
      {label}
    </span>
  </div>
);
