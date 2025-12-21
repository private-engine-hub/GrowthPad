# GrowthPad Implementation Plan: v3.0

**Strategy**: Shared Brain, Decoupled Shells
**Goal**: Establish a professional SaaS foundation across two decoupled shells: **Web Shell (Responsive)** and **Native Shell (Cross-platform)**.

---

## ✅ Phase 1: Clean Slate & Decoupling
- [x] **Architecture Pivot**: Severed React Native Web dependencies in `apps/next`.
- [x] **Entry Points**: Established `/` (Landing) and `/dashboard` separation.
- [x] **Registry Removal**: Deleted `NativeWindRegistry` and `StyleSheet` usage from Web.
- [x] **Type Hardening**: Established L1-L5 cascade as the unified data contract.

## ✅ Phase 2: Web "Panoramic" Refinement
- [x] **Landing Page**: Implemented high-fidelity SaaS template with proper centering.
- [x] **Dashboard Shell**: Created web-native `DashboardShell` (Sidebar + Topbar).
- [x] **Horizontal Canvas**: Replaced Grid with Standard Horizontal Board using `ScrollArea`.
- [x] **Pillar Hardening**: Fixed column widths to prevent vertical stacking.
- [x] **Brain Integration**: Connected Web Dashboard to shared `useWorkboard` hook.
- [x] **UI Polish**: Fixed container centering and logo alignment issues.

## 🎨 Phase 2.6: Trello Blue UI Overhaul
Objective: Pivot to "SlothUI" aesthetic with Trello Blue identity and capsule hierarchy.
- [ ] **Trello Sidebar**: `bg-[#0079BF]` frame + `bg-white/20` active states + "Go Pro" footer.
- [ ] **Capsule Pillars**: `rounded-full` status badges (Purple/Amber/Emerald) replacing border headers.
- [ ] **Leaf Card Hardening**: `rounded-xl` cards + Priority Badge + Avatar/Stats footer.
- [ ] **Environmental Depth**: Maintain `bg-slate-100` canvas for contrast.

## ✅ Phase 3: Documentation & Audit
- [x] **Architecture Update**: Audited `docs/architecture.md` for v3.0 accuracy.
- [x] **Blueprint Sync**: Updated `docs/blueprint.md` to reflect decoupled strategy.
- [x] **Audit Cleanup**: Consolidated `docs/audit` into a single comprehensive status.
- [x] **Walkthrough**: Refreshed `docs/walkthrough.md` with new project structure.
- [x] **Rules Update**: Polished `docs/rules/construction.md` for assembly protocol.

## 🚧 Phase 4: Mobile "Pocket" Command Center
- [ ] **Linear Feed**: Implement `PillarSegmentedControl` in `apps/expo`.
- [ ] **Data Hookup**: Connect Mobile Feed to shared `useWorkboard` hook.
- [ ] **High-Agency Accordions**: Build recursive L3-L5 view for small screens.
- [ ] **Native Bottom Sheets**: Implement `@gorhom/bottom-sheet` for job editing.

## 📅 Roadmap: Data & Intelligence
- [ ] **Supabase Integration**: Sync local state to persistent backend.
- [ ] **AI Strategy Engine**: Ingest playbooks and generate custom workboards.
