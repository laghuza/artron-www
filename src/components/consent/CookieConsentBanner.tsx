'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGoogleConsent } from '@/hooks/useGoogleConsent';
import { Shield, Settings as SettingsIcon, Check, X, ShieldAlert, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsentBanner: React.FC = () => {
  const { t } = useLanguage();
  const { preferences, hasDecided, saveConsent, acceptAll, declineAll, setHasDecided } = useGoogleConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempPrefs, setTempPrefs] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const handleReopen = () => {
      setTempPrefs({
        analytics: preferences.analytics,
        marketing: preferences.marketing,
      });
      setShowSettings(true);
      setHasDecided(false);
    };
    window.addEventListener('artron-reopen-cookie-settings', handleReopen);
    return () => window.removeEventListener('artron-reopen-cookie-settings', handleReopen);
  }, [preferences, setHasDecided]);

  const handleOpenSettings = () => {
    setTempPrefs({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    saveConsent({
      necessary: true,
      analytics: tempPrefs.analytics,
      marketing: tempPrefs.marketing,
    });
    setShowSettings(false);
  };

  const toggleAnalytic = () => {
    setTempPrefs((prev) => ({ ...prev, analytics: !prev.analytics }));
  };

  const toggleMarketing = () => {
    setTempPrefs((prev) => ({ ...prev, marketing: !prev.marketing }));
  };

  return (
    <AnimatePresence>
      {(!hasDecided || showSettings) && (
        <motion.div
          key="artron-cookie-banner"
          id="artron-cookie-consent-banner"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-50 flex justify-center pointer-events-none"
        >
        <div className="w-full max-w-2xl pointer-events-auto bg-[#070A10]/85 border border-[#00A3FF]/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,163,255,0.12)] p-4 sm:p-6 relative overflow-hidden text-[#F8FAFC]">
          {/* Subtle Ambient Cyber Light */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#00ff87]/15 rounded-full blur-3xl pointer-events-none" />

          {/* L-Shape Corner Tech Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00A3FF]/40" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00A3FF]/40" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/40" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/40" />

          {/* Header Row */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-[#00A3FF]/10 rounded-2xl border border-[#00A3FF]/25 text-[#00A3FF] shrink-0 shadow-[0_0_15px_rgba(0,163,255,0.2)]">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  {t('cookie_title')}
                </h3>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20">
                  <Lock className="w-2.5 h-2.5" /> GCM v2
                </span>
              </div>
              {!showSettings && (
                <p className="mt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {t('cookie_desc')}
                </p>
              )}
            </div>
          </div>

          {/* Granular Categories Drawer */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2.5 border-t border-white/10 pt-4"
            >
              {/* Category: Necessary */}
              <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{t('cookie_necessary_title')}</span>
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-2">
                    {t('cookie_necessary_desc')}
                  </p>
                </div>
                <div className="shrink-0 flex items-center">
                  <div
                    className="w-11 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center px-0.5 cursor-not-allowed opacity-80"
                    aria-label="Necessary Cookies (Required)"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center translate-x-5 text-slate-950 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category: Analytics */}
              <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tempPrefs.analytics ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                    <span>{t('cookie_analytics_title')}</span>
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-2">
                    {t('cookie_analytics_desc')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleAnalytic}
                  className={`w-12 h-7 rounded-full border transition-all duration-200 flex items-center p-0.5 cursor-pointer min-h-[44px] min-w-[48px] justify-center ${
                    tempPrefs.analytics ? 'bg-[#00A3FF]/20 border-[#00A3FF]' : 'bg-white/5 border-white/20'
                  }`}
                  aria-label="Toggle Analytics Cookies"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      tempPrefs.analytics
                        ? 'bg-[#00A3FF] translate-x-2 text-white shadow-sm'
                        : 'bg-[#64748B] -translate-x-2 text-slate-950'
                    }`}
                  >
                    {tempPrefs.analytics ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              </div>

              {/* Category: Marketing */}
              <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tempPrefs.marketing ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                    <span>{t('cookie_marketing_title')}</span>
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-2">
                    {t('cookie_marketing_desc')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleMarketing}
                  className={`w-12 h-7 rounded-full border transition-all duration-200 flex items-center p-0.5 cursor-pointer min-h-[44px] min-w-[48px] justify-center ${
                    tempPrefs.marketing ? 'bg-[#00A3FF]/20 border-[#00A3FF]' : 'bg-white/5 border-white/20'
                  }`}
                  aria-label="Toggle Marketing Cookies"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      tempPrefs.marketing
                        ? 'bg-[#00A3FF] translate-x-2 text-white shadow-sm'
                        : 'bg-[#64748B] -translate-x-2 text-slate-950'
                    }`}
                  >
                    {tempPrefs.marketing ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Action Row */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-3">
            <a
              href="https://artron.ge/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#00A3FF] hover:underline flex items-center gap-1 min-h-[44px] py-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t('cookie_policy_link')}</span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </a>

            <div className="flex flex-wrap items-center gap-2">
              {!showSettings ? (
                <>
                  <button
                    type="button"
                    onClick={handleOpenSettings}
                    className="flex-1 sm:flex-initial py-2 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t('cookie_settings')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={declineAll}
                    className="flex-1 sm:flex-initial py-2 px-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all cursor-pointer min-h-[44px]"
                  >
                    {t('cookie_decline_all')}
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="flex-grow sm:flex-initial py-2 px-5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#00E5FF] text-slate-950 text-xs font-black shadow-lg shadow-[#00A3FF]/25 hover:brightness-110 active:scale-98 transition-all cursor-pointer min-h-[44px]"
                  >
                    {t('cookie_accept_all')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="flex-1 sm:flex-initial py-2 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-400 text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer min-h-[44px]"
                  >
                    {t('cookie_decline_all')}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="flex-grow sm:flex-initial py-2 px-5 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 text-xs font-black shadow-lg shadow-[#00ff87]/20 hover:brightness-110 transition-all cursor-pointer min-h-[44px]"
                  >
                    {t('cookie_save')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
