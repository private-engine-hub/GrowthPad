# GrowthPad Project Walkthrough

**Architecture**: Universal Monorepo (Next.js App Router + Expo Router)
**Status**: 🟢 Verified (Universal Kanban Active)

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

## 2. Universal Layout Primitives

We have moved away from complex grid hacks to a stable **Universal Kanban** layout:

### A. Universal Board (`board-screen.tsx`)
- **Use Case**: Strategy Pillars (Financial, Operational, Market).
- **Behavior**: 
  - **Web**: Horizontal scrolling columns.
  - **Native**: Horizontal scrolling columns.
- **Why**: Ensures 100% parity between iOS and Web without complex platform forks.

### B. Standardized Z-Axis (`sheet.tsx`)
- **Use Case**: Job Details, Objective Settings.
- **Behavior**: 
  - **Web**: Slide-over Side Panel (uses `framer-motion`).
  - **Native**: Draggable Bottom Sheet (uses `@gorhom/bottom-sheet`).

## 3. Project Tour

### A. The Landing Page
- **URL**: `http://localhost:3000/`
- **Code**: `packages/app/features/landing/screen.tsx`
- **Features**: Hero section, aesthetic value props, "Get Started" CTA.

### B. The Workboard (Core Feature)
- **URL**: `/dashboard`
- **Code**: `packages/app/features/board/board-screen.tsx`
- **Features**: Interactive "Kanban Board" showing Strategy Pillars:
  - **Financial**: Revenue Goals
  - **Operational**: Team Efficiency
  - **Market**: Brand Position
- **Interaction**: 
  - Horizontal scroll to view all pillars.
  - **Click-to-Detail**: Clicking a Job card opens the Side Panel (Web) or Bottom Sheet (Native).

## 4. Verification
- Web build succeeds (Next.js 13 App Router).
- Workboard displays 3 columns side-by-side on Desktop.
- No hydration errors (NativeWind `styled` removed).
