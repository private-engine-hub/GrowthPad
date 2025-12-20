# GrowthPad Project Walkthrough

**Architecture**: Universal Monorepo (Next.js App Router + Expo Router)
**Status**: 🟢 Verified

## 1. Quick Start

### Prerequisites
- Node.js 18+
- Yarn 3+ (Berry)

### Installation
```bash
# Clean install (Recommended after migration)
yarn clean
yarn
```

### Running the Project
```bash
# Web (localhost:3000) - Now uses App Router
yarn web
 # OR If you have permission issues, use the Bypass scope:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force; yarn web

# Native (iOS/Android Simulator)
yarn native

# Cleanup (If post-exit processes are still running)
yarn kill-ghost
```

## 2. Project Tour

### A. The Landing Page
- **URL**: `http://localhost:3000/`
- **Code**: `packages/app/features/landing/screen.tsx`
- **Features**: Hero section, aesthetic value props, "Get Started" CTA.
- **Architecture**: Injected into `apps/next/app/page.tsx` and `apps/expo/app/index.tsx`.

### B. The Login / Sign-In Flow
- **URL**: `http://localhost:3000/login`
- **Code**: `packages/app/features/auth/login-screen.tsx`
- **Features**: High-fidelity "Continue with Google" card, Supabase-ready.
- **Architecture**: Connected via the universal `Button` component with zero manual wiring.

### C. The Dashboard (SaaS Shell)
- **URL**: `http://localhost:3000/dashboard`
- **Code**: `packages/app/ui/dashboard-layout.tsx`
- **Structure**: 
  - **Sidebar**: Left column, fixed width. Blue branding.
  - **Topbar**: Search, User Profile, Breadcrumbs.
- **Architecture**: Enforced by `apps/next/app/dashboard/layout.tsx`.

### C. The Workboard (Core Feature)
- **URL**: `/dashboard`
- **Code**: `packages/app/features/workboard/screen.tsx`
- **Features**: Interactive "Card Cascade" showing Strategy Pillars:
  - **Financial**: Revenue Goals
  - **Operational**: Team Efficiency
  - **Market**: Brand Position
- **Interaction**: Accordion expansion of Objectives and Jobs.

## 3. Verification
- Web build succeeds (Next.js 13 App Router).
- Landing page renders.
- Dashboard Sidebar renders (Blue).
- Navigation from Landing -> Dashboard works.
