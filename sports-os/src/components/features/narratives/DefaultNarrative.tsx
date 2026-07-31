"use client";

import ArtronLogo from "@/components/ui/ArtronLogo";

interface DefaultNarrativeProps {
  onRequestAccess: () => void;
}

export default function DefaultNarrative({ onRequestAccess }: DefaultNarrativeProps) {
  return (
    <div className="space-y-6 font-sans select-none animate-fadeIn">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ArtronLogo className="w-8 h-8" />
          <div className="font-mono text-[12px] text-emerald-core uppercase tracking-[0.15em]">
            [ SYSTEM // CORE_INIT ]
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase leading-none">
          ARTRON<br />
          SPORTS OS
        </h1>
        <p className="text-xs text-silver-structure/50 font-mono tracking-wider">
          სისტემური თვითორგანიზების პრინციპი.
        </p>
      </div>

      <div className="h-[1px] bg-silver-structure/10 w-full" />

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ართრონი არ არის უბრალოდ პლატფორმა. ეს არის სპორტული სექტორის ლიდერების (ფედერაციების, კლუბებისა და პროფესიონალების) ოპერაციული სისტემა. მართვა ხორციელდება ცენტრალური 9-კვანძიანი Ennea Core ბირთვის მეშვეობით.
      </p>

      <div className="pt-4">
        <button
          onClick={onRequestAccess}
          className="font-mono text-xs text-iron bg-emerald-core hover:bg-[#00F580] px-5 py-3 border border-emerald-core/80 rounded uppercase font-bold tracking-widest transition-all w-full text-center shadow-[0_0_15px_rgba(0,230,118,0.35),_inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5),_inset_0_1px_0_rgba(255,255,255,0.45)] cursor-pointer"
        >
          REQUEST SYSTEM ACCESS
        </button>
      </div>
    </div>
  );
}
