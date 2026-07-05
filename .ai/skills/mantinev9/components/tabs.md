### tabs
Tabs is used to switch between different views, only one panel is visible at a time
[tabs docs](https://mantine.dev/core/tabs/)
#### Import
`import { Tabs } from '@mantine/core';`
#### Components
- component: `Tabs`
- part: `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`
#### Key props (Tabs)
- `value` / `onChange`: `string | null` — controlled state
- `defaultValue`: `string | null` — uncontrolled state
- `orientation`: `"horizontal" | "vertical"`
- `placement`: `"left" | "right"` — `Tabs.List` position, only applies when `orientation="vertical"`
- `inverted`: boolean — put `Tabs.Panel` components before `Tabs.List` in JSX and set this to flip layout
- `variant`: e.g. `"default" | "pills" | "outline" | "none"`
- `color`, `radius` — styling controls (`color` only affects `pills`/`default` variants)
- `activateTabWithKeyboard`: boolean — default `true`, activates tab on arrow key focus
- `allowTabDeactivation`: boolean — allow clicking the active tab to deactivate it
- `keepMounted`: boolean — set `false` to unmount inactive `Tabs.Panel` content
- `loop`: boolean — arrow key navigation wraps from last to first tab and back
#### Key props (Tabs.Tab)
- `value`: string (required) — must match a `Tabs.Panel` value
- `leftSection`, `rightSection`: ReactNode
- `color`: MantineColor — per-tab override
- `disabled`: boolean
#### Key props (Tabs.List)
- `grow`: boolean — tabs take all available space
- `justify`: JustifyContent — tab alignment
#### Key props (Tabs.Panel)
- `value`: string (required) — must match a `Tabs.Tab` value
- `keepMounted`: boolean — per-panel override of parent's `keepMounted`
#### Syntax
```tsx
<Tabs defaultValue="{firstTabValue}" orientation="{orientation}">
  <Tabs.List>
    <Tabs.Tab value="{value}" leftSection={icon}>{label}</Tabs.Tab>
    <Tabs.Tab value="{value}">{label}</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="{value}">{panelContent}</Tabs.Panel>
  <Tabs.Panel value="{value}">{panelContent}</Tabs.Panel>
</Tabs>
```
#### Rules
- Every `Tabs.Tab` must have a matching `Tabs.Panel` with the same `value`, and values must be unique
- For inverted tabs, place `Tabs.Panel` components before `Tabs.List` in JSX and add `inverted` to `Tabs`
- By default the active tab cannot be deactivated by clicking it again; set `allowTabDeactivation` to allow `value` to become `null`
- Disabled tabs (`disabled` on `Tabs.Tab`) are skipped during keyboard arrow-key navigation
- If a `Tabs.Tab` has no text content (icon-only), set `aria-label` on it, or wrap the label text in `VisuallyHidden`
- By default all `Tabs.Panel` content stays mounted even when inactive; set `keepMounted={false}` on `Tabs` to unmount inactive panels (resets their internal state on each switch)
