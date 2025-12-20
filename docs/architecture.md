# GrowthPad Architecture (2025 Standard)

**Current Version**: 2.1 (Universal Kanban)
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
│       │   ├── board/      # [NEW] Universal Kanban Board
│       │   └── landing/    # Marketing Landing Page
│       ├── ui/             # Universal Design System
│       └── provider/       # Context Providers
```

## 4. Key Architectural Patterns

### A. The "Universal Board" Pattern
Instead of fighting the platform differences between "Web Grids" and "Native Pagers", we utilize a **Single Universal Layout** that works identically on both platforms:

*   **View**: `ScrollView` (horizontal)
*   **Columns**: `View` (w-80 or w-full)
*   **Result**: A Trello/Monday style Kanban board that feels native on iOS (smooth touch scrolling) and professional on Web (horizontal overflow).

### B. Universal Components
All UI components live in `packages/app/ui`. They use:
- `react-native` primitives (`View`, `Text`, `Pressable`, `ScrollView`).
- `nativewind` classNames (`className="bg-blue-500"`).
- **Direct Usage**: We favor direct `<View className="...">` over `styled(View)` wrappers to avoid Next.js Babel plugin conflicts.

### C. 3-Column SaaS Shell
The Web Dashboard enforces a professional SaaS layout:
1.  **Sidebar**: Left navigation column.
2.  **Canvas**: The `BoardScreen` workspace (Horizontal scrolling columns).
3.  **Sheet/Panel**: High-fidelity detail view for Jobs/Objectives.

## 5. Navigation Strategy
We use `solito/navigation` to handle routing hooks:
- **`useRouter()`**: Imports from `solito/navigation` (Works in App Router & Expo).
- **`useLink()`**: Universal link component.
- **`push('/path')`**: Navigates on both platforms.

## 6. Known Constraints & Resolutions
- **Next/Font**: Incompatible with NativeWind Babel config. Removed in favor of standard CSS fonts.
- **NativeWind on Web**: `styled()` wrapper caused hydration issues. Resolution: Use standard `<View className="...">`.

## 7. TypeScript Solution Mode

To maintain a healthy, error-free monorepo, we use a **Supplier vs. Consumer** TypeScript model:

### A. The Supplier (`packages/app`)
- **Config**: `composite: true`, `declaration: true`.
- **Role**: This is the "Shared Kernel." It provides refined type definitions to the rest of the workspace.

### B. The Consumers (`apps/next`, `apps/expo`)
- **Config**: `composite: false`.
- **Role**: These are the "End-points." Since they use `noEmit: true` (compilation is handled by Next.js/Metro), they shouldn't produce declaration files. They simply consume the types supplied by `packages/app`.
