import { AuditLogPayload, AuditLogSchema } from '@/core/schemas/sports.schemas';

/**
 * ARTRON SPORTS OS // MULTI-TENANT AUDIT LOGGER
 * Implements immutable security audit tracking across tenant domains.
 */

class MultiTenantAuditLogger {
  private memoryLogs: AuditLogPayload[] = [];
  private readonly maxInMemoryLogs = 500;

  /**
   * Records a security audit event for a given tenant.
   */
  public log(
    tenantId: string,
    actorId: string,
    action: string,
    domain: AuditLogPayload['domain'],
    metadata?: Record<string, unknown>
  ): AuditLogPayload {
    const rawPayload = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tenantId,
      actorId,
      action,
      domain,
      metadata,
      timestamp: new Date().toISOString(),
    };

    const validatedLog = AuditLogSchema.parse(rawPayload);

    this.memoryLogs.unshift(validatedLog);

    if (this.memoryLogs.length > this.maxInMemoryLogs) {
      this.memoryLogs.pop();
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUDIT_LOG][${tenantId}][${domain}] ${action} by ${actorId}`);
    }

    return validatedLog;
  }

  /**
   * Retrieves audit logs filtered by tenantId.
   */
  public getTenantLogs(tenantId: string): AuditLogPayload[] {
    return this.memoryLogs.filter((log) => log.tenantId === tenantId);
  }

  /**
   * Clears in-memory logs (testing only).
   */
  public clearInMemory(): void {
    this.memoryLogs = [];
  }
}

export const auditLogger = new MultiTenantAuditLogger();
