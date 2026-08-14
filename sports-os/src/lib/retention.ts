import { prisma } from "@/lib/prisma";

/**
 * Schedules a standard account deletion request.
 * - Standard deletion: scheduled for 15 days from the request date.
 * - If the user has payment history/subscriptions, we flag that a tax archive is required (3-year retention).
 */
export async function scheduleAccountDeletion(userId: string) {
  // Check if the user has any subscriptions/payments
  const subscriptionCount = await prisma.subscription.count({
    where: { userId },
  });

  const taxArchiveRequired = subscriptionCount > 0;
  const purgeDays = 15; // Standard GDPR/App Store account purge timeframe

  const scheduledPurgeAt = new Date();
  scheduledPurgeAt.setDate(scheduledPurgeAt.getDate() + purgeDays);

  return prisma.accountDeletionRequest.create({
    data: {
      userId,
      scheduledPurgeAt,
      taxArchiveRequired,
      status: "PENDING",
    },
  });
}

/**
 * Processes all pending deletion requests that have reached their execution date.
 * - If taxArchiveRequired is true: we scrub/anonymize PII (User details, personalId) but preserve financial subscription records for auditing.
 * - If taxArchiveRequired is false: we completely cascade-delete the user record.
 */
export async function processPendingPurges(): Promise<number> {
  const now = new Date();

  // Find all pending requests that are due
  const pendingRequests = await prisma.accountDeletionRequest.findMany({
    where: {
      status: "PENDING",
      scheduledPurgeAt: {
        lte: now,
      },
    },
    include: {
      user: true,
    },
  });

  let processedCount = 0;

  for (const request of pendingRequests) {
    if (request.taxArchiveRequired) {
      // 1. Scrub user PII (names, personal IDs, emails) but keep the User record ID
      // to maintain foreign key integrity for Subscriptions (which must stay for 3 years)
      await prisma.user.update({
        where: { id: request.userId },
        data: {
          name: "ANONYMIZED_USER",
          email: `anonymized_${request.userId}@artron.ge`,
          passwordHash: "DELETED",
          personalIdEncrypted: null,
          personalIdIv: null,
          personalIdAuthTag: null,
        },
      });

      // 2. Delete all non-financial records like turnstile entry logs and athletes biometrics data
      await prisma.turnstileLog.deleteMany({
        where: { userId: request.userId },
      });

      // Update the request status
      await prisma.accountDeletionRequest.update({
        where: { id: request.id },
        data: { status: "COMPLETED" },
      });
    } else {
      // Complete hard-delete cascade
      await prisma.user.delete({
        where: { id: request.userId },
      });
    }
    processedCount++;
  }

  return processedCount;
}

/**
 * Offboards a B2B Tenant under GDPR (right to be forgotten) and Georgian Tax Code compliance:
 * - 14-day statutory B2C return/refund check: Any subscription belonging to the tenant's users
 *   that was purchased within the last 14 days and has not been refunded is automatically refunded.
 * - 3-year financial transaction retention: We must preserve subscription history. Hence, we anonymize user records
 *   having subscriptions (Scrubbing name, email, passwordHash, and personalId).
 * - Immediate physical access & biometric purge: Clear TurnstileLogs, Athlete biometrics, and any Athlete records.
 * - Standard deletion: If a user has no subscriptions, we completely delete their account immediately.
 * - Cascading deletion of other tenant records: Clubs, Federations, AuditLogs, etc.
 */
export async function offboardTenant(tenantId: string): Promise<{
  refundedCount: number;
  anonymizedCount: number;
  deletedUsersCount: number;
}> {
  const now = new Date();

  // Find all users belonging to this tenant
  const tenantUsers = await prisma.user.findMany({
    where: { tenantId },
    include: {
      subscriptions: true,
    },
  });

  let refundedCount = 0;
  let anonymizedCount = 0;
  let deletedUsersCount = 0;

  for (const user of tenantUsers) {
    const hasSubscriptions = user.subscriptions.length > 0;

    if (hasSubscriptions) {
      // 1. Process 14-day statutory refunds
      for (const sub of user.subscriptions) {
        if (sub.refundEligibleUntil > now && sub.status !== "REFUNDED" && !sub.refundedAt) {
          await prisma.subscription.update({
            where: { id: sub.id },
            data: {
              status: "REFUNDED",
              refundedAt: now,
            },
          });
          refundedCount++;
        }
      }

      // 2. Anonymize user PII (GDPR / Right to be Forgotten)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: "ANONYMIZED_USER",
          email: `anonymized_${user.id}@artron.ge`,
          passwordHash: "DELETED",
          personalIdEncrypted: null,
          personalIdIv: null,
          personalIdAuthTag: null,
        },
      });
      anonymizedCount++;
    } else {
      // 3. Hard-delete user since no billing history exists
      await prisma.user.delete({
        where: { id: user.id },
      });
      deletedUsersCount++;
    }
  }

  // 4. Purge turnstile logs and athletes (biometrics) for the entire tenant
  await prisma.turnstileLog.deleteMany({
    where: { tenantId },
  });

  await prisma.athlete.deleteMany({
    where: { tenantId },
  });

  // 5. Purge operational structures like clubs, federations, audit logs
  await prisma.auditLog.deleteMany({
    where: { tenantId },
  });

  await prisma.club.deleteMany({
    where: { tenantId },
  });

  await prisma.federation.deleteMany({
    where: { tenantId },
  });

  // Note: We retain the Tenant shell record itself because of foreign key references from Subscriptions (3-year audit log retention)

  return {
    refundedCount,
    anonymizedCount,
    deletedUsersCount,
  };
}
