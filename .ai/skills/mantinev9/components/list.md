### list

List displays ordered or unordered lists with customizable icons and spacing
[list docs](https://mantine.dev/core/list/)

#### Import

```tsx
import { List } from "@mantine/core";
```

#### Component parts

- root: `List`
- subcomponent: `List.Item`

#### Key props

- `type`: `"unordered"` (default) or `"ordered"`
- `withPadding`: adds left padding to align list items
- `spacing`: spacing between items
- `size`: text size
- `center`: vertically centers icons with text
- `icon`: custom icon for all items
- `listStyleType`: CSS list style (e.g. `"disc"`, `"circle"`, `"decimal"`)

`List.Item`

- accepts arbitrary children

#### Syntax

```tsx
<List spacing="sm" withPadding icon={<ThemeIcon size={20}>✓</ThemeIcon>}>
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
</List>
```

#### Rules

- Use `List.Item` as direct children of `List`
- `icon` replaces the default bullet for every item
- Use `type="ordered"` when item order is meaningful
- `listStyleType` only affects standard list markers; it has no effect when using custom `icon`
- Combine `center` with larger icons to improve vertical alignment
