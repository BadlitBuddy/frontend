### Pagination

Pagination displays a range of page numbers plus optional next/previous/first/last controls, and lets the user navigate between pages. It can be used as a single component or composed from `Pagination.Root` + sub-components for full control over layout.
[Pagination docs](https://mantine.dev/core/pagination/)

#### Import

`import { Pagination } from '@mantine/core';`

#### Compound components

- `Pagination.Root` — context provider, accepts the same state props as `Pagination`
- `Pagination.Items` — renders page number buttons (and dots)
- `Pagination.Previous`, `Pagination.Next` — step controls
- `Pagination.First`, `Pagination.Last` — jump-to-edge controls
- `Pagination.Label` — compact "Page X of Y" label used in responsive layout

#### Props

- `total` (required): total number of pages
- `value` / `onChange`: controlled active page
- `defaultValue`: uncontrolled initial active page
- `siblings`: number of page buttons shown beside the active page (default 1)
- `boundaries`: number of page buttons shown at each edge (default 1)
- `withControls`: show next/previous controls
- `withEdges`: show first/last controls
- `withPages`: set `false` to hide page number buttons, keeping only next/previous
- `layout`: `"default"` | `"responsive"` — responsive mode shows a compact label on narrow containers
- `disabled`, `size`, `radius`, `color`, `autoContrast`, `gap`
- `getItemProps(page)` / `getControlProps(control)`: return extra props (e.g. `component: 'a', href`) for page items / controls, useful for link-based pagination
- `nextIcon`, `previousIcon`, `firstIcon`, `lastIcon`, `dotsIcon`: override default icons

#### Syntax

```tsx
<Pagination
  total={{ total }}
  value={activePage}
  onChange={setPage}
  siblings={1}
  boundaries={1}
  withControls
  withEdges
/>
```

Compound form:

```tsx
<Pagination.Root total={{ total }} value={activePage} onChange={setPage}>
  <Group gap={5} justify="center">
    <Pagination.First />
    <Pagination.Previous />
    <Pagination.Items />
    <Pagination.Next />
    <Pagination.Last />
  </Group>
</Pagination.Root>
```

#### Rules

- `total` is required; `value` must be an integer in `[1, total]`
- Use `value` + `onChange` for controlled state, or `defaultValue` for uncontrolled
- Use the compound `Pagination.Root` form when you need custom layout/ordering of controls, or want to omit/reorder specific controls
- For link-driven pagination (no client-side state), use `getItemProps`/`getControlProps` to render items as `component="a"` with computed `href`
- The `@mantine/hooks` package exports a lower-level `use-pagination` hook if you need to build a fully custom pagination UI
