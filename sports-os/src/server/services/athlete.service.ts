import { db } from '../db/client'
import { encryptPii, decryptPii } from '../security/encryption'
import { ConsentStatus } from '@prisma/client'

export interface CreateAthleteInput {
  tenantId: string
  groupId?: string
  parentUserId?: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender?: string
  nationalIdOrSsn?: string
  emergencyContact?: string
  isMinor?: boolean
  guardianEmail?: string
}

export class AthleteService {
  /**
   * Registers a new Athlete profile with encrypted PII and optional COPPA consent request
   */
  static async registerAthlete(input: CreateAthleteInput) {
    const encryptedNationalId = input.nationalIdOrSsn ? encryptPii(input.nationalIdOrSsn) : undefined
    const encryptedEmergency = input.emergencyContact ? encryptPii(input.emergencyContact) : undefined

    const athlete = await db.athleteProfile.create({
      data: {
        tenantId: input.tenantId,
        groupId: input.groupId,
        parentUserId: input.parentUserId,
        firstName: input.firstName,
        lastName: input.lastName,
        dateOfBirth: input.dateOfBirth,
        gender: input.gender,
        isMinor: input.isMinor ?? true,
        coppaConsentGranted: false,
        piiEncrypted: encryptedNationalId,
        emergencyContactPii: encryptedEmergency,
      },
    })

    // If minor and guardian email provided, create COPPA consent record
    if (input.isMinor && input.guardianEmail) {
      await db.guardianConsent.create({
        data: {
          tenantId: input.tenantId,
          athleteId: athlete.id,
          guardianEmail: input.guardianEmail,
          consentStatus: 'PENDING',
        },
      })
    }

    return athlete
  }

  /**
   * Fetches an athlete profile by ID and decrypts sensitive PII fields
   */
  static async getAthleteById(athleteId: string, tenantId: string) {
    const athlete = await db.athleteProfile.findFirst({
      where: { id: athleteId, tenantId, isSoftDeleted: false },
      include: {
        group: true,
        guardianConsents: true,
        contracts: true,
        biometrics: true,
      },
    })

    if (!athlete) return null

    return {
      ...athlete,
      nationalIdOrSsnDecrypted: athlete.piiEncrypted ? decryptPii(athlete.piiEncrypted) : null,
      emergencyContactDecrypted: athlete.emergencyContactPii ? decryptPii(athlete.emergencyContactPii) : null,
    }
  }

  /**
   * Updates COPPA parental consent status for minor athlete
   */
  static async updateGuardianConsent(consentId: string, status: ConsentStatus, ipAddress?: string) {
    const consent = await db.guardianConsent.update({
      where: { id: consentId },
      data: {
        consentStatus: status,
        ipAddress,
        consentedAt: status === 'GRANTED' ? new Date() : undefined,
      },
    })

    if (status === 'GRANTED') {
      await db.athleteProfile.update({
        where: { id: consent.athleteId },
        data: {
          coppaConsentGranted: true,
          coppaConsentDate: new Date(),
        },
      })
    }

    return consent
  }

  /**
   * Initiates GDPR 14-day soft delete for athlete profile
   */
  static async softDeleteAthlete(athleteId: string, tenantId: string) {
    return db.athleteProfile.updateMany({
      where: { id: athleteId, tenantId },
      data: {
        isSoftDeleted: true,
        deletedAt: new Date(),
      },
    })
  }
}
