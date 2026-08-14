-- 🏛️ ARTRON SPORTS OS // ROW-LEVEL SECURITY (RLS) MIGRATION HELPER
-- DATABASE PROVIDER: POSTGRESQL

-- 1. Enable RLS on Tenant-Partitioned Tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE federations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE turnstile_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;

-- 2. Create Tenant Isolation Policies
-- Access is granted only when the row's tenantId matches the current session tenant variable: current_setting('app.current_tenant_id')

-- Policy for tenants table
CREATE POLICY tenant_isolation_on_tenants ON tenants
  FOR ALL
  USING (id = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for users table
CREATE POLICY tenant_isolation_on_users ON users
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for federations table
CREATE POLICY tenant_isolation_on_federations ON federations
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for clubs table
CREATE POLICY tenant_isolation_on_clubs ON clubs
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for athletes table
CREATE POLICY tenant_isolation_on_athletes ON athletes
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for audit_logs table
CREATE POLICY tenant_isolation_on_audit_logs ON audit_logs
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for subscriptions table
CREATE POLICY tenant_isolation_on_subscriptions ON subscriptions
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for turnstile_logs table
CREATE POLICY tenant_isolation_on_turnstile_logs ON turnstile_logs
  FOR ALL
  USING (tenantId = current_setting('app.current_tenant_id', true)::uuid);

-- Policy for deletion_requests table
CREATE POLICY tenant_isolation_on_deletion_requests ON deletion_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = deletion_requests.userId 
      AND users.tenantId = current_setting('app.current_tenant_id', true)::uuid
    )
  );

-- 3. How to Set Tenant Session Context in Application Code:
-- Before executing queries in Next.js Server Actions or NestJS services, run:
-- await prisma.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}';`);
