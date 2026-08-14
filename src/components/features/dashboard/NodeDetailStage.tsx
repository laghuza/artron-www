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
    <div className="w-full max-w-xl bg-[#1A1D23]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-6 rounded-md shadow-[0_0_8px_rgba(0,255,135,0.12)] animate-fadeIn font-sans text-left relative z-40 space-y-5">
      {/* Top Header Bar */}
      <div className="flex justify-between items-start border-b border-[#9CA3AF]/18 pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00ff87]">
            [ {data.category} // TELEMETRY_STAGE ]
          </div>
          <h2 className="text-lg font-medium text-[#F5F5F3] uppercase tracking-tight mt-0.5">
            {data.title}
          </h2>
          {data.subtitle && (
            <div className="font-mono text-[10px] text-[#9CA3AF] mt-0.5">
              {data.subtitle}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium px-2 py-0.5 border border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87] rounded-sm uppercase tracking-wider">
            ● {data.status}
          </span>
          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="font-mono text-[11px] text-[#9CA3AF] hover:text-[#F5F5F3] border border-[#9CA3AF]/18 hover:border-[#00ff87]/40 px-2 py-0.5 rounded-sm transition-colors cursor-pointer"
            title="Close"
          >
            [ X ]
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-[12.5px] text-[#9CA3AF] leading-relaxed font-sans">
        {data.description}
      </p>

      {/* Telemetry Metrics Grid */}
      <div className="space-y-1.5 font-mono text-[10px]">
        <div className="text-[#6B7280] uppercase tracking-widest text-[9px]">
          [ LIVE_METRICS_FEED ]
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#121418] border border-[#9CA3AF]/18 p-2.5 rounded-sm flex flex-col justify-between"
            >
              <span className="text-[#6B7280] text-[9px] uppercase">{m.label}</span>
              <span className="text-[#00ff87] font-medium text-[11px] mt-1">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Parameters */}
      {data.details && (
        <div className="bg-[#121418] border border-[#9CA3AF]/18 p-3 rounded-sm font-mono text-[10px] space-y-1">
          <div className="text-[#00ff87] text-[9px] uppercase tracking-wider mb-1">
            &gt; ENCRYPTION_&_SECURITY_LOGS:
          </div>
          {Object.entries(data.details).map(([k, v]) => (
            <div key={k} className="flex justify-between text-[#9CA3AF]">
              <span className="uppercase text-[#6B7280]">{k}:</span>
              <span className="text-[#F5F5F3]">{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-[#9CA3AF]/18 font-mono text-[10px]">
        <span className="text-[#6B7280] text-[9px] uppercase">
          [ AES_256_ACTIVE // NODE_0{data.nodeId} ]
        </span>
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="text-[#00ff87] hover:text-[#F5F5F3] font-medium transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
        >
          &lt;- Return to Core View
        </button>
      </div>
    </div>
  );
}
