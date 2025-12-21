# GrowthPad Architecture (v3.0)

**Current Version**: 3.0 (Decoupled Shells)
**Last Updated**: 2025-12-21
**Strategic Pivot**: Shared Brain, Decoupled Shells

## 1. Executive Summary
GrowthPad employs a **"Shared Brain, Decoupled Shells"** architecture. We have abandoned "Universal UI" in the presentation layer to deliver elite, platform-native experiences while maintaining 100% logic parity.

1.  **Web Shell (`apps/next`)**: A single, responsive Next.js application targeting both **Desktop** (Panoramic layout) and **Mobile-Web** (Responsive/Touch-optimized) using standard web tech.
2.  **Native Shell (`apps/expo`)**: A high-agency mobile experience targeting **iOS** and **Android** using React Native primitives.
3.  **The Brain (`packages/app`)**: The shared source of truth for logic and state.

These two shells consume one **Brain** to deliver a consistent experience across four hardware targets.

---

## 2. Directory Structure

```bash
growthpad/
├── apps/
│   ├── next/              # WEB SHELL (Next.js + shadcn/ui)
│   │   ├── app/           # App Router (page.tsx, dashboard/, login/)
│   │   ├── components/    # Web-native UI (layout/, ui/, board/)
│   │   └── tailwind.config.js # Configured for standard Web centering
│   └── expo/              # NATIVE SHELL (React Native + NativeWind)
│       └── features/      # Mobile-optimized strategic feed
└── packages/
    └── app/               # THE BRAIN (Shared Central Logic)
        ├── hooks/         # useWorkboard(), useJobs()
        ├── types/         # L1-L5 Strategic Cascade Interfaces
        └── nativewind-env.d.ts # Shared type definitions
```

---

## 3. Web Shell Specifications (`apps/next`)

We use **Standard Web Primitives** to ensure 0% layout shift (CLS) and 100% SEO/Performance.

*   **Framework**: Next.js (App Router) + Tailwind + shadcn/ui (Radix).
*   **Decoupled Layout**: `DashboardShell.tsx` implements the SaaS wrapper using standard `header`, `aside`, and `main` tags.
*   **Horizontal Canvas**: `Canvas.tsx` uses `shadcn/ui` `ScrollArea` for a "Trello-style" side-by-side pillar layout.
*   **Pillars**: Fixed-width (`350px`) cards with internal scroll areas.
*   **Anti-Pattern**: Importing `View`, `Text`, or `Pressable` from `react-native` in the web shell is strictly forbidden.

---

## 4. Mobile Shell Specifications (`apps/expo`)

We focus on **Linear Command** density for the pocket experience.

*   **Navigation**: `PillarSegmentedControl` filters the view (Financial | Operational | Market).
*   **Cascade**: Recursive accordions (L3 -> L4 -> L5) preserve the strategic weight.
*   **Editing**: Native Bottom Sheets (`@gorhom/bottom-sheet`) for deep task interaction.

---

## 5. The Shared Brain (`packages/app`)

Both shells consume the same "Brain" via the monorepo.

*   **Logic Hooks**: `useWorkboard()` returns a nested L1-L5 object. The shells are "dumb" and only loop through this data.
*   **Type Safety**: The L1-L5 Strategic Cascade is the core interface for both platforms.
*   **Hydration**: By using standard HTML on Web, we avoid React Native Web hydration mismatches entirely.

---

## 6. Technical Protocol

*   **Bypassing Policies**: Use `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force` to run `npm run build` or `yarn web` in restricted environments.
*   **Clean Builds**: Always clear `.next` cache if layout shifts appear unexplainable.
*   **NativeWind**: Restricted to the "Brain" and "Native Shell". Web uses standard Tailwind utilities.
