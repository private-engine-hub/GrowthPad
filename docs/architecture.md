# GrowthPad Architecture (v4.0)

**Current Version**: 4.0 (Strategic Pivot)
**Last Updated**: 2025-12-24
**Strategic Pivot**: 6-Layer Hierarchy + Dimension Tables

## 1. Executive Summary
GrowthPad employs a **"Shared Brain, Decoupled Shells"** architecture. We have abandoned "Universal UI" in the presentation layer to deliver elite, platform-native experiences while maintaining 100% logic parity.

1.  **Web Shell (`apps/next`)**: A single, responsive Next.js application targeting both **Desktop** (Panoramic layout) and **Mobile-Web** (Responsive/Touch-optimized) using standard web tech.
2.  **Native Shell (`apps/expo`)**: A high-agency mobile experience targeting **iOS** and **Android** using React Native primitives.
3.  **The Brain (`packages/app`)**: The shared source of truth for logic and state. Note that 

These two shells consume one **Brain** to deliver a consistent experience across four hardware targets.

---

## 2. Directory Structure

```bash
growthpad/
├── apps/
│   ├── next/              # WEB SHELL (Next.js + shadcn/ui)
│   │   ├── app/           # App Router (page.tsx, platform/, login/)
│   │   ├── components/    # Web-native UI (layout/, ui/, board/)
│   │   └── tailwind.config.js # Configured for standard Web centering
│   └── expo/              # NATIVE SHELL (React Native + NativeWind)
│       └── features/      # Mobile-optimized strategic feed
└── packages/
    └── app/               # THE BRAIN (Shared Central Logic)
        ├── db/            # Relational Schema (SQL v4.0)
        ├── hooks/         # useWorkboard() (6-layer fetch)
        ├── types/         # L0-L5 Strategic Cascade Interfaces
        ├── version.ts     # Versioning Registry (v4.0.0)
        └── nativewind-env.d.ts # Shared type definitions
```

---

## 3. Web Shell Specifications (`apps/next`)

We use **Standard Web Primitives** to ensure 0% layout shift (CLS) and 100% SEO/Performance.

*   **Framework**: Next.js (App Router) + Tailwind + shadcn/ui (Radix).
*   **Core Namespace**: `/platform` (e.g., `/platform/home`, `/platform/workboard`, `/platform/planner`).
*   **Layout Wrapper**: `DashboardShell.tsx` implements the SaaS wrapper with dynamic `usePathname` highlighting.
*   **Horizontal Canvas**: `Canvas.tsx` uses `shadcn/ui` `ScrollArea` for a "Trello-style" side-by-side pillar layout.
*   **Pillars**: Fixed-width (`350px`) cards with internal scroll areas.
*   **Typography**: Dashboard uses **Plus Jakarta Sans 300** (Light) for the base interface to ensure high-density scanability.
*   **List Density**: Lower-level **Jobs (L5)** are rendered as shadowless/borderless list items to maximize information density.
*   **Anti-Pattern**: Importing `View`, `Text`, or `Pressable` from `react-native` in the web shell is strictly forbidden.

---

## 4. Mobile Shell Specifications (`apps/expo`)

We focus on **Linear Command** density for the pocket experience.

*   **Navigation**: `PillarSegmentedControl` filters the view (Financial | Operational | Market).
*   **Cascade**: Recursive accordions (L3 -> L4 -> L5) preserve the strategic weight.
*   **Editing**: Native Bottom Sheets (`@gorhom/bottom-sheet`) for deep task interaction.

---

## 5. The Shared Brain (`packages/app`)
The Brain is the **only** source of business logic.

### 5.1 Data Layer Strategy (Dual-Mode)
-   **Mock Mode**: `useWorkboard(true)` returns instant, local JSON data. Ideal for UI prototyping.
-   **Live Mode**: `useWorkboard(false)` connects to Supabase via `@supabase/ssr`.
-   **Switching**: Controlled via `enabled` flag in the hook, or ultimately an Env Var.

### 5.2 Navigation Layer (Phase 5)
-   **Registry**: `APP_ROUTES` (`navigation/routes.ts`) is the Single Source of Truth for *all* URLs.
-   **Resolver**: `getAbsoluteUrl()` handles environment-aware domain prefixes (Dev vs Prod).
-   **Components**: Usage of raw `next/link` or strings is **forbidden**. Use `<AppLink route="name">` instead.
-   **Deep Links**: Native Shell is configured for `growthpad://` scheme handling.

### 5.3 Navigation Switchover Protocol
To transition from **Mock Mode** to **Live Production**, follow these steps:
1.  **Auth Guard**: Replace the stub in `navigation/guards.ts` with a call to `@supabase/ssr` to verify real JWT sessions in Next.js Middleware.
2.  **Analytics**: Replace the `console.log` in `navigation/analytics.ts` with a production provider (e.g., Segment, PostHog, or Google Analytics).
3.  **Base URL**: Update your `.env` and `.env.local` files to point `NEXT_PUBLIC_APP_URL` to your production domain (e.g., `growthpad.app`).
4.  **Deep Linking**: Finalize the `app.json` association with your production domain's `apple-app-site-association` and `assetlinks.json` files.

### 5.4 Data Sovereignty & Auth Delegation
GrowthPad uses a **Proxy Auth** model to keep the codebase clean.
- **Site URL** (Supabase): `https://growthpad.app`
- **Redirect Allow List**:
    - `http://localhost:3000/**` (Dev)
    - `https://stg.growthpad.app/**` (Staging)
    - `https://growthpad.app/**` (Production)
    - `growthpad://**` (Mobile Deep Link)
- **Mechanism**: The shell initiates auth, Supabase handles the provider (Google/Email), and redirects back to the shell with a session. The shell never touches passwords.

### 5.5 Release Integrity & Build Identity
GrowthPad uses an automated **Semantic Release** pipeline to ensure repository stability.
- **Branch Protection**: Direct commits to `main` are blocked by Husky. Updates are only permitted via merges from `dev`.
- **Commit Enforcement**: Husky + Commitlint enforce the `type[scope]: message` atomic format.
- **Build Identity**: `packages/app/version.ts` is the single source of truth for the application version. It is updated automatically by the CI pipeline upon every successful release to `main` or `dev`.

---

### **Core Features**:

* **Logic Hooks**:`useWorkboard()` returns a nested **L0-L5** object. Both shells are "dumb" and only loop through this data, ensuring consistent business logic across platforms.

* **Type Safety**: The **L0-L5 Strategic Cascade** is the core interface for both platforms, maintained with **TypeScript** to ensure type-safe communication.
  * **L0**: Mission
  * **L1**: Move
  * **L2**: Objective (Linked to Pillars/Themes)
  * **L3**: Initiative
  * **L4**: Phase
  * **L5**: Job (Actionable "Leaf")

* **Hydration**: By using **standard HTML** on the Web, we avoid **React Native Web hydration mismatches** entirely.

### **Data Syncing and Caching with TanStack Query & Supabase**:

* **Supabase**:

  * Provides the real-time **PostgreSQL** database, handling **live data syncing** between Web and Mobile.
  * Powers **real-time updates**, allowing instant reflection of data changes across all clients.

* **TanStack Query**:

  * Handles **data-fetching**, **caching**, and **background syncing** for both Web and Mobile shells.
  * Ensures seamless **data consistency**, **offline support**, and **real-time synchronization** of the **L1-L5 cascade**.
### 5.1 Data Layer Strategy (Supabase Integration)
-   **Live Mode (Active)**: `useWorkboard` fetches nested relations directly from Supabase via TanStack Query.
-   **Mock Mode (Legacy)**: Controlled via the `enabled` flag in the hook for local development if needed.
-   **Connectivity**: Authenticated via `NEXT_PUBLIC_SUPABASE_ANON_KEY` and handled via the Shell-Owned Context.

### 5.2 Context Ownership (Architecture Inversion)
GrowthPad uses an **"Architecture Inversion"** model for stateful libraries (e.g., TanStack Query).
*   **The Problem**: Hosting Providers inside transpiled shared packages can cause "Context Identity Mismatch" where the Provider and Consumer load different instances of the same library.
*   **The Solution**: The **Shell owns the State**.
    *   `QueryClientProvider` is instantiated in the app shell (`apps/next/app/providers.tsx`).
    *   Stateful hooks (like `useWorkboard`) are instantiated in the app shell.
    *   The **Brain** (`packages/app`) provides **Stateless Business Logic**: pure fetch functions, type definitions, and stateless UI components.
    *   **Single Gateway**: `packages/app/provider/query.ts` provides a unified re-export point to ensure library version consistency.

---

### **Benefits**:

* **Real-Time Sync**: Instant updates across platforms, ensuring **data consistency**.
* **Caching**: Efficient **client-side caching** reduces redundant requests and enhances performance.
* **Unified Logic**: Shared **brain** logic between shells, maintaining consistent behavior.
* **Offline Support**: Works seamlessly even with no internet connection, syncing once back online.


---

## 6. Technical Protocol

*   **Bypassing Policies**: Use `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force` to run `npm run build` or `yarn web` in restricted environments.
*   **Clean Builds**: Always clear `.next` cache if layout shifts appear unexplainable.
*   **NativeWind**: Restricted to the "Brain" and "Native Shell". Web uses standard Tailwind utilities.

---

## 7. Code Integrity (The "Boring" Rule)
We prioritize stable, standard patterns over clever custom logic.
- **Standard**: If an industry-standard template exists, use it.
- **DRY**: Code should be DRY where sensible
- **Pruning**: Delete unused code and abstract repeated patterns quickly.
- **Compliance**: All code must satisfy `docs/rules/code.md`.

---

## ZZ. Appendix

### **Table of Technologies and How They Interact**

| **Category**     | **Technology/Library**          | **Description**                                                                                                                                                 | **Interacts With**                                                                                      |
| ---------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Web Shell**    | **Next.js**                     | Full-stack framework for React, used for **server-side rendering (SSR)**, routing, and page management.                                                         | - `shadcn/ui` for UI components and layout<br>- `Tailwind CSS` for styling<br>- **The Brain** for logic |
| **Web Shell**    | **Tailwind CSS**                | Utility-first CSS framework for rapid styling. Ensures high-performance and responsive layouts.                                                                 | - Used throughout the **Web Shell** to style components and layout (DashboardShell, Canvas, etc.)       |
| **Web Shell**    | **shadcn/ui (Radix UI)**        | Provides pre-built, customizable components like buttons, modals, and cards (integrates Radix UI). Enables drag-and-drop, UI consistency, and dynamic behavior. | - Integrates with **Next.js** and **Tailwind CSS** to create UI layouts (Pillars, Horizontal Canvas)    |
| **Web Shell**    | **Canvas & DashboardShell**     | These are custom components that structure the main **Trello-like** board layout, handling horizontal scroll areas and card grouping.                           | - Uses `shadcn/ui` components for interactivity<br>- **The Brain** to pull and update data              |
| **Native Shell** | **React Native**                | Framework for building cross-platform mobile apps with **React**. Provides native components like `View`, `Text`, and `Pressable`.                              | - **NativeWind** for styling<br>- **@gorhom/bottom-sheet** for mobile UI elements                       |
| **Native Shell** | **NativeWind**                  | A utility-first CSS framework for React Native that integrates well with **Tailwind CSS** and enables consistent styling across web and mobile.                 | - Integrates with **React Native** to apply consistent styling<br>- **The Brain** for mobile logic      |
| **Native Shell** | **@gorhom/bottom-sheet**        | Bottom sheet component for deep task interaction and managing mobile-specific UI states.                                                                        | - Used in **Native Shell** to provide **deep task interactions** like modals or multi-level accordions  |
| **Native Shell** | **PillarSegmentedControl**      | Custom component for segmenting and filtering the **L3, L4, and L5** cascade data (strategic view of the board).                                                | - Displays data pulled from **The Brain** using custom hooks (`useWorkboard`)                           |
| **The Brain**    | **React Context API**           | Centralized state management solution to handle shared state across both shells (**Web** and **Mobile**).                                                       | - Powers all UI interactions in **Web** and **Mobile Shells** (Pillars, Canvas, Cards)                  |
| **The Brain**    | **useWorkboard()**              | Custom hook that provides the **L1-L5 strategic cascade** logic for the shells. It returns structured data and task hierarchy.                                  | - Interacts with the UI components in both **Web Shell** and **Mobile Shell**                           |
| **The Brain**    | **TypeScript**                  | Superset of JavaScript that enforces type safety, ensuring the architecture's stability.                                                                        | - Used across **The Brain** and ensures type safety in both shells                                      |
| **The Brain**    | **NativeWind Type Definitions** | Provides type definitions for NativeWind (styling in React Native), ensuring type safety between mobile and web shells.                                         | - Used in **Native Shell** to ensure that style props and component behaviors are consistent            |

---

### **How Technologies Interact Across the Architecture**

* **Web Shell (`apps/next`)**:

  * The **Next.js** framework handles routing and server-side rendering (SSR) for the **Web Shell**.
  * **shadcn/ui** (Radix UI) is used to build dynamic UI components like buttons, cards, and modals, which interact with **Tailwind CSS** for styling.
  * The layout components like **DashboardShell** and **Canvas** are responsible for rendering the **Pillars** and providing the **Trello-style** workspace, pulling data from **The Brain** via **useWorkboard()**.

* **Native Shell (`apps/expo`)**:

  * **React Native** forms the foundation for building the cross-platform mobile app, while **NativeWind** is used to apply styling to the app in a **Tailwind-like** manner.
  * **@gorhom/bottom-sheet** is used for deep task interaction, allowing users to manipulate complex data within the **Mobile Shell**.
  * The **PillarSegmentedControl** manages the segmented navigation for **L3-L5** cascades of data, enabling users to filter and interact with the different levels of the strategic workspace.
  * Like the **Web Shell**, the **Mobile Shell** consumes **The Brain** for shared business logic and state management.

* **The Brain (`packages/app`)**:

  * The **React Context API** in the **Brain** stores the shared state that drives both **Web** and **Mobile Shells**. This state includes task data, project data, and user progress.
  * **useWorkboard()** provides custom hooks to access and manage the L1-L5 data cascade and other business logic, ensuring **consistent data flows** between the shells.
  * **TypeScript** ensures type safety throughout, especially in managing complex task data and UI interactions, ensuring consistency across both shells.

---

### **Tech Stack Interactions at a Glance**

* **Frontend (UI)**:

  * **Web Shell**: Next.js + Tailwind CSS + shadcn/ui (Radix UI) for a dynamic, responsive UI.
  * **Native Shell**: React Native + NativeWind for consistent styling and UI behavior across mobile platforms.

* **State Management**:

  * **The Brain**: React Context API + TypeScript ensures type safety and manages shared logic between the Web and Mobile Shells.

* **UI Components & Interactions**:

  * **Drag-and-Drop**: Implemented via **shadcn/ui** (Web) and **React DnD/React Beautiful DnD** for the board-like, interactive design.
  * **Mobile-Specific UI**: Deep interaction like bottom sheets is enabled by **@gorhom/bottom-sheet** in the **Native Shell**.
