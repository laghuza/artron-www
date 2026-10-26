'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact';
import { CONTACT_SHEET_LABELS, ContactLocale } from './contactWidgetData';

interface ContactActionSheetProps {
  isOpen: boolean;
  locale: string;
  onClose: () => void;
  onOpenChatbot: () => void;
}

export const ContactActionSheet: React.FC<ContactActionSheetProps> = ({
  isOpen,
  locale,
  onClose,
  onOpenChatbot,
}) => {
  const lang: ContactLocale =
    locale === 'ka' || locale === 'en' || locale === 'ru' ? locale : 'ka';
  const L = CONTACT_SHEET_LABELS[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Frosted Glass Dark Backdrop */}
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md md:hidden"
            aria-hidden="true"
          />

          {/* Bottom Drawer Card */}
          <motion.div
            key="contact-sheet"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed inset-x-0 bottom-0 z-[65] p-3 pb-6 sm:p-5 sm:pb-8 flex flex-col justify-end max-w-lg mx-auto md:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sheet-title"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0B0F17]/95 p-4 sm:p-5 shadow-[0_-12px_45px_rgba(0,163,255,0.2),0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              {/* Drag Handle Indicator */}
              <div className="mx-auto mb-3.5 h-1.5 w-12 rounded-full bg-white/20" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
                    <h3 id="contact-sheet-title" className="text-base font-bold text-white tracking-wide">
                      {L.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{L.subtitle}</p>
                </div>

                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label={L.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Communication Channels */}
              <div className="flex flex-col gap-2.5">
                {/* 1. AI Assistant */}
                <button
                  onClick={onOpenChatbot}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-[#00ff87]/30 bg-gradient-to-r from-[#00ff87]/10 via-[#00e5ff]/5 to-transparent p-3 text-left transition-all duration-200 hover:border-[#00ff87]/60 hover:bg-[#00ff87]/15 active:scale-[0.98] cursor-pointer"
                  style={{ minHeight: '56px' }}
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00ff87]/40 bg-[#00ff87]/15 text-[#00ff87] shadow-[0_0_14px_rgba(0,255,135,0.25)]">
                    <Bot className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-[#00ff87] animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-[#00ff87] transition-colors">
                        {L.aiBot}
                      </span>
                      <span className="rounded-full bg-[#00ff87]/20 border border-[#00ff87]/40 px-2 py-0.5 text-[10px] font-semibold text-[#00ff87]">
                        {L.aiStatus}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] truncate">{L.aiBotDesc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#00ff87] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>

                {/* 2. Telegram */}
                <a
                  href={CONTACT_CONFIG.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-[#29B6F6]/30 bg-gradient-to-r from-[#29B6F6]/10 to-transparent p-3 text-left transition-all duration-200 hover:border-[#29B6F6]/60 hover:bg-[#29B6F6]/15 active:scale-[0.98] cursor-pointer"
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#29B6F6]/40 bg-[#29B6F6]/15 text-[#29B6F6] shadow-[0_0_14px_rgba(41,182,246,0.25)]">
                    <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16l-2.58 12.12c-.19.85-.7 1.05-1.4.67l-3.95-2.92-1.9 1.83c-.21.21-.39.39-.8.39l.28-4.01 7.3-6.6c.32-.28-.07-.44-.49-.16l-9.02 5.68-3.89-1.22c-.85-.27-.86-.85.18-1.25l15.19-5.85c.7-.26 1.32.16 1.08.9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white group-hover:text-[#29B6F6] transition-colors block">
                      {L.telegram}
                    </span>
                    <p className="text-xs text-[#94A3B8] truncate">{L.telegramDesc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#29B6F6] group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 3. WhatsApp */}
                <a
                  href={CONTACT_CONFIG.whatsapp.getUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-[#25D366]/30 bg-gradient-to-r from-[#25D366]/10 to-transparent p-3 text-left transition-all duration-200 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 active:scale-[0.98] cursor-pointer"
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366] shadow-[0_0_14px_rgba(37,211,102,0.25)]">
                    <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors block">
                      {L.whatsapp}
                    </span>
                    <p className="text-xs text-[#94A3B8] truncate">{L.whatsappDesc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 4. Phone Call */}
                <a
                  href={CONTACT_CONFIG.phone.dialUrl}
                  onClick={onClose}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-gradient-to-r from-white/10 to-transparent p-3 text-left transition-all duration-200 hover:border-white/30 hover:bg-white/15 active:scale-[0.98] cursor-pointer"
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-[0_0_14px_rgba(255,255,255,0.15)]">
                    <Phone className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors block">
                      {L.phone}
                    </span>
                    <p className="text-xs text-[#94A3B8] font-mono truncate">{L.phoneDesc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#00E5FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
