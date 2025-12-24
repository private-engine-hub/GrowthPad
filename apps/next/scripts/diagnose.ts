
require('dotenv').config({ path: '../../.env.local' }); // Try project root or apps/next env
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    require('dotenv').config({ path: './.env.local' });
}

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Environment Variables. Please ensure .env.local exists.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log("🔄 Checking Raw Table Counts...");
    const tables = ['missions', 'moves', 'objectives', 'initiatives', 'phases', 'jobs', 'pillars', 'themes'];
    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) console.error(`❌ Error counting ${table}:`, error.message);
        else console.log(`📊 ${table}: ${count} rows`);
    }

    console.log("\n🔄 Testing Nested Fetch...");
    // 1. Fetch Missions
    const { data: missions, error } = await supabase
        .from('missions')
        .select(`
            id, title,
            moves (
                id, title,
                objectives (
                    id, title,
                    initiatives (
                        id, title
                    )
                )
            )
        `);

    if (error) {
        console.error("❌ API Error:", error.message);
        return;
    }

    if (!missions || missions.length === 0) {
        console.log("⚠️ No Missions found in DB.");
        return;
    }

    console.log(`✅ Found ${missions.length} Missions.`);

    missions.forEach((m: any) => {
        console.log(`\n📂 Mission: ${m.title} (${m.id})`);
        if (!m.moves || m.moves.length === 0) {
            console.log("   ⚠️ No Moves linked.");
            return;
        }

        m.moves.forEach((mv: any) => {
            console.log(`   ➡️ Move: ${mv.title}`);
            if (!mv.objectives || mv.objectives.length === 0) {
                console.log("      ⚠️ 0 Objectives returned (Possible Relationship Issue)");
            } else {
                console.log(`      ✅ ${mv.objectives.length} Objectives found.`);
                mv.objectives.forEach((o: any) => {
                    console.log(`         🎯 Obj: ${o.title}`);
                    if (o.initiatives && o.initiatives.length > 0) {
                        console.log(`            ✅ ${o.initiatives.length} Initiatives`);
                    } else {
                        console.log("            ⚠️ 0 Initiatives");
                    }
                });
            }
        });
    });
}

testFetch();
