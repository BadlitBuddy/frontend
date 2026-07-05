### badge
Badge displays a small badge, pill, or tag, typically used to highlight status or counts
[badge docs](https://mantine.dev/core/badge/)
#### Import
`import { Badge } from '@mantine/core';`
#### Component parts
- root: `Badge`
#### Syntax
```tsx
<Badge variant="{variant}" color="{color}" size="{size}" radius="{radius}" leftSection={icon} rightSection={icon}>
  {label}
</Badge>
```
#### Key props
- `variant`: `filled` | `light` | `outline` | `dot` | `transparent` | `white` | `default` | `gradient`
- `color` (key of `theme.colors` or any valid CSS color)
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `radius` (key of `theme.radius` or any valid CSS value)
- `circle` (reduces horizontal padding, makes width equal to height — for numeric/single-char badges)
- `leftSection` / `rightSection` (react node, e.g. icon or Avatar)
- `fullWidth` (spans 100% of parent width)
- `gradient` (`{ from, to, deg }`, only used when `variant="gradient"`; falls back to `theme.defaultGradient` if unset)
- `autoContrast` (adjusts text color based on background for `filled` variant)
#### Rules
- `variant="gradient"` only supports two-color linear gradients via `gradient`; for more complex gradients use the Styles API instead
- Use `circle` for numeric badges (counts) so the badge width matches its height instead of stretching horizontally
- With `fullWidth`, overflowing label content is truncated with an ellipsis rather than wrapping
- `leftSection`/`rightSection` are commonly used to embed an `Avatar` (for a "person" badge) or an `ActionIcon`/close icon (for a removable tag)
