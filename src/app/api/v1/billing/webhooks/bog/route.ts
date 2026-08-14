import { NextRequest, NextResponse } from "next/server";
import { processPaymentSuccess, processPaymentRefund } from "@/lib/billing/payment-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, status, amount, customer_email, plan_type, event } = body;

    if (!order_id || !status) {
      return NextResponse.json({ error: "Missing required webhook parameters" }, { status: 400 });
    }

    // Handle BOG refund notification callback
    if (event === "refund" || status === "REFUNDED") {
      await processPaymentRefund({
        transactionId: order_id,
        email: customer_email,
        paymentProvider: "BOG",
      });
      return NextResponse.json({ status: "acknowledged" });
    }

    // Handle successful payment status from BOG Checkout API
    if (status === "COMPLETED" || status === "SUCCESS") {
      if (!customer_email) {
        return NextResponse.json({ error: "Missing customer_email parameter" }, { status: 400 });
      }

      await processPaymentSuccess({
        email: customer_email,
        amount: parseFloat(amount) || 99.0,
        paymentProvider: "BOG",
        transactionId: order_id,
        planType: plan_type || "ENTERPRISE",
      });
    }

    return NextResponse.json({ status: "acknowledged" });
  } catch (error: any) {
    console.error("BOG Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
