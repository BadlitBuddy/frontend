### indicator

Indicator displays a small badge, dot, or status indicator positioned relative to another element

[indicator docs](https://mantine.dev/core/indicator/)

#### Import

```tsx
import { Indicator } from "@mantine/core";
```

#### Key props

- `children`: target element
- `label`: indicator content (text, icon, etc.)
- `color`: indicator color
- `size`: indicator diameter
- `radius`: border radius
- `position`: placement (`'top-start'`, `'top-center'`, `'top-end'`, `'middle-start'`, `'middle-center'`, `'middle-end'`, `'bottom-start'`, `'bottom-center'`, `'bottom-end'`)
- `offset`: distance from the edge
- `inline`: positions relative to inline elements
- `processing`: animated pulse effect
- `disabled`: hides the indicator
- `withBorder`: adds a border around the indicator
- `zIndex`: controls stacking order

#### Syntax

```tsx
<Indicator label="{count}" color="{color}" position="top-end">
  {child}
</Indicator>
```

#### Rules

- Wrap exactly one target element inside `Indicator`
- Omit `label` to render a simple status dot
- Use `processing` to indicate active/live status
- Set `inline` when wrapping inline elements such as text
- Use `disabled` instead of conditionally removing the component when temporarily hiding the indicator
