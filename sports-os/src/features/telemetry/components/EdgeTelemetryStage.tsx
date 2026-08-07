"use client";

import { useEdgeTelemetry } from "../hooks/useEdgeTelemetry";
import { audioManager } from "@/lib/audioManager";

interface EdgeTelemetryStageProps {
  onBack?: () => void;
}

export default function EdgeTelemetryStage({ onBack }: EdgeTelemetryStageProps) {
  const { streams, streamState, setStreamState, averageLatency } = useEdgeTelemetry();

  return (
    <div className="w-full bg-[#121418]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-5 rounded-md shadow-xl text-left space-y-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#9CA3AF]/18 pb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00E676]">
            [ DOMAIN // REALTIME_EDGE_BIOMETRICS ]
          </span>
          <h2 className="text-base font-semibold text-[#F5F5F3] uppercase tracking-tight">
            Real-Time Sub-50ms IoT Sensor Stream
          </h2>
        </div>
        {onBack && (
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="font-mono text-[10px] text-[#9CA3AF] hover:text-[#00E676] border border-[#9CA3AF]/20 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            [ &lt;- RETURN ]
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex justify-between items-center font-mono text-[10px] bg-[#1A1D23] p-2.5 rounded border border-[#9CA3AF]/18">
        <div className="flex items-center gap-2">
          <span className="text-[#6B7280]">AVG LATENCY:</span>
          <span className="text-[#00E676] font-medium">{averageLatency} ms</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              audioManager.playClick();
              setStreamState(streamState === "streaming" ? "paused" : "streaming");
            }}
            className="px-2.5 py-0.5 border border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676] rounded uppercase hover:bg-[#00E676]/20 transition-colors cursor-pointer"
          >
            {streamState === "streaming" ? "[ PAUSE STREAM ]" : "[ RESUME STREAM ]"}
          </button>
        </div>
      </div>

      {/* Sensor Stream Cards */}
      <div className="space-y-2">
        <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-widest">
          [ ACTIVE_EDGE_CHANNELS ]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[10px]">
          {streams.map((st) => (
            <div key={st.sensorId} className="bg-[#1A1D23] p-3 rounded border border-[#9CA3AF]/18 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[#00E676] font-medium">{st.sensorId}</span>
                <span className="text-[#6B7280] text-[8.5px] uppercase">{st.telemetryType}</span>
              </div>
              <div className="text-[#9CA3AF] text-[9px]">{st.nodeCode}</div>
              <div className="bg-[#121418] p-1.5 rounded text-[8.5px] text-[#F5F5F3] font-mono truncate">
                {st.payload}
              </div>
              <div className="flex justify-between text-[8.5px] text-[#6B7280]">
                <span>RATE: {st.packetRateHz} Hz</span>
                <span>LATENCY: {st.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
