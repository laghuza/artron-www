'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function B2BAgreementClient() {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec_scope', title: t('b2b_sec_scope_title') },
    { id: 'sec_sla', title: t('b2b_sec_sla_title') },
    { id: 'sec_pricing', title: t('b2b_sec_pricing_title') },
    { id: 'sec_labor', title: t('b2b_sec_labor_title') },
    { id: 'sec_dpa', title: t('b2b_sec_dpa_title') },
    { id: 'sec_termination', title: t('b2b_sec_termination_title') },
  ];

  // Update browser tab title dynamically for SEO and UX consistency
  useEffect(() => {
    document.title = `${t('b2b_agreement_title')} | ARTRON`;
  }, [t]);

  return (
    <LegalLayout
      title={t('b2b_agreement_title')}
      subtitle={t('b2b_agreement_subtitle')}
      sections={sections}
    >
      <div className="space-y-12">
        {/* Section 1: Scope of Service */}
        <section id="sec_scope" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_scope_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_scope_body')}
          </p>
        </section>

        {/* Section 2: SLA & Uptime Guarantee */}
        <section id="sec_sla" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_sla_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_sla_body')}
          </p>
        </section>

        {/* Section 3: Pricing Tiers & Subscription Billing */}
        <section id="sec_pricing" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_pricing_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_pricing_body')}
          </p>
        </section>

        {/* Section 4: Labor Inspection Order №01-15/ნ */}
        <section id="sec_labor" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_labor_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_labor_body')}
          </p>
        </section>

        {/* Section 5: Data Processing Agreement & Encryption */}
        <section id="sec_dpa" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_dpa_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_dpa_body')}
          </p>
        </section>

        {/* Section 6: Termination, Data Offboarding & Archival */}
        <section id="sec_termination" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('b2b_sec_termination_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('b2b_sec_termination_body')}
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
