'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { AccountDeletionForm } from '@/components/legal/AccountDeletionForm';

export default function DeleteAccountClient() {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec_overview', title: t('del_acc_sec_overview_title') },
    { id: 'sec_protocol', title: t('del_acc_sec_protocol_title') },
    { id: 'sec_form', title: t('del_acc_sec_form_title') },
  ];

  // Update browser tab title dynamically for SEO and UX consistency
  useEffect(() => {
    document.title = `${t('del_acc_title')} | ARTRON`;
  }, [t]);

  return (
    <LegalLayout
      title={t('del_acc_title')}
      subtitle={t('del_acc_subtitle')}
      sections={sections}
    >
      <div className="space-y-12">
        {/* Section 1: Overview & Regulatory Compliance */}
        <section id="sec_overview" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('del_acc_sec_overview_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('del_acc_sec_overview_body')}
          </p>
        </section>

        {/* Section 2: Two-Phase Deletion Protocol */}
        <section id="sec_protocol" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('del_acc_sec_protocol_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] whitespace-pre-line">
            {t('del_acc_sec_protocol_body')}
          </p>
        </section>

        {/* Section 3: Deletion Request Form */}
        <section id="sec_form" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('del_acc_sec_form_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] mb-6">
            {t('del_acc_sec_form_body')}
          </p>
          <div className="mt-6">
            <AccountDeletionForm />
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
