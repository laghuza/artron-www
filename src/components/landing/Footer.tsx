'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Mail, MapPin, Landmark, Info, ShieldCheck, FileText, FileCode, Cookie, UserX, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_CONFIG } from '@/config/contact';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const handleOpenCookiePrefs = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('artron-reopen-cookie-settings'));
  };

  const legalLinks = [
    { href: '/about', label: t('nav_about') || 'ჩვენ შესახებ', icon: Info },
    { href: '/privacy', label: t('privacy_title'), icon: ShieldCheck },
    { href: '/terms', label: t('terms_title'), icon: FileText },
    { href: '/b2b-agreement', label: t('b2b_agreement_title'), icon: FileCode },
    { href: '/cookie-policy', label: t('cookie_policy_title'), icon: Cookie },
    { href: '/delete-account', label: t('del_acc_title'), icon: UserX },
  ];

  return (
    <footer className="bg-[#070A0F] border-t border-white/10 text-[#94A3B8] relative z-10">
      {/* Upper Footer: Official Mobile App Badges & Store Review Availability */}
      <div className="border-b border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center lg:text-left space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 justify-center lg:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]"></span>
                </span>
                <span className="text-[11px] font-mono font-bold text-[#00ff87] tracking-wider uppercase">
                  {t('store_status_pill')}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                {t('store_b2c_desc')}
              </h3>
              <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed">
                {t('store_review_info')}
              </p>
            </div>
            <div className="shrink-0">
              <AppStoreBadges align="center" showIndicator={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer: Branding & Grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Branding & Intro */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-black text-lg tracking-tighter">
                A
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-wider">
                  {t('logo_text')}
                </span>
                <span className="block text-[10px] text-[#00A3FF] font-semibold uppercase tracking-wider">
                  {t('logo_sub')}
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>

            {/* Official Social Channels: LinkedIn & Facebook */}
            <div className="pt-2 flex flex-col space-y-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                {t('footer_social_follow')}
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={CONTACT_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ARTRON on LinkedIn"
                  title="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/60 hover:bg-[#00A3FF]/15 text-[#94A3B8] hover:text-[#00A3FF] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,163,255,0.25)] focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4.5 h-4.5"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={CONTACT_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ARTRON on Facebook"
                  title="Facebook"
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/60 hover:bg-[#00A3FF]/15 text-[#94A3B8] hover:text-[#00A3FF] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,163,255,0.25)] focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4.5 h-4.5"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Legal Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00A3FF]" />
              {t('footer_col_legal')}
            </h4>
            <ul className="space-y-1 text-xs md:text-sm">
              {legalLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group transition-all flex items-center gap-2.5 py-2 px-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00A3FF] ${
                        isActive
                          ? 'text-[#00A3FF] bg-[#00A3FF]/10 font-bold border border-[#00A3FF]/25 shadow-[inset_0_0_8px_rgba(0,163,255,0.1)]'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#00A3FF]' : 'text-[#64748B] group-hover:text-[#00A3FF]'}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={handleOpenCookiePrefs}
                  className="w-full text-left group hover:text-white hover:bg-white/[0.04] text-[#94A3B8] transition-all flex items-center gap-2.5 py-2 px-2.5 rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#64748B] group-hover:text-[#00A3FF] transition-colors" />
                  <span>{t('footer_cookie_prefs')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Company ID */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer_col_contact')}
            </h4>
            <ul className="space-y-3.5 text-xs md:text-sm">
              <li className="flex items-start gap-2.5">
                <Landmark className="w-4.5 h-4.5 text-[#00A3FF] mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {t('footer_company_id')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#00A3FF] mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {t('footer_address')}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#00A3FF] shrink-0" />
                <a
                  href={CONTACT_CONFIG.phone.dialUrl}
                  className="hover:text-[#00A3FF] transition-all py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded font-mono"
                  style={{ minHeight: '44px' }}
                >
                  {CONTACT_CONFIG.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-[#00A3FF] shrink-0" />
                <a
                  href="mailto:info@artron.ge"
                  className="hover:text-[#00A3FF] transition-all py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  info@artron.ge
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Footer: Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] md:text-xs">
          <p className="text-[#64748B]">
            &copy; 2026 {t('logo_text')}. {t('footer_all_rights')}
          </p>
          <div className="flex items-center gap-4 text-[#64748B]">
            <span>Georgia / Kutaisi</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
