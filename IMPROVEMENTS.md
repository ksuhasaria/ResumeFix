# 🚀 Pricing & CTA Redesign Plan (Meta Ads Focus)

## I. The Problem with Current Pricing

1.  **Too Much Choice (Paradox of Choice):** Two plans ($29 and $99) side-by-side make the user stop and think. High friction on cold traffic.
2.  **Confusing "Get Access for $29" CTA:** The sticky banner promises $29, but then scrolls them to a section where they see a $99 option. This feels like a bait-and-switch or causes hesitation.
3.  **Low Value Perception:** A basic two-column pricing table feels like SaaS software, not an "insider career tool" or a limited-time high-value bundle.

## II. The Solution: "The One Offer" Approach (Direct Response Style)

For impulse buys on Meta, we need **One Clear Offer** that feels like an absolute steal, with zero choices to make on the main page. A bump offer (the $99 stuff) should happen *after* they decide to buy the main thing, or we just sell one high-value bundle outright.

### Option A: The "Godfather" Bundle (Single Price Point - Recommended)

*   **Concept:** Kill the $29 VS $99 confusion. We offer ONE package.
*   **The Price:** $49 (or $39/$49 depending on testing).
*   **The Pitch:** "The Complete M7 Interview Protocol." It contains the resume engine + the bonuses (verbs, email scripts).
*   **Visuals:** Instead of a pricing comparison table, it's a massive "Stack" visual indicating insane value.
*   **Example Layout:**
    *   **Headline:** Get The Complete M7 Protocol Today
    *   **Checklist (The Stack):**
        *   ✅ Lifetime ResumeFix AI Engine ($299 Value)
        *   ✅ The 500+ Power-Verbs DB ($49 Value)
        *   ✅ 5 Proven Cold Email Scripts ($99 Value)
        *   ✅ LinkedIn Opt. Checklist ($49 Value)
    *   **Total Value:** <strike>$496</strike>
    *   **Today's Price:** **$49** (One-Time)
    *   **Button:** Lock In Lifetime Access Now
*   **Why this works:** The CTA buttons everywhere ("Get Access for $49") map 1:1 to exactly what they see. No scrolling, no decisions. Just "Yes" or "No."

### Option B: The "Core + Order Bump" (Checkout Upsell)

*   **Concept:** Keep the $29 offer on the main page. But remove the $99 box completely from `page.tsx`.
*   **The Pitch (Main Page):** You are purely selling the AI Resume Engine for $29. The whole page only talks about this.
*   **The Upsell:** When they click "Get Access for $29", they go to a custom checkout page (or a Stripe checkout with an Order Bump enabled). There, they see: *"Wait! Add the '1% Bundle' (Verbs, Scripts, Review) for just $49 more."*
*   **Why this works:** It keeps the entry price low ($29) to get high CTR and conversion, but captures the higher AOV on the backend where they are already in buying mode.

## III. Changes Needed Based on Chosen Approach

If **Option A (Single Bundle)** is chosen:
1.  Completely remove the 2-column pricing grid in `page.tsx`.
2.  Replace it with a single, high-converting "Offer Stack" box.
3.  Update all sticky CTAs and Hero buttons to reflect the single price.
4.  Update Stripe integration to use the single price ID.

If **Option B (Core + Upsell)** is chosen:
1.  Remove the "Pro" pricing box from `page.tsx`. Center the "Standard" box.
2.  Make the copy laser-focused on the $29 value.
3.  We will need to configure Stripe to offer the Pro package as a cross-sell/upsell during the checkout flow, or build a custom intermediary page before Stripe.

---
**ACTION REQUIRED:** User needs to review this document and select **Option A** or **Option B** before we proceed with implementation.
