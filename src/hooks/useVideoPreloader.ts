'use client';

import { useState, useEffect } from 'react';

// Global in-memory cache to prevent duplicate fetches across component re-renders
let cachedVideoBlobUrl: string | null = null;
let isGloballyPreloaded = false;
let globalPreloadPromise: Promise<string | null> | null = null;

const VIDEO_MP4_SRC = '/video/portal-blast.mp4';
const VIDEO_WEBM_SRC = '/video/portal-blast.webm';

/**
 * Preloads the portal explosion video asset into memory / blob URL
 * to guarantee 0ms instant playback without white/black flashing.
 */
export const preloadPortalVideo = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  if (cachedVideoBlobUrl) return cachedVideoBlobUrl;
  if (globalPreloadPromise) return globalPreloadPromise;

  globalPreloadPromise = (async () => {
    try {
      // Determine optimal source based on browser video support
      const testVideo = document.createElement('video');
      const canPlayWebm = testVideo.canPlayType('video/webm; codecs="vp9, opus"') || testVideo.canPlayType('video/webm');
      const targetSrc = canPlayWebm ? VIDEO_WEBM_SRC : VIDEO_MP4_SRC;

      // 1. Fetch via force-cache to cache bytes in HTTP cache
      const response = await fetch(targetSrc, { cache: 'force-cache' });
      if (!response.ok) {
        // Fallback to MP4 if WebM fetch fails
        const fallbackRes = await fetch(VIDEO_MP4_SRC, { cache: 'force-cache' });
        if (!fallbackRes.ok) throw new Error('Failed to fetch video asset');
        const blob = await fallbackRes.blob();
        cachedVideoBlobUrl = URL.createObjectURL(blob);
      } else {
        const blob = await response.blob();
        cachedVideoBlobUrl = URL.createObjectURL(blob);
      }

      // 2. Warm up video decoder in memory
      const warmUpVideo = document.createElement('video');
      warmUpVideo.src = cachedVideoBlobUrl;
      warmUpVideo.muted = true;
      warmUpVideo.playsInline = true;
      warmUpVideo.preload = 'auto';

      await new Promise<void>((resolve) => {
        const onCanPlay = () => {
          warmUpVideo.removeEventListener('canplaythrough', onCanPlay);
          warmUpVideo.removeEventListener('error', onError);
          resolve();
        };
        const onError = () => {
          warmUpVideo.removeEventListener('canplaythrough', onCanPlay);
          warmUpVideo.removeEventListener('error', onError);
          resolve(); // Resolve anyway to avoid hanging
        };
        warmUpVideo.addEventListener('canplaythrough', onCanPlay);
        warmUpVideo.addEventListener('error', onError);
        warmUpVideo.load();
      });

      isGloballyPreloaded = true;
      return cachedVideoBlobUrl;
    } catch {
      // Fallback: Return raw src if blob creation fails
      cachedVideoBlobUrl = VIDEO_MP4_SRC;
      isGloballyPreloaded = true;
      return cachedVideoBlobUrl;
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
  const [videoSrc, setVideoSrc] = useState<string>(cachedVideoBlobUrl || VIDEO_MP4_SRC);

  useEffect(() => {
    if (isGloballyPreloaded && cachedVideoBlobUrl) {
      setIsVideoReady(true);
      setVideoSrc(cachedVideoBlobUrl);
      return;
    }

    // Trigger preload during idle time or immediately after mount
    const executePreload = () => {
      preloadPortalVideo().then((src) => {
        if (src) {
          setVideoSrc(src);
          setIsVideoReady(true);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        executePreload,
        { timeout: 1500 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(executePreload, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return {
    isVideoReady,
    videoSrc,
    preloadVideo: preloadPortalVideo,
  };
}
