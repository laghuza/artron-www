'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavLinkItem, SubMenuItem } from './headerNavData';

interface DesktopNavProps {
  navLinks: NavLinkItem[];
  activeNav: string;
  isControlPanelActive: boolean;
  hoveredNav: string | null;
  setHoveredNav: (href: string | null) => void;
  isControlPanelOpen: boolean;
  controlPanelMenuRef: React.RefObject<HTMLDivElement | null>;
  handleControlPanelMouseEnter: () => void;
  handleControlPanelMouseLeave: () => void;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  controlPanelSubItems: SubMenuItem[];
  analyticsSubItems: SubMenuItem[];
  locale: string;
  kinematicsNav: {
    y: any;
    scale: any;
    opacity: any;
  };
}

export const DesktopNav: React.FC<DesktopNavProps> = React.memo(({
  navLinks,
  activeNav,
  isControlPanelActive,
  hoveredNav,
  setHoveredNav,
  isControlPanelOpen,
  controlPanelMenuRef,
  handleControlPanelMouseEnter,
  handleControlPanelMouseLeave,
  handleNavClick,
  controlPanelSubItems,
  analyticsSubItems,
  locale,
  kinematicsNav,
}) => {
  return (
    <motion.nav
      style={{
        y: kinematicsNav.y,
        scale: kinematicsNav.scale,
        opacity: kinematicsNav.opacity,
      }}
      className="hidden xl:flex items-center gap-0.5 2xl:gap-1 bg-[#0F141C]/85 border border-white/[0.08] rounded-full px-2 2xl:px-3 py-1 backdrop-blur-md shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] will-change-transform"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => {
        const isControlPanelLink = link.dropdown === 'control';
        const isActive = isControlPanelLink
          ? isControlPanelActive
          : activeNav === link.href;
        const isHovered = hoveredNav === link.href;

        if (isControlPanelLink) {
          return (
            <div
              key={link.href}
              ref={controlPanelMenuRef}
              onMouseEnter={handleControlPanelMouseEnter}
              onMouseLeave={handleControlPanelMouseLeave}
              className="relative"
            >
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredNav(link.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative text-[10.5px] 2xl:text-[11.5px] font-semibold whitespace-nowrap px-2.5 2xl:px-3 py-1 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF]/50 z-10 select-none flex items-center gap-1 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A3FF]/25 via-[#00A3FF]/15 to-[#00D2FF]/25 border border-[#00A3FF]/50 shadow-[0_0_14px_rgba(0,163,255,0.35)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                  />
                )}

                {!isActive && isHovered && (
                  <motion.span
                    layoutId="hover-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.1] shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                  )}
                  <span>{link.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 opacity-70 group-hover:opacity-100 ${isControlPanelOpen ? 'rotate-180 text-[#00A3FF]' : ''}`} />
                </span>
              </Link>

              {/* Desktop Floating Mega-Dropdown Menu for Control Panel & Analytics */}
              <AnimatePresence>
                {isControlPanelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 -translate-x-[35%] xl:-translate-x-1/2 top-full mt-2 w-[720px] 2xl:w-[780px] rounded-2xl border border-white/[0.12] bg-[#0B0F17]/98 p-3 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(0,163,255,0.15)] z-[80]"
                  >
                    <div className="grid grid-cols-12 gap-3">
                      {/* Column 1: Core Operations & IoT (5 cols) */}
                      <div className="col-span-5 flex flex-col pr-2 border-r border-white/[0.08]">
                        <div className="px-2 py-1 mb-1 flex items-center justify-between border-b border-white/[0.06]">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#00E5FF]">
                            [ CORE INFRASTRUCTURE ]
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {controlPanelSubItems.length} MODULES
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 mt-1">
                          {controlPanelSubItems.map((subItem) => {
                            const isSubActive = activeNav === subItem.href;
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(e) => handleNavClick(e, subItem.href)}
                                className={`group/item flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                                  isSubActive
                                    ? 'bg-[#00A3FF]/15 border border-[#00A3FF]/40 shadow-[0_0_15px_rgba(0,163,255,0.15)]'
                                    : 'hover:bg-white/[0.05] border border-transparent'
                                }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover/item:scale-105"
                                  style={{
                                    backgroundColor: `${subItem.color}15`,
                                    borderColor: `${subItem.color}35`,
                                    color: subItem.color,
                                  }}
                                >
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-[11px] font-bold tracking-tight truncate ${isSubActive ? 'text-white' : 'text-slate-200 group-hover/item:text-white'}`}>
                                      {subItem.label}
                                    </span>
                                    <span
                                      className="text-[8px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 uppercase"
                                      style={{
                                        backgroundColor: `${subItem.color}15`,
                                        color: subItem.color,
                                      }}
                                    >
                                      {subItem.badge}
                                    </span>
                                  </div>
                                  <p className="text-[9px] text-[#94A3B8] truncate leading-relaxed mt-0.5">
                                    {subItem.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Master link to Full Analytics Simulator */}
                        <div className="mt-auto pt-2 border-t border-white/[0.06]">
                          <Link
                            href="/#dashboard-features?tab=roi"
                            onClick={(e) => handleNavClick(e, '/#dashboard-features?tab=roi')}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00A3FF]/10 border border-white/[0.06] hover:border-[#00A3FF]/30 transition-all text-[10px] text-[#00E5FF] font-semibold group/all"
                          >
                            <span>{locale === 'ka' ? 'ანალიტიკისა და ROI-ის სიმულატორი (CRM Preview)' : locale === 'ru' ? 'Симулятор аналитики и ROI (CRM Preview)' : 'Analytics & ROI Simulator (CRM Preview)'}</span>
                            <ChevronRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Analytics & ROI Suite (7 cols) */}
                      <div className="col-span-7 flex flex-col pl-1">
                        <div className="px-2 py-1 mb-1 flex items-center justify-between border-b border-white/[0.06]">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                            [ ANALYTICS &amp; ROI SUITE ]
                          </span>
                          <span className="text-[9px] font-mono text-[#00E5FF] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                            {analyticsSubItems.length} METRIC MODULES
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                          {analyticsSubItems.map((subItem) => {
                            const isSubActive = activeNav === subItem.href;
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(e) => handleNavClick(e, subItem.href)}
                                className={`group/item flex items-start gap-2 p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                                  isSubActive
                                    ? 'bg-[#00A3FF]/15 border border-[#00A3FF]/40 shadow-[0_0_15px_rgba(0,163,255,0.15)]'
                                    : 'hover:bg-white/[0.05] border border-transparent'
                                }`}
                              >
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover/item:scale-105 mt-0.5"
                                  style={{
                                    backgroundColor: `${subItem.color}15`,
                                    borderColor: `${subItem.color}35`,
                                    color: subItem.color,
                                  }}
                                >
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-[10.5px] font-bold tracking-tight truncate ${isSubActive ? 'text-white' : 'text-slate-200 group-hover/item:text-white'}`}>
                                      {subItem.label}
                                    </span>
                                  </div>
                                  <p className="text-[8.5px] text-[#94A3B8] truncate leading-tight mt-0.5">
                                    {subItem.desc}
                                  </p>
                                  <span
                                    className="inline-block text-[7.5px] font-mono px-1 py-0.2 rounded font-bold uppercase mt-1"
                                    style={{
                                      backgroundColor: `${subItem.color}15`,
                                      color: subItem.color,
                                    }}
                                  >
                                    {subItem.badge}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            onMouseEnter={() => setHoveredNav(link.href)}
            onMouseLeave={() => setHoveredNav(null)}
            className={`relative text-[10.5px] 2xl:text-[11.5px] font-semibold whitespace-nowrap px-2.5 2xl:px-3 py-1 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF]/50 z-10 select-none ${
              isActive
                ? 'text-white font-bold'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A3FF]/25 via-[#00A3FF]/15 to-[#00D2FF]/25 border border-[#00A3FF]/50 shadow-[0_0_14px_rgba(0,163,255,0.35)]"
                initial={false}
                transition={{ type: 'spring', stiffness: 550, damping: 35 }}
              />
            )}

            {!isActive && isHovered && (
              <motion.span
                layoutId="hover-nav-pill"
                className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.1] shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
              )}
              <span>{link.label}</span>
            </span>
          </Link>
        );
      })}
    </motion.nav>
  );
});

DesktopNav.displayName = 'DesktopNav';
