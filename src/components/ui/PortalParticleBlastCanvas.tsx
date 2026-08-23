'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  glowColor: string;
  isSpark: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

interface BlastRing {
  radius: number;
  maxRadius: number;
  lineWidth: number;
  alpha: number;
  speed: number;
  color: string;
}

export interface PortalParticleBlastCanvasProps {
  origin: { x: number; y: number };
  color?: 'cyan' | 'emerald';
  isActive: boolean;
  className?: string;
}

export const PortalParticleBlastCanvas: React.FC<PortalParticleBlastCanvasProps> = ({
  origin,
  color = 'cyan',
  isActive,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with DPR scaling for crisp rendering
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const origX = origin.x || width / 2;
    const origY = origin.y || height / 2;

    // Color palettes for Cyan vs Emerald blast
    const isEmerald = color === 'emerald';
    const primaryGlow = isEmerald ? 'rgba(0, 255, 135, 0.9)' : 'rgba(0, 163, 255, 0.9)';
    const secondaryGlow = isEmerald ? 'rgba(0, 229, 255, 0.8)' : 'rgba(0, 210, 255, 0.8)';
    const particleColors = isEmerald
      ? ['#00ff87', '#00e5ff', '#10B981', '#FFFFFF', '#6ee7b7']
      : ['#00A3FF', '#00D2FF', '#0066FF', '#FFFFFF', '#7dd3fc'];

    // 1. Initialize Particles (Explosive Radial Dispersal)
    const particleCount = 140;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 2; // High initial radial velocity
      const isSpark = Math.random() > 0.4;
      const chosenColor = particleColors[Math.floor(Math.random() * particleColors.length)];

      particles.push({
        x: origX,
        y: origY,
        vx: Math.cos(angle) * speed * (isSpark ? 1.4 : 0.8),
        vy: Math.sin(angle) * speed * (isSpark ? 1.4 : 0.8),
        size: isSpark ? Math.random() * 3 + 1.5 : Math.random() * 7 + 4,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.006, // ~1.5 - 2s lifetime
        color: chosenColor,
        glowColor: Math.random() > 0.5 ? primaryGlow : secondaryGlow,
        isSpark,
        trail: [],
      });
    }

    // 2. Initialize Shockwave Energy Rings
    const rings: BlastRing[] = [
      {
        radius: 10,
        maxRadius: Math.max(width, height) * 0.9,
        lineWidth: 6,
        alpha: 1,
        speed: 16,
        color: isEmerald ? '#00ff87' : '#00D2FF',
      },
      {
        radius: 5,
        maxRadius: Math.max(width, height) * 0.75,
        lineWidth: 3,
        alpha: 0.8,
        speed: 12,
        color: isEmerald ? '#00e5ff' : '#00A3FF',
      },
      {
        radius: 0,
        maxRadius: Math.max(width, height) * 0.6,
        lineWidth: 2,
        alpha: 0.6,
        speed: 9,
        color: '#FFFFFF',
      },
    ];

    let coreBurstScale = 1;
    let coreBurstAlpha = 1;

    const render = () => {
      // Clear with slight trail retention for motion blur effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw Expanding Radial Core Burst
      if (coreBurstAlpha > 0.01) {
        const coreGradient = ctx.createRadialGradient(
          origX,
          origY,
          0,
          origX,
          origY,
          120 * coreBurstScale
        );
        coreGradient.addColorStop(0, '#FFFFFF');
        coreGradient.addColorStop(0.3, primaryGlow);
        coreGradient.addColorStop(0.7, secondaryGlow);
        coreGradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = coreGradient;
        ctx.globalAlpha = coreBurstAlpha;
        ctx.beginPath();
        ctx.arc(origX, origY, 120 * coreBurstScale, 0, Math.PI * 2);
        ctx.fill();

        coreBurstScale += 0.04;
        coreBurstAlpha -= 0.025;
      }

      // 2. Render & Update Shockwave Rings
      for (const ring of rings) {
        if (ring.alpha > 0.01 && ring.radius < ring.maxRadius) {
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = ring.lineWidth;
          ctx.globalAlpha = ring.alpha;
          ctx.shadowBlur = 20;
          ctx.shadowColor = ring.color;

          ctx.beginPath();
          ctx.arc(origX, origY, ring.radius, 0, Math.PI * 2);
          ctx.stroke();

          ring.radius += ring.speed;
          ring.speed *= 0.985; // Slight atmospheric drag
          ring.alpha -= 0.014;
          ring.lineWidth = Math.max(0.5, ring.lineWidth * 0.98);
        }
      }

      // 3. Render & Update Particles and Micro-Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Store trail point
        if (p.isSpark) {
          p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha });
          if (p.trail.length > 5) p.trail.pop();

          // Render spark trail
          for (let t = 0; t < p.trail.length; t++) {
            const tp = p.trail[t];
            ctx.fillStyle = p.color;
            ctx.globalAlpha = tp.alpha * (1 - t / p.trail.length) * 0.5;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, p.size * (1 - t / p.trail.length), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Render main particle head
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.isSpark ? 12 : 24;
        ctx.shadowColor = p.glowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Physics step: drag, velocity, alpha decay
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.975; // Drag
        p.vy *= 0.975;
        p.alpha -= p.decay;
        p.size = Math.max(0.5, p.size * 0.988);
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      if (particles.length > 0 || coreBurstAlpha > 0.01 || rings.some((r) => r.alpha > 0.01)) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isActive, origin, color]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-20 mix-blend-screen will-change-transform ${className}`}
      style={{ transform: 'translate3d(0,0,0)' }}
    />
  );
};
