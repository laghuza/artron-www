import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export interface PaymentSuccessPayload {
  email: string;
  amount: number;
  paymentProvider: "STRIPE" | "TBC" | "BOG";
  transactionId: string;
  planType: string;
}

/**
 * Handles successful B2B or B2C subscription payments.
 * Locates the user/tenant, creates/renews subscription, and logs the transaction.
 */
export async function processPaymentSuccess(payload: PaymentSuccessPayload) {
  const { email, amount, paymentProvider, transactionId, planType } = payload;
  const sanitizedEmail = email.toLowerCase().trim();

  // 1. Locate User and Tenant
  const user = await prisma.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (!user) {
    throw new Error(`User not found for email: ${sanitizedEmail}`);
  }

  const tenantId = user.tenantId;

  // 2. Set subscription timelines (30 days cycle)
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  // 14-day refund window compliance under Georgian consumer protection SLA
  const refundEligibleUntil = new Date();
  refundEligibleUntil.setDate(startDate.getDate() + 14);

  // 3. Register/renew subscription inside transactional block
  const subscription = await prisma.$transaction(async (tx) => {
    // Create new active subscription
    const sub = await tx.subscription.create({
      data: {
        userId: user.id,
        tenantId: tenantId,
        type: planType,
        status: SubscriptionStatus.ACTIVE,
        price: amount,
        startDate,
        endDate,
        refundEligibleUntil,
      },
    });

    // Create Audit Log of transaction
    await tx.auditLog.create({
      data: {
        tenantId: tenantId,
        userId: user.id,
        action: `SUBSCRIPTION_PURCHASED_${paymentProvider}_TX_${transactionId}`,
        ipAddress: "127.0.0.1",
      },
    });

    return sub;
  });

  return subscription;
}

/**
 * Marks an active subscription as REFUNDED.
 */
export async function processPaymentRefund(payload: {
  transactionId: string;
  email?: string;
  paymentProvider: "STRIPE" | "TBC" | "BOG";
}) {
  const { transactionId, email, paymentProvider } = payload;

  let subscription = null;

  // Attempt to locate subscription via user email first
  if (email) {
    const sanitizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });
    if (user) {
      subscription = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          status: SubscriptionStatus.ACTIVE,
        },
        orderBy: { createdAt: "desc" },
      });
    }
  }

  // Fallback: search for the latest active subscription if email lookup yielded no active subscription
  if (!subscription) {
    subscription = await prisma.subscription.findFirst({
      where: {
        status: SubscriptionStatus.ACTIVE,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  if (!subscription) {
    throw new Error("No active subscription found to refund.");
  }

  // Perform refund update inside transaction
  const updatedSubscription = await prisma.$transaction(async (tx) => {
    const updated = await tx.subscription.update({
      where: { id: subscription.id },
      data: {
        status: SubscriptionStatus.REFUNDED,
        refundedAt: new Date(),
      },
    });

    await tx.auditLog.create({
      data: {
        tenantId: subscription.tenantId,
        userId: subscription.userId,
        action: `SUBSCRIPTION_REFUNDED_${paymentProvider}_TX_${transactionId}`,
        ipAddress: "127.0.0.1",
      },
    });

    return updated;
  });

  return updatedSubscription;
}

/**
 * Cancels a subscription (sets state to CANCELLED).
 */
export async function processPaymentCancellation(payload: {
  email: string;
  paymentProvider: "STRIPE" | "TBC" | "BOG";
}) {
  const { email, paymentProvider } = payload;
  const sanitizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (!user) {
    throw new Error(`User not found: ${sanitizedEmail}`);
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: SubscriptionStatus.ACTIVE,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!subscription) {
    throw new Error(`No active subscription found for user: ${sanitizedEmail}`);
  }

  const updatedSubscription = await prisma.$transaction(async (tx) => {
    const updated = await tx.subscription.update({
      where: { id: subscription.id },
      data: {
        status: SubscriptionStatus.CANCELLED,
      },
    });

    await tx.auditLog.create({
      data: {
        tenantId: subscription.tenantId,
        userId: user.id,
        action: `SUBSCRIPTION_CANCELLED_${paymentProvider}`,
        ipAddress: "127.0.0.1",
      },
    });

    return updated;
  });

  return updatedSubscription;
}
