'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Building2, Sparkles, Layers } from 'lucide-react';
import { gymClients, fintechPartners } from './partners/PartnerData';
import { GymClientCard } from './partners/GymClientCard';
import { PartnerCard } from './partners/PartnerCard';
import { PartnerNetworkRadar } from './partners/PartnerNetworkRadar';

export const PartnerEcosystem: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'fintech'>('all');

  // Multiplied items for seamless infinite wrapping during auto-scroll and manual dragging
  const marqueeGyms = [
    ...gymClients,
    ...gymClients,
    ...gymClients,
    ...gymClients,
    ...gymClients,
    ...gymClients,
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Smooth auto-scroll with slower speed, wrap-around logic, and IntersectionObserver pausing
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Slower, elegant, smooth motion (~0.55px per tick)
    const speed = 0.55;
    let isVisible = false;

    const step = () => {
      if (!isVisible) return;
      if (container) {
        const halfWidth = container.scrollWidth / 2;

        if (!isHoveredRef.current && !isDraggingRef.current) {
          container.scrollLeft += speed;
        }

        // Infinite wrap-around bounds
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = requestAnimationFrame(step);
        } else {
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
          }
        }
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [activeTab]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDraggingState(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = container.scrollLeft;
    try {
      container.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    const container = scrollRef.current;
    const dx = e.clientX - startXRef.current;
    const newScrollLeft = scrollLeftRef.current - dx;
    const halfWidth = container.scrollWidth / 2;

    if (newScrollLeft >= halfWidth) {
      scrollLeftRef.current -= halfWidth;
      container.scrollLeft = newScrollLeft - halfWidth;
    } else if (newScrollLeft <= 0) {
      scrollLeftRef.current += halfWidth;
      container.scrollLeft = newScrollLeft + halfWidth;
    } else {
      container.scrollLeft = newScrollLeft;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current && scrollRef.current) {
      try {
        scrollRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  return (
    <section id="partner-ecosystem" className="py-20 md:py-28 relative overflow-hidden bg-[#0B0F17] border-b border-white/5 studio-grain">
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/4 left-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00A3FF]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00ff87]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/25 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('partner_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('partner_title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('partner_subtitle')}
          </p>

          {/* Refined Modern Segmented Filter Tabs */}
          <div className="mt-8 inline-flex items-center justify-center p-1.5 bg-[#0F141C]/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] cursor-pointer flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-[#00A3FF] to-[#0077FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.35)] border border-[#00D2FF]/40'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t('partner_tab_all')}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-white/5 text-[#94A3B8]'
                }`}>
                  6
                </span>
              </button>

              <button
                onClick={() => setActiveTab('clients')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] cursor-pointer flex items-center gap-2 ${
                  activeTab === 'clients'
                    ? 'bg-gradient-to-r from-[#00A3FF] to-[#0077FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.35)] border border-[#00D2FF]/40'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t('partner_tab_clients')}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'clients' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  5
                </span>
              </button>

              <button
                onClick={() => setActiveTab('fintech')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] cursor-pointer flex items-center gap-2 ${
                  activeTab === 'fintech'
                    ? 'bg-gradient-to-r from-[#00A3FF] to-[#0077FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.35)] border border-[#00D2FF]/40'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t('partner_tab_fintech')}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeTab === 'fintech' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}>
                  1
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: CLIENT FITNESS CLUBS (Continuous Circular Marquee with Drag) */}
        {(activeTab === 'all' || activeTab === 'clients') && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00A3FF]/10 rounded-xl text-[#00A3FF] border border-[#00A3FF]/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white font-mono flex items-center gap-2">
                    {t('partner_tab_clients')}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      LIVE IN PRODUCTION
                    </span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {t('partner_clients_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Seamless Infinite Horizontal Carousel with Smooth Dragging */}
            <div
              ref={scrollRef}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative w-full overflow-x-hidden py-3 select-none [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)] transition-[cursor] ${
                isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="flex gap-5 w-max">
                {marqueeGyms.map((gym, idx) => (
                  <div key={`${gym.id}-${idx}`} className="w-[280px] sm:w-[310px] shrink-0">
                    <GymClientCard gym={gym} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: FINTECH & BILLING */}
        {(activeTab === 'all' || activeTab === 'fintech') && (
          <div className="pt-4">
            <div className="flex flex-col items-center text-center pb-6 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5E00]/10 border border-[#FF5E00]/25 text-xs font-mono font-bold text-[#FFA066] mb-3 tracking-wider uppercase shadow-[0_0_15px_rgba(255,94,0,0.15)]">
                <CreditCard className="w-3.5 h-3.5 text-[#FF5E00]" />
                <span>BOG CHECKOUT & iPAY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-wide uppercase text-white font-mono">
                {t('partner_fintech')}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mt-1.5 leading-relaxed">
                {t('partner_fintech_desc')}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                {fintechPartners.map((p) => (
                  <PartnerCard key={p.id} partner={p} />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* SECTION 3: NATIONWIDE COVERAGE & LIVE RADAR */}
        <div className="mt-12 sm:mt-16">
          <PartnerNetworkRadar />
        </div>
      </div>
    </section>
  );
};
