'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Cpu, Sparkles } from 'lucide-react';
import PS5LanguageSelector from '@/components/navigation/PS5LanguageSelector';
import { NavLinkItem, SubMenuItem } from './headerNavData';

interface MobileNavDrawerProps {
  isOpen: boolean;
  showBackToHome?: boolean;
  activeNav: string;
  isControlPanelActive: boolean;
  isMobileControlPanelExpanded: boolean;
  setIsMobileControlPanelExpanded: (v: boolean | ((prev: boolean) => boolean)) => void;
  navLinks: NavLinkItem[];
  controlPanelSubItems: SubMenuItem[];
  analyticsSubItems: SubMenuItem[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  locale: string;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = React.memo(({
  isOpen,
  showBackToHome = false,
  activeNav,
  isControlPanelActive,
  isMobileControlPanelExpanded,
  setIsMobileControlPanelExpanded,
  navLinks,
  controlPanelSubItems,
  analyticsSubItems,
  handleNavClick,
  locale,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {!showBackToHome && isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="xl:hidden overflow-hidden border-t border-white/[0.06] bg-[#0B0E14]/98 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
            {/* Quick Role Switcher for Mobile Navigation */}
            <div className="grid grid-cols-2 gap-2 mb-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#dashboard-features')}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[#00E5FF] text-[11px] font-bold cursor-pointer active:scale-95 transition-transform"
              >
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{locale === 'ka' ? 'დარბაზი (B2B)' : locale === 'ru' ? 'Клуб (B2B)' : 'Gym (B2B)'}</span>
              </button>
              <button
                type="button"
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#mobile-app')}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-[#34D399] text-[11px] font-bold cursor-pointer active:scale-95 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{locale === 'ka' ? 'წევრი (B2C)' : locale === 'ru' ? 'Член (B2C)' : 'Member (B2C)'}</span>
              </button>
            </div>

            {navLinks.map((link, i) => {
              const isControlPanelLink = link.dropdown === 'control';
              const isActive = isControlPanelLink
                ? isControlPanelActive
                : activeNav === link.href;

              if (isControlPanelLink) {
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.025, duration: 0.18 }}
                    className="flex flex-col rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between px-3.5 py-2.5">
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center gap-2 text-sm font-semibold flex-1 ${
                          isActive ? 'text-[#00E5FF] font-bold' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                        )}
                        <span>{link.label}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobileControlPanelExpanded(!isMobileControlPanelExpanded)}
                        className="p-1 text-[#94A3B8] hover:text-white rounded-lg"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileControlPanelExpanded ? 'rotate-180 text-[#00A3FF]' : ''}`} />
                      </button>
                    </div>

                    {/* Expandable Sub-items in mobile */}
                    {isMobileControlPanelExpanded && (
                      <div className="px-2 pb-2 pt-1 flex flex-col gap-1 border-t border-white/[0.04] bg-black/20">
                        <div className="px-2 pt-1.5 pb-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#00E5FF]">
                          [ CORE INFRASTRUCTURE ]
                        </div>
                        {controlPanelSubItems.map((sub) => {
                          const isSubActive = activeNav === sub.href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isSubActive
                                  ? 'bg-[#00A3FF]/20 text-white font-bold border border-[#00A3FF]/30'
                                  : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <SubIcon className="w-3.5 h-3.5 shrink-0" style={{ color: sub.color }} />
                                <span className="truncate">{sub.label}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-[#00A3FF]/60 shrink-0" />
                            </Link>
                          );
                        })}

                        <div className="mt-2 px-2 pt-2 pb-0.5 border-t border-white/[0.06] text-[9px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                          [ ANALYTICS &amp; ROI SUITE ]
                        </div>
                        {analyticsSubItems.map((sub) => {
                          const isSubActive = activeNav === sub.href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isSubActive
                                  ? 'bg-[#00A3FF]/20 text-white font-bold border border-[#00A3FF]/30'
                                  : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <SubIcon className="w-3.5 h-3.5 shrink-0" style={{ color: sub.color }} />
                                <span className="truncate">{sub.label}</span>
                              </div>
                              <span
                                className="text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase shrink-0"
                                style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
                              >
                                {sub.badge}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-[#00A3FF]/20 text-[#00E5FF] border border-[#00A3FF]/40 font-bold shadow-[0_0_12px_rgba(0,163,255,0.2)]'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </span>
                    <span className={isActive ? 'text-[#00E5FF] text-xs' : 'text-[#00A3FF]/60 text-xs'}>→</span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Mobile PS5 Language Selector */}
            <div className="mt-2 pt-2 border-t border-white/[0.08]">
              <PS5LanguageSelector
                variant="mobile"
                onSelectCallback={onClose}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

MobileNavDrawer.displayName = 'MobileNavDrawer';
