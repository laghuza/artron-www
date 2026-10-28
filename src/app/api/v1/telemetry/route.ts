import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const telemetrySchema = z.object({
  deviceId: z.string().min(1).max(64),
  event: z.enum(['SCAN_IN', 'SCAN_OUT', 'HEARTBEAT', 'STATUS']),
  timestamp: z.string().max(64).optional(),
});

const telemetryRateMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;

function isTelemetryRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (telemetryRateMap.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  telemetryRateMap.set(ip, recent);
  return false;
}

export async function GET() {
  return NextResponse.json({
    status: 'success',
    node: 'Node 07 - IoT Telemetry',
    message: 'Telemetry route active and operational',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    if (isTelemetryRateLimited(ip)) {
      return NextResponse.json(
        { status: 'error', message: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const parsed = telemetrySchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid telemetry payload schema' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'received',
        node: 'Node 07 - IoT Telemetry',
        deviceId: parsed.data.deviceId,
        event: parsed.data.event,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid telemetry JSON payload',
      },
      { status: 400 }
    );
  }
}
