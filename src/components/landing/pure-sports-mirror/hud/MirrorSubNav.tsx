'use client';

import React from 'react';
import { MirrorModule } from '../data/mirrorDataTypes';

interface MirrorSubNavProps {
  modules: MirrorModule[];
  activeModuleIndex: number;
  accentColor: string;
  onSelectModule: (index: number) => void;
  onNextModule: () => void;
}

export const MirrorSubNav: React.FC<MirrorSubNavProps> = ({
  modules,
  activeModuleIndex,
  accentColor,
  onSelectModule,
  onNextModule,
}) => {
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const el = itemRefs.current[activeModuleIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeModuleIndex]);

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-full">
      {/* 1. Progress Ticks & Counter */}
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex gap-1 items-center">
          {modules.map((m, i) => {
            const isActive = i === activeModuleIndex;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(i)}
                aria-label={m.name}
                className="h-1 p-0 border-none rounded-full cursor-pointer transition-all duration-300"
                style={{
                  width: isActive ? '32px' : '14px',
                  backgroundColor: isActive ? accentColor : '#eaf2f8',
                  opacity: isActive ? 1 : 0.25,
                }}
              />
            );
          })}
        </div>
        <span className="font-mono text-[9px] tracking-widest text-slate-400 font-tabular">
          {String(activeModuleIndex + 1).padStart(2, '0')} / {String(modules.length).padStart(2, '0')} · ← →
        </span>
      </div>

      {/* 2. Sub-module buttons & NEXT button */}
      <div className="flex items-center gap-1.5 sm:gap-2 w-full max-w-full overflow-x-auto scrollbar-none py-1 scroll-smooth">
        {modules.map((m, i) => {
          const isActive = i === activeModuleIndex;
          const isNext = i === (activeModuleIndex + 1) % modules.length;
          return (
            <button
              key={m.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSelectModule(i)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full cursor-pointer text-[11px] sm:text-xs font-medium tracking-tight backdrop-blur-md transition-all duration-300 whitespace-nowrap flex-shrink-0 select-none ${
                isActive
                  ? 'text-[#050811] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                  : 'bg-white/[0.05] text-slate-200 border border-white/10 hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-0.5'
              }`}
              style={{
                backgroundColor: isActive ? accentColor : undefined,
                borderColor: isActive ? accentColor : undefined,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300 flex-shrink-0"
                style={{
                  backgroundColor: isActive
                    ? 'rgba(5,8,17,0.7)'
                    : isNext
                    ? accentColor
                    : 'rgba(255,255,255,0.35)',
                }}
              />
              {m.name}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onNextModule}
          aria-label="Next module"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer font-mono text-[9.5px] tracking-widest bg-white/[0.04] border border-dashed border-white/20 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/40 active:scale-95 whitespace-nowrap flex-shrink-0 select-none"
          style={{ color: accentColor }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
};
