import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-02-25.clover" as any, // Bypass strict string literal type if needed, or use the exact string
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get("stripe-signature");

        if (!signature) {
            return NextResponse.json({ error: "No signature found" }, { status: 400 });
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
        }

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log(`✅ Payment received for session: ${session.id}`);

            // TODO: Here is where you will add your fulfillment logical
            // For example, if you are saving an email to a database:
            // const customerEmail = session.customer_details?.email;
            // await db.users.updateOne({ email: customerEmail }, { $set: { hasLifetimeAccess: true } });

            console.log("Fulfillment triggered.");
        } else {
            console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error: any) {
        console.error("Webhook processing failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
