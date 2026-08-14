import { NextRequest, NextResponse } from "next/server";
import { processPaymentSuccess, processPaymentRefund } from "@/lib/billing/payment-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transactionId, status, amount, email, planType, action } = body;

    if (!transactionId || !status) {
      return NextResponse.json({ error: "Missing required webhook parameters" }, { status: 400 });
    }

    // Handle TBC refund notification callback
    if (action === "REFUND" || status === "REFUNDED") {
      await processPaymentRefund({
        transactionId,
        email,
        paymentProvider: "TBC",
      });
      return NextResponse.json({ success: true });
    }

    // Handle successful payment statuses from TBC Gateway API
    if (status === "SUCCEEDED" || status === "APPROVED" || status === "SUCCESS") {
      if (!email) {
        return NextResponse.json({ error: "Missing billing customer email" }, { status: 400 });
      }

      await processPaymentSuccess({
        email,
        amount: parseFloat(amount) || 99.0,
        paymentProvider: "TBC",
        transactionId,
        planType: planType || "ENTERPRISE",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("TBC Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
