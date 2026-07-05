### visually-hidden

VisuallyHidden hides content visually while keeping it accessible to screen readers
[visually-hidden docs](https://mantine.dev/core/visually-hidden/)

#### Import

```tsx
import { VisuallyHidden } from "@mantine/core";
```

#### Key props

- `children`: content hidden visually but exposed to assistive technologies
- `component`: polymorphic root element

#### Syntax

```tsx
<button>
  <IconSearch />
  <VisuallyHidden>Search</VisuallyHidden>
</button>
```

#### Rules

- Use to provide accessible labels for icon-only controls
- Content remains available to screen readers while being visually hidden
- Prefer `aria-label` when only a short label is needed
- Use `VisuallyHidden` when hidden content includes rich text or multiple elements
- Do not use it to hide interactive controls from sighted users
