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

### B. Payment & Pixel Tracking
- [x] Stripe Checkout integrated for $29/$99 products.
- [x] Facebook Pixel base code added to Next.js layout.
- [x] `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` added to Vercel.
- [x] **Pixel Perfection**: Verified `ViewContent`, `InitiateCheckout`, and `Purchase` events fire accurately (with a 1.5s delay on the `/success` page to ensure script readiness).

### C. Trust & Friction Reduction
- [x] **Founder's Story**: Added Jason M.'s authority note.
- [x] **Microcopy**: Added trust signals under checkout buttons.
- [x] **Exit-Intent Popup**: Added a $9 downsell for abandoning users.
- [x] **High-Impact Proof**: Added Statistical Proof Chart and Recruiter Eye-Tracking Heatmap.

### A. Interactive Visuals
- [ ] **Video Sales Letter (VSL) / Demo GIF:** Replace or supplement the "Before/After" screenshot with an autoplaying 15-second visual showing a messy Canva resume physically restructuring itself into the pristine Harvard 1-column template.

### B. Tracking & Data Hygiene (Deferred)
- [ ] **Strict Mode Tracking**: Update `/success` page logic to strictly require both `plan` AND `session_id` from Stripe before firing the Purchase event.
- [ ] **Conversion Deduplication**: Pass the `session_id` as the `external_id` to Meta to prevent double-counting if a user refreshes the success page.

## 4. Phase 2: Deferred Backend & Fulfillment
*(To be implemented ONLY after 10-20 successful sales validate the ad funnel)*
- Supabase Postgres Database Setup
- Stripe Webhook Fulfillment Automation
- Resend Magic Link automated emails
- Gated AI Generation Dashboard
