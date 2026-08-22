"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/config/gsap.config";

interface GsapLaserMeshProps {
  className?: string;
  intensity?: "subtle" | "vivid";
  laserColor?: string;
}

export const GsapLaserMesh: React.FC<GsapLaserMeshProps> = ({
  className = "",
  intensity = "subtle",
  laserColor = "#00A3FF",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laserRef1 = useRef<SVGLineElement>(null);
  const laserRef2 = useRef<SVGLineElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      // Create a smooth looping timeline for laser sweep
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      if (laserRef1.current && laserRef2.current) {
        tl.to(laserRef1.current, {
          attr: { x1: 280, x2: 40 },
          duration: 3.5,
          ease: "power2.inOut",
        }).to(
          laserRef2.current,
          {
            attr: { y1: 180, y2: 20 },
            duration: 4,
            ease: "sine.inOut",
          },
          "<"
        );
      }

      if (pulseRef.current) {
        gsap.to(pulseRef.current, {
          scale: 1.8,
          opacity: 0,
          duration: 1.6,
          repeat: -1,
          ease: "power1.out",
          transformOrigin: "center center",
        });
      }
    },
    { scope: containerRef }
  );

  const baseOpacity = intensity === "vivid" ? 0.35 : 0.15;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full object-cover select-none"
      >
        <defs>
          <linearGradient id="gsap-laser-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={laserColor} stopOpacity="0.0" />
            <stop offset="50%" stopColor={laserColor} stopOpacity={baseOpacity * 2} />
            <stop offset="100%" stopColor={laserColor} stopOpacity="0.0" />
          </linearGradient>
          <filter id="gsap-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Sweeping Lasers */}
        <line
          ref={laserRef1}
          x1="40"
          y1="20"
          x2="280"
          y2="180"
          stroke="url(#gsap-laser-grad)"
          strokeWidth="1.5"
          filter="url(#gsap-glow)"
        />
        <line
          ref={laserRef2}
          x1="280"
          y1="20"
          x2="40"
          y2="180"
          stroke={laserColor}
          strokeOpacity={baseOpacity}
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Center Telemetry Pulse */}
        <circle
          ref={pulseRef}
          cx="160"
          cy="100"
          r="12"
          fill="none"
          stroke={laserColor}
          strokeWidth="1.2"
        />
        <circle cx="160" cy="100" r="3" fill={laserColor} opacity={baseOpacity * 3} />
      </svg>
    </div>
  );
};

export default GsapLaserMesh;
