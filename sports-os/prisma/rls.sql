-- PostgreSQL Row-Level Security (RLS) Policies for Artron Multi-Tenant SaaS
-- Enforces tenant isolation via session setting `app.current_tenant_id`

-- 1. Enable RLS on all tenant-bound tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "facilities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "athlete_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "contracts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "guardian_consents" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "medical_records" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "athlete_tuitions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "iot_devices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "access_control_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "biometric_telemetry_streams" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;

-- 2. Create Isolation Policies checking session variable
-- Users Policy
CREATE POLICY tenant_isolation_users ON "users"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Facilities Policy
CREATE POLICY tenant_isolation_facilities ON "facilities"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Groups Policy
CREATE POLICY tenant_isolation_groups ON "groups"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Athlete Profiles Policy
CREATE POLICY tenant_isolation_athlete_profiles ON "athlete_profiles"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Contracts Policy
CREATE POLICY tenant_isolation_contracts ON "contracts"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Guardian Consents Policy
CREATE POLICY tenant_isolation_guardian_consents ON "guardian_consents"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Medical Records Policy
CREATE POLICY tenant_isolation_medical_records ON "medical_records"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Subscriptions Policy
CREATE POLICY tenant_isolation_subscriptions ON "subscriptions"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Invoices Policy
CREATE POLICY tenant_isolation_invoices ON "invoices"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Athlete Tuitions Policy
CREATE POLICY tenant_isolation_athlete_tuitions ON "athlete_tuitions"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- IoT Devices Policy
CREATE POLICY tenant_isolation_iot_devices ON "iot_devices"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Access Control Logs Policy
CREATE POLICY tenant_isolation_access_logs ON "access_control_logs"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Telemetry Streams Policy
CREATE POLICY tenant_isolation_telemetry_streams ON "biometric_telemetry_streams"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- Audit Logs Policy
CREATE POLICY tenant_isolation_audit_logs ON "audit_logs"
    USING ("tenantId" = current_setting('app.current_tenant_id', true));
