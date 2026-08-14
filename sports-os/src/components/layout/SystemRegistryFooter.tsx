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

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 p-6 md:p-8">
        {/* Block 01: Sovereign Registry */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ {t("system.sovereign_registry")} ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ {t("system.corporate_entity")} ]:</span> {t("system.corporate_entity_val")}</div>
            <div><span className="text-silver-structure/50">[ {t("system.registry_code")} ]:</span> {t("system.registry_code_val")}</div>
          </div>
        </div>

        {/* Block 02: Contact & Legal Links */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ {t("system.system_protocols")} ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ {t("system.general")} ]:</span> {t("system.general_email")}</div>
            <div className="flex gap-4 pt-1 font-mono text-[11px] text-silver-structure/45">
              <Link href="/privacy" className="hover:text-[#00E676] underline transition-colors duration-200">[ {t("system.privacy")} ]</Link>
              <Link href="/terms" className="hover:text-[#00E676] underline transition-colors duration-200">[ {t("system.terms")} ]</Link>
            </div>
          </div>
        </div>

        {/* Block 03: Address */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ {t("system.tbilisi_hub")} ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div>{t("system.tbilisi_address")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
