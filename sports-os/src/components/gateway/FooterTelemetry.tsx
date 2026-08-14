"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import Link from 'next/link';

export const FooterTelemetry: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1A1D23]/90 backdrop-blur-[15px] border-t border-[rgba(156,163,175,0.12)] select-none z-50 transform translate-y-[calc(100%-24px)] hover:translate-y-0 transition-transform duration-500 ease-out group">
      <div className="h-6 w-full flex items-center justify-center border-b border-[rgba(156,163,175,0.05)] bg-[#121418]/40 cursor-pointer group-hover:bg-[#121418] transition-colors">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#9CA3AF]/45 group-hover:text-[#00E676] transition-colors">
          {t('system.hover_to_decrypt')}
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 p-6 md:p-8 text-[13px] text-[#9CA3AF]">
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ {t('system.sovereign_registry')} ]</div>
          <div className="space-y-1.5 font-sans">
            <div><span className="text-[#9CA3AF]/50">[ {t('system.corporate_entity')} ]:</span> {t('system.corporate_entity_val')}</div>
            <div><span className="text-[#9CA3AF]/50">[ {t('system.registry_code')} ]:</span> {t('system.registry_code_val')}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ {t('system.system_protocols')} ]</div>
          <div className="space-y-1.5 font-sans">
            <div><span className="text-[#9CA3AF]/50">[ {t('system.general')} ]:</span> {t('system.general_email')}</div>
            <div className="flex gap-4 pt-1 font-mono text-[11px]">
              <Link href="/privacy" className="hover:text-[#00E676] underline transition-colors">[ {t('system.privacy')} ]</Link>
              <Link href="/terms" className="hover:text-[#00E676] underline transition-colors">[ {t('system.terms')} ]</Link>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] text-[#00E676] uppercase tracking-[0.2em]">[ {t('system.tbilisi_hub')} ]</div>
          <div className="space-y-1.5 font-sans">
            <div>{t('system.tbilisi_address')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
