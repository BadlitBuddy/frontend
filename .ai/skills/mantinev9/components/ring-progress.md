### ring-progress

RingProgress displays progress as a circular ring composed of one or more colored sections
[ring-progress docs](https://mantine.dev/core/ring-progress/)

#### Import

```tsx
import { RingProgress } from "@mantine/core";
```

#### Key props

- `sections`: array of progress segments (`value`, `color`, optional `tooltip`)
- `size`: ring diameter
- `thickness`: stroke width
- `roundCaps`: rounds the ends of each section
- `label`: custom content rendered in the center
- `rootColor`: color of the background ring
- `transitionDuration`: animation duration

#### Syntax

```tsx
<RingProgress
  sections={[
    { value: 40, color: "blue" },
    { value: 30, color: "green" },
  ]}
  label="70%"
/>
```

#### Rules

- The combined `value` of all sections should not exceed `100`
- Use multiple sections to visualize category breakdowns
- `label` accepts any React node, such as text, icons, or custom layouts
- Enable `roundCaps` for a smoother appearance
- `transitionDuration={0}` disables animation
