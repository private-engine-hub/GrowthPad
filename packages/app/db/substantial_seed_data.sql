-- substantial_seed_data.sql
-- Run this in your Supabase SQL Editor to populate a deep tree.
-- This script adds data to the EXISTING Mission: 'Build a Profitable, Scalable SMB'

DO $$
DECLARE
    m_id UUID;
    t_retention UUID;
    t_efficiency UUID;
    t_acquisition UUID;
    t_brand UUID;
    
    -- New Moves
    move_id_3 UUID;
    move_id_4 UUID;
    
    -- New Objectives
    obj_upsell UUID;
    obj_automation UUID;
    obj_hiring UUID;
    obj_onboarding UUID;
    
    -- New Initiatives
    init_crm UUID;
    init_referral UUID;
    init_talent UUID;
    init_training UUID;
    
    -- New Phases
    p_research UUID;
    p_dev UUID;
    p_test UUID;
    p_launch UUID;
BEGIN
    -- 1. Identify existing Mission
    SELECT id INTO m_id FROM missions WHERE title = 'Build a Profitable, Scalable SMB' LIMIT 1;
    
    -- If no mission exists, create one
    IF m_id IS NULL THEN
        INSERT INTO missions (title, description) 
        VALUES ('Build a Profitable, Scalable SMB', 'Achieve sustainable growth with strong margins')
        RETURNING id INTO m_id;
    END IF;

    -- 2. Ensure basic Themes exist
    SELECT id INTO t_retention FROM themes WHERE title = 'Retention' LIMIT 1;
    SELECT id INTO t_efficiency FROM themes WHERE title = 'Efficiency' LIMIT 1;
    SELECT id INTO t_acquisition FROM themes WHERE title = 'Acquisition' LIMIT 1;
    
    -- Ensure Brand theme exists
    SELECT id INTO t_brand FROM themes WHERE title = 'Brand Awareness' LIMIT 1;
    IF t_brand IS NULL THEN
        INSERT INTO themes (title, color) VALUES ('Brand Awareness', '#8B5CF6') RETURNING id INTO t_brand;
    END IF;

    -- 3. Add More Moves (L1)
    INSERT INTO moves (mission_id, title, description, "order")
    VALUES (m_id, 'Scale & Systemize', 'Automate low-value tasks to focus on strategy', 3)
    RETURNING id INTO move_id_3;

    INSERT INTO moves (mission_id, title, description, "order")
    VALUES (m_id, 'The "A-Player" Flywheel', 'Hire and train the best talent available', 4)
    RETURNING id INTO move_id_4;

    -- 4. Add More Objectives (L2)
    -- Under Move 3 (Scale)
    INSERT INTO objectives (move_id, pillar_id, theme_id, title)
    VALUES (move_id_3, 'operational', COALESCE(t_efficiency, t_acquisition), 'Automate 50% of Support Tickets')
    RETURNING id INTO obj_automation;

    INSERT INTO objectives (move_id, pillar_id, theme_id, title)
    VALUES (move_id_3, 'financial', COALESCE(t_acquisition, t_efficiency), 'Increase LTV by 20% through Upsells')
    RETURNING id INTO obj_upsell;

    -- Under Move 4 (People)
    INSERT INTO objectives (move_id, pillar_id, theme_id, title)
    VALUES (move_id_4, 'operational', COALESCE(t_efficiency, t_brand), 'Reduce Time-to-Hire by 14 Days')
    RETURNING id INTO obj_hiring;

    -- 5. Add More Initiatives (L3)
    -- Under Automation Objective
    INSERT INTO initiatives (objective_id, title, description, "order")
    VALUES (obj_automation, 'AI Support Chatbot', 'Deploy LLM-based bot for tier-1 support', 1)
    RETURNING id INTO init_crm;

    -- Under Upsell Objective
    INSERT INTO initiatives (objective_id, title, description, "order")
    VALUES (obj_upsell, 'Referral Reward System', 'Incentivize existing clients to refer new business', 1)
    RETURNING id INTO init_referral;

    -- Under Hiring Objective
    INSERT INTO initiatives (objective_id, title, description, "order")
    VALUES (obj_hiring, 'University Talent Pipeline', 'Establish recurring internship program', 1)
    RETURNING id INTO init_talent;

    -- 6. Add More Phases (L4)
    -- For AI Chatbot
    INSERT INTO phases (initiative_id, title, "order") VALUES (init_crm, 'Model Selection', 1) RETURNING id INTO p_research;
    INSERT INTO phases (initiative_id, title, "order") VALUES (init_crm, 'Dataset Prep', 2) RETURNING id INTO p_dev;
    INSERT INTO phases (initiative_id, title, "order") VALUES (init_crm, 'QA & Testing', 3) RETURNING id INTO p_test;
    INSERT INTO phases (initiative_id, title, "order") VALUES (init_crm, 'Staged Rollout', 4) RETURNING id INTO p_launch;

    -- 7. Add More Jobs (L5)
    -- Model Selection Jobs
    INSERT INTO jobs (phase_id, title, status) VALUES (p_research, 'Benchmark GPT-4 vs Claude 3', 'done');
    INSERT INTO jobs (phase_id, title, status) VALUES (p_research, 'Review privacy compliance for customer data', 'done');
    INSERT INTO jobs (phase_id, title, status) VALUES (p_research, 'Finalize vendor contract', 'todo');

    -- Dataset Prep Jobs
    INSERT INTO jobs (phase_id, title, status, ai_generated_assets) VALUES (p_dev, 'Export Intercom history (clean CSV)', 'done', false);
    INSERT INTO jobs (phase_id, title, status, ai_generated_assets) VALUES (p_dev, '✨ AI: Synthesize 500 FAQ entries', 'in_progress', true);
    INSERT INTO jobs (phase_id, title, status, ai_generated_assets) VALUES (p_dev, 'Manual audit of high-risk answers', 'todo', false);

    -- QA Jobs
    INSERT INTO jobs (phase_id, title, status) VALUES (p_test, 'Internal Alpha testing', 'todo');
    INSERT INTO jobs (phase_id, title, status) VALUES (p_test, 'Setup Sentry monitoring', 'todo');

    -- Talent Pipeline Jobs (Just a few)
    INSERT INTO phases (initiative_id, title, "order") VALUES (init_talent, 'Outreach', 1) RETURNING id INTO p_research;
    INSERT INTO jobs (phase_id, title, status) VALUES (p_research, 'Contact Top 5 local business schools', 'done');
    INSERT INTO jobs (phase_id, title, status) VALUES (p_research, 'Draft internship curriculum', 'todo');

END $$;
