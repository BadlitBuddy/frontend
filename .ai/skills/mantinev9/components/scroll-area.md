### scroll-area

ScrollArea provides custom scrollbars and scroll tracking for overflowing content
[scroll-area docs](https://mantine.dev/core/scroll-area/)

#### Import

```tsx
import { ScrollArea } from "@mantine/core";
```

#### Key props

- `h` / `mah`: viewport height
- `type`: scrollbar visibility (`"hover"`, `"scroll"`, `"always"`, `"never"`, `"auto"`)
- `scrollbars`: `"x"`, `"y"`, `"xy"`
- `offsetScrollbars`: reserves space for scrollbars
- `scrollHideDelay`: delay before hiding scrollbars
- `viewportRef`: reference to the scrollable viewport
- `onScrollPositionChange`: callback receiving `{ x, y }`

#### Syntax

```tsx
<ScrollArea h={300}>{content}</ScrollArea>
```

#### Rules

- Set a fixed height (`h`, `mah`, etc.) so overflow can occur
- Use `viewportRef` to programmatically control scrolling
- Use `onScrollPositionChange` to track scroll position
- Prefer `ScrollArea.Autosize` when height should grow until a maximum size is reached
