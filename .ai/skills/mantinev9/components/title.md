### title

Title renders semantic headings with Mantine typography styles
[title docs](https://mantine.dev/core/title/)

#### Import

```tsx
import { Title } from "@mantine/core";
```

#### Syntax

```tsx
<Title order={2}>Section heading</Title>
```

#### Key props

- `order` – heading level (`1`–`6`)
- `size` – overrides default heading size
- `fw` – font weight
- `c` – text color
- `ta` – text alignment
- `textWrap` – text wrapping behavior
- `lineClamp` – limits displayed lines
- `variant` – `"text"` or `"gradient"`
- `gradient` – gradient configuration

#### Syntax examples

```tsx
<Title order={1}>Main heading</Title>
```

```tsx
<Title order={2} variant="gradient" gradient={{ from: "pink", to: "orange" }}>
  Gradient heading
</Title>
```

#### Rules

- `order` controls both the semantic HTML heading (`h1`–`h6`) and default styling
- Use `size` only when visual size should differ from the semantic heading level
- Use headings sequentially (`h1` → `h2` → `h3`) for accessibility
- `gradient` only applies with `variant="gradient"`
- Use `lineClamp` when long headings should be truncated
