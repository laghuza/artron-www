"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

interface InteractiveEnneaCoreProps {
  activeNode: number;
  onNodeSelect: (index: number) => void;
  onNodeHover: (index: number | null) => void;
  isScaledUp?: boolean;
  transitionStep?: "idle" | "zooming" | "sweeping" | "console";
  isFlashActive?: boolean;
  gateHover?: "gate_a" | "gate_b" | null;
}

const COLORS: Record<number, string> = { 1: "#0F52BA", 2: "#00E676", 3: "#D97736", 4: "#00E676", 5: "#D4AF37", 6: "#D4AF37", 9: "#00E676", 7: "#9CA3AF", 8: "#9CA3AF" };
const COORDS = [
  { x: 200, y: 50, align: "middle" as const, tx: 200, ty: 30 }, { x: 350, y: 50, align: "start" as const, tx: 364, ty: 45 },
  { x: 350, y: 200, align: "start" as const, tx: 364, ty: 203 }, { x: 350, y: 350, align: "start" as const, tx: 364, ty: 358 },
  { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 372 }, { x: 50, y: 350, align: "end" as const, tx: 36, ty: 358 },
  { x: 50, y: 200, align: "end" as const, tx: 36, ty: 203 }, { x: 50, y: 50, align: "end" as const, tx: 36, ty: 45 }
];

export default function InteractiveEnneaCore({
  activeNode, onNodeSelect, onNodeHover, isScaledUp = false, transitionStep = "idle", isFlashActive = false, gateHover = null
}: InteractiveEnneaCoreProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const handleLeave = () => { setHoveredNode(null); onNodeHover(null); };

  const effectiveActiveNode = orchestrator?.activeNodeId || activeNode;
  const activeSubModuleId = orchestrator?.activeSubModuleId;

  const handleSelectNode = (id: number) => {
    if (orchestrator?.selectNode) orchestrator.selectNode(id);
    onNodeSelect(id);
  };

  const labels = [t("labels.node_1"), t("labels.node_2"), t("labels.node_3"), t("labels.node_4"), t("labels.node_5"), t("labels.node_6"), t("labels.node_7"), t("labels.node_8")];


  const nodes = COORDS.map((coord, i) => ({
    id: i + 1, ...coord, label: labels[i], active: effectiveActiveNode === i + 1, color: COLORS[i + 1] || "#9CA3AF"
  }));
  
  const isCenterActive = effectiveActiveNode === 9 || hoveredNode === 9;
  const showOuter = transitionStep !== "sweeping" && transitionStep !== "console";

  return (
    <div className={`w-full aspect-square max-w-[92vw] sm:max-w-[80vw] lg:max-w-full mx-auto flex items-center justify-center relative transition-all duration-1000 ${
      transitionStep === "console" ? "h-[160px] md:h-[185px]" : "h-full"
    }`}>
      <svg
        viewBox="0 0 400 400"
        className={`w-full max-w-[450px] aspect-square select-none cursor-pointer overflow-visible transition-all duration-[1000ms] ${
          isScaledUp ? (transitionStep === "console" ? "scale-[0.82] translate-y-[-5px]" : "scale-[1.25] translate-y-[-24px]") : "scale-100"
        }`}
        onMouseLeave={handleLeave}
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.45" /><stop offset="100%" stopColor="#00E676" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Bounding 3x3 Grid Matrix */}
        <g className={`transition-opacity duration-1000 stroke-[rgba(156,163,175,0.04)] stroke-[0.8] fill-none pointer-events-none ${showOuter ? "opacity-100" : "opacity-0"}`}>
          <line x1="50" y1="50" x2="350" y2="50" /><line x1="50" y1="200" x2="350" y2="200" /><line x1="50" y1="350" x2="350" y2="350" />
          <line x1="50" y1="50" x2="50" y2="350" /><line x1="200" y1="50" x2="200" y2="350" /><line x1="350" y1="50" x2="350" y2="350" />
        </g>

        {/* Data Packets Flow Animation */}
        {showOuter && (gateHover === "gate_b" || Boolean(activeSubModuleId)) && nodes.map((node) => (
          <circle key={`packet-${node.id}`} r="3" fill="#00E676" className="pointer-events-none">
            <animate attributeName="cx" from="200" to={node.x} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="200" to={node.y} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.7;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        ))}

        {/* Node connectors */}
        {nodes.map((node) => {
          const isActivePath = effectiveActiveNode === node.id || hoveredNode === node.id;
          return (
            <line
              key={`line-${node.id}`} x1="200" y1="200" x2={node.x} y2={node.y}
              stroke={isActivePath ? node.color : "rgba(156,163,175,0.07)"} strokeWidth={isActivePath ? "1.5" : "0.8"}
              className={`transition-opacity duration-1000 ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
          );
        })}

        {/* Central Core Element */}
        <g
          onClick={() => { handleSelectNode(9); onNodeHover(9); }}
          onMouseEnter={() => { setHoveredNode(9); onNodeHover(9); }}
          onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
          className={!showOuter ? "animate-core-grandiose" : gateHover === "gate_a" ? "animate-core-gate-a-hover" : "transition-transform duration-300"}
          style={showOuter && gateHover !== "gate_a" ? { transform: `translate(200px, 200px)` } : {}}
        >
          <circle r="40" fill="transparent" className="cursor-pointer" />
          <circle r="48" fill="url(#core-glow)" className="pointer-events-none" />
          {isFlashActive && <circle r="48" fill="#00E676" className="pointer-events-none animate-core-flash" />}
          
          {[38, 28].map((r) => (
            <circle key={r} r={r} className={`fill-none stroke-[#00E676] stroke-[0.8] opacity-20 pointer-events-none ${effectiveActiveNode === 9 ? "animate-pulse-fast" : "animate-pulse"}`} />
          ))}
          <circle r="22" fill="none" stroke="#00E676" strokeWidth="0.8" className={`opacity-15 pointer-events-none ${effectiveActiveNode === 9 ? "animate-ping-fast" : "animate-ping"}`} />
          
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)" }}>
            <circle r="16" className="fill-iron-surface stroke-[#00E676] stroke-[1.2] transition-colors duration-300" style={{ fillOpacity: isCenterActive ? 0.9 : 0.4 }} />
            <circle r="6" fill="#00E676" />
          </g>
          <text y="-22" textAnchor="middle" className={`font-mono text-[6px] tracking-wider fill-[#00E676] transition-opacity duration-300 cursor-pointer ${isCenterActive && showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {t("labels.node_9")}
          </text>
        </g>

        {/* Outer Ennea Nodes */}
        {nodes.map((node) => {
          const isAct = node.active || hoveredNode === node.id;
          return (
            <g
              key={node.id} transform={`translate(${node.x}, ${node.y})`}
              onClick={() => { handleSelectNode(node.id); onNodeHover(node.id); }}
              onMouseEnter={() => { setHoveredNode(node.id); onNodeHover(node.id); }}
              onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
              className={`transition-opacity duration-1000 ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <circle r="20" fill="transparent" className="cursor-pointer" />
              <circle r={isAct ? 14 : 7} fill="none" stroke={node.color} strokeWidth={isAct ? 0.8 : 0.5} className={`${isAct ? "animate-ping opacity-25" : "animate-pulse opacity-15"} pointer-events-none`} />
              <g className="transition-transform duration-300" style={{ transform: isAct ? "scale(1.25)" : "scale(1)" }}>
                <circle r="2.4" fill={isAct ? node.color : "#121418"} stroke={isAct ? node.color : "#9CA3AF"} strokeWidth="1.2" style={{ strokeOpacity: isAct ? 1.0 : 0.4 }} className="transition-all duration-300" />
              </g>
              <text x={node.tx - node.x} y={node.ty - node.y} textAnchor={node.align} fill={isAct ? "#F5F5F7" : "#9CA3AF"} className="font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 cursor-pointer" style={{ fillOpacity: isAct ? 1.0 : 0.35 }}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
