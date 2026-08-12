"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/core";

export type B2BRole = "OWNER" | "MANAGER" | "ADMIN" | "TRAINER" | "DOCTOR";

interface OrganizationTenant {
  id: string;
  name: string;
  code: string;
  branchesCount: number;
  activeAthletes: number;
  systemStatus: "OPTIMAL" | "ATTENTION" | "SYNCING";
}

interface UserProfile {
  name: string;
  email: string;
  role: B2BRole;
  organization: OrganizationTenant;
}

const DEMO_TENANTS: OrganizationTenant[] = [
  {
    id: "TENANT-GEO-01",
    name: "ARTRON OLYMPIC ACADEMY",
    code: "AOA-TBILISI",
    branchesCount: 4,
    activeAthletes: 1280,
    systemStatus: "OPTIMAL",
  },
  {
    id: "TENANT-GEO-02",
    name: "DINAMO PERFORMANCE CENTER",
    code: "DPC-ARENA",
    branchesCount: 2,
    activeAthletes: 640,
    systemStatus: "OPTIMAL",
  },
  {
    id: "TENANT-GEO-03",
    name: "BLACK SEA ATHLETICS HUB",
    code: "BSH-BATUMI",
    branchesCount: 3,
    activeAthletes: 890,
    systemStatus: "ATTENTION",
  },
];

const ROLE_PRESETS: Record<B2BRole, { title: string; subtitle: string; color: string; badgeText: string }> = {
  OWNER: {
    title: "EXECUTIVE CONTROL MATRIX",
    subtitle: "მფლობელის პანელი — ფინანსური ნაკადები, ფილიალების გლობალური მონიტორინგი და RLS უსაფრთხოება.",
    color: "#D4AF37", // Raw Gold
    badgeText: "LEVEL 01 // MASTER OWNER",
  },
  MANAGER: {
    title: "OPERATIONAL DISPATCH CONSOLE",
    subtitle: "მენეჯერის პანელი — ობიექტების განრიგი, პერსონალის დატვირთვა და რესურსების ოპტიმიზაცია.",
    color: "#00E676", // Emerald
    badgeText: "LEVEL 02 // GENERAL MANAGER",
  },
  ADMIN: {
    title: "FACILITY REGISTRATION ENGINE",
    subtitle: "ადმინისტრატორის პანელი — ტურნიკეტების RFID ლოგები, აბონემენტები და დაშვების კონტროლი.",
    color: "#9CA3AF", // Antique Silver
    badgeText: "LEVEL 03 // SYSTEM ADMIN",
  },
  TRAINER: {
    title: "ATHLETE PERFORMANCE PIPELINE",
    subtitle: "ტრენერის პანელი — ათლეტების ვარჯიშის გეგმები, GPS ტელემეტრია და EnneaCore ანალიტიკა.",
    color: "#D97736", // Oxidized Copper
    badgeText: "LEVEL 04 // HEAD COACH",
  },
  DOCTOR: {
    title: "BIOMETRIC & MEDICAL MATRIX",
    subtitle: "ექიმის პანელი — რეაბილიტაციის ნაკადები, ტრავმების რისკ-ანალიზი და AES-256 PII დაცვა.",
    color: "#FF3D00", // Lava
    badgeText: "LEVEL 05 // SPORTS PHYSICIAN",
  },
};

interface ArtronB2BDashboardProps {
  onReturnToGateway: () => void;
}

export const ArtronB2BDashboard: React.FC<ArtronB2BDashboardProps> = ({
  onReturnToGateway,
}) => {
  const [selectedTenant, setSelectedTenant] = useState<OrganizationTenant>(DEMO_TENANTS[0]);
  const [activeRole, setActiveRole] = useState<B2BRole>("OWNER");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "BRANCHES" | "STAFF" | "TELEMETRY">("OVERVIEW");
  const [accessCode, setAccessCode] = useState<string>("90472");

  const currentUser: UserProfile = {
    name: "ირაკლი რობაქიძე",
    email: "i.robakidze@artron.ge",
    role: activeRole,
    organization: selectedTenant,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        soundEngine.playPulseNode();
        onReturnToGateway();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReturnToGateway]);

  const currentRoleInfo = ROLE_PRESETS[activeRole];

  return (
    <div className="min-h-screen w-screen bg-[#121418] text-[#F5F5F7] font-sans p-4 sm:p-8 flex flex-col justify-between select-none animate-fadeIn relative overflow-hidden">
      {/* Background Ambient Glow — ARt.pdf OKLCH Tuned Signal */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none opacity-10 transition-all duration-700"
        style={{ backgroundColor: currentRoleInfo.color }}
      />

      {/* Top Header Bar — ARt.pdf 02.1 Branding Standard */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b border-[#9CA3AF]/20 pb-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-pulse" 
              style={{ backgroundColor: currentRoleInfo.color }}
            />
            <span className="text-[14px] font-extrabold tracking-[3px] text-[#F5F5F7] font-mono uppercase">
              ARTRON // B2B OPERATOR SYSTEM
            </span>
          </div>

          <span className="hidden md:inline-block text-[#9CA3AF]/40">|</span>

          {/* Tenant Selector */}
          <select
            value={selectedTenant.id}
            onChange={(e) => {
              const tenant = DEMO_TENANTS.find((t) => t.id === e.target.value);
              if (tenant) {
                setSelectedTenant(tenant);
                soundEngine.playPulseNode();
              }
            }}
            className="bg-[#090B0E] border border-[#9CA3AF]/30 text-[#F5F5F7] text-[11px] font-mono font-bold px-3 py-1.5 rounded-[4px] focus:outline-none focus:border-[#00E676] cursor-pointer"
          >
            {DEMO_TENANTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.code})
              </option>
            ))}
          </select>
        </div>

        {/* User Identity & Return Control */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-mono font-bold text-[#F5F5F7]">{currentUser.name}</div>
            <div className="text-[10px] font-mono text-[#9CA3AF]">{currentUser.email}</div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onReturnToGateway();
            }}
            className="px-4 py-2 bg-[#090B0E] hover:bg-[#00E676] text-[#00E676] hover:text-[#121418] border border-[#00E676]/40 text-[11px] font-mono font-bold tracking-[2px] uppercase rounded-[4px] transition-all cursor-pointer shadow-[0_0_12px_rgba(0,230,118,0.15)]"
          >
            [ ✕ RETURN TO GATEWAY (ESC) ]
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 my-6 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* Role Selector Matrix Bar (ARt.pdf 01.2 POSITIONING: Owners, Managers, Admins, Trainers, Doctors) */}
        <div className="bg-[#090B0E] border border-[#9CA3AF]/20 rounded-[4px] p-2 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] font-mono font-bold text-[#9CA3AF] px-3 uppercase tracking-wider">
            OPERATOR ROLE MATRIX:
          </div>

          <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-end">
            {(Object.keys(ROLE_PRESETS) as B2BRole[]).map((roleKey) => {
              const preset = ROLE_PRESETS[roleKey];
              const isActive = activeRole === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => {
                    setActiveRole(roleKey);
                    soundEngine.playPulseNode();
                  }}
                  className={`px-3 py-1.5 text-[11px] font-mono font-bold uppercase rounded-[4px] transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#121418] text-[#F5F5F7] border border-[#F5F5F7]/40 shadow-sm"
                      : "text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-[#121418]/60 border border-transparent"
                  }`}
                  style={{
                    borderColor: isActive ? preset.color : undefined,
                    color: isActive ? preset.color : undefined,
                  }}
                >
                  ● {roleKey}
                </button>
              );
            })}
          </div>
        </div>

        {/* Banner Section (ARt.pdf 03.1 Illuminated Dark Mode & 03.2 Strict Radius R4) */}
        <div className="bg-[#090B0E]/80 border-l-4 rounded-[4px] border-[#9CA3AF]/20 p-6 space-y-3 backdrop-blur-md" style={{ borderLeftColor: currentRoleInfo.color }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full bg-[#121418] border border-[#9CA3AF]/30" style={{ color: currentRoleInfo.color }}>
              ● {currentRoleInfo.badgeText}
            </span>
            <span className="text-[11px] font-mono text-[#9CA3AF]">
              TENANT ID: <strong className="text-[#F5F5F7]">{selectedTenant.id}</strong> | STATUS: <strong className="text-[#00E676]">{selectedTenant.systemStatus}</strong>
            </span>
          </div>

          <h1 className="text-[22px] sm:text-[28px] font-extrabold text-[#F5F5F7] tracking-[2px] uppercase font-sans">
            {currentRoleInfo.title}
          </h1>
          <p className="text-[13px] text-[#9CA3AF] max-w-3xl leading-relaxed">
            {currentRoleInfo.subtitle}
          </p>
        </div>

        {/* Navigation Tabs (Strict 4px Radius) */}
        <div className="flex items-center gap-2 border-b border-[#9CA3AF]/20 pb-1 font-mono text-[12px]">
          {(["OVERVIEW", "BRANCHES", "STAFF", "TELEMETRY"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                soundEngine.playPulseNode();
              }}
              className={`px-4 py-2 font-bold uppercase rounded-t-[4px] transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#090B0E] text-[#00E676] border-t-2 border-x border-[#9CA3AF]/20 border-t-[#00E676]"
                  : "text-[#9CA3AF] hover:text-[#F5F5F7]"
              }`}
            >
              {tab === "OVERVIEW" && "01 // მიმოხილვა"}
              {tab === "BRANCHES" && "02 // ფილიალები"}
              {tab === "STAFF" && "03 // პერსონალი"}
              {tab === "TELEMETRY" && "04 // ტელემეტრია"}
            </button>
          ))}
        </div>

        {/* Tab Content Cards Matrix — ARt.pdf Strict Zone 4px Radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Primary Metrics */}
          <div className="bg-[#090B0E] border border-[#9CA3AF]/20 rounded-[4px] p-5 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
              <span>ACTIVE ATHLETES</span>
              <span className="text-[#00E676] font-bold">● LIVE</span>
            </div>
            <div className="text-[32px] font-extrabold font-mono text-[#F5F5F7]">
              {selectedTenant.activeAthletes.toLocaleString()}
            </div>
            <p className="text-[12px] text-[#9CA3AF]">
              აქტიური ათლეტების რაოდენობა {selectedTenant.name}-ის ყველა ფილიალში.
            </p>
          </div>

          {/* Card 2: Branch Infrastructure */}
          <div className="bg-[#090B0E] border border-[#9CA3AF]/20 rounded-[4px] p-5 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
              <span>MANAGED BRANCHES</span>
              <span className="text-[#D4AF37] font-bold">● ONLINE</span>
            </div>
            <div className="text-[32px] font-extrabold font-mono text-[#F5F5F7]">
              0{selectedTenant.branchesCount} HUB
            </div>
            <p className="text-[12px] text-[#9CA3AF]">
              ცენტრალიზებულად დაკავშირებული ობიექტები და ტურნიკეტების ქსელი.
            </p>
          </div>

          {/* Card 3: Security & RLS */}
          <div className="bg-[#090B0E] border border-[#9CA3AF]/20 rounded-[4px] p-5 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
              <span>SECURITY & DATA PURGE</span>
              <span className="text-[#00E676] font-bold">● AES-256</span>
            </div>
            <div className="text-[18px] font-bold font-mono text-[#00E676]">
              RLS ENFORCED // 100%
            </div>
            <p className="text-[12px] text-[#9CA3AF]">
              მონაცემთა სრული იზოლაცია და 14-დღიანი ავტომატური გაწმენდის პროტოკოლი.
            </p>
          </div>
        </div>

        {/* Detailed Operational Data Table (ARt.pdf JetBrains Mono & Strict Grid) */}
        <div className="bg-[#090B0E] border border-[#9CA3AF]/20 rounded-[4px] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#9CA3AF]/15 pb-3">
            <h3 className="text-[14px] font-bold font-mono text-[#F5F5F7] uppercase tracking-wider">
              // ობიექტების დატვირთვა & REAL-TIME STREAMING
            </h3>
            <span className="text-[11px] font-mono text-[#00E676]">● UPDATED 1 SECOND AGO</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[12px]">
              <thead>
                <tr className="border-b border-[#9CA3AF]/20 text-[#9CA3AF]">
                  <th className="py-2.5 px-3">BRANCH ID</th>
                  <th className="py-2.5 px-3">LOCATION</th>
                  <th className="py-2.5 px-3">CAPACITY</th>
                  <th className="py-2.5 px-3">RFID PASSES</th>
                  <th className="py-2.5 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9CA3AF]/10 text-[#F5F5F7]">
                <tr>
                  <td className="py-3 px-3 font-bold text-[#00E676]">NODE-01</td>
                  <td className="py-3 px-3">თბილისი, ვაკე სენტრალი</td>
                  <td className="py-3 px-3">84% / 350 MAX</td>
                  <td className="py-3 px-3 text-[#D4AF37]">1,420 Scan/Day</td>
                  <td className="py-3 px-3 text-right text-[#00E676] font-bold">ONLINE</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#00E676]">NODE-02</td>
                  <td className="py-3 px-3">თბილისი, საბურთალო ჰაბი</td>
                  <td className="py-3 px-3">62% / 400 MAX</td>
                  <td className="py-3 px-3 text-[#D4AF37]">980 Scan/Day</td>
                  <td className="py-3 px-3 text-right text-[#00E676] font-bold">ONLINE</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#D97736]">NODE-03</td>
                  <td className="py-3 px-3">ბათუმი, ოლიმპიური არენა</td>
                  <td className="py-3 px-3">91% / 500 MAX</td>
                  <td className="py-3 px-3 text-[#D4AF37]">2,150 Scan/Day</td>
                  <td className="py-3 px-3 text-right text-[#D97736] font-bold">SYNCING</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Footer Bar (ARt.pdf 04.1 System Speech Microcopy) */}
      <footer className="relative z-10 border-t border-[#9CA3AF]/20 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9CA3AF] gap-2">
        <span>BRANDBOOK SPEC: ARt.pdf (VOL.01 / 2026.05)</span>
        <span className="text-[#00E676] font-bold">PLAN · ANALYZE · CONTROL</span>
        <span>SYSTEM SESSION: ACTIVE // {currentUser.organization.code}</span>
      </footer>
    </div>
  );
};
