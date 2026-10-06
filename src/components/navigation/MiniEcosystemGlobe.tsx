'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MiniEcosystemGlobeProps {
  size?: number; // Visual size in px (e.g. 18, 20, 24)
  className?: string;
  isActive?: boolean;
  interactive?: boolean;
}

// 3D Point on unit sphere
interface SpherePoint {
  x: number;
  y: number;
  z: number;
  neighbors: number[];
}

export const MiniEcosystemGlobe: React.FC<MiniEcosystemGlobeProps> = ({
  size = 18,
  className = '',
  isActive = false,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const stateRef = useRef({
    angle: 0,
    speed: 0.016,
    hovered: false,
    active: false,
    reqId: 0,
    isVisible: true,
  });

  stateRef.current.hovered = isHovered;
  stateRef.current.active = isActive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Retina display resolution scale
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 3) : 2;
    const pxSize = size * dpr;
    canvas.width = pxSize;
    canvas.height = pxSize;

    // Build Fibonacci Sphere Points (matching EnneaSceneCanvas.tsx)
    const N = 84;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points: SpherePoint[] = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      points.push({
        x: Math.cos(th) * rad,
        y: y,
        z: Math.sin(th) * rad,
        neighbors: [],
      });
    }

    // Connect Fibonacci neighbors with lattice lines
    const maxDist = 0.44;
    for (const off of [5, 8, 13]) {
      for (let i = 0; i + off < N; i++) {
        const p1 = points[i];
        const p2 = points[i + off];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist <= maxDist) {
          p1.neighbors.push(i + off);
        }
      }
    }

    // Georgia Coordinates (Lat: 41.7°N, Lon: 44.8°E) converted to unit sphere
    const geoLat = (41.7 * Math.PI) / 180;
    const geoLon = (44.8 * Math.PI) / 180;
    const georgiaPt = {
      x: Math.cos(geoLat) * Math.sin(geoLon),
      y: Math.sin(geoLat),
      z: Math.cos(geoLat) * Math.cos(geoLon),
    };

    // Orbital parameters
    const tilt = 0.38; // ~22° axial inclination
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);
    const cx = pxSize / 2;
    const cy = pxSize / 2;
    const sphereRadius = (pxSize / 2) * 0.74; // Leave margin for atmospheric Fresnel halo

    let lastTime = performance.now();
    let beaconPhase = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const { hovered, active } = stateRef.current;
      // Dynamic rotational speed: accelerates on hover
      const targetSpeed = active ? 0.038 : hovered ? 0.046 : 0.016;
      stateRef.current.speed += (targetSpeed - stateRef.current.speed) * 0.1;
      stateRef.current.angle += stateRef.current.speed * (dt / 0.016);
      beaconPhase += dt * 3.5;

      const angle = stateRef.current.angle;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      ctx.clearRect(0, 0, pxSize, pxSize);

      // ── 1. Atmospheric Outer Rim Glow (Cyan Halo) ──
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        sphereRadius * 0.75,
        cx,
        cy,
        sphereRadius * 1.28
      );
      haloGrad.addColorStop(0, 'rgba(0, 163, 255, 0)');
      haloGrad.addColorStop(0.75, active ? 'rgba(0, 229, 255, 0.45)' : 'rgba(0, 163, 255, 0.32)');
      haloGrad.addColorStop(1, 'rgba(0, 163, 255, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.28, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // ── 2. Deep Solid Spherical Shell (Core) ──
      const coreGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.35,
        cy - sphereRadius * 0.35,
        sphereRadius * 0.1,
        cx,
        cy,
        sphereRadius
      );
      coreGrad.addColorStop(0, '#101B2B');
      coreGrad.addColorStop(0.65, '#080E17');
      coreGrad.addColorStop(1, '#03060A');

      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // ── 3. Subtle Fresnel Edge Ring ──
      ctx.lineWidth = Math.max(1, 1.2 * (dpr / 2));
      ctx.strokeStyle = active ? 'rgba(0, 229, 255, 0.75)' : 'rgba(0, 163, 255, 0.45)';
      ctx.stroke();

      // Helper: 3D Rotation (Y-axis spin + Z-axis axial tilt)
      const project = (px: number, py: number, pz: number) => {
        // Spin around Y axis
        const x1 = px * cosA + pz * sinA;
        const y1 = py;
        const z1 = -px * sinA + pz * cosA;

        // Tilt around Z axis
        const x2 = x1 * cosTilt - y1 * sinTilt;
        const y2 = x1 * sinTilt + y1 * cosTilt;
        const z2 = z1;

        return {
          sx: cx + x2 * sphereRadius,
          sy: cy - y2 * sphereRadius,
          z: z2,
        };
      };

      // Project all Fibonacci points
      const projected = points.map((p) => project(p.x, p.y, p.z));

      // ── 4. Lattice Network Lines (Constellation Mesh) ──
      ctx.lineWidth = Math.max(0.6, 0.75 * (dpr / 2));
      for (let i = 0; i < N; i++) {
        const p1 = projected[i];
        if (p1.z < -0.15) continue; // Behind sphere

        for (const nIdx of points[i].neighbors) {
          const p2 = projected[nIdx];
          if (p2.z < -0.15) continue;

          // Average depth visibility
          const avgZ = (p1.z + p2.z) * 0.5;
          const alpha = Math.max(0, Math.min(1, avgZ * 1.15));

          if (alpha > 0.05) {
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = `rgba(0, 180, 255, ${(alpha * 0.38).toFixed(2)})`;
            ctx.stroke();
          }
        }
      }

      // ── 5. Fibonacci Point Cloud ──
      for (let i = 0; i < N; i++) {
        const p = projected[i];
        if (p.z <= 0) {
          // Faint back-points rim bleed
          if (p.z > -0.2) {
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 0.65 * (dpr / 2), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 163, 255, 0.12)';
            ctx.fill();
          }
          continue;
        }

        const alpha = Math.min(1, p.z * 1.25);
        const ptRadius = (0.75 + p.z * 0.7) * (dpr / 2);

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, ptRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha.toFixed(2)})`;
        ctx.fill();
      }

      // ── 6. Georgia Micro-Beacon (41.7°N, 44.8°E) ──
      const geoProj = project(georgiaPt.x, georgiaPt.y, georgiaPt.z);
      if (geoProj.z > 0.05) {
        const geoAlpha = Math.min(1, geoProj.z * 1.5);
        const pulse = (Math.sin(beaconPhase) + 1) * 0.5; // 0 to 1

        // Expanding Ping Ring
        const ringRad = (2.2 + pulse * 2.8) * (dpr / 2);
        ctx.beginPath();
        ctx.arc(geoProj.sx, geoProj.sy, ringRad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${(geoAlpha * (1 - pulse) * 0.7).toFixed(2)})`;
        ctx.lineWidth = Math.max(0.7, 0.9 * (dpr / 2));
        ctx.stroke();

        // Bright Neon Center Dot
        ctx.beginPath();
        ctx.arc(geoProj.sx, geoProj.sy, 1.4 * (dpr / 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${geoAlpha.toFixed(2)})`;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 6 * (dpr / 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      }

      stateRef.current.reqId = requestAnimationFrame(render);
    };

    stateRef.current.reqId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(stateRef.current.reqId);
    };
  }, [size]);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      title="ARTRON Global Ecosystem"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none drop-shadow-[0_0_6px_rgba(0,163,255,0.4)]"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default MiniEcosystemGlobe;
