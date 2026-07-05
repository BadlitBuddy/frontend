### container
Container centers content horizontally and limits its max-width, adding side padding.

[container docs](https://mantine.dev/core/container/)

#### Import
```jsx
import { Container } from '@mantine/core';
```

#### Props
- `size`: max-width — accepts theme size keys (`xs`, `sm`, `md`, `lg`, `xl`) or a number/string (px value); not responsive by itself
- `fluid`: boolean — makes the container 100% width (equivalent to `size="100%"`)
- `strategy`: `"block"` (default) | `"grid"` — `"grid"` uses `display: grid`, drops default inline padding and `max-width` on the root (uses grid template columns instead), and enables the breakout feature
- inherits standard style props (`px`, `bg`, `h`, etc.)

#### Syntax
```jsx
<Container size="md">
  {CONTENT}
</Container>
```

Grid strategy with breakout:
```jsx
<Container strategy="grid" size={500}>
  <Box>{MAIN_CONTENT}</Box>

  <Box data-breakout>
    <div>{BREAKOUT_CONTENT}</div>
    <Box data-container>{NESTED_CONTAINER_WIDTH_CONTENT}</Box>
  </Box>
</Container>
```

#### Rules
- `size` sets a fixed `max-width` regardless of screen size — it is not automatically responsive.
- Use `fluid` (or `size="100%"`) to make the container span the full available width.
- With `strategy="grid"`, children marked `data-breakout` expand to the full width of the container's parent; a nested child marked `data-container` inside a `data-breakout` element is constrained back to the main grid column width.
- To customize or add new named sizes, extend the `Container` component's `vars` in the theme (`Container.extend({ vars: ... })`).
- To make `max-width` responsive, use the Styles API `classNames` prop to apply custom CSS with media queries, since the `size` prop itself is static.
