'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT_CONFIG } from '@/config/contact';

interface FooterNavGridProps {
  onCopy: (key: string, text: string) => void;
  copiedKey: string | null;
  onOpenCookiePrefs: () => void;
}

export const FooterNavGrid: React.FC<FooterNavGridProps> = ({
  onCopy,
  copiedKey,
  onOpenCookiePrefs,
}) => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const ecoLinks = [
    { label: t('footer_eco_b2b'), href: '/sports-os' },
    { label: t('footer_eco_app'), href: '#mobile' },
  ];

  const legalLinks = [
    { href: '/about', label: t('nav_about') || 'ჩვენ შესახებ', tag: '' },
    { href: '/privacy', label: t('privacy_title') || 'კონფიდენციალურობის პოლიტიკა', tag: '' },
    { href: '/terms', label: t('terms_title') || 'წესები და პირობები', tag: '' },
    { href: '/b2b-agreement', label: t('b2b_agreement_title') || 'B2B სალიცენზიო შეთანხმება', tag: 'SLA' },
    { href: '/cookie-policy', label: t('cookie_policy_title') || 'ქუქი-ფაილების პოლიტიკა', tag: '' },
  ];

  const handlePulse = (e: React.PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (!el || !el.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.animate(
      [
        { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.7), 0 0 0 0 rgba(0,0,0,0)' },
        { boxShadow: 'inset 0 1px 1px rgba(255,240,190,0.85), inset 0 -2px 4px rgba(0,0,0,0.7), 0 0 16px 2px rgba(212,175,55,0.5)', offset: 0.3 },
        { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.7), 0 0 0 0 rgba(0,0,0,0)' },
      ],
      { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  };

  const renderCopyTip = (key: string) => {
    if (copiedKey !== key) return null;
    return (
      <span
        role="status"
        className="absolute left-1/2 -top-8 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none px-2.5 py-0.5 rounded-full font-sans text-[11px] font-semibold text-[#6EE7B7] bg-[#061410]/95 border border-[#10B981]/50 shadow-[0_0_16px_-2px_rgba(16,185,129,0.45)] text-shadow animate-fade-in"
      >
        {t('footer_copied')}
      </span>
    );
  };

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 pt-6 md:pt-8 pb-8 md:pb-12">
      {/* Column 01: ეკოსისტემა (Ecosystem) */}
      <div
        data-reveal="rise"
        data-order="1"
        className="relative flex flex-col gap-3 md:pr-8 lg:pr-10"
      >
        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-xs text-[#A87B41] font-semibold tracking-wider">01</span>
          <span className="w-4 h-px bg-[#A87B41]" />
          <span className="text-sm font-bold text-white tracking-wide">{t('footer_col_eco')}</span>
        </div>

        <nav className="flex flex-col space-y-1">
          {ecoLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group min-h-[36px] flex items-center text-sm leading-snug text-[#CBD5E1] hover:text-white transition-all duration-300 relative pl-0 hover:pl-4 focus:outline-none focus:text-white"
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-[#10B981] to-[#059669] group-hover:w-3 transition-all duration-300" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Social Channels */}
        <div className="flex items-center gap-2.5 pt-3">
          <a
            href={CONTACT_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-rim="rect"
            onPointerDown={handlePulse}
            className="footer-social-btn select-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.745 1.637-1.558 3.37-1.558 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href={CONTACT_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            data-rim="rect"
            onPointerDown={handlePulse}
            className="footer-social-btn select-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50"
          >
            <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Column 02: სამართლებრივი (Legal) */}
      <div
        data-reveal="rise"
        data-order="2"
        className="relative flex flex-col gap-3 md:px-8 lg:px-10"
      >
        {/* Desktop Left Divider */}
        <span
          data-rim="v"
          aria-hidden="true"
          className="hidden md:block absolute left-0 top-6 bottom-6 w-px"
          style={{
            background:
              'linear-gradient(180deg,rgba(168,123,65,0) 0%,rgba(168,123,65,0.55) 25%,rgba(168,123,65,0.55) 75%,rgba(168,123,65,0) 100%)',
          }}
        />

        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-xs text-[#A87B41] font-semibold tracking-wider">02</span>
          <span className="w-4 h-px bg-[#A87B41]" />
          <span className="text-sm font-bold text-white tracking-wide">{t('footer_col_legal')}</span>
        </div>

        <nav className="flex flex-col space-y-1">
          {legalLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group min-h-[34px] flex items-center justify-between text-sm leading-snug transition-all duration-300 relative pl-0 hover:pl-4 focus:outline-none ${
                  isActive
                    ? 'text-[#00A3FF] font-semibold'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <span className="flex items-center">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-[#10B981] to-[#059669] group-hover:w-3 transition-all duration-300" />
                  <span>{item.label}</span>
                </span>
                {item.tag && (
                  <span className="font-mono text-[10px] tracking-wider text-[#94A3B8] group-hover:text-[#F3D98A] transition-colors">
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Delete Account & Manage Cookies Row */}
        <div
          data-rim="top"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 mt-1 border-t border-[#A87B41]/25"
        >
          <Link
            href="/delete-account"
            className="group min-h-[36px] flex items-center gap-2 text-xs md:text-[13px] text-[#94A3B8] hover:text-[#EC9C13] transition-colors duration-300 focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.6 5.2A9 9 0 1 0 20.3 15.4" strokeDasharray="3.2 1.6" />
              <circle cx="11" cy="9.6" r="2.7" />
              <path d="M6.4 17.4c1-2.3 2.7-3.5 4.6-3.5 1.4 0 2.6.6 3.5 1.7" />
              <circle cx="17.4" cy="12.2" r=".55" fill="currentColor" stroke="none" />
              <circle cx="19.6" cy="9.4" r=".45" fill="currentColor" stroke="none" opacity=".7" />
            </svg>
            <span>{t('footer_delete_account')}</span>
          </Link>

          <button
            onClick={onOpenCookiePrefs}
            className="group min-h-[36px] flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs md:text-[13px] text-[#94A3B8] hover:text-[#BAE6FD] transition-colors duration-300 focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2.8l7.6 2.9v5.6c0 4.8-3.2 8.6-7.6 10.1-4.4-1.5-7.6-5.3-7.6-10.1V5.7z" />
              <path d="M9.2 10.4a2.9 2.9 0 0 1 5.6 0v1.4c0 1.9-.6 3.4-1.6 4.6" />
              <path d="M12 10.9v1.2c0 1.6-.5 2.9-1.4 3.9" />
              <path d="M7.6 12.6v-2a4.4 4.4 0 0 1 7.4-3.2" opacity=".55" />
            </svg>
            <span>{t('footer_manage_cookies')}</span>
          </button>
        </div>
      </div>

      {/* Column 03: კონტაქტი & იურიდიული პირი (Contact & Legal Entity) */}
      <div
        data-reveal="rise"
        data-order="3"
        className="relative flex flex-col gap-3 md:pl-8 lg:pl-10"
      >
        {/* Desktop Left Divider */}
        <span
          data-rim="v"
          aria-hidden="true"
          className="hidden md:block absolute left-0 top-6 bottom-6 w-px"
          style={{
            background:
              'linear-gradient(180deg,rgba(168,123,65,0) 0%,rgba(168,123,65,0.55) 25%,rgba(168,123,65,0.55) 75%,rgba(168,123,65,0) 100%)',
          }}
        />

        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-xs text-[#A87B41] font-semibold tracking-wider">03</span>
          <span className="w-4 h-px bg-[#A87B41]" />
          <span className="text-sm font-bold text-white tracking-wide">
            {t('footer_col_legal_entity')}
          </span>
        </div>

        {/* Legal Entity Badge with Tax ID Copy */}
        <div
          data-rim="rect"
          className="relative self-start max-w-full flex items-center flex-wrap gap-2 px-3 py-1.5 rounded-lg border border-transparent text-xs"
          style={{
            background:
              'linear-gradient(180deg,#17140F,#0D0C0B) padding-box, linear-gradient(120deg,#A87B41 0%,#D4AF37 40%,#F3D98A 50%,#D4AF37 60%,#A87B41 100%) border-box',
            boxShadow: 'inset 0 1px 1px rgba(243,217,138,0.18)',
          }}
        >
          <span className="font-semibold text-[#F3D98A]">{t('footer_company_name')}</span>
          <span className="w-px h-3 bg-[#A87B41]" />
          <button
            onClick={() => onCopy('tax', '412799431')}
            aria-label="Copy Tax ID"
            title="Click to copy"
            className="relative p-0 border-none bg-transparent cursor-copy font-mono text-xs text-[#E6C868] hover:text-[#F3D98A] transition-colors focus:outline-none"
          >
            {t('footer_tax_id_label')} 412799431
            {renderCopyTip('tax')}
          </button>
        </div>

        {/* Address, Phone, Email details */}
        <div className="flex flex-col space-y-1.5 pt-1">
          {/* Location */}
          <div className="flex gap-3 items-baseline text-xs md:text-sm text-[#CBD5E1] py-1">
            <span className="shrink-0 w-10 font-mono text-[10px] tracking-wider text-[#94A3B8]">
              LOC
            </span>
            <span className="leading-relaxed">{t('footer_address')}</span>
          </div>

          {/* Telephone */}
          <a
            href={CONTACT_CONFIG.phone.dialUrl}
            className="min-h-[32px] flex items-center gap-3 font-mono text-xs md:text-sm text-white hover:text-[#93C5FD] transition-colors focus:outline-none"
          >
            <span className="w-10 text-[10px] tracking-wider text-[#94A3B8]">TEL</span>
            <span>{CONTACT_CONFIG.phone.display}</span>
          </a>

          {/* Email with 1-click copy */}
          <div className="min-h-[32px] flex items-center gap-3 font-mono text-xs md:text-sm">
            <span className="w-10 text-[10px] tracking-wider text-[#94A3B8]">MAIL</span>
            <button
              onClick={() => onCopy('mail', 'info@artron.ge')}
              aria-label="Copy Email"
              title="Click to copy"
              className="relative p-0 border-none bg-transparent cursor-copy text-white hover:text-[#93C5FD] transition-colors font-inherit focus:outline-none"
            >
              info@artron.ge
              {renderCopyTip('mail')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
