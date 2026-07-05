### kbd

Kbd displays keyboard keys or keyboard shortcuts

[kbd docs](https://mantine.dev/core/kbd/)

#### Import

```tsx
import { Kbd } from "@mantine/core";
```

#### Key props

- `children`: key label
- `size`: size of the key
- `variant`: visual variant
- `radius`: border radius

#### Syntax

```tsx
<Kbd>⌘</Kbd>

<Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
```

#### Rules

- Wrap each key in its own `Kbd` component when displaying shortcuts
- Combine multiple `Kbd` components with normal text (`+`, `→`, etc.) to represent key combinations
- Use concise labels such as `Ctrl`, `Shift`, `Alt`, `⌘`, `Esc`, or `Enter`
- `Kbd` is purely presentational and does not implement keyboard handling
