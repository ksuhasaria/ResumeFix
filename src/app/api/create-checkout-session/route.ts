import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from the environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-02-25.clover" as any,
});

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json();

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        // Determine the base URL for success/cancel redirects
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const planType = priceId === process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID ? 'standard' : 'pro';

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "payment", // One-time payment
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan=${planType}`,
            cancel_url: `${baseUrl}/`, // Send back to pricing if cancelled
        });

        if (!session.url) {
            return NextResponse.json({ error: "Failed to create Stripe session URL" }, { status: 500 });
        }

        // Return the URL to the frontend so it can redirect the user
        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
