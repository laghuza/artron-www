'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/landing/Footer';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { AboutVisionCanvas } from './components/AboutVisionCanvas';
import { AboutRailNav } from './components/AboutRailNav';
import { AboutManifesto } from './components/AboutManifesto';
import { AboutArchitecture } from './components/AboutArchitecture';
import { AboutReliability } from './components/AboutReliability';
import { AboutCallToUnity } from './components/AboutCallToUnity';
import './aboutVision.css';

export default function AboutClient() {
  const scrollStateRef = useRef<{ state: number; active: number }>({ state: 0, active: -1 });
  const [activeChapter, setActiveChapter] = useState(0);

  const handleActiveNodeChange = useCallback((nodeIndex: number) => {
    scrollStateRef.current.active = nodeIndex;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const ids = ['s1', 's2', 's3', 's4'];
      const secs = ids.map((id) => document.getElementById(id));

      let s = 0;
      for (let i = 1; i < 4; i++) {
        const el = secs[i];
        if (el) {
          const t = el.getBoundingClientRect().top;
          s += Math.min(1, Math.max(0, (vh - t) / (vh * 0.75)));
        }
      }
      scrollStateRef.current.state = s;

      let cur = 0;
      secs.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < vh * 0.5) cur = i;
      });
      setActiveChapter(cur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for scroll-reveal `.vision-rv` elements
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
    );

    document.querySelectorAll('.vision-rv').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="vision-root selection:bg-amber-400/25 selection:text-white">
      {/* 3D WebGL Particle & Artifact Canvas */}
      <AboutVisionCanvas scrollStateRef={scrollStateRef} />

      {/* Desktop Vertical Rail Navigation */}
      <AboutRailNav activeChapter={activeChapter} />

      {/* Global Header */}
      <Header isSticky={true} />

      {/* Main Content Chapters */}
      <main className="relative z-10">
        <AboutManifesto />
        <AboutArchitecture onActiveNodeChange={handleActiveNodeChange} />
        <AboutReliability />
        <AboutCallToUnity />
      </main>

      {/* Global Footer & Consent */}
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
