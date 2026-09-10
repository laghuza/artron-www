'use client';

import { useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';

/**
 * Hook for scroll-driven Unified Header Slide-Down Kinematics.
 * Operates the header as a single, cohesive, high-performance glass bar.
 */
export function useHeaderKinematics(hideOnInitialScroll: boolean) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isInteractive, setIsInteractive] = useState(!hideOnInitialScroll);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Active progress value: if reduced motion or subpage, lock to fully docked
  const isDynamic = hideOnInitialScroll && !shouldReduceMotion;

  // Unified slide-down progress: smoothly slides down as user leaves the hero [40px -> 180px]
  const progress = useTransform(scrollY, [40, 180], [0, 1], { clamp: true });

  // Header surface position: translates smoothly from -100% (tucked above) to 0% (docked)
  const headerY = useTransform(progress, [0, 1], [isDynamic ? '-100%' : '0%', '0%']);
  const headerAlpha = useTransform(progress, [0, 0.3, 1], [isDynamic ? 0 : 1, isDynamic ? 0.7 : 1, 1]);

  // Track interaction state with strict memoization to eliminate React re-render thrashing
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!hideOnInitialScroll) {
      setIsInteractive(true);
      const past = latest > 20;
      setIsScrolledPast((prev) => (prev !== past ? past : prev));
      return;
    }
    const nextInteractive = latest > 60;
    const nextScrolledPast = latest > 180;
    setIsInteractive((prev) => (prev !== nextInteractive ? nextInteractive : prev));
    setIsScrolledPast((prev) => (prev !== nextScrolledPast ? nextScrolledPast : prev));
  });

  // Sub-elements remain stationary relative to the header bar (no loose internal wobbling)
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
