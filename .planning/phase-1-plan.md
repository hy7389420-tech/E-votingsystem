# 📋 Phase 1 Execution Plan — Foundation & Global Layout

> **Phase:** Phase 1 — Foundation & Global Layout  
> **Status:** Ready for Execution  
> **Estimated Duration:** 1–2 Days  
> **Target Files:**
> - `src/app/globals.css` (Glassmorphic Design Tokens & Global CSS)
> - `src/components/Header.tsx` (Fixed 70px Navigation Header)
> - `src/components/Sidebar.tsx` (Fixed 280px Collapsible Sidebar with 18 Routes)
> - `src/app/layout.tsx` (App Shell Wrapper & Route-based Layout Logic)

---

## 🎯 Phase Objectives
1. **Design System Baseline**: Establish the exact dark glassmorphism theme (`#0a0e27` background, `#141829` card background, `#4ec9b0` primary teal) in CSS custom properties and utility classes.
2. **Top Navigation Header**: Create a responsive top navigation bar featuring the SIH 2026 E-Voting brand logo, voter verification badge, notification bell, and user avatar dropdown.
3. **Left Navigation Sidebar**: Build a 280px left sidebar listing all 18 application routes categorized cleanly into Navigation, User & Onboarding, Help, and Admin sections.
4. **App Shell Layout**: Configure `layout.tsx` to handle responsive drawer toggling and automatically apply the full-screen layout for authentication pages (`/login`, `/signup`) versus the shell layout for app pages.

---

## 🛠️ Step-by-Step Task Checklist

### Step 1: Design System & CSS Utility Setup
- [x] Define CSS color variables in `src/app/globals.css` (`--bg-main`, `--bg-card`, `--color-teal`, `--color-blue`, `--color-cyan`, `--color-purple`, `--text-primary`, `--text-muted`).
- [x] Implement `.glass-card` utility with `backdrop-filter: blur(16px)`, gradient border `rgba(78, 201, 176, 0.18)`, and subtle shadow.
- [x] Add custom scrollbar styling and font settings (Inter / system-ui).

### Step 2: Build Header Component (`src/components/Header.tsx`)
- [x] Create sticky top header container (`h-[70px]`, dark glassmorphic background).
- [x] Add brand emblem: `⚡ Smart Secure E-Voting` with teal gradient title.
- [x] Include status indicator pill: `✅ Aadhar Verified` (`#10b981` background glow).
- [x] Add notification bell with unread badge counter.
- [x] Add user avatar button with user name (`Harsh Yadav`) and role badge (`Voter / B.Tech ECE`).
- [x] Add mobile hamburger toggle button triggering sidebar drawer.

### Step 3: Build Sidebar Component (`src/components/Sidebar.tsx`)
- [x] Create 280px fixed sidebar container with glassmorphic border right.
- [x] Add 18 navigation links organized in 4 distinct groups:
  1. **Core Hub**: Dashboard (`/`), Elections (`/elections`), Candidates (`/candidates`), Voting (`/voting`), Receipt (`/receipt`), Results (`/results`)
  2. **Onboarding & Verification**: Aadhar Verify (`/aadhar-verify`), Biometric Setup (`/biometric`), Preferences (`/notifications`)
  3. **User Account**: Profile (`/profile`), Security (`/security`), Voting History (`/voting-history`)
  4. **Support & Admin**: FAQ (`/faq`), Voter Guide (`/guide`), Support (`/support`), Admin (`/admin`)
- [x] Implement active route detection (`usePathname`) with glowing left indicator bar and active teal text.
- [x] Implement responsive mobile overlay for sidebar slide-out.

### Step 4: Root Layout Integration (`src/app/layout.tsx`)
- [x] Set up metadata (Title: "Smart Secure E-Voting System | SIH 2026", Meta Description, Viewport settings).
- [x] Configure `RootLayout` component wrapping `Header` and `Sidebar`.
- [x] Exclude Header & Sidebar when pathname is `/login` or `/signup` to allow clean full-page auth screens.
- [x] Test application shell rendering with `npm run build`.

---

## 🧪 Verification Criteria
- [x] Navigation header sticky at 70px height with crisp logo and avatar.
- [x] Sidebar highlights current active link seamlessly when clicking through routes.
- [x] Glassmorphism backdrop blur renders without graphical glitches on Chrome/Firefox/Edge.
- [x] Mobile screen width (<768px) correctly collapses sidebar into a slide-out drawer triggered by hamburger icon.
- [x] Production build passes cleanly with zero TypeScript errors (`npm run build`).
