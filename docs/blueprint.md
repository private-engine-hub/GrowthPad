# GrowthPad Product Blueprint

**Codename:** Cornerstone
**Context:** Strategic Business Command Center

## 1. Product Intent & UI Philosophy
GrowthPad is designed to combat "dashboard fatigue" by providing a prescriptive, action-oriented workspace. Unlike traditional BI tools that only show data, the **Growth Workboard** transforms strategy into prioritized workstreams.

### The "Card-Cascade" Metaphor
The UI follows a rigid hierarchical flow that guides the user from high-level vision down to daily execution:

1.  **Pillars (Columns)**: The fixed foundations of the business (Financial, Operational, Market).
2.  **Themes (Headers)**: Logical strategic groupings within a pillar (e.g., "Retention", "Unit Economics").
3.  **Objectives (Accordions)**: High-level strategic goals that can be expanded to reveal the execution path.
4.  **Phases (Dividers)**: Time-based or logical steps within an objective (e.g., "Research", "Execution").
5.  **Jobs (Cards)**: Discrete, actionable tasks. These are the "leaves" of the strategy tree.

## 2. Data Architecture (The 5-Layer Cascade)

All strategic logic in GrowthPad follows a strictly enforced 5-layer relational cascade. 

### Core Schema Map
| Layer | Entity | Description |
| :--- | :--- | :--- |
| **L1** | **`Pillar`** | Top-level containers (Financial, Operational, Market). |
| **L2** | **`Theme`** | Strategic categories inside pillars. |
| **L3** | **`Objective`** | Multi-week strategic goals linked to a `Team`. |
| **L4** | **`Phase`** | Logical milestones inside an Objective. |
| **L5** | **`Job`** | Actionable tasks with AI-generated assets. |

### Relational Flow
`Team` -> `Pillar (3 Fixed)` -> `Theme` -> `Objective` -> `Phase` -> `Job`

## 3. The "Strategy Engine" (Future)
The platform is designed to house a RAG (Retrieval Augmented Generation) engine:
1.  **Playbooks**: A library of "Golden Strategies" (Vectorized).
2.  **Onboarding**: Ingests User Industry + Pain Points.
3.  **Matching**: Retrieval of relevant Playbooks via vector similarity.
4.  **Generation**: LLM customizes the Playbook into specific **Objectives** and **Jobs** for the user's Workboard.

## 4. UI Implementation Details
- **Dashboard Layout**: Enforces a 3-column "Pillar" view on large screens.
- **Progressive Disclosure**: Detailed Job info is hidden behind the "Canvas" or a right-side "Detail Panel" to maintain focus on the high-level strategy.
- **Platform Parity**: The Card-Cascade scales from a multi-column desktop "Canvas" to a single-column mobile "Feed".
