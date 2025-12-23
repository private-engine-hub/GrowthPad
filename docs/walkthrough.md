# GrowthPad Project Walkthrough (v3.0)

**Architecture**: Decoupled Monorepo (Next.js App Shell + Expo Mobile Shell)
**Status**: 🟢 Verified (Shared Brain Active)

## 1. Quick Start

### Installation
```bash
# Clean install
npm install
```

### Running the Project

If you are on Windows, you may need to bypass the execution policy:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force; yarn web

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force; yarn stop-web
```

```bash
# Web Shell (localhost:3000)
yarn web

# Mobile Shell (Expo Go)
yarn native

# Mobile Shell (Native iOS/Android)
cd apps/expo && yarn ios
# or
cd apps/expo && yarn android
```

---

## 2. Platform Architecture

### A. The Shared Brain (`packages/app`)
- **Location**: `packages/app`
- **Logic**: All data sourcing via `useWorkboard()`.
- **Types**: Strategic hierarchy (L1-L5).
- **Status**: **Plug & Play**. Currently in **Mock Mode**. To switch to **Live Mode**, see the [Backend Switchover Protocol](architecture.md#51-data-layer-strategy-dual-mode).

### B. The Panoramic Web Shell (`apps/next`)
- **Landing Page**: `apps/next/app/page.tsx` (centered, responsive SaaS template).
- **Dashboard**: `apps/next/app/platform/workboard/page.tsx` (SaaS wrapper with `DashboardShell` + Collapsible Sidebar).
- **Workboard Canvas**: `apps/next/components/layout/Canvas.tsx` (Horizontal Board via `ScrollArea`).

### C. The Pocket Mobile Shell (`apps/expo`)
- **Structure**: NativeWind v4 + Segmented Pillar Control.
- **Goal**: High-density execution feed.

---

## 3. Key Feature: The Horizontal Workboard
The Web Workboard uses a side-by-side **Pillar** layout.
- Horizontal scroll enabled across all 3 pillars (Financial, Operational, Market).
- Independent vertical scroll inside each pillar card.
- Component: `shadcn/ui` ScrollArea (Web-Native).

---

## 4. Verification
- Container centering applied globally to marketing routes.
- Branch protection prevents direct commits to `main`.

---

## 5. Release & Repository Integrity
We use an automated pipeline to maintain high software standards.
- **Commit Guard**: Husky + Commitlint enforce `type[scope]: message` format.
- **Branch Guard**: Direct commits to `main` are blocked; it only accepts merges from `dev`.
- **Automated Versioning**: Semantic Release manages versions based on commit history.
- **Registry**: `packages/app/version.ts` tracks the current build version across all shells.
