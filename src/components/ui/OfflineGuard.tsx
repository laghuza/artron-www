"use client";

import { useEffect, useState } from "react";
import { audioManager } from "@/lib/audioManager";

export default function OfflineGuard({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      audioManager.playAlert();
    };
    const handleOnline = () => {
      setIsOffline(false);
      audioManager.playClick();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <>
      {children}
      <div
        className="fixed inset-0 bg-[#121418] z-[9999] flex flex-col justify-center items-center select-none transition-all duration-[400ms] ease-out pointer-events-none"
        style={{
          opacity: isOffline ? 1 : 0,
          pointerEvents: isOffline ? "all" : "none",
        }}
      >
        {/* Dimmed 9-Node Logo */}
        <svg viewBox="0 0 400 400" className="w-24 h-24 opacity-25 select-none pointer-events-none mb-6">
          <g stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1" fill="none">
            <line x1="50" y1="50" x2="350" y2="50" />
            <line x1="50" y1="200" x2="350" y2="200" />
            <line x1="50" y1="350" x2="350" y2="350" />
            <line x1="50" y1="50" x2="50" y2="350" />
            <line x1="200" y1="50" x2="200" y2="350" />
            <line x1="350" y1="50" x2="350" y2="350" />
          </g>
          <g stroke="rgba(156, 163, 175, 0.15)" strokeWidth="1">
            <line x1="200" y1="200" x2="200" y2="50" />
            <line x1="200" y1="200" x2="350" y2="50" />
            <line x1="200" y1="200" x2="350" y2="200" />
            <line x1="200" y1="200" x2="350" y2="350" />
            <line x1="200" y1="200" x2="200" y2="350" />
            <line x1="200" y1="200" x2="50" y2="350" />
            <line x1="200" y1="200" x2="50" y2="200" />
            <line x1="200" y1="200" x2="50" y2="50" />
          </g>
          <circle cx="200" cy="200" r="5" fill="#9CA3AF" />
          <circle cx="200" cy="50" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="50" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="200" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="200" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="200" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="50" r="4" fill="#9CA3AF" />
        </svg>

        {/* Lava Red Pulsing Dot */}
        <div
          className="w-3.5 h-3.5 rounded-full mb-6 animate-pulse"
          style={{
            backgroundColor: "#FF3D00",
            boxShadow: "0 0 20px #FF3D00",
          }}
        />

        {/* Status Text Block */}
        <div className="text-center space-y-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.18em] px-4">
          <div className="text-[#FF3D00] font-bold">
            [ NETWORK_LINK: SEVERED ] // [ EMERGENCY_STANDBY_MODE_ACTIVE ]
          </div>
          <div className="text-white/60 font-medium">
            ARTRON PORTAL REMAINS SECURED ON-DEVICE.
          </div>
        </div>
      </div>
    </>
  );
}
