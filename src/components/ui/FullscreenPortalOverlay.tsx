'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { soundEngine } from '@/core';

export interface FullscreenPortalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  accentColor?: 'cyan' | 'emerald';
  className?: string;
  'data-testid'?: string;
}

export const FullscreenPortalOverlay: React.FC<FullscreenPortalOverlayProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  accentColor = 'cyan',
  className = '',
  'data-testid': dataTestId = 'fullscreen-portal-overlay',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Handle ESC key to dismiss
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        try {
          soundEngine.playClose();
        } catch {
          // Audio fallback
        }
        onClose();
      }
    },
    [onClose]
  );

  // Lock background body scroll and attach ESC listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleCloseClick = useCallback(() => {
    try {
      soundEngine.playClose();
    } catch {
      // Audio fallback
    }
    onClose();
  }, [onClose]);

  const handleButtonHover = useCallback(() => {
    try {
      soundEngine.playHover();
    } catch {
      // Audio fallback
    }
  }, []);

  const accentStyles =
    accentColor === 'emerald'
      ? {
          glow: 'rgba(0, 255, 135, 0.15)',
          btnBorder: 'hover:border-[#00ff87]/60 hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]',
          badgeText: 'text-[#00ff87] border-[#00ff87]/40 bg-[#00ff87]/10',
          iconColor: 'text-[#00ff87]',
          radialGrad:
            'radial-gradient(circle at 50% 40%, rgba(0, 255, 135, 0.12) 0%, rgba(11, 14, 20, 0.95) 75%)',
        }
      : {
          glow: 'rgba(0, 163, 255, 0.15)',
          btnBorder: 'hover:border-[#00A3FF]/60 hover:shadow-[0_0_20px_rgba(0,163,255,0.4)]',
          badgeText: 'text-[#00D2FF] border-[#00A3FF]/40 bg-[#00A3FF]/10',
          iconColor: 'text-[#00D2FF]',
          radialGrad:
            'radial-gradient(circle at 50% 40%, rgba(0, 163, 255, 0.12) 0%, rgba(11, 14, 20, 0.95) 75%)',
        };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Portal Overlay"
          data-testid={dataTestId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: 'easeOut' }}
          className={`fixed inset-0 z-[99999] overflow-hidden flex flex-col justify-between select-none ${className}`}
          style={{
            backgroundColor: '#0B0E14',
            backgroundImage: accentStyles.radialGrad,
          }}
        >
          {/* Glassmorphic Backdrop Blur Layer */}
          <div
            className="absolute inset-0 pointer-events-none backdrop-blur-2xl bg-black/60"
            aria-hidden="true"
          />

          {/* Cybernetic Ambient Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
            aria-hidden="true"
          />

          {/* Minimalist Top-Right Floating Exit HUD */}
          {showCloseButton && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="absolute top-5 right-5 sm:top-7 sm:right-8 z-50 pointer-events-auto"
            >
              <button
                type="button"
                onClick={handleCloseClick}
                onMouseEnter={handleButtonHover}
                aria-label="Close Portal (Esc)"
                data-testid="portal-close-button"
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#121722]/80 backdrop-blur-md border border-white/10 text-white/80 transition-all duration-300 ${accentStyles.btnBorder} cursor-pointer min-w-[44px] min-h-[44px]`}
              >
                {/* Keyboard Shortcut Indicator Badge */}
                <span
                  className={`hidden sm:inline-flex items-center justify-center text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-md border ${accentStyles.badgeText}`}
                >
                  ESC
                </span>

                <span className="text-xs font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                  დახურვა
                </span>

                {/* Close ✕ Icon */}
                <div
                  className={`w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors ${accentStyles.iconColor}`}
                >
                  <X className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
                </div>
              </button>
            </motion.div>
          )}

          {/* Portal Main Content Stage */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
