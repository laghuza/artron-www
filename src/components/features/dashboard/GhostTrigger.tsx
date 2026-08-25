"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, Sparkles, ShieldCheck, ChevronRight } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import ArtronLogo from "@/components/ui/ArtronLogo";
import { soundEngine } from "@/core";

interface GhostTriggerProps {
  onRegisterClick?: () => void;
  onGuestDemoClick?: () => void;
  onOperatorAuthClick?: () => void;
  onAccessClick?: () => void;
}

export default function GhostTrigger({
  onRegisterClick,
  onGuestDemoClick,
  onOperatorAuthClick,
  onAccessClick,
}: GhostTriggerProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRegister = () => {
    soundEngine.playSystemAccess();
    setIsOpen(false);
    if (onRegisterClick) onRegisterClick();
    else if (onAccessClick) onAccessClick();
    else router.push("/get-started?mode=register");
  };

  const handleGuestDemo = () => {
    soundEngine.playPulseNode();
    setIsOpen(false);
    if (onGuestDemoClick) onGuestDemoClick();
    else if (onAccessClick) onAccessClick();
    else router.push("/get-started?mode=demo");
  };

  const handleOperatorAuth = () => {
    soundEngine.playPulseNode();
    setIsOpen(false);
    if (onOperatorAuthClick) onOperatorAuthClick();
    else if (onAccessClick) onAccessClick();
  };

  return (
    <div ref={containerRef} className="flex flex-col items-end group relative select-none z-50">
      {/* Sleek, Harmonious Header Trigger Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          setIsOpen((prev) => !prev);
        }}
        aria-label="System Quick Access Gateway Menu"
        aria-expanded={isOpen}
        className={`group/btn relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090D14]/85 hover:bg-[#0E1524] border ${
          isOpen
            ? "border-[#00A3FF]/60 bg-[#0E1524] text-white shadow-[0_0_12px_rgba(0,163,255,0.18)]"
            : "border-white/10 hover:border-[#00A3FF]/40 text-[#94A3B8] hover:text-white"
        } backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none shadow-sm`}
      >
        {/* Subtle Matrix Icon */}
        <div className="relative flex items-center justify-center">
          <ArtronLogo className="w-4 h-4 transition-transform duration-500 ease-out group-hover/btn:rotate-90" />
        </div>

        {/* Action Title */}
        <span className="text-[11px] font-sans font-medium tracking-normal whitespace-nowrap">
          {t("ghost.trigger_title") || "სწრაფი წვდომა"}
        </span>

        {/* Live Indicator */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_6px_#00A3FF]" />

        {/* Sleek Chevron Indicator */}
        <svg
          className={`w-3 h-3 text-[#64748B] group-hover/btn:text-[#00A3FF] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#00A3FF]" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Clean Glassmorphic Dropdown Gateway */}
      <div
        className={`absolute top-full mt-2 right-0 ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
            : "opacity-0 pointer-events-none -translate-y-1 scale-95"
        } transition-all duration-200 ease-out bg-[#0B0F17]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,163,255,0.08)] w-84 sm:w-92 text-left z-50 overflow-hidden p-2`}
      >
        {/* Menu Header */}
        <div className="px-3 py-2 border-b border-white/[0.08] flex items-center justify-between font-mono text-[10.5px]">
          <span className="text-white/90 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
            {t("ghost.menu_header") || "ARTRON MATRIX // სწრაფი კარიბჭე"}
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#00A3FF] text-[9.5px]">
            <span className="w-1 h-1 rounded-full bg-[#00A3FF] animate-pulse" />
            {t("ghost.menu_status") || "3 რეჟიმი"}
          </span>
        </div>

        {/* 3 Interactive Mode Tiles */}
        <div className="space-y-1.5 pt-2">
          {/* Tile 01: Facility Onboarding */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full group/item text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-[#00A3FF]/10 border border-white/[0.05] hover:border-[#00A3FF]/40 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center text-[#00A3FF] shadow-[0_0_12px_rgba(0,163,255,0.12)] group-hover/item:scale-105 group-hover/item:border-[#00A3FF]/60 group-hover/item:bg-[#00A3FF]/20 group-hover/item:shadow-[0_0_16px_rgba(0,163,255,0.25)] transition-all shrink-0">
                <Building2 className="w-4 h-4 text-[#00A3FF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-medium text-white group-hover/item:text-[#00A3FF] transition-colors truncate">
                  {t("ghost.register") || "01 // ორგანიზაციის რეგისტრაცია"}
                </span>
                <span className="text-[10.5px] text-[#94A3B8] group-hover/item:text-[#CBD5E1] transition-colors truncate">
                  {t("ghost.register_desc") || "ახალი კლუბის / ობიექტის ონბორდინგი"}
                </span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-white/[0.03] group-hover/item:bg-[#00A3FF]/15 border border-white/[0.05] group-hover/item:border-[#00A3FF]/30 flex items-center justify-center text-[#64748B] group-hover/item:text-[#00A3FF] transition-all shrink-0 ml-2">
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
            </div>
          </button>

          {/* Tile 02: Guest Demo Sandbox */}
          <button
            type="button"
            onClick={handleGuestDemo}
            className="w-full group/item text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-[#38BDF8]/10 border border-white/[0.05] hover:border-[#38BDF8]/40 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.12)] group-hover/item:scale-105 group-hover/item:border-[#38BDF8]/60 group-hover/item:bg-[#38BDF8]/20 group-hover/item:shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all shrink-0">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-medium text-white group-hover/item:text-[#38BDF8] transition-colors truncate">
                  {t("ghost.guest_demo") || "02 // სტუმრის Guest დემო წვდომა"}
                </span>
                <span className="text-[10.5px] text-[#94A3B8] group-hover/item:text-[#CBD5E1] transition-colors truncate">
                  {t("ghost.guest_demo_desc") || "სავარჯიშო ინტერაქტიული გაცნობა"}
                </span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-white/[0.03] group-hover/item:bg-[#38BDF8]/15 border border-white/[0.05] group-hover/item:border-[#38BDF8]/30 flex items-center justify-center text-[#64748B] group-hover/item:text-[#38BDF8] transition-all shrink-0 ml-2">
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
            </div>
          </button>

          {/* Tile 03: Operator Authorization */}
          <button
            type="button"
            onClick={handleOperatorAuth}
            className="w-full group/item text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-[#6366F1]/10 border border-white/[0.05] hover:border-[#6366F1]/40 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center text-[#A5B4FC] shadow-[0_0_12px_rgba(99,102,241,0.12)] group-hover/item:scale-105 group-hover/item:border-[#6366F1]/60 group-hover/item:bg-[#6366F1]/20 group-hover/item:shadow-[0_0_16px_rgba(99,102,241,0.25)] transition-all shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#A5B4FC]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-medium text-white group-hover/item:text-[#A5B4FC] transition-colors truncate">
                  {t("ghost.operator_auth") || "03 // ოპერატორის ავტორიზაცია"}
                </span>
                <span className="text-[10.5px] text-[#94A3B8] group-hover/item:text-[#CBD5E1] transition-colors truncate">
                  {t("ghost.operator_auth_desc") || "ადმინისტრატორის მართვის პანელი"}
                </span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-white/[0.03] group-hover/item:bg-[#6366F1]/15 border border-white/[0.05] group-hover/item:border-[#6366F1]/30 flex items-center justify-center text-[#64748B] group-hover/item:text-[#A5B4FC] transition-all shrink-0 ml-2">
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
            </div>
          </button>
        </div>

        {/* Footer Hint */}
        <div className="mt-2 pt-2 border-t border-white/[0.06] px-2.5 py-1 text-center flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]/60" />
          <span className="font-sans text-[10px] text-[#94A3B8]">
            {t("ghost.menu_footer") || "აირჩიეთ სასურველი რეჟიმი მყისიერი წვდომისთვის"}
          </span>
        </div>
      </div>
    </div>
  );
}
