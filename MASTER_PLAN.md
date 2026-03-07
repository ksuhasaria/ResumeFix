# ResumeFix - Master Execution & Tracking Plan (Frontend Phase)

This document serves as the single source of truth for the ResumeFix project, tracking the overall vision, completed milestones, and upcoming technical execution.

## 1. Overall Goal & Product Definition
**ResumeFix** is a paid resume improvement service targeting the **US Tech Market**. 
The immediate goal is **Validation Phase 1**: Drive Meta Ads traffic to the landing page and prove out the unit economics (Cost Per Acquisition < LTV). **All heavy backend infrastructure is paused.**

- **Target User**: US tech job seekers competing in a saturated market.
- **Pricing Model**: One-time payment. $29 (Standard) / $99 (Pro Bundle).
- **Traffic Strategy**: Mobile-first cold traffic via Meta Ads leading to a high-converting, long-form direct response sales page.

## 2. Completed Milestones

### A. Frontend & UI
- [x] Initialized Next.js 15 App Router project with glassmorphic aesthetic.
- [x] **US Market Pivot**: Migrated the high-converting `/v2` long-form sales page to be the primary root page.
- [x] Updated all copywriting, trust badges (Google, Meta, Stripe), avatars, and testimonials to specifically target the US corporate/tech market.
- [x] Added granular FAQ addressing US tech anxieties (Taleo, Workday, data privacy).

### B. Payment & Pixel Base
- [x] Stripe Checkout integrated for $29/$99 products.
- [x] Facebook Pixel base code added to Next.js layout.
- [x] `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` added to Vercel.

## 3. Immediate Focus: Frontend Sales & CRO (Conversion Rate Optimization)

To survive Meta Ads traffic, the page must convert highly. The following frontend improvements are the sole focus of the current sprint.

### A. High-Impact Visuals & Story
- [ ] **Video Sales Letter (VSL) / Demo GIF:** Replace or supplement the "Before/After" screenshot with an autoplaying 15-second visual showing a messy Canva resume physically restructuring itself into the pristine Harvard 1-column template.
- [ ] **Founder's Story (Authority Building):** Faceless tools struggle to command $99. Add a short "Why I built this" letter from a persona to build deep, relatable trust.

### B. Friction Reduction
- [ ] **Microcopy:** Add subtext immediately below the `$29` and `$99` checkout buttons (e.g., *"Takes 30 seconds. No forced account creation. 100% Secure Stripe Checkout."*).
- [ ] **Exit-Intent Downsell:** If a user attempts to close the tab or scroll up quickly, trigger a pop-up offering *just* the "500+ Power-Verbs DB and Cold Email Scripts" for a low-friction $9 impulse buy to recover ad spend.

### C. Pixel Tracking Perfection
- [ ] Verify `ViewContent` fires on page load.
- [ ] Verify `InitiateCheckout` fires with accurate `$29` or `$99` values when buttons are clicked.
- [ ] Verify `Purchase` fires accurately (Note: we may need a simple `/success` page to track this properly post-Stripe redirect).

## 4. Phase 2: Deferred Backend & Fulfillment
*(To be implemented ONLY after 10-20 successful sales validate the ad funnel)*
- Supabase Postgres Database Setup
- Stripe Webhook Fulfillment Automation
- Resend Magic Link automated emails
- Gated AI Generation Dashboard
