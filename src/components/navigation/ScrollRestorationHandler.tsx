'use client';

import { useEffect, useLayoutEffect } from 'react';

let initialBootComplete = false;

/**
 * Returns true ONLY during the initial hard browser reload of the document,
 * and NEVER during subsequent client-side SPA route transitions (e.g. /about -> /#faq).
 */
export function isInitialBrowserReload(): boolean {
  if (typeof window === 'undefined' || initialBootComplete) return false;
  try {
    if (sessionStorage.getItem('artron_target_nav')) return false;
    const navEntries =
      typeof performance !== 'undefined' ? performance.getEntriesByType('navigation') : [];
    if (navEntries.length > 0) {
      return (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
    }
    return (
      typeof performance !== 'undefined' &&
      (performance as unknown as { navigation?: { type?: number } }).navigation?.type === 1
    );
  } catch {
    return false;
  }
}

export function markInitialBootComplete(): void {
  initialBootComplete = true;
}

/**
 * ScrollRestorationHandler
 * 
 * Ensures that whenever the user refreshes or reloads the page,
 * the site always starts fresh from the very beginning (Hero / top of the page: 0, 0).
 * Prevents browser auto-restoring deep scroll offsets or jumping to stale section anchors,
 * without interfering with subsequent client-side SPA navigations.
 */
export function ScrollRestorationHandler() {
  // Execute synchronously before paint to prevent any layout jump
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Tell browser engine not to automatically restore previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Detect if initial document load is a browser reload / refresh
    if (isInitialBrowserReload()) {
      // Strip any lingering anchor hash from the URL
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      try {
        sessionStorage.removeItem('artron_target_nav');
      } catch {}

      // Instantly reset scroll coordinates to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mark initial boot as complete after the initial mount cycle settles
    // so subsequent SPA navigations (e.g., /about -> /#faq) are never mistaken for reloads.
    const bootTimer = window.setTimeout(() => {
      markInitialBootComplete();
    }, 80);

    // Before unload / reload, ensure scroll position is reset to 0 so browser saves (0,0)
    const handleBeforeUnload = () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.pathname === '/' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    window.addEventListener('pagehide', handleBeforeUnload, { capture: true });

    return () => {
      window.clearTimeout(bootTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
      window.removeEventListener('pagehide', handleBeforeUnload, { capture: true });
    };
  }, []);

  return null;
}
