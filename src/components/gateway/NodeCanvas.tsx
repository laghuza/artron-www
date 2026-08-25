"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useI18n } from '@/context/I18nContext';
import { ViewState, ArtronNode, FacilityPreset } from '@/types/gateway';
import { Node01CanvasView } from './Node01CanvasView';
import { Node02CanvasView } from './Node02CanvasView';
import { Node03CanvasView } from './Node03CanvasView';
import { Node04CanvasView } from './Node04CanvasView';
import { Node05CanvasView } from './Node05CanvasView';
import { Node06CanvasView } from './Node06CanvasView';
import { Node07CanvasView } from './Node07CanvasView';
import { Node08CanvasView } from './Node08CanvasView';
import { Node09CanvasView } from './Node09CanvasView';
import { GhostTrigger } from './GhostTrigger';
import { CyberAuthLoginCard } from './CyberAuthLoginCard';
import { UnifiedRegistrationWizard, UnifiedRegistrationData } from './UnifiedRegistrationWizard';
import { soundEngine } from '@/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FacilityPresetBar } from './widgets/FacilityPresetBar';
import { QuantumAmbientDust } from './QuantumAmbientDust';

interface NodeCanvasProps {
  nodes: ArtronNode[];
  activeNodeId: number | null;
  activeSubChapterId?: string | null;
  activePreset?: FacilityPreset;
  viewState: ViewState;
  onSelectNode: (nodeId: number) => void;
  onPortalEntry?: () => void;
  onAuthenticate?: (
    mode: 'FULL_B2B' | 'TEMP_OTP',
    credentials: { username?: string; password?: string; otpCode?: string; orgName?: string; discipline?: string; isTrial?: boolean }
  ) => void;
  isSplitMode?: boolean;
  onSelectPreset?: (preset: FacilityPreset) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  initialAction?: string | null;
}

const PRESET_NODES_MAP: Record<FacilityPreset, number[]> = {
  ALL: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  GYM: [2, 5, 6, 7],
  POOL: [1, 2, 7],
  STUDIO: [3, 4, 5],
  CLUB: [1, 3, 8],
};

const COLORS: Record<number, string> = {
  1: "#00FF87", // Neon Emerald
  2: "#00A3FF", // Electric Cyan
  3: "#38BDF8", // Sky Teal
  4: "#6366F1", // Electric Indigo
  5: "#00E5FF", // Cyan Teal
  6: "#0EA5E9", // Deep Cyan
  7: "#10B981", // Mint Emerald
  8: "#00A3FF", // Sapphire Cyber
  9: "#00FF87"  // Core Emerald
};

const COORDS = [
  { x: 200, y: 50,  align: "middle" as const, tx: 200, ty: 22 },
  { x: 350, y: 50,  align: "start" as const,  tx: 370, ty: 45 },
  { x: 350, y: 200, align: "start" as const,  tx: 370, ty: 203 },
  { x: 350, y: 350, align: "start" as const,  tx: 370, ty: 360 },
  { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 382 },
  { x: 50,  y: 350, align: "end" as const,    tx: 30,  ty: 360 },
  { x: 50,  y: 200, align: "end" as const,    tx: 30,  ty: 203 },
  { x: 50,  y: 50,  align: "end" as const,    tx: 30,  ty: 45 }
];

export const NodeCanvas: React.FC<NodeCanvasProps> = ({
  activeNodeId,
  activeSubChapterId,
  activePreset = 'ALL',
  onSelectNode,
  onPortalEntry,
  onAuthenticate,
  isSplitMode = false,
  onSelectPreset,
  isMuted = false,
  onToggleMute,
  initialAction,
}) => {
  const router = useRouter();
  const { t } = useI18n();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [showAuthCard, setShowAuthCard] = useState(false);
  const [showRegistrationCard, setShowRegistrationCard] = useState(false);

  const activeNode = activeNodeId || 0;
  const currentActive = hoveredNode !== null ? hoveredNode : activeNode;
  const isCenterActive = currentActive === 9;
  const isNode09Active = activeNodeId === 9;
  const isAnyNodeActive = activeNodeId !== null && activeNodeId > 0 && activeNodeId < 9;
  const activeColor = activeNodeId ? (COLORS[activeNodeId] || "#00A3FF") : "#00A3FF";
  const highlightedNodes = PRESET_NODES_MAP[activePreset] || PRESET_NODES_MAP.ALL;

  const handleNodeSelect = useCallback((id: number) => {
    soundEngine.playPulseNode();
    onSelectNode(id);
  }, [onSelectNode]);

  const handleRegistrationComplete = (data: UnifiedRegistrationData) => {
    setShowRegistrationCard(false);
    if (onAuthenticate) {
      onAuthenticate('FULL_B2B', {
        username: data.email,
        orgName: data.clubName,
        discipline: data.clubServices,
        isTrial: true,
      });
    } else if (onPortalEntry) {
      onPortalEntry();
    }
  };

  const nodeItems = useMemo(() => {
    return COORDS.map((coord, i) => ({
      id: i + 1,
      ...coord,
      label: t(`labels.node_${i + 1}`),
      active: currentActive === i + 1,
      isPresetMatch: highlightedNodes.includes(i + 1),
      color: COLORS[i + 1] || "#00A3FF"
    }));
  }, [currentActive, highlightedNodes, t]);

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none p-4 md:p-6 overflow-hidden bg-[#06080D]">
      {/* 4K Cinematic Ambient Particles and Deep Space Glow */}
      <QuantumAmbientDust primaryColor="#00A3FF" secondaryColor="#00FF87" />
      
      {/* Volumetric Radial Aura */}
      <div
        className={`absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full blur-[150px] transition-all duration-700 pointer-events-none z-0 ${
          activeSubChapterId ? "opacity-10" : "opacity-25"
        }`}
        style={{ backgroundColor: COLORS[currentActive] || "#00A3FF" }}
      />

      {/* Top Floating Cyber HUD */}
      {!isSplitMode && (
        <div className="absolute top-4 inset-x-4 md:inset-x-8 z-40 flex items-center justify-between pointer-events-auto animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              onClick={() => soundEngine.playPulseNode()}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] hover:text-[#00A3FF] border border-white/10 hover:border-[#00A3FF]/60 bg-[#090D14]/85 backdrop-blur-md px-3 py-1.8 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>← {t('hud.return_to_main')}</span>
            </Link>

            {onToggleMute && (
              <button
                type="button"
                onClick={onToggleMute}
                className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] hover:text-white border border-white/10 hover:border-[#00A3FF]/60 bg-[#090D14]/85 backdrop-blur-md px-3 py-1.8 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${!isMuted ? 'bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]' : 'bg-gray-600'}`} />
                <span>[ {isMuted ? t('hud.audio_muted') : t('hud.audio_on')} ]</span>
              </button>
            )}
          </div>

          {onSelectPreset && (
            <div className="hidden md:flex items-center justify-center">
              <FacilityPresetBar activePreset={activePreset} onSelectPreset={onSelectPreset} compact={true} />
            </div>
          )}

          <div className="flex items-center">
            <GhostTrigger
              onRegisterClick={() => { soundEngine.playSystemAccess(); router.push('/get-started?mode=register'); }}
              onGuestDemoClick={() => { soundEngine.playPulseNode(); router.push('/get-started?mode=demo'); }}
              onOperatorAuthClick={() => { soundEngine.playPulseNode(); handleNodeSelect(9); setShowAuthCard(true); }}
              onAccessClick={() => { if (onPortalEntry) onPortalEntry(); else handleNodeSelect(9); }}
            />
          </div>
        </div>
      )}

      {/* Split Mode Floating Trigger */}
      {isSplitMode && (
        <div className="absolute top-4 right-6 z-40">
          <GhostTrigger
            onRegisterClick={() => { soundEngine.playSystemAccess(); router.push('/get-started?mode=register'); }}
            onGuestDemoClick={() => { soundEngine.playPulseNode(); router.push('/get-started?mode=demo'); }}
            onOperatorAuthClick={() => { soundEngine.playPulseNode(); handleNodeSelect(9); setShowAuthCard(true); }}
            onAccessClick={() => { if (onPortalEntry) onPortalEntry(); else handleNodeSelect(9); }}
          />
        </div>
      )}

      {/* Bottom Floating Action Hint */}
      {!isSplitMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fadeIn w-full px-4 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#090D14]/90 border border-[#00A3FF]/40 rounded-full backdrop-blur-md shadow-[0_0_24px_rgba(0,163,255,0.2)] font-mono text-[11px] text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-ping" />
            <span className="text-[#00A3FF] font-bold">ARTRON SPORTS OS //</span>
            <span className="text-white">{t('system.select_node_hint')}</span>
          </div>
        </div>
      )}

      {/* Active Stage Views */}
      {activeNodeId === 1 && (
        <Node01CanvasView
          activeSubChapterId={activeSubChapterId || null}
          initialAction={initialAction}
          onLaunchConsole={() => {
            if (onAuthenticate) {
              onAuthenticate('FULL_B2B', {
                username: 'operator@artron.ge',
                orgName: 'ARTRON DEMO CLUB',
                isTrial: true,
              });
            }
          }}
        />
      )}
      {activeNodeId === 2 && <Node02CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 3 && <Node03CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 4 && <Node04CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 5 && <Node05CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 6 && <Node06CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 7 && <Node07CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 8 && <Node08CanvasView activeSubChapterId={activeSubChapterId || null} />}
      {activeNodeId === 9 && !showAuthCard && !showRegistrationCard && (
        <Node09CanvasView
          activeSubChapterId={activeSubChapterId || null}
          onLaunchRegistration={() => { soundEngine.playSystemAccess(); router.push('/get-started?mode=register'); }}
          onLaunchDemo={() => { soundEngine.playPulseNode(); router.push('/get-started?mode=demo'); }}
          onLaunchAuth={() => setShowAuthCard(true)}
        />
      )}

      {/* Full-Screen Immersive Auth Modal */}
      {isNode09Active && showAuthCard && onAuthenticate && (
        <CyberAuthLoginCard
          onAuthenticate={onAuthenticate}
          onClose={() => setShowAuthCard(false)}
          onSwitchToRegister={() => { setShowAuthCard(false); setShowRegistrationCard(true); }}
        />
      )}

      {/* Unified 14-Day Registration Modal */}
      {isNode09Active && showRegistrationCard && (
        <div className="fixed inset-0 z-[100] bg-[#060709]/95 overflow-y-auto flex items-center justify-center p-3 md:p-6 select-none font-sans animate-fadeIn">
          <div className="relative w-full max-w-2xl my-auto py-6">
            <div className="w-full flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setShowRegistrationCard(false)}
                className="font-mono text-xs text-[#9CA3AF] hover:text-[#00FF87] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                [ ESC / ✕ დახურვა ]
              </button>
            </div>
            <UnifiedRegistrationWizard
              onComplete={handleRegistrationComplete}
              onCancel={() => setShowRegistrationCard(false)}
              onSwitchToLogin={() => { setShowRegistrationCard(false); setShowAuthCard(true); }}
            />
          </div>
        </div>
      )}

      {/* Main 9-Core Quantum SVG Matrix */}
      <svg
        viewBox="-170 0 740 400"
        className={`w-full ${!isSplitMode ? "max-w-[760px] lg:max-w-[860px]" : "max-w-[640px]"} aspect-[740/400] cursor-pointer overflow-visible z-10 transition-all duration-300 ${
          activeSubChapterId ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <defs>
          {/* Quantum Core Radial Glow */}
          <radialGradient id="core-glow-volumetric" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#0066FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>

          {/* Active Node Holographic Aura */}
          <radialGradient id="node-active-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>

          <filter id="neon-bloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Precision Telemetry Grid & Concentric Orbits */}
        <g className="stroke-[rgba(148,163,184,0.08)] stroke-[0.75] fill-none pointer-events-none">
          <line x1="50" y1="50" x2="350" y2="50" strokeDasharray="4 6" />
          <line x1="50" y1="200" x2="350" y2="200" strokeDasharray="2 4" strokeOpacity="0.6" />
          <line x1="50" y1="350" x2="350" y2="350" strokeDasharray="4 6" />
          <line x1="50" y1="50" x2="50" y2="350" strokeDasharray="4 6" />
          <line x1="200" y1="50" x2="200" y2="350" strokeDasharray="2 4" strokeOpacity="0.6" />
          <line x1="350" y1="50" x2="350" y2="350" strokeDasharray="4 6" />
          
          <circle cx="200" cy="200" r="75" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="150" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="212" strokeDasharray="2 4" strokeOpacity="0.4" />
        </g>

        {/* Telemetry Guide Rays & Unified Inward Micro-Photons */}
        {nodeItems.map((node, i) => {
          const isActivePath = currentActive === node.id;
          const isBlurred = isAnyNodeActive && node.id !== activeNodeId;
          const isLaser = activeNodeId === node.id;
          const pulseDur = isActivePath ? "1.3s" : "3.4s";
          const delayBase = (i * 0.42).toFixed(2);
          const delaySecondary = (i * 0.42 + 0.65).toFixed(2);

          return (
            <g key={`laser-group-${node.id}`}>
              {/* Subtle Delicate Guide Track */}
              <line
                x1={node.x}
                y1={node.y}
                x2="200"
                y2="200"
                stroke={isLaser || isActivePath ? node.color : "rgba(148, 163, 184, 0.12)"}
                strokeWidth={isLaser ? "1.6" : isActivePath ? "1.2" : "0.75"}
                strokeDasharray={isLaser ? undefined : "3 4"}
                strokeOpacity={isBlurred ? "0.06" : isLaser ? "0.9" : isActivePath ? "0.6" : "0.25"}
                className="transition-all duration-300 pointer-events-none"
              />

              {/* Active Focused Beam Glow */}
              {(isLaser || isActivePath) && (
                <line
                  x1={node.x}
                  y1={node.y}
                  x2="200"
                  y2="200"
                  stroke={node.color}
                  strokeWidth="3.5"
                  strokeOpacity="0.25"
                  className="transition-all duration-300 pointer-events-none blur-[1.5px]"
                />
              )}

              {/* Primary Micro-Photon Data Stream (Harmonious Cyan/Blue) */}
              <circle
                r={isActivePath ? "2.6" : "1.4"}
                fill={isActivePath ? node.color : "#00A3FF"}
                className="pointer-events-none"
              >
                <animate
                  attributeName="cx"
                  from={node.x}
                  to="200"
                  dur={pulseDur}
                  begin={`${delayBase}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from={node.y}
                  to="200"
                  dur={pulseDur}
                  begin={`${delayBase}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={isActivePath ? "0;0.9;1;0.4;0" : "0;0.45;0.6;0.2;0"}
                  keyTimes="0;0.12;0.65;0.92;1"
                  dur={pulseDur}
                  begin={`${delayBase}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Active Trailing Micro-Sparkle */}
              {isActivePath && (
                <circle
                  r="1.4"
                  fill="#FFFFFF"
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="cx"
                    from={node.x}
                    to="200"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={node.y}
                    to="200"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.85;0.2;0"
                    keyTimes="0;0.15;0.65;0.92;1"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Central Quantum Core (Node 09) */}
        <g
          onClick={() => handleNodeSelect(9)}
          onMouseEnter={() => setHoveredNode(9)}
          onMouseLeave={() => setHoveredNode(null)}
          className="cursor-pointer"
        >
          <circle cx="200" cy="200" r="45" fill="transparent" />
          <circle cx="200" cy="200" r="55" fill="url(#core-glow-volumetric)" className="pointer-events-none" />
          
          {/* Rotating Gyroscopic Reticle Rings */}
          <circle
            cx="200"
            cy="200"
            r="38"
            fill="none"
            stroke="#00A3FF"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            className="opacity-30 pointer-events-none animate-spin"
            style={{ animationDuration: '24s' }}
          />
          <circle
            cx="200"
            cy="200"
            r="28"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.0"
            strokeDasharray="3 5"
            className="opacity-45 pointer-events-none animate-spin"
            style={{ animationDuration: '14s', animationDirection: 'reverse' }}
          />

          {/* Dynamic Concentric Shockwave Pulse */}
          <circle cx="200" cy="200" r="22" fill="none" stroke="#00E5FF" strokeWidth="0.8" className="opacity-25 pointer-events-none animate-ping" />

          {/* Central Quantum Reactor Eye */}
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)", transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="16" fill="#0B0E14" stroke="#00A3FF" strokeWidth="1.2" style={{ fillOpacity: 0.95 }} />
            <circle cx="200" cy="200" r="6" fill="#00E5FF" className="transition-all duration-300" />
            <circle cx="200" cy="200" r="2.5" fill="#FFFFFF" />
          </g>

          <text
            x="200"
            y="172"
            textAnchor="middle"
            className={`font-mono text-[7.5px] font-bold tracking-[1.5px] fill-[#00E5FF] transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,163,255,0.8)] ${isCenterActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {t('labels.node_9')}
          </text>
        </g>

        {/* 8 Outer Unified High-Tech Telemetry Nodes */}
        {nodeItems.map((node) => {
          const isAct = node.active;
          const isBlurred = isAnyNodeActive && node.id !== activeNodeId;
          const isPresetDimmed = activePreset !== 'ALL' && !isAnyNodeActive && !node.isPresetMatch;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleNodeSelect(node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: isBlurred ? 0.15 : isPresetDimmed ? 0.35 : 1 }}
            >
              {/* Invisible touch/hover target */}
              <circle r="22" fill="transparent" className="cursor-pointer" />
              
              {/* Active Pulsing Radar Halo */}
              {isAct && (
                <circle
                  r="14"
                  fill="url(#node-active-aura)"
                  className="pointer-events-none animate-pulse"
                />
              )}
              {isAct && (
                <circle
                  r="11"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1.0"
                  className="animate-ping opacity-35 pointer-events-none"
                />
              )}

              {/* Node Geometry & Precision Reticle */}
              <g className="transition-transform duration-300" style={{ transform: isAct ? "scale(1.25)" : "scale(1)" }}>
                {/* Outer Reticle Ring */}
                <circle
                  r="5"
                  fill={isAct ? "rgba(0, 163, 255, 0.2)" : "rgba(18, 20, 24, 0.85)"}
                  stroke={isAct ? node.color : "rgba(0, 163, 255, 0.35)"}
                  strokeWidth={isAct ? "1.4" : "0.9"}
                  className="transition-all duration-300"
                />
                {/* Center Precision Pin */}
                <circle
                  r={isAct ? "2.2" : "1.6"}
                  fill={isAct ? "#FFFFFF" : "rgba(148, 163, 184, 0.6)"}
                  className="transition-all duration-300"
                />
              </g>

              {/* Node Telemetry Typography */}
              <text
                x={node.tx - node.x}
                y={node.ty - node.y}
                textAnchor={node.align}
                fill={isAct ? "#FFFFFF" : "#94A3B8"}
                className={`font-mono text-[10.5px] uppercase tracking-[1.2px] transition-colors duration-300 select-none ${
                  isAct ? "font-bold drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]" : "font-normal hover:fill-[#CBD5E1]"
                }`}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

