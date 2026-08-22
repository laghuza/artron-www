'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowLeft, 
  Menu, 
  ChevronDown, 
  ShieldCheck, 
  FileText, 
  FileCode, 
  Cookie, 
  UserX, 
  Info,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/landing/Footer';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';

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
  const { t } = useLanguage();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Legal documents list for quick navigation
  const legalDocs = [
    { href: '/privacy', label: t('privacy_title') || 'კონფიდენციალურობის პოლიტიკა', icon: ShieldCheck },
    { href: '/terms', label: t('terms_title') || 'მომსახურების პირობები', icon: FileText },
    { href: '/b2b-agreement', label: t('b2b_agreement_title') || 'B2B სალიცენზიო ხელშეკრულება (MSA)', icon: FileCode },
    { href: '/cookie-policy', label: t('cookie_policy_title') || 'ქუქი-ფაილების პოლიტიკა', icon: Cookie },
    { href: '/delete-account', label: t('del_acc_title') || 'ანგარიშის წაშლა', icon: UserX },
    { href: '/about', label: t('nav_about') || 'ჩვენ შესახებ', icon: Info },
  ];

  // Track scroll position for active section & reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(Math.round(progress));
      }

      const scrollPosition = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const activeIndex = sections.findIndex(s => s.id === activeSection);
  const currentSectionNum = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#00A3FF]/30 selection:text-white relative">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#00A3FF]/[0.08] via-blue-600/[0.03] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-cyan-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Cyber Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Sticky Top Header */}
      <Header isSticky={true} />

      {/* Reading Progress Top Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00D2FF] transition-all duration-150 ease-out shadow-[0_0_10px_#00A3FF]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 flex flex-col">
        
        {/* Breadcrumb & Document Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] hover:text-[#00A3FF] transition-all group px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/40 hover:bg-[#00A3FF]/10 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50"
              style={{ minHeight: '44px' }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t('legal_back_to_home')}</span>
            </Link>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-medium font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                STATUS: OFFICIAL & VERIFIED
              </span>
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#94A3B8] font-mono">
                {t('legal_last_updated')}
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Legal Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start flex-grow">
          
          {/* Sidebar TOC (Desktop - Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start space-y-4 max-h-[calc(100vh-130px)] overflow-y-auto pr-1">
            
            {/* Table of Contents Card */}
            <div className="bg-[#0F141C]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#00A3FF]" />
                  <span className="text-xs uppercase font-extrabold text-white tracking-wider font-mono">
                    {t('legal_toc_title')}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20 font-bold">
                  {currentSectionNum} / {sections.length}
                </span>
              </div>

              <nav className="flex flex-col space-y-1.5" aria-label="Table of contents">
                {sections.map((sec, idx) => {
                  const isCurrent = activeSection === sec.id;
                  const numStr = (idx + 1).toString().padStart(2, '0');

                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`group w-full text-left text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 border focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/40 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-[#00A3FF]/15 to-transparent border-[#00A3FF]/40 text-[#00A3FF] font-bold shadow-[inset_0_0_12px_rgba(0,163,255,0.15)] translate-x-1'
                          : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                        isCurrent 
                          ? 'bg-[#00A3FF] text-[#080B10] border-[#00A3FF] font-bold' 
                          : 'bg-white/5 border-white/10 text-[#64748B] group-hover:text-white group-hover:border-white/20'
                      }`}>
                        {numStr}
                      </span>
                      <span className="truncate flex-grow leading-tight">
                        {sec.title}
                      </span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Legal Docs Navigator */}
            <div className="bg-[#0F141C]/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#64748B] block mb-2.5 px-1 font-bold">
                {t('footer_col_legal') || 'იურიდიული დოკუმენტები'}
              </span>
              <div className="grid grid-cols-1 gap-1">
                {legalDocs.map((doc) => {
                  const isCurrentPage = pathname === doc.href;
                  const Icon = doc.icon;
                  return (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        isCurrentPage
                          ? 'bg-[#00A3FF]/15 text-[#00A3FF] font-bold border border-[#00A3FF]/30'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.03]'
                      }`}
                      style={{ minHeight: '40px' }}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCurrentPage ? 'text-[#00A3FF]' : 'text-[#64748B]'}`} />
                      <span className="truncate">{doc.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Sticky TOC (Mobile Dropdown Header) */}
          <div className="lg:hidden w-full sticky top-[72px] sm:top-[88px] z-30 mb-4">
            <div className="bg-[#0F141C]/95 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm font-bold text-white cursor-pointer focus:outline-none"
                style={{ minHeight: '48px' }}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle table of contents"
              >
                <span className="flex items-center gap-2 truncate">
                  <Menu className="w-4 h-4 text-[#00A3FF] shrink-0" />
                  <span className="text-[#64748B] font-mono text-[10px] uppercase font-bold shrink-0">TOC</span>
                  <span className="text-white truncate max-w-[200px] sm:max-w-xs font-semibold">
                    {sections.find(s => s.id === activeSection)?.title || sections[0]?.title}
                  </span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/20 font-mono font-bold">
                    {currentSectionNum}/{sections.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {isMobileMenuOpen && (
                <div className="border-t border-white/10 max-h-72 overflow-y-auto bg-[#080B10]/98 p-2 space-y-1">
                  {sections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left text-xs font-semibold p-3 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 ${
                        activeSection === sec.id
                          ? 'bg-[#00A3FF]/15 text-[#00A3FF] font-bold border border-[#00A3FF]/30'
                          : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      <span className="font-mono text-[10px] text-[#64748B] px-1.5 py-0.5 rounded bg-white/5">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Legal Document Article */}
          <article className="lg:col-span-8 bg-[#0F141C]/60 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00A3FF]/10 via-[#0066FF]/5 to-transparent rounded-bl-full pointer-events-none blur-3xl opacity-60" />
            
            {/* The structured document content */}
            <div className="relative z-10 text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-10">
              {children}
            </div>

            {/* Official Identifier and Compliance Seal Box */}
            <div className="mt-14 pt-8 border-t border-white/10 relative z-10">
              <div className="bg-gradient-to-r from-white/[0.04] to-transparent border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00A3FF]" />
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      LEGAL & COMPLIANCE SEAL
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {t('legal_official_identifier')}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href="mailto:info@artron.ge"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#00A3FF]/15 text-[#00A3FF] border border-[#00A3FF]/30 hover:bg-[#00A3FF]/25 transition-all"
                    style={{ minHeight: '40px' }}
                  >
                    <span>info@artron.ge</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Global Footer & Cookie Banner */}
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

