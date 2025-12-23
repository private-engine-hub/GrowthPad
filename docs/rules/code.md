# Pragmatic Code Engineering Standards

## Core Objective

Produce **stable, boring, and predictable** code. Prioritize industry-standard boilerplate and battle-tested patterns over custom, speculative, or "clever" logic. Complexity is a liability; simplicity is the primary goal.

---

## 1. The Pragmatism First Rule (Priority: CRITICAL)

*   **KISS (Keep It Simple, Stupid):** Choose the most straightforward path. If a native language feature works, use it instead of a custom utility.
*   **YAGNI (You Aren't Gonna Need It):** No speculative features. Implement only what is required for the current task.
### 1.3 Commit Discipline (Priority: CRITICAL)
- **Atomic Commits**: One commit per logical change.
- **Nomenclature**: Must follow `type[scope]: message` (e.g., `feat[ui]: add sidebar`).
- **Enforcement**: Hooks will block commits that violate this format.
- **Why**: This powers our automated Semantic Release pipeline.

### 1.1 Golden Source Registries (Priority: CRITICAL)
- **Zero Magic Values**: Hardcoded strings, paths, or magic numbers (e.g., `"/platform/workboard"` or `1000 * 60`) are **forbidden** in UI components.
- **Centralized Abstraction**: All application metadata, constants, and business rules must live in the **Shared Brain** (`packages/app`) in typed registries.
- **Standard Registry Usage**:
    - **Navigation**: Use `APP_ROUTES` registry exclusively.
    - **Feature Flags**: Use the `flags.ts` registry.
    - **Assets/Constants**: Use shared data/config files.
- **Platform Parity**: High-level components should accept registry **keys** (e.g., `route="dashboard"`) rather than raw values, delegating the resolution to the component logic.

## 2. Cleanliness & Maintenance (Priority: HIGH)

*   **DRY (Don't Repeat Yourself):** If a pattern or logic repeats more than twice, abstract it into a reusable function/component.
*   **Immediate Pruning:** Delete all dead code (unused imports, variables, or commented-out blocks) immediately.
*   **Human-Readable Naming:** Use clear, conventional names. Avoid obscure abbreviations.

## 3. Structural Integrity (Priority: SECONDARY)

Follow **SOLID** principles only when they do not conflict with simplicity:

* **S:** Single Responsibility—one function does one thing.
* **O/L:** Ensure code is extensible without breaking existing logic.
* **I:** Keep interfaces lean.
* **D:** Use basic dependency injection to keep code testable.

---

> **Final Directive:** If a choice exists between a custom "optimized" solution and a standard "boring" template, **always choose the boring template.**