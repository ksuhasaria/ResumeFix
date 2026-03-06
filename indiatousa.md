# Website Target Audience Shift: India to USA

This document outlines the comprehensive plan and scope of work required to successfully transition ResumeFix's target audience from Indian job seekers (0-5 Yrs Exp) to US-based job seekers in the current competitive market.

---

## 1. Copywriting & Messaging Overhaul
The fundamental pain points remain the same (ATS rejection, no callbacks), but the context and terminology are very different in the US.

### A. Terminology Shifts
- **"Resume" vs. "CV":** In the US, "CV" is strictly for academic/medical roles. Always use "Resume" for tech/corporate roles.
- **"Fresher" / "Experience" bands:** US market rarely uses the term "fresher". Replace with "Entry-Level", "Recent Grad", or "Junior". 
- **"LPA" (Lakhs Per Annum):** Switch all salary references to "$80k-$120k+" bands.
- **"HR-Friendly":** While understood, US candidates respond better to "Recruiter-Optimized", "ATS-Beating", or "Hiring Manager Approved".

### B. Landing Page Copy Updates (`src/app/page.tsx` & `src/app/v2/page.tsx`)
- **Hero Hook:** Change "Built for Indian Job Seekers" to "Built for the Highly Competitive US Tech Market".
- **Pain Point Reframing:** Agitate the pain of "Ghost jobs," "Fake job postings," and competing against "500+ applicants in 2 hours on LinkedIn." 
- **The "Ugly Truth" Hook (/v2):** Update the context. "Exposed: The Dark Truth about US Tech Hiring in 2026."

---

## 2. Visual & Social Proof Localization
Social proof must resonate instantly. An American user won't connect with local Indian tech companies as heavily as they would with US unicorns or FANG.

### A. Trust Banners
- **Current:** TCS, Infosys, Wipro, Zomato, Amazon.
- **New Array Ideas:** Google, Meta, Amazon, Stripe, Coinbase, Salesforce, HubSpot, or generally "Hired at Top Fortune 500 & YC Startups".

### B. Testimonials & Avatars
- **Names & Roles:** Change from Rahul/Priya/Arjun to names/demographics representative of the US tech workforce (e.g., Sarah, Michael, David).
- **Locations:** Change references from Bangalore/Gurgaon to San Francisco, Austin, New York, or "Remote Startups".
- **Content:** Shift focus slightly. Instead of just getting "callbacks," highlight beating the ATS and securing "6-figure offers."

### C. The "Before & After" Screenshot 
- The "Before" resume should look like a standard American college grad template or a heavily formatted Canva resume.
- The "After" should strictly adhere to the **Harvard Business School/WSO (Wall Street Oasis)** 1-column format, which is the gold standard in the US for tech and finance.

---

## 3. Pricing, Offers, & Economics
The US market supports significantly higher Average Order Values (AOV), but acquisition costs (CPA) on Meta are also much higher.

### A. Price Points
- The current $29 (Standard) / $99 (Pro) pricing is perfectly aligned for an impulse D2C purchase in the US. 
- *Consideration:* If Meta CPAs in the US are touching $30+, we may need to increase the base price to $39 or $49 to maintain healthy margins, or push the $99 "Pro" bundle aggressively.

### B. Bundle Adjustments (The $99 Tier)
- Ensure the "Cold Email Swipe Files" are tailored to networking on LinkedIn or emailing US-based technical recruiters.
- "30-Min Zoom Review" must account for US time zones (EST/PST). 

---

## 4. Technical / Infrastructure Adjustments

### A. Stripe Regional Settings
- Ensure Stripe Checkout is localized. It defaults well, but ensure ZIP code validation is enabled for US cardholders (reduces fraud and card declines significantly in the US).
- Address any tax compliance (e.g., enabling Stripe Tax if sales tax nexus applies in the US).

### B. AI Prompt Adjustments (Backend generation)
- When we build the actual AI backend, the master prompt must explicitly instruct the LLM: 
   *"Write in American English (e.g., analyze, optimize). Adhere strictly to US corporate standards. Do not include personal details like age, marital status, or photos (which are illegal/frowned upon in US hiring)."*

---

## 5. Long-Form Landing Page Architecture (Pabbly Style)
To maximize conversions on high-intent US traffic, we will transition from a traditional SaaS layout to a continuous-scroll, high-conversion direct-response page.

### A. The "Pabbly" Content Structure
1.  **The Hook (Above the Fold):** Headline tearing down the ATS system + Video/GIF demonstrating the product in 10 seconds + CTA 1.
2.  **The Agitation Phase:** Deep dive into the pain. Use statistics (e.g., "75% of US resumes are rejected by bots").
3.  **The "Ah-Ha" Solution Phase:** Introduce ResumeFix not as software, but as a "Cheat Code" for getting past the ATS.
4.  **Deep Social Proof (The Wall of Love):** Heavy stacking of testimonials. Embed screenshots of actual tech offer letters or LinkedIn DMs praising the product.
5.  **The Mechanism Breakdown:** Show *exactly* how the AI reformats bullet points into the WSO/Harvard layout.
6.  **The Irresistible Offer Stack:** Present the Pro bundle.
7.  **The Risk Reversal (Guarantee):** Massive badge for the 100% money-back guarantee.
8.  **FAQ & Final CTA:** Address core objections directly.

### B. Multiple Strategic CTAs
Never let the user scroll for more than two screen heights without seeing a CTA button.
-   **Header:** Sticky "Get Access for $29" button on scroll.
-   **Post-Hook:** "Show Me My Next Resume"
-   **Post-Testimonials:** "Join Sarah and 5,000+ Others"
-   **Pricing Section:** "Claim The Lifetime Deal"
-   **Footer:** "Start Getting Callbacks Today"

### C. The "Irresistible Offer" Stack
We need to make the $99 Pro tier feel like a $1,000 value. We do this by *stacking* the perceived value.
-   **Core:** Lifetime ResumeFix AI Engine ($299 Value)
-   **Bonus 1:** The 500+ Power-Verbs Database ($49 Value)
-   **Bonus 2:** 5 Proven Cold Email Scripts for Tech Recruiters ($99 Value)
-   **Bonus 3:** The LinkedIn Profile Optimization Checklist ($49 Value)
-   **Bonus 4:** Priority 1-on-1 Async Review by a FAANG Recruiter ($199 Value)
-   **Total Perceived Value:** $695
-   **Today's Price:** $99 (One-Time Payment)

### D. Trust Elements & Objection Handling
-   **Badges:** Add McAfee Secure, Norton Secured, and Stripe Checkout badges directly beneath the pricing buttons.
-   **FAQ Focus:** Address security ("Is my data used to train AI? No."), formatting ("Will this pass Workday and Greenhouse ATS? Yes."), and speed ("How long does it take? 3 minutes.").

---

## 6. Strategic Recommendation: Option 1 (Widget) vs Option 2 (/v2 Sales Page)

**Recommendation: Go 100% all-in on Option 2 (The /v2 Long-Form Sales Page). Abandon the Option 1 interactive widget for your core Meta Ads strategy.**

Running two completely different funnels requires double the tracking, double the ad creative testing, and double the optimization effort. Here is why the `/v2` architecture is the undeniable winner for the US market strategy we just mapped out:

1.  **The "Mobile Upload" Bottleneck is Fatal in the US:** US users scrolling Facebook/Instagram on their iPhones do not have their latest PDF resumes saved in their local files. Option 1 forces them to upload a file *before* paying. When they realize they don't have the file, they bounce, and you lose the lead forever.
2.  **The "Pabbly" Style Requires Real Estate:** You cannot execute a deep, High-AOV ($99) value stack inside a tiny interactive widget box. You need the long-form scroll of `/v2` to agitate the pain, build the trust, and explicitly stack the bonuses.
3.  **D2C "Info-Product" Psychology:** Option 1 sells *software* (a tool you use). Option 2 sells a *solution* (a lifetime asset you buy now and use later). Selling the solution upfront with a 100% guarantee creates frictionless impulse buying.
4.  **Action Plan Adjustment:** We will migrate the `/v2` code to be the primary `page.tsx` (the root `/` route) and deprecate the interactive widget. This focuses 100% of your energy on optimizing one highly tuned conversion machine.

---

## Action Plan & Scope Checklist

### Phase 0: Codebase Consolidation
- [ ] Migrate `src/app/v2/page.tsx` code to replace the current `src/app/page.tsx`.
- [ ] Delete the `/v2` directory to clean up routing.

### Phase 1: Core Copy & Asset Replacement
- [ ] Sweep the new main landing page and rewrite all headlines, subheads, and bullet points for the US market.
- [ ] Replace the 3 testimonial blocks (names, avatars, text).
- [ ] Update the company logo/trust banner list.
- [ ] Redesign the "Before / After" visual in `/v2` to feature a US-style resume template.

### Phase 2: AI & Output Preparation
- [ ] Finalize the "Harvard/WSO 1-column" design for the actual PDF export in `Results.tsx`.
- [ ] Draft the US-specific master prompt strategy for the AI generation phase.

### Phase 3: Launch Prep
- [ ] Deploy changes to a staging branch to verify all Indian references are removed.
- [ ] Launch US-targeted Meta Ad campaigns testing the `$29` vs `$99` price points.
