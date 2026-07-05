### paper

Paper is a surface component with configurable background, border, shadow, and radius
[paper docs](https://mantine.dev/core/paper/)

#### Import

```tsx
import { Paper } from "@mantine/core";
```

#### Key props

- `shadow`: theme shadow size
- `radius`: border radius
- `withBorder`: adds a border
- `p`: padding
- `bg`: background color
- `component`: polymorphic root element

#### Syntax

```tsx
<Paper shadow="sm" radius="md" p="lg" withBorder>
  {content}
</Paper>
```

#### Rules

- Use `Paper` as the base container for cards, panels, and dialogs
- Combine `shadow` and `withBorder` depending on the desired elevation
- `Paper` is purely visual—it does not provide layout behavior
- Use `component` to render semantic elements when appropriate
