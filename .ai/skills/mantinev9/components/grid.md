### grid
Grid is a responsive 12 columns flexbox grid system, used when columns need different widths
[grid docs](https://mantine.dev/core/grid/)
#### Import
- `import { Grid } from '@mantine/core';`
#### Components
- component: `Grid`
- part: `Grid.Col`
#### Props
- `Grid`: `columns` (number, default 12), `gap`, `rowGap`, `columnGap` (spacing, supports responsive object), `grow` (boolean), `justify` (justify-content), `align` (align-items), `type` (`"media"` | `"container"`), `breakpoints` (only with `type="container"`), `overflow`
- `Grid.Col`: `span` (number 1-12, `"auto"`, `"content"`, or responsive object `{ base, xs, sm, md, lg, xl }`), `offset` (number or responsive object), `order` (number or responsive object), `align` (align-self, overrides `Grid`'s `align` for that column)
#### Syntax
```tsx
<Grid gap="{gap}" grow={GROW} justify="{justify}" align="{align}">
  <Grid.Col span={{ base: 12, md: 6, lg: 3 }} offset={OFFSET} order={ORDER}>
    {content}
  </Grid.Col>
  {...more Grid.Col}
</Grid>
```
#### Rules
- `Grid.Col` must be a direct child of `Grid`
- `span` values are relative to the `columns` prop (default 12): `span={4}` = 4/12 = 33% width
- `span` accepts a responsive object with `base`, `xs`, `sm`, `md`, `lg`, `xl` keys to change column width per breakpoint
- Once the sum of `span` + `offset` in a row exceeds `columns`, remaining columns wrap to the next row
- `span="auto"` makes a column grow to fill remaining space in its row; `span="content"` sizes the column to fit its content
- If `grow` is set on `Grid`, columns in the last row expand to fill all available space
- Set `type="container"` to use container queries instead of media queries; when doing so, `breakpoints` must be set to explicit px/em values (theme breakpoint keys are not usable)
- Use `Grid` (flexbox based) instead of `SimpleGrid` when columns need different widths; use `SimpleGrid` when all items should be equal width
