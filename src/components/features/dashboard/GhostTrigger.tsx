"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    else router.push('/get-started?mode=register');
  };

  const handleGuestDemo = () => {
    soundEngine.playPulseNode();
    setIsOpen(false);
    if (onGuestDemoClick) onGuestDemoClick();
    else if (onAccessClick) onAccessClick();
    else router.push('/get-started?mode=demo');
  };

  const handleOperatorAuth = () => {
    soundEngine.playPulseNode();
    setIsOpen(false);
    if (onOperatorAuthClick) onOperatorAuthClick();
    else if (onAccessClick) onAccessClick();
  };

  return (
    <div ref={containerRef} className="flex flex-col items-end group relative select-none z-50">
      {/* Rotating 32px Trigger Logo */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          setIsOpen((prev) => !prev);
        }}
        aria-label="System Menu"
        className="flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:opacity-80 pb-3 focus:outline-none"
      >
        <ArtronLogo className="w-8 h-8 transition-transform duration-[2000ms] ease-out group-hover:rotate-180" />
      </button>

      {/* Glassmorphic Dropdown Panel with Hover & Click Support */}
      <div
        className={`absolute top-11 right-0 ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
        } transition-all duration-300 delay-75 group-hover:delay-0 bg-[#12161E]/95 backdrop-blur-[16px] border border-[rgba(156,163,175,0.2)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] w-72 text-right z-50 overflow-hidden after:content-[''] after:absolute after:w-full after:h-6 after:-top-5 after:left-0 after:block`}
      >
        <button
          type="button"
          onClick={handleRegister}
          className="w-full text-right text-gray-300 hover:text-[#00ff87] hover:bg-[#00ff87]/10 font-mono text-[12px] px-5 py-3.5 transition-all cursor-pointer block border-b border-white/5 uppercase"
        >
          01 // ორგანიზაციის რეგისტრაცია (ონბორდინგი)
        </button>

        <button
          type="button"
          onClick={handleGuestDemo}
          className="w-full text-right text-gray-300 hover:text-[#00B0FF] hover:bg-[#00B0FF]/10 font-mono text-[12px] px-5 py-3.5 transition-all cursor-pointer block border-b border-white/5 uppercase"
        >
          02 // სტუმრის Guest დემო წვდომა
        </button>

        <button
          type="button"
          onClick={handleOperatorAuth}
          className="w-full text-right text-gray-300 hover:text-[#00ff87] hover:bg-[#00ff87]/10 font-mono text-[12px] px-5 py-3.5 transition-all cursor-pointer block uppercase"
        >
          03 // ოპერატორის ავტორიზაცია
        </button>
      </div>
    </div>
  );
}
