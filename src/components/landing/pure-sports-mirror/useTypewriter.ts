'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — HUD Data-Stream character-by-character reveal.
 * Respects `prefers-reduced-motion` (shows full text immediately).
 *
 * @param text    — full string to stream
 * @param trigger — key change that restarts the animation (e.g. pill id)
 * @param speed   — ms per character (default: 22ms)
 * @param delay   — ms before starting after trigger change (default: 60ms)
 */
export function useTypewriter(
  text: string,
  trigger: string,
  speed = 22,
  delay = 60,
): { displayedText: string; isDone: boolean } {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced-motion OS preference
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    setDisplayedText('');
    setIsDone(false);

    let charIndex = 0;

    const startTimeout = setTimeout(() => {
      const tick = () => {
        charIndex++;
        setDisplayedText(text.slice(0, charIndex));
        if (charIndex < text.length) {
          frameRef.current = setTimeout(tick, speed);
        } else {
          setIsDone(true);
        }
      };
      tick();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return { displayedText, isDone };
}
