"use client";

import { useState, useEffect } from "react";
import { SensorDataStream, TelemetryStreamState } from "../types";

const INITIAL_STREAMS: SensorDataStream[] = [
  { sensorId: "SENS_BIO_001", nodeCode: "NODE_03_ATHLETES", telemetryType: "BIOMETRICS", packetRateHz: 60, latencyMs: 14, payload: "HEART_RATE_154_BPM_VO2_62.4" },
  { sensorId: "SENS_IOT_004", nodeCode: "NODE_04_TURNSTILE", telemetryType: "FACILITY_ACCESS", packetRateHz: 120, latencyMs: 8, payload: "RFID_CARD_SWIPE_ACCESS_GRANTED" },
  { sensorId: "SENS_AI_009", nodeCode: "NODE_06_RAG_HUB", telemetryType: "AI_VISION", packetRateHz: 30, latencyMs: 22, payload: "BIOMECHANICAL_GAIT_ANALYSIS_OK" },
];

export function useEdgeTelemetry() {
  const [streams] = useState<SensorDataStream[]>(INITIAL_STREAMS);
  const [streamState, setStreamState] = useState<TelemetryStreamState>("streaming");
  const [averageLatency, setAverageLatency] = useState<number>(14.6);

  useEffect(() => {
    if (streamState !== "streaming") return;
    const interval = setInterval(() => {
      setAverageLatency(+(12 + Math.random() * 5).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, [streamState]);

  return {
    streams,
    streamState,
    setStreamState,
    averageLatency,
  };
}
