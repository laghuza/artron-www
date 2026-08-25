import React, { Suspense } from 'react';
import FinancialAuditClient from './FinancialAuditClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'პერსონალური ფინანსური აუდიტი & P&L დიაგნოსტიკა | ARTRON',
  description: 'შეიყვანეთ თქვენი დარბაზის რეალური შემოსავლები და ხარჯები. სისტემა მომენტალურად დაითვლის თქვენს არსებულ სუფთა მოგებას და ARTRON-ის ავტომატიზაციით მიღებულ დამატებით ეკონომიკურ ეფექტს. 100% კონფიდენციალური და ლოკალური გათვლა.',
  alternates: {
    canonical: '/financial-audit',
  },
  openGraph: {
    title: 'პერსონალური ფინანსური აუდიტი & P&L დიაგნოსტიკა | ARTRON',
    description: 'შეიყვანეთ თქვენი დარბაზის რეალური შემოსავლები და ხარჯები. სისტემა მომენტალურად დაითვლის თქვენს არსებულ სუფთა მოგებას და ARTRON-ის ავტომატიზაციით მიღებულ დამატებით ეკონომიკურ ეფექტს.',
    url: 'https://www.artron.ge/financial-audit',
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080B10] flex items-center justify-center text-[#00A3FF] font-mono text-xs">
          INITIALIZING_FINANCIAL_AUDIT_STUDIO...
        </div>
      }
    >
      <FinancialAuditClient />
    </Suspense>
  );
}
