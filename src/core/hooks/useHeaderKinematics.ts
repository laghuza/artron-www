'use client';

import { useState } from 'react';
import { useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion';

/**
 * Hook for scroll-driven Reverse Kinetic Assembly of the Navigation Header.
 * Ties the convergence of each header module (Logo, Nav, Access CTA, Lang)
 * directly to the user's scroll speed and position across the Hero section.
 */
export function useHeaderKinematics(hideOnInitialScroll: boolean) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isInteractive, setIsInteractive] = useState(!hideOnInitialScroll);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Map scrollY range [30px, 320px] into a normalized assembly progress [0 -> 1]
  const rawProgress = useTransform(scrollY, [30, 320], [0, 1]);
  
  // Apply a responsive spring to make manual wheel/touchpad scrolling feel organic and haptic
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.4,
  });

  // Active progress value: if reduced motion or subpage, lock to 1 (fully assembled)
  const isDynamic = hideOnInitialScroll && !shouldReduceMotion;

  // Track interaction state (prevent clicking invisible header when at top of hero)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!hideOnInitialScroll) {
      setIsInteractive(true);
      setIsScrolledPast(latest > 20);
      return;
    }
    setIsInteractive(latest > 60);
    setIsScrolledPast(latest > 260);
  });

  // 1. Logo & Brand (Left block)
  const logoX = useTransform(smoothProgress, [0, 1], [isDynamic ? -40 : 0, 0]);
  const logoY = useTransform(smoothProgress, [0, 1], [isDynamic ? -20 : 0, 0]);
  const logoRot = useTransform(smoothProgress, [0, 1], [isDynamic ? -4 : 0, 0]);
  const logoScale = useTransform(smoothProgress, [0, 1], [isDynamic ? 0.92 : 1, 1]);
  const logoAlpha = useTransform(smoothProgress, [0, 0.2, 1], [isDynamic ? 0 : 1, isDynamic ? 0.6 : 1, 1]);

  // 2. Central Navigation (Menu)
  const navY = useTransform(smoothProgress, [0, 1], [isDynamic ? -30 : 0, 0]);
  const navScale = useTransform(smoothProgress, [0, 1], [isDynamic ? 1.05 : 1, 1]);
  const navAlpha = useTransform(smoothProgress, [0, 0.2, 1], [isDynamic ? 0 : 1, isDynamic ? 0.6 : 1, 1]);

  // 3. System Access (Right green CTA)
  const accessX = useTransform(smoothProgress, [0, 1], [isDynamic ? 20 : 0, 0]);
  const accessY = useTransform(smoothProgress, [0, 1], [isDynamic ? 20 : 0, 0]);
  const accessRot = useTransform(smoothProgress, [0, 1], [isDynamic ? 4 : 0, 0]);
  const accessScale = useTransform(smoothProgress, [0, 1], [isDynamic ? 0.95 : 1, 1]);
  const accessAlpha = useTransform(smoothProgress, [0, 0.2, 1], [isDynamic ? 0 : 1, isDynamic ? 0.6 : 1, 1]);

  // 4. Language Switcher (Globe block)
  const langX = useTransform(smoothProgress, [0, 1], [isDynamic ? 15 : 0, 0]);
  const langY = useTransform(smoothProgress, [0, 1], [isDynamic ? -15 : 0, 0]);
  const langRot = useTransform(smoothProgress, [0, 1], [isDynamic ? -4 : 0, 0]);
  const langScale = useTransform(smoothProgress, [0, 1], [isDynamic ? 1.05 : 1, 1]);
  const langAlpha = useTransform(smoothProgress, [0, 0.2, 1], [isDynamic ? 0 : 1, isDynamic ? 0.6 : 1, 1]);

  // 5. Header Shell Surface & Backdrop
  const headerAlpha = useTransform(smoothProgress, [0, 0.15, 1], [isDynamic ? 0 : 1, isDynamic ? 0.4 : 1, 1]);
  const headerY = useTransform(smoothProgress, [0, 1], [isDynamic ? '-15%' : '0%', '0%']);

  return {
    isInteractive,
    isScrolledPast,
    shouldReduceMotion,
    headerAlpha,
    headerY,
    logo: { x: logoX, y: logoY, rotate: logoRot, scale: logoScale, opacity: logoAlpha },
    nav: { y: navY, scale: navScale, opacity: navAlpha },
    access: { x: accessX, y: accessY, rotate: accessRot, scale: accessScale, opacity: accessAlpha },
    lang: { x: langX, y: langY, rotate: langRot, scale: langScale, opacity: langAlpha },
  };
}
