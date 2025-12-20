# GrowthPad Architecture (2025 Standard)

**Current Version**: 2.0 (Unified App Router)
**Last Updated**: 2025-12-20

## 1. Executive Summary
GrowthPad is a high-performance, cross-platform SaaS application built on the **Universal Monorepo** pattern. It targets Web (Next.js), iOS, and Android (Expo) with >95% code sharing.

The architecture strictly adheres to the **"Write Once, Run Everywhere"** philosophy using **Solito** for navigation bridge and **NativeWind v4** for universal styling.

## 2. Tech Stack Reference

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Web Framework** | **Next.js 13+** | App Router | Server Components, SEO, Layouts |
| **Native Framework** | **Expo** | SDK 49/50 | Native Runtime, File-based Routing |
| **Monorepo Tool** | **Turborepo** | Latest | Build Pipeline, Caching |
| **Styling** | **NativeWind** | v4 | Universal Tailwind CSS |
| **Navigation** | **Solito** | Latest | Bridge between Next.js & Expo Router |
| **Icons** | **Lucide** | React Native | Universal Icon System |

## 3. Directory Structure

```graphql
growthpad/
├── apps/
│   ├── expo/
│   │   └── app/            # Native Navigation (Expo Router)
│   │       ├── _layout.tsx # Native Root Stack
│   │       └── index.tsx   # Entry Point
│   └── next/
│       └── app/            # Web Navigation (App Router)
│           ├── layout.tsx  # Web Root Layout (HTML/CSS)
│           └── registry.tsx# NativeWind Style Registry
├── packages/
│   └── app/                # SHARED KERNEL
│       ├── features/       # Screens & Business Logic
│       │   ├── workboard/  # Strategy Workboard Feature
│       │   └── landing/    # Marketing Landing Page
│       ├── ui/             # Universal Design System
│       └── provider/       # Context Providers
```

## 4. Key Architectural Patterns

### A. The "Double App Router" Pattern
We utilize the **App Router** paradigm on both platforms to ensure mental model parity.
- **Web**: `apps/next/app/dashboard/layout.tsx` → Wraps content in `DashboardLayout`.
- **Native**: `apps/expo/app/_layout.tsx` → Wraps content in Native Stack.

### B. Universal Components
All UI components live in `packages/app/ui`. They use:
- `react-native` primitives (`View`, `Text`, `Pressable`).
- `nativewind` classNames (`className="bg-blue-500"`).
- **No HTML elements** (`div`, `span`) are allowed in shared code.

### C. 3-Column SaaS Shell
The Web Dashboard enforces a professional SaaS layout:
1.  **Sidebar**: Fixed width (`w-64`), dedicated navigation.
2.  **Canvas**: Flexible workspace (`flex-1`).
3.  **Panel**: Right-side details (ready for implementation).

This layout is injected via `apps/next/app/dashboard/layout.tsx` to ensure it persists across all dashboard sub-routes.

## 5. Navigation Strategy
We use `solito/navigation` to handle routing hooks:
- **`useRouter()`**: Imports from `solito/navigation` (Works in App Router & Expo).
- **`useLink()`**: Universal link component.
- **`push('/path')`**: Navigates on both platforms.

## 6. Known Constraints & Resolutions
- **Next/Font**: Incompatible with NativeWind Babel config. Removed in favor of standard CSS fonts.
- **Legacy Pages**: The `pages/` directory has been deprecated and deleted.

## 7. TypeScript Solution Mode

To maintain a healthy, error-free monorepo, we use a **Supplier vs. Consumer** TypeScript model:

### A. The Supplier (`packages/app`)
- **Config**: `composite: true`, `declaration: true`.
- **Role**: This is the "Shared Kernel." It provides refined type definitions to the rest of the workspace.

### B. The Consumers (`apps/next`, `apps/expo`)
- **Config**: `composite: false`.
- **Role**: These are the "End-points." Since they use `noEmit: true` (compilation is handled by Next.js/Metro), they shouldn't produce declaration files. They simply consume the types supplied by `packages/app`.

This separation avoids the persistent "noEmit vs composite" errors often found in large monorepos.
