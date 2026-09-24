'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneVariantId } from '../data/mirrorDataTypes';
import { SCENE_VIEWS, TILE_FOCUS_POSES } from './sceneConfig';
import { createStudioEnv, createRadialTex, disposeGroup, computeFitBase } from './sceneUtils';
import { createAmbientField, createLightRays, AmbientParticleSystem, VolumetricRaysSystem } from './sceneAtmosphere';
import { buildSceneVariant, SceneModelHandle } from './builders';

interface MirrorSceneCanvasProps {
  variant: SceneVariantId;
  accent: string;
  focusTileIndex: number | null;
  shift?: number;
}

export const MirrorSceneCanvas: React.FC<MirrorSceneCanvasProps> = ({
  variant,
  accent,
  focusTileIndex,
  shift = 0.42,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    activeModel: SceneModelHandle | null;
    ambient: AmbientParticleSystem | null;
    rays: VolumetricRaysSystem | null;
    sweepLight: THREE.PointLight | null;
    fillLight: THREE.PointLight | null;
    rafId: number;
    lastTime: number;
    startTime: number;
    pointer: THREE.Vector2;
    camGoal: THREE.Vector3;
    tgtGoal: THREE.Vector3;
    camCurrent: THREE.Vector3;
    tgtCurrent: THREE.Vector3;
    camBase: THREE.Vector3;
    center: THREE.Vector3;
    isVisible: boolean;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    activeModel: null,
    ambient: null,
    rays: null,
    sweepLight: null,
    fillLight: null,
    rafId: 0,
    lastTime: typeof performance !== 'undefined' ? performance.now() : 0,
    startTime: typeof performance !== 'undefined' ? performance.now() : 0,
    pointer: new THREE.Vector2(),
    camGoal: new THREE.Vector3(0, 2.5, 7.4),
    tgtGoal: new THREE.Vector3(0, 0, 0),
    camCurrent: new THREE.Vector3(0, 2.5, 7.4),
    tgtCurrent: new THREE.Vector3(0, 0, 0),
    camBase: new THREE.Vector3(0, 2.5, 7.4),
    center: new THREE.Vector3(0, 0, 0),
    isVisible: true,
  });

  // 1. Initial 3D Scene Bootstrap & IntersectionObserver Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 600;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;pointer-events:none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060911, 0.044);
    scene.environment = createStudioEnv();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 120);
    camera.position.set(0, 2.5, 7.4);

    scene.add(new THREE.AmbientLight(0xbcd8ff, 0.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3.5, 7, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x00d0ff, 0.9);
    rimLight.position.set(-6, 2.5, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x00ff99, 18, 22, 2);
    fillLight.position.set(0, 1.5, 4);
    scene.add(fillLight);

    const sweepLight = new THREE.PointLight(0xfff0c0, 22, 20, 2);
    sweepLight.position.set(3, 2, 3);
    scene.add(sweepLight);

    const grid = new THREE.GridHelper(48, 72, 0x0d1a26, 0x0a1219);
    grid.position.y = -1.42;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.55;
    scene.add(grid);

    const glowTex = createRadialTex();
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 26),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -1.4;
    scene.add(glow);

    const ambient = createAmbientField(isMobile);
    scene.add(ambient.group);

    const rays = createLightRays(isMobile);
    scene.add(rays.group);

    const state = stateRef.current;
    state.renderer = renderer;
    state.scene = scene;
    state.camera = camera;
    state.ambient = ambient;
    state.rays = rays;
    state.fillLight = fillLight;
    state.sweepLight = sweepLight;

    // Pointer parallax
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      state.pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      state.pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize observer & off-axis frustum projection
    const updateProjection = () => {
      if (!container || !state.renderer || !state.camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;

      state.renderer.setSize(w, h, false);
      state.camera.aspect = w / h;

      const isMobileNow = window.innerWidth < 768;
      const frac = isMobileNow ? 0 : Math.max(0, Math.min(0.5, shift));
      if (frac < 0.01) {
        state.camera.clearViewOffset();
      } else {
        state.camera.setViewOffset(w, h, -w * frac * 0.5, 0, w, h);
      }
      state.camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(() => updateProjection());
    ro.observe(container);
    updateProjection();

    // RAF Render Loop
    let running = true;
    const animate = () => {
      if (!running || !state.isVisible) return;
      state.rafId = requestAnimationFrame(animate);
      if (!state.renderer || !state.scene || !state.camera) return;

      const now = performance.now();
      const dt = Math.min(0.1, (now - state.lastTime) * 0.001);
      state.lastTime = now;
      const t = (now - state.startTime) * 0.001;

      // Frame-rate independent smooth camera interpolation matching Claude Design
      const isFocused = focusTileIndex !== null;
      const lam = isFocused ? 3.6 : 2.7;
      const k = 1 - Math.exp(-lam * dt);
      state.camCurrent.lerp(state.camGoal, k);
      state.tgtCurrent.lerp(state.tgtGoal, 1 - Math.exp(-lam * 1.35 * dt));

      state.camera.position.x = state.camCurrent.x + state.pointer.x * (isFocused ? 0.1 : 0.2);
      state.camera.position.y = state.camCurrent.y - state.pointer.y * (isFocused ? 0.08 : 0.15);
      state.camera.position.z = state.camCurrent.z;
      state.camera.lookAt(state.tgtCurrent);

      // Model updates & idle yaw swing
      if (state.activeModel) {
        state.activeModel.group.rotation.y = Math.sin(t * 0.11) * 0.16;
        state.activeModel.update(t, dt);
      }
      state.ambient?.update(t);
      state.rays?.update(t);

      // Orbit sweep light around scene for dynamic reflections
      if (state.sweepLight) {
        state.sweepLight.position.set(
          Math.cos(t * 0.5) * 4.2,
          2.4 + Math.sin(t * 0.7) * 1.2,
          Math.sin(t * 0.5) * 4.2
        );
      }

      state.renderer.render(state.scene, state.camera);
    };

    // Start render loop immediately
    state.lastTime = performance.now();
    state.startTime = performance.now();
    state.rafId = requestAnimationFrame(animate);

    // IntersectionObserver to freeze loop when completely off-screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = state.isVisible;
          state.isVisible = entry.isIntersecting;
          if (!wasVisible && entry.isIntersecting && running) {
            state.lastTime = performance.now();
            cancelAnimationFrame(state.rafId);
            state.rafId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    return () => {
      running = false;
      cancelAnimationFrame(state.rafId);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      if (state.activeModel && state.scene) {
        disposeGroup(state.activeModel.group, state.scene);
      }
      ambient.dispose();
      rays.dispose();
      glowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [shift]);

  // 2. Variant & Accent Switching with Deep Memory Cleanup
  useEffect(() => {
    const state = stateRef.current;
    if (!state.scene) return;

    if (state.activeModel) {
      disposeGroup(state.activeModel.group, state.scene);
      state.activeModel = null;
    }

    const newModel = buildSceneVariant(variant, accent);
    state.scene.add(newModel.group);
    state.activeModel = newModel;

    // Recalculate camera pose immediately for the new model
    if (state.camera) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const lateralShift = isMobile ? 0 : shift;
      const view = SCENE_VIEWS[variant] || [0, 0.3, 1.05];
      const fit = computeFitBase(newModel.group, view, state.camera.aspect, lateralShift);
      if (fit) {
        state.camBase.copy(fit.camPos);
        state.center.copy(fit.center);
        state.camGoal.copy(fit.camPos);
        state.tgtGoal.copy(fit.center);
      }
    }

    // Update light rays tint
    const accentCol = new THREE.Color(accent);
    state.rays?.setColor(accentCol);
  }, [variant, accent]);

  // 3. Camera Pose: Bounding-box fitBase + Focus Target Lerping
  useEffect(() => {
    const state = stateRef.current;
    if (!state.camera) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const lateralShift = isMobile ? 0 : shift;

    if (focusTileIndex !== null && TILE_FOCUS_POSES[variant]?.[focusTileIndex]) {
      const [cx, cy, cz, tx, ty, tz] = TILE_FOCUS_POSES[variant][focusTileIndex];
      const aspectFit = Math.max(1, 1.62 / Math.max(0.4, state.camera.aspect * (1 - lateralShift))) * (1 + 0.5 * lateralShift);
      const tgt = new THREE.Vector3(tx, ty, tz);
      const off = new THREE.Vector3(cx - tx, cy - ty, cz - tz).multiplyScalar(aspectFit);
      if (focusTileIndex === 0 && state.camBase && state.center) {
        const need = state.camBase.distanceTo(state.center);
        const have = off.length() || 1;
        if (have < need) off.multiplyScalar(need / have);
      }
      state.camGoal.copy(tgt).add(off);
      state.tgtGoal.copy(tgt);
      return;
    }

    // Auto-fit camera using model bounding box for 80% visual coverage
    if (state.activeModel) {
      const view = SCENE_VIEWS[variant] || [0, 0.3, 1.05];
      const fit = computeFitBase(state.activeModel.group, view, state.camera.aspect, lateralShift);
      if (fit) {
        state.camBase.copy(fit.camPos);
        state.center.copy(fit.center);
        state.camGoal.copy(fit.camPos);
        state.tgtGoal.copy(fit.center);
        return;
      }
    }

    // Fallback base pose
    const view = SCENE_VIEWS[variant] || [0, 0.3, 1.05];
    const elevation = view[1];
    const dist = 7.4 * view[2];
    state.camGoal.set(0, Math.sin(elevation) * dist + 1.2, Math.cos(elevation) * dist);
    state.tgtGoal.set(0, 0, 0);
  }, [variant, focusTileIndex, shift]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    />
  );
};
