'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function PrivacyClient() {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec_operator', title: t('privacy_sec_operator_title') },
    { id: 'sec_roles', title: t('privacy_sec_roles_title') },
    { id: 'sec_security', title: t('privacy_sec_security_title') },
    { id: 'sec_biometrics', title: t('privacy_sec_biometrics_title') },
    { id: 'sec_erasure', title: t('privacy_sec_erasure_title') },
    { id: 'sec_rights', title: t('privacy_sec_rights_title') },
  ];

  // Update document title for SEO & Browser tab
  useEffect(() => {
    document.title = `${t('privacy_title')} | ARTRON`;
  }, [t]);

  return (
    <LegalLayout
      title={t('privacy_title')}
      subtitle={t('privacy_subtitle')}
      sections={sections}
    >
      <div className="space-y-12">
        <section id="sec_operator" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_operator_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_operator_body')}
          </p>
        </section>

        <section id="sec_roles" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_roles_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_roles_body')}
          </p>
        </section>

        <section id="sec_security" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_security_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_security_body')}
          </p>
        </section>

        <section id="sec_biometrics" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_biometrics_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_biometrics_body')}
          </p>
        </section>

        <section id="sec_erasure" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_erasure_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_erasure_body')}
          </p>
        </section>

        <section id="sec_rights" className="scroll-mt-32 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-2">
            {t('privacy_sec_rights_title')}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            {t('privacy_sec_rights_body')}
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
