### center
Center centers its children both vertically and horizontally using flexbox.

[center docs](https://mantine.dev/core/center/)

#### Import
```jsx
import { Center } from '@mantine/core';
```

#### Props
- `inline`: boolean — renders with `display: inline-flex` instead of `display: flex`, useful for centering inline content like an icon next to text
- `component`: polymorphic prop — change the rendered root element (default `div`)
- inherits standard style props (`maw`, `h`, `bg`, etc.)

#### Syntax
```jsx
<Center maw={400} h={100}>
  {CONTENT}
</Center>
```

#### Rules
- All direct children of `Center` are centered both horizontally and vertically.
- Use `inline` when centering within an inline flow, e.g. an icon + label pair inside an `Anchor`.
- `Center` is [polymorphic](https://mantine.dev/guides/polymorphic/) — pass `component="button"` (or any element/component) to change its root tag.
- Polymorphic component props do **not** automatically extend the HTML props of the default element; if wrapping `Center` in a non-polymorphic component, extend `CenterProps` with `ElementProps<'button', keyof CenterProps>` (or similar) instead.
