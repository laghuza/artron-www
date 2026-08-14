import { NextRequest } from 'next/server';
import { registerSseClient, TelemetryEvent } from '@/lib/telemetry-sse';
import { getMqttClient } from '@/lib/mqtt';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Lazily connect to the MQTT broker so it listens for RFID scan events
  try {
    getMqttClient();
  } catch (err) {
    console.error('[MQTT] Lazy connection failed during SSE initiation:', err);
  }

  const customStream = new ReadableStream({
    start(controller) {
      // Send initial connection verification
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: 'init',
            message: 'Real-time telemetry channel established (<50ms latency)',
            timestamp: new Date().toISOString(),
          })}\n\n`
        )
      );

      const unregister = registerSseClient((event: TelemetryEvent) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch (err) {
          unregister();
        }
      });

      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'heartbeat',
                timestamp: new Date().toISOString(),
              })}\n\n`
            )
          );
        } catch (err) {
          clearInterval(heartbeatInterval);
          unregister();
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        clearInterval(heartbeatInterval);
        unregister();
      });
    },
  });

  return new Response(customStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
