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
- **Headings**: `font-black` or `font-extrabold` with high tracking-tight.
- **Body**: Standard Sans (Inter/System), optimized for density.
- **Semantic Labels**: `font-bold` and `uppercase` for Badge-style metadata.

---

## 🚀 2. Landing Page (`/`)

The entry point uses the **Primary Blue** for authority and **Sunny Yellow** for optimism.

- **Hero Headline**: Trello Blue base text (`text-trello-blue`) with Sunny Yellow span highlights (`text-trello-yellow`) for growth-mode emphasis (e.g., "on easy mode").
- **Glass Elements**: Use `backdrop-blur` and `border-white/10` for floating badges.
- **Buttons**: Primary buttons are solid `#00818E` with high-radius corners (`rounded-lg`).

---

## 📊 3. Dashboard Shell (`/dashboard`)

The Panoramic Playbook Canvas leverages maximum screen estate.

### Sidebar (Trello Identity)
- **Background**: Solid `bg-trello-blue`.
- **Search**: "Glass" style (`bg-white/10`) with subtle backdrop blur.
- **Interaction**: Nav items use `bg-white/20` when active, creating a recessed light-pool effect.
- **Premium Footer**: A dedicated "Glass Card" (`bg-gradient-to-br`) for high-value upgrades, replacing simple text links.

### Header Control Strip
- **Zones**: Split into Utility (Title + Global Actions) and Navigation (Tabs).
- **Tabs**: Horizontal text tabs (`TabItem`) with bottom-border active states (`border-b-2 border-trello-blue`).

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

### Chunky Capsule Pillars
Replacing standard headers with distinct status-badges.
- **Logic**: Header color is determined by the Pillar title (Financial=Red, Operational=Yellow, Market=Green).
- **Shape**: `rounded-full` high-contrast capsules that sit *above* the card stack.

---

## ✅ Design Checklist
1. **Depth**: Ensure white cards sit on a gray canvas (`bg-trello-gray`).
2. **Branding**: Headings/Sidebar must use `trello-blue`.
3. **Joy**: AI generated content should always be highlighted with the "✨" emoji and `trello-green` success text.
4. **Hardness**: Interactive elements should have `200ms` transitions and tactile feedback.
