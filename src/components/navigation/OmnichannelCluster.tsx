'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_CONFIG } from '@/config/contact';
import { MessageCircle, Phone, X } from 'lucide-react';

interface OmnichannelClusterProps {
  lang: 'ka' | 'en' | 'ru';
  playTactileFeedback: () => void;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}

export const OmnichannelCluster: React.FC<OmnichannelClusterProps> = ({
  lang,
  playTactileFeedback,
  hoveredNode,
  setHoveredNode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-2">
      <button
        onClick={() => {
          playTactileFeedback();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => {
          setHoveredNode('omnichannel-trigger');
          playTactileFeedback();
        }}
        onMouseLeave={() => setHoveredNode(null)}
        className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none ${
          isOpen
            ? 'bg-gradient-to-tr from-[#00A3FF] to-[#00E5FF] text-[#080C14] shadow-[0_0_16px_rgba(0,229,255,0.5)]'
            : 'text-slate-300 hover:text-[#00E5FF] hover:bg-[#00E5FF]/15 border border-white/10 hover:border-[#00E5FF]/30'
        }`}
        title="Quick Omnichannel Contact"
        aria-label="Quick Omnichannel Contact"
      >
        {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}

        {!isOpen && hoveredNode === 'omnichannel-trigger' && (
          <div className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#080C14]/95 border border-[#00E5FF]/30 text-white text-xs font-semibold whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 flex items-center gap-1.5 pointer-events-none">
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#00E5FF]/30" />
            <span className="text-[#00E5FF]">💬</span>
            <span>{lang === 'ka' ? 'კონტაქტი (WhatsApp / TG / Call)' : 'Quick Omnichannel'}</span>
          </div>
        )}
      </button>

      {/* Horizontal Flyout to the Left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 14, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 26 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#080C14]/95 border border-[#00E5FF]/40 backdrop-blur-2xl p-1.5 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(0,229,255,0.2)] z-50"
          >
            {/* WhatsApp */}
            <a
              href={CONTACT_CONFIG.whatsapp.getUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileFeedback}
              onMouseEnter={playTactileFeedback}
              className="relative w-8 h-8 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_10px_rgba(37,211,102,0.25)]"
              title="WhatsApp"
              aria-label="WhatsApp Chat"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={CONTACT_CONFIG.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileFeedback}
              onMouseEnter={playTactileFeedback}
              className="relative w-8 h-8 rounded-xl bg-[#29B6F6]/15 hover:bg-[#29B6F6]/30 border border-[#29B6F6]/40 text-[#29B6F6] flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_10px_rgba(41,182,246,0.25)]"
              title="Telegram"
              aria-label="Telegram Consultation"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16l-2.58 12.12c-.19.85-.7 1.05-1.4.67l-3.95-2.92-1.9 1.83c-.21.21-.39.39-.8.39l.28-4.01 7.3-6.6c.32-.28-.07-.44-.49-.16l-9.02 5.68-3.89-1.22c-.85-.27-.86-.85.18-1.25l15.19-5.85c.7-.26 1.32.16 1.08.9z" />
              </svg>
            </a>

            {/* Direct Phone Call */}
            <a
              href={CONTACT_CONFIG.phone.dialUrl}
              onClick={playTactileFeedback}
              onMouseEnter={playTactileFeedback}
              className="relative w-8 h-8 rounded-xl bg-[#00E5FF]/15 hover:bg-[#00E5FF]/30 border border-[#00E5FF]/40 text-[#00E5FF] flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_10px_rgba(0,229,255,0.25)]"
              title={`Call: ${CONTACT_CONFIG.phone.display}`}
              aria-label="Direct Phone Call"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
