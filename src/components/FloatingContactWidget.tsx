'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';
import { X, MessageSquare } from 'lucide-react';
import { ContactActionSheet } from '@/components/contact/ContactActionSheet';
import { CONTACT_SHEET_LABELS, ContactLocale } from '@/components/contact/contactWidgetData';

export const FloatingContactWidget: React.FC = () => {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hubSpot, setHubSpot] = useState({ x: 0, y: 0, isHovered: false });
  const hubRef = useRef<HTMLButtonElement>(null);

  const lang: ContactLocale =
    locale === 'ka' || locale === 'en' || locale === 'ru' ? locale : 'ka';
  const L = CONTACT_SHEET_LABELS[lang];

  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof detail?.isOpen === 'boolean') setChatbotOpen(detail.isOpen);
    };
    window.addEventListener('artron-chatbot-state', handler);
    return () => window.removeEventListener('artron-chatbot-state', handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof detail?.isOpen === 'boolean') setMobileMenuOpen(detail.isOpen);
    };
    window.addEventListener('artron-mobile-menu-state', handler);
    return () => window.removeEventListener('artron-mobile-menu-state', handler);
  }, []);

  useEffect(() => {
    const handleOmnichannelOpen = () => {
      setIsOpen(true);
      audioManager.playClick();
    };
    window.addEventListener('artron-open-omnichannel', handleOmnichannelOpen);
    return () => window.removeEventListener('artron-open-omnichannel', handleOmnichannelOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    audioManager.playClick();
    setIsOpen(false);
  };

  const handleChatbotClick = () => {
    audioManager.playClick();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('artron-open-chatbot'));
  };

  const handleToggle = () => {
    audioManager.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleHubMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hubRef.current) return;
    const rect = hubRef.current.getBoundingClientRect();
    setHubSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  return (
    <>
      {/* ── Native Mobile Action Sheet with Frosted Scrim Backdrop ── */}
      <ContactActionSheet
        isOpen={isOpen}
        locale={locale}
        onClose={handleClose}
        onOpenChatbot={handleChatbotClick}
      />

      {/* ── Floating Hub Trigger Button (When Chatbot is Not Active) ── */}
      <div
        className={`fixed z-[45] md:hidden flex flex-col items-end gap-3 transition-all duration-300 ${
          chatbotOpen || mobileMenuOpen
            ? 'bottom-6 right-6 opacity-0 pointer-events-none'
            : 'bottom-6 right-6'
        }`}
      >
        <motion.button
          ref={hubRef}
          onClick={handleToggle}
          onMouseMove={handleHubMouseMove}
          onMouseEnter={() => setHubSpot((prev) => ({ ...prev, isHovered: true }))}
          onMouseLeave={() => setHubSpot((prev) => ({ ...prev, isHovered: false }))}
          animate={{ scale: isOpen ? 0.92 : 1 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/60 shrink-0 shadow-2xl transition-all"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #0B0F17 0%, #1A2235 100%)'
              : 'linear-gradient(135deg, #0052D4 0%, #00A3FF 50%, #00E5FF 100%)',
            border: isOpen ? '1px solid rgba(0,163,255,0.5)' : '1px solid rgba(0,163,255,0.8)',
            boxShadow: isOpen
              ? '0 0 28px rgba(0,163,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 0 35px rgba(0,163,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
            color: '#FFFFFF',
          }}
          aria-label={isOpen ? L.close : L.title}
          aria-expanded={isOpen}
        >
          {/* Dynamic Spotlight inside Hub button */}
          {hubSpot.isHovered && (
            <div
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-150 z-10"
              style={{
                background: `radial-gradient(42px circle at ${hubSpot.x}px ${hubSpot.y}px, rgba(255,255,255,0.35), transparent 75%)`,
              }}
            />
          )}

          {/* Top gloss rim */}
          <div className="pointer-events-none absolute inset-0 rounded-full border-t border-white/35 opacity-80 z-10" />

          {/* Pulsing ambient ring when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full border border-[#00A3FF]/50 animate-ping opacity-40 pointer-events-none" />
              <span className="absolute inset-[-6px] rounded-full border border-[#00A3FF]/25 animate-pulse pointer-events-none" />
            </>
          )}

          <div className="relative z-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.16 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.16 }}
                >
                  <MessageSquare className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </>
  );
};
