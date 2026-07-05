### portal

Portal renders its children into a DOM node outside the normal React hierarchy
[portal docs](https://mantine.dev/core/portal/)

#### Import

```tsx
import { Portal } from "@mantine/core";
```

#### Key props

- `children`: content to render
- `target`: DOM element or selector
- `reuseTargetNode`: reuses a shared portal node
- `withinPortal`: enables/disables portal rendering

#### Syntax

```tsx
<Portal>{content}</Portal>
```

#### Rules

- Use for overlays, floating elements, and components that should escape parent overflow
- If `target` is omitted, content is rendered into `document.body`
- Set `withinPortal={false}` when a component should remain inside its parent hierarchy
- Portals preserve the React component tree even though DOM placement changes
