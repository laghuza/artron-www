import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Node 07 - IoT Dynamic Telemetry API Endpoint
 * Provides template routes for IoT telemetry data streaming (POST/GET).
 */

export async function GET() {
  return NextResponse.json({
    status: 'success',
    node: 'Node 07 - IoT Telemetry',
    message: 'Telemetry route template active and operational',
    data: [],
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    return NextResponse.json(
      {
        status: 'received',
        node: 'Node 07 - IoT Telemetry',
        receivedData: payload,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid telemetry JSON payload',
        error: error instanceof Error ? error.message : 'Unknown payload error',
      },
      { status: 400 }
    );
  }
}
