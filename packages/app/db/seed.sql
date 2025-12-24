-- GrowthPad Seed Data (v4.0)
-- Hierarchy: Mission -> Move -> Objective -> Initiative -> Phase -> Job

-- 1. DIM: Pillars (Fixed IDs)
INSERT INTO pillars (id, title, description) VALUES 
('financial', 'Financial Health', 'Fuel - Cash, Margin, Profit'),
('operational', 'Operational Efficiency', 'The Machine - Efficiency, Quality, Speed'),
('market', 'Market Growth', 'The Context - Reputation, Share, Brand')
ON CONFLICT (id) DO NOTHING;

-- 2. DIM: Themes
-- We'll create dynamic Themes and capture their IDs
DO $$
DECLARE
    theme_retention UUID;
    theme_efficiency UUID;
    theme_acquisition UUID;
    mission_id UUID;
    move_ops UUID;
    move_growth UUID;
    obj_churn UUID;
    obj_capacity UUID;
    init_winback UUID;
    init_auto UUID;
    phase_diag UUID;
    phase_exec UUID;
BEGIN
    -- Create Themes
    INSERT INTO themes (title, color) VALUES ('Retention', '#E11D48') RETURNING id INTO theme_retention;
    INSERT INTO themes (title, color) VALUES ('Efficiency', '#D97706') RETURNING id INTO theme_efficiency;
    INSERT INTO themes (title, color) VALUES ('Acquisition', '#059669') RETURNING id INTO theme_acquisition;

    -- 3. L0: Mission
    INSERT INTO missions (title, description) 
    VALUES ('Build a Profitable, Scalable SMB', 'Achieve sustainable growth with strong margins')
    RETURNING id INTO mission_id;

    -- 4. L1: Moves
    INSERT INTO moves (mission_id, title, description, "order")
    VALUES (mission_id, 'Operational Excellence', 'Build efficient, repeatable processes', 1)
    RETURNING id INTO move_ops;

    INSERT INTO moves (mission_id, title, description, "order")
    VALUES (mission_id, 'Customer-Centric Growth', 'Win and retain through value delivery', 2)
    RETURNING id INTO move_growth;

    -- 5. L2: Objectives (Linked to Moves + DIMs)
    -- Objective A (Growth)
    INSERT INTO objectives (move_id, pillar_id, theme_id, title)
    VALUES (move_growth, 'market', theme_retention, 'Reduce Gross Churn to < 2%')
    RETURNING id INTO obj_churn;

    -- Objective B (Ops)
    INSERT INTO objectives (move_id, pillar_id, theme_id, title)
    VALUES (move_ops, 'operational', theme_efficiency, 'Increase Service Capacity 30%')
    RETURNING id INTO obj_capacity;

    -- 6. L3: Initiatives
    INSERT INTO initiatives (objective_id, title, description, "order")
    VALUES (obj_churn, 'Win-Back Program', 'Recover lost customers through targeted campaigns', 1)
    RETURNING id INTO init_winback;

    INSERT INTO initiatives (objective_id, title, description, "order")
    VALUES (obj_capacity, 'Route Optimization', 'Implement software to reduce drive time', 1)
    RETURNING id INTO init_auto;

    -- 7. L4: Phases
    INSERT INTO phases (initiative_id, title, "order")
    VALUES (init_winback, 'Diagnosis', 1)
    RETURNING id INTO phase_diag;

    INSERT INTO phases (initiative_id, title, "order")
    VALUES (init_winback, 'Execution', 2)
    RETURNING id INTO phase_exec;

    -- 8. L5: Jobs
    INSERT INTO jobs (phase_id, title, status, ai_generated_assets)
    VALUES (phase_diag, 'Analyze cancellation reasons (Last 12 Mo)', 'done', false);

    INSERT INTO jobs (phase_id, title, status, ai_generated_assets)
    VALUES (phase_diag, '✨ AI Insight: Top 3 Churn Correlations', 'in_progress', true);

    INSERT INTO jobs (phase_id, title, status, ai_generated_assets)
    VALUES (phase_exec, 'Launch win-back email sequence', 'todo', false);

END $$;
