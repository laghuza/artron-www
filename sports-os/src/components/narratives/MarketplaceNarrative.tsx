"use client";

export default function MarketplaceNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_06 // MODULE_MARKETPLACE ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          SYSTEM MARKETPLACE
        </h2>
      </div>

      {/* Marketplace modular boxes SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Module 1 */}
          <rect x="25" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80" strokeWidth="1.2" />
          <text x="32" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none">[ MOD_SCHEDULING ]</text>
          <line x1="85" y1="50" x2="115" y2="50" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />

          {/* Module 2 */}
          <rect x="115" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80" strokeWidth="1.2" />
          <text x="122" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none">[ MOD_FINANCIAL ]</text>

          {/* Module 3 */}
          <rect x="70" y="95" width="60" height="40" rx="3" className="stroke-gold-raw/85" strokeWidth="1.5" />
          <text x="77" y="110" className="fill-gold-raw font-mono text-[5px] stroke-none">[ CORE_TELEMETRY ]</text>
          
          {/* Pin connections */}
          <circle cx="85" cy="50" r="2.5" className="fill-gold-raw" />
          <circle cx="115" cy="50" r="2.5" className="fill-gold-raw" />
          <path d="M55 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
          <path d="M145 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        დამატებითი ფუნქციონალური მოდულების მაღაზია. მყისიერი ინტეგრაცია (Plug-and-Play) საინსტიტუციო განრიგებისთვის, ონლაინ გადახდებისთვის და უსაფრთხოების კარიბჭეებისთვის.
      </p>
    </div>
  );
}
