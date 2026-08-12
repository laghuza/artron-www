import { db } from '../db/client'
import { AcademyType, SubscriptionPlan } from '@prisma/client'

export interface CreateAcademyInput {
  name: string
  slug: string
  academyType?: AcademyType
  plan?: SubscriptionPlan
  address?: string
  contactEmail?: string
}

export interface CreateFacilityInput {
  tenantId: string
  name: string
  location?: string
  capacity?: number
}

export interface CreateGroupInput {
  tenantId: string
  facilityId?: string
  name: string
  ageCategory: string
  discipline: string
}

export class AcademyService {
  /**
   * Registers a new B2B Academy Tenant
   */
  static async createAcademy(input: CreateAcademyInput) {
    return db.tenant.create({
      data: {
        name: input.name,
        slug: input.slug,
        academyType: input.academyType || 'FOOTBALL',
        plan: input.plan || 'ENTERPRISE',
        address: input.address,
        contactEmail: input.contactEmail,
      },
    })
  }

  /**
   * Fetches an Academy tenant by slug or ID
   */
  static async getAcademyBySlug(slug: string) {
    return db.tenant.findUnique({
      where: { slug },
      include: {
        facilities: true,
        groups: true,
        subscriptions: true,
      },
    })
  }

  /**
   * Adds a new training facility under a tenant
   */
  static async createFacility(input: CreateFacilityInput) {
    return db.facility.create({
      data: {
        tenantId: input.tenantId,
        name: input.name,
        location: input.location,
        capacity: input.capacity || 100,
      },
    })
  }

  /**
   * Fetches all facilities for a tenant
   */
  static async getFacilities(tenantId: string) {
    return db.facility.findMany({
      where: { tenantId },
      include: { groups: true },
    })
  }

  /**
   * Creates a training squad/group within an academy
   */
  static async createGroup(input: CreateGroupInput) {
    return db.group.create({
      data: {
        tenantId: input.tenantId,
        facilityId: input.facilityId,
        name: input.name,
        ageCategory: input.ageCategory,
        discipline: input.discipline,
      },
    })
  }

  /**
   * Lists all squads for a tenant
   */
  static async getGroups(tenantId: string) {
    return db.group.findMany({
      where: { tenantId },
      include: { athletes: true, coaches: true },
    })
  }
}
