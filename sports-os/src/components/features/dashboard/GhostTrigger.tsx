"use client";

import Link from "next/link";
import ArtronLogo from "@/components/ui/ArtronLogo";

interface GhostTriggerProps {
  onAccessClick: () => void;
}

export default function GhostTrigger({ onAccessClick }: GhostTriggerProps) {
  return (
    <div className="flex flex-col items-end group relative select-none z-50">
      {/* Rotating 32px Trigger Logo */}
      <div className="flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:opacity-80 pb-3">
        <ArtronLogo className="w-8 h-8 transition-transform duration-[2000ms] ease-out group-hover:rotate-180" />
      </div>

      {/* Glassmorphic Dropdown Panel with Invisible Hover Bridge */}
      <div className="absolute top-11 right-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 delay-150 group-hover:delay-0 transform translate-y-1 group-hover:translate-y-0 bg-[#1A1D23]/75 backdrop-blur-[12px] border border-silver-structure/15 rounded shadow-2xl w-48 text-right z-50 after:content-[''] after:absolute after:w-full after:h-6 after:-top-5 after:left-0 after:block">
        <button
          onClick={onAccessClick}
          className="w-full text-right text-silver-structure/70 hover:text-emerald-core font-mono text-[13px] px-6 py-5 transition-colors cursor-pointer block uppercase"
        >
          01 // ENTER THE CORE
        </button>
        <Link
          href="/sla"
          className="w-full text-right text-silver-structure/70 hover:text-emerald-core font-mono text-[13px] px-6 py-5 transition-colors block border-t border-silver-structure/15 uppercase"
        >
          02 // PROTOCOL (SLA)
        </Link>
      </div>
    </div>
  );
}
