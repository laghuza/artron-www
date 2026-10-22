'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTION_NODES } from '@/components/navigation/elevatorSections';

export const SECTION_IDS = SECTION_NODES.map((node) => node.id);

export interface SectionScrollState {
  activeId: string;
  activeIndex: number;
  sectionProgress: number; // continuous float 0.0 to 7.0 for smooth physical elevator rail
  isVisible: boolean;
  isHero: boolean;
}

export function useSectionScrollSpy() {
  const [state, setState] = useState<SectionScrollState>({
    activeId: '',
    activeIndex: -1,
    sectionProgress: 0,
    isVisible: false,
    isHero: true,
  });

  const isManualNavRef = useRef<boolean>(false);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tickingRef = useRef<boolean>(false);

  const releaseManualNav = useCallback(() => {
    if (isManualNavRef.current) {
      isManualNavRef.current = false;
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    }
  }, []);

  const updateSectionState = useCallback(() => {
    if (isManualNavRef.current) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const docHeight = scrollHeight - viewportHeight;

    const firstSection = document.getElementById(SECTION_IDS[0]);
    const firstSectionTop = firstSection
      ? firstSection.getBoundingClientRect().top + scrollY
      : 500;
    const triggerOffset = Math.max(firstSectionTop - 280, 180);

    // 1. Top / Hero Boundary
    if (scrollY < triggerOffset) {
      setState((prev) => {
        if (prev.isHero && !prev.isVisible && prev.activeIndex === -1) return prev;
        return {
          activeId: '',
          activeIndex: -1,
          sectionProgress: 0,
          isVisible: false,
          isHero: true,
        };
      });
      return;
    }

    // 2. Bottom / FAQ Boundary
    if (docHeight > 0 && scrollY + viewportHeight >= scrollHeight - 60) {
      const lastIndex = SECTION_IDS.length - 1;
      const lastId = SECTION_IDS[lastIndex];
      setState((prev) => {
        if (prev.activeIndex === lastIndex && prev.activeId === lastId && prev.isVisible) return prev;
        return {
          activeId: lastId,
          activeIndex: lastIndex,
          sectionProgress: lastIndex,
          isVisible: true,
          isHero: false,
        };
      });
      return;
    }

    // 3. Focal Point tracking (38% of viewport for natural eye level)
    const focalScroll = scrollY + viewportHeight * 0.38;

    const sectionTops: number[] = [];
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el) {
        sectionTops.push(el.getBoundingClientRect().top + scrollY);
      } else {
        sectionTops.push(sectionTops[i - 1] ?? 0);
      }
    }

    let foundIndex = 0;
    for (let i = sectionTops.length - 1; i >= 0; i--) {
      if (focalScroll >= sectionTops[i]) {
        foundIndex = i;
        break;
      }
    }

    // Continuous fractional progress for seamless elevator cable line
    let progress = foundIndex;
    if (foundIndex < sectionTops.length - 1) {
      const currentTop = sectionTops[foundIndex];
      const nextTop = sectionTops[foundIndex + 1];
      const span = nextTop - currentTop;
      if (span > 0) {
        const fraction = (focalScroll - currentTop) / span;
        progress = foundIndex + Math.min(Math.max(fraction, 0), 1);
      }
    }

    const currentId = SECTION_IDS[foundIndex] || '';

    setState((prev) => {
      // Avoid re-renders if index/id hasn't changed and progress moved insignificantly
      if (
        prev.activeIndex === foundIndex &&
        prev.activeId === currentId &&
        prev.isVisible &&
        !prev.isHero &&
        Math.abs(prev.sectionProgress - progress) < 0.015
      ) {
        return prev;
      }
      return {
        activeId: currentId,
        activeIndex: foundIndex,
        sectionProgress: progress,
        isVisible: true,
        isHero: false,
      };
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        updateSectionState();
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, [updateSectionState]);

  const setManualActive = useCallback((id: string, index?: number) => {
    const targetIndex = index !== undefined ? index : SECTION_IDS.indexOf(id);
    if (targetIndex === -1 && id !== '') return;

    isManualNavRef.current = true;
    if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 900);

    const targetProgress = Math.max(0, targetIndex);
    setState({
      activeId: id,
      activeIndex: targetIndex,
      sectionProgress: targetProgress,
      isVisible: targetIndex >= 0,
      isHero: targetIndex === -1,
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('artron-section-change', {
          detail: { id, index: targetIndex, href: id ? `/#${id}` : '/' },
        })
      );
    }
  }, []);

  useEffect(() => {
    const handleExternalSectionChange = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string; index?: number }>).detail;
      if (!detail) return;
      const targetIndex =
        detail.index !== undefined ? detail.index : SECTION_IDS.indexOf(detail.id);

      isManualNavRef.current = true;
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
      manualNavTimerRef.current = setTimeout(() => {
        isManualNavRef.current = false;
      }, 900);

      setState({
        activeId: detail.id,
        activeIndex: targetIndex,
        sectionProgress: Math.max(0, targetIndex),
        isVisible: targetIndex >= 0,
        isHero: targetIndex === -1,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('wheel', releaseManualNav, { passive: true });
    window.addEventListener('touchmove', releaseManualNav, { passive: true });
    window.addEventListener('artron-section-change', handleExternalSectionChange);
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', releaseManualNav, { passive: true });
    }

    // Initial check
    updateSectionState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', releaseManualNav);
      window.removeEventListener('touchmove', releaseManualNav);
      window.removeEventListener('artron-section-change', handleExternalSectionChange);
      if ('onscrollend' in window) {
        window.removeEventListener('scrollend', releaseManualNav);
      }
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    };
  }, [handleScroll, updateSectionState, releaseManualNav]);

  return {
    ...state,
    setManualActive,
    releaseManualNav,
  };
}
