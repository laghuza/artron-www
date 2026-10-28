'use client';

import { useState, useEffect } from 'react';
import {
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';

/**
 * Hook for scroll-driven Unified Header Slide-Down Kinematics.
 * Synchronized with the Daisi Choreography Hero manifesto ascension (p: 0.80 -> 0.92).
 */
export function useHeaderKinematics(hideOnInitialScroll: boolean) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Active progress value: dynamic only if hideOnInitialScroll and full motion enabled
  const isDynamic = hideOnInitialScroll && !shouldReduceMotion;

  const [isInteractive, setIsInteractive] = useState(!isDynamic);
  const [isScrolledPast, setIsScrolledPast] = useState(!isDynamic);

  // Motion value for dock progress (0 to 1)
  const dockValue = useMotionValue(isDynamic ? 0 : 1);

  useEffect(() => {
    // Check if navigating directly to a section anchor or cross-page target
    let hasTargetAnchor = false;
    try {
      const navEntries = typeof performance !== 'undefined' ? performance.getEntriesByType('navigation') : [];
      const isReload =
        navEntries.length > 0
          ? (navEntries[0] as PerformanceNavigationTiming).type === 'reload'
          : (typeof performance !== 'undefined' &&
            (performance as unknown as { navigation?: { type?: number } }).navigation?.type === 1);

      if (!isReload) {
        hasTargetAnchor = Boolean(
          window.location.hash || sessionStorage.getItem('artron_target_nav')
        );
      }
    } catch {}

    if (!isDynamic || hasTargetAnchor) {
      dockValue.set(1);
      setIsInteractive(true);
      setIsScrolledPast(true);
      return;
    }

    const handleHeroProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ progress: number }>;
      const p = customEvent.detail.progress;
      // In Claude Master: dock starts at p >= 0.80 and finishes at p >= 0.92
      const clampVal = Math.min(Math.max((p - 0.80) / 0.12, 0), 1);
      const smoothVal = clampVal * clampVal * (3 - 2 * clampVal);
      dockValue.set(smoothVal);

      const interactive = smoothVal > 0.6;
      setIsInteractive((prev) => (prev !== interactive ? interactive : prev));
      const past = smoothVal > 0.9;
      setIsScrolledPast((prev) => (prev !== past ? past : prev));
    };

    window.addEventListener('artron-hero-progress', handleHeroProgress);
    return () => window.removeEventListener('artron-hero-progress', handleHeroProgress);
  }, [isDynamic, dockValue]);

  // Fallback scroll-distance listener: in case hero is skipped or on direct anchor jump
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!hideOnInitialScroll) {
      setIsInteractive(true);
      const past = latest > 20;
      setIsScrolledPast((prev) => (prev !== past ? past : prev));
      return;
    }

    const threshold = typeof window !== 'undefined' ? window.innerHeight * 1.4 : 1200;
    if (latest >= threshold) {
      dockValue.set(1);
      setIsInteractive(true);
      setIsScrolledPast(true);
    } else if (latest < 40) {
      dockValue.set(0);
      setIsInteractive(false);
      setIsScrolledPast(false);
    }
  });

  const headerY = useTransform(dockValue, [0, 1], [isDynamic ? '-100%' : '0%', '0%']);
  const headerAlpha = useTransform(dockValue, [0, 0.4, 1], [isDynamic ? 0 : 1, isDynamic ? 0.8 : 1, 1]);

  const neutral = useTransform(() => 0);
  const neutralScale = useTransform(() => 1);
  const neutralAlpha = useTransform(() => 1);

  return {
    isInteractive,
    isScrolledPast,
    shouldReduceMotion,
    headerAlpha,
    headerY,
    logo: { x: neutral, y: neutral, rotate: neutral, scale: neutralScale, opacity: neutralAlpha },
    nav: { y: neutral, scale: neutralScale, opacity: neutralAlpha },
    access: { x: neutral, y: neutral, rotate: neutral, scale: neutralScale, opacity: neutralAlpha },
    lang: { x: neutral, y: neutral, rotate: neutral, scale: neutralScale, opacity: neutralAlpha },
  };
}
