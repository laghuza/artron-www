'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';
import { SECTION_NODES } from './elevatorSections';
import { ElevatorFlyoutDrawer } from './ElevatorFlyoutDrawer';
import { OmnichannelCluster } from './OmnichannelCluster';
import { ChevronUp, ChevronDown, Layers, ExternalLink } from 'lucide-react';

// Reusable Left Glass Tooltip
const LeftGlassTooltip: React.FC<{ isVisible: boolean; children: React.ReactNode }> = ({ isVisible, children }) => (
  <div
    role="tooltip"
    className={`absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#080C14]/95 border border-[#00E5FF]/30 text-white text-xs font-semibold whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-200 pointer-events-none z-50 flex items-center gap-1.5 ${
      isVisible ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'
    }`}
  >
    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#00E5FF]/30" />
    {children}
  </div>
);

export const KineticElevatorDock: React.FC = () => {
  const { locale } = useLanguage();
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isHoveredDock, setIsHoveredDock] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const scrollDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const lang = (locale === 'ka' || locale === 'en' || locale === 'ru') ? locale : 'ka';

  const playTactileFeedback = useCallback(() => {
    audioManager.playHapticClick();
    if (typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const now = ctx.currentTime;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(840, now);
          osc.frequency.exponentialRampToValueAtTime(320, now + 0.012);
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.015);
        }
      } catch {}
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
    setScrollProgress(progress);

    const firstSection = document.getElementById(SECTION_NODES[0].id);
    const triggerOffset = firstSection
      ? Math.max(firstSection.offsetTop - 320, 250)
      : 350;
    setIsVisible(scrollY >= triggerOffset);

    setIsScrolling(true);
    if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
    scrollDebounceTimer.current = setTimeout(() => setIsScrolling(false), 450);

    const scrollPos = scrollY + 280;
    for (let i = SECTION_NODES.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTION_NODES[i].id);
      if (el && scrollPos >= el.offsetTop) {
        setActiveNodeIndex(i);
        return;
      }
    }
    setActiveNodeIndex(0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    playTactileFeedback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    playTactileFeedback();
    const target = document.getElementById('booking-engine') || document.getElementById('saas-gateway-cta');
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  const scrollToNode = (id: string, index: number) => {
    playTactileFeedback();
    setActiveNodeIndex(index);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  const handleAiTrigger = () => {
    playTactileFeedback();
    const currentNode = SECTION_NODES[activeNodeIndex] || SECTION_NODES[0];
    window.dispatchEvent(
      new CustomEvent('artron-open-chatbot', {
        detail: { prompt: currentNode.aiPrompt[lang], section: currentNode.id },
      })
    );
  };

  return (
    <>
      {/* ── UNIFIED RIGHT-HAND KINETIC HUD & OMNICHANNEL DOCK (≥ 768px) ── */}
      <aside
        aria-label="Unified Kinetic Navigation HUD"
        onMouseEnter={() => setIsHoveredDock(true)}
        onMouseLeave={() => setIsHoveredDock(false)}
        className={`fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center transition-all duration-300 will-change-transform ${
          isVisible
            ? 'translate-x-0 pointer-events-auto opacity-100 visible'
            : 'translate-x-12 pointer-events-none opacity-0 invisible'
        } ${isVisible && isScrolling && !isHoveredDock ? '!opacity-40' : ''}`}
      >
        <div className="relative flex flex-col items-center bg-[#080C14]/85 backdrop-blur-2xl border border-white/10 hover:border-[#00E5FF]/40 py-3.5 px-2 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(0,229,255,0.15)] transition-all duration-300">
          
          {/* Quick Jump Top (▲) */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => { setHoveredNode('scroll-top'); playTactileFeedback(); }}
            onMouseLeave={() => setHoveredNode(null)}
            className="relative w-8 h-8 mb-2 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/15 transition-all focus:outline-none group"
            title={lang === 'ka' ? 'მწვერვალზე ასვლა' : 'Scroll To Top'}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <LeftGlassTooltip isVisible={hoveredNode === 'scroll-top'}>
              <span className="text-[#00E5FF]">▲</span>
              <span>{lang === 'ka' ? 'მწვერვალზე ასვლა' : lang === 'ru' ? 'В самый верх' : 'Scroll To Top'}</span>
            </LeftGlassTooltip>
          </button>

          {/* Kinetic Elevator Cable Rail */}
          <div className="relative flex flex-col items-center my-1 py-1">
            <div className="absolute top-3 bottom-3 w-[1.5px] bg-white/10 -z-10" />
            <div
              className="absolute top-3 w-[1.5px] bg-gradient-to-b from-[#00A3FF] to-[#00E5FF] shadow-[0_0_8px_#00E5FF] -z-10 transition-all duration-150"
              style={{ height: `${Math.max(scrollProgress * 100, 5)}%`, maxHeight: 'calc(100% - 24px)' }}
            />

            {/* 5 Section Nodes with Floating Glow Capsule */}
            <nav className="flex flex-col items-center gap-2.5">
              {SECTION_NODES.map((node, i) => {
                const isActive = activeNodeIndex === i;
                const isHovered = hoveredNode === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => scrollToNode(node.id, i)}
                    onMouseEnter={() => { setHoveredNode(node.id); playTactileFeedback(); }}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`relative w-8 h-8 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 focus:outline-none ${
                      isActive ? 'text-[#00E5FF] scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    aria-label={node.label[lang]}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeElevatorCapsule"
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        className="absolute inset-0 bg-[#00A3FF]/20 border border-[#00E5FF] rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] pointer-events-none"
                      />
                    )}

                    <span className="relative z-10">{node.index}</span>

                    <LeftGlassTooltip isVisible={isHovered}>
                      <span className={isActive ? 'text-[#00E5FF]' : 'text-slate-300'}>
                        {node.label[lang]}
                      </span>
                    </LeftGlassTooltip>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="w-6 h-[1px] bg-white/10 my-2" />

          {/* CRM Sport OS Modules Drawer Trigger [OS] */}
          <button
            onClick={() => {
              playTactileFeedback();
              setIsDrawerOpen(!isDrawerOpen);
            }}
            onMouseEnter={() => { setHoveredNode('os-trigger'); playTactileFeedback(); }}
            onMouseLeave={() => setHoveredNode(null)}
            className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none ${
              isDrawerOpen
                ? 'bg-[#00E5FF] text-[#080C14] shadow-[0_0_16px_#00E5FF]'
                : 'text-slate-300 hover:text-[#00E5FF] hover:bg-[#00E5FF]/15 border border-white/10 hover:border-[#00E5FF]/30'
            }`}
            title="ARTRON Sport OS Modules"
            aria-label="Toggle Sport OS Modules"
          >
            <Layers className="w-4 h-4" />
            <LeftGlassTooltip isVisible={hoveredNode === 'os-trigger'}>
              <span className="text-[#00E5FF] font-mono font-bold">[OS]</span>
              <span>{lang === 'ka' ? 'CRM თავების Drawer' : lang === 'ru' ? 'Модули Sport OS' : 'Sport OS Modules'}</span>
            </LeftGlassTooltip>
          </button>

          {/* ARTRON AI Co-Pilot [AI] (Brand Cyan Ennea Core) */}
          <button
            onClick={handleAiTrigger}
            onMouseEnter={() => { setHoveredNode('ai-trigger'); playTactileFeedback(); }}
            onMouseLeave={() => setHoveredNode(null)}
            className="relative w-8 h-8 mt-2 rounded-xl flex items-center justify-center bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_16px_rgba(0,229,255,0.4)] transition-all focus:outline-none group"
            title="ARTRON AI Co-Pilot"
            aria-label="Open Contextual AI Assistant"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#00E5FF]/50 animate-ping opacity-40 pointer-events-none" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00E5FF] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.5" fill="#00E5FF" fillOpacity="0.4" />
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round" />
                <path d="m4.93 4.93 2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12" strokeLinecap="round" strokeOpacity="0.6" />
              </svg>
            </div>
            <LeftGlassTooltip isVisible={hoveredNode === 'ai-trigger'}>
              <span className="text-[#00E5FF] font-mono font-bold">[AI]</span>
              <span>{lang === 'ka' ? 'ARTRON AI Co-Pilot' : 'Contextual AI Co-Pilot'}</span>
            </LeftGlassTooltip>
          </button>

          {/* Omnichannel Quick Contact Cluster [💬] */}
          <OmnichannelCluster
            lang={lang}
            playTactileFeedback={playTactileFeedback}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
          />

          {/* Quick Jump Bottom (▼) */}
          <button
            onClick={scrollToBottom}
            onMouseEnter={() => { setHoveredNode('scroll-bottom'); playTactileFeedback(); }}
            onMouseLeave={() => setHoveredNode(null)}
            className="w-8 h-8 mt-2 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/15 transition-all focus:outline-none group"
            title={lang === 'ka' ? 'დემო ჯავშანი' : 'Book Demo'}
            aria-label="Scroll to booking demo"
          >
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <LeftGlassTooltip isVisible={hoveredNode === 'scroll-bottom'}>
              <span className="text-[#00E5FF]">▼</span>
              <span>{lang === 'ka' ? 'დემო ჯავშანზე ჩასვლა' : 'Book Demo Presentation'}</span>
            </LeftGlassTooltip>
          </button>

          <div className="w-6 h-[1px] bg-white/10 my-2" />

          {/* ARTRON Cloud Login [↗] */}
          <a
            href="/sports-os"
            onMouseEnter={() => { setHoveredNode('cloud-login'); playTactileFeedback(); }}
            onMouseLeave={() => setHoveredNode(null)}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all focus:outline-none group"
            title="ARTRON Cloud Login"
            aria-label="Artron Cloud Login"
          >
            <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <LeftGlassTooltip isVisible={hoveredNode === 'cloud-login'}>
              <span className="text-[#00E5FF] font-mono">[↗]</span>
              <span>ARTRON Cloud Login</span>
            </LeftGlassTooltip>
          </a>
        </div>
      </aside>

      {/* ── MOBILE KINETIC BOTTOM DOCK (< 768px) ── */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-2 px-3 py-2 rounded-2xl bg-[#080C14]/90 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 translate-y-6 pointer-events-none invisible'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 active:text-[#00E5FF]"
          aria-label="Top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <span className="font-mono text-xs font-bold text-[#00E5FF] px-2 py-1 rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/30">
          {SECTION_NODES[activeNodeIndex]?.index || '01'}/05
        </span>

        <button
          onClick={() => {
            playTactileFeedback();
            setIsDrawerOpen(!isDrawerOpen);
          }}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all ${
            isDrawerOpen ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-slate-200 border border-white/10'
          }`}
          aria-label="OS Modules"
        >
          <Layers className="w-3.5 h-3.5" /> OS
        </button>

        <button
          onClick={handleAiTrigger}
          className="px-2.5 py-1 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold flex items-center gap-1"
          aria-label="AI Assistant"
        >
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" /> AI
        </button>

        <button
          onClick={scrollToBottom}
          className="px-2.5 py-1 rounded-xl bg-[#00A3FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-semibold"
        >
          {lang === 'ka' ? 'დემო' : lang === 'ru' ? 'Демо' : 'Demo'}
        </button>
      </div>

      {/* Flyout Drawer for Sport OS Submodules (slides in from the right) */}
      <ElevatorFlyoutDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
