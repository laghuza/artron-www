"use client";

import React from "react";
import { Volume2, VolumeX, Plus, Minus, RotateCcw, Crosshair } from "lucide-react";
import { EnneaRegion, EnneaVenue, EnneaStrings, ViewMode } from "./types";
import { soundEngine } from "./EnneaAudioEngine";

interface EnneaCanvasOverlaysProps {
  badgeRef: React.RefObject<HTMLDivElement | null>;
  pinLabelRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  regionLabelRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  regions: EnneaRegion[];
  venues: EnneaVenue[];
  selectedVenue: EnneaVenue | null;
  t: EnneaStrings;
  soundOn: boolean;
  viewMode: ViewMode;
  mapStatus: "IDLE" | "LOADING" | "READY" | "ERROR";
  activeCore: string | null;
  onEnterGeorgia: () => void;
  onSelectVenue: (venue: EnneaVenue | null) => void;
  onToggleSound: () => void;
  onZoom: (factor: number) => void;
  onReset: () => void;
}

export const EnneaCanvasOverlays: React.FC<EnneaCanvasOverlaysProps> = ({
  badgeRef,
  pinLabelRefs,
  regionLabelRefs,
  regions,
  venues,
  selectedVenue,
  t,
  soundOn,
  viewMode,
  mapStatus,
  activeCore,
  onEnterGeorgia,
  onSelectVenue,
  onToggleSound,
  onZoom,
  onReset,
}) => {
  return (
    <>
      {/* Georgia Beacon Leader Badge (Globe stage) */}
      <div
        ref={badgeRef}
        className="absolute z-[6] h-0 w-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ left: "var(--bx, 50%)", top: "var(--by, 50%)" }}
      >
        <span
          className="absolute left-0 top-0 h-px w-[104px] origin-left bg-gradient-to-r from-[#D4AF37]/90 via-[#FFE89E]/65 to-[#A87B41]/25 shadow-[0_0_8px_rgba(212,175,55,0.45)]"
          style={{ transform: "rotate(var(--brot, -45deg))" }}
        />
        <div
          className="absolute py-2.5"
          style={{
            left: "var(--blx, 74px)",
            top: "var(--bty, -74px)",
            transform: "translate(var(--bsx, 0%), var(--bsy, -100%))",
          }}
        >
          <div className="gold-rim-beacon-card flex flex-col gap-1.5 whitespace-nowrap px-3.5 py-2.5">
            <span className="font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#F5DE88]">
              {t.badgeTitle}
            </span>
            <span className="font-mono text-[9.5px] tabular-nums tracking-[0.13em] text-[#A8B7C7]">
              {t.badgeCoords}
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.cue("enter");
                onEnterGeorgia();
              }}
              className="gold-rim-beacon-btn pointer-events-auto mt-1 px-3 py-1.5 text-[#F5DE88] hover:text-white font-mono text-[10.5px] font-bold tracking-wide transition-all cursor-pointer text-center"
            >
              {t.exploreGeorgia}
            </button>
          </div>
        </div>
      </div>

      {/* Region Name Chips (Map stage) */}
      {regions
        .filter((r) => r.live)
        .map((r) => (
          <div
            key={r.id}
            ref={(el) => {
              regionLabelRefs.current.set(r.id, el);
            }}
            className="pointer-events-none absolute left-0 top-0 z-[9] opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="translate-y-6 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-[#0D1117]/60 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] text-[#CFE6F2] uppercase backdrop-blur-sm">
              {r.name}
            </div>
          </div>
        ))}

      {/* Floating Venue Pin Labels (Map stage) */}
      {venues.map((v) => {
        const isSelected = selectedVenue?.id === v.id;
        if (selectedVenue && !isSelected) return null;
        const sibs = venues.filter((x) => x.regionId === v.regionId);
        const fan = 14 + Math.max(0, sibs.indexOf(v)) * 50;
        return (
          <div
            key={v.id}
            ref={(el) => {
              pinLabelRefs.current.set(v.id, el);
            }}
            className="pointer-events-none absolute left-0 top-0 z-[9] opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <button
              type="button"
              onClick={() => {
                soundEngine.cue("click");
                onSelectVenue(isSelected ? null : v);
              }}
              className="pointer-events-auto cursor-pointer whitespace-nowrap border bg-[#0D1117]/80 px-2.5 py-1.5 text-left backdrop-blur-md transition-colors duration-200"
              style={{
                transform: `translate(12px, calc(-100% - ${fan}px))`,
                borderColor: isSelected ? v.accent : "rgba(255,255,255,0.12)",
                boxShadow: isSelected ? `0 0 22px -6px ${v.accent}` : "0 10px 26px rgba(0,0,0,0.45)",
              }}
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.accent }} />
                <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-[#EAF4FF]">{v.name}</span>
              </span>
              <span className="mt-0.5 block font-mono text-[9px] tabular-nums tracking-[0.14em] text-[#7FA6BA]">
                LIVE · {v.regionCity || v.city}
              </span>
            </button>
          </div>
        );
      })}

      {/* Glass Top-Right Controls (Zoom, Reset, Sound) */}
      <div className="absolute right-3 sm:right-5 top-16 md:top-5 z-[15] flex flex-col items-end gap-2.5">
        <div className="flex flex-col gap-px border border-white/[0.08] bg-white/[0.07] backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={() => onZoom(0.85)}
            aria-label={t.zoomIn}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onZoom(1.18)}
            aria-label={t.zoomOut}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[15px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onReset}
            aria-label={t.resetView}
            className="flex h-10 w-10 items-center justify-center bg-[#0D1117]/80 font-mono text-[14px] text-[#A9C6D6] transition-colors hover:bg-[#7FD4FF]/15 hover:text-[#F4FAFF] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`px-2.5 py-1.5 rounded-none border flex items-center gap-2 font-mono text-[9px] tracking-wider transition-all cursor-pointer backdrop-blur-xl shadow-lg ${
            soundOn
              ? "bg-[#7FD4FF]/15 border-[#7FD4FF]/40 text-[#7FD4FF] shadow-[0_0_15px_rgba(127,212,255,0.2)]"
              : "bg-[#0D1117]/80 border-white/10 text-[#8AA3B2] hover:text-white"
          }`}
        >
          {soundOn ? <Volume2 className="w-3 h-3 text-[#7FD4FF]" /> : <VolumeX className="w-3 h-3" />}
          <span>{soundOn ? t.soundOn : t.soundOff}</span>
        </button>
      </div>

      {/* Bottom Readout Hint */}
      <span className="pointer-events-none absolute bottom-4 right-5 z-[7] flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#4A6A7C] bg-[#0D1117]/70 px-2.5 py-1 border border-white/5 backdrop-blur-sm">
        <Crosshair className="w-3 h-3 text-[#7FD4FF]" />
        {viewMode === "GEORGIA_DETAIL"
          ? mapStatus === "READY"
            ? `${t.venuesLabel} · ${venues.length}`
            : mapStatus === "ERROR"
            ? t.mapError
            : t.loadingMap
          : activeCore
          ? `${activeCore} ISOLATED`
          : t.hint}
      </span>
    </>
  );
};
