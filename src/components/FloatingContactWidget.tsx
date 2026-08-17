'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, X, MessageCircle } from 'lucide-react';

// Contact Widget Configuration (Replace placeholders with actual numbers/usernames)
const CONTACT_CONFIG = {
  whatsappNumber: '995XXXXXXXXX', // Georgian country code + number format
  whatsappMessage: 'გამარჯობა, მინდა არტრონის დემონსტრაცია',
  telegramUsername: 'your_telegram_username',
  phoneNumber: '+995XXXXXXXXX',
};

const TOOLTIP_TEXTS = {
  ka: {
    whatsapp: 'მოგვწერეთ WhatsApp-ზე',
    telegram: 'მოგვწერეთ Telegram-ზე',
    phone: 'დაგვიკავშირდით ტელეფონით',
    launcher: 'კავშირი',
  },
  en: {
    whatsapp: 'Chat on WhatsApp',
    telegram: 'Chat on Telegram',
    phone: 'Call Us',
    launcher: 'Contact Us',
  },
  ru: {
    whatsapp: 'Написать в WhatsApp',
    telegram: 'Написать в Telegram',
    phone: 'Позвонить нам',
    launcher: 'Связаться с нами',
  },
};

export const FloatingContactWidget: React.FC = () => {
  const { locale } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Safely index tooltips, fallback to English if locale is not configured
  const currentLocale = (locale === 'ka' || locale === 'en' || locale === 'ru') ? locale : 'en';
  const tooltips = TOOLTIP_TEXTS[currentLocale];

  useEffect(() => {
    // Listen for chatbot state changes to avoid overlap
    const handleChatbotState = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.isOpen === 'boolean') {
        setIsChatbotOpen(customEvent.detail.isOpen);
      }
    };

    window.addEventListener('artron-chatbot-state', handleChatbotState);
    return () => {
      window.removeEventListener('artron-chatbot-state', handleChatbotState);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(CONTACT_CONFIG.whatsappMessage)}`;
  const telegramUrl = `https://t.me/${CONTACT_CONFIG.telegramUsername}`;
  const phoneUrl = `tel:${CONTACT_CONFIG.phoneNumber}`;

  return (
    <div
      className={`fixed z-45 flex flex-col items-center gap-3.5 transition-all duration-500 ease-in-out ${
        isChatbotOpen
          ? 'bottom-6 right-6 md:right-[412px] md:bottom-8 max-md:opacity-0 max-md:pointer-events-none'
          : 'bottom-24 right-6 md:bottom-28 md:right-8'
      }`}
    >
      {/* Sub-buttons (Staggered Stack) */}
      <div className="flex flex-col items-center gap-3.5 mb-1">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#121722]/90 text-[#25D366] shadow-lg backdrop-blur-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]'
              : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
          }`}
          style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}
          aria-label={tooltips.whatsapp}
        >
          <svg
            className="h-5.5 w-5.5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-14 scale-90 translate-x-2 rounded-lg border border-white/10 bg-[#121722]/95 px-3 py-1.5 text-xs text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
            {tooltips.whatsapp}
          </span>
        </a>

        {/* Telegram Button */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#121722]/90 text-[#00A3FF] shadow-lg backdrop-blur-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00ff87] ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto hover:scale-110 hover:border-[#00ff87] hover:bg-[#00ff87]/10 hover:text-[#00ff87] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]'
              : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
          }`}
          style={{ transitionDelay: isOpen ? '50ms' : '0ms' }}
          aria-label={tooltips.telegram}
        >
          <svg
            className="h-5.5 w-5.5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16l-2.58 12.12c-.19.85-.7 1.05-1.4.67l-3.95-2.92-1.9 1.83c-.21.21-.39.39-.8.39l.28-4.01 7.3-6.6c.32-.28-.07-.44-.49-.16l-9.02 5.68-3.89-1.22c-.85-.27-.86-.85.18-1.25l15.19-5.85c.7-.26 1.32.16 1.08.9z" />
          </svg>
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-14 scale-90 translate-x-2 rounded-lg border border-white/10 bg-[#121722]/95 px-3 py-1.5 text-xs text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
            {tooltips.telegram}
          </span>
        </a>

        {/* Phone Button */}
        <a
          href={phoneUrl}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#121722]/90 text-white shadow-lg backdrop-blur-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00ff87] ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto hover:scale-110 hover:border-[#00ff87] hover:bg-[#00ff87]/10 hover:text-[#00ff87] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]'
              : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
          }`}
          style={{ transitionDelay: isOpen ? '0ms' : '0ms' }}
          aria-label={tooltips.phone}
        >
          <Phone className="h-5.5 w-5.5" />
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-14 scale-90 translate-x-2 rounded-lg border border-white/10 bg-[#121722]/95 px-3 py-1.5 text-xs text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
            {tooltips.phone}
          </span>
        </a>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border bg-[#121722]/95 text-[#00A3FF] shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] cursor-pointer ${
          isOpen
            ? 'border-[#00A3FF] shadow-[0_0_25px_rgba(0,163,255,0.4)] rotate-90 text-[#00A3FF]'
            : 'border-white/10 hover:border-[#00A3FF] hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]'
        }`}
        aria-label={tooltips.launcher}
      >
        {/* Pulsing ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-[#00A3FF]/40 animate-ping opacity-60 pointer-events-none"></span>
        )}

        {isOpen ? (
          <X className="h-5.5 w-5.5 transition-transform duration-300" />
        ) : (
          <MessageCircle className="h-5.5 w-5.5 transition-transform duration-300" />
        )}

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-14 scale-90 translate-x-2 rounded-lg border border-white/10 bg-[#121722]/95 px-3 py-1.5 text-xs text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
          {tooltips.launcher}
        </span>
      </button>
    </div>
  );
};

