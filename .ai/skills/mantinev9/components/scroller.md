### scroller

Scroller provides buttons for programmatically scrolling content in a chosen direction
[scroller docs](https://mantine.dev/core/scroller/)

#### Import

```tsx
import { Scroller } from "@mantine/core";
```

#### Key props

- `orientation`: `"horizontal"` or `"vertical"`
- `target`: scrollable element reference
- `offset`: scroll distance per interaction
- `behavior`: `"smooth"` or `"auto"`
- `children`: scroll controls

#### Syntax

```tsx
<Scroller target={viewportRef}>{controls}</Scroller>
```

#### Rules

- Connect `target` to a scrollable element using a ref
- Use alongside `ScrollArea` or native scrolling containers
- Set `behavior="smooth"` for animated scrolling
- Scroller provides scrolling behavior—it does not create a scrollable container
