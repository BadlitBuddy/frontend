### progress

Progress displays linear progress toward completion
[progress docs](https://mantine.dev/core/progress/)

#### Import

```tsx
import { Progress } from "@mantine/core";
```

#### Component parts

- root: `Progress`
- subcomponent: `Progress.Section`

#### Syntax

```tsx
<Progress value={65} color="blue" size="md" radius="xl" />
```

```tsx
<Progress.Root size="lg">
  <Progress.Section value={35} color="blue" />
  <Progress.Section value={25} color="green" />
  <Progress.Section value={40} color="orange" />
</Progress.Root>
```

#### Key props

- `value`: progress percentage (`0`–`100`)
- `color`: bar color
- `size`: height of the progress bar
- `radius`: border radius
- `striped`: displays diagonal stripes
- `animated`: animates stripes (requires `striped`)
- `transitionDuration`: animation duration

`Progress.Section`

- `value`: percentage occupied by the section
- `color`: section color
- `children`: optional content rendered inside the section

#### Rules

- `value` should be between `0` and `100`
- Use `Progress.Section` when progress should be divided into multiple categories
- The combined values of all `Progress.Section` components should not exceed `100`
- `animated` has no effect unless `striped` is enabled
- `transitionDuration={0}` disables progress animation
