"use client";

import { audioManager } from "@/lib/audioManager";

export interface SubItemData {
  id: string;
  nodeId: number;
  category: string;
  title: string;
  subtitle?: string;
  status: string;
  statusColor?: string;
  description: string;
  metrics: { label: string; value: string }[];
  details?: Record<string, string>;
}

interface NodeDetailStageProps {
  data: SubItemData;
  onClose: () => void;
}

export default function NodeDetailStage({ data, onClose }: NodeDetailStageProps) {
  return (
    <div className="w-full max-w-xl bg-iron-surface/90 border border-silver-structure/25 backdrop-blur-[24px] p-6 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.7)] animate-fadeIn font-sans text-left relative z-40 space-y-5">
      {/* Top Header Bar */}
      <div className="flex justify-between items-start border-b border-silver-structure/15 pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sapphire-light">
            [ {data.category} // TELEMETRY_STAGE ]
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mt-0.5">
            {data.title}
          </h2>
          {data.subtitle && (
            <div className="font-mono text-[11px] text-silver-structure/60 mt-0.5">
              {data.subtitle}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-mono text-[10px] font-bold px-2 py-1 border rounded-[3px] uppercase tracking-wider ${
            data.statusColor || "text-emerald-core border-emerald-core/30 bg-emerald-core/10"
          }`}>
            ● {data.status}
          </span>
          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="font-mono text-[12px] text-silver-structure/60 hover:text-white border border-silver-structure/20 hover:border-silver-structure/50 px-2 py-1 rounded transition-colors cursor-pointer"
            title="დახურვა"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-bone-light/90 leading-relaxed font-sans">
        {data.description}
      </p>

      {/* Telemetry Metrics Grid */}
      <div className="space-y-1.5 font-mono text-[11px]">
        <div className="text-silver-structure/50 uppercase tracking-widest text-[9px]">
          [ LIVE_METRICS_FEED ]
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-iron/80 border border-silver-structure/15 p-2.5 rounded flex flex-col justify-between"
            >
              <span className="text-silver-structure/50 text-[9px] uppercase">{m.label}</span>
              <span className="text-white font-bold text-[12px] mt-1 text-emerald-core">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Parameters */}
      {data.details && (
        <div className="bg-iron-surface/40 border border-silver-structure/10 p-3 rounded font-mono text-[11px] space-y-1">
          <div className="text-sapphire-light text-[9px] uppercase tracking-wider mb-1">
            &gt; ENCRYPTION_&_SECURITY_LOGS:
          </div>
          {Object.entries(data.details).map(([k, v]) => (
            <div key={k} className="flex justify-between text-silver-structure/80">
              <span className="uppercase text-silver-structure/50">{k}:</span>
              <span className="text-bone-light">{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-silver-structure/10 font-mono text-[11px]">
        <span className="text-silver-structure/40 text-[9px] uppercase">
          [ AES_256_ACTIVE // NODE_0{data.nodeId} ]
        </span>
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="text-sapphire-light hover:text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          ← Return to Core View
        </button>
      </div>
    </div>
  );
}
