import { db } from '../db/client'

const PURGE_GRACE_PERIOD_DAYS = 14

export interface PurgeResult {
  purgedAthletesCount: number
  purgedMedicalRecordsCount: number
  executedAt: Date
}

/**
 * Scans soft-deleted athlete profiles older than 14 days and permanently erases them
 * to ensure strict GDPR right-to-be-forgotten compliance.
 */
export async function executeGdprAutomatedPurge(tenantId?: string): Promise<PurgeResult> {
  const expirationThreshold = new Date()
  expirationThreshold.setDate(expirationThreshold.getDate() - PURGE_GRACE_PERIOD_DAYS)

  // Find expired soft-deleted athlete records
  const expiredAthletes = await db.athleteProfile.findMany({
    where: {
      isSoftDeleted: true,
      deletedAt: {
        lte: expirationThreshold,
      },
      ...(tenantId ? { tenantId } : {}),
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  const expiredIds = expiredAthletes.map((a) => a.id)

  if (expiredIds.length === 0) {
    return {
      purgedAthletesCount: 0,
      purgedMedicalRecordsCount: 0,
      executedAt: new Date(),
    }
  }

  // Delete associated medical records permanently
  const medicalDeleteResult = await db.medicalRecord.deleteMany({
    where: {
      athleteId: {
        in: expiredIds,
      },
    },
  })

  // Hard delete athlete profiles
  const athleteDeleteResult = await db.athleteProfile.deleteMany({
    where: {
      id: {
        in: expiredIds,
      },
    },
  })

  // Log compliance purge in Audit Log
  await db.auditLog.createMany({
    data: expiredAthletes.map((athlete) => ({
      tenantId: athlete.tenantId,
      action: `GDPR_AUTOMATED_DATA_PURGE: Permanent deletion of athlete ID ${athlete.id} after 14-day grace period.`,
    })),
  })

  return {
    purgedAthletesCount: athleteDeleteResult.count,
    purgedMedicalRecordsCount: medicalDeleteResult.count,
    executedAt: new Date(),
  }
}
