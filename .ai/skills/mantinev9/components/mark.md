### mark

Mark highlights inline text with a colored background
[mark docs](https://mantine.dev/core/mark/)

#### Import

```tsx
import { Mark } from "@mantine/core";
```

#### Syntax

```tsx
<Mark color="{color}">Highlighted text</Mark>
```

#### Key props

- `color` – background color (`theme.colors` key or any CSS color)
- `component` – polymorphic root element (`mark` by default, can be `"span"`, `"a"`, etc.)

#### Rules

- Use `Mark` only for emphasizing short inline text, not entire paragraphs or large blocks
- `Mark` is an inline element and can be placed inside `Text`, `Title`, headings, or other inline content
- Any valid CSS color can be used, but theme colors are recommended for consistency
- Because it is polymorphic, use `component` when semantic HTML requires a different element
