### empty-state

EmptyState displays a placeholder when there is no content, data, or search results to show
[empty-state docs](https://mantine.dev/core/empty-state/)

#### Import

```tsx
import { EmptyState } from "@mantine/core";
```

#### Key props

- `title`: primary heading
- `description`: supporting text
- `icon`: custom icon or illustration
- `action`: optional action element (typically a `Button`)
- `size`: component size
- `children`: custom content rendered below the description

#### Syntax

```tsx
<EmptyState
  title="No projects found"
  description="Create your first project to get started."
  action={<Button>Create project</Button>}
/>
```

#### Rules

- Use `title` for a concise explanation of the empty state
- Use `description` to explain why the state occurred or how to resolve it
- Place the primary recovery action in `action`
- Prefer meaningful illustrations or icons that reinforce the context
- Use `children` for additional actions or supporting content beyond the standard layout
