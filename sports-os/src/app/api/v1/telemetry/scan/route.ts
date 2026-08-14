import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAntiPassback } from '@/lib/anti-passback';
import { decryptPersonalId } from '@/lib/crypto';
import { broadcastTelemetry } from '@/lib/telemetry-sse';
import { getMqttClient } from '@/lib/mqtt';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Lazily initialize MQTT listener connection if not already running
    getMqttClient();

    const body = await request.json();
    const { qrToken, direction, tenantId } = body;

    if (!qrToken || !direction || !tenantId) {
      return NextResponse.json({ status: 'error', message: 'Missing parameters' }, { status: 400 });
    }

    let decryptedUserId = qrToken;

    if (qrToken.startsWith('{')) {
      try {
        const payload = JSON.parse(qrToken);
        if (payload.encrypted && payload.iv && payload.authTag) {
          decryptedUserId = decryptPersonalId(payload.encrypted, payload.iv, payload.authTag);
        }
      } catch (err) {
        // Fallback to raw token
      }
    }

    // Verify user exists in the tenant system
    const user = await prisma.user.findFirst({
      where: {
        id: decryptedUserId,
        tenantId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid or unknown user credential' },
        { status: 403 }
      );
    }

    // Validate Anti-passback constraint
    const apCheck = await checkAntiPassback(decryptedUserId, tenantId, direction);
    if (!apCheck.allowed) {
      broadcastTelemetry({
        type: 'scan',
        userId: decryptedUserId,
        tenantId,
        direction,
        status: 'BLOCKED_ANTI_PASSBACK',
        timestamp: new Date().toISOString(),
        message: apCheck.reason,
      });

      return NextResponse.json({ status: 'error', message: apCheck.reason }, { status: 403 });
    }

    // Save scan transaction log (Order №01-15/ნ compliance)
    const log = await prisma.turnstileLog.create({
      data: {
        userId: decryptedUserId,
        tenantId,
        direction,
      },
    });

    // Broadcast live unlock telemetry signal
    broadcastTelemetry({
      type: 'scan',
      userId: decryptedUserId,
      tenantId,
      direction,
      status: 'UNLOCKED',
      timestamp: log.timestamp.toISOString(),
      message: `Access granted: User ${user.name} checked ${direction.toLowerCase()}`,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Access granted, turnstile relay triggered',
      data: {
        logId: log.id,
        userId: decryptedUserId,
        userName: user.name,
        direction,
        timestamp: log.timestamp,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
