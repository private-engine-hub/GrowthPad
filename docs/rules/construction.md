# 🏗️ GrowthPad Assembly Protocol (v3.0)

## 0. Running Commands (Windows/PowerShell)
If you encounter script execution errors, use the Bypass scope:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

---

## 1. Core Architecture: Shared Brain, Decoupled Shells

You must strictly separate logic from presentation.

* **Shared Brain (`packages/app`)**: **The Only Source of Truth.** Contains Hooks, Types (L1-L5), and Schemas.
* **Web Shell (`apps/next`)**: Pure Web. HTML5 + Tailwind + shadcn/ui. **Forbidden: React Native Web primitives.**
* **Native Shell (`apps/expo`)**: Pure Native. React Native primitives + NativeWind v4.

---

## 2. The "Template-First" Mandate

**Never build from scratch.** Use the following hierarchy:

1. **Standard Modules**: Use **shadcn/ui** components for everything (Buttons, Cards, ScrollAreas).
2. **Layout Shells**:
   - **Marketing**: Responsive, centered containers (`mx-auto`).
   - **App**: `DashboardShell` (Sidebar + Content).
3. **Mobile Web Strategy (Next.js)**: 
   - Use standard Tailwind breakpoints (`md:`, `lg:`) to transition between Desktop (Panoramic) and Mobile-Web (Vertical Stack or Tabbed).
   - Sidebar should transition from fixed to `hidden` or a Hamburger Overlay on screens `< 768px`.
4. **Alignment**: Every element must belong to a **Grid** or **Flex** container.
5. **Constraints**: Standard Tailwind scales only (`p-4`, `m-6`). No arbitrary pixel values.

---

## 3. Canvas Protocol (Web)

The "Canvas" is the horizontal workboard. 
- Always use `shadcn/ui` `ScrollArea` for horizontal flow.
- Pillars must be fixed-width (`350px`) and `shrink-0`.
- Maintain independent vertical scrolling within pillars.

---

## 4. Implementation Guards

* **Type Safety**: Import all data models from `app/types`.
* **Data Access**: Consume data *only* through `app/hooks`. No direct API fetching in shells.
* **Platform Separation**: 
  - If you are in `apps/next`, write code for the BROWSER.
  - If you are in `apps/expo`, write code for THE PHONE.

---

## 5. Anti-Hallucination Checklist

❌ **No Manual Styles**: Use Tailwind or delete it.
❌ **No RN-on-Web**: If you find a `<View>` in `apps/next`, refactor it to `<div>`.
❌ **No Floating Elements**: Use the `container` or `mx-auto` for centering.
❌ **No Business Logic in UI**: Move transformations to the Brain.