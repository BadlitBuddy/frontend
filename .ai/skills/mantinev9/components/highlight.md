### highlight

Highlight emphasizes matching text within a larger string
[highlight docs](https://mantine.dev/core/highlight/)

#### Import

```tsx
import { Highlight } from "@mantine/core";
```

#### Key props

- `highlight`: string, array of strings, or `RegExp` to highlight
- `children`: source text
- `highlightStyles`: inline styles applied to highlighted segments

#### Syntax

```tsx
<Highlight highlight="Mantine">
  Mantine provides a comprehensive React component library.
</Highlight>
```

#### Rules

- `children` must be plain text—not arbitrary React elements
- Pass an array to highlight multiple search terms
- Use a `RegExp` for advanced matching
- Customize highlighted appearance with `highlightStyles`
- Highlight is useful for search results, filters, and keyword emphasis
