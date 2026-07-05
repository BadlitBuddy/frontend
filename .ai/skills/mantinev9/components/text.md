### text

Text renders paragraphs, inline text, labels, and other typography with theme-aware styling
[text docs](https://mantine.dev/core/text/)

#### Import

```tsx
import { Text } from "@mantine/core";
```

#### Syntax

```tsx
<Text size="{size}" fw="{weight}" c="{color}">
  Hello world
</Text>
```

#### Key props

- `size` – font size (`xs` | `sm` | `md` | `lg` | `xl` or CSS value)
- `fw` – font weight
- `c` – text color
- `ff` – font family
- `ta` – text alignment
- `td` – text decoration
- `tt` – text transform
- `fz` – font size override
- `fs` – font style
- `lh` – line height
- `span` – renders a `<span>` instead of a `<p>`
- `lineClamp` – truncates text after a specified number of lines
- `truncate` – single-line truncation (`"end"`, `"start"`, or boolean)
- `inherit` – inherits typography styles from parent
- `inline` – removes bottom margin when rendered as paragraph
- `gradient` – gradient text configuration
- `variant` – `"text"` or `"gradient"`

#### Syntax examples

```tsx
<Text span>Inline text</Text>
```

```tsx
<Text lineClamp={2}>Long content...</Text>
```

```tsx
<Text truncate="end">Very long filename.pdf</Text>
```

```tsx
<Text variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
  Gradient text
</Text>
```

#### Rules

- By default, `Text` renders a `<p>` element
- Use `span` when placing `Text` inline within another sentence
- Use `truncate` for single-line overflow and `lineClamp` for multi-line truncation
- `gradient` only applies when `variant="gradient"`
- Use `inherit` when typography should match the parent element exactly
- Prefer `Text` over raw HTML paragraphs for consistent theme styling
