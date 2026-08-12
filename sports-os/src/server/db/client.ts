import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient | undefined
}

export const db =
  globalThis.globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.globalPrisma = db
}

/**
 * Executes database operations within a tenant-scoped session context for RLS
 */
export async function withTenantContext<T>(
  tenantId: string,
  operation: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> {
  return db.$transaction(async (tx) => {
    // Set current_tenant_id session variable for PostgreSQL RLS
    await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`)
    return operation(tx)
  })
}
