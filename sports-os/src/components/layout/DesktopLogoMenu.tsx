"use client";

import { useState } from "react";
import Link from "next/link";
import ArtronLogo from "@/components/ui/ArtronLogo";
import { audioManager } from "@/lib/audioManager";

interface DesktopLogoMenuProps {
  onEnterCore: () => void;
}

export default function DesktopLogoMenu({ onEnterCore }: DesktopLogoMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    audioManager.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleAction = (action?: () => void) => {
    audioManager.playHapticClick();
    setIsOpen(false);
    if (action) action();
  };

  return (
    <div className="relative select-none z-50">
      <button
        onClick={toggleMenu}
        aria-label="Toggle System Menu"
        className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-85 group"
      >
        <ArtronLogo className="w-8 h-8 transition-transform duration-700 group-hover:rotate-90" />
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-11 right-0 z-50 w-56 bg-[#1A1D23]/90 backdrop-blur-md border border-[#9CA3AF]/18 rounded-md shadow-[0_0_8px_rgba(0,230,118,0.12)] py-2 font-mono text-xs animate-fadeIn">
            <div className="px-4 py-2 border-b border-[#9CA3AF]/18 flex items-center justify-between text-[10px] text-[#00E676] tracking-widest uppercase">
              <span>[ SYSTEM_MENU ]</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] animate-pulse" />
            </div>

            <button
              onClick={() => handleAction(onEnterCore)}
              className="w-full text-left px-4 py-2.5 text-[#9CA3AF] hover:text-[#F5F5F3] hover:bg-[#232730] transition-colors uppercase cursor-pointer"
            >
              01 // ENTER THE CORE
            </button>
            <Link
              href="/sla"
              onClick={() => handleAction()}
              className="block w-full text-left px-4 py-2.5 text-[#9CA3AF] hover:text-[#F5F5F3] hover:bg-[#232730] transition-colors uppercase border-t border-[#9CA3AF]/18"
            >
              02 // PROTOCOL (SLA)
            </Link>
            <Link
              href="/#manifest"
              onClick={() => handleAction()}
              className="block w-full text-left px-4 py-2.5 text-[#9CA3AF] hover:text-[#F5F5F3] hover:bg-[#232730] transition-colors uppercase border-t border-[#9CA3AF]/18"
            >
              03 // SYSTEM MANIFEST
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
