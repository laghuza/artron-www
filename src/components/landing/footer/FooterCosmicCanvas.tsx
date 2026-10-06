'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface FooterCanvasHandle {
  fireShock: () => void;
}

interface FooterCosmicCanvasProps {
  footerRef: React.RefObject<HTMLElement | null>;
  sloganRef: React.RefObject<HTMLElement | null>;
}

const COLORS: [number, number, number][] = [
  [255, 255, 255], // Diamond White
  [212, 175, 55],  // Titanium Gold
  [16, 185, 129],  // Emerald Status
  [147, 197, 253], // Cyber Blue
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  r: number;
  ph: number;
  sp: number;
  core: string;
  halo: string;
  hk?: number;
  hx?: number;
  hy?: number;
}

interface ShockWave {
  x: number;
  y: number;
  r: number;
  s: number;
  max: number;
}

interface RimInfo {
  k: string;
  l: number;
  t: number;
  r: number;
  b: number;
  rad: number;
}

interface GlyphInfo {
  l: number;
  t: number;
  r: number;
  b: number;
  cx: number;
  cy: number;
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

      const spawn = () => {
        const count = 80;
        parts = Array.from({ length: count }, (_, i) => {
          const z = 0.35 + Math.random() * 0.65;
          const c = COLORS[i % 4];
          const a = 0.25 + Math.random() * 0.2;
          return {
            x: Math.random() * (w || 1000),
            y: Math.random() * (h || 600),
            vx: 0,
            vy: 0,
            z,
            r: 0.6 + z * 1.4,
            ph: Math.random() * 6.283,
            sp: 0.0002 + Math.random() * 0.0003,
            core: `rgba(${c[0]},${c[1]},${c[2]},${a})`,
            halo: `rgba(${c[0]},${c[1]},${c[2]},${a * 0.22})`,
          };
        });
      };

      const measure = () => {
        if (!isAlive || !host) return;
        const rect = host.getBoundingClientRect();
        ox = rect.left + window.scrollX;
        oy = rect.top + window.scrollY;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
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

        if (!parts.length) spawn();
        draw(0, performance.now());
      };

      const jag = (x1: number, y1: number, x2: number, y2: number, disp: number, depth: number, out: number[]) => {
        if (depth <= 0 || disp < 0.6) {
          out.push(x2, y2);
          return;
        }
        const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
        const my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
        jag(x1, y1, mx, my, disp / 2, depth - 1, out);
        jag(mx, my, x2, y2, disp / 2, depth - 1, out);
      };

      const bolt = (x1: number, y1: number, x2: number, y2: number) => {
        const L = Math.hypot(x2 - x1, y2 - y1);
        const main = [x1, y1];
        jag(x1, y1, x2, y2, L * 0.22, 6, main);
        const br: number[][] = [];
        const n = L > 50 ? 2 : 1;
        for (let b = 0; b < n; b++) {
          const i = 2 * (4 + Math.floor(Math.random() * (main.length / 2 - 8)));
          if (i < 2 || i >= main.length - 2) continue;
          const bx = main[i];
          const by = main[i + 1];
          const a = Math.atan2(y2 - y1, x2 - x1) + (Math.random() < 0.5 ? -1 : 1) * (0.45 + Math.random() * 0.5);
          const bl = L * (0.16 + Math.random() * 0.16);
          const seg = [bx, by];
          jag(bx, by, bx + Math.cos(a) * bl, by + Math.sin(a) * bl, bl * 0.3, 4, seg);
          br.push(seg);
        }
        return { main, br };
      };

      const path = (c: CanvasRenderingContext2D, pts: number[]) => {
        c.beginPath();
        c.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
      };

      const cl = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
      const RIM = 240;

      const glint = (px: number, py: number, d: number, len: number) => {
        const I = 1 - d / RIM;
        const a = I * I * rimA;
        if (a < 0.01) return null;
        const g = fctx.createRadialGradient(px, py, 0, px, py, len);
        g.addColorStop(0, `rgba(240,236,226,${(0.55 * a).toFixed(3)})`);
        g.addColorStop(0.3, `rgba(212,175,55,${(0.4 * a).toFixed(3)})`);
        g.addColorStop(1, 'rgba(212,175,55,0)');
        return g;
      };

      const drawRim = () => {
        const mx = mouse.x;
        const my = mouse.y;
        fctx.save();
        fctx.globalCompositeOperation = 'lighter';
        {
          const a = w / 2;
          const x = cl(mx, 0, w);
          const u = (x - a) / a;
          const y = 24 - 24 * Math.sqrt(Math.max(0, 1 - u * u));
          const d = Math.hypot(mx - x, my - y);
          const g = d < RIM ? glint(x, y, d, 110) : null;
          if (g) {
            fctx.strokeStyle = g;
            fctx.lineWidth = 1.5;
            fctx.beginPath();
            fctx.ellipse(a, 24, a - 0.75, 23.25, 0, Math.PI, 2 * Math.PI);
            fctx.stroke();
          }
        }
        fctx.lineWidth = 1;
        for (const o of rims) {
          let px = 0;
          let py = 0;
          let rr = 0;
          if (o.k === 'v') {
            px = o.l + 0.5;
            py = cl(my, o.t, o.b);
          } else if (o.k !== 'rect') {
            py = o.t + 0.5;
            px = cl(mx, o.l, o.r);
          } else {
            rr = Math.min(o.rad, (o.r - o.l) / 2, (o.b - o.t) / 2);
            if (mx >= o.l && mx <= o.r && my >= o.t && my <= o.b) {
              const e = [mx - o.l, o.r - mx, my - o.t, o.b - my];
              const m = Math.min(...e);
              const k = e.indexOf(m);
              px = k === 0 ? o.l : k === 1 ? o.r : mx;
              py = k === 2 ? o.t : k === 3 ? o.b : my;
            } else {
              const cx = cl(mx, o.l + rr, o.r - rr);
              const cy = cl(my, o.t + rr, o.b - rr);
              const dx = mx - cx;
              const dy = my - cy;
              const L = Math.hypot(dx, dy) || 1;
              px = cx + (dx / L) * rr;
              py = cy + (dy / L) * rr;
              if (rr === 0) {
                px = cl(mx, o.l, o.r);
                py = cl(my, o.t, o.b);
              }
            }
          }
          const d = Math.hypot(mx - px, my - py);
          if (d >= RIM) continue;
          const g = glint(px, py, d, o.k === 'rect' ? 40 : 85);
          if (!g) continue;
          fctx.strokeStyle = g;
          fctx.beginPath();
          if (o.k === 'v') {
            fctx.moveTo(o.l + 0.5, o.t);
            fctx.lineTo(o.l + 0.5, o.b);
          } else if (o.k !== 'rect') {
            fctx.moveTo(o.l, o.t + 0.5);
            fctx.lineTo(o.r, o.t + 0.5);
          } else if (fctx.roundRect) {
            fctx.roundRect(o.l + 0.5, o.t + 0.5, o.r - o.l - 1, o.b - o.t - 1, Math.max(0, rr - 0.5));
          } else {
            fctx.rect(o.l + 0.5, o.t + 0.5, o.r - o.l - 1, o.b - o.t - 1);
          }
          fctx.stroke();
        }
        fctx.restore();
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
        if (rimOn) drawRim();
        if (!arcOn || !T) return;

        if (now - arcT > 55 || !arc) {
          arc = bolt(mouse.x, mouse.y, T.x, T.y);
          arcT = now;
        }
        const near = 1 - Math.min(1, T.d / 120);
        const A = tA * (0.55 + near * 0.45);
        fctx.save();
        fctx.lineCap = 'round';
        fctx.lineJoin = 'round';
        fctx.globalCompositeOperation = 'lighter';

        fctx.strokeStyle = `rgba(162,201,242,${(0.12 * A).toFixed(3)})`;
        fctx.lineWidth = 3.2;
        path(fctx, arc.main);
        fctx.stroke();

        fctx.strokeStyle = `rgba(162,201,242,${(0.6 * A).toFixed(3)})`;
        fctx.lineWidth = 0.8;
        path(fctx, arc.main);
        fctx.stroke();

        fctx.strokeStyle = `rgba(232,242,255,${(0.35 * A).toFixed(3)})`;
        fctx.lineWidth = 0.35;
        path(fctx, arc.main);
        fctx.stroke();

        fctx.strokeStyle = `rgba(162,201,242,${(0.32 * A).toFixed(3)})`;
        fctx.lineWidth = 0.5;
        for (const b of arc.br) {
          path(fctx, b);
          fctx.stroke();
        }

        const fl = 0.75 + Math.random() * 0.5;
        const gr = fctx.createRadialGradient(T.x, T.y, 0, T.x, T.y, 11 * fl);
        gr.addColorStop(0, `rgba(255,248,220,${(0.9 * A).toFixed(3)})`);
        gr.addColorStop(0.25, `rgba(243,217,138,${(0.55 * A).toFixed(3)})`);
        gr.addColorStop(1, 'rgba(212,175,55,0)');
        fctx.fillStyle = gr;
        fctx.beginPath();
        fctx.arc(T.x, T.y, 11 * fl, 0, 6.2832);
        fctx.fill();

        fctx.fillStyle = `rgba(243,217,138,${(0.8 * A).toFixed(3)})`;
        for (let i = 0; i < 3; i++) {
          const a = Math.random() * 6.2832;
          const rr = 3 + Math.random() * 7;
          fctx.fillRect(T.x + Math.cos(a) * rr, T.y + Math.sin(a) * rr, 0.9, 0.9);
        }
        fctx.fillStyle = `rgba(232,242,255,${(0.7 * A).toFixed(3)})`;
        fctx.beginPath();
        fctx.arc(mouse.x, mouse.y, 1.1, 0, 6.2832);
        fctx.fill();
        fctx.restore();
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
        rt = setTimeout(() => {
          measure();
        }, 150);
      };

      const onMove = (e: MouseEvent) => {
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
        {/* Layer 1: Cosmic Dust Particles Canvas */}
        <canvas
          ref={cosmicCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-0 pointer-events-none transform-gpu"
        />
        {/* Layer 2: Interactive Lightning & Rim Glints Canvas */}
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
