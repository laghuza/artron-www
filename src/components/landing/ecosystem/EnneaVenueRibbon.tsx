"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { EnneaVenue, EnneaStrings } from "./types";
import { soundEngine } from "./EnneaAudioEngine";
import { CreditCard } from "lucide-react";

interface EnneaVenueRibbonProps {
  venues: EnneaVenue[];
  selectedVenue: EnneaVenue | null;
  onSelectVenue: (venue: EnneaVenue) => void;
  onSelectPartnerTab?: () => void;
  activeTab?: "venues" | "partners";
  t?: EnneaStrings;
  locale?: string;
}

interface RibbonPartnerItem {
  id: string;
  name: string;
  category: string;
  sub: string;
  accent: string;
  badge?: string;
  icon: React.ReactNode;
}

/* ─── Drag-to-scroll hook for marquee containers ─── */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, hasMoved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      hasMoved: false,
    };
    el.setPointerCapture(e.pointerId);
    // Pause CSS animation while dragging
    el.style.animationPlayState = "paused";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !ref.current) return;
      const dx = e.clientX - dragState.current.startX;
      if (Math.abs(dx) > 3) dragState.current.hasMoved = true;
      ref.current.scrollLeft = dragState.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(false);
      if (ref.current) {
        ref.current.releasePointerCapture(e.pointerId);
        // Resume CSS animation
        ref.current.style.animationPlayState = "";
      }
    },
    []
  );

  return {
    ref,
    isDragging,
    hasMoved: () => dragState.current.hasMoved,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp },
  };
}

export const EnneaVenueRibbon: React.FC<EnneaVenueRibbonProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onSelectPartnerTab,
  activeTab = "venues",
  t,
  locale = "ka",
}) => {
  const isKa = locale === "ka";
  const isRu = locale === "ru";

  const partnerItems: RibbonPartnerItem[] = React.useMemo(() => {
    return [
      {
        id: "bog",
        name: "Bank of Georgia",
        category: isKa
          ? "სტრატეგიული ფინტექ პარტნიორი"
          : isRu
          ? "Стратегический финтех-партнер"
          : "Strategic FinTech Partner",
        sub: isKa
          ? "საქართველოს ბანკი · iPAY · Apple Pay · Google Pay · 0% განვადება"
          : isRu
          ? "Банк Грузии · iPAY · Apple Pay · Google Pay · 0% рассрочка"
          : "Bank of Georgia · iPAY · Apple Pay · Google Pay · 0% Installments",
        accent: "#FF5E00",
        badge: "PRIMARY iPAY",
        icon: (
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-[#FF5E00] to-[#FF8C00] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(255,94,0,0.4)]">
            <CreditCard className="w-2.5 h-2.5 text-white" />
          </div>
        ),
      },
    ];
  }, [isKa, isRu]);

  // Multiply items to create infinite uninterrupted marquee scroll
  const clientVenues = React.useMemo(() => venues.filter((v) => !v.isPartner), [venues]);
  const marqueeVenues = React.useMemo(() => {
    return [...clientVenues, ...clientVenues, ...clientVenues, ...clientVenues];
  }, [clientVenues]);

  const marqueePartners = React.useMemo(() => {
    return Array(10)
      .fill(partnerItems[0])
      .map((p, i) => ({ ...p, id: `bog-${i}` }));
  }, [partnerItems]);

  const venuesDrag = useDragScroll();
  const partnersDrag = useDragScroll();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-auto bg-[#0A0D12]/95 backdrop-blur-xl border-t border-white/[0.1] shadow-[0_-8px_32px_rgba(0,0,0,0.8)] py-2 sm:py-2.5 transition-all overflow-hidden select-none">
      {/* ── Outer Marquee Viewport with Soft Atmospheric Fog Fade ── */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_20px,rgba(0,0,0,0.65)_55px,black_100px,black_calc(100%-100px),rgba(0,0,0,0.65)_calc(100%-55px),rgba(0,0,0,0.15)_calc(100%-20px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_20px,rgba(0,0,0,0.65)_55px,black_100px,black_calc(100%-100px),rgba(0,0,0,0.65)_calc(100%-55px),rgba(0,0,0,0.15)_calc(100%-20px),transparent_100%)]">
        {/* Left atmospheric mist gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-[#0A0D12] via-[#0A0D12]/75 to-transparent pointer-events-none z-10" />
        
        {/* Right atmospheric mist gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-[#0A0D12] via-[#0A0D12]/75 to-transparent pointer-events-none z-10" />

        {/* ── MODE 1: CLIENT GYMS CONTINUOUS MARQUEE WITH DRAG ── */}
        {activeTab === "venues" ? (
          <div
            ref={venuesDrag.ref}
            className={`flex items-center animate-gym-marquee gap-2 sm:gap-2.5 px-3 ${
              venuesDrag.isDragging ? "cursor-grabbing [animation-play-state:paused]" : "cursor-grab"
            }`}
            style={{ touchAction: "pan-y" }}
            {...venuesDrag.handlers}
          >
            {marqueeVenues.map((venue, idx) => {
              const isSelected = selectedVenue?.id === venue.id;
              return (
                <button
                  key={`${venue.id}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    // Prevent selection if user was dragging
                    if (venuesDrag.hasMoved()) {
                      e.preventDefault();
                      return;
                    }
                    soundEngine.cue("click");
                    onSelectVenue(venue);
                  }}
                  className={`group flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#7FD4FF]/15 border-[#7FD4FF] shadow-[0_0_16px_rgba(127,212,255,0.35)] scale-[1.02]"
                      : "bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  {venue.logoSrc ? (
                    <img
                      src={venue.logoSrc}
                      alt={venue.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-white/20"
                      draggable={false}
                    />
                  ) : (
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125 bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]"
                    />
                  )}
                  <div className="flex flex-col text-left">
                    <span
                      className={`font-mono text-[11px] sm:text-xs font-bold leading-tight truncate max-w-[110px] sm:max-w-[130px] transition-colors ${
                        isSelected ? "text-white" : "text-[#EAF4FF] group-hover:text-white"
                      }`}
                    >
                      {venue.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#6E8DA0] leading-none mt-0.5 flex items-center gap-1">
                      <span>{venue.regionName || venue.city}{venue.regionCity && venue.regionCity !== venue.regionName ? `, ${venue.regionCity}` : ''}</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-semibold">LIVE</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* ── MODE 2: PARTNERS CONTINUOUS MARQUEE WITH DRAG ── */
          <div
            ref={partnersDrag.ref}
            className={`flex items-center animate-gym-marquee gap-2 sm:gap-2.5 px-3 ${
              partnersDrag.isDragging ? "cursor-grabbing [animation-play-state:paused]" : "cursor-grab"
            }`}
            style={{ touchAction: "pan-y" }}
            {...partnersDrag.handlers}
          >
            {marqueePartners.map((partner, idx) => {
              return (
                <button
                  key={`${partner.id}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    if (partnersDrag.hasMoved()) {
                      e.preventDefault();
                      return;
                    }
                    soundEngine.cue("click");
                    const bog = venues.find((v) => v.id === "bog");
                    if (bog) {
                      onSelectVenue(bog);
                    } else if (onSelectPartnerTab) {
                      onSelectPartnerTab();
                    }
                  }}
                  className="flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded-xl border bg-white/[0.04] border-white/10 hover:border-[#FF5E00]/60 hover:bg-[#FF5E00]/10 transition-all duration-200 cursor-pointer shrink-0 group text-left"
                >
                  {partner.icon}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-white leading-tight">
                        {partner.name}
                      </span>
                      {partner.badge && (
                        <span
                          className="font-mono text-[7.5px] uppercase px-1 py-0.2 rounded border font-semibold"
                          style={{
                            color: partner.accent,
                            borderColor: `${partner.accent}40`,
                            backgroundColor: `${partner.accent}15`,
                          }}
                        >
                          {partner.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-[#94A3B8] leading-none mt-0.5">
                      {partner.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
