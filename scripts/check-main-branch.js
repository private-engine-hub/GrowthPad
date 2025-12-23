const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

    if (branch === 'main') {
        // 1. Allow if it's a merge commit (MERGE_HEAD exists during the commit process of a merge)
        const isMerging = fs.existsSync(path.join(process.cwd(), '.git', 'MERGE_HEAD'));

        // 2. Allow if it's an automated release commit (semantic-release)
        // We check for [skip ci] which is standard for semantic-release commits
        // Or we could check the last commit message if we wanted to be more specific, 
        // but usually pre-commit runs BEFORE the message is even written if using simple git commit.
        // However, semantic-release commits often bypass hooks or we can detect them via env vars if they were present.
        // For local protection, blocking all but merges is the safest bet.

        if (!isMerging) {
            console.error('\n\x1b[31m%s\x1b[0m', '🛑 ERROR: Direct commits to [main] are forbidden by Enterprise Policy.');
            console.error('\x1b[33m%s\x1b[0m', 'Please follow the workflow:');
            console.error('  1. Work on feature branches or [dev]');
            console.error('  2. Merge [dev] -> [main]\n');
            console.error('If you absolutely must commit directly, use --no-verify (not recommended).\n');
            process.exit(1);
        }
    }
} catch (error) {
    // If git fails (e.g. no commits yet), just allow it
    process.exit(0);
}
