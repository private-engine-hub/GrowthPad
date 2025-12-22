This updated **Supabase Migration Plan** incorporates the expanded **L1-L5 Strategic Cascade** data and ensures the **Shared Brain** remains the single source of truth for both Web and Native shells.

# 🏗️ Supabase Migration Plan (v3.1)

**Relational Shift for High-Density Strategic Roadmaps**

This plan transitions GrowthPad from hardcoded constants to a relational PostgreSQL backend, optimized for the **Panoramic Canvas** (Web) and **Linear Feed** (Native).

---

## 1. Assessment: The "JSON Nesting" Protocol

> [!IMPORTANT]
> **Relational Integrity**: Supabase's PostgREST API natively returns nested JSON when using relational selects.
> **Brain Strategy**: We will use **Shared Brain Hooks** to validate and type-cast the response, ensuring the UI (Next.js/Expo) remains "dumb" and only renders validated data.

---

## 2. Updated Database Schema & Seeding

### `schema.sql` (file:///docs/db/schema.sql)

We use your validated SQL structure to enforce the **5-Layer Cascade**.

```sql
-- L1: Pillars (Fixed IDs for UI consistency)
CREATE TABLE pillars (
    id TEXT PRIMARY KEY, -- 'financial', 'operational', 'market'
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- L2: Themes (Mapped to Identity Palette)
CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#00818E', -- Default Trello Blue
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- L3-L5: Cascade Tables
CREATE TABLE objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar_id TEXT REFERENCES pillars(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0, -- Ensures horizontal canvas flow
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('todo', 'in_progress', 'review', 'done')) DEFAULT 'todo',
    ai_generated_assets BOOLEAN DEFAULT FALSE, -- Triggers ✨ emoji
    created_at TIMESTAMPTZ DEFAULT NOW()
);

```

### High-Density Seed Data

Load these strategies to POC the **Stacked Paper Card** and **Panoramic** layouts.

```sql
-- Seed L1: Pillars
INSERT INTO pillars (id, title, description) VALUES 
('market', 'Market Growth', 'Context - Reputation & Share'),
('operational', 'Operational Efficiency', 'The Machine - Speed & Quality'),
('financial', 'Financial Health', 'Fuel - Cash & Profit');

-- Seed L5: Sample Strategic Jobs
-- (Assuming IDs generated/fetched from previous steps)
INSERT INTO jobs (phase_id, theme_id, title, ai_generated_assets, status) VALUES
('ph-diag-id', 't-retention-id', '✨ AI Analysis: Cluster churn patterns by customer cohort', TRUE, 'in_progress'),
('ph-route-id', 't-efficiency-id', '✨ AI Model: Predict optimal tech assignment based on GPS', TRUE, 'in_progress'),
('ph-audit-id', 't-profit-id', '✨ AI Audit: Identify duplicate SaaS subscriptions', TRUE, 'todo');

```

---

## 3. The Shared Brain Update (`packages/app`)

### [MODIFY] `useWorkboard.ts`

The hook now fetches the entire tree in a single call, maintaining the **Strategic Cascade**.

```typescript
// packages/app/hooks/useWorkboard.ts
export const useWorkboard = () => {
  return useQuery({
    queryKey: ['workboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pillars')
        .select(`
          *,
          objectives (*,
            phases (*,
              jobs (*)
            )
          )
        `)
        .order('created_at', { ascending: true })
        .order('order', { foreignTable: 'objectives.phases', ascending: true }); // Preserves L4 order
      
      if (error) throw error;
      return data as Pillar[]; // Cast to L1-L5 Strategic Interface
    }
  });
};

```

### [MODIFY] `types/index.ts`

Standardize naming conventions to prevent UI breaks during the **PostgreSQL** transition.

```typescript
// packages/app/types/index.ts
export interface Job {
  id: string;
  title: string;
  ai_generated_assets: boolean; // Triggers UI success indicators
  status: 'todo' | 'in_progress' | 'review' | 'done';
}
// ... repeat for Phase (L4), Objective (L3), Theme (L2), Pillar (L1)

```

---

## 4. Verification & UI Check

1. **Horizontal Flow**: Confirm **Phases** (L4) appear in the correct sequential order on the Web dashboard.
2. **Tactile UI**: Verify **Jobs** (L5) render as **Stacked Paper Cards** with the correct shadow and border.
3. **AI Markers**: Ensure tasks with `ai_generated_assets: true` display the **✨ emoji** and **trello-green** text.
4. **Platform Parity**: Confirm the **Native Shell** accurately segments the data by Pillar via the `PillarSegmentedControl`.

**Would you like me to generate the full TypeScript interfaces for all five layers to ensure 100% type safety in your Shared Brain?**