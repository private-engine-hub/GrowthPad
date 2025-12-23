-- GrowthPad Relational Schema (v3.1)
-- Implementing the 5-Layer Strategic Cascade

-- 1. Pillars (L1: Fixed IDs for UI stability)
CREATE TABLE IF NOT EXISTS pillars (
    id TEXT PRIMARY KEY,                       -- 'financial', 'operational', 'market'
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Themes (L2: Identity Palette Mapping)
CREATE TABLE IF NOT EXISTS themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#00818E',     -- Default Trello Blue
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Objectives (L3: High-Level Goals)
CREATE TABLE IF NOT EXISTS objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar_id TEXT REFERENCES pillars(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Phases (L4: Sequential Kanban Columns)
CREATE TABLE IF NOT EXISTS phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,        -- Ensures horizontal canvas flow
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Jobs (L5: Actionable Tasks)
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('todo', 'in_progress', 'review', 'done')) DEFAULT 'todo',
    ai_generated_assets BOOLEAN DEFAULT FALSE, -- Triggers ✨ UI indicators
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_objectives_pillar ON objectives(pillar_id);
CREATE INDEX IF NOT EXISTS idx_phases_objective ON phases(objective_id);
CREATE INDEX IF NOT EXISTS idx_jobs_phase ON jobs(phase_id);

-- Seeding: Pillars
INSERT INTO pillars (id, title, description) VALUES 
('financial', 'Financial Health', 'Fuel - Cash, Margin, Profit'),
('operational', 'Operational Efficiency', 'The Machine - Efficiency, Quality, Speed'),
('market', 'Market Growth', 'The Context - Reputation, Share, Brand')
ON CONFLICT (id) DO NOTHING;

-- Note: Enable Row Level Security (RLS) on all tables once Supabase Auth is configured.
-- Example: ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
