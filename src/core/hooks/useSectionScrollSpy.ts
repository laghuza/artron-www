'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTION_NODES } from '@/components/navigation/elevatorSections';
import { isInitialBrowserReload } from '@/components/navigation/ScrollRestorationHandler';

export const SECTION_IDS = SECTION_NODES.map((node) => node.id);

export interface SectionScrollState {
  activeId: string;
  activeIndex: number;
  sectionProgress: number; // continuous float 0.0 to 7.0 for smooth physical elevator rail
  isVisible: boolean;
  isHero: boolean;
}

const INITIAL_SCROLL_STATE: SectionScrollState = {
  activeId: '',
  activeIndex: -1,
  sectionProgress: 0,
  isVisible: false,
  isHero: true,
};

export function useSectionScrollSpy(trackProgress = true) {
  const [state, setState] = useState<SectionScrollState>(INITIAL_SCROLL_STATE);

  const isManualNavRef = useRef<boolean>(false);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tickingRef = useRef<boolean>(false);
  const sectionTopsRef = useRef<number[]>([]);
  const lastMeasureTimeRef = useRef<number>(0);

  const measureSectionTops = useCallback(() => {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return [];
    const scrollY = window.scrollY;
    const tops: number[] = [];
    let foundAny = false;
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el) {
        foundAny = true;
        tops.push(el.getBoundingClientRect().top + scrollY);
      } else {
        tops.push(tops[i - 1] ?? 0);
      }
    }
    if (!foundAny) return [];
    sectionTopsRef.current = tops;
    lastMeasureTimeRef.current = Date.now();
    return tops;
  }, []);

  const releaseManualNav = useCallback(() => {
    if (isManualNavRef.current) {
      isManualNavRef.current = false;
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    }
  }, []);

  const updateSectionState = useCallback(() => {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return;
    if (isManualNavRef.current) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const docHeight = scrollHeight - viewportHeight;

    // Use cached section tops or measure if stale (> 2500ms or empty)
    let sectionTops = sectionTopsRef.current;
    if (sectionTops.length === 0 || Date.now() - lastMeasureTimeRef.current > 2500) {
      sectionTops = measureSectionTops();
    }

    const firstSectionTop = sectionTops[0] ?? 500;
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

    let foundIndex = -1;
    for (let i = sectionTops.length - 1; i >= 0; i--) {
      if (focalScroll >= sectionTops[i]) {
        foundIndex = i;
        break;
      }
    }

    // If focal scroll has not reached the first section yet, keep in Hero state
    if (foundIndex === -1) {
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

    // Continuous fractional progress for seamless elevator cable line (if requested)
    let progress = foundIndex;
    if (trackProgress && foundIndex < sectionTops.length - 1) {
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
      // For hooks that do not track progress (e.g. Header), only re-render when section actually changes
      if (!trackProgress) {
        if (
          prev.activeIndex === foundIndex &&
          prev.activeId === currentId &&
          prev.isVisible &&
          !prev.isHero
        ) {
          return prev;
        }
        return {
          activeId: currentId,
          activeIndex: foundIndex,
          sectionProgress: foundIndex,
          isVisible: true,
          isHero: false,
        };
      }

      // Avoid re-renders if index/id hasn't changed and progress moved insignificantly (< 0.025)
      if (
        prev.activeIndex === foundIndex &&
        prev.activeId === currentId &&
        prev.isVisible &&
        !prev.isHero &&
        Math.abs(prev.sectionProgress - progress) < 0.025
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
  }, [trackProgress, measureSectionTops]);

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
    }, 3500);

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
      }, 3500);

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

    // Initial check on mount: check URL hash or target nav from sessionStorage
    let initialTargetHandled = false;
    try {
      if (isInitialBrowserReload()) {
        try {
          sessionStorage.removeItem('artron_target_nav');
        } catch {}
        if (typeof window !== 'undefined') {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
        setState(INITIAL_SCROLL_STATE);
        initialTargetHandled = true;
      } else {
        let stored = sessionStorage.getItem('artron_target_nav');
        if (!stored && window.location.hash) {
          stored = `/#${window.location.hash.replace(/^#/, '')}`;
        }
        if (stored) {
          const id = stored.replace(/^\/?#/, '').split('?')[0];
          const primaryId = SECTION_IDS.includes(id)
            ? id
            : (id === 'ai' || id === 'multimodal-ai'
                ? 'ai-intelligence'
                : id === 'roi'
                ? 'dashboard-features'
                : id === 'b2c-mobile'
                ? 'mobile-app'
                : '');
          const index = SECTION_IDS.indexOf(primaryId);
          if (index !== -1) {
            isManualNavRef.current = true;
            if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
            manualNavTimerRef.current = setTimeout(() => {
              isManualNavRef.current = false;
            }, 3500);

            setState({
              activeId: primaryId,
              activeIndex: index,
              sectionProgress: index,
              isVisible: true,
              isHero: false,
            });
            initialTargetHandled = true;
          }
        }
      }
    } catch {}

    if (!initialTargetHandled) {
      updateSectionState();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', releaseManualNav);
      window.removeEventListener('touchmove', releaseManualNav);
      window.removeEventListener('artron-section-change', handleExternalSectionChange);
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    };
  }, [handleScroll, updateSectionState, releaseManualNav]);

  return {
    ...state,
    setManualActive,
    releaseManualNav,
  };
}
