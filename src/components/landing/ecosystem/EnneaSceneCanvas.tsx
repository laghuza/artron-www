"use client";

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MIN_D, MAX_D, MAP_CAM, homePosition, fitDistance, radialGlowTexture } from "./EnneaMath";
import { EnneaRegion, EnneaVenue, EnneaStrings, ViewMode } from "./types";
import { soundEngine } from "./EnneaAudioEngine";
import { createSphericalCountryMesh, GlobeCountryVisual } from "./EnneaGlobeCountries";
import { buildEnneaGlobe } from "./EnneaGlobeBuilder";
import { fetchAndBuildAdm1, RegionEntry, PinEntry } from "./EnneaMapBuilder";
import { EnneaCanvasOverlays } from "./EnneaCanvasOverlays";
import { setupEnneaRaycasting, zoomSceneCamera, resetSceneCamera } from "./EnneaSceneInteractions";
import { AnimState, updateEnneaTick, applyEnneaMix } from "./EnneaSceneAnimation";
import { initEnneaScene } from "./EnneaSceneSetup";

interface EnneaSceneCanvasProps {
  viewMode: ViewMode;
  accent?: string;
  regions: EnneaRegion[];
  venues: EnneaVenue[];
  t: EnneaStrings;
  adm1Url?: string;
  onEnterGeorgia: () => void;
  onExitToGlobe: () => void;
  onSelectRegion: (id: string | null) => void;
  onSelectVenue: (venue: EnneaVenue | null) => void;
  selectedRegion: string | null;
  selectedVenue: EnneaVenue | null;
  activeCore: string | null;
}

export const EnneaSceneCanvas: React.FC<EnneaSceneCanvasProps> = ({
  viewMode,
  accent = "#7FD4FF",
  regions,
  venues,
  t,
  adm1Url = "/geo/georgia-adm1.json",
  onEnterGeorgia,
  onExitToGlobe,
  onSelectRegion,
  onSelectVenue,
  selectedRegion,
  selectedVenue,
  activeCore,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [soundOn, setSoundOn] = useState(soundEngine.isSoundEnabled());
  const [mapStatus, setMapStatus] = useState<"IDLE" | "LOADING" | "READY" | "ERROR">("IDLE");

  const pinLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const regionLabelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const stageBridgeRef = useRef<{
    flyTo: (mode: ViewMode) => void;
    focusRegion: (id: string | null) => void;
    focusVenue: (id: string | null) => void;
  } | null>(null);

  const viewRef = useRef<ViewMode>(viewMode);
  const hoverRegionRef = useRef<string | null>(null);
  const selectedRegionRef = useRef<string | null>(selectedRegion);
  const selectedVenueRef = useRef<string | null>(selectedVenue?.id ?? null);
  const hotRef = useRef<boolean>(!!activeCore);
  const userZoomed = useRef<boolean>(false);

  const animState = useRef<AnimState>({
    isTransitioning: false,
    progress: 0,
    to: "GLOBE",
    startCamPos: new THREE.Vector3(),
    targetCamPos: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
    targetLookAt: new THREE.Vector3(),
    stageMix: 0,
  });

  useLayoutEffect(() => {
    viewRef.current = viewMode;
    selectedRegionRef.current = selectedRegion;
    selectedVenueRef.current = selectedVenue?.id ?? null;
    hotRef.current = !!activeCore;
  }, [viewMode, selectedRegion, selectedVenue, activeCore]);

  const propsRef = useRef({ accent, adm1Url, regions, venues });
  useLayoutEffect(() => {
    propsRef.current = { accent, adm1Url, regions, venues };
  });

  const handlersRef = useRef({ onEnterGeorgia, onExitToGlobe, onSelectRegion, onSelectVenue });
  useLayoutEffect(() => {
    handlersRef.current = { onEnterGeorgia, onExitToGlobe, onSelectRegion, onSelectVenue };
  });

  const handleZoom = useCallback((factor: number) => {
    if (!controlsRef.current) return;
    userZoomed.current = true;
    zoomSceneCamera(controlsRef.current, factor);
  }, []);

  const handleReset = useCallback(() => {
    if (!controlsRef.current) return;
    userZoomed.current = false;
    resetSceneCamera(controlsRef.current, viewRef.current, () => {
      handlersRef.current.onSelectVenue(null);
      handlersRef.current.onSelectRegion(null);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const { accent: accStr, adm1Url: url, regions: regList, venues: venList } = propsRef.current;
    const accentColor = new THREE.Color(accStr);
    const titanium = new THREE.Color(0xc9d8e0);
    const ice = new THREE.Color(0xe8f8ff);

    const { scene, camera, renderer, controls, world, disposables } = initEnneaScene(canvas, wrap, accentColor);
    controlsRef.current = controls;

    const globeBundle = buildEnneaGlobe(accentColor, titanium);
    world.add(globeBundle.globeGroup);
    world.add(globeBundle.starFieldMesh);
    disposables.push(...globeBundle.disposables);

    let regionEntries: RegionEntry[] = [];
    let pinEntries: PinEntry[] = [];
    let mapMeshes: THREE.Object3D[] = [];
    let pinHits: THREE.Object3D[] = [];
    let mapFadeMats: Array<THREE.Material & { opacity: number }> = [];
    let baseOpacity = new Map<THREE.Material, number>();
    let mapStageGroup: THREE.Group | null = null;
    let globeCountryVisual: GlobeCountryVisual | null = null;

    const pinGlow = radialGlowTexture();
    disposables.push(pinGlow);

    setMapStatus("LOADING");
    const cancelFetch = fetchAndBuildAdm1(
      url,
      regList,
      venList,
      accentColor,
      ice,
      pinGlow,
      (bundle, feats) => {
        mapStageGroup = bundle.mapStage;
        world.add(mapStageGroup);
        regionEntries = bundle.regionEntries;
        pinEntries = bundle.pinEntries;
        mapMeshes = bundle.mapMeshes;
        pinHits = bundle.pinHits;
        mapFadeMats = bundle.mapFadeMats;
        baseOpacity = bundle.baseOpacity;
        disposables.push(...bundle.disposables);

        try {
          globeCountryVisual = createSphericalCountryMesh(feats, accentColor.getHex());
          globeBundle.globeGroup.add(globeCountryVisual.group);
          disposables.push(...globeCountryVisual.disposables);
        } catch (err) {
          console.warn("Spherical country mesh error:", err);
        }
        setMapStatus("READY");
      },
      () => setMapStatus("ERROR")
    );

    const anim = animState.current;
    const flyTo = (mode: ViewMode) => {
      controls.enabled = false;
      controls.autoRotate = false;
      controls.enableDamping = false;
      anim.isTransitioning = true;
      anim.progress = 0;
      anim.to = mode;
      anim.startCamPos.copy(camera.position);
      anim.startLookAt.copy(controls.target);

      if (mode === "GEORGIA_DETAIL") {
        anim.targetCamPos.copy(MAP_CAM);
        anim.targetLookAt.set(0, 0, 0);
      } else {
        const d = THREE.MathUtils.clamp(fitDistance(camera.fov, camera.aspect), MIN_D, MAX_D + 1.2);
        anim.targetCamPos.copy(homePosition(41.7, 44.8, d));
        anim.targetLookAt.set(0, 0, 0);
      }
      userZoomed.current = mode === "GEORGIA_DETAIL";
    };

    const focusRegion = (id: string | null) => {
      const entry = id ? regionEntries.find((r) => r.id === id) : null;
      if (!entry) {
        controls.target.set(0, 0, 0);
        controls.object.position.copy(MAP_CAM);
        controls.update();
        return;
      }
      controls.target.copy(entry.center);
      controls.object.position.copy(entry.center).add(new THREE.Vector3(0.2, 1.75, 1.65));
      controls.update();
    };

    const focusVenue = (id: string | null) => {
      const pin = id ? pinEntries.find((p) => p.id === id) : null;
      if (!pin) return;
      controls.target.set(pin.group.position.x + 0.45, pin.group.position.y + 0.2, pin.group.position.z);
      controls.object.position.copy(controls.target).add(new THREE.Vector3(0.2, 1.5, 1.6));
      controls.update();
    };

    stageBridgeRef.current = { flyTo, focusRegion, focusVenue };
    applyEnneaMix(anim, globeBundle, mapStageGroup, globeCountryVisual, mapFadeMats, baseOpacity);

    const teardownRaycasting = setupEnneaRaycasting({
      renderer,
      camera,
      beaconHitMesh: globeBundle.beaconHitMesh,
      globeCountryVisual: () => globeCountryVisual,
      pinHits: () => pinHits,
      mapMeshes: () => mapMeshes,
      venues: () => venList,
      getViewMode: () => viewRef.current,
      getSelectedVenueId: () => selectedVenueRef.current,
      onEnterGeorgia: () => handlersRef.current.onEnterGeorgia(),
      onSelectVenue: (v) => handlersRef.current.onSelectVenue(v),
      onSelectRegion: (id) => handlersRef.current.onSelectRegion(id),
      setHoverRegion: (id) => { hoverRegionRef.current = id; },
    });

    let cachedW = wrap.clientWidth || 1;
    let cachedH = wrap.clientHeight || 1;

    const resize = () => {
      cachedW = wrap.clientWidth || 1;
      cachedH = wrap.clientHeight || 1;
      const pixelRatio = Math.min(window.devicePixelRatio, 2);

      camera.aspect = cachedW / cachedH;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(cachedW, cachedH, false);
      globeBundle.uniforms.uPixelRatio.value = pixelRatio;

      const fit = fitDistance(camera.fov, camera.aspect);
      if (viewRef.current === "GLOBE") {
        controls.maxDistance = Math.max(MAX_D, fit + 0.8);
        if (!userZoomed.current && !anim.isTransitioning) {
          camera.position.copy(homePosition(41.7, 44.8, fit));
          controls.update();
        }
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const proj = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    let isVisible = false;
    let isDisposed = false;

    const tick = () => {
      if (isDisposed || !isVisible) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      updateEnneaTick({
        dt,
        time,
        anim,
        camera,
        controls,
        globeBundle,
        mapStageGroup,
        globeCountryVisual,
        regionEntries,
        pinEntries,
        mapFadeMats,
        baseOpacity,
        hoverRegionId: hoverRegionRef.current,
        selectedRegionId: selectedRegionRef.current,
        selectedVenueId: selectedVenueRef.current,
        isHot: hotRef.current,
        userZoomedRef: userZoomed,
        cachedW,
        cachedH,
        pinLabelRefs,
        regionLabelRefs,
        badgeRef,
        proj,
      });

      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible && !isDisposed) {
            clock.getDelta();
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      isDisposed = true;
      cancelFetch();
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      teardownRaycasting();
      controls.dispose();
      controlsRef.current = null;
      stageBridgeRef.current = null;
      disposables.forEach((d) => d.dispose());
      scene.clear();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    stageBridgeRef.current?.flyTo(viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (selectedVenue) {
      stageBridgeRef.current?.focusVenue(selectedVenue.id);
    } else if (selectedRegion) {
      stageBridgeRef.current?.focusRegion(selectedRegion);
    } else if (viewMode === "GEORGIA_DETAIL") {
      stageBridgeRef.current?.focusRegion(null);
    }
  }, [selectedVenue, selectedRegion, viewMode]);

  return (
    <div ref={wrapRef} className="relative flex-1 w-full h-[550px] md:h-[680px] lg:h-full bg-[#0A0D12] overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(62%_58%_at_52%_46%,rgba(127,212,255,0.09),rgba(10,13,18,0)_72%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none block" />

      <EnneaCanvasOverlays
        badgeRef={badgeRef}
        pinLabelRefs={pinLabelRefs}
        regionLabelRefs={regionLabelRefs}
        regions={regions}
        venues={venues}
        selectedVenue={selectedVenue}
        t={t}
        soundOn={soundOn}
        viewMode={viewMode}
        mapStatus={mapStatus}
        activeCore={activeCore}
        onEnterGeorgia={onEnterGeorgia}
        onSelectVenue={onSelectVenue}
        onToggleSound={() => setSoundOn(soundEngine.toggleSound())}
        onZoom={handleZoom}
        onReset={handleReset}
      />
    </div>
  );
};
