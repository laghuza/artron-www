import React from "react";
import Link from "next/link";
import ArtronLogo from "@/components/ui/ArtronLogo";
import ScanLine from "@/components/ui/ScanLine";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#05070a] text-white font-mono flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      <ScanLine trigger={0} />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top / Bottom Metadata Header */}
      <div className="absolute top-8 left-8 text-xs text-[#00e5ff]/60 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
        HUD_ROUTER // NODE_NOT_FOUND
      </div>
      <div className="absolute bottom-8 left-8 text-xs text-[#9CA3AF]/40">
        HTTP_STATUS_CODE // 404_RESOURCE_UNREACHABLE
      </div>

      {/* Main 404 HUD Console */}
      <div className="relative z-10 max-w-lg w-full bg-[#0a0f16]/90 border border-[#00e5ff]/30 rounded-xl p-8 text-center shadow-[0_0_50px_rgba(0,229,255,0.15)] backdrop-blur-md">
        <div className="flex justify-center mb-4">
          <div className="relative p-4 rounded-full bg-[#05070a] border border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <ArtronLogo className="w-12 h-12" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] via-[#00e5ff] to-white tracking-widest mb-2">
          404
        </h1>

        <h2 className="text-sm font-bold text-[#00e5ff] tracking-widest uppercase mb-4">
          ROUTING FAULT: ENNEACORE NODE DISCONNECTED
        </h2>

        <p className="text-xs text-[#9CA3AF] leading-relaxed mb-8">
          The requested path or telemetry node is not registered within the Artron Multi-Tenant Mesh.
          The node may have been purged or relocated.
        </p>

        {/* Dynamic EnneaCore Fallback Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-[#05070a] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_25px_rgba(0,255,135,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
