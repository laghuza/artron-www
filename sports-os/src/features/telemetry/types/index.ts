export interface SensorDataStream {
  sensorId: string;
  nodeCode: string;
  telemetryType: "BIOMETRICS" | "FACILITY_ACCESS" | "AI_VISION";
  packetRateHz: number;
  latencyMs: number;
  payload: string;
}

export type TelemetryStreamState = "streaming" | "paused" | "calibrating";
