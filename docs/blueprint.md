# GrowthPad Product Blueprint

**Codename:** Cornerstone
**Context:** Strategic Business Command Center

## 1. Product Intent & UI Philosophy
GrowthPad is designed to combat "dashboard fatigue" by providing a prescriptive, action-oriented workspace. Unlike traditional BI tools that only show data, the **Growth Workboard** transforms strategy into prioritized workstreams.

### The "Universal Kanban" Metaphor
The UI follows a rigid hierarchical flow presented as a **Visual Board**:

1.  **Columns (Pillars)**: The fixed foundations of the business (Financial, Operational, Market).
2.  **Cards (Jobs)**: Discrete, actionable tasks. These are the "leaves" of the strategy tree.
3.  **Tags (Themes)**: Logical strategic groupings within a card (e.g., "Retention", "Unit Economics").

## 2. Data Architecture (The 5-Layer Cascade)

All strategic logic in GrowthPad follows a strictly enforced 5-layer relational cascade. 

### Core Schema Map
| Layer | Entity | Description |
| :--- | :--- | :--- |
| **L1** | **`Pillar`** | Top-level containers (Board Columns: Financial, Operational, Market). |
| **L2** | **`Theme`** | Strategic categories inside cards. |
| **L3** | **`Objective`** | Multi-week strategic goals linked to a `Team`. |
| **L4** | **`Phase`** | Logical milestones inside an Objective. |
| **L5** | **`Job`** | Actionable tasks (The actual Card). |

### Relational Flow
`Team` -> `Pillar (3 Fixed Columns)` -> `Theme` -> `Objective` -> `Phase` -> `Job (Card)`

## 3. The "Strategy Engine" (Future)
The platform is designed to house a RAG (Retrieval Augmented Generation) engine:
1.  **Playbooks**: A library of "Golden Strategies" (Vectorized).
2.  **Onboarding**: Ingests User Industry + Pain Points.
3.  **Matching**: Retrieval of relevant Playbooks via vector similarity.
4.  **Generation**: LLM customizes the Playbook into specific **Objectives** and **Jobs** for the user's Workboard.

## 4. UI Implementation Details
- **Universal Board**: Enforces a horizontal scrolling view identical on Web and Mobile via `ScrollView`.
- **Standardized Z-Axis**: Detailed Job info is displayed in a right-side **Side Panel** (Web) or **Bottom Sheet** (Native) via the `Sheet` primitive.
- **Progressive Disclosure**: Keeps the main Workboard clean while allowing deep-dive into execution steps without losing context.
- **Platform Parity**: The Board scales from a multi-column desktop "Canvas" to a horizontal swipe "Feed" on mobile.
