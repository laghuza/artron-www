import { db } from '../db/client'
import { SubscriptionPlan, PaymentGateway, BillingStatus } from '@prisma/client'

export interface PlanLimits {
  maxAthletes: number
  maxFacilities: number
  hasTelemetry: boolean
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  FREE: { maxAthletes: 25, maxFacilities: 1, hasTelemetry: false },
  STARTER: { maxAthletes: 100, maxFacilities: 3, hasTelemetry: false },
  PRO: { maxAthletes: 500, maxFacilities: 10, hasTelemetry: true },
  ENTERPRISE: { maxAthletes: 999999, maxFacilities: 999, hasTelemetry: true },
}

export interface CreateInvoiceInput {
  tenantId: string
  paymentGateway: PaymentGateway
  amountCents: number
  currency?: string
  gatewayTransactionId?: string
}

export class BillingService {
  /**
   * Validates if a tenant has capacity to add a new athlete under their plan tier
   */
  static async validateAthleteQuota(tenantId: string): Promise<{ allowed: boolean; currentCount: number; limit: number }> {
    const tenant = await db.tenant.findUnique({
      where: { id: tenantId },
      select: { plan: true },
    })

    const plan = tenant?.plan || 'FREE'
    const limit = PLAN_LIMITS[plan].maxAthletes

    const currentCount = await db.athleteProfile.count({
      where: { tenantId, isSoftDeleted: false },
    })

    return {
      allowed: currentCount < limit,
      currentCount,
      limit,
    }
  }

  /**
   * Generates a multi-gateway payment invoice (Stripe, TBC Bank, Bank of Georgia)
   */
  static async createInvoice(input: CreateInvoiceInput) {
    return db.invoice.create({
      data: {
        tenantId: input.tenantId,
        paymentGateway: input.paymentGateway,
        amountCents: input.amountCents,
        currency: input.currency || 'GEL',
        gatewayTransactionId: input.gatewayTransactionId,
        status: 'ACTIVE',
      },
    })
  }

  /**
   * Processes a payment webhook callback from Stripe / TBC / BOG
   */
  static async processPaymentCallback(invoiceId: string, status: BillingStatus, transactionId?: string) {
    return db.invoice.update({
      where: { id: invoiceId },
      data: {
        status,
        paidAt: status === 'ACTIVE' ? new Date() : undefined,
        gatewayTransactionId: transactionId,
      },
    })
  }
}
