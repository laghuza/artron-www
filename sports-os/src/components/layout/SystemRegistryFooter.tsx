"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

interface SystemRegistryFooterProps {
  onDataPurgeTrigger?: () => void;
}

export default function SystemRegistryFooter({ onDataPurgeTrigger }: SystemRegistryFooterProps = {}) {
  const { t } = useI18n();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1A1D23]/90 backdrop-blur-[15px] border-t border-silver-structure/10 select-none z-50 transform translate-y-[calc(100%-24px)] hover:translate-y-0 transition-transform duration-500 ease-out group">
      {/* Drawer Handle Header */}
      <div className="h-6 w-full flex items-center justify-center border-b border-silver-structure/5 bg-iron/40 cursor-pointer group-hover:bg-iron-surface transition-colors">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-silver-structure/45 group-hover:text-emerald-core transition-colors">
          {t("system.hover_to_decrypt")}
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 p-6 md:p-8">
        {/* Block 01: Sovereign Registry */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ {t("system.sovereign_registry")} ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ CORPORATE_ENTITY ]:</span> ARTRON Consortium LLC</div>
            <div><span className="text-silver-structure/50">[ REGISTRY_CODE ]:</span> 405XXXXXX</div>
            <div className="space-y-1">
              <div className="text-[10px] tracking-widest text-[#9CA3AF]/40 uppercase">
                [ SYSTEM_PROTOCOLS ]:
              </div>
              <div className="grid grid-cols-[auto_auto] w-fit gap-x-6 gap-y-1 font-mono text-[10px] tracking-wider text-silver-structure/45 mt-1">
                <Link 
                  href="/privacy" 
                  className="hover:text-[#00E676] transition-colors duration-200 whitespace-nowrap block"
                >
                  [ {t("system.privacy")} ]
                </Link>
                <Link 
                  href="/terms" 
                  className="hover:text-[#00E676] transition-colors duration-200 whitespace-nowrap block"
                >
                  [ {t("system.terms")} ]
                </Link>
                <Link 
                  href="/sla" 
                  className="hover:text-[#00E676] transition-colors duration-200 whitespace-nowrap block"
                >
                  [ {t("system.sla")} ]
                </Link>
                <button 
                  onClick={onDataPurgeTrigger} 
                  className="hover:text-[#FF3D00] text-left transition-colors duration-200 cursor-pointer block whitespace-nowrap"
                >
                  [ {t("system.data_purge")} ]
                </button>
              </div>
            </div>
            <div><span className="text-silver-structure/50">[ COMPLIANCE ]:</span> GDPR · ISO 27001</div>
          </div>
        </div>

        {/* Block 02: Communication Nodes */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ COMMUNICATION_NODES ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ GENERAL ]:</span> office@artron.io</div>
            <div><span className="text-silver-structure/50">[ SECURITY ]:</span> security@artron.io</div>
            <div><span className="text-silver-structure/50">[ LEGAL ]:</span> legal@artron.io</div>
            <div><span className="text-silver-structure/50">[ DIRECT_ROUTE ]:</span> +995 (32) 2XX XX XX</div>
          </div>
        </div>

        {/* Block 03: Physical Hubs */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ PHYSICAL_NODES ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ TBILISI_HUB ]:</span> 12 Merab Kostava St, Tbilisi</div>
            <div><span className="text-silver-structure/50">[ OPERATING_HOURS ]:</span> 09:00 — 18:00 (GMT+4)</div>
            <div className="flex gap-3 pt-1 text-silver-structure/70">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.22.824-.867 1.47-1.69 1.69-1.498.403-7.5.807-7.5.807s-6.002-.404-7.5-.807c-.822-.22-1.47-.866-1.69-1.69-.403-1.498-.807-7.5-.807-7.5s.404-6.002.807-7.5c.22-.823.868-1.47 1.69-1.69 1.498-.403 7.5-.807 7.5-.807s6.002.404 7.5.807c.823.22 1.47.867 1.69 1.69.403 1.498.807 7.5.807 7.5s-.404 6.002-.807 7.5zm-14.498 9.837v-8l7 4-7 4z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Block 04: System Telemetry */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ SYSTEM_TELEMETRY ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div className="flex items-center gap-1.5">
              <span className="text-silver-structure/50">[ CORE_STATUS ]:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-core">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-core opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-core"></span>
                </span>
                LIVE
              </span>
            </div>
            <div><span className="text-silver-structure/50">[ NEXT_AUDIT ]:</span> 2026-11-01</div>
            <div><span className="text-silver-structure/50">[ CRYPTO_KEY ]:</span> PGP_KEY_ACTIVE</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
