import { db } from '../db/client'
import { ContractType, ContractStatus } from '@prisma/client'

export interface CreateContractInput {
  tenantId: string
  athleteId?: string
  coachProfileId?: string
  contractType: ContractType
  startDate: Date
  endDate?: Date
  amountCents?: number
  currency?: string
  documentUrl?: string
  notes?: string
}

export class ContractService {
  /**
   * Issues a new contract for an athlete or coach under a tenant
   */
  static async createContract(input: CreateContractInput) {
    return db.contract.create({
      data: {
        tenantId: input.tenantId,
        athleteId: input.athleteId,
        coachProfileId: input.coachProfileId,
        contractType: input.contractType,
        startDate: input.startDate,
        endDate: input.endDate,
        amountCents: input.amountCents || 0,
        currency: input.currency || 'GEL',
        documentUrl: input.documentUrl,
        notes: input.notes,
        status: 'ACTIVE',
      },
    })
  }

  /**
   * Fetches contracts for a tenant with optional status filter
   */
  static async getContractsByTenant(tenantId: string, status?: ContractStatus) {
    return db.contract.findMany({
      where: {
        tenantId,
        ...(status ? { status } : {}),
      },
      include: {
        athlete: true,
        coachProfile: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Updates contract status (e.g. TERMINATED, SUSPENDED, EXPIRED)
   */
  static async updateContractStatus(contractId: string, tenantId: string, status: ContractStatus) {
    return db.contract.updateMany({
      where: { id: contractId, tenantId },
      data: { status },
    })
  }
}
