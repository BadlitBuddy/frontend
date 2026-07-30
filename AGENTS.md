<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# WordScribe Frontend — Agent Rules

This file contains project-specific instructions for AI coding agents (Antigravity, Cursor, Claude, and others). Follow all rules below before writing any code.

---

## Project Overview

WordScribe is a precision transcription web application split into two surfaces:

| Surface               | Framework                | Purpose                                       |
| --------------------- | ------------------------ | --------------------------------------------- |
| **Authenticated App** | Mantine UI               | The core editing and transcription experience |
| **Marketing Pages**   | DaisyUI (Tailwind CSS 4) | Public-facing pages, landing, pricing, etc.   |

---

## Reference Documentation

All project-specific docs and skills live in the `.ai/` directory at the project root.

```
.ai/
├── docs/
│   └── frontend-design-system.md   ← Design system: colors, typography, spacing, component rules
└── skills/
    ├── daisyui/
        └── SKILL.md                ← DaisyUI 5 skill (with sub-guides for install, usage, config, colors, components)
    ├── mantinev9/
        └── SKILL.md                ← Mantine v9 skill (with sub-guides for theme-core, color-system, typography, components)
    ├── multi-stage-dockerfile/
        └── SKILL.md                ← Multi-stage Dockerfile patterns (builder/runtime stages, layer caching, security)
    ├── github-actions-templates/
        └── SKILL.md                ← GitHub Actions workflow templates (test, build/push, deploy, matrix builds)
    └── deployment-pipeline-design/
        └── SKILL.md                ← Multi-stage CI/CD pipeline architecture (approval gates, canary/blue-green, rollback)
```

---

## Mandatory Reading Rules

### Design System

**When:** Before working on any UI component, layout, or styling task.

**Read:** [`.ai/docs/frontend-design-system.md`](./.ai/docs/frontend-design-system.md)

This document defines the canonical:

- Color palette (intentionally restrained — grayscale-first, semantic colors for status only)
- Typography: **Hanken Grotesk** for UI, **JetBrains Mono** for timestamps/technical content
- Spacing: Use Mantine's scale (`xs`, `sm`, `md`, `lg`, `xl`)
- Visual philosophy: clean, calm, distraction-free — the transcript is the primary interface

### Mantine v9 Skill

**When:** Working on the **authenticated application** (anything under the main surface).

**Read:** [`.ai/skills/mantinev9/SKILL.md`](./.ai/skills/mantinev9/SKILL.md)

Then follow its mandatory reference table to read sub-guides as needed (theme, color system, typography, components).

### DaisyUI Skill

**When:** Working on **marketing pages only** (anything under the public/marketing surface).

**Read:** [`.ai/skills/daisyui/SKILL.md`](./.ai/skills/daisyui/SKILL.md)

Then follow its mandatory reference table to read sub-guides as needed (usage, colors, components). Do **not** apply DaisyUI to the authenticated application — use Mantine there.

---

### CI/CD & Deployment Skills

**When:** Before writing or editing any `Dockerfile`, `.github/workflows/*`, or deployment/pipeline configuration.

Pick the skill(s) that match the scope of the change — load more than one if the task spans build, pipeline, and rollout concerns.

| Task | Read |
| --- | --- |
| Writing or updating a `Dockerfile` | [`.ai/skills/multi-stage-dockerfile/SKILL.md`](./.ai/skills/multi-stage-dockerfile/SKILL.md) — multi-stage builds, base image selection, layer caching, non-root runtime users |
| Writing or updating GitHub Actions workflows (`.github/workflows/*.yml`) | [`.ai/skills/github-actions-templates/SKILL.md`](./.ai/skills/github-actions-templates/SKILL.md) — test/build/deploy job templates, matrix builds, reusable workflows, security scanning |
| Designing or debugging the overall deployment pipeline (environment promotion, approval gates, canary/blue-green rollout, rollback strategy) | [`.ai/skills/deployment-pipeline-design/SKILL.md`](./.ai/skills/deployment-pipeline-design/SKILL.md) — see its `references/details.md` and `references/advanced-strategies.md` for platform-specific and multi-region patterns |

Do **not** hand-roll Dockerfile or workflow YAML from memory — read the matching skill first, since these encode project-specific caching, security, and rollback conventions that aren't obvious from the file alone.

---

## Core Conventions

### Component Framework

- **Authenticated app:** Use **Mantine UI** components. Customize via the shared Mantine theme. Extend existing components rather than recreating them. Refer to [`.ai/skills/mantinev9/SKILL.md`](./.ai/skills/mantinev9/SKILL.md) for usage details.
- **Marketing pages:** Use **DaisyUI** on top of Tailwind CSS 4. Refer to `.ai/skills/daisyui/` for correct class names.