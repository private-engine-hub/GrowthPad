# GrowthPad Implementation Tasks

## 🎯 Current Objective: SaaS Aesthetics Hardening (Level 3)

### Phase 2.6: Modern Trello UI Overhaul (COMPLETE)
- [x] **Trello Identity**: Implement `#0079BF` Sidebar with "Glassy" Search <!-- id: 33 -->
- [x] **Board Atmosphere**: Switch Canvas to Trello Gray (`#EBECF0`) <!-- id: 34 -->
- [x] **Tactile Cards**: Refactor to "Stacked Paper" look (`border-b-2`) with Joyful Layout <!-- id: 35 -->
- [x] **Capsule Headers**: Implement Chunky Capsules (Red/Yellow/Green) for pillars <!-- id: 36 -->

### Phase 2.7: SlothUI Refinement (COMPLETE)
- [x] **Headed Control Strip**: "Zone 2" navigation tabs + Title Utility.
- [x] **Sidebar Composition**: Grouped Brand/Search + Premium Glass Card footer.
- [x] **Mood Pills**: Replace text labels with soft-colored priority badges.
- [x] **Spatial Tuning**: Increased gutters and vertical air.
- [x] **Full Width Headers**: Expand Pillar capsules to span the card width. <!-- id: 44 -->

### 🎨 Phase 2.8: Collapsible Sidebar (CURRENT)
- [x] **State & Animation**: `useState` + `transition-all` for width (`w-72` <-> `w-20`).
- [x] **Adaptive Content**: Conditionally render Text/Icons for Brand, Nav, and Footer.
- [x] **Shadow Enhancement**: increase shadow prominence for depth.
- [x] **Toggle Button**: Add interaction trigger.

### 🎨 Phase 2.9: Job Card UI Cleanliness (COMPLETE)
- [x] **List Density**: Remove shadows/borders from Job Cards (L5). <!-- id: 60 -->
- [x] **Joyful Icons**: Implement Flame/Zap/Sprout for priority. <!-- id: 61 -->
- [x] **Inline AI**: Replace pill badge with subtle inline ✨. <!-- id: 62 -->
- [x] **Phase Headers**: Simplify to clean text labels. <!-- id: 63 -->
- [x] **Typography**: Migrate to Montserrat 300 (Light) for premium air. <!-- id: 64 -->

### 🌳 Phase 4: Strategy Tree Map (COMPLETE)
- [x] **Sidebar**: Add "Strategy Map" nav item with `ListTree` icon. <!-- id: 70 -->
- [x] **Route**: Create `/platform/planner` page shell. <!-- id: 71 -->
- [x] **Engine**: Build `StrategicStack.tsx` (Recursive Indentation Logic). <!-- id: 72 -->
- [x] **Polish**: Apply Plus Jakarta Sans 300 & connector styling. <!-- id: 73 -->

- [x] **Namespace**: Migrate `/dashboard` to `/platform`. <!-- id: 74 -->
- [x] **Highlighting**: Implement `usePathname` for sidebar active states. <!-- id: 75 -->
- [x] **Home**: Add `/platform/home` landing page. <!-- id: 76 -->
- [x] **Sidebar**: Add "Home" navigation entry. <!-- id: 77 -->
- [x] **Naming**: Rename `/platform/dashboard` to `/platform/workboard`. <!-- id: 78 -->

### 🧭 Phase 5: Universal Navigation System (IN PROGRESS)
#### 5.1 Core Registry (Shared Brain)
- [x] **Routes**: Create `packages/app/navigation/routes.ts` with typed `APP_ROUTES`. <!-- id: 80 -->
- [x] **URL Resolver**: Create `packages/app/navigation/url-resolver.ts` with `getAbsoluteUrl()`. <!-- id: 81 -->
- [x] **Hook**: Create `packages/app/hooks/use-navigation.ts` with `navigate()` and `getPath()`. <!-- id: 82 -->

#### 5.2 Stubs (Mock Mode)
- [x] **Auth Stub**: Create `packages/app/navigation/guards.ts` with `isAuthenticated = () => true`. <!-- id: 83 -->
- [x] **Analytics Stub**: Create `packages/app/navigation/analytics.ts` with `console.log` tracking. <!-- id: 84 -->
- [x] **Flags Stub**: Create `packages/app/navigation/flags.ts` with all routes enabled. <!-- id: 85 -->

#### 5.3 Web Shell Components
- [x] **AppLink**: Create `apps/next/components/navigation/AppLink.tsx`. <!-- id: 86 -->
- [x] **NavItem Refactor**: Update `DashboardShell.tsx` to use `route` prop. <!-- id: 87 -->
- [x] **Landing CTA**: Update `app/page.tsx` to use `<AppLink>`. <!-- id: 88 -->

#### 5.4 SEO & Environments
- [x] **SEO Helper**: Create `packages/app/navigation/seo.ts` with `getPageMeta()`. <!-- id: 89 -->
- [x] **Env Templates**: Create `.env.example` files for Web and Expo shells. <!-- id: 90 -->

#### 5.9 Infrastructure Alignment (Infra)
- [x] **Domain Logic**: Update `url-resolver.ts` for `growthpad.app`. <!-- id: 95 -->
- [x] **Env Templates**: Create `.env.{production,staging}.example` profiles. <!-- id: 96 -->
- [x] **Auth Documentation**: Document Supabase Redirect Strategy in Architecture. <!-- id: 97 -->

#### 5.5 Native Shell Prep (Future)
- [x] **Deep Link Config**: Update `apps/expo/app.json` with URI scheme. <!-- id: 91 -->
- [ ] **AppLink Native**: Create `apps/expo/components/navigation/AppLink.tsx`. <!-- id: 92 -->

### Phase 3: Documentation & Audit (COMPLETE)
- [x] Audit `docs/architecture.md` <!-- id: 7 -->
- [x] Sync `docs/walkthrough.md` <!-- id: 8 -->
- [x] Refactor `docs/ui.md` into Master Design Spec <!-- id: 40 -->
- [x] Verify against `docs/rules/code.md` (DashboardShell Refactor)

### Phase 4: Mobile Hardening (NEXT)
- [ ] Implement `PillarSegmentedControl` <!-- id: 10 -->
- [ ] Connect Mobile Feed to Brain <!-- id: 11 -->
- [ ] Linear Feed: Implement PillarSegmentedControl in apps/expo.
- [ ] Data Hookup: Connect Mobile Feed to shared useWorkboard hook.
- [ ] High-Agency Accordions: Build recursive L3-L5 view for small screens.
- [ ] Native Bottom Sheets: Implement @gorhom/bottom-sheet for job editing.

### 🗄️ Phase 5: Supabase Migration (COMPLETE)
- [x] Formulate Relational L1-L5 Schema <!-- id: 50 -->
- [x] Challenge & Assess Data Delivery Strategy <!-- id: 51 -->
- [x] Create `packages/app/db/schema.sql` Skeleton <!-- id: 52 -->
- [x] Implement Supabase Client in `packages/app` <!-- id: 53 -->
- [x] Migrate `useWorkboard` hook to Real DB <!-- id: 54 -->
- [x] **Technical Fix**: Implement "Architecture Inversion" (Shell-Owned Context) to resolve monorepo duplication.
- [x] **Validation**: Verified live data retrieval with project API keys.

📅 Roadmap: Data & Intelligence
- [x] Supabase Integration: Multi-platform live data sync active.
- [ ] Build RAG LLM with Gemini Google.
- [ ] AI Strategy Engine: Ingest playbooks and generate custom workboards.