import React from "react";
import Link from "next/link";
import ArtronLogo from "@/components/ui/ArtronLogo";
import ScanLine from "@/components/ui/ScanLine";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#121418] text-[#F5F5F3] font-mono flex flex-col items-center justify-center p-6 overflow-hidden select-none schematic-grid">
      <ScanLine trigger={0} />

      {/* Header Metadata */}
      <div className="absolute top-8 left-8 text-xs text-[#9CA3AF] tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
        HUD_ROUTER // NODE_NOT_FOUND
      </div>
      <div className="absolute bottom-8 left-8 text-xs text-[#6B7280]">
        HTTP_STATUS_CODE // 404_RESOURCE_UNREACHABLE
      </div>

      {/* Main 404 HUD Console */}
      <div className="relative z-10 max-w-lg w-full bg-[#1A1D23]/90 border border-[#9CA3AF]/18 rounded-md p-8 text-center shadow-[0_0_8px_rgba(0,230,118,0.12)] backdrop-blur-md">
        <div className="flex justify-center mb-4">
          <div className="relative p-3 rounded-md bg-[#121418] border border-[#9CA3AF]/18">
            <ArtronLogo className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-5xl font-semibold text-[#F5F5F3] tracking-widest mb-2">
          404
        </h1>

        <h2 className="text-xs font-medium text-[#00E676] tracking-widest uppercase mb-4">
          ROUTING FAULT: ENNEACORE NODE DISCONNECTED
        </h2>

        <p className="text-xs text-[#9CA3AF] leading-relaxed mb-8 font-sans">
          The requested path or telemetry node is not registered within the Artron Multi-Tenant Mesh.
          The node may have been purged or relocated.
        </p>

        {/* Dynamic EnneaCore Fallback Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-[#00E676] hover:bg-[#00E676]/90 text-[#121418] font-medium text-xs uppercase tracking-widest rounded-sm shadow-[0_0_8px_rgba(0,230,118,0.12)] transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          ENNEACORE RE-ROUTE TO GATEWAY
        </Link>
      </div>
    </div>
  );
}
