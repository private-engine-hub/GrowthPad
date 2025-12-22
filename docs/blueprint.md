# GrowthPad Product Blueprint (v3.0)

**Codename:** Cornerstone
**Context:** Strategic Business Command Center
**Targets:** 4-Target Matrix (Web x2, Native x2)

## 1. UI Philosophy: "Panoramic vs. Pocket"

GrowthPad is a dual-surface strategy tool.

### The Web Shell (`apps/next`)
Targets both Desktop and Mobile browsers.
- **Desktop**: Panoramic 3-column board via horizontal scroll.
- **Mobile-Web**: Responsive stacking or horizontal swiping within the same codebase.
- **Tool**: `shadcn/ui` ScrollArea (Responsive Flex).

### The Pocket Command Center (Mobile)
Designed for quick execution. It uses a **Linear Scrolling Feed**.
- **Tool**: Segmented selection to focus on one pillar at a time.
- **function**: each pillar occupies the mobile screen, with easy touch to expand and keep focus, whilst scrolling hard or tab-click will scroll to the next pillar
- **Interaction**: Bottom sheets for task mutation.

---

## 2. The 5-Layer Strategic Cascade

All data in GrowthPad follows a strict relational hierarchy:

| Layer | Entity | Purpose |
| :--- | :--- | :--- |
| **L1** | **`Pillar`** | Top-level business vertical (Financial, Operational, Market). |
| **L2** | **`Theme`** | The "Why" behind the goal (e.g., Retention, Efficiency). |
| **L3** | **`Objective`** | A high-level milestone (e.g., "Reduce Staff Churn"). |
| **L4** | **`Phase`** | Logical grouping of tasks (e.g., "Diagnosis", "Execution"). |
| **L5** | **`Job`** | The actionable "Leaf" (The task). |

---

## 3. Implementation Guardrails

### No Universal UI
We do not use "Universal Components" for the Shell (Sidebar/Header).
- **Web**: Uses standard browser tags and high-fidelity templates.
- **Native**: Uses native navigation stacks and gesture-heavy UI.

### Shared Logic Contract
Both platforms MUST use the `packages/app/hooks` library. If a developer needs to change how "Progress" is calculated, they change it in the Brain, and both shells reflect the change automatically.

---

## 4. Future: The Strategy Engine
GrowthPad will eventually ingest external playbooks via AI to automatically generate the L3-L5 cascade for a business based on industry benchmarks.
