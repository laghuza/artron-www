import { NextRequest, NextResponse } from "next/server";
import { processPaymentSuccess, processPaymentRefund, processPaymentCancellation } from "@/lib/billing/payment-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.type;
    const session = body.data?.object;

    // Webhook signature and construction would happen in production environment:
    // const signature = req.headers.get("stripe-signature");
    // const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

    switch (eventType) {
      case "checkout.session.completed":
      case "invoice.payment_succeeded": {
        const email = session?.customer_details?.email || session?.customer_email || session?.metadata?.email;
        const amountCents = session?.amount_total || session?.amount_paid || 9900;
        const amount = amountCents / 100; // Stripe uses cents
        const transactionId = session?.id || "stripe_tx_mock";
        const planType = session?.metadata?.planType || "ENTERPRISE";

        if (!email) {
          return NextResponse.json({ error: "Missing customer email in webhook session data" }, { status: 400 });
        }

        await processPaymentSuccess({
          email,
          amount,
          paymentProvider: "STRIPE",
          transactionId,
          planType,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const email = session?.customer_email || session?.metadata?.email;
        if (!email) {
          return NextResponse.json({ error: "Missing customer email in webhook deletion event" }, { status: 400 });
        }

        await processPaymentCancellation({
          email,
          paymentProvider: "STRIPE",
        });
        break;
      }

      case "charge.refunded": {
        const transactionId = session?.id || "stripe_refund_mock";
        const email = session?.billing_details?.email || session?.customer_email;
        
        await processPaymentRefund({
          transactionId,
          email,
          paymentProvider: "STRIPE",
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
