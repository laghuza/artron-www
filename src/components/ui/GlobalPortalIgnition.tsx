'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { FullscreenPortalOverlay } from './FullscreenPortalOverlay';
import { PortalParticleBlastCanvas } from './PortalParticleBlastCanvas';
import { useVideoPreloader } from '@/hooks/useVideoPreloader';
import { FastForward } from 'lucide-react';
import { soundEngine } from '@/core/utils/audio';

interface IgnitionCoords {
  x: number;
  y: number;
}

interface PortalIgnitionContextType {
  triggerIgnition: (options: {
    targetHref?: string;
    origin?: IgnitionCoords;
    onComplete?: () => void;
    color?: 'cyan' | 'emerald';
  }) => void;
  isIgniting: boolean;
  isVideoReady: boolean;
  isFallbackActive: boolean;
}

const PortalIgnitionContext = createContext<PortalIgnitionContextType | undefined>(undefined);

export const usePortalIgnition = () => {
  const context = useContext(PortalIgnitionContext);
  if (!context) {
    throw new Error('usePortalIgnition must be used within a PortalIgnitionProvider');
  }
  return context;
};

export const PortalIgnitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { videoSrc, isVideoReady } = useVideoPreloader();
  const [isIgniting, setIsIgniting] = useState(false);
  const [isVideoFadingOut, setIsVideoFadingOut] = useState(false);
  const [isFallbackActive, setIsFallbackActive] = useState(false);
  const [ignitionOrigin, setIgnitionOrigin] = useState<IgnitionCoords>({ x: 0, y: 0 });
  const [ignitionColor, setIgnitionColor] = useState<'cyan' | 'emerald'>('emerald');
  const [launchProgress, setLaunchProgress] = useState(0);
  const [activeTargetHref, setActiveTargetHref] = useState<string | undefined>(undefined);
  const [activeOnComplete, setActiveOnComplete] = useState<(() => void) | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationMs = 7300;

  const completeSequence = useCallback(() => {
    setIsIgniting(false);
    setIsVideoFadingOut(false);
    setIsFallbackActive(false);
    setLaunchProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (activeTargetHref) {
      router.push(activeTargetHref);
    }
    if (activeOnComplete) {
      activeOnComplete();
    }
  }, [activeTargetHref, activeOnComplete, router]);

  const cancelSequence = useCallback(() => {
    try {
      soundEngine.playClose();
    } catch {}
    setIsIgniting(false);
    setIsVideoFadingOut(false);
    setIsFallbackActive(false);
    setLaunchProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const triggerIgnition = useCallback(
    ({
      targetHref,
      origin,
      onComplete,
      color = 'emerald',
    }: {
      targetHref?: string;
      origin?: IgnitionCoords;
      onComplete?: () => void;
      color?: 'cyan' | 'emerald';
    }) => {
      // Audio feedback - instant tactile initiation
      try {
        soundEngine.playSystemAccess();
      } catch {}

      if (targetHref) {
        try {
          router.prefetch(targetHref);
        } catch {
          // Safe prefetch fallback
        }
      }

      const defaultX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      const defaultY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

      setActiveTargetHref(targetHref);
      setActiveOnComplete(() => onComplete);
      setIgnitionOrigin(origin || { x: defaultX, y: defaultY });
      setIgnitionColor(color);
      setLaunchProgress(0);
      setIsVideoFadingOut(false);
      setIsFallbackActive(!isVideoReady);

      if (shouldReduceMotion) {
        if (targetHref) router.push(targetHref);
        if (onComplete) onComplete();
        return;
      }

      setIsIgniting(true);

      // Trigger dynamically selected sound preset
      try {
        const preset = typeof window !== 'undefined' ? localStorage.getItem('artron_portal_sound_preset') || '0' : '0';
        if (preset === '0') {
          const originalAudio = new Audio('/original-video-sound.m4a');
          originalAudio.volume = 0.9;
          originalAudio.play().catch(() => {});
        } else if (preset === '1') soundEngine.playQuantumGenesis();
        else if (preset === '2') soundEngine.playPS5BootChord();
        else if (preset === '3') soundEngine.playPlasmaVortex();
        else if (preset === '4') soundEngine.playHologramSparkle();
        else if (preset === '5') {
          soundEngine.playSystemAccess();
          setTimeout(() => soundEngine.playBootCoreTension(), 100);
          setTimeout(() => soundEngine.playCoreBurst(), 1000);
          setTimeout(() => soundEngine.playParticleCoalesce(), 3000);
          setTimeout(() => soundEngine.playLogoChime(), 5200);
        }
      } catch {}

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = false;
          videoRef.current.volume = 0.95;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              if (videoRef.current) {
                // If browser blocks unmuted autoplay, fallback to muted video with discrete audio element
                videoRef.current.muted = true;
                videoRef.current.play().catch(() => {});
                const fallbackAudio = new Audio('/original-video-sound.m4a');
                fallbackAudio.volume = 0.95;
                fallbackAudio.play().catch(() => {});
              }
            });
          }
        }
      }, 50);

      const videoFadeTimer = setTimeout(() => {
        setIsVideoFadingOut(true);
      }, durationMs - 800);

      const navigationTimer = setTimeout(() => {
        if (targetHref) {
          router.push(targetHref);
        }
        if (onComplete) {
          onComplete();
        }
      }, durationMs - 200);

      const cleanupTimer = setTimeout(() => {
        setIsIgniting(false);
        setIsVideoFadingOut(false);
        setIsFallbackActive(false);
      }, durationMs + 200);

      return () => {
        clearTimeout(videoFadeTimer);
        clearTimeout(navigationTimer);
        clearTimeout(cleanupTimer);
      };
    },
    [router, shouldReduceMotion, isVideoReady, durationMs]
  );

  // Progressive progress counter over 7.3s
  useEffect(() => {
    if (!isIgniting) return;
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setLaunchProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        completeSequence();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isIgniting, durationMs, completeSequence]);

  // ESC to skip sequence
  useEffect(() => {
    if (!isIgniting) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeSequence();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIgniting, completeSequence]);

  const colorStyles =
    ignitionColor === 'emerald'
      ? {
          accentText: 'text-[#00ff87]',
          accentBar: 'bg-gradient-to-r from-[#00ff87] to-[#00e5ff]',
        }
      : {
          accentText: 'text-[#00D2FF]',
          accentBar: 'bg-gradient-to-r from-[#00A3FF] to-[#00D2FF]',
        };

  return (
    <PortalIgnitionContext.Provider
      value={{ triggerIgnition, isIgniting, isVideoReady: true, isFallbackActive }}
    >
      {children}

      <FullscreenPortalOverlay
        isOpen={isIgniting}
        onClose={cancelSequence}
        accentColor={ignitionColor}
        showCloseButton={false}
        className="pointer-events-auto bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black select-none">
          {/* Subtle Ambient Laser Progress Line at Top Edge */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-white/5 z-50 pointer-events-none overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ease-out ${colorStyles.accentBar}`}
              style={{
                width: `${launchProgress}%`,
                boxShadow: ignitionColor === 'emerald'
                  ? '0 0 12px rgba(0, 255, 135, 0.8), 0 0 24px rgba(0, 229, 255, 0.4)'
                  : '0 0 12px rgba(0, 163, 255, 0.8), 0 0 24px rgba(0, 210, 255, 0.4)',
              }}
            />
          </div>

          {/* 4K Native Clean Cinematic Video Layer with Synced Original Audio */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${
              isVideoFadingOut ? 'opacity-0' : 'opacity-100'
            }`}
            onEnded={completeSequence}
          />

          {/* Fallback & Ambient Dynamic Particles Overlay */}
          {isFallbackActive && (
            <PortalParticleBlastCanvas
              isActive={isIgniting}
              origin={ignitionOrigin}
              color={ignitionColor}
              durationMs={durationMs}
              onComplete={completeSequence}
            />
          )}

          {/* Unified High-Tech Skip Action Control */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-50 pointer-events-auto">
            <button
              onClick={completeSequence}
              type="button"
              aria-label="გამოტოვება (Esc)"
              className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 hover:border-[#00ff87]/50 text-white/90 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,255,135,0.3)] cursor-pointer min-h-[44px]"
            >
              <span
                className={`hidden sm:inline-flex items-center justify-center text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-md border ${
                  ignitionColor === 'emerald'
                    ? 'border-[#00ff87]/40 bg-[#00ff87]/10 text-[#00ff87]'
                    : 'border-[#00D2FF]/40 bg-[#00D2FF]/10 text-[#00D2FF]'
                }`}
              >
                ESC
              </span>
              <span className="text-xs font-semibold tracking-wide">
                გამოტოვება
              </span>
              <div
                className={`w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/15 transition-colors ${
                  ignitionColor === 'emerald' ? 'text-[#00ff87]' : 'text-[#00D2FF]'
                }`}
              >
                <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </FullscreenPortalOverlay>
    </PortalIgnitionContext.Provider>
  );
};
