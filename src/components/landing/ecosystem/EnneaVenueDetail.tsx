"use client";

import React, { useMemo } from "react";
import { ExternalLink, Clock } from "lucide-react";
import { EnneaVenue, EnneaStrings } from "./types";
import { soundEngine } from "./EnneaAudioEngine";

interface EnneaVenueDetailProps {
  venue: EnneaVenue;
  t: EnneaStrings;
}

export const EnneaVenueDetail: React.FC<EnneaVenueDetailProps> = ({ venue, t }) => {
  // Determine current live open/closed status in Georgia (UTC+4 / Asia/Tbilisi)
  const { isOpen, statusDetail, isSunday } = useMemo(() => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Tbilisi",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        weekday: "short",
      });
      const parts = formatter.formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);
      const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      const currentDecimalHour = hour + minute / 60;
      const weekdayStr = parts.find((p) => p.type === "weekday")?.value || "Mon";
      const sunday = weekdayStr === "Sun";

      const wh = venue.workingHours;
      if (!wh) {
        const open = currentDecimalHour >= 8.5 && currentDecimalHour < 22;
        return {
          isOpen: open,
          statusDetail: open ? `${t.closesAt || "იკეტება"} 22:00` : `${t.opensAt || "გაიღება"} 08:30`,
          isSunday: sunday,
        };
      }

      if (sunday) {
        if (wh.isSunClosed) {
          return {
            isOpen: false,
            statusDetail: t.closedLabel || "დასვენება",
            isSunday: true,
          };
        }
        const open = currentDecimalHour >= wh.weekendOpen && currentDecimalHour < wh.weekendClose;
        const closeH = Math.floor(wh.weekendClose).toString().padStart(2, "0");
        const closeM = Math.round((wh.weekendClose % 1) * 60).toString().padStart(2, "0");
        const openH = Math.floor(wh.weekendOpen).toString().padStart(2, "0");
        const openM = Math.round((wh.weekendOpen % 1) * 60).toString().padStart(2, "0");
        return {
          isOpen: open,
          statusDetail: open ? `${t.closesAt || "იკეტება"} ${closeH}:${closeM}` : `${t.opensAt || "გაიღება"} ${openH}:${openM}`,
          isSunday: true,
        };
      }

      const open = currentDecimalHour >= wh.weekdayOpen && currentDecimalHour < wh.weekdayClose;
      const closeH = Math.floor(wh.weekdayClose).toString().padStart(2, "0");
      const closeM = Math.round((wh.weekdayClose % 1) * 60).toString().padStart(2, "0");
      const openH = Math.floor(wh.weekdayOpen).toString().padStart(2, "0");
      const openM = Math.round((wh.weekdayOpen % 1) * 60).toString().padStart(2, "0");
      return {
        isOpen: open,
        statusDetail: open ? `${t.closesAt || "იკეტება"} ${closeH}:${closeM}` : `${t.opensAt || "გაიღება"} ${openH}:${openM}`,
        isSunday: false,
      };
    } catch {
      return {
        isOpen: true,
        statusDetail: "",
        isSunday: false,
      };
    }
  }, [venue.workingHours, t]);

  const wh = venue.workingHours;

  return (
    <div className="flex flex-col gap-4 p-5 animate-in fade-in duration-300">
      {/* ── Top Verified Network Badge ── */}
      <div className="flex items-center gap-2.5 px-3 py-2 border border-[#00A3FF]/30 bg-[#00A3FF]/[0.08] rounded-lg">
        <span className="w-2 h-2 rounded-full bg-[#00A3FF] shadow-[0_0_10px_2px_rgba(0,163,255,0.7)]" />
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#BDE3FF] font-bold uppercase truncate">
          {venue.status}
        </span>
      </div>

      {/* ── Real-time Operating Status (Live vs Closed) ── */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 pt-1">
        <span className="font-mono text-[9.5px] tracking-[0.2em] text-[#5F8296] uppercase font-semibold">
          {t.networkStatus}
        </span>
        <div className="flex items-center gap-1.5">
          {isOpen ? (
            <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-400 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.openNow || "ღიაა ახლა"}</span>
              {statusDetail && (
                <>
                  <span className="text-emerald-400/40">·</span>
                  <span className="text-[10px] text-emerald-300 font-normal">{statusDetail}</span>
                </>
              )}
            </span>
          ) : (
            <span className="text-[11px] font-mono font-semibold tracking-wider text-amber-400 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.closedNow || "დაკეტილია ახლა"}</span>
              {statusDetail && (
                <>
                  <span className="text-amber-400/40">·</span>
                  <span className="text-[10px] text-amber-300 font-normal">{statusDetail}</span>
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* ── Working Hours Card ── */}
      {wh && (
        <div className="flex flex-col gap-2.5 pt-1 bg-white/[0.02] border border-white/[0.08] rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-[#7FD4FF] border-b border-white/[0.06] pb-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase font-bold text-[#EAF4FF]">
              {t.workingHoursTitle || "სამუშაო საათები"}
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-1 font-mono text-[11px]">
            {/* Weekdays (Mon - Sat) */}
            <div
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                !isSunday
                  ? "bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#EAF4FF]"
                  : "text-[#8AA3B2] bg-white/[0.01]"
              }`}
            >
              <span className="flex items-center gap-2">
                {!isSunday && <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />}
                <span>{t.monSatLabel || "ორშ – შაბ"}</span>
              </span>
              <span className="font-semibold text-white">
                {wh.monSat.includes(":") ? wh.monSat.replace(/^[^:]+:\s*/, "") : wh.monSat}
              </span>
            </div>

            {/* Sunday */}
            <div
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                isSunday
                  ? "bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#EAF4FF]"
                  : "text-[#8AA3B2] bg-white/[0.01]"
              }`}
            >
              <span className="flex items-center gap-2">
                {isSunday && <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />}
                <span>{t.sunLabel || "კვირა"}</span>
              </span>
              <span className={`font-semibold ${wh.isSunClosed ? "text-amber-400" : "text-white"}`}>
                {wh.sun.includes(":") ? wh.sun.replace(/^[^:]+:\s*/, "") : wh.sun}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Venue External Link ── */}
      <button
        type="button"
        onClick={() => soundEngine.cue("click")}
        className="mt-1 flex items-center justify-center gap-2 py-2.5 border border-white/10 bg-white/[0.03] hover:border-[#7FD4FF]/40 text-[#8AA3B2] hover:text-white font-mono text-[10.5px] tracking-wider rounded-lg transition-all cursor-pointer"
      >
        <ExternalLink className="w-3 h-3 text-[#7FD4FF]" />
        <span>{t.siteLink}</span>
      </button>
    </div>
  );
};
