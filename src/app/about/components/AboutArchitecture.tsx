'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getAboutVisionData, MATRIX_RING_ORDER } from '../data/aboutVisionData';

interface AboutArchitectureProps {
  onActiveNodeChange?: (index: number) => void;
}

export const AboutArchitecture: React.FC<AboutArchitectureProps> = ({ onActiveNodeChange }) => {
  const { locale } = useLanguage();
  const { architecture, nodes } = useMemo(() => getAboutVisionData(locale), [locale]);

  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const sec = sectionRef.current;
      if (!sec) return;

      const secRect = sec.getBoundingClientRect();
      if (secRect.top < vh * 0.7 && secRect.bottom > vh * 0.3) {
        let bestDistance = 1e9;
        let bestIndex = 0;

        nodeRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - vh / 2);
          if (dist < bestDistance) {
            bestDistance = dist;
            bestIndex = idx;
          }
        });

        setActiveNode(bestIndex);
        onActiveNodeChange?.(bestIndex);
      } else if (secRect.top >= vh * 0.7) {
        setActiveNode(-1);
        onActiveNodeChange?.(-1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onActiveNodeChange]);

  const scrollToNode = (idx: number) => {
    const el = nodeRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeData = activeNode >= 0 ? nodes[activeNode] : nodes[0];

  return (
    <section id="s2" ref={sectionRef} data-screen-label="02 Architecture" className="relative z-10 pt-24 sm:pt-36">
      <div className="vision-grid gap-y-12">
        <div className="vision-divider">
          <div className="vision-rule" />
          <i />
          <div className="vision-rule" />
        </div>

        {/* Chapter Header */}
        <div className="col-span-full flex items-baseline gap-4 sm:gap-6 flex-wrap vision-rv in">
          <span className="vision-mono text-amber-500 font-semibold text-sm">{architecture.chapterNum}</span>
          <h2 className="text-[clamp(26px,3.6vw,52px)] font-light text-white tracking-tight leading-tight">
            {architecture.title}<em className="not-italic text-slate-400">{architecture.titleEm}</em>
          </h2>
        </div>

        <p className="col-span-12 lg:col-span-7 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-300 vision-rv in">
          {architecture.description}
        </p>

        {/* Nodes List on Left & Sticky HUD on Right */}
        <div className="col-span-12 grid grid-cols-12 gap-x-6 sm:gap-x-10 relative pb-32 sm:pb-48">
          <ol className="col-span-12 lg:col-span-7 space-y-16 sm:space-y-28 my-10">
            {nodes.map((node, i) => {
              const isSelected = activeNode === i;
              const isCore = i === 8;

              return (
                <li
                  key={node.id}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  data-i={i}
                  className={`min-h-[78vh] flex flex-col justify-center gap-[22px] py-10 transition-opacity duration-700 ${
                    isSelected ? 'opacity-100' : 'opacity-28 hover:opacity-60'
                  }`}
                >
                  <span
                    className={`vision-mono text-[13px] tracking-[0.18em] font-medium transition-colors duration-500 ${
                      isSelected ? 'text-[#D4AF37]' : 'text-[#94A3B8]'
                    }`}
                  >
                    [ {node.id} // {node.code} ]
                  </span>

                  <h4
                    className={`text-[clamp(40px,5vw,84px)] font-[200] tracking-[-0.01em] leading-none ${
                      isCore ? 'vision-metal font-mono font-[300] tracking-[0.04em] text-[clamp(34px,4vw,64px)]' : 'text-white'
                    }`}
                  >
                    {node.title}
                  </h4>

                  {/* Kinetic Progress Bar */}
                  <div className="h-px w-full bg-slate-400/[0.14] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#CD7F32] via-[#D4AF37] to-transparent transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] origin-left"
                      style={{ transform: isSelected ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </div>

                  <p className="text-[clamp(17px,1.3vw,20px)] leading-[1.75] text-[#94A3B8] max-w-[34em] font-[300]">
                    {node.description}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Pure HUD Overlay (Desktop) - Sticky alongside all 9 nodes */}
          <aside className="hidden lg:flex col-span-5 self-start sticky top-0 h-screen flex-col justify-between pt-24 pb-14 pointer-events-none relative z-10">
            {/* Reticle Target Frame around Kinetic Core */}
            <div className="absolute inset-[18%_4%_30%_4%] pointer-events-none">
              <i className="absolute top-0 left-0 w-[22px] h-[22px] border-t border-l border-[#CD7F32]/70" />
              <i className="absolute top-0 right-0 w-[22px] h-[22px] border-t border-r border-[#CD7F32]/70" />
              <i className="absolute bottom-0 left-0 w-[22px] h-[22px] border-b border-l border-[#CD7F32]/70" />
              <i className="absolute bottom-0 right-0 w-[22px] h-[22px] border-b border-r border-[#CD7F32]/70" />
            </div>

            {/* Top Row: Core Tag & Linked Node Counter */}
            <div className="flex justify-between items-center text-[11px] vision-mono tracking-[0.14em]">
              <span className="text-[#94A3B8] font-normal">{architecture.kineticCore}</span>
              <span className="text-[#94A3B8]">
                {architecture.linked} <b className="text-[#D4AF37] font-normal">{String(activeNode < 0 ? 0 : activeNode + 1).padStart(2, '0')}</b> / 09
              </span>
            </div>

            {/* Bottom Row: Active Node Stamp & 3x3 Ring Matrix */}
            <div className="flex justify-between items-end gap-6">
              <div className="flex flex-col gap-2.5">
                <span className="vision-mono text-[#94A3B8] text-[11px] tracking-[0.14em]">{architecture.activeNode}</span>
                <span className="vision-mono text-[clamp(14px,1.3vw,18px)] tracking-[0.14em] text-[#F8FAFC]">
                  [ {activeData.id} // {activeData.code} ]
                </span>
              </div>

              {/* 3x3 Matrix Grid (Clickable Node Selectors) */}
              <div className="grid grid-cols-3 gap-1 pointer-events-auto">
                {MATRIX_RING_ORDER.map((idx) => {
                  const isNodeActive = activeNode === idx;
                  const isCore = idx === 8;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToNode(idx)}
                      title={`${architecture.jumpTo}: ${nodes[idx].id} - ${nodes[idx].title}`}
                      className={`w-[30px] h-[30px] flex items-center justify-center font-mono text-[9px] transition-all duration-300 border cursor-pointer ${
                        isNodeActive
                          ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/[0.12] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                          : isCore
                          ? 'border-[#CD7F32]/55 text-[#94A3B8] hover:border-[#CD7F32] hover:text-[#D4AF37]'
                          : 'border-slate-400/20 text-[#64748B] hover:border-slate-400/50 hover:text-slate-200'
                      }`}
                    >
                      {nodes[idx].id}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
