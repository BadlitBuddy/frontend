### theme-icon

ThemeIcon displays an icon inside a themed container with configurable size, color, and variant
[theme-icon docs](https://mantine.dev/core/theme-icon/)

#### Import

```tsx
import { ThemeIcon } from "@mantine/core";
```

#### Key props

- `size`: icon container size (`xs` | `sm` | `md` | `lg` | `xl` or number)
- `radius`: border radius (`theme.radius` key, number, or `"xl"`)
- `color`: theme color key
- `variant`: `"filled"` | `"light"` | `"outline"` | `"transparent"` | `"white"` | `"gradient"` | `"default"`
- `gradient`: gradient configuration (only with `variant="gradient"`)
- `autoContrast`: automatically adjusts icon color for better contrast
- `children`: icon component

#### Syntax

```tsx
<ThemeIcon size="lg" color="blue" variant="light">
  <IconStar size={18} />
</ThemeIcon>
```

#### Rules

- ThemeIcon is intended to wrap icons—not arbitrary content
- Match the icon size to the container (typically 50–70% of the ThemeIcon size)
- `gradient` only applies when `variant="gradient"`
- Use `autoContrast` when using dark or dynamic background colors
- ThemeIcon is commonly paired with `Group`, `List`, or cards to visually emphasize actions or features
