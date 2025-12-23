# Automated Release Workflow

## 🚀 The Release Cycle
GrowthPad uses **Semantic Release** to automate versioning, changelogs, and publishing. The version number is determined strictly by the commit history.

### Main vs Develop
*   **`main`**: The official release branch. Merging to `main` creates a new production tag (e.g., `v1.2.3`).
*   **`develop`**: The integration branch. Merging to `develop` creates a pre-release tag (e.g., `v1.3.0-beta.1`).

---

## 💎 Commit Guidelines (Enterprise Standard)
We strictly enforce the **Atomic Commit** nomenclature defined in [CICD Standards](../development/cicd.md).

**Format**: `type[scope]: message`

### Types
| Type | Version Bump | Usage |
| :--- | :--- | :--- |
| `feat` | **Minor** (`+0.1.0`) | New features (e.g., `feat[auth]: add login`). |
| `fix` | **Patch** (`+0.0.1`) | Bug fixes (e.g., `fix[ui]: align button`). |
| `perf` | **Patch** (`+0.0.1`) | Performance improvements. |
| `refactor`| **None** | Code changes that mostly affect structure. |
| `docs` | **None** | Documentation only. |
| `chore` | **None** | Build scripts, dependencies, etc. |
| `style` | **None** | Formatting, missing semi-colons, etc. |

### Major Releases
To trigger a **Major** bump (`+1.0.0`), verify a breaking change.
*   **Footer**: `BREAKING CHANGE: The API has been completely rewritten.`
*   **Header**: `feat[auth]!: drop support for v1 protocol` (Note the `!`)

---

## 🏗️ Version Registry
The application version is tracked in `packages/app/version.ts`.
*   **DO NOT EDIT MANUALLY.**
*   The release pipeline automatically updates this file.
*   Use `APP_VERSION` in your UI components to display the build version.

## 🛠️ How to Debug
Run a dry-run to see what version *would* be released without actually publishing:
```bash
npm run release -- --dry-run
```
