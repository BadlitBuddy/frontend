### timeline

Timeline displays a sequence of chronological events using connected bullets
[timeline docs](https://mantine.dev/core/timeline/)

#### Import

```tsx
import { Timeline } from "@mantine/core";
```

#### Component parts

- root: `Timeline`
- subcomponent: `Timeline.Item`

#### Key props

- `active`: index of the active item
- `bulletSize`: size of timeline bullets
- `lineWidth`: width of the connecting line
- `color`: color of completed items
- `radius`: bullet radius
- `reverseActive`: marks items after `active` instead of before it
- `align`: `"left"` | `"right"`

`Timeline.Item`

- `title`: item heading
- `bullet`: custom bullet content (typically an icon)
- `lineVariant`: line style (`"solid"` or `"dashed"`)

#### Syntax

```tsx
<Timeline active={1} bulletSize={24} lineWidth={2}>
  <Timeline.Item title="Step 1">First step</Timeline.Item>

  <Timeline.Item title="Step 2">Second step</Timeline.Item>
</Timeline>
```

#### Rules

- Use `Timeline.Item` as direct children of `Timeline`
- `active` is zero-based
- Provide a custom `bullet` when you want icons instead of the default circle
- Use `reverseActive` for countdowns or remaining-progress visualizations
- Timeline is best suited for chronological events, progress flows, release history, or activity feeds
