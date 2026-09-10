'use client';

import { useState, useEffect } from 'react';

// Global cache status
let isGloballyPreloaded = false;
let globalPreloadPromise: Promise<string | null> | null = null;

const VIDEO_MP4_SRC = '/video/dark-minimalist-4k.mp4';

/**
 * Preloads the portal explosion video asset into memory/browser HTTP cache
 * to guarantee 0ms instant playback without white/black flashing or decoding stalls.
 */
export const preloadPortalVideo = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  if (isGloballyPreloaded) return VIDEO_MP4_SRC;
  if (globalPreloadPromise) return globalPreloadPromise;

  globalPreloadPromise = (async () => {
    try {
      // 1. Fetch via force-cache to cache bytes directly into native HTTP cache
      const response = await fetch(VIDEO_MP4_SRC, { cache: 'force-cache' });
      if (!response.ok) {
        isGloballyPreloaded = true;
        return VIDEO_MP4_SRC;
      }

      // 2. Pre-warm HTML5 video element with non-blocking timeout
      const warmUpVideo = document.createElement('video');
      warmUpVideo.src = VIDEO_MP4_SRC;
      warmUpVideo.muted = true;
      warmUpVideo.playsInline = true;
      warmUpVideo.preload = 'auto';

      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          cleanup();
          resolve();
        }, 400);

        const onDone = () => {
          cleanup();
          resolve();
        };

        const cleanup = () => {
          clearTimeout(timeout);
          warmUpVideo.removeEventListener('canplay', onDone);
          warmUpVideo.removeEventListener('loadeddata', onDone);
          warmUpVideo.removeEventListener('error', onDone);
        };

        warmUpVideo.addEventListener('canplay', onDone);
        warmUpVideo.addEventListener('loadeddata', onDone);
        warmUpVideo.addEventListener('error', onDone);
        warmUpVideo.load();
      });

      isGloballyPreloaded = true;
      return VIDEO_MP4_SRC;
    } catch {
      isGloballyPreloaded = true;
      return VIDEO_MP4_SRC;
    }
  })();

  return globalPreloadPromise;
};

export interface UseVideoPreloaderReturn {
  isVideoReady: boolean;
  videoSrc: string;
  preloadVideo: () => Promise<string | null>;
}

export function useVideoPreloader(): UseVideoPreloaderReturn {
  const [isVideoReady, setIsVideoReady] = useState(isGloballyPreloaded);
  const [videoSrc, setVideoSrc] = useState<string>(VIDEO_MP4_SRC);

  useEffect(() => {
    if (isGloballyPreloaded) {
      setIsVideoReady(true);
      return;
    }

    // Non-blocking idle background prefetch (never block initial critical render)
    const runIdlePrefetch = () => {
      preloadPortalVideo().then((src) => {
        if (src) {
          setVideoSrc(src);
          setIsVideoReady(true);
        }
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
          runIdlePrefetch,
          { timeout: 4000 }
        );
        return () => {
          if ('cancelIdleCallback' in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
          }
        };
      } else {
        const t = setTimeout(runIdlePrefetch, 2500);
        return () => clearTimeout(t);
      }
    }
  }, []);

  return {
    isVideoReady,
    videoSrc,
    preloadVideo: preloadPortalVideo,
  };
}
