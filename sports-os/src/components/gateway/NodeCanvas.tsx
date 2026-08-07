"use client";

import React, { useState } from 'react';
import { ViewState, ArtronNode } from '@/types/gateway';
import { GhostTrigger } from './GhostTrigger';

interface NodeCanvasProps {
  nodes: ArtronNode[]; activeNodeId: number | null; viewState: ViewState; onSelectNode: (nodeId: number) => void;
}

const COLORS: Record<number, string> = { 1: "#0F52BA", 2: "#00E676", 3: "#D97736", 4: "#00E676", 5: "#D4AF37", 6: "#D4AF37", 7: "#9CA3AF", 8: "#9CA3AF", 9: "#00E676" };
const LABELS = ["01 // FEDERATIONS", "02 // CLUBS & ACADEMIES", "03 // PROFESSIONALS", "04 // ATHLETE MOBILE OS", "05 // COINS & BADGES", "06 // MARKETPLACE", "07 // TELEMETRY", "08 // SECURITY & SLA"];
const COORDS = [
  { x: 200, y: 50,  align: "middle" as const, tx: 200, ty: 30 },
  { x: 350, y: 50,  align: "start" as const,  tx: 364, ty: 45 }, { x: 350, y: 200, align: "start" as const,  tx: 364, ty: 203 },
  { x: 350, y: 350, align: "start" as const,  tx: 364, ty: 358 }, { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 372 },
  { x: 50,  y: 350, align: "end" as const,    tx: 36,  ty: 358 }, { x: 50,  y: 200, align: "end" as const,    tx: 36,  ty: 203 },
  { x: 50,  y: 50,  align: "end" as const,    tx: 36,  ty: 45 }
];

export const NodeCanvas: React.FC<NodeCanvasProps> = ({ nodes: _n, activeNodeId, viewState: _v, onSelectNode }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const activeNode = activeNodeId || 0;
  const currentActive = hoveredNode !== null ? hoveredNode : activeNode;
  const isCenterActive = currentActive === 9;

  const nodeItems = COORDS.map((coord, i) => ({
    id: i + 1, ...coord, label: LABELS[i], active: currentActive === i + 1, color: COLORS[i + 1] || "#9CA3AF"
  }));

  return (
    <div className="w-full lg:w-[60%] h-full flex items-center justify-center relative select-none p-6 overflow-hidden">
      {/* Ambient Radial Spotlight Glow */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-15 transition-all duration-1000 pointer-events-none z-0"
        style={{ backgroundColor: COLORS[currentActive] || "#00E676" }}
      />

      {/* Top-Right Rotating Logo Trigger with Glassmorphic Dropdown */}
      <div className="absolute top-4 right-6 z-40">
        <GhostTrigger onAccessClick={() => onSelectNode(9)} />
      </div>

      <svg viewBox="0 0 400 400" className="w-full max-w-[460px] aspect-square cursor-pointer overflow-visible z-10" onMouseLeave={() => setHoveredNode(null)}>
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.45" /><stop offset="100%" stopColor="#00E676" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 3x3 Bounding Matrix */}
        <g className="stroke-[rgba(156,163,175,0.04)] stroke-[0.8] fill-none pointer-events-none">
          <line x1="50" y1="50" x2="350" y2="50" /><line x1="50" y1="200" x2="350" y2="200" /><line x1="50" y1="350" x2="350" y2="350" />
          <line x1="50" y1="50" x2="50" y2="350" /><line x1="200" y1="50" x2="200" y2="350" /><line x1="350" y1="50" x2="350" y2="350" />
        </g>

        {/* Animated Data Packets Flow */}
        {(currentActive !== 0) && nodeItems.map((node) => (
          <circle key={`packet-${node.id}`} r="2.5" fill="#00E676" className="pointer-events-none">
            <animate attributeName="cx" from="200" to={node.x} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="200" to={node.y} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.7;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        ))}

        {/* Node connectors */}
        {nodeItems.map((node) => {
          const isActivePath = currentActive === node.id;
          return (
            <line key={`line-${node.id}`} x1="200" y1="200" x2={node.x} y2={node.y} stroke={isActivePath ? node.color : "rgba(156,163,175,0.07)"} strokeWidth={isActivePath ? "1.5" : "0.8"} className="transition-all duration-300" />
          );
        })}

        {/* Central Core Element */}
        <g onClick={() => onSelectNode(9)} onMouseEnter={() => setHoveredNode(9)} onMouseLeave={() => setHoveredNode(null)} className="cursor-pointer">
          <circle cx="200" cy="200" r="40" fill="transparent" />
          <circle cx="200" cy="200" r="48" fill="url(#core-glow)" className="pointer-events-none" />
          {[38, 28].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} className={`fill-none stroke-[#00E676] stroke-[0.8] opacity-20 pointer-events-none ${activeNode === 9 ? "animate-pulse" : ""}`} />
          ))}
          <circle cx="200" cy="200" r="22" fill="none" stroke="#00E676" strokeWidth="0.8" className="opacity-15 pointer-events-none animate-ping" />
          
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)", transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="16" fill="#121418" stroke="#00E676" strokeWidth="1.2" style={{ fillOpacity: isCenterActive ? 0.9 : 0.4 }} />
            <circle cx="200" cy="200" r="6" fill="#00E676" />
          </g>
          <text x="200" y="178" textAnchor="middle" className={`font-mono text-[7px] tracking-wider fill-[#00E676] transition-opacity duration-300 ${isCenterActive ? "opacity-100" : "opacity-0"}`}>
            09 // REQUEST ACCESS
          </text>
        </g>

        {/* Outer Ennea Nodes */}
        {nodeItems.map((node) => {
          const isAct = node.active;
          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`} onClick={() => onSelectNode(node.id)} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} className="cursor-pointer">
              <circle r="20" fill="transparent" />
              <circle r={isAct ? 14 : 7} fill="none" stroke={node.color} strokeWidth={isAct ? 0.8 : 0.5} className={`${isAct ? "animate-ping opacity-25" : "animate-pulse opacity-15"} pointer-events-none`} />
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
