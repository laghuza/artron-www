import { z } from 'zod';

/**
 * ARTRON SPORTS OS // CORE VALIDATION SCHEMAS
 * Single Source of Truth for Front-End & Back-End Data Models
 */

export const AccessRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  organizationType: z.enum(['FEDERATION', 'CLUB', 'ACADEMY', 'ATHLETE', 'SPONSOR']),
  organizationName: z.string().min(2, 'Organization name is required'),
  contactPhone: z.string().optional(),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
});

export type AccessRequestPayload = z.infer<typeof AccessRequestSchema>;

export const AthleteProfileSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().min(1, 'Tenant ID is required'),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  disciplineId: z.string(),
  nationalRank: z.number().int().positive().optional(),
  biometricScore: z.number().min(0).max(100),
  status: z.enum(['ACTIVE', 'INJURED', 'SUSPENDED', 'RETIRED']),
});

export type AthleteProfilePayload = z.infer<typeof AthleteProfileSchema>;

export const FederationSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().min(1),
  codeName: z.string().min(2).max(10),
  georgianName: z.string().min(2),
  englishName: z.string().min(2),
  clubsCount: z.number().int().nonnegative(),
  athletesCount: z.number().int().nonnegative(),
  status: z.enum(['VERIFIED', 'PENDING_APPROVAL', 'SUSPENDED']),
});

export type FederationPayload = z.infer<typeof FederationSchema>;

export const ClubSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().min(1),
  federationId: z.string().uuid(),
  name: z.string().min(2),
  region: z.string(),
  activeRosterCount: z.number().int().nonnegative(),
});

export type ClubPayload = z.infer<typeof ClubSchema>;

export const TelemetryPacketSchema = z.object({
  nodeId: z.number().int(),
  timestamp: z.number().int().positive(),
  heartRate: z.number().min(30).max(240).optional(),
  speedKmH: z.number().min(0).max(60).optional(),
  enneaCoreNode: z.string(),
  status: z.enum(['NOMINAL', 'ELEVATED', 'CRITICAL', 'OFFLINE']),
});

export type TelemetryPacketPayload = z.infer<typeof TelemetryPacketSchema>;

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().min(1),
  actorId: z.string().min(1),
  action: z.string().min(1),
  domain: z.enum(['ATHLETES', 'FEDERATIONS', 'CLUBS', 'SYSTEM', 'TELEMETRY']),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().datetime(),
});

export type AuditLogPayload = z.infer<typeof AuditLogSchema>;
