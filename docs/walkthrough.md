# GrowthPad Project Walkthrough

**Architecture**: Universal Monorepo (Next.js App Router + Expo Router)
**Status**: 🟢 Verified (Universal Layout Engines Active)

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

We have moved away from basic primitives to a rigid, platform-aware Layout Engine:

### A. Universal Canvas (`universal-canvas.tsx`)
- **Use Case**: Multi-column grids (Strategy Pillars).
- **Fix**: Resolves the "ScrollView div wrapper" bug on Web.
- **Behavior**: 3 columns on Desktop, 1 column on Mobile.

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
- **Code**: `packages/app/features/workboard/screen.tsx`
- **Features**: Interactive "Card Cascade" showing Strategy Pillars:
  - **Financial**: Revenue Goals
  - **Operational**: Team Efficiency
  - **Market**: Brand Position
- **Interaction**: 
  - Accordion expansion of Objectives.
  - **Click-to-Detail**: Clicking a Job card opens the Side Panel (Web) or Bottom Sheet (Native) via the `Sheet` primitive.

## 4. Verification
- Web build succeeds (Next.js 13 App Router).
- Workboard displays 3 columns on Desktop.
- Side Panel opens on card click.
- Single column layout verified for Mobile screens.
