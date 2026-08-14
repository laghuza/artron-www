'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Mail, MapPin, Landmark, Info } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleOpenCookiePrefs = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('artron-reopen-cookie-settings'));
  };

  return (
    <footer className="bg-[#070A0F] border-t border-white/10 text-[#94A3B8] relative z-10">
      {/* Upper Footer: Branding & Grids */}
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
          </div>

          {/* Column 2: Legal Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer_col_legal')}
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded font-medium"
                  style={{ minHeight: '44px' }}
                >
                  <Info className="w-4 h-4 text-[#00A3FF]" />
                  {t('about_title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('privacy_title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('terms_title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b-agreement"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('b2b_agreement_title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('cookie_policy_title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/delete-account"
                  className="hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('del_acc_title')}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleOpenCookiePrefs}
                  className="w-full text-left hover:text-[#00A3FF] transition-all flex items-center gap-2 py-2 px-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded"
                  style={{ minHeight: '44px' }}
                >
                  <Shield className="w-4 h-4 text-[#00A3FF]" />
                  {t('footer_cookie_prefs')}
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
