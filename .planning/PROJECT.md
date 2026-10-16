# 📌 GSD Project Manifest — Smart Secure E-Voting System

> **Project Name:** Smart Secure E-Voting System Frontend  
> **Author:** Harsh Yadav (B.Tech ECE IV, LNCT Bhopal)  
> **Target Event:** Smart India Hackathon (SIH 2026) + Professional Portfolio  
> **Framework:** Next.js (App Router), React 19, TypeScript  
> **Styling:** Tailwind CSS (Dark Glassmorphism Theme)  

---

## 🎯 1. One-Line Project Summary
A complete, 18-page modern web voting platform featuring multi-layered voter authentication, simulated Aadhar verification & biometric onboarding, live candidate filtering, vote confirmation with SHA-256 digital QR receipt generation, real-time analytics with interactive charts, user profile & security audit logs, and an admin management dashboard.

---

## 🎨 2. Design System Tokens
- **Theme:** Dark Glassmorphism ONLY (No light mode toggle)
- **Primary Color:** `#4B4FD8`
- **Accent Color:** `#7C83FD`
- **Main Background:** `#14163A`
- **Card Background:** `rgba(26, 29, 74, 0.65)` (`#1A1D4A`)
- **Card Border:** `rgba(124, 131, 253, 0.25)`
- **Success:** `#10B981` | **Warning:** `#F59E0B` | **Error:** `#EF4444`
- **Primary Text:** `#EEF0FF` | **Muted Text:** `#A5AAD6`

---

## 📱 3. Core Pages Blueprint (18 Routes)
1. `/login` — Login Page with email/password & OAuth options
2. `/signup` — Account Registration Page
3. `/aadhar-verify` — Identity Verification (Onboarding Step 2/5 - 40%)
4. `/biometric` — Biometric Scan Registration (Face, Fingerprint, QR, Iris - Step 3/5 - 60%)
5. `/notifications` — Preferences & Settings Setup (Step 4/5 - 80%)
6. `/` — Main Dashboard Home with KPI stats, quick links & charts
7. `/elections` — Active & Upcoming Elections Browsing
8. `/candidates` — Candidates Search & Filter Hub
9. `/voting` — Vote Confirmation & Mandatory Agreement
10. `/receipt` — Digital QR Receipt Generator & SHA-256 Hash Display
11. `/results` — Real-Time Election Analytics & Standings (Recharts)
12. `/voting-history` — Personal Voting Log & Receipt Lookup
13. `/profile` — User Information & Verified Biometrics Status
14. `/security` — Password Change, Active Sessions & Security Audit Log
15. `/faq` — Interactive Q&A Accordion Cards
16. `/guide` — Step-by-Step 6-Stage Voter Guide
17. `/support` — 4 Contact Channels & Support Ticket Form
18. `/admin` — Operational Admin Panel & System Analytics

---

## 🏗️ 4. Application Architecture
```
src/
├── app/                      [18 app router routes]
│   ├── layout.tsx            [Root layout with Header & Sidebar]
│   ├── page.tsx              [Dashboard Home]
│   ├── globals.css           [Glassmorphic CSS variables & styles]
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── aadhar-verify/page.tsx
│   ├── biometric/page.tsx
│   ├── notifications/page.tsx
│   ├── elections/page.tsx
│   ├── candidates/page.tsx
│   ├── voting/page.tsx
│   ├── receipt/page.tsx
│   ├── results/page.tsx
│   ├── voting-history/page.tsx
│   ├── profile/page.tsx
│   ├── security/page.tsx
│   ├── faq/page.tsx
│   ├── guide/page.tsx
│   ├── support/page.tsx
│   └── admin/page.tsx
├── components/               [Reusable UI Components]
│   ├── Header.tsx            [Top bar - 70px]
│   ├── Sidebar.tsx           [Left sidebar - 280px]
│   ├── StatCard.tsx          [KPI stats display]
│   ├── ProgressBar.tsx       [Onboarding progress]
│   ├── CandidateCard.tsx     [Candidate profile card]
│   ├── Button.tsx            [Button component]
│   ├── FormInput.tsx         [Form input field]
│   ├── Alert.tsx             [Notification alert]
│   └── Modal.tsx             [Popup modal]
├── hooks/                    [Custom Hooks]
│   ├── useAuth.ts            [Auth & session management]
│   ├── useVoting.ts          [Voting & receipt logic]
│   └── useBiometric.ts       [Biometric status management]
└── lib/                      [Utilities & Helpers]
    ├── utils.ts              [Helper functions]
    └── mockData.ts           [Mock election, voter & candidate data]
```
