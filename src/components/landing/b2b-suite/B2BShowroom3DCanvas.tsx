'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { col, buildPMREMEnvironment, buildTurnstileScene } from './showroom3dBuilder';

interface B2BShowroom3DCanvasProps {
  onPass?: (name?: string) => void;
  motion?: number; // 0: still, 0.45: calm, 1: live
  passTrigger?: number; // increments on each pass
  lastPassName?: string;
  neonColorHex?: number; // 0x10B981
}

export const B2BShowroom3DCanvas: React.FC<B2BShowroom3DCanvasProps> = ({
  onPass,
  motion = 1,
  passTrigger = 0,
  lastPassName = '',
  neonColorHex = 0x10b981,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const passCallbackRef = useRef(onPass);
  passCallbackRef.current = onPass;

  const triggerPassRef = useRef<((name?: string) => void) | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let destroyed = false;
    const TAU = Math.PI * 2;
    const L = (a: number, b: number, t: number) => a + (b - a) * t;
    const K = (dt: number, r: number) => 1 - Math.pow(r, dt);

    const neon = col(neonColorHex);
    const mot = motion;

    const getShift = (width: number) => {
      if (width < 1024) return 0;
      if (width >= 1400) return 0.2;
      return 0.24;
    };

    let shift = getShift(el.clientWidth || window.innerWidth);

    const isMobile = (el.clientWidth || window.innerWidth) < 768;
    const r = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    // Capping DPR to 1.0 on mobile and 1.5 on desktop avoids rendering excessive fragment pixels on Retina for silky smooth 60-120 FPS
    r.setPixelRatio(isMobile ? 1.0 : Math.min(1.5, window.devicePixelRatio || 1));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.2;
    r.setClearColor(0x000000, 0);
    r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';
    el.appendChild(r.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.035);
    scene.environment = buildPMREMEnvironment(r);

    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

    // Balanced ambient and rim lights with legacy linear decay
    scene.add(new THREE.HemisphereLight(col(0xbae6fd), col(0x030508), 0.28));
    const key = new THREE.DirectionalLight(col(0xe6f0ff), 0.95);
    key.position.set(3, 7, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(col(0xbae6fd), 1.25);
    rim.position.set(-5, 3, -6);
    scene.add(rim);

    const mouseL = new THREE.PointLight(col(0xbae6fd), 1.4, 12, 1);
    scene.add(mouseL);

    // Build complete turnstile elements
    const T = buildTurnstileScene(scene, neon);

    let nx = 0, ny = 0, mx = 0, my = 0, drag = 0;
    let dragS: { x: number; y: number; d: number; m: number } | null = null;
    let inside = false;
    const follow = true;
    let w = 1, h = 1;

    // Cache bounding box to eliminate synchronous layout reflows on pointer movement
    let cachedRect = el.getBoundingClientRect();
    const updateRect = () => {
      if (el) cachedRect = el.getBoundingClientRect();
    };
    window.addEventListener('resize', updateRect, { passive: true });
    el.addEventListener('pointerenter', updateRect, { passive: true });

    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hit = (cx: number, cy: number) => {
      ndc.set(((cx - cachedRect.left) / cachedRect.width) * 2 - 1, -((cy - cachedRect.top) / cachedRect.height) * 2 - 1);
      ray.setFromCamera(ndc, cam);
      return ray.intersectObjects(T.pickObjects, false).length > 0;
    };

    let vis = true;
    let raf = 0;

    let lastHitCheck = 0;
    const pm = (e: PointerEvent) => {
      if (!vis || mot === 0) return;
      const b = cachedRect;
      inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
      if (e.pointerType === 'mouse') {
        const cx = b.left + b.width * (0.5 + shift);
        nx = Math.max(-1.3, Math.min(1.3, (e.clientX - cx) / (b.width / 2)));
        ny = Math.max(-1.3, Math.min(1.3, (e.clientY - (b.top + b.height / 2)) / (b.height / 2)));
      }
      if (dragS) {
        const dx = e.clientX - dragS.x;
        dragS.m = Math.max(dragS.m, Math.abs(dx) + Math.abs(e.clientY - dragS.y));
        drag = dragS.d + dx * 0.008;
        r.domElement.style.cursor = 'grabbing';
      } else if (inside && e.pointerType === 'mouse') {
        const now = performance.now();
        if (now - lastHitCheck > 50) {
          lastHitCheck = now;
          r.domElement.style.cursor = hit(e.clientX, e.clientY) ? 'pointer' : 'grab';
        }
      }
    };

    const pd = (e: PointerEvent) => {
      dragS = { x: e.clientX, y: e.clientY, d: drag, m: 0 };
    };

    let tr = 0, cur = 0, flash = 0, pulseT = 9;

    const doPass = (_name?: string) => {
      tr += TAU / 3;
      flash = 1;
      pulseT = 0;
    };
    triggerPassRef.current = doPass;

    const pu = (e: PointerEvent) => {
      if (!dragS) return;
      if (dragS.m < 6 && hit(e.clientX, e.clientY)) {
        doPass();
        if (passCallbackRef.current) passCallbackRef.current();
      }
      dragS = null;
      r.domElement.style.cursor = 'grab';
    };

    const pl2 = () => { nx = 0; ny = 0; };

    window.addEventListener('pointermove', pm, { passive: true });
    r.domElement.addEventListener('pointerdown', pd);
    window.addEventListener('pointerup', pu);
    document.documentElement.addEventListener('pointerleave', pl2);

    const fit = () => {
      w = el.clientWidth || 1;
      h = el.clientHeight || 1;
      shift = getShift(w);
      updateRect();
      r.setSize(w, h, false);
      cam.aspect = w / h;
      if (shift) cam.setViewOffset(w, h, -w * shift, 0, w, h);
      else cam.clearViewOffset();
      cam.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();

    let t = 0;
    let lastTime = performance.now();
    const base = new THREE.Color();
    const tc = new THREE.Color();

    const frame = () => {
      // Completely pause loop when hidden, scrolled offscreen, or when motion === 0
      if (destroyed || !vis || document.hidden || mot === 0) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      t += dt;

      const k = K(dt, 0.02);
      const mo = mot;

      mx = L(mx, follow ? nx : 0, K(dt, 0.04));
      my = L(my, follow ? ny : 0, K(dt, 0.04));
      const sway = Math.sin(t * 0.32) * 0.12 * mo;
      T.modelGroup.rotation.y = L(T.modelGroup.rotation.y, -0.62 + drag + mx * 0.55 + sway, k);
      T.modelGroup.rotation.x = L(T.modelGroup.rotation.x, my * 0.05, k);

      const a = w / h;
      const dist = Math.max(12.5, 3.5 / (0.268 * a * (1 - 2 * shift) * 0.9), 2.7 / (0.268 * 0.78));
      const p = 0.2 - my * 0.07;
      cam.position.set(Math.sin(mx * 0.08) * dist * Math.cos(p), -0.2 + dist * Math.sin(p), Math.cos(mx * 0.08) * dist * Math.cos(p));
      cam.lookAt(0, -0.25, 0);
      mouseL.position.set(mx * 4.5, 1.2 - my * 2, 3.2);

      cur = L(cur, tr, K(dt, 0.03));
      T.spinGroup.rotation.x = cur;

      flash = Math.max(0, flash - dt * 0.45);
      const f = flash;
      const breathe = 0.5 + Math.sin(t * 1.6) * 0.5;

      base.copy(neon).multiplyScalar(0.62 + 0.08 * breathe + f * 1.1);
      T.neonMat.color.copy(base);
      T.capMat.emissive.copy(neon);
      T.capMat.emissiveIntensity = 1.2 + f * 2.5;
      T.capGlow.material.color.copy(neon);
      T.edgeMat.color.copy(neon);
      T.edgeMat.opacity = 0.28 + f * 0.45;

      T.pointLights.forEach((l) => {
        l.color.copy(neon);
        l.intensity = 1.3 + 0.2 * breathe + f * 3.2;
      });

      T.beamMat.color.copy(neon);
      T.beamMat.opacity = f * 0.22 * (0.9 + Math.sin(t * 14) * 0.1);
      (T.poolMesh.material as THREE.MeshBasicMaterial).color.copy(neon);
      (T.poolMesh.material as THREE.MeshBasicMaterial).opacity = 0.2 + f * 0.25;
      T.ringMat.color.copy(neon);
      T.ringMat.opacity = 0.45 + f * 0.5;

      pulseT += dt;
      const pp = Math.min(1, pulseT / 1.8);
      T.pulseMesh.scale.setScalar(1 + pp * 2.4);
      T.pulseMat.color.copy(neon);
      T.pulseMat.opacity = (1 - pp) * 0.75;

      (T.dashedRing.material as THREE.LineDashedMaterial).color.copy(neon);
      (T.haloGlow.material as THREE.SpriteMaterial).color.copy(neon);
      T.dashedRing.rotation.z += dt * 0.02 * (mo || 0.3);
      T.ticksLines.rotation.y -= dt * 0.01;
      T.outerRing.rotation.z += dt * 0.01;

      (T.scannerScreen.material as THREE.MeshBasicMaterial).color.copy(tc.copy(col(0xbae6fd)).lerp(neon, f));
      (T.scannerScreen.material as THREE.MeshBasicMaterial).opacity = 0.65 + 0.25 * breathe;

      for (let i = 0; i < T.motesCount; i++) {
        T.motesPosArray[i * 3 + 1] += T.motesVelArray[i] * dt * (0.3 + mo);
        if (T.motesPosArray[i * 3 + 1] > 3.2) T.motesPosArray[i * 3 + 1] = T.floorY;
      }
      T.motes.geometry.attributes.position.needsUpdate = true;
      T.motes.rotation.y += dt * 0.03 * mo;



      r.render(scene, cam);
    };

    const io = new IntersectionObserver((es) => {
      vis = es[es.length - 1].isIntersecting;
      if (vis && mot > 0 && !raf && !destroyed) {
        lastTime = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!vis && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);

    if (mot > 0) {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', pm);
      window.removeEventListener('resize', updateRect);
      el.removeEventListener('pointerenter', updateRect);
      r.domElement.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointerup', pu);
      document.documentElement.removeEventListener('pointerleave', pl2);
      scene.traverse((x) => {
        if ((x as THREE.Mesh).geometry) (x as THREE.Mesh).geometry.dispose();
        if ((x as THREE.Mesh).material) {
          const mat = (x as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      if (scene.environment) scene.environment.dispose();
      r.dispose();
      if (el.contains(r.domElement)) el.removeChild(r.domElement);
    };
  }, [motion, neonColorHex]);

  useEffect(() => {
    if (passTrigger > 0 && triggerPassRef.current) {
      triggerPassRef.current(lastPassName);
    }
  }, [passTrigger, lastPassName]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto" />;
};
