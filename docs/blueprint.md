# GrowthPad Product Blueprint (v4.0)

**Codename:** Cornerstone
**Context:** Strategic Business Playbook Canvas
**Targets:** 4-Target Matrix (Web x2, Native x2)

## 1. UI Philosophy: "Panoramic vs. Pocket"

GrowthPad is a dual-surface strategy tool.

### The Web Shell (`apps/next`)
Targets both Desktop and Mobile browsers.
- **Desktop**: Panoramic 3-column board via horizontal scroll.
- **Mobile-Web**: Responsive stacking or horizontal swiping within the same codebase.
- **Tool**: `shadcn/ui` ScrollArea (Responsive Flex).

### The Pocket Playbook Canvas (Mobile)
Designed for quick execution. It uses a **Linear Scrolling Feed**.
- **Tool**: Segmented selection to focus on one pillar at a time.
- **function**: each pillar occupies the mobile screen, with easy touch to expand and keep focus, whilst scrolling hard or tab-click will scroll to the next pillar
- **Interaction**: Bottom sheets for task mutation.

---

## 2. The 6-Layer Strategic Cascade

All data in GrowthPad follows a strict relational hierarchy with parallel dimension lookups (Pillars/Themes).

| Layer | Entity | Purpose |
| :--- | :--- | :--- |
| **L0** | **`Mission`** | The North Star (Root). Single source of ultimate intent. |
| **L1** | **`Move`** | The "How" (Strategy/Tactic). High-level directional shift. |
| **L2** | **`Objective`** | High-level milestones (e.g. "Reduce Churn"). Linked to DIMs. |
| **L3** | **`Initiative`** | Grouped work or programs aimed at an objective. |
| **L4** | **`Phase`** | Logical grouping of tasks (e.g. "Diagnosis", "Execution"). |
| **L5** | **`Job`** | The actionable "Leaf" (The task). |

> [!NOTE]
> **Pillars** and **Themes** are now Dimension Tables (DIM) linked to L2 Objectives, providing vertical/thematic context without constraining the structural tree.


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
