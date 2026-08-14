'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function TermsClient() {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec_license', title: t('terms_sec_license_title') },
    { id: 'sec_security', title: t('terms_sec_security_title') },
    { id: 'sec_refunds', title: t('terms_sec_refunds_title') },
    { id: 'sec_offboarding', title: t('terms_sec_offboarding_title') },
    { id: 'sec_liability', title: t('terms_sec_liability_title') },
  ];

  // Update document title for SEO & Browser tab
  useEffect(() => {
    document.title = `${t('terms_title')} | ARTRON`;
  }, [t]);

  return (
    <LegalLayout
      title={t('terms_title')}
      subtitle={t('terms_subtitle')}
      sections={sections}
    >
      <div className="space-y-12">
        <section id="sec_license" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('terms_sec_license_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('terms_sec_license_body')}
          </p>
        </section>

        <section id="sec_security" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('terms_sec_security_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('terms_sec_security_body')}
          </p>
        </section>

        <section id="sec_refunds" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('terms_sec_refunds_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('terms_sec_refunds_body')}
          </p>
        </section>

        <section id="sec_offboarding" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('terms_sec_offboarding_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('terms_sec_offboarding_body')}
          </p>
        </section>

        <section id="sec_liability" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('terms_sec_liability_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('terms_sec_liability_body')}
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
