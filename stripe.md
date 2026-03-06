# Stripe Integration Plan for ResumeFix

This document outlines the step-by-step plan to integrate Stripe for handling the $29 and $99 lifetime access payments. Given the application is built on Next.js 15 (App Router), the recommended approach is using **Stripe Checkout**, as it offloads the payment UI and security to Stripe while providing high conversion rates.

---

## 1. Prerequisites & Setup (USER ACTIONS)
These are manual steps you need to complete in your Stripe account.
- [x] **Create a Stripe Account:** Sign up at stripe.com and complete business verification for India.
- [x] **Get API Keys:** Provided the Live `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
- [x] **Provide Keys:** Keys pasted into `.env.local`.
- [ ] **Get Webhook Secret:** Create a live listener or configure a webhook in the dashboard to get the live `STRIPE_WEBHOOK_SECRET`.

## 2. Product Configuration (USER ACTIONS)
Instead of hardcoding prices in the app, you create the products in your Stripe Dashboard.
- [x] **Create Products:**
  - Product 1: "FixResume - Standard" ($29.00) -> `prod_U6G6aCrIZOrTpq`
  - Product 2: "FixResume - Pro" ($99.00) -> `prod_U6G7p8xBfJl8iV`
- [x] **Get Price IDs:** Price IDs for both tiers (`price_1T83ah...` and `price_1T83b0...`) have been successfully mapped in `.env.local`.

## 3. Backend Implementation (AI IMPLEMENTATION)
I will build the secure server-side logic to communicate with Stripe.

### A. Core Setup
- [ ] Install SDKs: `npm install stripe @stripe/stripe-js`
- [ ] Setup env variables.

### B. Create Checkout Session API
- [ ] **Create Route:** Build `src/app/api/create-checkout-session/route.ts`.
- [ ] **Logic:** Receive `priceId`, initialize Stripe, create Checkout Session, and return the `checkout_url`.

### C. Handle Webhooks (Critical for Fulfillment)
- [ ] **Create Webhook Route:** Build `src/app/api/webhook/stripe/route.ts`.
- [ ] **Logic:** Verify webhook signature, listen for `checkout.session.completed`, and handle post-purchase state (granting access).

## 4. Frontend Implementation (AI IMPLEMENTATION)
I will map the UI to the new APIs.

- [ ] **Update Payment Buttons:** In `src/app/page.tsx` and `src/app/v2/page.tsx`, wire up the checkout buttons.
- [ ] **Fetch Checkout URL:** Trigger POST request to `/api/create-checkout-session` on click.
- [ ] **Redirect User:** Handle redirect to the Stripe-hosted payment page.
- [ ] **Create Success Page:** Build `src/app/success/page.tsx` displaying a thank-you message and instructions on next steps.
- [ ] **Create Cancel Page:** Build `src/app/cancel/page.tsx` pulling users back into the funnel.

## 5. Testing Phase (JOINT EFFORT)
- [ ] **USER/AI:** Test local webhook delivery using Stripe CLI. Follow these steps:
  1. Download the Stripe CLI and log in:
     `stripe login`
  2. Forward events to our local API route (Note: Next.js uses port 3000 by default, and our route is `/api/webhook/stripe`):
     `stripe listen --forward-to localhost:3000/api/webhook/stripe`
  3. Trigger events with the CLI to test backend fulfillment:
     `stripe trigger checkout.session.completed`
- [ ] **USER:** Use Stripe Test Cards to simulate successful payments on the UI.

## 6. Going Live (USER ACTIONS)
- [ ] Toggle Stripe Dashboard to "Live Mode".
- [ ] Replace Test API keys in Vercel environment variables with Live API keys.
- [ ] Replace Test Price IDs with Live Price IDs.
- [ ] Setup the Live Webhook endpoint pointing to `https://your-domain.com/api/webhook/stripe`.
- [ ] Perform a real ₹1/$1 transaction to verify the end-to-end flow.

---

## Actionable To-Do List Summary

### 👉 YOUR ACTION ITEMS (USER)
- [x] 1. Sign up for Stripe & get Test API keys.
- [ ] 2. Get Test Webhook Secret.
- [x] 3. Create 2 Products & Prices in Stripe Dashboard.
- [x] 4. Provide Keys & Price IDs to me (via prompt or `.env.local`).

### 🤖 MY ACTION ITEMS (AI)
- [x] 1. `npm install stripe @stripe/stripe-js`.
- [x] 2. Build `/api/create-checkout-session/route.ts`.
- [x] 3. Build `/api/webhook/stripe/route.ts`.
- [x] 4. Update frontend buttons in `/` and `/v2` to connect to API.
- [x] 5. Build `/success` and `/cancel` pages.
