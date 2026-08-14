// Database Type Definitions for Artron Sports OS
// These declarations mock the database models to allow typescript compilation
// without depending on generated Prisma client models that mismatch the main project's schema.

export type Role = 'SUPER_ADMIN' | 'FEDERATION_ADMIN' | 'CLUB_ADMIN' | 'ATHLETE';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: Role;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Federation {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Club {
  id: string;
  tenantId: string;
  federationId: string | null;
  name: string;
  academyType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Athlete {
  id: string;
  tenantId: string;
  clubId: string | null;
  firstName: string;
  lastName: string;
  biometricsJson?: any;
  piiEncrypted?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string | null;
  action: string;
  ipAddress: string | null;
  timestamp: Date;
}
