-- GrowthPad Relational Schema (v4.0)
-- Implementing the 6-Layer Strategic Hierarchy: Mission -> Move -> Objective -> Initiative -> Phase -> Job
-- Pillars and Themes are now Dimension Tables (DIM)

-- 0. CLEANUP (Force Reset for Pivot)
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS initiatives CASCADE;
DROP TABLE IF EXISTS objectives CASCADE;
DROP TABLE IF EXISTS moves CASCADE;
DROP TABLE IF EXISTS missions CASCADE;
DROP TABLE IF EXISTS pillars CASCADE;
DROP TABLE IF EXISTS themes CASCADE;

-- 1. Pillars (DIM: Business Verticals)
CREATE TABLE IF NOT EXISTS pillars (
    id TEXT PRIMARY KEY,                       -- 'financial', 'operational', 'market'
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Themes (DIM: Strategic Intent)
CREATE TABLE IF NOT EXISTS themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#00818E',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Missions (L0: The North Star)
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Moves (L1: Strategy & Tactics - The "How")
CREATE TABLE IF NOT EXISTS moves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Objectives (L2: High-Level Milestones)
CREATE TABLE IF NOT EXISTS objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    move_id UUID REFERENCES moves(id) ON DELETE CASCADE,
    pillar_id TEXT REFERENCES pillars(id) ON DELETE SET NULL, -- DIM Link
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,   -- DIM Link
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Initiatives (L3: Grouped Work)
CREATE TABLE IF NOT EXISTS initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Phases (L4: Logic Grouping)
CREATE TABLE IF NOT EXISTS phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    initiative_id UUID REFERENCES initiatives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Jobs (L5: The Leaf / Task)
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('todo', 'in_progress', 'review', 'done')) DEFAULT 'todo',
    ai_generated_assets BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_moves_mission ON moves(mission_id);
CREATE INDEX IF NOT EXISTS idx_objectives_move ON objectives(move_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_objective ON initiatives(objective_id);
CREATE INDEX IF NOT EXISTS idx_phases_initiative ON phases(initiative_id);
CREATE INDEX IF NOT EXISTS idx_jobs_phase ON jobs(phase_id);

-- RLS should be enabled in production
-- ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
