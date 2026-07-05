### Burger

Burger renders an open/close navigation toggle button. It shows a burger icon when closed and an X when `opened` is true. It does not manage its own state — pair it with `onClick` and a disclosure hook.
[Burger docs](https://mantine.dev/core/burger/)

#### Import

`import { Burger } from '@mantine/core';`

#### Props

- `opened` (boolean): when `true`, renders the X/cross icon instead of the burger icon
- `onClick`: click handler, typically toggles `opened` state
- `size`: `MantineSize` | number — controls width/height
- `lineSize`: string | number — controls thickness of the lines (auto-calculated from `size` if omitted)
- `color`: `MantineColor` — line color
- `transitionDuration`, `transitionTimingFunction`: control the open/close animation
- `aria-label`: required for accessibility since Burger has no visible text label

#### Syntax

```tsx
const [opened, { toggle }] = useDisclosure();

<Burger
  size="{size}"
  opened={opened}
  onClick={toggle}
  aria-label="Toggle navigation"
/>;
```

#### Rules

- Always set `aria-label` (or wrap hidden text with `VisuallyHidden`) since Burger has no default accessible label
- Use the `useDisclosure` hook from `@mantine/hooks` to manage the `opened` boolean and `toggle` handler
- Burger only renders the icon/button; it does not render or control the navigation drawer/menu itself — wire its `onClick` to whatever nav overlay component you use (e.g. `Drawer`, `AppShell` navbar)
