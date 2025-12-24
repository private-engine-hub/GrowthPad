-- GROWTHPAD REBOOT SCRIPT (v4.0)
-- This script does EVERYTHING: Drops, Creates, and Seeds.
-- 🚨 WARNING: This will delete all existing data.

-- 0. CLEANUP
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS initiatives CASCADE;
DROP TABLE IF EXISTS objectives CASCADE;
DROP TABLE IF EXISTS moves CASCADE;
DROP TABLE IF EXISTS missions CASCADE;
DROP TABLE IF EXISTS pillars CASCADE;
DROP TABLE IF EXISTS themes CASCADE;

-- 1. CREATE TABLES
CREATE TABLE pillars (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#00818E'
);

CREATE TABLE missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE moves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0
);

CREATE TABLE objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    move_id UUID REFERENCES moves(id) ON DELETE CASCADE,
    pillar_id TEXT REFERENCES pillars(id) ON DELETE SET NULL,
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
    title TEXT NOT NULL
);

CREATE TABLE initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0
);

CREATE TABLE phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    initiative_id UUID REFERENCES initiatives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'todo',
    ai_generated_assets BOOLEAN DEFAULT FALSE
);

-- 2. SEED DATA (FLAT)
-- Fixed IDs for ease of reference
INSERT INTO pillars (id, title, description) VALUES 
('financial', 'Financial Health', 'Fuel - Cash, Margin, Profit'),
('operational', 'Operational Efficiency', 'The Machine - Efficiency, Quality, Speed'),
('market', 'Market Growth', 'The Context - Reputation, Share, Brand');

INSERT INTO themes (id, title, color) VALUES 
('11111111-1111-1111-1111-111111111111', 'Retention', '#E11D48'),
('22222222-2222-2222-2222-222222222222', 'Efficiency', '#D97706');

INSERT INTO missions (id, title, description) VALUES 
('00000000-0000-0000-0000-000000000000', 'Build a Profitable, Scalable SMB', 'Achieve sustainable growth with strong margins');

INSERT INTO moves (id, mission_id, title, description, "order") VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'Operational Excellence', 'Build efficient, repeatable processes', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'Customer-Centric Growth', 'Win and retain through value delivery', 2);

INSERT INTO objectives (id, move_id, pillar_id, theme_id, title) VALUES 
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'market', '11111111-1111-1111-1111-111111111111', 'Reduce Gross Churn to < 2%'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'operational', '22222222-2222-2222-2222-222222222222', 'Increase Service Capacity 30%');

INSERT INTO initiatives (id, objective_id, title, description, "order") VALUES 
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Win-Back Program', 'Recover lost customers', 1),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Route Optimization', 'Reduce drive time', 1);

INSERT INTO phases (id, initiative_id, title, "order") VALUES 
('99999999-9999-9999-9999-999999999999', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Diagnosis', 1);

INSERT INTO jobs (phase_id, title, status, ai_generated_assets) VALUES 
('99999999-9999-9999-9999-999999999999', 'Analyze cancellation reasons', 'done', false),
('99999999-9999-9999-9999-999999999999', '✨ AI Insight: Top 3 Correlations', 'in_progress', true);
