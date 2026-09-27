# 🗺️ GSD Project Roadmap — Smart Secure E-Voting System Frontend

> **Project:** Smart Secure E-Voting System Frontend  
> **Author / Target:** Harsh Yadav (B.Tech ECE IV, LNCT Bhopal) | SIH 2026 Submission + Portfolio  
> **Framework:** Next.js (App Router) + React 19 + TypeScript + Tailwind CSS (Dark Glassmorphism)  
> **GSD Status:** Active Execution (Phase 1 Foundation Setup)  
> **Last Updated:** 2026-09-27  

---

## 🎯 Executive Overview & Target Milestones

The **Smart Secure E-Voting System Frontend** is a 18-page digital voting platform built with Next.js, TypeScript, React 19, and Tailwind CSS. The system provides secure voter authentication, simulated Aadhar verification & biometric registration, live candidate filtering, vote confirmation with SHA-256 digital QR receipt generation, real-time election analytics, and an admin management portal.

```
Phase 1: Foundation & Global Layout (Header, Sidebar, Root Layout)   [✅ COMPLETED]
Phase 2: Core UI Component Library (StatCard, ProgressBar, FormInput) [✅ COMPLETED]
Phase 3: Auth System (Login, Signup, useAuth Hook)                    [✅ COMPLETED]
Phase 4: Voter Onboarding Flow (Aadhar, Biometric, Notifications)      [🚀 READY TO PLAN]
Phase 5: Dashboard & Election/Candidate Interfaces                    [📋 PLANNED]
Phase 6: Voting Engine & Digital Receipt (useVoting, QR Code)         [📋 PLANNED]
Phase 7: Live Results & Voting History (Recharts, Timelines)          [📋 PLANNED]
Phase 8: User Profile & Security Audit Log                            [📋 PLANNED]
Phase 9: Help Center (FAQ, Voter Guide, Support Desk)                 [📋 PLANNED]
Phase 10: Admin Control Panel (/admin)                                [📋 PLANNED]
Phase 11: Responsiveness Audit & Testing                              [📋 PLANNED]
Phase 12: Deployment (Vercel) & SIH Submission Package                [📋 PLANNED]
```

---

## 📅 Detailed Phase Breakdown

### Phase 1: Foundation & Global Layout
- **Status:** 🚀 In Progress
- **Objectives:** Establish design tokens (`#0a0e27`, `#141829`, `#4ec9b0`), Header navigation bar, collapsible Sidebar, and Root layout wrapper.
- **Key Deliverables:**
  - `src/app/globals.css` glassmorphism tokens
  - `src/components/Header.tsx` (Top bar, logo, status badge)
  - `src/components/Sidebar.tsx` (Left navigation with 18 route links)
  - `src/app/layout.tsx` (Root App Layout wrapper)

---

### Phase 2: Core UI Components
- **Status:** 📋 Planned
- **Objectives:** Build reusable UI primitives tailored for dark glassmorphism layout.
- **Key Deliverables:**
  - `src/components/StatCard.tsx`
  - `src/components/ProgressBar.tsx` (40%, 60%, 80%, 100% onboarding indicators)
  - `src/components/Button.tsx` (Primary, Ghost, Danger, Loading)
  - `src/components/FormInput.tsx` (Floating label, validation feedback)
  - `src/components/Modal.tsx` & `Alert.tsx`

---

### Phase 3: Authentication System
- **Status:** 📋 Planned
- **Objectives:** Implement user authentication UI and session persistence hook.
- **Key Deliverables:**
  - `src/app/login/page.tsx` (Email/Password + Google/Microsoft/Apple OAuth buttons)
  - `src/app/signup/page.tsx` (Registration form with multi-field validation)
  - `src/hooks/useAuth.ts` (Session context & localStorage wrapper)

---

### Phase 4: Voter Onboarding Flow
- **Status:** 📋 Planned
- **Objectives:** Multi-stage voter verification pipeline.
- **Key Deliverables:**
  - `src/app/aadhar-verify/page.tsx` (Aadhar 12-digit verification + OTP simulation)
  - `src/app/biometric/page.tsx` (4 scan options: Face, Fingerprint, QR, Iris)
  - `src/app/notifications/page.tsx` (Preference toggles, 5 languages)

---

### Phase 5: Dashboard & Election Exploration
- **Status:** 📋 Planned
- **Objectives:** Core voting dashboard and candidate exploration hub.
- **Key Deliverables:**
  - `src/app/page.tsx` (Dashboard home, KPI metrics, quick actions)
  - `src/app/elections/page.tsx` (Browse active & upcoming elections)
  - `src/app/candidates/page.tsx` & `CandidateCard.tsx` (Candidate profiles, search, party filters)

---

### Phase 6: Voting Engine & Digital Receipt
- **Status:** 📋 Planned
- **Objectives:** Vote submission, vote lock, and receipt generation.
- **Key Deliverables:**
  - `src/app/voting/page.tsx` (Vote preview & confirmation box)
  - `src/app/receipt/page.tsx` (QR Code canvas, SHA-256 hash, print/download buttons)
  - `src/hooks/useVoting.ts` (One-vote enforcement logic)

---

### Phase 7: Live Results & Analytics
- **Status:** 📋 Planned
- **Objectives:** Visualizing election outcome and personal voting record.
- **Key Deliverables:**
  - `src/app/results/page.tsx` (Recharts Pie/Line/Bar charts & candidate standings)
  - `src/app/voting-history/page.tsx` (Historical vote log & receipt lookups)

---

### Phase 8: Profile & Security Audit
- **Status:** 📋 Planned
- **Objectives:** User identity overview and account security tools.
- **Key Deliverables:**
  - `src/app/profile/page.tsx` (Personal info & biometric status grid)
  - `src/app/security/page.tsx` (Password reset, active sessions, security audit log)

---

### Phase 9: Help Center & Support Desk
- **Status:** 📋 Planned
- **Objectives:** Voter assistance, guides, and contact options.
- **Key Deliverables:**
  - `src/app/faq/page.tsx` (6 accordion Q&A cards)
  - `src/app/guide/page.tsx` (6-step voter guide)
  - `src/app/support/page.tsx` (4 support channels & contact form)

---

### Phase 10: Admin Control Panel
- **Status:** 📋 Planned
- **Objectives:** Platform administration & operational oversight.
- **Key Deliverables:**
  - `src/app/admin/page.tsx` (Turnout stats, user table, system health 99.99%)

---

### Phase 11: Testing & Polish
- **Status:** 📋 Planned
- **Objectives:** Cross-device responsiveness and accessibility validation.
- **Key Deliverables:**
  - Mobile layout & touch-target check
  - `localStorage` initial seed state validation

---

### Phase 12: Deployment & SIH Package
- **Status:** 📋 Planned
- **Objectives:** Production deployment on Vercel and submission bundle.
- **Key Deliverables:**
  - Vercel live URL
  - Updated `README.md` & SIH project showcase

---

## 🛠 Tech Stack Summary

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Engine** | React 19, Lucide Icons, Framer Motion |
| **Styling** | Tailwind CSS v4 (Glassmorphic Theme `#0a0e27`, `#141829`, `#4ec9b0`) |
| **Data Viz** | Recharts |
| **State & Auth** | Custom Hooks (`useAuth`, `useVoting`, `useBiometric`), localStorage |
| **Deployment** | Vercel |

