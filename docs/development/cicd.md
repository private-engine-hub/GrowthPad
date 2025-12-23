# CICD Overview

## 💎 The Anatomy of a Great Commit

In an enterprise setting, a commit is a **historical record**. Five years from now, a developer should be able to look at your commit and understand not just what you did, but what you were thinking.

### The Format

`type[scope]: message`

* **Feat:** `feat[auth]: add MFA support via TOTP`
* **Fix:** `fix[api]: resolve 500 error on empty search strings`
* **Refactor:** `refactor[styles]: move theme variables to CSS modules`
* **Chore:** `chore[deps]: bump lodash from 4.17.15 to 4.17.21`

### Foundation: Atomic Commits

The gold standard of enterprise dev is the **Atomic Commit**. This means one commit does **one thing**.

* **Why?** If a feature breaks production, it’s much easier to `revert` one specific fix than a "giant ball of mud" commit that touched 50 files.
* **Rule of Thumb:** If you have to use the word "and" in your commit message (e.g., "Add login page and fix footer bug"), it should probably be two separate commits.

---

## 🌿 Enterprise Branching Strategy

Consistency in branching prevents the "Where is the latest code?" syndrome.

### Branch Naming: `category/ticketid-description`
Note: feat useses the 't' ticket id, fix uses the 'f' ticket id, refactor uses the 'r' ticket id, docs uses the 'd' ticket id.
| Category | Purpose | Example |
| --- | --- | --- |
| `feat/` | New functionality | `feat/t402-sso-integration` |
| `fix/` | Bug fixes | `fix/f979-header-misalignment` |
| `refactor/` | Code cleanup (no logic change) | `refactor/r509-clean-hooks` |
| `docs/` | Documentation only | `docs/d012-api-readme` |
and more...

### The Flow

1. **Main:** Always deployable. Represents the current state of production. **Direct commits are blocked by Husky.**
2. **Dev:** The "integration" branch where features merge before a release.
3. **Feature Branches:** Where the actual work collects. Never commit directly to `main` or `dev`. Always merge to `dev` and then `dev` to `main`.

---

## 📝 Pull Request (PR) Hygiene

In enterprise, the PR is the primary gatekeeper for quality.

* **The 400-Line Rule:** Try to keep PRs under 400 lines of code. Studies show that reviewer effectiveness drops significantly after this point.
* **The Description Template:** Every PR should answer:
1. **What** is this changing?
2. **Why** is this necessary? (Link the Jira/Linear ticket)
3. **How** can the reviewer test this?


* **Small Diffs, High Context:** Use **Draft PRs** to get early feedback on architecture before you spend 10 hours polishing code that might need to be rewritten.

---

## 🏗️ Architectural Decision Records (ADRs)

In enterprise software, code changes frequently, but **decisions** stay. When you make a major technical choice (e.g., "Why we chose PostgreSQL over MongoDB"), don't just put it in a Slack thread.

* **Keep a `/docs/adr` folder** in your repo.
* Store simple Markdown files: `0001-record-architecture-decisions.md`.
* This creates a "Paper Trail" for future hires to understand the "Why" behind the "What."

---

---

## 💎 Automated Versioning

GrowthPad uses **Semantic Release** to eliminate manual versioning overhead. Every commit to `main` or `dev` is analyzed to determine the next logical version.

### The Version Registry
All platforms (Web/Native) consume the version from a single "Source of Truth":
- **Location**: `packages/app/version.ts`
- **Automation**: This file is updated by the CI pipeline. **Never edit it manually.**
- **Usage**: `import { APP_VERSION } from 'packages/app/version';`

### Release Logic
| Commit Type | Version Impact | Resulting Tag |
| :--- | :--- | :--- |
| `feat[...]!` | **MAJOR** | `v2.0.0` |
| `feat[...]` | **MINOR** | `v1.2.0` |
| `fix[...]` | **PATCH** | `v1.1.1` |

---

## 🤖 Automating the Standards

Humans are forgetful. We use automation to protect the repository's historical integrity:

* **Husky**: 
    - `commit-msg`: Enforces the `type[scope]` format.
    - `pre-commit`: Blocks direct commits to `main` (Main belongs to the robots 🤖).
* **Commitlint**: Validates that every message contains a valid type and required scope.
* **Semantic Release**: Calculates the version, updates `package.json` and `version.ts`, generates a `CHANGELOG.md`, and creates the GitHub Release.

### Verification
To preview what the next version would be without actually releasing:
```bash
npm run release -- --dry-run
```