### semi-circle-progress

SemiCircleProgress displays progress as a half-circle gauge with an optional value label
[semi-circle-progress docs](https://mantine.dev/core/semi-circle-progress/)

#### Import

```tsx
import { SemiCircleProgress } from "@mantine/core";
```

#### Key props

- `value`: progress value from `0` to `100`
- `filledSegmentColor`: color of the completed portion
- `emptySegmentColor`: color of the remaining portion
- `size`: diameter of the semicircle in pixels
- `thickness`: stroke width
- `label`: custom content rendered in the center of the gauge
- `transitionDuration`: animation duration in milliseconds

#### Syntax

```tsx
<SemiCircleProgress
  value={75}
  filledSegmentColor="blue"
  emptySegmentColor="gray.3"
  size={200}
  thickness={12}
  label="75%"
/>
```

#### Rules

- `value` should be between `0` and `100`
- Use `label` to display percentages, status text, or custom React nodes inside the gauge
- Increase `thickness` to make the gauge more prominent
- `transitionDuration={0}` disables progress animation
- Best suited for displaying a single KPI or completion percentage rather than comparing multiple values
