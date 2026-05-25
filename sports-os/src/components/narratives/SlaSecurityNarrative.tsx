"use client";

import Link from "next/link";

export default function SlaSecurityNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-silver-structure/70 uppercase tracking-[0.15em]">
          [ NODE_08 // COMPLIANCE_AND_SECURITY ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          SECURITY & PRIVACY
        </h2>
      </div>

      {/* Shield Vector SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1.2] fill-none">
          {/* Shield outline */}
          <path d="M100 25 C130 25, 155 35, 155 35 C155 35, 155 90, 100 135 C45 90, 45 35, 45 35 C45 35, 70 25, 100 25 Z" />
          <path d="M100 32 C125 32, 147 41, 147 41 C147 41, 147 85, 100 126 C53 85, 53 41, 53 41 C53 41, 75 32, 100 32 Z" className="stroke-silver-structure/10" />

          {/* Core Check */}
          <path d="M75 75 L93 93 L125 58" className="stroke-emerald-core" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          <text x="75" y="148" className="fill-silver-structure/50 font-mono text-[5px] stroke-none">COMPLIANCE: GDPR SECURE</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        სერვისების SLA და პერსონალურ მონაცემთა დაცვის მკაცრი რეგულაციები. სისტემა სრულად შეესაბამება ISO 27001-ისა და GDPR-ის მოთხოვნებს.
      </p>

      <div className="flex gap-2 font-mono text-[11px]">
        <Link href="/sla" className="flex-1 py-1.5 bg-silver-structure/5 hover:bg-silver-structure/10 border border-silver-structure/15 text-center text-silver-structure hover:text-white rounded uppercase transition-colors">
          [ VIEW_SLA ]
        </Link>
        <Link href="/privacy" className="flex-1 py-1.5 bg-silver-structure/5 hover:bg-silver-structure/10 border border-silver-structure/15 text-center text-silver-structure hover:text-white rounded uppercase transition-colors">
          [ PRIVACY_TERMS ]
        </Link>
      </div>
    </div>
  );
}
