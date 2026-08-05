"use client";

import { useEffect, useState } from "react";
import BootSequenceConsole from "@/components/features/landing/core/BootSequenceConsole";
import CoreCanvas from "@/components/features/landing/core/CoreCanvas";

const BOOT_LOGS = [
  "[ INIT ] LOADING SPORTS OS KERNEL V1.0.42...",
  "[ OK ] MEMORY PAGE POOL DECLARED [ 512MB ]",
  "[ OK ] CONNECTING TO DECENTRALIZED WORKER NODES...",
  "[ OK ] ENNEA CORE CONNECTION ESTABLISHED [ 4.8ms ]",
  "[ OK ] ACQUIRING SYSTEM ACCREDITATION LEVELS...",
  "[ OK ] DECRYPTING GRAPHICS BUFFER...",
  "[ OK ] BOOT SEQUENCE COMPLETED SUCCESSFULLY.",
];

export default function CoreSection() {
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [showLaser, setShowLaser] = useState(false);

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setBootLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setShowLaser(true);
        setTimeout(() => {
          setIsBooted(true);
          setShowLaser(false);
        }, 800);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="core" className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid">
      {showLaser && <div className="absolute left-0 z-50 h-[2px] w-full bg-emerald-core shadow-[0_0_15px_#00E676] animate-laser" />}
      {!isBooted ? (
        <BootSequenceConsole bootLogs={bootLogs} />
      ) : (
        <>
          <CoreCanvas isBooted={isBooted} />
          <div className="relative z-20 text-center px-6 max-w-3xl pointer-events-none select-none">
            <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-4">[ THE PORTAL GATEWAY ]</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">ARTRON.<br />THE SPORTING INFRASTRUCTURE STANDARD.</h1>
            <p className="text-xs md:text-sm text-silver-structure/80 leading-relaxed max-w-xl mx-auto mb-8">
              ქაოსიდან წესრიგში ლაგებადი ეკოსისტემა. სპორტული ინფრასტრუქტურის გლობალური სტანდარტი, რომელიც უზრუნველყოფს ფიზიკური სივრცეებისა და პროცესების სრულ გაციფრულებას.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto">
              <a
                href="#gateway"
                className="px-6 py-2.5 font-mono text-xs font-bold text-iron bg-emerald-core border border-emerald-core hover:bg-emerald-core/90 transition-all rounded"
              >
                REQUEST SYSTEM ACCESS
              </a>
              <button
                onClick={() => {
                  const evt = new CustomEvent("open-ghost-menu");
                  window.dispatchEvent(evt);
                }}
                className="px-6 py-2.5 font-mono text-xs font-bold text-emerald-core border border-emerald-core/20 hover:border-emerald-core bg-emerald-core/5 hover:bg-emerald-core/10 transition-all rounded cursor-pointer"
              >
                ENTER THE CORE
              </button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] text-silver-structure/40 tracking-wider">SCROLL_TO_SYSTEM_LAYERS</span>
            <svg className="w-4 h-4 text-emerald-core" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </>
      )}
    </section>
  );
}
