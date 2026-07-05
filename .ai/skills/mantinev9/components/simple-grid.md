### simple-grid
SimpleGrid is a responsive CSS grid in which every item takes an equal amount of space
[simple-grid docs](https://mantine.dev/core/simple-grid/)
#### Import
- `import { SimpleGrid } from '@mantine/core';`
#### Props
- `cols` (number, supports responsive object `{ base, xs, sm, md, lg, xl }`) – number of columns
- `spacing` (spacing, supports responsive object) – horizontal spacing between columns; also used for vertical spacing if `verticalSpacing` is not set
- `verticalSpacing` (spacing, supports responsive object) – spacing between rows, overrides `spacing` vertically
- `minColWidth` (string | number) – minimum column width; when set, uses CSS Grid `auto-fill`/`auto-fit` and the `cols` prop is ignored
- `autoFlow` (`"auto-fill"` | `"auto-fit"`, default `"auto-fill"`) – only relevant when `minColWidth` is set
- `autoRows` (string) – controls size of implicitly created grid rows (e.g. `"minmax(100px, auto)"`)
- `type` (`"media"` | `"container"`) – responsive query type; with `"container"`, `cols`/`spacing`/`verticalSpacing` responsive keys must be exact px/em values, not theme breakpoint names
#### Syntax
```tsx
<SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="{spacing}" verticalSpacing="{verticalSpacing}">
  {items}
</SimpleGrid>
```
#### Rules
- Use `SimpleGrid` (CSS Grid based) when all items should have equal width; use `Grid` (flexbox based) when columns need different widths
- When `minColWidth` is set, `cols` is ignored; `autoFlow="auto-fill"` leaves empty tracks when items don't fill a row, `autoFlow="auto-fit"` collapses empty tracks so items stretch to fill the row
- With `type="container"` set, responsive prop objects must use exact px/em keys (e.g. `'300px'`) instead of theme breakpoint names like `sm`/`md`
