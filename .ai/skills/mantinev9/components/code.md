### code

Code displays inline code snippets or preformatted code blocks
[code docs](https://mantine.dev/core/code/)

#### Import

```tsx
import { Code } from "@mantine/core";
```

#### Key props

- `block`: renders a multiline code block instead of inline code
- `color`: theme color
- `children`: code content

#### Syntax

```tsx
<Code>npm install @mantine/core</Code>
```

```tsx
<Code block>{`const answer = 42;`}</Code>
```

#### Rules

- Use inline `Code` for short commands, filenames, variables, or API names
- Use `block` for multiline examples or code snippets
- Code preserves whitespace when `block` is enabled
- Code is for presentation only—it does not provide syntax highlighting
