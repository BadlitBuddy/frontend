### divider

Divider visually separates content with a horizontal or vertical line
[divider docs](https://mantine.dev/core/divider/)

#### Import

```tsx
import { Divider } from "@mantine/core";
```

#### Key props

- `label`: optional text or element displayed inside the divider
- `labelPosition`: `"left"`, `"center"` (default), or `"right"`
- `orientation`: `"horizontal"` (default) or `"vertical"`
- `size`: border thickness
- `color`: divider color
- `variant`: `"solid"`, `"dashed"`, `"dotted"`
- `my`, `mx`: spacing around the divider

#### Syntax

```tsx
<Divider label="Settings" labelPosition="center" />
```

#### Rules

- Use `orientation="vertical"` inside flex layouts
- Vertical dividers require their parent to define a height
- Labels automatically interrupt the divider line
- Prefer `Divider` over manually styling borders when separating sections
