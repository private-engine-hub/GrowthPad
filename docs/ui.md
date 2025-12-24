# Design Specification: GrowthPad

This document codifies the **"Modern Trello"** aesthetic—a high-fidelity workplace environment that balances Trello's structural stability with joyful, high-density micro-interactions.

---

## 🎨 1. Core Design System

### The "Identity" Palette
The brand balances legacy workplace blue with sunny growth accents.

| Element | Hex Code | Tailwind Token | Description |
| :--- | :--- | :--- | :--- |
| **Primary (Blue)** | `#00818E` | `trello-blue` | Sidebar background, Header text, Primary CTAs. |
| **Accent (Yellow)** | `#FBBF24` | `trello-yellow` | Sunlight highlighting, status alerts, "Roadmap Mode". |
| **Canvas (Gray)** | `#EBECF0` | `trello-gray` | The "floor" of the playbook canvas. |
| **Success (Green)** | `#22C55E` | `trello-green` | AI Success indicators, completed tasks. |
| **Error (Red)** | `#F43F5E` | `trello-red` | Critical blocking pillars. |

### Typography
- **Primary Font**: **Plus Jakarta Sans** (Light 300).
- **Headings**: `font-black` or `font-extrabold` with high tracking-tight.
- **Body**: Standard weight is **300**, using **400** only for medium emphasis and **600+** for headers.
- **Implementation Note**: Due to the **Babel** configuration required by the `@expo/next-adapter`, SWC is disabled. Consequently, we use standard CSS `@import` in `globals.css` rather than `next/font` to avoid build conflicts.
- **Semantic Labels**: `font-bold` and `uppercase` for Badge-style metadata.

---

## 🚀 2. Landing Page (`/`)

The entry point uses the **Primary Blue** for authority and **Sunny Yellow** for optimism.

- **Hero Headline**: Trello Blue base text (`text-trello-blue`) with Sunny Yellow span highlights (`text-trello-yellow`) for growth-mode emphasis (e.g., "on easy mode").
- **Glass Elements**: Use `backdrop-blur` and `border-white/10` for floating badges.
- **Buttons**: Primary buttons are solid `#00818E` with high-radius corners (`rounded-lg`).

---

## 📊 3. Platform Shell (`/platform`)

The Panoramic Playbook Canvas leverages maximum screen estate.

### Sidebar (Navigation Shell)
- **Namespace**: All core application routes are under `/platform`.
- **Behavior**: Collapsible (`w-72` ↔ `w-20`) with smooth `300ms` transition.
- **Shadow**: Deep, prominent shadow (`4px_0_24px_rgba(0,0,0,0.4)`) for clear separation from canvas.
- **Background**: Solid `bg-trello-blue`.
- **Active State**: Navigation items use `bg-white/20` and a shadow effect when the current route matches (`usePathname`).
- **Home Entry**: A prominent "Home" button resides at the top of the primary navigation group.
- **Micro-Physics**: Labels hide on collapse with icon-only view and tooltip fallbacks.

### Header Control Strip
- **Zones**: Split into Utility (Title + Global Actions) and Navigation (Tabs).
- **Tabs**: "Pill-Shaped" buttons (`bg-blue-50 text-trello-blue`) for active state, offering a tangible "pressed" feel.
- **Actions**: Global actions (Share, Run Simulation) are top-right.

### The Panoramic Canvas
- **Background**: Classic Trello Gray (`bg-trello-gray`).
- **Gutter**: Padded content area with a centered `max-w-[1600px]` constraint to prevent ultra-wide distortion.

---

## 📇 4. Components

### The "Stacked Paper" Card
Designed to feel tactile and physical.
- **Physics**: `border-b-2 border-slate-300 shadow-sm`.
- **Micro-Interaction**: `hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`.
- **Anatomy**:
    - **Top**: Condensed L5 Title + "Mood Pills" (e.g., High Priority in `bg-rose-50`).
    - **Footer**: Left-aligned AI markers (`text-trello-green`) and right-aligned Avatar Stacks.
### Dense Job List (L5)
Optimized for high-density scanning within Phase containers.
- **Physics**: Static state is flat (`shadow-none`, `border-none`). Interactive state is `hover:bg-slate-50`.
- **Layout**: "List Density" padding (`py-1.5 px-3`) with constrained text wrapping (`min-w-0`, `break-words`).
- **Typography**: Uses **text-xs** (12px) for maximum information density in the strategic cascade.
- **Row Variant**: In `StrategicStack`, jobs are full-width rows with RHS metadata (Avatar, Status) permanently visible.
- **Joy**: Use inline Lucide icons (🔥 Flame, ⚡ Zap, 🌱 Sprout) for priority.

### Dimensional Meta-Badges
Pillars and Themes provide thematic context to Objectives.
- **Logic**: Pillar color is fixed (Financial=Rose, Operational=Amber, Market=Emerald). Theme color is dynamic based on DB `color` field.
- **Shape**: `rounded-full` high-contrast capsules with `text-[10px]` bold labels, sitting within the Objective header area.

### The Strategy Map (`/platform/planner`)
A high-density, full-width vertical tree for strategic planning.
- **Structure**: Collapsible **Mission (L0)** header -> **Move (L1)** sections -> **Objective (L2)** nodes with DIM badges -> **Initiative (L3)** containers -> **Phase (L4)** logic groups -> **Job (L5)** rows.
- **Interactivity**: Missions and Moves provide structural grouping. Objectives and Initiatives show internal work progress.
- **Density**: Uses `font-black` headings for Missions, `font-bold` for Objectives, and `font-light` (Jakarta 300) for descriptions to maximize information density. No dates are shown to preserve strategic focus.

---

## 📱 5. Mobile Web Adaptation (`apps/next` smaller screens)

The web shell must remain functional on touch browsers without using Native logic.

- **The Stacking Canvas**: On screens `< md`, the horizontal pillar layout transitions to a vertical scroll stack. 
- **Fat Taps**: Increase padding on interactive elements (Buttons/Links) to a minimum of `h-11` or `p-3` for touch accuracy.
- **Sidebar Ghosting**: The blue sidebar hides entirely; access is moved to a top-header hamburger menu or bottom-nav pivot.
- **Micro-Physics**: Disable `hover:` effects on touch devices to prevent sticky hover states.

---

## ✅ Design Checklist
1. **Depth**: Ensure white cards sit on a gray canvas (`bg-trello-gray`).
2. **Branding**: Headings/Sidebar must use `trello-blue`.
3. **Joy**: AI generated content should always be highlighted with the "✨" emoji and `trello-green` success text.
4. **Hardness**: Interactive elements should have `200ms` transitions and tactile feedback.
