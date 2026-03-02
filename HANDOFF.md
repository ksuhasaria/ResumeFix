# ResumeFix - Handoff Document

## 1. Overall Goal & Product Definition
**ResumeFix** is a paid resume improvement service for Indian job seekers (0–5 years experience). The core goal is to **increase interview callbacks** by using AI-powered tools to create perfectly clear, HR-friendly resumes. This is strictly a **one-time paid service** (not a subscription). We are building a high-converting, highly convincing single-page application tailored for mobile-first cold traffic (e.g., Meta Ads).

## 2. Target User & Guidelines
- **Target User**: Job seekers and switchers in India (0–5 years experience) who are not getting interview calls and suffer from resume anxiety or rejection fatigue.
- **Core Problem**: Users are often browsing on mobile devices via cold traffic (Meta Ads).
- **Tone & Copy Guidelines**: Simple, human, and non-technical. Focus on the "AI-powered" aspect but provide **no guaranteed outcomes**. Use language like: "improve chances," "increase callbacks," and "HR-friendly". Avoid robotic formatting terms.
- **Pricing**: Locked to a 2-tier model: **Standard (₹999)** and **Pro (₹4999)**.
- **Success Metrics (What Matters)**: Primary focus is on **Cost per purchase (CAC)** and **Purchase conversion rate**.

## 3. Work Completed in this Session
- Initialized a Next.js 15 (App Router) project with TypeScript, React, and CSS Modules.
- Developed a custom design system with global CSS variables for a premium glassmorphic aesthetic (`globals.css`).
- Built the core multi-step state management using React Context (`AppContext.tsx`).
- Created distinct component layers: FileUpload, RoleSelector, Payment, Analyzing, and Results dashboard (jsPDF + html2canvas integration).
- **Major Refactoring (Single Page Flow)**: Restructured the main `src/app/page.tsx` into an interactive "Action Card" in the Hero section, highly optimized for mobile users.
- **Audience & Copy Optimization**: Aligned copywriting to be human, non-technical, and focused on clarity ("Stop Getting Rejected. Start Getting Callbacks."). Added sections for "How it Works" and "Why Choose Us".
- **Pricing & Sticky CTA**: Implemented the locked 2-tier pricing model using CSS Grid. Added a sticky mobile call-to-action button to ensure constant accessibility.
- **Sales Page Variant (`/v2`)**: Developed a pure direct-response landing page bypassing mobile upload friction.
- Deployed the application continuously to Vercel via GitHub (`ksuhasaria/ResumeFix`).

## 4. Important Decisions & Context
- **Mobile-First Design Philosophy**: Switched from multi-page routing to an embedded interactive widget to increase conversion rates on mobile devices (99.9% of projected traffic).
- **Tone Pivot**: Deliberately moved away from guaranteed technical jargon towards empathetic, action-oriented messaging.
- **A/B Testing Strategy**: Established two distinct funnels for Meta Ads validation (`/` product-led vs `/v2` D2C direct-response).
- **Backend Mocking**: `/api/analyze/route.ts` remains mocked for development and initial deployment. 
- **Dependencies Installed**: `lucide-react`, `framer-motion`, `jspdf`, `html2canvas`, `clsx`, `tailwind-merge`.

## 5. Immediate Next Steps
- **Database & Storage Integration**: Implement MongoDB Atlas (via Mongoose) for capturing user/lead information and Vercel Blob for storing the uploaded PDF/DOCX resumes. Wait for `MONGODB_URI` and `BLOB_READ_WRITE_TOKEN`.
- **Backend Implementation (AI Parsing)**: Replace the `/api/analyze` mock with actual AI integration (e.g. Gemini/OpenAI) and file processing.
- **Live Payment Gateway**: Integrate Razorpay/Cashfree for real UPI/Card transactions.
- **Final Polish**: Further audit the Result dashboard's PDF layout to ensure cross-device consistency.
