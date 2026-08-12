import { generateTelemetryPacket } from '@/server/services/telemetry.service';

export const dynamic = 'force-dynamic';

/**
 * Server-Sent Events (SSE) Real-Time Telemetry Stream Route
 * Endpoint: GET /api/v1/telemetry/stream
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const athleteId = searchParams.get('athleteId') || 'ath-8801-fcd';
  const tenantId = searchParams.get('tenantId') || 't-fc-dynamo-01';

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection packet
      const initialPacket = generateTelemetryPacket(athleteId, tenantId);
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialPacket)}\n\n`));

      const intervalId = setInterval(() => {
        try {
          const packet = generateTelemetryPacket(athleteId, tenantId);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(packet)}\n\n`));
        } catch (err) {
          clearInterval(intervalId);
          controller.close();
        }
      }, 1200);

      // Cleanup when stream closes
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        try {
          controller.close();
        } catch (_) {
          // Stream already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
