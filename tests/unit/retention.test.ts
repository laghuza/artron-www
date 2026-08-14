import { scheduleAccountDeletion, processPendingPurges, offboardTenant } from "../../src/lib/retention";
import { prisma } from "../../src/lib/prisma";

jest.mock("../../src/lib/prisma", () => ({
  prisma: {
    subscription: {
      count: jest.fn(),
      update: jest.fn(),
    },
    accountDeletionRequest: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    user: {
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
    turnstileLog: {
      deleteMany: jest.fn(),
    },
    athlete: {
      deleteMany: jest.fn(),
    },
    auditLog: {
      deleteMany: jest.fn(),
    },
    club: {
      deleteMany: jest.fn(),
    },
    federation: {
      deleteMany: jest.fn(),
    },
  },
}));

describe("retention compliance module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("scheduleAccountDeletion", () => {
    it("should schedule deletion without tax archiving if user has no subscriptions", async () => {
      (prisma.subscription.count as jest.Mock).mockResolvedValue(0);
      (prisma.accountDeletionRequest.create as jest.Mock).mockResolvedValue({
        id: "req_1",
        userId: "user_1",
        taxArchiveRequired: false,
        status: "PENDING",
      });

      const res = await scheduleAccountDeletion("user_1");

      expect(prisma.subscription.count).toHaveBeenCalledWith({
        where: { userId: "user_1" },
      });
      expect(prisma.accountDeletionRequest.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: "user_1",
            taxArchiveRequired: false,
            status: "PENDING",
          }),
        })
      );
      expect(res.taxArchiveRequired).toBe(false);
    });

    it("should schedule deletion with tax archiving required if user has subscriptions", async () => {
      (prisma.subscription.count as jest.Mock).mockResolvedValue(3);
      (prisma.accountDeletionRequest.create as jest.Mock).mockResolvedValue({
        id: "req_2",
        userId: "user_2",
        taxArchiveRequired: true,
        status: "PENDING",
      });

      const res = await scheduleAccountDeletion("user_2");

      expect(prisma.subscription.count).toHaveBeenCalledWith({
        where: { userId: "user_2" },
      });
      expect(prisma.accountDeletionRequest.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: "user_2",
            taxArchiveRequired: true,
            status: "PENDING",
          }),
        })
      );
      expect(res.taxArchiveRequired).toBe(true);
    });
  });

  describe("processPendingPurges", () => {
    it("should perform a hard delete cascade if taxArchiveRequired is false", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);

      (prisma.accountDeletionRequest.findMany as jest.Mock).mockResolvedValue([
        {
          id: "req_1",
          userId: "user_1",
          scheduledPurgeAt: pastDate,
          taxArchiveRequired: false,
          user: { id: "user_1", name: "John Doe" },
        },
      ]);

      const processed = await processPendingPurges();

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: "user_1" },
      });
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(processed).toBe(1);
    });

    it("should scrub PII and retain billing data if taxArchiveRequired is true", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);

      (prisma.accountDeletionRequest.findMany as jest.Mock).mockResolvedValue([
        {
          id: "req_2",
          userId: "user_2",
          scheduledPurgeAt: pastDate,
          taxArchiveRequired: true,
          user: { id: "user_2", name: "Billing Client" },
        },
      ]);

      const processed = await processPendingPurges();

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user_2" },
        data: expect.objectContaining({
          name: "ANONYMIZED_USER",
          personalIdEncrypted: null,
        }),
      });
      expect(prisma.turnstileLog.deleteMany).toHaveBeenCalledWith({
        where: { userId: "user_2" },
      });
      expect(prisma.accountDeletionRequest.update).toHaveBeenCalledWith({
        where: { id: "req_2" },
        data: { status: "COMPLETED" },
      });
      expect(prisma.user.delete).not.toHaveBeenCalled();
      expect(processed).toBe(1);
    });
  });

  describe("offboardTenant", () => {
    it("should refund sub within 14 days, anonymize user with subs, delete user without subs, and delete logs/athletes/clubs/federations", async () => {
      const now = new Date();
      const within14Days = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 5); // eligible for refund
      const past14Days = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5); // NOT eligible for refund

      const mockUsers = [
        {
          id: "user_with_subs",
          name: "John Rich",
          email: "john@rich.com",
          subscriptions: [
            { id: "sub_1", refundEligibleUntil: within14Days, status: "ACTIVE", refundedAt: null },
            { id: "sub_2", refundEligibleUntil: past14Days, status: "ACTIVE", refundedAt: null },
          ],
        },
        {
          id: "user_without_subs",
          name: "John Poor",
          email: "john@poor.com",
          subscriptions: [],
        },
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const res = await offboardTenant("tenant_xyz");

      // Verify B2C 14-day refund trigger
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { id: "sub_1" },
        data: expect.objectContaining({
          status: "REFUNDED",
        }),
      });
      // Should not refund sub_2 since it has expired refund date
      expect(prisma.subscription.update).not.toHaveBeenCalledWith({
        where: { id: "sub_2" },
        data: expect.any(Object),
      });

      // Verify User with subscriptions is anonymized
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user_with_subs" },
        data: expect.objectContaining({
          name: "ANONYMIZED_USER",
          personalIdEncrypted: null,
        }),
      });

      // Verify User without subscriptions is deleted
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: "user_without_subs" },
      });

      // Verify logs/athletes/clubs/federations delete is triggered for tenant_xyz
      expect(prisma.turnstileLog.deleteMany).toHaveBeenCalledWith({
        where: { tenantId: "tenant_xyz" },
      });
      expect(prisma.athlete.deleteMany).toHaveBeenCalledWith({
        where: { tenantId: "tenant_xyz" },
      });
      expect(prisma.auditLog.deleteMany).toHaveBeenCalledWith({
        where: { tenantId: "tenant_xyz" },
      });
      expect(prisma.club.deleteMany).toHaveBeenCalledWith({
        where: { tenantId: "tenant_xyz" },
      });
      expect(prisma.federation.deleteMany).toHaveBeenCalledWith({
        where: { tenantId: "tenant_xyz" },
      });

      // Result summary check
      expect(res).toEqual({
        refundedCount: 1,
        anonymizedCount: 1,
        deletedUsersCount: 1,
      });
    });
  });
});
