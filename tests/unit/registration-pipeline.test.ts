import { createSessionToken, verifySessionToken } from "@/lib/auth-session";
import { encryptPersonalId, decryptPersonalId } from "@/lib/crypto";

describe("Auth Session & Multi-Tenant PII Security Pipeline", () => {
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
});
