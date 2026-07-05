### hover-card
HoverCard displays a popover section when the target element is hovered, and hides it once the pointer leaves both target and dropdown. Used for previews and supplementary info, e.g. a user profile preview on hover.
[hover-card docs](https://mantine.dev/core/hover-card/)
#### Import
`import { HoverCard } from '@mantine/core';`
#### Key props (HoverCard root)
- `width`: `PopoverWidth` — dropdown width, or `'target'` to match target width
- `shadow`, `radius`, `withArrow`: dropdown surface styling
- `openDelay` / `closeDelay`: number (ms) — hover delays, overridden by `HoverCard.Group` if nested in one
- `position`: `FloatingPosition` — dropdown placement relative to target
- `disabled`: boolean — prevents the dropdown from rendering at all
#### Parts
- `HoverCard.Target` — wraps the hover trigger; requires a single element/component child (no strings, fragments, or multiple children)
- `HoverCard.Dropdown` — the hover content
- `HoverCard.Group` — wraps multiple `HoverCard`s to share one `openDelay`/`closeDelay`
#### Syntax
```tsx
<HoverCard width={280} shadow="md">
  <HoverCard.Target>
    <Button>{trigger}</Button>
  </HoverCard.Target>
  <HoverCard.Dropdown>
    {CONTENT}
  </HoverCard.Dropdown>
</HoverCard>
```
Synced delays across multiple cards:
```tsx
<HoverCard.Group openDelay={500} closeDelay={100}>
  <HoverCard>{...}</HoverCard>
  <HoverCard>{...}</HoverCard>
</HoverCard.Group>
```
#### Rules
- `HoverCard.Target`'s child must forward `ref` to its root DOM element — custom components that don't forward `ref` will not work
- `HoverCard` is ignored by screen readers and cannot be triggered via keyboard — only use it for supplementary, non-essential information
- Interactive elements (links, buttons) are fine inside `HoverCard.Dropdown`; avoid form inputs there
- Do not rely on `HoverCard` alone to convey information required to understand the page
