import { createSessionToken, verifySessionToken } from "@/lib/auth-session";
import { encryptPersonalId, decryptPersonalId } from "@/lib/crypto";

// Mock next/headers
jest.mock("next/headers", () => ({
  headers: jest.fn().mockImplementation(async () => {
    const map = new Map<string, string>();
    map.set("x-forwarded-for", "127.0.0.1");
    return {
      get: (key: string) => map.get(key) || null,
    };
  }),
  cookies: jest.fn().mockImplementation(async () => ({
    set: jest.fn(),
    get: jest.fn(),
  })),
}));

// Mock Prisma with jest-prefixed variables for hoisting
const mockTenantCreate = jest.fn().mockResolvedValue({ id: "tenant_uuid_101", name: "Test Gym", subdomain: "club-123456789" });
const mockUserCreate = jest.fn().mockResolvedValue({ id: "user_uuid_202", email: "owner@testgym.ge", name: "Davit Todua" });
const mockClubCreate = jest.fn().mockResolvedValue({ id: "club_uuid_303", name: "Test Gym" });
const mockFedCreate = jest.fn().mockResolvedValue({ id: "fed_uuid_404", name: "Test Federation" });
const mockSubCreate = jest.fn().mockResolvedValue({ id: "sub_uuid_505", type: "PRO_TRIAL" });
const mockAuditCreate = jest.fn().mockResolvedValue({ id: "audit_uuid_606", action: "CLUB_REGISTERED" });

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    federation: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    tenant: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    $transaction: jest.fn().mockImplementation(async (callback: any) => {
      return callback({
        tenant: { create: mockTenantCreate },
        user: { create: mockUserCreate },
        club: { create: mockClubCreate },
        federation: { create: mockFedCreate },
        subscription: { create: mockSubCreate },
        auditLog: { create: mockAuditCreate },
      });
    }),
  },
}));

describe("Registration & Multi-Tenant Pipeline (ეტაპი 4)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Auth Session Token Signing & Verification (HMAC-SHA256)", () => {
    it("should correctly sign and verify a session payload", () => {
      const payload = {
        userId: "user-123",
        tenantId: "tenant-456",
        email: "admin@artron.ge",
        name: "Admin User",
        role: "CLUB_ADMIN",
        subdomain: "club-999888777",
        isTrial: true,
      };

      const token = createSessionToken(payload, 3600);
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);

      const verified = verifySessionToken(token);
      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe("user-123");
      expect(verified?.tenantId).toBe("tenant-456");
      expect(verified?.email).toBe("admin@artron.ge");
      expect(verified?.subdomain).toBe("club-999888777");
      expect(verified?.isTrial).toBe(true);
    });

    it("should reject tampered tokens", () => {
      const token = createSessionToken({
        userId: "user-123",
        tenantId: "tenant-456",
        email: "admin@artron.ge",
        name: "Admin User",
        role: "CLUB_ADMIN",
        subdomain: "club-999888777",
        isTrial: true,
      });

      const parts = token.split(".");
      const tamperedToken = `${parts[0]}.${parts[1]}.invalidsignature`;

      const verified = verifySessionToken(tamperedToken);
      expect(verified).toBeNull();
    });

    it("should reject expired tokens", () => {
      const token = createSessionToken(
        {
          userId: "user-123",
          tenantId: "tenant-456",
          email: "admin@artron.ge",
          name: "Admin User",
          role: "CLUB_ADMIN",
          subdomain: "club-999888777",
          isTrial: true,
        },
        -10 // Expired 10 seconds ago
      );

      const verified = verifySessionToken(token);
      expect(verified).toBeNull();
    });
  });

  describe("AES-256-GCM Data Encryption for PII Personal ID", () => {
    it("should encrypt and decrypt personalId with high fidelity", () => {
      const personalId = "01024088991";
      const encrypted = encryptPersonalId(personalId);

      expect(encrypted.encrypted).toBeDefined();
      expect(encrypted.iv).toBeDefined();
      expect(encrypted.authTag).toBeDefined();
      expect(encrypted.encrypted).not.toBe(personalId);

      const decrypted = decryptPersonalId(encrypted.encrypted, encrypted.iv, encrypted.authTag);
      expect(decrypted).toBe(personalId);
    });
  });

  describe("Club Registration Server Action & Multi-Tenant Pipeline", () => {
    it("should successfully execute full Club registration and create Tenant, User, Club, Trial Subscription & AuditLog", async () => {
      const { registerClubAction } = await import("@/app/get-started/actions");

      const result = await registerClubAction({
        clubName: "Titan Fitness",
        clubLegalForm: "შპს",
        clubCode: "405123456",
        clubServices: "ფიტნეს კლუბი & დარბაზი | 500 წევრი",
        clubAddress: "თბილისი, ჭავჭავაძის 37",
        branchesCount: "1 ფილიალი",
        gatesCount: "2 ტურნიკეტი | 8 მწვრთნელი",
        clubFirstName: "დავით",
        clubLastName: "თოდუა",
        clubExecPosition: "დამფუძნებელი / დირექტორი",
        clubContactMobile: "+995 (599) 11-22-33",
        clubOfficialEmail: "davit@titanfitness.ge",
        clubAccessCode: "SecurePass2026!",
        personalId: "01024055667",
        plan: "PRO",
        billingCycle: "MONTHLY",
      });

      expect(result.success).toBe(true);
      expect(result.deploymentKey).toBe("ART-CLB-3456");
      expect(result.officialEmail).toBe("davit@titanfitness.ge");
      expect(result.tenantId).toBe("tenant_uuid_101");
      expect(result.subdomain).toBe("club-405123456");
      expect(result.sessionToken).toBeDefined();

      // Verify transaction calls
      expect(mockTenantCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: "Titan Fitness",
            subdomain: "club-405123456",
            plan: "PRO",
          }),
        })
      );

      expect(mockSubCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            type: "PRO_TRIAL",
            price: 0,
          }),
        })
      );

      expect(mockAuditCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: "CLUB_REGISTERED",
          }),
        })
      );
    });

    it("should reject club registration if personalId is not 11 digits", async () => {
      const { registerClubAction } = await import("@/app/get-started/actions");

      const result = await registerClubAction({
        clubName: "Invalid Club",
        clubLegalForm: "შპს",
        clubCode: "405123456",
        clubServices: "ფიტნეს კლუბი",
        clubAddress: "თბილისი",
        branchesCount: "1",
        gatesCount: "1",
        clubFirstName: "დავით",
        clubLastName: "თოდუა",
        clubExecPosition: "დირექტორი",
        clubContactMobile: "+995599112233",
        clubOfficialEmail: "bad@club.ge",
        clubAccessCode: "Pass12345",
        personalId: "12345", // Invalid length
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("პირადი ნომერი უნდა შედგებოდეს 11 ციფრისგან");
    });
  });

  describe("REST API Endpoint (/api/v1/register)", () => {
    it("should accept valid POST request and return HTTP 201 with tenant details", async () => {
      const { POST: registerRoute } = await import("@/app/api/v1/register/route");
      const { NextRequest } = await import("next/server");

      const payload = {
        clubName: "Olympic Pool",
        clubLegalForm: "შპს",
        clubCode: "409988776",
        clubServices: "საცურაო აუზი",
        clubAddress: "ბათუმი, რუსთაველის 10",
        firstName: "გიორგი",
        lastName: "ბერიძე",
        phone: "+995 (577) 44-55-66",
        email: "giorgi@olympicpool.ge",
        password: "SuperSecretPassword2026!",
        personalId: "61001099887",
        plan: "ENTERPRISE",
      };

      const req = new NextRequest("http://localhost:3000/api/v1/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const response = await registerRoute(req);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data.deploymentKey).toBe("ART-CLB-8776");
      expect(json.data.subdomain).toBe("club-409988776");
    });
  });
});
