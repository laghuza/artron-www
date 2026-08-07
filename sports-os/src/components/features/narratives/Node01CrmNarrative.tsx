"use client";

import { useState, useEffect } from "react";
import { Users, Building2, Trophy, Crown, ShieldCheck, ArrowLeft, ChevronDown, CheckCircle2, Shield, Zap } from "lucide-react";
import { audioManager } from "@/lib/audioManager";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";
import { CrmSubItem, Node01CrmData } from "@/types/node-content";

const ITEM_ICONS: Record<string, typeof Users> = {
  hierarchy: Users, corporate: Building2, pro_vs_amateur: Trophy, vip_guests: Crown, medical_compliance: ShieldCheck,
};

const FALLBACK_SUB_ITEMS: CrmSubItem[] = [
  { id: "hierarchy", label: "1. მრავალ-პროფილიანი იერარქია", functional_desc: "მშობლების, შვილებისა და ოჯახის წევრების ერთიანი ანგარიშები.", permissions: "Parent Guardians: Full CRUD | Dependents: Read-Only", business_value: "ზრდის ოჯახური აბონემენტების გაყიდვებს 35%-ით." },
  { id: "corporate", label: "2. კორპორატიული ჯგუფები", functional_desc: "კომპანიების თანამშრომლების ჯგუფური ბილინგი და დაჯავშნა.", permissions: "Corporate HR Admin: Team Manage | Members: Personal Access", business_value: "B2B კონვერსიების გაუმჯობესება და ავტომატური ინვოისინგი." },
  { id: "pro_vs_amateur", label: "3. პროფესიონალი vs მოყვარული", functional_desc: "სპორტული ლიგების, რეიტინგებისა და ტელემეტრიის სეგმენტაცია.", permissions: "Athletic Admin: Level Override | Athlete: Self Metrics", business_value: "პრო-ათლეტების ლოიალობის ზრდა და პერსონალიზებული ტარიფები." },
  { id: "vip_guests", label: "4. VIP წევრები & სტუმრები", functional_desc: "სპეციალური წვდომის ზონები, fast-track ტურნიკეტები და სტუმრები.", permissions: "VIP Concierge: Guest Pass | System Purge: 14 Days", business_value: "მაღალი შემოსავლის კლიენტების პრემიუმ გამოცდილება." },
  { id: "medical_compliance", label: "5. სამედიცინო & იურიდიული შესაბამისობა", functional_desc: "ჯანმრთელობის ცნობების, ფორმა 100-ის და COPPA დაცვა.", permissions: "Medical Staff: Encrypted Read | Standard Admin: No Access", business_value: "100% იურიდიული უსაფრთხოება და ავტომატური 14-დღიანი Data Purge." }
];

interface Node01CrmNarrativeProps { onBack: () => void; onSelectSubItem?: (item: CrmSubItem | null) => void; selectedSubId?: string | null; }

export default function Node01CrmNarrative({ onBack, onSelectSubItem, selectedSubId }: Node01CrmNarrativeProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const crmData = (typeof t("node_01_crm") === "object" ? t("node_01_crm") : null) as Node01CrmData | null;
  const [activeId, setActiveId] = useState<string | null>(orchestrator?.activeSubModuleId || selectedSubId || null);

  useEffect(() => { setActiveId(selectedSubId !== undefined ? selectedSubId : (orchestrator?.activeSubModuleId || null)); }, [selectedSubId, orchestrator?.activeSubModuleId]);

  const handleSelect = (item: CrmSubItem) => {
    audioManager.playClick();
    const nextId = activeId === item.id ? null : item.id;
    setActiveId(nextId);
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule(nextId);
    if (onSelectSubItem) onSelectSubItem(nextId ? item : null);
  };

  const handleReset = () => {
    audioManager.playClick();
    setActiveId(null);
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule(null);
    if (onSelectSubItem) onSelectSubItem(null);
    onBack();
  };

  const subItems = (crmData?.sub_items && Array.isArray(crmData.sub_items) && crmData.sub_items.length > 0) ? crmData.sub_items : FALLBACK_SUB_ITEMS;

  return (
    <div className="box-border bg-[rgba(26,29,35,0.5)] border border-[rgba(156,163,175,0.15)] rounded-md p-4 space-y-4 font-sans select-none animate-fadeIn w-full">
      {/* Header & Short Description inside 40% panel */}
      <div className="space-y-1.5 border-b border-[rgba(156,163,175,0.15)] pb-3">
        <div className="font-mono text-[10px] text-[#40916C] uppercase tracking-[0.18em] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
          [ NODE_01 // ARTRON_CRM ]
        </div>
        <h2 className="text-base font-medium tracking-tight text-[#F5F5F3] uppercase leading-snug flex items-center gap-2">
          <Users className="w-4 h-4 text-[#52B788] shrink-0" />
          <span>{crmData?.title || "360° ATHLETE PROFILE & LEGAL COMPLIANCE"}</span>
        </h2>
        <p className="text-[12px] text-[#9CA3AF] leading-relaxed pt-1 font-sans">
          {crmData?.short_desc || "Artron CRM არის მრავალშრიანი, დინამიური ათლეტური ბაზა სამედიცინო ვალიდურობითა და RLS უსაფრთხოებით."}
        </p>
      </div>

      {/* 5 Accordion Cards with Expanded 3-Part Details inside 40% panel */}
      <div className="space-y-2 box-border">
        {subItems.map((item, idx) => {
          const isSelected = activeId === item.id;
          const IconComponent = ITEM_ICONS[item.id] || Users;
          const cleanLabel = item.label.replace(/^\d+\.\s*/, "");

          return (
            <div key={item.id} className="box-border border border-[rgba(156,163,175,0.15)] rounded-md overflow-hidden transition-colors bg-[#1A1D23]/60">
              <button
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  isSelected ? "bg-[#40916C]/15 text-[#F5F5F3]" : "hover:bg-[#1A1D23] text-[#9CA3AF] hover:text-[#F5F5F3]"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[10px] text-[#52B788] font-bold">0{idx + 1} //</span>
                  <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#52B788]" : "text-[#9CA3AF]"}`} />
                  <span className={`text-[12.5px] font-medium truncate ${isSelected ? "text-[#F5F5F3]" : ""}`}>{cleanLabel}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isSelected ? "rotate-180 text-[#52B788]" : "text-[#6B7280]"}`} />
              </button>

              {/* 3-Part Details Expanded inside 40% panel */}
              {isSelected && (
                <div className="p-3 border-t border-[rgba(156,163,175,0.15)] bg-[#121418]/80 space-y-2.5 font-sans text-[11.5px] box-border animate-fadeIn">
                  <div className="space-y-1">
                    <div className="font-mono text-[9.5px] uppercase text-[#52B788] flex items-center gap-1 font-semibold">
                      <Zap className="w-3 h-3" /> FUNCTIONAL ARCHITECTURE
                    </div>
                    <p className="text-[#F5F5F3] leading-relaxed pl-4">{item.functional_desc || "ლოგიკური არქიტექტურა და სისტემური ფუნქციონალი."}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[9.5px] uppercase text-[#D4A373] flex items-center gap-1 font-semibold">
                      <Shield className="w-3 h-3" /> RLS & PERMISSIONS
                    </div>
                    <p className="text-[#9CA3AF] leading-relaxed pl-4 font-mono text-[10.5px]">{item.permissions || "Row-Level Security policy enabled."}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[9.5px] uppercase text-[#8E7DBE] flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> BUSINESS VALUE
                    </div>
                    <p className="text-[#9CA3AF] leading-relaxed pl-4">{item.business_value || "ბიზნესის ეფექტურობა და ავტომატიზაცია."}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-1 flex items-center justify-between border-t border-[rgba(156,163,175,0.15)]">
        <button
          onClick={handleReset}
          className="font-mono text-[10px] text-[#52B788] hover:text-[#F5F5F3] transition-colors flex items-center gap-1.5 border border-[#40916C]/30 hover:border-[#52B788] px-3 py-1.5 rounded cursor-pointer bg-[#40916C]/10 group uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#52B788] group-hover:-translate-x-0.5 transition-transform" />
          <span>{crmData?.back_button || "[ RESET ]"}</span>
        </button>
      </div>
    </div>
  );
}
