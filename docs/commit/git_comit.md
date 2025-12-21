Adopting the `type[scope]: message` format is a great choice for enterprise environments—the square brackets often make the scope "pop" visually in a dense Git log compared to standard parentheses.

Here are the foundational best practices for enterprise-grade version control and collaboration.

---

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

### Branch Naming: `category/ticket-id-description`

| Category | Purpose | Example |
| --- | --- | --- |
| `feat/` | New functionality | `feat/DEV-402-sso-integration` |
| `fix/` | Bug fixes | `fix/BUG-99-header-misalignment` |
| `refactor/` | Code cleanup (no logic change) | `refactor/DEV-500-clean-hooks` |
| `docs/` | Documentation only | `docs/DEV-12-api-readme` |

### The Flow

1. **Main:** Always deployable. Represents the current state of production.
2. **Develop:** The "integration" branch where features merge before a release.
3. **Feature Branches:** Where the actual work happens. Never commit directly to `main` or `develop`.

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

## 🤖 Automating the Standards

Humans are forgetful. Use tools to enforce these rules so you don't have to be the "Commit Police" in code reviews:

* **Husky:** Prevents commits that don't follow your `type[scope]` format.
* **Lint-Staged:** Runs your linter/formatter only on the files you've changed.
* **Semantic Release:** Automatically calculates version numbers (1.2.3) based on your commit types.