"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { ViewState, ArtronNode } from '@/types/gateway';
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
import { soundEngine } from '@/core';

interface NodeCanvasProps {
  nodes: ArtronNode[];
  activeNodeId: number | null;
  activeSubChapterId?: string | null;
  viewState: ViewState;
  onSelectNode: (nodeId: number) => void;
  onPortalEntry?: () => void;
  onAuthenticate?: (
    mode: 'FULL_B2B' | 'TEMP_OTP',
    credentials: { username?: string; password?: string; otpCode?: string }
  ) => void;
}

const COLORS: Record<number, string> = {
  1: "#00B0FF",
  2: "#00ff87",
  3: "#D97736",
  4: "#00ff87",
  5: "#D4AF37",
  6: "#D4AF37",
  7: "#00A3FF",
  8: "#00ff87",
  9: "#00ff87"
};

const COORDS = [
  { x: 200, y: 50,  align: "middle" as const, tx: 200, ty: 30 },
  { x: 350, y: 50,  align: "start" as const,  tx: 364, ty: 45 },
  { x: 350, y: 200, align: "start" as const,  tx: 364, ty: 203 },
  { x: 350, y: 350, align: "start" as const,  tx: 364, ty: 358 },
  { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 372 },
  { x: 50,  y: 350, align: "end" as const,    tx: 36,  ty: 358 },
  { x: 50,  y: 200, align: "end" as const,    tx: 36,  ty: 203 },
  { x: 50,  y: 50,  align: "end" as const,    tx: 36,  ty: 45 }
];

export const NodeCanvas: React.FC<NodeCanvasProps> = ({
  nodes: _n,
  activeNodeId,
  activeSubChapterId,
  viewState: _v,
  onSelectNode,
  onPortalEntry,
  onAuthenticate,
}) => {
  const { t } = useI18n();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [showAuthCard, setShowAuthCard] = useState(false);
  const activeNode = activeNodeId || 0;
  const currentActive = hoveredNode !== null ? hoveredNode : activeNode;
  const isCenterActive = currentActive === 9;
  const isNode09Active = activeNodeId === 9;
  const isAnyNodeActive = activeNodeId !== null && activeNodeId > 0 && activeNodeId < 9;
  const activeColor = activeNodeId ? (COLORS[activeNodeId] || "#00ff87") : "#00B0FF";

  const handleNodeHover = (id: number) => {
    setHoveredNode(id);
  };

  const handleNodeSelect = (id: number) => {
    soundEngine.playPulseNode();
    onSelectNode(id);
  };

  const nodeItems = COORDS.map((coord, i) => ({
    id: i + 1,
    ...coord,
    label: t(`labels.node_${i + 1}`),
    active: currentActive === i + 1,
    color: COLORS[i + 1] || "#9CA3AF"
  }));

  return (
    <div className="w-full lg:w-[60%] h-full flex items-center justify-center relative select-none p-6 overflow-hidden">
      {/* Ambient Radial Spotlight Glow */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 pointer-events-none z-0"
        style={{ backgroundColor: COLORS[currentActive] || "#00B0FF" }}
      />

      {/* Top-Right Rotating Logo Trigger with Glassmorphic Dropdown */}
      <div className="absolute top-4 right-6 z-40">
        <GhostTrigger onAccessClick={() => { if (onPortalEntry) onPortalEntry(); else handleNodeSelect(9); }} />
      </div>

      {/* Overlay Stage Views for Interactive Nodes */}
      {activeNodeId === 1 && (
        <Node01CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 2 && (
        <Node02CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 3 && (
        <Node03CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 4 && (
        <Node04CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 5 && (
        <Node05CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 6 && (
        <Node06CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 7 && (
        <Node07CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 8 && (
        <Node08CanvasView activeSubChapterId={activeSubChapterId || null} />
      )}
      {activeNodeId === 9 && !showAuthCard && (
        <Node09CanvasView
          activeSubChapterId={activeSubChapterId || null}
          onLaunchRegistration={() => {
            if (onPortalEntry) onPortalEntry();
          }}
          onLaunchAuth={() => setShowAuthCard(true)}
        />
      )}

      {/* Overlay for Node #09 Full-Screen Immersive Auth & Registration Backdrop */}
      {isNode09Active && showAuthCard && onAuthenticate && (
        <CyberAuthLoginCard
          onAuthenticate={onAuthenticate}
          onClose={() => setShowAuthCard(false)}
        />
      )}

      <svg viewBox="0 0 400 400" className="w-full max-w-[460px] aspect-square cursor-pointer overflow-visible z-10" onMouseLeave={() => setHoveredNode(null)}>
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 3x3 Bounding Matrix */}
        <g className="stroke-[rgba(156,163,175,0.04)] stroke-[0.8] fill-none pointer-events-none">
          <line x1="50" y1="50" x2="350" y2="50" />
          <line x1="50" y1="200" x2="350" y2="200" />
          <line x1="50" y1="350" x2="350" y2="350" />
          <line x1="50" y1="50" x2="50" y2="350" />
          <line x1="200" y1="50" x2="200" y2="350" />
          <line x1="350" y1="50" x2="350" y2="350" />
        </g>

        {/* Animated Data Packets Flow */}
        {(currentActive !== 0) && nodeItems.map((node) => {
          const isBlurred = isAnyNodeActive && node.id !== activeNodeId;
          const packetColor = COLORS[node.id] || "#00ff87";
          return (
            <circle key={`packet-${node.id}`} r="2.5" fill={packetColor} className="pointer-events-none" style={{ opacity: isBlurred ? 0.05 : 1 }}>
              <animate attributeName="cx" from="200" to={node.x} dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="cy" from="200" to={node.y} dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.7;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
          );
        })}

        {/* Node connectors */}
        {nodeItems.map((node) => {
          const isActivePath = currentActive === node.id;
          const isBlurred = isAnyNodeActive && node.id !== activeNodeId;
          const isLaser = activeNodeId === node.id;

          return (
            <line
              key={`line-${node.id}`}
              x1="200"
              y1="200"
              x2={node.x}
              y2={node.y}
              stroke={isLaser ? node.color : (isActivePath ? node.color : "rgba(156,163,175,0.07)")}
              strokeWidth={isLaser ? "2.5" : (isActivePath ? "1.5" : "0.8")}
              className="transition-all duration-300"
              style={{
                filter: isBlurred ? 'blur(6px)' : (isLaser ? `drop-shadow(0 0 8px ${node.color})` : 'none'),
                opacity: isBlurred ? 0.15 : 1
              }}
            />
          );
        })}

        {/* Central Core Element */}
        <g onClick={() => handleNodeSelect(9)} onMouseEnter={() => handleNodeHover(9)} onMouseLeave={() => setHoveredNode(null)} className="cursor-pointer">
          <circle cx="200" cy="200" r="40" fill="transparent" />
          <circle cx="200" cy="200" r="48" fill="url(#core-glow)" className="pointer-events-none" />
          {[38, 28].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} className="fill-none stroke-[0.8] opacity-25 pointer-events-none" style={{ stroke: activeColor }} />
          ))}
          <circle cx="200" cy="200" r="22" fill="none" stroke={activeColor} strokeWidth="0.8" className="opacity-20 pointer-events-none animate-ping" />
          
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)", transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="16" fill="#121418" stroke={activeColor} strokeWidth="1.2" style={{ fillOpacity: isCenterActive ? 0.9 : 0.4 }} />
            <circle cx="200" cy="200" r="6" fill={activeColor} className={isAnyNodeActive ? "" : "animate-svg-emerald-ambient"} />
          </g>
          <text x="200" y="178" textAnchor="middle" className={`font-mono text-[7px] tracking-wider transition-opacity duration-300 ${isCenterActive ? "opacity-100" : "opacity-0"}`} fill={activeColor}>
            {t('labels.node_9')}
          </text>
        </g>

        {/* Outer Ennea Nodes */}
        {nodeItems.map((node) => {
          const isAct = node.active;
          const isBlurred = isAnyNodeActive && node.id !== activeNodeId;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleNodeSelect(node.id)}
              onMouseEnter={() => handleNodeHover(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-all duration-500"
              style={{
                filter: isBlurred ? 'blur(8px)' : 'none',
                opacity: isBlurred ? 0.2 : 1
              }}
            >
              <circle r="20" fill="transparent" />
              <circle r={isAct ? 14 : 7} fill="none" stroke={node.color} strokeWidth={isAct ? 0.8 : 0.5} className={`${isAct ? "animate-ping opacity-35" : "animate-pulse opacity-15"} pointer-events-none`} />
              <circle r="2.4" fill={isAct ? node.color : "#121418"} stroke={isAct ? node.color : "#9CA3AF"} strokeWidth="1.2" style={{ strokeOpacity: isAct ? 1.0 : 0.4 }} className="transition-all duration-300" />
              <text x={node.tx - node.x} y={node.ty - node.y} textAnchor={node.align} fill={isAct ? "#F5F5F7" : "#9CA3AF"} className="font-mono text-[11px] uppercase tracking-wider transition-colors duration-300" style={{ fillOpacity: isAct ? 1.0 : 0.35 }}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
