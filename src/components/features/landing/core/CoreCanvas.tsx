"use client";

import { useEffect, useRef } from "react";

interface CoreCanvasProps {
  isBooted: boolean;
}

export default function CoreCanvas({ isBooted }: CoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isBooted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; tx: number; ty: number; r: number; a: number }> = [];
    const cx = w / 2, cy = h / 2, gap = Math.min(w, h) * (w < 640 ? 0.22 : 0.15);
    const nodes = Array.from({ length: 9 }, (_, idx) => ({
      x: cx + ((idx % 3) - 1) * gap,
      y: cy + (Math.floor(idx / 3) - 1) * gap,
    }));

    for (let i = 0; i < 200; i++) {
      const node = nodes[i % nodes.length];
      const rad = 25 * Math.random(), ang = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: node.x + Math.cos(ang) * rad,
        ty: node.y + Math.sin(ang) * rad,
        r: Math.random() * 1.5 + 0.8,
        a: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(156, 163, 175, 0.03)";
      ctx.lineWidth = 0.5;
      nodes.forEach((n, i) => {
        nodes.forEach((n2, j) => {
          if (i !== j && Math.hypot(n.x - n2.x, n.y - n2.y) < gap * 1.5) {
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
          }
        });
      });

      particles.forEach((p, i) => {
        p.x += (p.tx - p.x) * 0.04;
        p.y += (p.ty - p.y) * 0.04;
        ctx.fillStyle = `rgba(0, 255, 135, ${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 40) {
            ctx.strokeStyle = `rgba(0, 255, 135, ${(1 - dist / 40) * 0.15})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isBooted]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 block pointer-events-none" />;
}
