import { prisma } from './prisma';

/**
 * Validates the anti-passback rule for a user's turnstile entry/exit.
 * Blocks re-entry (IN) if the last recorded event was also 'IN' and occurred within
 * the validation window (default 10 minutes).
 * Returns { allowed: boolean; reason?: string }
 */
export async function checkAntiPassback(
  userId: string,
  tenantId: string,
  direction: 'IN' | 'OUT',
  windowMinutes: number = 10
): Promise<{ allowed: boolean; reason?: string }> {
  if (direction !== 'IN') {
    return { allowed: true };
  }

  const lastLog = await prisma.turnstileLog.findFirst({
    where: {
      userId,
      tenantId,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });

  if (lastLog && lastLog.direction === 'IN') {
    const timeDiffMs = Date.now() - new Date(lastLog.timestamp).getTime();
    const windowMs = windowMinutes * 60 * 1000;

    if (timeDiffMs < windowMs) {
      const remainingSeconds = Math.ceil((windowMs - timeDiffMs) / 1000);
      return {
        allowed: false,
        reason: `Anti-passback restriction active. Re-entry blocked for another ${remainingSeconds} seconds.`,
      };
    }
  }

  return { allowed: true };
}
