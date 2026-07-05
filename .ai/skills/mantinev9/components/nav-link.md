### NavLink

NavLink renders a navigation list item with an optional label, description, left/right sections, active state, and support for nested child NavLinks (collapsible sub-navigation).
[NavLink docs](https://mantine.dev/core/nav-link/)

#### Import

`import { NavLink } from '@mantine/core';`

#### Props

- `label`: main link text
- `description`: secondary text displayed below the label
- `leftSection` / `rightSection`: nodes displayed on either side (icons, badges, chevrons)
- `active` (boolean): applies active styles
- `color`, `variant` (`"filled"` | `"light"` | `"subtle"`): control active-state appearance
- `disabled` (boolean)
- `children`: nested `NavLink` components for sub-navigation
- `childrenOffset`: `MantineSpacing` — indentation of nested links
- `opened` / `defaultOpened` / `onChange`: control the collapsed/expanded state of `children`
- `component`, `href`: polymorphic root element, same pattern as `Anchor`

#### Syntax

```tsx
<NavLink
  href="{href}"
  label="{label}"
  description="{description}"
  leftSection={leftIcon}
  rightSection={rightIcon}
  active={isActive}
  variant="{variant}"
  childrenOffset={28}
>
  <NavLink label="{childLabel}" href="{childHref}" />
</NavLink>
```

#### Rules

- Nesting is done by placing `NavLink` components as `children` of another `NavLink`, not via a separate list prop
- Use `defaultOpened` for an uncontrolled initially-expanded parent link, or `opened`/`onChange` for controlled state
- If using a routing library's `NavLink` (e.g. React Router) inside `renderRoot`, active styles derive from the `aria-current` attribute automatically — you don't need to set `active` manually
- `href="#"` (or similar) is required even on non-navigating items for keyboard focus to work correctly
