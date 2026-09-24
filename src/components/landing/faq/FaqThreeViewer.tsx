'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  VIS_MAP,
  QC_COLORS,
} from './faqConstants';
import {
  buildTurnstile,
  buildVault,
  buildBadge,
  buildCloud,
  buildWallet,
  buildQR,
  buildHub,
  buildBridge,
  FaqModelObject,
} from './faqModels';

interface FaqThreeViewerProps {
  activeId: number;
  autoRotate?: boolean;
  className?: string;
}

interface WrappedModel extends FaqModelObject {
  wrap: THREE.Group;
  k: number;
  dir: number;
}

export const FaqThreeViewer: React.FC<FaqThreeViewerProps> = ({
  activeId,
  autoRotate = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeId);
  const autoRotateRef = useRef(autoRotate);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    Object.assign(canvas.style, {
      width: '100%',
      height: '100%',
      display: 'block',
      touchAction: 'none',
      cursor: 'grab',
    });
    container.appendChild(canvas);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.25, 5.8);
    camera.lookAt(0, 0, 0);

    const root = new THREE.Group();
    scene.add(root);

    // Builders map for on-demand lazy initialization (8x faster mount)
    const builders: Record<number, (c: string) => FaqModelObject> = {
      1: buildTurnstile,
      2: buildVault,
      3: buildBadge,
      4: buildCloud,
      5: buildWallet,
      6: buildQR,
      7: buildHub,
      8: buildBridge,
    };

    const objs: Record<string, WrappedModel> = {};

    const getOrCreateModel = (id: number): WrappedModel | null => {
      const key = VIS_MAP[id] || 'turnstile';
      if (!objs[key] && builders[id]) {
        const model = builders[id](QC_COLORS[id]);
        const wrap = new THREE.Group();
        wrap.add(model.g);
        wrap.visible = false;
        root.add(wrap);
        objs[key] = {
          ...model,
          wrap,
          k: 0,
          dir: -1,
        };
      }
      return objs[key] || null;
    };

    // Prebuild ONLY the active model on start
    getOrCreateModel(activeIdRef.current || 1);

    // Particle dust
    const pts: number[] = [];
    for (let i = 0; i < 180; i++) {
      pts.push(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5 - 1
      );
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xa9bcff,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Radial center glow sprite
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowCanvas.height = 128;
    const gx = glowCanvas.getContext('2d');
    if (gx) {
      const gr = gx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.35, 'rgba(255,255,255,0.22)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      gx.fillStyle = gr;
      gx.fillRect(0, 0, 128, 128);
    }
    const glowMat = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(glowCanvas),
      color: new THREE.Color(QC_COLORS[activeIdRef.current] || '#5cc8ff'),
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(6.5, 6.5, 1);
    glow.position.z = -1.5;
    scene.add(glow);

    const targetColor = new THREE.Color();

    // Drag interaction
    let drag: { x: number; y: number } | null = null;
    let yaw = 0;
    let pitch = 0;
    let vel = 0;

    const onPointerDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      vel = dx * 0.008;
      yaw += vel;
      pitch = Math.max(-0.45, Math.min(0.45, pitch + dy * 0.005));
    };

    const onPointerUp = () => {
      drag = null;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // Resize logic
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      const aspect = w / h;
      renderer.setSize(w, h, false);
      camera.aspect = aspect;
      camera.position.z = aspect < 1.1 ? (6.2 / aspect) * 1.02 : 5.8;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Animation Loop with Viewport Lifecycle (Pauses when offscreen)
    let curVisKey: string | null = null;
    let rafId: number;
    let last = performance.now();
    let time = 0;
    let isVisible = false;
    let isDisposed = false;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (now: number) => {
      if (isDisposed || !isVisible) return;
      rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (document.hidden || !container) return;
      time += dt * (prefersReducedMotion ? 0.3 : 1);

      const currentActiveId = activeIdRef.current;
      const targetVisKey = VIS_MAP[currentActiveId] || 'turnstile';

      if (targetVisKey !== curVisKey) {
        if (!objs[targetVisKey]) {
          getOrCreateModel(currentActiveId);
        }
        if (curVisKey && objs[curVisKey]) objs[curVisKey].dir = 1;
        if (objs[targetVisKey]) objs[targetVisKey].dir = -1;
        curVisKey = targetVisKey;
      }

      const f = 1 - Math.exp(-dt * 5);
      Object.keys(objs).forEach((key) => {
        const o = objs[key];
        o.k += ((key === targetVisKey ? 1 : 0) - o.k) * f;
        o.wrap.visible = o.k > 0.004;
        if (!o.wrap.visible) return;

        o.update(time, dt);
        const e = o.k;
        o.wrap.scale.setScalar(0.5 + 0.5 * e);
        o.wrap.rotation.y = (1 - e) * o.dir * 1.8;
        o.wrap.position.y = (1 - e) * -0.25;
        o.mats.forEach((m) => {
          m.opacity = m.userData.base * e;
        });
      });

      if (!drag) {
        vel *= 0.94;
        yaw += vel;
        pitch *= 0.97;
      }

      const auto = autoRotateRef.current ? Math.sin(time * 0.35) * 0.4 : 0;
      root.rotation.y = yaw + auto;
      root.rotation.x = 0.06 + pitch;

      dust.rotation.y = time * 0.02;

      targetColor.set(QC_COLORS[currentActiveId] || '#5cc8ff');
      glow.material.color.lerp(targetColor, f * 0.6);
      dust.material.color.lerp(targetColor, f * 0.3);
      glow.material.opacity = 0.26 + 0.05 * Math.sin(time * 1.5);

      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible && !isDisposed) {
            last = performance.now();
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      renderer.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      glowMat.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
};
