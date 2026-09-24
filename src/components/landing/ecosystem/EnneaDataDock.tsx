"use client";

import React, { useMemo } from "react";
import { ChevronRight, ArrowLeft, X, Building2, Handshake } from "lucide-react";
import { EnneaVenue, EnneaRegion, EnneaStrings, HeroStat, ViewMode } from "./types";
import { soundEngine } from "./EnneaAudioEngine";
import { EnneaVenueFilterList } from "./EnneaVenueFilterList";
import { EnneaPartnerCard } from "./EnneaPartnerCard";
import { EnneaVenueDetail } from "./EnneaVenueDetail";

interface EnneaDataDockProps {
  viewMode: ViewMode;
  venues: EnneaVenue[];
  regions: EnneaRegion[];
  selectedRegion: string | null;
  selectedVenue: EnneaVenue | null;
  activeTab: "venues" | "partners";
  onTabChange: (tab: "venues" | "partners") => void;
  t: EnneaStrings;
  accent?: string;
  onSelectRegion: (id: string | null) => void;
  onSelectVenue: (venue: EnneaVenue | null) => void;
  onEnterGeorgia: () => void;
  onExitToGlobe: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const EnneaDataDock: React.FC<EnneaDataDockProps> = ({
  viewMode,
  venues,
  regions,
  selectedRegion,
  selectedVenue,
  activeTab,
  onTabChange,
  t,
  onSelectRegion,
  onSelectVenue,
  onEnterGeorgia,
  onExitToGlobe,
  isCollapsed,
  onToggleCollapse,
}) => {
  const isGlobe = viewMode === "GLOBE";
  const isDetail = viewMode === "GEORGIA_DETAIL";

  // Separate client venues from strategic partner objects
  const clientVenues = useMemo(() => venues.filter((v) => !v.isPartner), [venues]);
  const bogVenue = useMemo(() => venues.find((v) => v.id === "bog"), [venues]);

  // Filtered venues based on selected region
  const filteredVenues = useMemo(() => {
    if (!selectedRegion) return clientVenues;
    return clientVenues.filter((v) => v.regionId === selectedRegion);
  }, [clientVenues, selectedRegion]);

  // Sum total members for current venue scope
  const totalMembersStr = useMemo(() => {
    const sum = filteredVenues.reduce((acc, v) => {
      const num = parseInt(v.members.replace(/[^0-9]/g, ""), 10) || 0;
      return acc + num;
    }, 0);
    return `${sum.toLocaleString("en-US")}+`;
  }, [filteredVenues]);

  // Bottom stats
  const activeStats: HeroStat[] = useMemo(() => {
    if (selectedVenue) {
      return [
        { value: "IoT Sync", label: t.stats.integration },
        { value: "0.18s", label: t.stats.access },
        { value: "LIVE", label: t.stats.status },
      ];
    }
    if (activeTab === "partners") {
      return [
        { value: "BOG iPAY", label: t.stats.acquiring },
        { value: "1-Click", label: "Apple / G-Pay" },
        { value: "0%", label: t.stats.installments },
      ];
    }
    return [
      { value: String(regions.filter((r) => r.live).length), label: t.stats.hubs },
      { value: String(filteredVenues.length), label: t.stats.venues },
      { value: totalMembersStr, label: t.stats.members },
    ];
  }, [selectedVenue, activeTab, regions, filteredVenues.length, totalMembersStr, t]);

  // Collapsed rail view
  if (isCollapsed) {
    return (
      <div className="flex-none w-14 bg-[#0D1117] border-r border-white/10 flex flex-col items-center justify-between py-5 z-20 select-none">
        <span className="w-2 h-2 rounded-full bg-[#7FD4FF] shadow-[0_0_12px_#7FD4FF] animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.28em] text-[#8AA3B2] uppercase [writing-mode:vertical-rl]">
          {isGlobe ? t.breadcrumbWorld : selectedVenue ? selectedVenue.name : t.breadcrumbCountry}
        </span>
        <div className="flex flex-col gap-2 items-center">
          {!isGlobe && (
            <button
              type="button"
              onClick={() => {
                soundEngine.cue("exit");
                if (selectedVenue) onSelectVenue(null);
                else onExitToGlobe();
              }}
              title={t.backToWorld}
              className="w-10 h-10 flex items-center justify-center bg-[#7FD4FF]/15 border border-[#7FD4FF]/40 text-white hover:bg-[#7FD4FF]/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Expand Data Dock"
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-[#8AA3B2] hover:text-white hover:border-[#7FD4FF]/50 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-none w-full md:w-[380px] lg:w-[440px] bg-[#0D1117] border-r border-white/[0.07] flex flex-col justify-between z-20 select-none overflow-hidden">
      {/* ── Top Bar: Kicker + Breadcrumbs + Collapse ── */}
      <div className="flex flex-col gap-2.5 p-3.5 sm:p-4 border-b border-white/[0.07]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7FD4FF] shadow-[0_0_12px_2px_rgba(127,212,255,0.85)] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#6E8DA0] uppercase font-bold truncate">
              {t.kicker}
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse panel"
            className="w-7 h-7 flex items-center justify-center border border-white/10 text-[#6E8DA0] hover:text-white hover:border-[#7FD4FF]/40 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-[10px] uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={() => {
              soundEngine.cue("click");
              onSelectVenue(null);
              onSelectRegion(null);
              onExitToGlobe();
            }}
            className={`transition-colors hover:text-white ${
              isGlobe ? "text-[#7FD4FF] font-semibold" : "text-[#6E8DA0] cursor-pointer"
            }`}
          >
            [ {t.breadcrumbWorld} ]
          </button>

          {!isGlobe && (
            <>
              <span className="text-[#3A5464]">▸</span>
              <button
                type="button"
                onClick={() => {
                  soundEngine.cue("click");
                  onSelectVenue(null);
                  onSelectRegion(null);
                }}
                className={`transition-colors hover:text-white ${
                  !selectedRegion && !selectedVenue ? "text-[#7FD4FF] font-semibold" : "text-[#6E8DA0] cursor-pointer"
                }`}
              >
                [ {t.breadcrumbCountry} ]
              </button>
            </>
          )}

          {selectedVenue && (
            <>
              <span className="text-[#3A5464]">▸</span>
              <span className="text-[#7FD4FF] font-semibold truncate max-w-[140px]">
                [ {selectedVenue.name} ]
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto flex flex-col no-scrollbar">
        {/* Navigation Tabs & Context Switcher (Top of Dock) */}
        <div className="p-3 sm:p-4 border-b border-white/[0.07] flex flex-col gap-2.5">
          {selectedVenue ? (
            /* Selected Venue Header */
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <h1 className="text-lg font-bold text-[#F4FAFF] truncate font-mono">
                  {selectedVenue.name}
                </h1>
                <span className="text-xs text-[#8AA3B2] font-mono">
                  {selectedVenue.category} · {selectedVenue.city}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.cue("click");
                  onSelectVenue(null);
                }}
                className="px-3 py-1.5 border border-[#7FD4FF]/40 bg-[#7FD4FF]/10 hover:bg-[#7FD4FF]/20 text-[#7FD4FF] font-mono text-[11px] rounded-lg transition-all cursor-pointer shrink-0"
              >
                {t.backToList}
              </button>
            </div>
          ) : (
            <>
              {/* Primary Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.cue("click");
                    onTabChange("venues");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === "venues"
                      ? "bg-[#7FD4FF] text-[#0A0D12] shadow-[0_0_15px_rgba(127,212,255,0.4)]"
                      : "text-[#8AA3B2] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{t.venuesTab} ({clientVenues.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.cue("click");
                    onTabChange("partners");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === "partners"
                      ? "bg-[#FF5E00] text-white shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                      : "text-[#8AA3B2] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Handshake className="w-3.5 h-3.5" />
                  <span>{t.partnersTab}</span>
                </button>
              </div>

              {/* Context Action Button (Globe/Georgia Toggle) */}
              <button
                type="button"
                onClick={() => {
                  if (isDetail) {
                    soundEngine.cue("exit");
                    onExitToGlobe();
                  } else {
                    soundEngine.cue("enter");
                    onEnterGeorgia();
                  }
                }}
                className="flex items-center justify-between gap-3 px-3 py-2 border border-[#7FD4FF]/30 bg-[#7FD4FF]/[0.05] hover:bg-[#7FD4FF]/[0.12] hover:border-[#7FD4FF]/60 rounded-lg transition-all cursor-pointer group"
              >
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.14em] text-[#EAF4FF] uppercase">
                  {isDetail ? t.backToWorld : t.exploreGeorgia}
                </span>
                <span className="font-mono text-[12px] text-[#7FD4FF] transition-transform duration-200 group-hover:translate-x-0.5">
                  {isDetail ? "◎" : "→"}
                </span>
              </button>
            </>
          )}
        </div>

        {/* ── Active View Mode Content ── */}
        {selectedVenue ? (
          <EnneaVenueDetail venue={selectedVenue} t={t} />
        ) : activeTab === "venues" ? (
          <EnneaVenueFilterList
            venues={clientVenues}
            regions={regions}
            selectedRegion={selectedRegion}
            onSelectRegion={onSelectRegion}
            onSelectVenue={onSelectVenue}
            t={t}
          />
        ) : (
          <EnneaPartnerCard
            locale={t.breadcrumbCountry === "საქართველო" ? "ka" : t.breadcrumbCountry === "Грузия" ? "ru" : "en"}
            t={t}
            onFocusPartner={() => {
              if (bogVenue) {
                soundEngine.cue("click");
                onSelectVenue(bogVenue);
                if (isGlobe) onEnterGeorgia();
              }
            }}
          />
        )}
      </div>

      {/* ── Bottom Stats Grid ── */}
      <div className="p-4 sm:p-5 border-t border-white/[0.07] bg-[#0A0D12]/50">
        <dl className="grid grid-cols-3 gap-3">
          {activeStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 min-w-0">
              <dd className="text-[clamp(16px,1.5vw,22px)] font-semibold tabular-nums tracking-[-0.025em] text-[#F4FAFF] truncate">
                {s.value}
              </dd>
              <dt className="font-mono text-[9.5px] tracking-[0.12em] text-[#6E8DA0] uppercase truncate">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
