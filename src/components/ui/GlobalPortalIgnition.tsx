'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { soundEngine } from '@/core';
import { useVideoPreloader } from '@/hooks/useVideoPreloader';
import { FullscreenPortalOverlay } from './FullscreenPortalOverlay';
import { PortalParticleBlastCanvas } from './PortalParticleBlastCanvas';

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
  const [ignitionColor, setIgnitionColor] = useState<'cyan' | 'emerald'>('cyan');
  const videoRef = useRef<HTMLVideoElement>(null);

  const triggerIgnition = useCallback(
    ({
      targetHref,
      origin,
      onComplete,
      color = 'cyan',
    }: {
      targetHref?: string;
      origin?: IgnitionCoords;
      onComplete?: () => void;
      color?: 'cyan' | 'emerald';
    }) => {
      // Audio feedback
      try {
        soundEngine.playSystemAccess();
      } catch {
        // Safe audio fallback
      }

      const defaultX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      const defaultY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

      setIgnitionOrigin(origin || { x: defaultX, y: defaultY });
      setIgnitionColor(color);

      if (shouldReduceMotion) {
        if (targetHref) router.push(targetHref);
        if (onComplete) onComplete();
        return;
      }

      setIsIgniting(true);
      setIsVideoFadingOut(false);
      setIsFallbackActive(!isVideoReady);

      // Attempt immediate video playback with zero-fail fallback watchdog
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked by browser policy / Low-power mode -> activate Canvas fallback
            setIsFallbackActive(true);
          });
        }
      } else if (!isVideoReady) {
        setIsFallbackActive(true);
      }

      // Safety watchdog: verify video actually advanced within 160ms
      const watchdogTimer = setTimeout(() => {
        if (videoRef.current && (videoRef.current.paused || videoRef.current.currentTime === 0)) {
          setIsFallbackActive(true);
        }
      }, 160);

      // 1. Climax Particle Dispersal (~1750ms): Smoothly fade out overlay layers
      const videoFadeTimer = setTimeout(() => {
        setIsVideoFadingOut(true);
      }, 1750);

      // 2. Seamless Morph Transition (~1850ms): Trigger navigation / callback while particles disperse
      const navigationTimer = setTimeout(() => {
        if (targetHref) {
          router.push(targetHref);
        }
        if (onComplete) {
          onComplete();
        }
      }, 1850);

      // 3. Final Cleanup (~2250ms): Reset portal state
      const cleanupTimer = setTimeout(() => {
        setIsIgniting(false);
        setIsVideoFadingOut(false);
        setIsFallbackActive(false);
      }, 2250);

      return () => {
        clearTimeout(watchdogTimer);
        clearTimeout(videoFadeTimer);
        clearTimeout(navigationTimer);
        clearTimeout(cleanupTimer);
      };
    },
    [router, shouldReduceMotion, isVideoReady]
  );

  // Synchronize video playback when ignition starts
  useEffect(() => {
    if (isIgniting && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsFallbackActive(true);
      });
    }
  }, [isIgniting]);

  // Allow ESC to cancel ignition at any time
  useEffect(() => {
    if (!isIgniting) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsIgniting(false);
        setIsVideoFadingOut(false);
        setIsFallbackActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIgniting]);

  const colorStyles =
    ignitionColor === 'emerald'
      ? {
          ringBorder: 'border-[#00ff87]',
          ringGlow: '0 0 50px #00ff87, 0 0 100px rgba(0, 255, 135, 0.8)',
          overlayBg: 'radial-gradient(circle at center, rgba(0, 255, 135, 0.22) 0%, rgba(8, 11, 16, 0.92) 80%)',
          videoFilter: 'hue-rotate(65deg) saturate(1.4) brightness(1.1)',
        }
      : {
          ringBorder: 'border-[#00D2FF]',
          ringGlow: '0 0 50px #00A3FF, 0 0 100px rgba(0, 210, 255, 0.8)',
          overlayBg: 'radial-gradient(circle at center, rgba(0, 163, 255, 0.22) 0%, rgba(8, 11, 16, 0.92) 80%)',
          videoFilter: 'saturate(1.3) brightness(1.05)',
        };

  return (
    <PortalIgnitionContext.Provider
      value={{ triggerIgnition, isIgniting, isVideoReady, isFallbackActive }}
    >
      {children}

      {/* Screen-Level Fullscreen Portal Overlay */}
      <FullscreenPortalOverlay
        isOpen={isIgniting}
        onClose={() => {
          setIsIgniting(false);
          setIsVideoFadingOut(false);
          setIsFallbackActive(false);
        }}
        accentColor={ignitionColor}
        showCloseButton={true}
        className="pointer-events-auto"
      >
        {/* Hardware-Accelerated Video Layer (0ms instant playback with auto-fallback) */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          muted
          onError={() => setIsFallbackActive(true)}
          onStalled={() => setIsFallbackActive(true)}
          className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none mix-blend-screen will-change-transform transition-opacity duration-400 ease-out ${
            isFallbackActive ? 'opacity-0' : (isVideoFadingOut ? 'opacity-0 scale-105' : 'opacity-95 scale-100')
          }`}
          style={{
            transform: 'translate3d(0,0,0)',
            filter: colorStyles.videoFilter,
            transitionProperty: 'opacity, transform',
          }}
        />

        {/* Zero-Fail HTML5 Canvas & Physics Particle Fallback Engine */}
        <PortalParticleBlastCanvas
          origin={ignitionOrigin}
          color={ignitionColor}
          isActive={isIgniting}
          className={`transition-opacity duration-500 ease-out ${
            isVideoFadingOut ? 'opacity-0' : isFallbackActive ? 'opacity-100' : 'opacity-60'
          }`}
        />

        {/* Dynamic Radial Aura Blast */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: colorStyles.overlayBg,
            animation: 'console-reveal 0.4s ease-out forwards',
          }}
        />

        {/* Primary Shockwave Expanding Blast Ring from Origin */}
        <div
          className={`fixed rounded-full border-4 ${colorStyles.ringBorder} animate-screen-ignition-shockwave pointer-events-none`}
          style={{
            left: ignitionOrigin.x,
            top: ignitionOrigin.y,
            width: '80px',
            height: '80px',
            marginLeft: '-40px',
            marginTop: '-40px',
            boxShadow: colorStyles.ringGlow,
            willChange: 'transform, opacity',
          }}
        />

        {/* Secondary Concentric Shockwave Ring */}
        <div
          className={`fixed rounded-full border-2 ${colorStyles.ringBorder} animate-screen-ignition-shockwave pointer-events-none`}
          style={{
            left: ignitionOrigin.x,
            top: ignitionOrigin.y,
            width: '130px',
            height: '130px',
            marginLeft: '-65px',
            marginTop: '-65px',
            animationDelay: '60ms',
            boxShadow: colorStyles.ringGlow,
            willChange: 'transform, opacity',
          }}
        />
      </FullscreenPortalOverlay>
    </PortalIgnitionContext.Provider>
  );
};

