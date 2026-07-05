### loader

Loader displays an animated loading indicator while content is being fetched or processed
[loader docs](https://mantine.dev/core/loader/)

#### Import

```tsx
import { Loader } from "@mantine/core";
```

#### Key props

- `type`: loader variant (`'oval'`, `'bars'`, `'dots'`, etc., depending on configured loaders)
- `size`: predefined size (`xs` | `sm` | `md` | `lg` | `xl`) or number (pixels)
- `color`: loader color
- `children`: custom loader content (when using a custom loader implementation)

#### Syntax

```tsx
<Loader size="md" color="blue" type="oval" />
```

#### Rules

- Use inside loading states instead of placeholder content when the loading duration is unknown
- Prefer small (`sm`/`md`) loaders inside buttons, cards, and forms
- Use larger loaders only for full-page or section loading states
- Loader color inherits the current theme if `color` is not specified
- The available `type` values depend on the configured loaders in `MantineProvider`
