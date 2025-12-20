# Development Log

**Project**: GrowthPad
**Start Date**: 2025-12-18

## Status: 🟢 STABLE (Flow Complete)

---

### 2025-12-20: Feature Injection & SaaS Flow
**Objective**: Connect Marketing, Login, and Platform for a "Complete" app experience.

- **Action**: 
    - Created **Universal `Button` Component** (`packages/app/ui/button.tsx`) with built-in `href` navigation support.
    - Implemented high-fidelity **`LoginScreen`** (`packages/app/features/auth/login-screen.tsx`) optimized for Supabase-style Google Auth.
    - Rewired `LandingScreen` to move from manual `Pressable` hooks to standard `Button` navigation.
    - Established the routing flow: `Landing` (/) -> `Login` (/login) -> `Dashboard` (/dashboard).
- **Result**: "Zero-wiring" navigation achieved across the monorepo; app now feels like a unified product.

### 2025-12-20: The "App Router" Migration (Major Milestone)
**Objective**: Fix split architecture (Pages vs Expo Router) and resolve CSS layout issues.

- **Problem**: The "Sidebar Missing" bug was traced to a conflict between Next.js Pages Router and NativeWind v4 styling injection, plus a legacy layout model.
- **Action**: 
    - Migrated `apps/next` from Pages Router to **App Router**.
    - Created `apps/next/app/layout.tsx` with NativeWind Registry.
    - Implemented `apps/next/app/dashboard/layout.tsx` to enforce the SaaS Shell.
    - Updated shared components to use `solito/navigation` (App Router compatible) instead of `solito/router` (Legacy).
- **Result**: Visual parity achieved. Sidebar visible. Routing logic unified.

### 2025-12-20: Workboard & Landing Implementation
**Objective**: Create "Proper Website" assets.

- **Action**:
    - Built `LandingScreen.tsx` with high-converting "Hero" section.
    - Built `WorkboardScreen.tsx` with mocked strategy data.
    - Implemented `DashboardLayout.tsx` (Universal Wrapper).
    - **Fix**: Added `h-screen` to Web Layout to prevent flexbox collapse.

### 2025-12-20: TypeScript Configuration Cleanup
**Objective**: Resolve "noEmit vs composite" conflicts in root `tsconfig.json`.

- **Action**: 
    - Simplified root `tsconfig.json` to only reference `packages/app`.
    - Removed `composite` and `declaration` flags from `apps/next` and `apps/expo`.
    - Standardized the **Supplier vs Consumer** model for project references.
- **Result**: IDE errors in root `tsconfig.json` resolved; build stability improved.

### 2025-12-20: Operational "Keel-Clearance"
**Objective**: Handle orphan Node.js processes in Windows.

- **Action**: 
    - Added `kill-ghost` script to root `package.json` to safely terminate processes on ports 3000-3002.
    - Documented "Clean Stop" practices to prevent monorepo background leakage.

### 2025-12-19: Monorepo Setup
**Objective**: Initialize Solito + NativeWind v4.

- **Action**:
    - Cloned `mikevocalz/solito-nativewind-v4`.
    - Configured TypeScript Solution Mode (`composite: true`).
    - Fixed `nativewind/jsx-runtime` types.

---

## Upcoming Roadmap
1.  **Authentication**: Secure `/dashboard` with Supabase or Clerk.
2.  **Detail Panel**: Activate the 3rd column for Job/Objective details.
3.  **Theme**: Add Dark Mode toggle.
