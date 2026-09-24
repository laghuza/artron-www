"use client";

import React, { useMemo, useState } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { EnneaVenue, EnneaRegion, EnneaStrings } from "./types";
import { soundEngine } from "./EnneaAudioEngine";

interface EnneaVenueFilterListProps {
  venues: EnneaVenue[];
  regions: EnneaRegion[];
  selectedRegion: string | null;
  onSelectRegion: (id: string | null) => void;
  onSelectVenue: (venue: EnneaVenue) => void;
  t: EnneaStrings;
}

export const EnneaVenueFilterList: React.FC<EnneaVenueFilterListProps> = ({
  venues,
  regions,
  selectedRegion,
  onSelectRegion,
  onSelectVenue,
  t,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const filteredVenues = useMemo(() => {
    let list = venues;
    if (selectedRegion) {
      list = list.filter((v) => v.regionId === selectedRegion);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          (v.regionName && v.regionName.toLowerCase().includes(q)) ||
          (v.category && v.category.toLowerCase().includes(q))
      );
    }
    return list;
  }, [venues, selectedRegion, searchQuery]);

  const selectedRegionObj = useMemo(
    () => regions.find((r) => r.id === selectedRegion) || null,
    [regions, selectedRegion]
  );

  return (
    <div className="flex flex-col">
      {/* Filter & Search Controls */}
      <div className="p-3 border-b border-white/[0.07] bg-white/[0.02] flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          {/* All Cities Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.cue("filter");
              onSelectRegion(null);
              setSearchQuery("");
            }}
            className={`px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all cursor-pointer text-center rounded-lg border ${
              !selectedRegion && !searchQuery
                ? "bg-[#EAF4FF] text-[#0A0D12] font-bold border-[#EAF4FF]"
                : "text-[#8AA3B2] hover:text-white bg-white/5 border-white/10"
            }`}
          >
            {t.filters.all} ({venues.length})
          </button>

          {/* City Dropdown Trigger */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all cursor-pointer rounded-lg border ${
                selectedRegion
                  ? "bg-[#7FD4FF]/15 border-[#7FD4FF]/50 text-[#7FD4FF] font-semibold"
                  : "bg-white/5 border-white/10 text-[#CFE6F2] hover:border-white/20"
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#7FD4FF]" />
                <span className="truncate">
                  {selectedRegionObj
                    ? selectedRegionObj.name.replace(/ Hub| ჰაბი| хаб/gi, "")
                    : t.cityFilter}
                </span>
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isCityDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Click-outside backdrop */}
            {isCityDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsCityDropdownOpen(false)}
              />
            )}

            {/* Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0F141C] border border-white/15 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.85)] p-1 flex flex-col gap-0.5 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.cue("filter");
                    onSelectRegion(null);
                    setIsCityDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-[11px] text-left transition-colors cursor-pointer ${
                    !selectedRegion
                      ? "bg-[#7FD4FF]/20 text-[#7FD4FF] font-bold"
                      : "text-[#CFE6F2] hover:bg-white/5"
                  }`}
                >
                  <span>{t.allCities}</span>
                  <span className="text-[10px] text-[#8AA3B2]">({venues.length})</span>
                </button>

                {regions
                  .filter((r) => r.live)
                  .map((r) => {
                    const count = venues.filter((v) => v.regionId === r.id).length;
                    const isSelected = selectedRegion === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          soundEngine.cue("filter");
                          onSelectRegion(r.id);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-[11px] text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#7FD4FF]/20 text-[#7FD4FF] font-bold"
                            : "text-[#CFE6F2] hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{r.name.replace(/ Hub| ჰაბი| хаб/gi, "")}</span>
                        <span className="text-[10px] text-[#8AA3B2]">({count})</span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Fast Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-[#6E8DA0] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-8 pr-7 py-1.5 bg-black/40 border border-white/10 rounded-lg font-mono text-[11px] text-[#EAF4FF] placeholder:text-[#5F8296] focus:outline-none focus:border-[#7FD4FF]/50 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-[#6E8DA0] hover:text-white text-xs px-1"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* List of Venues */}
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {filteredVenues.length === 0 ? (
          <div className="p-6 text-center font-mono text-xs text-[#6E8DA0]">
            {t.notFound}
          </div>
        ) : (
          filteredVenues.map((venue) => (
            <button
              key={venue.id}
              type="button"
              onClick={() => {
                soundEngine.cue("click");
                onSelectVenue(venue);
              }}
              className="group relative flex items-center justify-between p-3.5 hover:bg-[#7FD4FF]/5 text-left transition-all cursor-pointer"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]" />
              <div className="flex items-center gap-3 min-w-0">
                {venue.logoSrc ? (
                  <img
                    src={venue.logoSrc}
                    alt={venue.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-white/20"
                  />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[12.5px] font-semibold text-[#EAF4FF] group-hover:text-[#7FD4FF] truncate">
                    {venue.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#6E8DA0]">
                    {venue.category} · {venue.regionName || venue.city}
                    {venue.regionCity && venue.regionCity !== venue.regionName
                      ? `, ${venue.regionCity}`
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
