### overflow-list

OverflowList automatically hides overflowing items and replaces them with a custom overflow element

[overflow-list docs](https://mantine.dev/core/overflow-list/)

#### Import

```tsx
import { OverflowList } from "@mantine/core";
```

#### Key props

- `items`: array of items
- `visibleItemRenderer`: renders visible items
- `overflowRenderer`: renders the hidden items indicator
- `minVisibleItems`: minimum number of items that remain visible
- `collapseFrom`: `'start'` or `'end'`
- `className`: root class
- `style`: root styles

#### Syntax

```tsx
<OverflowList
  items={items}
  visibleItemRenderer={(item) => ...}
  overflowRenderer={(hiddenItems) => ...}
/>
```

#### Rules

- `items` should be stable between renders for best performance
- `visibleItemRenderer` renders every visible item individually
- `overflowRenderer` receives an array of hidden items and should return a single overflow element (for example `+5`)
- Use `collapseFrom="end"` to preserve leading items and `collapseFrom="start"` to preserve trailing items
- Ideal for tag lists, breadcrumbs, avatars, and navigation items that must fit within a constrained width
