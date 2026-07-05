### blockquote

Blockquote highlights quoted content with optional icon, citation, and border styling
[blockquote docs](https://mantine.dev/core/blockquote/)

#### Import

```tsx
import { Blockquote } from "@mantine/core";
```

#### Key props

- `color`: accent color
- `radius`: border radius
- `icon`: custom quote icon
- `iconSize`: size of the icon
- `cite`: source or attribution displayed below the quote

#### Syntax

```tsx
<Blockquote color="blue" cite="Albert Einstein">
  Life is like riding a bicycle...
</Blockquote>
```

#### Rules

- Use `cite` for the source or attribution instead of placing it manually inside the quote
- Replace the default quote icon by passing a custom `icon`
- Blockquote is intended for quotations or highlighted excerpts—not general callout boxes
- Keep quoted content concise for readability
