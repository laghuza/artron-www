'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Particle,
  ShockWave,
  RimInfo,
  GlyphInfo,
  spawnCosmicParticles,
  buildLightningBolt,
  drawRimHighlights,
  drawLightningArc,
} from './footerCosmicHelpers';

export interface FooterCanvasHandle {
  fireShock: () => void;
}

interface FooterCosmicCanvasProps {
  footerRef: React.RefObject<HTMLElement | null>;
  sloganRef: React.RefObject<HTMLElement | null>;
}

export const FooterCosmicCanvas = forwardRef<FooterCanvasHandle, FooterCosmicCanvasProps>(
  ({ footerRef, sloganRef }, ref) => {
    const cosmicCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const shockTriggerRef = useRef<(() => void) | null>(null);

    useImperativeHandle(ref, () => ({
      fireShock: () => {
        if (shockTriggerRef.current) {
          shockTriggerRef.current();
        }
      },
    }));

    useEffect(() => {
      const cv = cosmicCanvasRef.current;
      const fx = fxCanvasRef.current;
      const host = footerRef.current;
      if (!cv || !fx || !host) return;

      const ctx = cv.getContext('2d');
      const fctx = fx.getContext('2d');
      if (!ctx || !fctx) return;

      let isAlive = true;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const R = 140;
      const R2 = R * R;
      let w = 0;
      let h = 0;
      let ox = 0;
      let oy = 0;
      let raf = 0;
      let rt: NodeJS.Timeout;
      let visible = true;
      let last = performance.now();

      const mouse = { x: -9999, y: -9999, on: false, dirty: false };
      let parts: Particle[] = [];
      let rims: RimInfo[] = [];
      let rimA = 0;
      let glyphs: GlyphInfo[] = [];
      let sb: { l: number; t: number; r: number; b: number; cx: number; cy: number } | null = null;
      let arc: { main: number[]; br: number[][] } | null = null;
      let arcT = 0;
      let tA = 0;
      let fxDirty = false;
      let waves: ShockWave[] = [];
      let prevTarget: { x: number; y: number; d: number } | null = null;

      const measure = () => {
        if (!isAlive || !host) return;
        const rect = host.getBoundingClientRect();
        ox = rect.left + window.scrollX;
        oy = rect.top + window.scrollY;
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        const nw = rect.width;
        const nh = rect.height;

        if (parts.length && w && h && (nw !== w || nh !== h)) {
          parts.forEach((p) => {
            p.x *= nw / w;
            p.y *= nh / h;
          });
        }
        w = nw;
        h = nh;
        const bw = Math.round(w * dpr);
        const bh = Math.round(h * dpr);

        if (bw !== cv.width || bh !== cv.height) {
          cv.width = bw;
          cv.height = bh;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (bw !== fx.width || bh !== fx.height) {
          fx.width = bw;
          fx.height = bh;
        }
        fctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const sl = sloganRef.current;
        if (sl) {
          const sq = sl.getBoundingClientRect();
          sb = {
            l: sq.left - rect.left,
            t: sq.top - rect.top,
            r: sq.right - rect.left,
            b: sq.bottom - rect.top,
            cx: sq.left - rect.left + sq.width / 2,
            cy: sq.top - rect.top + sq.height / 2,
          };
          glyphs = [];
          const tn = sl.firstChild;
          if (tn && tn.nodeType === 3) {
            const rg = document.createRange();
            const tx = tn.textContent || '';
            for (let i = 0; i < tx.length; i++) {
              if (/\s/.test(tx[i])) continue;
              rg.setStart(tn, i);
              rg.setEnd(tn, i + 1);
              const g = rg.getClientRects()[0];
              if (!g || !g.width) continue;
              glyphs.push({
                l: g.left - rect.left,
                t: g.top - rect.top + g.height * 0.18,
                r: g.right - rect.left,
                b: g.bottom - rect.top - g.height * 0.14,
                cx: g.left - rect.left + g.width / 2,
                cy: g.top - rect.top + g.height * 0.52,
              });
            }
          }
        }

        rims = Array.from(host.querySelectorAll<HTMLElement>('[data-rim]'))
          .map((el) => {
            const q = el.getBoundingClientRect();
            const k = el.dataset.rim || '';
            return {
              k,
              l: q.left - rect.left,
              t: q.top - rect.top,
              r: q.right - rect.left,
              b: q.bottom - rect.top,
              rad: k === 'rect' ? parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0 : 0,
            };
          })
          .filter((o) => o.r > o.l || o.b > o.t);

        if (!parts.length) parts = spawnCosmicParticles(w, h);
        draw(0, performance.now());
      };

      const drawFx = (dt: number, now: number) => {
        let tgt: { x: number; y: number; d: number } | null = null;
        if (mouse.on && sb && glyphs.length && mouse.x > sb.l - 120 && mouse.x < sb.r + 120 && mouse.y > sb.t - 120 && mouse.y < sb.b + 120) {
          let best = 1e9;
          let g0: GlyphInfo | null = null;
          let px = 0;
          let py = 0;
          for (const g of glyphs) {
            const cx = Math.max(g.l, Math.min(g.r, mouse.x));
            const cy = Math.max(g.t, Math.min(g.b, mouse.y));
            const d = (cx - mouse.x) ** 2 + (cy - mouse.y) ** 2;
            if (d < best) {
              best = d;
              g0 = g;
              px = cx;
              py = cy;
            }
          }
          const d = Math.sqrt(best);
          if (d < 120 && d > 4 && g0) {
            tgt = { x: px + (g0.cx - px) * 0.4, y: py + (g0.cy - py) * 0.4, d };
          }
        }
        rimA += ((mouse.on ? 1 : 0) - rimA) * (1 - Math.pow(0.86, dt / 16.67));
        tA += ((tgt ? 1 : 0) - tA) * (1 - Math.pow(tgt ? 0.8 : 0.86, dt / 16.67));
        if (tgt) prevTarget = tgt;
        const T = tgt || prevTarget;
        const arcOn = tA >= 0.01 && !!T;
        const rimOn = rimA > 0.01 && rims.length > 0;

        if (!arcOn && !rimOn) {
          if (fxDirty) {
            fctx.clearRect(0, 0, w, h);
            fxDirty = false;
          }
          return;
        }
        fctx.clearRect(0, 0, w, h);
        fxDirty = true;
        if (rimOn) drawRimHighlights(fctx, w, mouse.x, mouse.y, rimA, rims);
        if (!arcOn || !T) return;

        if (now - arcT > 55 || !arc) {
          arc = buildLightningBolt(mouse.x, mouse.y, T.x, T.y);
          arcT = now;
        }
        drawLightningArc(fctx, arc, T, mouse.x, mouse.y, tA);
      };

      const draw = (dt: number, now: number) => {
        ctx.clearRect(0, 0, w, h);
        const k = dt / 16.67;
        for (const p of parts) {
          if (dt) {
            p.vx += Math.cos(now * p.sp + p.ph) * 0.018 * p.z * k;
            p.vy += (Math.sin(now * p.sp * 1.3 + p.ph) * 0.014 * p.z - 0.004 * p.z) * k;
            if (mouse.on) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < R2 && d2 > 1) {
                const f = (1 - Math.sqrt(d2) / R) * 0.0028 * (0.5 + p.z);
                p.vx += dx * f * k;
                p.vy += dy * f * k;
              }
            }
            for (const wv of waves) {
              const dx = p.x - wv.x;
              const dy = p.y - wv.y;
              const d = Math.sqrt(dx * dx + dy * dy) || 1;
              const band = 90;
              const off = Math.abs(d - wv.r);
              if (off < band) {
                const f = (1 - off / band) * wv.s * (0.6 + p.z * 0.6) * k;
                p.vx += (dx / d) * f;
                p.vy += (dy / d) * f;
                if (p.hk === undefined || p.hk <= 0) {
                  p.hx = p.x;
                  p.hy = p.y;
                }
                p.hk = 1;
              }
            }
            if (p.hk && p.hk > 0 && p.hx !== undefined && p.hy !== undefined) {
              const s = 0.0032 * p.hk * k;
              p.vx += (p.hx - p.x) * s;
              p.vy += (p.hy - p.y) * s;
              p.hk -= dt / 4200;
            }
            const damp = Math.pow(0.94, k);
            p.vx *= damp;
            p.vy *= damp;
            p.x += p.vx * k;
            p.y += p.vy * k;
            if (!(p.hk && p.hk > 0)) {
              if (p.x < -10) p.x = w + 10;
              else if (p.x > w + 10) p.x = -10;
              if (p.y < -10) p.y = h + 10;
              else if (p.y > h + 10) p.y = -10;
            }
          }
          ctx.fillStyle = p.halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.2832);
          ctx.fill();

          ctx.fillStyle = p.core;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.2832);
          ctx.fill();
        }

        if (dt && waves.length) {
          for (const wv of waves) {
            wv.r += dt * 0.95;
            wv.s *= Math.pow(0.985, k);
          }
          waves = waves.filter((wv) => wv.r < wv.max);
        }
        if (fctx && dt) drawFx(dt, now);
      };

      const loop = (now: number) => {
        const dt = Math.min(50, now - last);
        last = now;
        draw(dt, now);
        raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
      };

      const kick = () => {
        if (!raf && !reduce && visible && !document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      };

      shockTriggerRef.current = () => {
        if (reduce || !sb) return;
        const md = Math.max(
          Math.hypot(sb.cx, sb.cy),
          Math.hypot(w - sb.cx, sb.cy),
          Math.hypot(sb.cx, h - sb.cy),
          Math.hypot(w - sb.cx, h - sb.cy)
        );
        waves.push({ x: sb.cx, y: sb.cy, r: 0, s: 0.55, max: md + 100 });
        if (waves.length > 3) waves.shift();
        kick();
      };

      const onResize = () => {
        clearTimeout(rt);
        rt = setTimeout(measure, 150);
      };

      const onMove = (e: MouseEvent) => {
        if (!visible) return;
        const x = e.pageX - ox;
        const y = e.pageY - oy;
        const on = x >= 0 && y >= 0 && x <= w && y <= h;
        if (!on && !mouse.on) return;
        mouse.x = x;
        mouse.y = y;
        mouse.on = on;
        mouse.dirty = true;
        kick();
      };

      const onOut = (e: MouseEvent) => {
        if (!e.relatedTarget && mouse.on) {
          mouse.on = false;
          mouse.dirty = true;
          kick();
        }
      };

      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseout', onOut, { passive: true });

      const onVisibility = () => {
        if (!document.hidden) kick();
      };
      document.addEventListener('visibilitychange', onVisibility);

      const io = new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        if (visible) kick();
      });
      io.observe(host);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(measure);
      }
      measure();
      kick();

      return () => {
        isAlive = false;
        cancelAnimationFrame(raf);
        clearTimeout(rt);
        io.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseout', onOut);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }, [footerRef, sloganRef]);

    return (
      <>
        <canvas
          ref={cosmicCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-0 pointer-events-none transform-gpu"
        />
        <canvas
          ref={fxCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-[3] pointer-events-none transform-gpu"
        />
      </>
    );
  }
);

FooterCosmicCanvas.displayName = 'FooterCosmicCanvas';
