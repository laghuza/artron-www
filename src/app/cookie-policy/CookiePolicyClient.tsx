'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function CookiePolicyClient() {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec_desc', title: t('cookie_policy_sec_desc_title') },
    { id: 'sec_categories', title: t('cookie_policy_sec_categories_title') },
    { id: 'sec_consent', title: t('cookie_policy_sec_consent_title') },
    { id: 'sec_apple', title: t('cookie_policy_sec_apple_title') },
    { id: 'sec_manage', title: t('cookie_policy_sec_manage_title') },
  ];

  // Update document title for SEO & Browser tab
  useEffect(() => {
    document.title = `${t('cookie_policy_title')} | ARTRON`;
  }, [t]);

  return (
    <LegalLayout
      title={t('cookie_policy_title')}
      subtitle={t('cookie_policy_subtitle')}
      sections={sections}
    >
      <div className="space-y-12">
        <section id="sec_desc" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('cookie_policy_sec_desc_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('cookie_policy_sec_desc_body')}
          </p>
        </section>

        <section id="sec_categories" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('cookie_policy_sec_categories_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('cookie_policy_sec_categories_body')}
          </p>
        </section>

        <section id="sec_consent" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('cookie_policy_sec_consent_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('cookie_policy_sec_consent_body')}
          </p>
        </section>

        <section id="sec_apple" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('cookie_policy_sec_apple_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('cookie_policy_sec_apple_body')}
          </p>
        </section>

        <section id="sec_manage" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('cookie_policy_sec_manage_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('cookie_policy_sec_manage_body')}
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
