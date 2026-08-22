'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';
import { X, CalendarCheck, Phone, Bot } from 'lucide-react';

/* ─────────────────────────────────────────────
   CONTACT CONFIG
───────────────────────────────────────────── */
const CONTACT = {
  whatsapp: {
    number: '995599000000',
    message: 'გამარჯობა, მაინტერესებს ARTRON SaaS პლატფორმის დემო ვერსია.',
  },
  telegram: { username: 'artron_support' },
  phone:    { number: '+995322000000' },
};

const LABELS = {
  ka: { aiBot: 'AI ასისტენტი', demo: 'ლაივ დემო', telegram: 'Telegram', whatsapp: 'WhatsApp', phone: 'ზარი' },
  en: { aiBot: 'AI Assistant', demo: 'Live Demo', telegram: 'Telegram', whatsapp: 'WhatsApp', phone: 'Call' },
  ru: { aiBot: 'AI Ассистент', demo: 'Демо', telegram: 'Telegram', whatsapp: 'WhatsApp', phone: 'Звонок' },
} as const;

/* ── Framer Motion hub trigger variants ── */
const hubVariants = {
  closed: { rotate: 0, scale: 1 },
  open:   { rotate: 90, scale: 1.05 },
};

/* ── Upward Emerging Animation Variants (Bottom to Top) ── */
const createItemVariants = (totalItems: number, index: number) => {
  // Stagger order from bottom (closest to button) upwards to top
  const distanceFromButton = totalItems - 1 - index;
  const enterDelay = distanceFromButton * 0.045;
  const exitDelay = index * 0.025;

  return {
    hidden: {
      opacity: 0,
      y: 36,
      scale: 0.45,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 440,
        damping: 24,
        mass: 0.8,
        delay: enterDelay,
      },
    },
    exit: {
      opacity: 0,
      y: 28,
      scale: 0.5,
      transition: {
        duration: 0.14,
        delay: exitDelay,
      },
    },
  };
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const FloatingContactWidget: React.FC = () => {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const lang = (locale === 'ka' || locale === 'en' || locale === 'ru') ? locale : 'ka';
  const L = LABELS[lang];

  /* ── Sync with AIBotWidget state ── */
  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof detail?.isOpen === 'boolean') setChatbotOpen(detail.isOpen);
    };
    window.addEventListener('artron-chatbot-state', handler);
    return () => window.removeEventListener('artron-chatbot-state', handler);
  }, []);

  /* ── ESC key listener to close menu ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const waUrl  = `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(CONTACT.whatsapp.message)}`;
  const tgUrl  = `https://t.me/${CONTACT.telegram.username}`;
  const telUrl = `tel:${CONTACT.phone.number}`;

  const handleDemoClick = () => {
    audioManager.playClick();
    setIsOpen(false);
    const el = document.getElementById('booking-engine');
    if (el) {
      const pos = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleChatbotClick = () => {
    audioManager.playClick();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('artron-open-chatbot'));
  };

  const handleToggle = () => {
    audioManager.playClick();
    setIsOpen(!isOpen);
  };

  /* Action buttons config (ordered top to bottom visually) */
  const ITEMS = [
    {
      id: 'chatbot',
      label: L.aiBot,
      icon: (
        <div className="relative flex items-center justify-center">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff87]" />
        </div>
      ),
      accent: '#00ff87',
      bg: 'linear-gradient(135deg, rgba(0,255,135,0.18) 0%, rgba(0,229,255,0.12) 100%)',
      border: 'rgba(0,255,135,0.45)',
      glow: 'rgba(0,255,135,0.5)',
      onClick: handleChatbotClick,
    },
    {
      id: 'demo',
      label: L.demo,
      icon: <CalendarCheck className="w-5 h-5" />,
      accent: '#00A3FF',
      bg: 'rgba(0,163,255,0.16)',
      border: 'rgba(0,163,255,0.45)',
      glow: 'rgba(0,163,255,0.5)',
      onClick: handleDemoClick,
    },
    {
      id: 'telegram',
      href: tgUrl,
      label: L.telegram,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16l-2.58 12.12c-.19.85-.7 1.05-1.4.67l-3.95-2.92-1.9 1.83c-.21.21-.39.39-.8.39l.28-4.01 7.3-6.6c.32-.28-.07-.44-.49-.16l-9.02 5.68-3.89-1.22c-.85-.27-.86-.85.18-1.25l15.19-5.85c.7-.26 1.32.16 1.08.9z" />
        </svg>
      ),
      accent: '#29B6F6',
      bg: 'rgba(41,182,246,0.14)',
      border: 'rgba(41,182,246,0.4)',
      glow: 'rgba(41,182,246,0.45)',
    },
    {
      id: 'whatsapp',
      href: waUrl,
      label: L.whatsapp,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      accent: '#25D366',
      bg: 'rgba(37,211,102,0.14)',
      border: 'rgba(37,211,102,0.4)',
      glow: 'rgba(37,211,102,0.45)',
    },
    {
      id: 'phone',
      href: telUrl,
      label: L.phone,
      icon: <Phone className="w-5 h-5" />,
      accent: '#94A3B8',
      bg: 'rgba(148,163,184,0.12)',
      border: 'rgba(148,163,184,0.3)',
      glow: 'rgba(148,163,184,0.35)',
    },
  ];

  return (
    <div
      className={`fixed z-[45] flex flex-col items-end gap-3 transition-all duration-500 ${
        chatbotOpen
          ? 'bottom-6 right-6 md:right-[412px] md:bottom-8 max-md:opacity-0 max-md:pointer-events-none'
          : 'bottom-6 right-6 md:bottom-8 md:right-8'
      }`}
    >
      {/* ── Expanded action items shooting upwards from the hub button ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-end gap-2.5"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {ITEMS.map((item, i) => {
              const distanceFromButton = ITEMS.length - 1 - i;
              const labelDelay = distanceFromButton * 0.045 + 0.04;

              return (
                <motion.div
                  key={item.id}
                  variants={createItemVariants(ITEMS.length, i)}
                  className="flex items-center gap-2.5"
                >
                  {/* Action Label Pill */}
                  <motion.span
                    initial={{ opacity: 0, x: 12, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ delay: labelDelay, duration: 0.16 }}
                    className="text-xs font-semibold text-[#CBD5E1] bg-[#0B0F17]/95 border border-white/[0.12] rounded-xl px-3 py-1.5 whitespace-nowrap backdrop-blur-xl shadow-xl select-none"
                  >
                    {item.label}
                  </motion.span>

                  {/* Action Button */}
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 cursor-pointer shrink-0 shadow-lg"
                      style={{
                        background: item.bg,
                        border: `1px solid ${item.border}`,
                        color: item.accent,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${item.glow}`;
                        (e.currentTarget as HTMLElement).style.borderColor = item.accent;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                        (e.currentTarget as HTMLElement).style.borderColor = item.border;
                      }}
                      aria-label={item.label}
                    >
                      {item.icon}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioManager.playClick()}
                      className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 cursor-pointer shrink-0 shadow-lg"
                      style={{
                        background: item.bg,
                        border: `1px solid ${item.border}`,
                        color: item.accent,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${item.glow}`;
                        (e.currentTarget as HTMLElement).style.borderColor = item.accent;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                        (e.currentTarget as HTMLElement).style.borderColor = item.border;
                      }}
                      aria-label={item.label}
                    >
                      {item.icon}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hub trigger button (Clean without external text pill) ── */}
      <div className="flex items-center">
        <motion.button
          onClick={handleToggle}
          variants={hubVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ type: 'spring', stiffness: 420, damping: 25 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/60 shrink-0"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #0B0F17 0%, #1A2235 100%)'
              : 'linear-gradient(135deg, #0055E5 0%, #00A3FF 55%, #00C8FF 100%)',
            border: isOpen ? '1px solid rgba(0,163,255,0.5)' : '1px solid rgba(0,163,255,0.7)',
            boxShadow: isOpen
              ? '0 0 28px rgba(0,163,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 0 35px rgba(0,163,255,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
            color: '#FFFFFF',
          }}
          aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
          aria-expanded={isOpen}
        >
          {/* Pulsing ambient ring when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full border border-[#00A3FF]/50 animate-ping opacity-40 pointer-events-none" />
              <span className="absolute inset-[-6px] rounded-full border border-[#00A3FF]/25 animate-pulse pointer-events-none" />
            </>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.16 }}
              >
                <X className="w-5.5 h-5.5" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                transition={{ duration: 0.16 }}
              >
                <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12H8v-2h4v2zm4-4H8V8h8v2z"/>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};
