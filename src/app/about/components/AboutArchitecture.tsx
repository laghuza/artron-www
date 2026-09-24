'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VISION_NODES, MATRIX_RING_ORDER } from '../data/aboutVisionData';

interface AboutArchitectureProps {
  onActiveNodeChange?: (index: number) => void;
}

export const AboutArchitecture: React.FC<AboutArchitectureProps> = ({ onActiveNodeChange }) => {
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

  const activeData = activeNode >= 0 ? VISION_NODES[activeNode] : VISION_NODES[0];

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
          <span className="vision-mono text-amber-500 font-semibold text-sm">II.</span>
          <h2 className="text-[clamp(26px,3.6vw,52px)] font-light text-white tracking-tight leading-tight">
            არქიტექტურა: <em className="not-italic text-slate-400">9 კვანძი, ერთი სრული წესრიგი</em>
          </h2>
        </div>

        <p className="col-span-12 lg:col-span-7 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-300 vision-rv in">
          სპორტის მართვა კომპლექსური პროცესია, სადაც შეცდომის ადგილი არ არის. ARTRON არის 9 ურთიერთდაკავშირებული კვანძის ეკოსისტემა, რომელსაც ერთი ცენტრალური ციფრული ბირთვი ამუშავებს.
        </p>

        {/* Nodes List on Left & HUD on Right */}
        <div className="col-span-12 grid grid-cols-12 gap-x-6 sm:gap-x-10 relative">
          <ol className="col-span-12 lg:col-span-7 space-y-16 sm:space-y-28 my-10">
            {VISION_NODES.map((node, i) => {
              const isSelected = activeNode === i;
              const isCore = i === 8;

              return (
                <li
                  key={node.id}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  data-i={i}
                  className={`min-h-[50vh] sm:min-h-[65vh] flex flex-col justify-center gap-5 py-8 transition-opacity duration-700 ${
                    isSelected ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                  }`}
                >
                  <span
                    className={`vision-mono font-medium transition-colors duration-500 ${
                      isSelected ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    [ {node.id} // {node.code} ]
                  </span>

                  <h4
                    className={`text-[clamp(32px,4.5vw,72px)] font-extralight tracking-tight leading-none ${
                      isCore ? 'vision-metal font-mono text-[clamp(28px,3.8vw,56px)]' : 'text-white'
                    }`}
                  >
                    {node.title}
                  </h4>

                  {/* Kinetic Progress Bar */}
                  <div className="h-px w-full bg-slate-700/40 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-300 to-transparent transition-transform duration-1000 origin-left"
                      style={{ transform: isSelected ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </div>

                  <p className="text-[clamp(16px,1.3vw,19px)] leading-relaxed text-slate-300 max-w-2xl font-light">
                    {node.description}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Sticky Tactical HUD (Desktop) */}
          <aside className="hidden lg:flex col-span-5 sticky top-20 h-[80vh] flex-col justify-between py-12 px-8 pointer-events-none rounded-3xl border border-white/[0.08] bg-[#090A0F]/60 backdrop-blur-xl shadow-2xl relative my-auto">
            {/* Corner Markers */}
            <i className="absolute top-3 left-3 w-5 h-5 border-t border-l border-amber-500/70" />
            <i className="absolute top-3 right-3 w-5 h-5 border-t border-r border-amber-500/70" />
            <i className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-amber-500/70" />
            <i className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-amber-500/70" />

            <div className="flex justify-between items-center text-xs vision-mono">
              <span className="text-cyan-400 font-semibold">[ KINETIC CORE ]</span>
              <span className="text-slate-400">
                LINKED <b className="text-amber-400">{String(activeNode < 0 ? 0 : activeNode + 1).padStart(2, '0')}</b> / 09
              </span>
            </div>

            <div className="flex justify-between items-end gap-6 pt-12 border-t border-white/[0.08]">
              <div className="flex flex-col gap-2">
                <span className="vision-mono text-slate-400 text-[10px]">ACTIVE NODE</span>
                <span className="vision-mono text-white text-base tracking-wider font-semibold">
                  [ {activeData.id} // {activeData.code} ]
                </span>
                <span className="text-sm text-cyan-300 font-light">{activeData.title}</span>
              </div>

              {/* 3x3 Matrix Grid */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-black/40 border border-white/10">
                {MATRIX_RING_ORDER.map((idx) => {
                  const isNodeActive = activeNode === idx;
                  const isCore = idx === 8;

                  return (
                    <span
                      key={idx}
                      className={`w-8 h-8 rounded-md flex items-center justify-center vision-mono text-[10px] transition-all duration-500 border ${
                        isNodeActive
                          ? 'border-amber-400 text-amber-300 bg-amber-400/15 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                          : isCore
                          ? 'border-amber-700/60 text-amber-500/80 bg-amber-950/20'
                          : 'border-slate-800 text-slate-400 bg-slate-900/40'
                      }`}
                    >
                      {VISION_NODES[idx].id}
                    </span>
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
