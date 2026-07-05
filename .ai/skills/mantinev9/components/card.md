### card
Card is a wrapper around `Paper` with added styles and a `Card.Section` component that splits the card into full-bleed sections
[card docs](https://mantine.dev/core/card/)
#### Import
`import { Card } from '@mantine/core';`
#### Component parts
- root: `Card`
- subcomponent: `Card.Section`
#### Syntax
```tsx
<Card shadow="{shadow}" padding="{padding}" radius="{radius}" withBorder>
  <Card.Section>
    {edge-to-edge content, e.g. an Image}
  </Card.Section>
  {regular padded content}
</Card>
```
#### Key props
- `Card`: `shadow` (key of `theme.shadows`), `padding` (key of `theme.spacing`), `radius`, `withBorder`, `orientation` (`vertical` | `horizontal`), `component` (polymorphic root)
- `Card.Section`: `withBorder` (adds top/bottom border depending on position), `inheritPadding` (applies the parent Card's horizontal padding to this section), `component` (polymorphic)
#### Rules
- If you don't need full-bleed sections (e.g. an image that touches the card edges), use `Paper` directly instead of `Card`
- `Card.Section` cancels the parent `Card` padding on the sides where it touches the card boundary: negative top/left/right margin if first child, negative bottom/left/right if last child, negative left/right only if in the middle
- `Card.Section` must be a direct child of `Card` — wrapping it in a `div` or fragment breaks the section detection, since Card relies on mapping its direct children
- Use `inheritPadding` on a `Card.Section` when you want its content horizontally aligned with the rest of the card's padded content while still spanning the full width for borders/background
- Both `Card` and `Card.Section` are polymorphic (`component` prop) — e.g. `component="a"` with `href` to make the whole card a link
