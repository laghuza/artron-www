"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { UserRole, SubscriptionStatus } from "@prisma/client";
import { headers, cookies } from "next/headers";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-session";

// In-memory Rate Limiter
const rateLimitMap = new Map<string, number[]>();
const LIMIT = 5; // max 5 requests
const WINDOW_MS = 60000; // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= LIMIT) {
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

// Secure password hashing helper utilizing Node's built-in crypto module
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export async function registerFederationAction(formData: {
  fedName: string;
  legalForm: string;
  fedCode: string;
  sportsType: string;
  country: string;
  address: string;
  hqName: string;
  governingDept: string;
  firstName: string;
  lastName: string;
  execPosition: string;
  contactMobile: string;
  officialEmail: string;
  accessCode: string;
  personalId: string;
}) {
  try {
    // 1. Rate Limiting
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return { success: false, error: "მეტისმეტად ბევრი მოთხოვნაა. გთხოვთ, სცადოთ მოგვიანებით." };
    }

    // 2. Validation
    if (
      !formData.fedName ||
      !formData.fedCode ||
      !formData.officialEmail ||
      !formData.accessCode ||
      !formData.personalId
    ) {
      return { success: false, error: "ყველა სავალდებულო ველი უნდა შეივსოს." };
    }

    if (!/^\d{11}$/.test(formData.personalId)) {
      return { success: false, error: "პირადი ნომერი უნდა შედგებოდეს 11 ციფრისგან." };
    }

    const sanitizedEmail = formData.officialEmail.toLowerCase().trim();
    const sanitizedCode = formData.fedCode.replace(/\s/g, "");

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });
    if (existingUser) {
      return { success: false, error: "მითითებული ელ-ფოსტა უკვე რეგისტრირებულია." };
    }

    // Check if federation code already exists
    const existingFed = await prisma.federation.findUnique({
      where: { code: sanitizedCode },
    });
    if (existingFed) {
      return { success: false, error: "ფედერაციის საიდენტიფიკაციო კოდი უკვე რეგისტრირებულია." };
    }

    const subdomain = `fed-${sanitizedCode}`;
    const existingTenant = await prisma.tenant.findUnique({
      where: { subdomain },
    });
    if (existingTenant) {
      return { success: false, error: "სისტემური დომენი უკვე დაკავებულია." };
    }

    let createdTenantId = "";
    let createdUserId = "";

    // 3. Database transaction to create Tenant, User, Federation, Subscription & AuditLog
    await prisma.$transaction(async (tx) => {
      // Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: formData.fedName,
          subdomain,
          plan: "ENTERPRISE",
        },
      });
      createdTenantId = tenant.id;

      // Create Admin User (Prisma client extension handles auto-encryption of personalId)
      const passwordHash = hashPassword(formData.accessCode);
      const user = await tx.user.create({
        data: {
          email: sanitizedEmail,
          passwordHash,
          name: `${formData.firstName} ${formData.lastName}`,
          role: UserRole.FEDERATION_ADMIN,
          tenantId: tenant.id,
          personalId: formData.personalId,
        } as any,
      });
      createdUserId = user.id;

      // Create Federation
      await tx.federation.create({
        data: {
          tenantId: tenant.id,
          name: formData.fedName,
          code: sanitizedCode,
          country: formData.country,
        },
      });

      // Create 14-day Enterprise Trial Subscription
      const now = new Date();
      const trialEndDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      await tx.subscription.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          type: "ENTERPRISE_TRIAL",
          status: SubscriptionStatus.ACTIVE,
          price: 0,
          startDate: now,
          endDate: trialEndDate,
          refundEligibleUntil: trialEndDate,
        },
      });

      // Log audit
      await tx.auditLog.create({
        data: {
          tenantId: tenant.id,
          userId: user.id,
          action: "FEDERATION_REGISTERED",
          ipAddress: ip,
        },
      });
    });

    // 4. Issue authenticated session token
    const sessionToken = createSessionToken({
      userId: createdUserId,
      tenantId: createdTenantId,
      email: sanitizedEmail,
      name: `${formData.firstName} ${formData.lastName}`,
      role: UserRole.FEDERATION_ADMIN,
      subdomain,
      isTrial: true,
    });

    // Store in cookie
    try {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    } catch {
      // In some non-HTTP environments (e.g. testing), cookies() might not be available
    }

    const deploymentKey = `ART-FED-${sanitizedCode.slice(-4).toUpperCase()}`;

    return {
      success: true,
      deploymentKey,
      officialEmail: sanitizedEmail,
      tenantId: createdTenantId,
      subdomain,
      sessionToken,
    };
  } catch (error: any) {
    console.error("Federation registration error:", error);
    return { success: false, error: error.message || "სისტემური შეცდომა რეგისტრაციისას." };
  }
}

export async function registerClubAction(formData: {
  clubName: string;
  clubLegalForm: string;
  clubCode: string;
  clubServices: string;
  clubAddress: string;
  branchesCount: string;
  gatesCount: string;
  clubFirstName: string;
  clubLastName: string;
  clubExecPosition: string;
  clubContactMobile: string;
  clubOfficialEmail: string;
  clubAccessCode: string;
  personalId: string;
  plan?: string;
  billingCycle?: string;
}) {
  try {
    // 1. Rate Limiting
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return { success: false, error: "მეტისმეტად ბევრი მოთხოვნაა. გთხოვთ, სცადოთ მოგვიანებით." };
    }

    // 2. Validation
    if (
      !formData.clubName ||
      !formData.clubCode ||
      !formData.clubOfficialEmail ||
      !formData.clubAccessCode ||
      !formData.personalId
    ) {
      return { success: false, error: "ყველა სავალდებულო ველი უნდა შეივსოს." };
    }

    if (!/^\d{11}$/.test(formData.personalId)) {
      return { success: false, error: "პირადი ნომერი უნდა შედგებოდეს 11 ციფრისგან." };
    }

    const sanitizedEmail = formData.clubOfficialEmail.toLowerCase().trim();
    const sanitizedCode = formData.clubCode.replace(/\s/g, "");
    const normalizedPlan = (formData.plan || "PRO").toUpperCase();
    const normalizedCycle = (formData.billingCycle || "MONTHLY").toUpperCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });
    if (existingUser) {
      return { success: false, error: "მითითებული ელ-ფოსტა უკვე რეგისტრირებულია." };
    }

    const subdomain = `club-${sanitizedCode}`;
    const existingTenant = await prisma.tenant.findUnique({
      where: { subdomain },
    });
    if (existingTenant) {
      return { success: false, error: "სისტემური დომენი უკვე დაკავებულია." };
    }

    let createdTenantId = "";
    let createdUserId = "";

    // 3. Database transaction to create Tenant, User, Club, Subscription & AuditLog
    await prisma.$transaction(async (tx) => {
      // Create Tenant with selected plan
      const tenant = await tx.tenant.create({
        data: {
          name: formData.clubName,
          subdomain,
          plan: normalizedPlan,
        },
      });
      createdTenantId = tenant.id;

      // Create Admin User (Prisma client extension handles auto-encryption of personalId)
      const passwordHash = hashPassword(formData.clubAccessCode);
      const user = await tx.user.create({
        data: {
          email: sanitizedEmail,
          passwordHash,
          name: `${formData.clubFirstName} ${formData.clubLastName}`,
          role: UserRole.CLUB_ADMIN,
          tenantId: tenant.id,
          personalId: formData.personalId,
        } as any,
      });
      createdUserId = user.id;

      // Create Club
      await tx.club.create({
        data: {
          tenantId: tenant.id,
          name: formData.clubName,
          academyType: formData.clubServices,
        },
      });

      // Create 14-day Trial Subscription
      const now = new Date();
      const trialEndDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      await tx.subscription.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          type: `${normalizedPlan}_TRIAL`,
          status: SubscriptionStatus.ACTIVE,
          price: 0,
          startDate: now,
          endDate: trialEndDate,
          refundEligibleUntil: trialEndDate,
        },
      });

      // Log audit
      await tx.auditLog.create({
        data: {
          tenantId: tenant.id,
          userId: user.id,
          action: "CLUB_REGISTERED",
          ipAddress: ip,
        },
      });
    });

    // 4. Issue authenticated session token
    const sessionToken = createSessionToken({
      userId: createdUserId,
      tenantId: createdTenantId,
      email: sanitizedEmail,
      name: `${formData.clubFirstName} ${formData.clubLastName}`,
      role: UserRole.CLUB_ADMIN,
      subdomain,
      isTrial: true,
    });

    // Store in cookie
    try {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    } catch {
      // In non-HTTP environments, ignore
    }

    const deploymentKey = `ART-CLB-${sanitizedCode.slice(-4).toUpperCase()}`;

    return {
      success: true,
      deploymentKey,
      officialEmail: sanitizedEmail,
      plan: normalizedPlan,
      billingCycle: normalizedCycle,
      tenantId: createdTenantId,
      subdomain,
      sessionToken,
    };
  } catch (error: any) {
    console.error("Club registration error:", error);
    return { success: false, error: error.message || "სისტემური შეცდომა რეგისტრაციისას." };
  }
}
