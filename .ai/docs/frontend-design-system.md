# Frontend Design System

## Design Philosophy

Precision Transcription is built around **focused, distraction-free editing**.

The interface should feel calm, predictable, and professional, allowing users to concentrate on transcription rather than the software itself. Every UI decision should prioritize readability, efficiency, and clarity over visual decoration.

The transcript is the primary interface. Everything else is supporting context.

---

## Core Principles

### Content First

The transcript should always receive the greatest visual emphasis. UI chrome should remain secondary and never compete for attention.

### Precision Over Personality

Favor consistency, legibility, and predictable interactions over decorative styling or unnecessary animations.

### Whitespace as Structure

Use spacing and typography to create hierarchy before introducing borders or background colors.

### Minimal Color

The interface is intentionally grayscale. Color exists to communicate actions and system status—not decoration.

### Typography Leads

Hierarchy should primarily come from typography rather than heavy visual treatments.

---

## Color Palette

The application uses a restrained semantic color system.

| Role           | Color     | Usage                                    |
| -------------- | --------- | ---------------------------------------- |
| Background     | `#F8FAFC` | Application background                   |
| Surface        | `#FFFFFF` | Cards, panels, dialogs                   |
| Border         | `#E2E8F0` | Dividers and outlines                    |
| Text Primary   | `#0F172A` | Headings and primary content             |
| Text Secondary | `#475569` | Supporting information                   |
| Text Muted     | `#64748B` | Metadata and helper text                 |
| Primary        | `#0F172A` | Primary actions and interactive elements |
| Success        | `#15803D` | Success states                           |
| Warning        | `#CA8A04` | Warning states                           |
| Error          | `#DC2626` | Error states                             |

### Color Guidelines

- Default to grayscale whenever possible.
- Reserve semantic colors for system feedback.
- Avoid using color solely for decoration.
- Maintain strong text contrast to support long editing sessions.

---

## Icons

- use lucide react for the icons, import them the the suffix \*Icon, instead of using the shorthand. for example use `BadgeCheckIcon` instead of `BadgeCheckIcon`,`EarthIcon` Instead Of `Earth`

```ts
import {
  BadgeCheckIcon,
  EarthIcon,
  HatGlassesIcon,
  ZapIcon,
} from "lucide-react";
```

## Typography

### Primary Font

**Hanken Grotesk**

Used throughout the interface for headings, body text, forms, and transcript editing.

### Monospace Font

**JetBrains Mono**

Used for timestamps, keyboard shortcuts, metadata, IDs, and other technical information.

### Typography Guidelines

- Prefer readable line lengths.
- Use font weight before increasing font size.
- Transcript content should remain highly legible during extended editing sessions.
- Avoid excessive font size variation.

---

## Layout & Spacing

The interface should feel spacious without wasting screen real estate.

### Guidelines

- Use Mantine's default spacing scale (`xs`, `sm`, `md`, `lg`, `xl`).
- Separate sections primarily through spacing rather than borders.
- Keep transcript lines at a comfortable reading width.
- Maintain consistent alignment across panels and controls.

---

## Component Framework

### Application Interface

The authenticated application is built using **Mantine UI**.

- Prefer Mantine components over custom implementations.
- Customize appearance through the shared Mantine theme.
- Extend existing components instead of recreating them.
- Refer to [Mantine v9 Skill](file:///d:/Projects%20D/wordscribe-frontend/.ai/skills/mantinev9/SKILL.md) for detailed components, configuration, and theming rules.

### Marketing Pages

Public-facing pages are built using **DaisyUI**.

These pages may be more expressive in layout and typography while remaining consistent with the overall minimalist aesthetic and shared color palette.

- Refer to [DaisyUI Skill](file:///d:/Projects%20D/wordscribe-frontend/.ai/skills/daisyui/SKILL.md) for classes, colors, and layout rules.

---

## Visual Style

The interface should remain clean and understated.

- Favor subtle borders over shadows.
- Use rounded corners consistently through the Mantine theme.
- Avoid unnecessary gradients, glassmorphism, or decorative effects.
- Keep animations quick, purposeful, and unobtrusive.

Every visual element should support the user's workflow rather than draw attention to itself.
