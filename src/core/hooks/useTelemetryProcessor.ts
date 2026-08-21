import { useState, useEffect, useRef } from 'react';
import { TelemetryPacketPayload } from '@/core/schemas/sports.schemas';

interface UseTelemetryProcessorOptions {
  activeNodeId: number | null;
  sampleRateMs?: number;
}

export function useTelemetryProcessor({
  activeNodeId,
  sampleRateMs = 1000,
}: UseTelemetryProcessorOptions) {
  const [telemetryState, setTelemetryState] = useState<TelemetryPacketPayload>({
    nodeId: activeNodeId || 1,
    timestamp: 0,
    heartRate: 72,
    speedKmH: 0,
    enneaCoreNode: 'CORE_INIT',
    status: 'NOMINAL',
  });

  const animFrameId = useRef<number | null>(null);
  const lastSampleTime = useRef<number>(0);

  useEffect(() => {
    const updateLoop = () => {
      const now = Date.now();
      if (now - lastSampleTime.current >= sampleRateMs) {
        lastSampleTime.current = now;

        const simulatedHeartRate = Math.floor(65 + Math.random() * 30);
        const status: TelemetryPacketPayload['status'] =
          simulatedHeartRate > 90 ? 'ELEVATED' : 'NOMINAL';

        setTelemetryState({
          nodeId: activeNodeId || 1,
          timestamp: now,
          heartRate: simulatedHeartRate,
          speedKmH: Number((12 + Math.random() * 15).toFixed(1)),
          enneaCoreNode: `NODE_${activeNodeId || 1}`,
          status,
        });
      }

      animFrameId.current = requestAnimationFrame(updateLoop);
    };

    animFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [activeNodeId, sampleRateMs]);

  return telemetryState;
}
