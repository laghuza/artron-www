'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Send,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { NavLinkItem, SubMenuItem } from './headerNavData';
import { CONTACT_CONFIG } from '@/config/contact';

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
  // Lock body scroll and notify floating widgets to suppress background bleed/clash
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('artron-mobile-menu-state', { detail: { isOpen: true } }));
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('artron-mobile-menu-state', { detail: { isOpen: false } }));
        }
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {!showBackToHome && isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="xl:hidden w-full h-[calc(100vh-57px)] h-[calc(100dvh-57px)] bg-[#080B10] border-t border-white/[0.08] flex flex-col overflow-hidden select-none"
        >
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-12 flex flex-col justify-between">
            <div className="flex flex-col gap-1">

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
            </div>

            {/* ══ MOBILE ACTION FOOTER (Dark-Futurist Direct Contact Dock) ══ */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex flex-col gap-2.5">
              {/* Subtle HUD Label */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#64748B] px-1 uppercase">
                <span className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
                  {locale === 'ka' ? 'პირდაპირი კავშირი' : locale === 'ru' ? 'Прямой контакт' : 'Direct Line'}
                </span>
                <span className="text-[9px] text-[#475569] font-mono">24/7 ENCRYPTED</span>
              </div>

              {/* Direct Communication Channels (Telegram, WhatsApp, Phone) */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={CONTACT_CONFIG.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#0F141C]/90 border border-white/[0.08] hover:border-[#00A3FF]/50 active:scale-[0.97] transition-all duration-200 min-h-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_16px_rgba(0,163,255,0.15)]"
                >
                  <Send className="w-4 h-4 text-[#00A3FF] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-white/90 group-hover:text-white">Telegram</span>
                </a>

                <a
                  href={CONTACT_CONFIG.whatsapp.getUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#0F141C]/90 border border-white/[0.08] hover:border-[#10B981]/50 active:scale-[0.97] transition-all duration-200 min-h-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_16px_rgba(16,185,129,0.15)]"
                >
                  <MessageCircle className="w-4 h-4 text-[#10B981] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-white/90 group-hover:text-white">WhatsApp</span>
                </a>

                <a
                  href={CONTACT_CONFIG.phone.dialUrl}
                  className="group relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#0F141C]/90 border border-white/[0.08] hover:border-[#F59E0B]/50 active:scale-[0.97] transition-all duration-200 min-h-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_16px_rgba(245,158,11,0.15)]"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-white/90 group-hover:text-white">
                    {locale === 'ka' ? 'ზარი' : locale === 'ru' ? 'Звонок' : 'Call'}
                  </span>
                </a>
              </div>

              {/* Live Status and System Version Badge */}
              <div className="flex items-center justify-between px-1 pt-0.5 text-[10px] font-mono text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
                  <span className="text-[#34D399] font-bold tracking-wider">ECOSYSTEM LIVE</span>
                </div>
                <span className="text-[#475569]">ARTRON OS • v2.6.4</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

MobileNavDrawer.displayName = 'MobileNavDrawer';
