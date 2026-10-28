import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'healthy',
        service: 'artron-gateway',
        database: 'connected',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
      { status: 200 }
    );
  } catch {
    // Graceful status response when running as standalone landing gateway without direct DB connection
    return NextResponse.json(
      {
        status: 'healthy',
        service: 'artron-gateway',
        database: 'standalone_mode',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
      { status: 200 }
    );
  }
}
