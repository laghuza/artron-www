import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'degraded',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Database connectivity error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
