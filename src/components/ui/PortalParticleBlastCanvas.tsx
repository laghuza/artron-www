'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface BlastParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export interface PortalParticleBlastCanvasProps {
  origin?: { x: number; y: number };
  color?: 'cyan' | 'emerald';
  isActive: boolean;
  className?: string;
  durationMs?: number;
  onComplete?: () => void;
}

export const PortalParticleBlastCanvas: React.FC<PortalParticleBlastCanvasProps> = ({
  origin,
  color = 'emerald',
  isActive,
  className = '',
  durationMs = 9000,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 1, 2) : 2;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const origX = width / 2;
    const origY = height / 2 - 30;

    const isEmerald = color === 'emerald';
    const primaryColor = isEmerald ? '#00ff87' : '#00A3FF';
    const secondaryColor = isEmerald ? '#00e5ff' : '#00D2FF';

    // 1. Cosmic Stardust Background
    const stars: Star[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.45 + 0.2,
      twinkleSpeed: Math.random() * 0.003 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // 2. 8 Outer Node Offsets (3x3 Matrix layout)
    const gridSpacing = Math.min(width * 0.11, 58);
    const nodeOffsets = [
      { dx: -gridSpacing, dy: -gridSpacing },
      { dx: 0, dy: -gridSpacing },
      { dx: gridSpacing, dy: -gridSpacing },
      { dx: -gridSpacing, dy: 0 },
      { dx: gridSpacing, dy: 0 },
      { dx: -gridSpacing, dy: gridSpacing },
      { dx: 0, dy: gridSpacing },
      { dx: gridSpacing, dy: gridSpacing },
    ];

    // 3. Blast Particles for Stage 2 & 3
    const blastParticles: BlastParticle[] = [];
    const createExplosion = (count = 130) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 3;
        blastParticles.push({
          x: origX,
          y: origY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.2,
          alpha: Math.random() * 0.9 + 0.1,
          decay: Math.random() * 0.012 + 0.006,
          color: i % 3 === 0 ? '#FFFFFF' : i % 2 === 0 ? primaryColor : secondaryColor,
        });
      }
    };

    let explosionTriggered = false;
    startTimeRef.current = performance.now();

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(1, elapsed / durationMs);

      // Trail & Clear Frame
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // ─── BACKGROUND: Ambient Stardust ───
      for (const star of stars) {
        const twinkle = Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = star.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ═════════════════════════════════════════════════════════════════
      // ⏱️ STAGE 1: 0–3s (0–3000ms) — 9 NODES & LASER IMPULSES
      // ═════════════════════════════════════════════════════════════════
      if (elapsed < 3200) {
        const stage1Alpha = elapsed < 2600 ? Math.min(1, elapsed / 600) : Math.max(0, 1 - (elapsed - 2600) / 500);
        const convergeProgress = elapsed > 2500 ? (elapsed - 2500) / 600 : 0;
        const currentSpacingMult = 1 - Math.sin(convergeProgress * Math.PI * 0.5) * 0.85;

        // Draw Laser Beams & Travelling Packets
        for (let i = 0; i < nodeOffsets.length; i++) {
          const node = nodeOffsets[i];
          const nx = origX + node.dx * currentSpacingMult;
          const ny = origY + node.dy * currentSpacingMult;

          // Main Laser Beam
          const pulse = Math.sin(elapsed * 0.007 + i * 0.8) * 0.25 + 0.75;
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.65 * stage1Alpha * pulse;
          ctx.beginPath();
          ctx.moveTo(origX, origY);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          // Laser Halo
          ctx.strokeStyle = secondaryColor;
          ctx.lineWidth = 5.5;
          ctx.globalAlpha = 0.22 * stage1Alpha * pulse;
          ctx.beginPath();
          ctx.moveTo(origX, origY);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          // Travelling Energy Packet along beam
          const packetT = (Math.sin(elapsed * 0.004 + i * 1.2) + 1) * 0.5;
          const px = origX + (nx - origX) * packetT;
          const py = origY + (ny - origY) * packetT;
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.9 * stage1Alpha;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw 8 Outer White Nodes (Crisp Retina Glow)
        for (const node of nodeOffsets) {
          const nx = origX + node.dx * currentSpacingMult;
          const ny = origY + node.dy * currentSpacingMult;
          const radius = 7.5;

          // Outer White Aura
          const aura = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 2.8);
          aura.addColorStop(0, '#FFFFFF');
          aura.addColorStop(0.35, 'rgba(255, 255, 255, 0.75)');
          aura.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = aura;
          ctx.globalAlpha = 0.85 * stage1Alpha;
          ctx.beginPath();
          ctx.arc(nx, ny, radius * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // Solid White Node Core
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 1 * stage1Alpha;
          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 1 Central Radiant Emerald/Green Node
        const coreBreath = Math.sin(elapsed * 0.008) * 0.15 + 0.85;
        const coreRadius = (elapsed > 2500 ? 14 + (elapsed - 2500) * 0.03 : 14) * coreBreath;

        const centralGlow = ctx.createRadialGradient(origX, origY, 0, origX, origY, coreRadius * 5.5);
        centralGlow.addColorStop(0, '#FFFFFF');
        centralGlow.addColorStop(0.25, primaryColor);
        centralGlow.addColorStop(0.65, secondaryColor);
        centralGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = centralGlow;
        ctx.globalAlpha = 0.95 * stage1Alpha;
        ctx.beginPath();
        ctx.arc(origX, origY, coreRadius * 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 1 * stage1Alpha;
        ctx.beginPath();
        ctx.arc(origX, origY, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1 * stage1Alpha;
        ctx.beginPath();
        ctx.arc(origX, origY, coreRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      // ═════════════════════════════════════════════════════════════════
      // ⏱️ STAGE 2: 3–6s (3000–6000ms) — PURE ENERGETIC PULSATION & BLAST
      // (NO GEAR 'A' LOGO — ONLY PURE CONCENTRIC ENERGY SHOCKWAVES)
      // ═════════════════════════════════════════════════════════════════
      if (elapsed >= 2900 && elapsed < 6400) {
        if (!explosionTriggered && elapsed >= 3000) {
          createExplosion(150);
          explosionTriggered = true;
        }

        const blastElapsed = elapsed - 3000;
        const stage2Alpha = blastElapsed < 400 ? blastElapsed / 400 : Math.max(0, 1 - (blastElapsed - 2200) / 800);

        // Concentric Expanding Energy Shockwaves
        const shockwaveSpeeds = [0.85, 0.6, 0.38, 0.22];
        for (let s = 0; s < shockwaveSpeeds.length; s++) {
          const waveRadius = Math.max(0, (blastElapsed - s * 160) * shockwaveSpeeds[s]);
          const maxRadius = Math.max(width, height) * 0.65;
          if (waveRadius > 0 && waveRadius < maxRadius) {
            const waveFade = (1 - waveRadius / maxRadius) * stage2Alpha;
            ctx.strokeStyle = s % 2 === 0 ? primaryColor : secondaryColor;
            ctx.lineWidth = Math.max(1, 6 * (1 - waveRadius / maxRadius));
            ctx.globalAlpha = 0.7 * waveFade;
            ctx.beginPath();
            ctx.arc(origX, origY, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Central High-Energy Plasma Core Pulsation (Pure Radiant Orb)
        const plasmaPulse = Math.sin(blastElapsed * 0.01) * 0.25 + 0.75;
        const plasmaRadius = Math.min(80, 25 + blastElapsed * 0.02) * plasmaPulse;
        const plasmaGlow = ctx.createRadialGradient(origX, origY, 0, origX, origY, plasmaRadius * 3.5);
        plasmaGlow.addColorStop(0, '#FFFFFF');
        plasmaGlow.addColorStop(0.3, primaryColor);
        plasmaGlow.addColorStop(0.7, secondaryColor);
        plasmaGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = plasmaGlow;
        ctx.globalAlpha = 0.9 * stage2Alpha;
        ctx.beginPath();
        ctx.arc(origX, origY, plasmaRadius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render & Update Blast Particles (Stages 2 & 3)
      for (let i = blastParticles.length - 1; i >= 0; i--) {
        const p = blastParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.965;
        p.vy *= 0.965;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          blastParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ═════════════════════════════════════════════════════════════════
      // ⏱️ STAGE 3: 6–9s (6000–9000ms) — "ARTRON" PURE NEON LOGOTYPE
      // (NO BOTTOM SUBTITLE — PURE FUTURISTIC NEON GLOW & LIGHT SWEEP)
      // ═════════════════════════════════════════════════════════════════
      if (elapsed >= 5800) {
        const stage3Elapsed = elapsed - 5800;
        const logoAlpha = Math.min(1, stage3Elapsed / 700);
        const logoScale = Math.min(1, 0.92 + (stage3Elapsed / 1000) * 0.08);

        ctx.save();
        ctx.translate(origX, origY);
        ctx.scale(logoScale, logoScale);

        const fontSize = Math.min(width * 0.12, 72);
        ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const text = 'ARTRON';

        // 1. Outer Deep Neon Bloom (Emerald / Cyan)
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 45;
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.85 * logoAlpha;
        ctx.fillText(text, 0, 0);

        // 2. High-Intensity Electric Core Glow
        ctx.shadowColor = secondaryColor;
        ctx.shadowBlur = 18;
        ctx.fillStyle = secondaryColor;
        ctx.globalAlpha = 0.95 * logoAlpha;
        ctx.fillText(text, 0, 0);

        // 3. Crisp Pure White Core Typography
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1 * logoAlpha;
        ctx.fillText(text, 0, 0);

        // 4. Laser Shimmer / Specular Light Sweep across ARTRON
        if (stage3Elapsed > 400 && stage3Elapsed < 2200) {
          const sweepX = -250 + ((stage3Elapsed - 400) / 1800) * 500;
          const sweepGrad = ctx.createLinearGradient(sweepX - 45, 0, sweepX + 45, 0);
          sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          sweepGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
          sweepGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = sweepGrad;
          ctx.globalAlpha = 0.85 * logoAlpha;
          ctx.fillRect(-220, -fontSize * 0.7, 440, fontSize * 1.4);
        }

        ctx.restore();
      }

      ctx.globalAlpha = 1;

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isActive, origin, color, durationMs]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-30 mix-blend-screen will-change-transform ${className}`}
      style={{ transform: 'translate3d(0,0,0)' }}
    />
  );
};
