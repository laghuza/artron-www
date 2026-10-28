"use client";

import React, { useState, useMemo, useEffect } from "react";
import { EnneaDataDock } from "./EnneaDataDock";
import { EnneaSceneCanvas } from "./EnneaSceneCanvas";
import { EnneaVenueRibbon } from "./EnneaVenueRibbon";
import { EnneaMobileViewSwitcher } from "./EnneaMobileViewSwitcher";
import { getEnneaRegions, getEnneaVenues } from "./enneaEcosystemVenues";
import { getEnneaStrings } from "./enneaEcosystemStrings";
import {
  ArtronEnneaEcosystemProps,
  EnneaRegion,
  EnneaStrings,
  EnneaVenue,
  ViewMode,
} from "./types";
import { useLanguage } from "@/context/LanguageContext";

export const ArtronEnneaEcosystem: React.FC<ArtronEnneaEcosystemProps> = ({
  regions: propRegions,
  venues: propVenues,
  accent = "#7FD4FF",
  adm1Url = "/geo/georgia-adm1.json",
  className = "",
  onViewModeChange,
  onVenueSelect,
}) => {
  const { locale } = useLanguage();
  const isKa = locale === "ka";
  const isRu = locale === "ru";

  const regions = useMemo<EnneaRegion[]>(() => {
    if (propRegions && propRegions.length > 0) return propRegions;
    return getEnneaRegions(isKa, isRu);
  }, [propRegions, isKa, isRu]);

  const defaultVenuesList = useMemo<EnneaVenue[]>(
    () => getEnneaVenues(isKa, isRu),
    [isKa, isRu]
  );

  const activeVenues = propVenues && propVenues.length > 0 ? propVenues : defaultVenuesList;

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<EnneaVenue | null>(null);
  const [activeTab, setActiveTab] = useState<"venues" | "partners">("venues");
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // Equal Representation Shuffle for client gyms
  const [shuffledVenues, setShuffledVenues] = useState<EnneaVenue[]>(activeVenues);
  useEffect(() => {
    const clients = activeVenues.filter((v) => !v.isPartner);
    const partners = activeVenues.filter((v) => v.isPartner);
    const shuffledClients = [...clients].sort(() => Math.random() - 0.5);
    setShuffledVenues([...shuffledClients, ...partners]);
  }, [activeVenues]);

  const strings = useMemo<EnneaStrings>(() => getEnneaStrings(locale), [locale]);

  const handleEnterGeorgia = () => {
    setViewMode("GEORGIA_DETAIL");
    onViewModeChange?.("GEORGIA_DETAIL");
  };

  const handleExitToGlobe = () => {
    setSelectedVenue(null);
    setSelectedRegion(null);
    setViewMode("GLOBE");
    onViewModeChange?.("GLOBE");
    onVenueSelect?.(null);
  };

  const handleSelectRegion = (id: string | null) => {
    setSelectedRegion((cur) => (cur === id ? null : id));
    setSelectedVenue(null);
  };

  const handleSelectVenue = (venue: EnneaVenue | null) => {
    setSelectedVenue(venue);
    if (venue) {
      if (venue.isPartner) {
        setActiveTab("partners");
      } else {
        setActiveTab("venues");
      }
      setSelectedRegion(venue.regionId);
      if (viewMode === "GLOBE") {
        setViewMode("GEORGIA_DETAIL");
        onViewModeChange?.("GEORGIA_DETAIL");
      }
    }
    onVenueSelect?.(venue);
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0A0D12] shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-stretch h-[780px] lg:h-[840px] ${className}`}
    >
      {/* Mobile Floating Liquid Glass Lens Switcher (Top Centered) */}
      <div className="md:hidden absolute top-2.5 inset-x-0 z-30 flex justify-center px-3 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[320px]">
          <EnneaMobileViewSwitcher
            mode={isDockCollapsed ? "map" : "list"}
            onSelectMode={(m) => {
              setIsDockCollapsed(m === "map");
            }}
            t={strings}
            accentColor={accent}
          />
        </div>
      </div>

      {/* Left Glassmorphic Dock */}
      <EnneaDataDock
        viewMode={viewMode}
        venues={shuffledVenues}
        regions={regions}
        selectedRegion={selectedRegion}
        selectedVenue={selectedVenue}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        t={strings}
        accent={accent}
        onSelectRegion={handleSelectRegion}
        onSelectVenue={handleSelectVenue}
        onEnterGeorgia={handleEnterGeorgia}
        onExitToGlobe={handleExitToGlobe}
        isCollapsed={isDockCollapsed}
        onToggleCollapse={() => setIsDockCollapsed((prev) => !prev)}
      />

      {/* Right WebGL 3D Scene Viewport + Bottom Glassmorphic Ribbon */}
      <div className="relative flex-1 h-full min-w-0 flex flex-col overflow-hidden">
        <EnneaSceneCanvas
          viewMode={viewMode}
          accent={accent}
          regions={regions}
          venues={shuffledVenues}
          t={strings}
          adm1Url={adm1Url}
          onEnterGeorgia={handleEnterGeorgia}
          onExitToGlobe={handleExitToGlobe}
          onSelectRegion={handleSelectRegion}
          onSelectVenue={handleSelectVenue}
          selectedRegion={selectedRegion}
          selectedVenue={selectedVenue}
          activeCore={null}
        />

        {/* Bottom Glassmorphic Ribbon for 1-Click Instant Visibility */}
        <EnneaVenueRibbon
          venues={shuffledVenues}
          selectedVenue={selectedVenue}
          onSelectVenue={handleSelectVenue}
          onSelectPartnerTab={() => {
            const bog = shuffledVenues.find((v) => v.id === "bog");
            if (bog) handleSelectVenue(bog);
            else {
              setSelectedVenue(null);
              setActiveTab("partners");
            }
          }}
          activeTab={activeTab}
          t={strings}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default ArtronEnneaEcosystem;
