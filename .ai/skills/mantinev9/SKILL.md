---
name: mantinev9
description: Mantine v9 UI component library skill. The mandatory UI library for the authenticated application. TRIGGER when generating any JSX, TSX, React, or UI code for the (main) authenticated application surface.
metadata:
  version: 9.x.x
  source: https://mantine.dev/
---

# Mantine v9

Mantine v9 is a fully featured React component library. It provides customizable component styling, theme configuration, and semantic color schemes.

## When to run this skill:

- Trigger this skill whenever generating React (JSX/TSX) code for the (main) authenticated application.
- Trigger this skill for Mantine UI work, layout, styling, and theme customizer modifications.
- Trigger this skill when the user mentions terms like: Mantine, authenticated app, panel, editor, transcript view, or Mantine components (e.g., Button, Stack, Group, Text, Menu).
- Trigger this skill even if the user does not explicitly ask for it when working on the application surface (non-marketing pages).

## Mandatory reference

| Task                          | Guide                                                                        | Note                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| General Design System         | [../../docs/frontend-design-system.md](../../docs/frontend-design-system.md) | MANDATORY. Read before editing any UI components or layouts.                       |
| Customizing Theme Core        | [./theme/theme-core.md](./theme/theme-core.md)                               | Use for custom provider config, colorSchemeManager, or general theming overrides.  |
| Designing Color System        | [./theme/color-system.md](./theme/color-system.md)                           | MANDATORY. Underpinning of the grayscale and status color system.                  |
| Configuring Typography        | [./theme/typography.md](./theme/typography.md)                               | Use for font scaling, custom family configuration, and headings.                   |
| Overriding Component Defaults | [./theme/component-defaults.md](./theme/component-defaults.md)               | MANDATORY. Read before custom component override definitions via theme components. |
| Mantine Colors                | [./colors](./colors/SKILL.md)                                                | Use when dealing with color customization                                          |
| Mantine Component Styling     | [./styling](./styling/SKILL.md)                                              | MANDATORY. Use when dealing with styling the components                            |

## Theme Configuration Guides

- [Theme Core](./theme/theme-core.md)
- [Color System](./theme/color-system.md)
- [Typography](./theme/typography.md)
- [Component Defaults](./theme/component-defaults.md)

## List of components

For a complete list of available components and implementation details, refer to the relevant component [SKILL.md](./components/SKILL.md) files.

### Component discovery protocol

Before writing any Mantine code, do this in order:

1. Read the request intent, behavior, and shape, not only literal words. Match on meaning.
2. Refer to Mantine official docs (https://mantine.dev/) and existing components in the application.
3. Choose built-in components (e.g., `Group`, `Stack`, `Flex`, `Box`, `Text`, `Button`, `ActionIcon`) over custom HTML styling to ensure consistency with the design system.
4. Customize components using Mantine's theme override or native props (`styles`, `classNames`, style props) instead of arbitrary CSS classes or Tailwind CSS.
5. If custom styles are needed, use Mantine's standard CSS modules or style props consistent with the design system.
6. Verify against [frontend-design-system.md](../../docs/frontend-design-system.md) rules (Hanken Grotesk for UI, JetBrains Mono for timestamps, grayscale-first colors).
