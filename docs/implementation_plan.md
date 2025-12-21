# Implementation Plan: GrowthPad v3.0

**Strategy**: Shared Brain, Decoupled Shells
**Goal**: Establish a professional SaaS foundation across two decoupled shells: **Web Shell (Responsive)** and **Native Shell (Cross-platform)**.

---

## ✅ Phase 1: Clean Slate & Decoupling
- [x] **Architecture Pivot**: Severed React Native Web dependencies in `apps/next`.
- [x] **Entry Points**: Established `/` (Landing) and `/dashboard` (App) separation.
- [x] **Type Hardening**: Established L1-L5 cascade as the unified data contract.

## ✅ Phase 2: Web "Panoramic" Refinement
- [x] **Landing Page**: Implemented high-fidelity SaaS template with proper centering.
- [x] **Dashboard Shell**: Created web-native `DashboardShell` (Sidebar + Topbar).
- [x] **Horizontal Canvas**: Replaced Grid with Standard Horizontal Board using `ScrollArea`.
- [x] **Pillar Hardening**: Fixed column widths to prevent vertical stacking.

## 🚧 Phase 3: Mobile "Pocket" Command Center
- [ ] **Linear Feed**: Implement `PillarSegmentedControl` in `apps/expo`.
- [ ] **High-Agency Accordions**: Build recursive L3-L5 view for small screens.
- [ ] **Native Bottom Sheets**: Implement `@gorhom/bottom-sheet` for job editing.

## 📅 Roadmap: Data & Intelligence
- [ ] **Supabase Integration**: Sync local state to persistent backend.
- [ ] **AI Strategy Engine**: Ingest playbooks and generate custom workboards.
