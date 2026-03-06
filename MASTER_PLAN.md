# ResumeFix - Master Execution & Tracking Plan

This document serves as the single source of truth for the ResumeFix project, tracking the overall vision, completed milestones, and upcoming technical execution.

## 1. Overall Goal & Product Definition
**ResumeFix** is a paid resume improvement service targeting the **US Tech Market**. The core goal is to **increase interview callbacks** by using AI-powered tools to restructure resumes into the ATS-beating "Harvard/WSO" 1-column format. 
- **Target User**: US tech job seekers competing in a saturated market.
- **Pricing Model**: One-time payment. $29 (Standard) / $99 (Pro Bundle).
- **Traffic Strategy**: Mobile-first cold traffic via Meta Ads leading to a high-converting, long-form direct response sales page.

## 2. Completed Milestones

### A. Frontend & Design UI
- [x] Initialized Next.js 15 App Router project with glassmorphic aesthetic.
- [x] Implemented multi-step state management (`AppContext.tsx`).
- [x] **US Market Pivot**: Migrated the high-converting `/v2` long-form sales page to be the primary root page.
- [x] Updated all copywriting, trust badges (Google, Meta, Stripe), avatars, and testimonials to specifically target the US corporate/tech market.
- [x] Designed the 8.5in serif-font PDF export layout to mimic Harvard/WSO standards.

### B. Payment Integration (Stripe)
- [x] User provided Stripe Live Keys and configured $29/$99 products.
- [x] Backend route `/api/create-checkout-session` implemented.
- [x] Frontend checkout buttons wired to initiate secure Stripe checkout.

## 2.5 Frontend Conversion Rate Optimization (CRO) Suggestions
While the structure is strong (Pabbly style long-form), adding the following elements will significantly decrease your Meta Ads Cost Per Acquisition (CPA) for the US market:

- [ ] **Video Sales Letter (VSL) / Demo GIF:** Replace or supplement the "Before/After" screenshot with an autoplaying 15-second visual showing a messy Canva resume physically restructuring itself into the pristine Harvard 1-column template. Seeing is believing.
- [ ] **Founder's Story (Authority Building):** Faceless tools struggle to command $99. Add a short "Why I built this" letter from a persona (e.g., "After reviewing 10,000+ resumes at Meta..."). This builds deep, relatable trust.
- [x] **Granular FAQ (Objection Destruction):** Dedicate a section explicitly addressing US tech anxieties:
  - *Will Workday/Taleo flag this as AI-generated?*
  - *Is my personal data used to train your models?*
  - *Does this work for Staff/Principal level engineering roles, or just entry-level?*
- [ ] **Friction-Reducing Microcopy:** Add subtext immediately below the `$29` and `$99` checkout buttons (e.g., *"Takes 30 seconds. No forced account creation. 100% Secure Stripe Checkout."*).
- [ ] **Exit-Intent Downsell (Advanced):** If a user attempts to close the tab, trigger a pop-up offering *just* the "500+ Power-Verbs DB and Cold Email Scripts" for a low-friction $9 impulse buy to recover ad spend.

## 3. Pending Implementation: Backend MVP & Tracking

This is the immediate next phase required before launching Meta Ads.

### A. Database Setup (Supabase)
- [ ] Choose and provision Supabase Postgres.
- [ ] Create schemas for `users` (email, magic_link_token), `transactions` (stripe_id, user_id, plan), and `resumes` (user_id, raw_text, AI_text).

### B. Authentication & Fulfillment
- [ ] Update Stripe Webhook (`/api/webhook/stripe/route.ts`) to listen for `checkout.session.completed`.
- [ ] Save successful purchase to Database.
- [ ] Generate secure "Magic Login Link" URL.
- [ ] Integrate Email Provider (Resend/SendGrid) to automatically shoot the login link to the customer.

### C. Core AI Engine Execution
- [x] Integrate a PDF extraction library (e.g., `pdf-parse`) into the `/api/analyze` route.
- [x] Connect OpenAI/Anthropic API to the Next.js backend.
- [x] Feed extracted PDF text + the pre-drafted "US Market Master Prompt" to the LLM.
- [x] Return real JSON data to populate the UI (replacing the current hardcoded mock data).
- [ ] Add `OPENAI_API_KEY` to Vercel Environment Variables.

### D. Meta Pixel Tracking (Critical)
- [x] Install Meta Pixel script in `layout.tsx`.
- [x] Configure standard events: `ViewContent` (Home), `InitiateCheckout` (Button Click), and `Purchase` (Success metrics with $ value).
- [ ] Add `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` to Vercel Environment Variables and redeploy.

## 4. Final Verification & Launch
- [ ] Perform End-to-End Test (Stripe Test Mode -> Email Received -> Click Magic Link -> Upload PDF -> AI Generation works).
- [ ] Verify Meta Pixel Helper fires all 3 events flawlessly.
- [ ] Go Live on standard domain.
