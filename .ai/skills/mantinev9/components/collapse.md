### collapse

Collapse animates expanding and collapsing content by transitioning its height
[collapse docs](https://mantine.dev/core/collapse/)

#### Import

```tsx
import { Collapse } from "@mantine/core";
```

#### Key props

- `in`: controls whether content is expanded
- `transitionDuration`: animation duration in milliseconds
- `transitionTimingFunction`: CSS timing function
- `animateOpacity`: fades content while expanding/collapsing (default `true`)
- `onTransitionEnd`: callback fired after animation completes

#### Syntax

```tsx
<Collapse in={opened}>{content}</Collapse>
```

#### Rules

- Control visibility with the `in` prop
- Unlike conditional rendering, collapsed content remains mounted during animation
- Set `transitionDuration={0}` to disable animations
- Use for expandable sections, accordions, and disclosure panels
- If content should be removed entirely when hidden, conditionally render the `Collapse`
