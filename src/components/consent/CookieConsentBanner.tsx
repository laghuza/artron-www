'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGoogleConsent } from '@/hooks/useGoogleConsent';
import { Shield, Settings as SettingsIcon, Check, X, ShieldAlert } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { t } = useLanguage();
  const { preferences, hasDecided, saveConsent, acceptAll, declineAll, setHasDecided } = useGoogleConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempPrefs, setTempPrefs] = useState({
    analytics: false,
    marketing: false,
  });

  React.useEffect(() => {
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

  // If consent is already decided, hide the banner unless settings is forced open
  if (hasDecided && !showSettings) {
    return null;
  }

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
    setTempPrefs(prev => ({ ...prev, analytics: !prev.analytics }));
  };

  const toggleMarketing = () => {
    setTempPrefs(prev => ({ ...prev, marketing: !prev.marketing }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/95 to-transparent">
      <div className="max-w-4xl mx-auto bg-[#05070a]/90 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl shadow-2xl p-5 md:p-6 relative transition-all duration-300">
        
        {/* L-Shape Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

        {/* Title & Icon Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#00ff87]/10 rounded-xl border border-[#00ff87]/20 text-[#00ff87] shrink-0">
            <Shield className="w-6 h-6 animate-pulse drop-shadow-[0_0_8px_#00ff87]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white tracking-wide">
              {t('cookie_title')}
            </h3>
            {!showSettings && (
              <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                {t('cookie_desc')}
              </p>
            )}
          </div>
        </div>

        {/* Detailed Category Settings */}
        {showSettings && (
          <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
            {/* Category: Necessary */}
            <div className="flex items-start justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {t('cookie_necessary_title')}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {t('cookie_necessary_desc')}
                </p>
              </div>
              <button
                disabled
                className="w-11 h-6 rounded-full bg-[#00ff87]/20 border border-[#00ff87]/30 flex items-center p-0.5 cursor-not-allowed opacity-80"
                style={{ minHeight: '44px' }}
                aria-label="Necessary Cookies (Required)"
              >
                <div className="w-5 h-5 rounded-full bg-[#00ff87] flex items-center justify-center translate-x-5 text-slate-950">
                  <Check className="w-3 h-3" />
                </div>
              </button>
            </div>

            {/* Category: Analytics */}
            <div className="flex items-start justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${tempPrefs.analytics ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  {t('cookie_analytics_title')}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {t('cookie_analytics_desc')}
                </p>
              </div>
              <button
                onClick={toggleAnalytic}
                className={`w-14 h-8 rounded-full border transition-all duration-300 flex items-center p-1 cursor-pointer ${
                  tempPrefs.analytics 
                    ? 'bg-[#00ff87]/20 border-[#00ff87]' 
                    : 'bg-white/5 border-white/20'
                }`}
                style={{ minWidth: '56px', minHeight: '44px' }} // Ensures target is at least 44px
                aria-label="Toggle Analytics Cookies"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  tempPrefs.analytics 
                    ? 'bg-[#00ff87] translate-x-6 text-slate-950' 
                    : 'bg-[#94A3B8] translate-x-0 text-slate-900'
                }`}>
                  {tempPrefs.analytics ? <Check className="w-4.5 h-4.5" /> : <X className="w-4.5 h-4.5" />}
                </div>
              </button>
            </div>

            {/* Category: Marketing */}
            <div className="flex items-start justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${tempPrefs.marketing ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  {t('cookie_marketing_title')}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {t('cookie_marketing_desc')}
                </p>
              </div>
              <button
                onClick={toggleMarketing}
                className={`w-14 h-8 rounded-full border transition-all duration-300 flex items-center p-1 cursor-pointer ${
                  tempPrefs.marketing 
                    ? 'bg-[#00ff87]/20 border-[#00ff87]' 
                    : 'bg-white/5 border-white/20'
                }`}
                style={{ minWidth: '56px', minHeight: '44px' }}
                aria-label="Toggle Marketing Cookies"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  tempPrefs.marketing 
                    ? 'bg-[#00ff87] translate-x-6 text-slate-950' 
                    : 'bg-[#94A3B8] translate-x-0 text-slate-900'
                }`}>
                  {tempPrefs.marketing ? <Check className="w-4.5 h-4.5" /> : <X className="w-4.5 h-4.5" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons Panel */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-4">
          <a
            href="https://artron.ge/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00ff87] hover:underline flex items-center gap-1.5 py-2 px-1 focus:outline-none focus:ring-1 focus:ring-[#00ff87] rounded-md"
            style={{ minHeight: '44px' }}
          >
            <ShieldAlert className="w-4 h-4" />
            {t('cookie_policy_link')}
          </a>

          <div className="flex flex-wrap items-center gap-3">
            {!showSettings ? (
              <>
                <button
                  onClick={handleOpenSettings}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
                  style={{ minHeight: '44px', minWidth: '100px' }}
                >
                  <SettingsIcon className="w-4.5 h-4.5 text-[#94A3B8]" />
                  {t('cookie_settings')}
                </button>
                <button
                  onClick={declineAll}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-400 text-sm font-semibold hover:bg-rose-500/15 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                  style={{ minHeight: '44px', minWidth: '100px' }}
                >
                  {t('cookie_decline_all')}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-grow sm:flex-initial py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#00ff87]/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
                  style={{ minHeight: '44px', minWidth: '120px' }}
                >
                  {t('cookie_accept_all')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 text-[#94A3B8] text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
                  style={{ minHeight: '44px', minWidth: '100px' }}
                >
                  {t('cookie_decline_all')}
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-grow sm:flex-initial py-2.5 px-6 rounded-xl bg-[#00ff87] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#00ff87]/20 hover:bg-[#00ff87]/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
                  style={{ minHeight: '44px', minWidth: '150px' }}
                >
                  {t('cookie_save')}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
