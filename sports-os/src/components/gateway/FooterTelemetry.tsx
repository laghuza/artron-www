"use client";

import React from 'react';
import Link from 'next/link';

export const FooterTelemetry: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1A1D23]/90 backdrop-blur-[15px] border-t border-[rgba(156,163,175,0.12)] select-none z-50 transform translate-y-[calc(100%-24px)] hover:translate-y-0 transition-transform duration-500 ease-out group">
      <div className="h-6 w-full flex items-center justify-center border-b border-[rgba(156,163,175,0.05)] bg-[#121418]/40 cursor-pointer group-hover:bg-[#121418] transition-colors">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#9CA3AF]/45 group-hover:text-[#00E676] transition-colors">
          [ SYSTEM REUSE REGISTRY — HOVER TO DECRYPT ]
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 p-6 md:p-8 text-[13px] text-[#9CA3AF]">
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ SOVEREIGN_REGISTRY ]</div>
          <div className="space-y-1.5 font-sans">
            <div><span className="text-[#9CA3AF]/50">[ CORPORATE_ENTITY ]:</span> ARTRON Consortium LLC</div>
            <div><span className="text-[#9CA3AF]/50">[ REGISTRY_CODE ]:</span> 405XXXXXX</div>
            <div>
              <span className="text-[#9CA3AF]/50">[ SYSTEM_PROTOCOLS ]:</span>{' '}
              <Link href="/sla" className="hover:text-[#00E676] underline transition-colors">[ SLA ]</Link>{' '}
              <Link href="/privacy" className="hover:text-[#00E676] underline transition-colors">[ PRIVACY ]</Link>
            </div>
            <div><span className="text-[#9CA3AF]/50">[ COMPLIANCE ]:</span> GDPR · ISO 27001</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ COMMUNICATION_NODES ]</div>
          <div className="space-y-1.5 font-sans">
            <div><span className="text-[#9CA3AF]/50">[ GENERAL ]:</span> office@artron.io</div>
            <div><span className="text-[#9CA3AF]/50">[ SECURITY ]:</span> security@artron.io</div>
            <div><span className="text-[#9CA3AF]/50">[ LEGAL ]:</span> legal@artron.io</div>
            <div><span className="text-[#9CA3AF]/50">[ DIRECT_ROUTE ]:</span> +995 (32) 2XX XX XX</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ PHYSICAL_NODES ]</div>
          <div className="space-y-1.5 font-sans">
            <div><span className="text-[#9CA3AF]/50">[ TBILISI_HUB ]:</span> 12 Merab Kostava St, Tbilisi</div>
            <div><span className="text-[#9CA3AF]/50">[ OPERATING_HOURS ]:</span> 09:00 — 18:00 (GMT+4)</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ SYSTEM_TELEMETRY ]</div>
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5">
              <span className="text-[#9CA3AF]/50">[ CORE_STATUS ]:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#00E676]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]" />
                </span>
                LIVE
              </span>
            </div>
            <div><span className="text-[#9CA3AF]/50">[ NEXT_AUDIT ]:</span> 2026-11-01</div>
            <div><span className="text-[#9CA3AF]/50">[ CRYPTO_KEY ]:</span> PGP_KEY_ACTIVE</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

