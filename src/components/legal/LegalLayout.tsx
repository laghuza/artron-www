'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Cpu, Globe, ArrowLeft, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';

interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  subtitle,
  sections,
  children,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121b2d] via-[#0B0F17] to-[#080b11] text-white flex flex-col overflow-x-hidden font-sans selection:bg-[#00A3FF]/30 selection:text-white">
      
      {/* Background Neon Grid Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Sticky Header */}
      <Header isSticky={true} />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10 flex flex-col">
        
        {/* Back navigation & Page title */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] hover:text-[#00A3FF] transition-all group mb-6 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00A3FF]/30 hover:bg-[#00A3FF]/5 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50"
            style={{ minHeight: '44px' }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t('legal_back_to_home')}</span>
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#94A3B8]">
              {t('legal_last_updated')}
            </span>
          </div>
        </div>

        {/* Legal Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start flex-grow">
          
          {/* Sidebar TOC (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start bg-[#121722]/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xs uppercase font-extrabold text-white tracking-widest mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
              <Menu className="w-3.5 h-3.5 text-[#00A3FF]" />
              {t('legal_toc_title')}
            </h2>
            <nav className="flex flex-col space-y-1" aria-label="Table of contents">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left text-xs font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer block border focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/30 ${
                    activeSection === sec.id
                      ? 'bg-[#00A3FF]/10 border-[#00A3FF]/30 text-[#00A3FF] font-bold shadow-[inset_0_0_8px_rgba(0,163,255,0.15)] shadow-[#00A3FF]/5'
                      : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Sticky TOC (Mobile Collapsible Dropdown) */}
          <div className="lg:hidden w-full sticky top-[65px] sm:top-[81px] z-30 mb-2">
            <div className="bg-[#121722]/90 border border-white/10 rounded-xl backdrop-blur-md shadow-xl overflow-hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold text-white cursor-pointer focus:outline-none"
                style={{ minHeight: '44px' }}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation sections"
              >
                <span className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#00A3FF]" />
                  <span>{t('legal_toc_title')}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-[#00A3FF] bg-[#00A3FF]/10 px-2.5 py-1 rounded border border-[#00A3FF]/20 font-bold max-w-[180px] truncate">
                    {sections.find(s => s.id === activeSection)?.title || sections[0]?.title}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {isMobileMenuOpen && (
                <div className="border-t border-white/10 max-h-60 overflow-y-auto bg-[#0B0F17]/95">
                  <nav className="p-2 flex flex-col space-y-1">
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`text-left text-xs font-semibold p-3 rounded-lg transition-all cursor-pointer block ${
                          activeSection === sec.id
                            ? 'bg-[#00A3FF]/10 text-[#00A3FF] font-bold'
                            : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        {sec.title}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>

          {/* Legal Document Content */}
          <article className="lg:col-span-9 bg-[#121722]/40 border border-white/5 rounded-2xl p-6 sm:p-10 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00A3FF]/10 to-transparent rounded-bl-full pointer-events-none opacity-50 blur-3xl"></div>
            
            {/* The actual structured document content */}
            <div className="prose prose-invert max-w-none text-[#94A3B8] text-sm sm:text-base leading-relaxed space-y-8">
              {children}
            </div>

            {/* Official Identifier block */}
            <div className="mt-12 pt-8 border-t border-white/10 text-xs sm:text-sm text-[#64748B] flex flex-col gap-4">
              <p className="leading-relaxed bg-white/5 border border-white/10 rounded-xl p-4 text-center sm:text-left text-[#94A3B8] font-medium max-w-4xl mx-auto sm:mx-0 shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]">
                {t('legal_official_identifier')}
              </p>
            </div>
          </article>
        </div>
      </main>

      {/* Copy-pasted minimalist footer for compliance */}
      <footer className="bg-[#070A0F] border-t border-white/10 text-[#94A3B8] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#64748B]">
            &copy; 2026 {t('logo_text')}. {t('footer_all_rights')}
          </p>
          <div className="flex items-center gap-4 text-[#64748B]">
            <span>Georgia / Kutaisi</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
