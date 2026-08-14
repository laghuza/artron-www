'use client';

import { useState, useEffect } from 'react';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentLog {
  consent_id: string;
  timestamp: string;
  categories_granted: string[];
  policy_version: string;
  user_agent: string;
}

export const useGoogleConsent = () => {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const [hasDecided, setHasDecided] = useState<boolean>(false);

  const updateConsentMode = (prefs: ConsentPreferences) => {
    if (typeof window !== 'undefined') {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('consent', 'update', {
          analytics_storage: prefs.analytics ? 'granted' : 'denied',
          ad_storage: prefs.marketing ? 'granted' : 'denied',
          ad_user_data: prefs.marketing ? 'granted' : 'denied',
          ad_personalization: prefs.marketing ? 'granted' : 'denied',
        });
      } else {
        console.warn('Google Tag Manager (gtag) not initialized yet.');
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('artron_cookie_consent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.preferences) {
          setPreferences(parsed.preferences);
          setHasDecided(true);
          // Apply consent settings on mount if already decided
          updateConsentMode(parsed.preferences);
        }
      } catch (e) {
        console.error('Failed to parse cookie consent state:', e);
      }
    }
  }, []);

  const logConsentChange = (prefs: ConsentPreferences) => {
    // Generate simple UUID fallback if crypto is not supported, though standard browsers support it
    const uuid = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : 'c-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();

    const logEntry: ConsentLog = {
      consent_id: uuid,
      timestamp: new Date().toISOString(),
      categories_granted: [
        'NECESSARY',
        ...(prefs.analytics ? ['ANALYTICS'] : []),
        ...(prefs.marketing ? ['MARKETING'] : []),
      ],
      policy_version: '2026-06-22',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    };

    // Immutable consent audit trail stored locally
    try {
      const logs = localStorage.getItem('artron_consent_logs');
      const logsList: ConsentLog[] = logs ? JSON.parse(logs) : [];
      logsList.push(logEntry);
      // Retain the last 50 logs for audit history
      localStorage.setItem('artron_consent_logs', JSON.stringify(logsList.slice(-50)));
    } catch (e) {
      console.error('Failed to write consent log:', e);
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    const updatedPrefs = { ...prefs, necessary: true }; // Necessary is always true
    setPreferences(updatedPrefs);
    localStorage.setItem(
      'artron_cookie_consent',
      JSON.stringify({ preferences: updatedPrefs, timestamp: new Date().toISOString() })
    );
    setHasDecided(true);
    updateConsentMode(updatedPrefs);
    logConsentChange(updatedPrefs);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const declineAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  return {
    preferences,
    hasDecided,
    saveConsent,
    acceptAll,
    declineAll,
    setHasDecided, // exposed to let user trigger settings modal reopen
  };
};
