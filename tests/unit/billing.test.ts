import { processPaymentSuccess, processPaymentRefund, processPaymentCancellation } from "../../src/lib/billing/payment-engine";
import { prisma } from "../../src/lib/prisma";

const mockTx = {
  subscription: {
    create: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

jest.mock("../../src/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    subscription: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockTx)),
  },
}));

describe("billing payment-engine test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTx.subscription.create.mockReset();
    mockTx.subscription.update.mockReset();
    mockTx.auditLog.create.mockReset();
  });

  describe("processPaymentSuccess", () => {
    it("should successfully create an active subscription and audit log on payment success", async () => {
      const mockUser = {
        id: "user_uuid_123",
        email: "test@example.com",
        tenantId: "tenant_uuid_456",
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      mockTx.subscription.create.mockResolvedValue({
        id: "sub_1",
        userId: "user_uuid_123",
        tenantId: "tenant_uuid_456",
        status: "ACTIVE",
      });

      const res = await processPaymentSuccess({
        email: "test@example.com",
        amount: 99.00,
        paymentProvider: "STRIPE",
        transactionId: "stripe_tx_789",
        planType: "ENTERPRISE",
      });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      
      expect(mockTx.subscription.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: "user_uuid_123",
            tenantId: "tenant_uuid_456",
            price: 99.00,
            status: "ACTIVE",
          }),
        })
      );
      
      expect(mockTx.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            tenantId: "tenant_uuid_456",
            userId: "user_uuid_123",
            action: "SUBSCRIPTION_PURCHASED_STRIPE_TX_stripe_tx_789",
          }),
        })
      );
      
      expect(res.status).toBe("ACTIVE");
    });

    it("should throw error if user is not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        processPaymentSuccess({
          email: "unknown@example.com",
          amount: 99.00,
          paymentProvider: "TBC",
          transactionId: "tbc_tx_123",
          planType: "ENTERPRISE",
        })
      ).rejects.toThrow("User not found for email: unknown@example.com");
    });
  });

  describe("processPaymentRefund", () => {
    it("should update subscription status to REFUNDED and log audit trail", async () => {
      const mockSub = {
        id: "sub_1",
        userId: "user_1",
        tenantId: "tenant_1",
        status: "ACTIVE",
      };

      (prisma.subscription.findFirst as jest.Mock).mockResolvedValue(mockSub);
      mockTx.subscription.update.mockResolvedValue({
        ...mockSub,
        status: "REFUNDED",
        refundedAt: new Date(),
      });

      const res = await processPaymentRefund({
        transactionId: "refund_tx_123",
        email: "test@example.com",
        paymentProvider: "BOG",
      });

      expect(mockTx.subscription.update).toHaveBeenCalledWith({
        where: { id: "sub_1" },
        data: expect.objectContaining({
          status: "REFUNDED",
        }),
      });
      expect(mockTx.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            tenantId: "tenant_1",
            userId: "user_1",
            action: "SUBSCRIPTION_REFUNDED_BOG_TX_refund_tx_123",
          }),
        })
      );
      expect(res.status).toBe("REFUNDED");
    });
  });

  describe("processPaymentCancellation", () => {
    it("should cancel subscription and log cancel event", async () => {
      const mockUser = { id: "user_1", email: "test@example.com" };
      const mockSub = { id: "sub_1", userId: "user_1", tenantId: "tenant_1" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.subscription.findFirst as jest.Mock).mockResolvedValue(mockSub);
      mockTx.subscription.update.mockResolvedValue({
        ...mockSub,
        status: "CANCELLED",
      });

      const res = await processPaymentCancellation({
        email: "test@example.com",
        paymentProvider: "STRIPE",
      });

      expect(mockTx.subscription.update).toHaveBeenCalledWith({
        where: { id: "sub_1" },
        data: { status: "CANCELLED" },
      });
      expect(mockTx.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            tenantId: "tenant_1",
            userId: "user_1",
            action: "SUBSCRIPTION_CANCELLED_STRIPE",
          }),
        })
      );
      expect(res.status).toBe("CANCELLED");
    });
  });
});
