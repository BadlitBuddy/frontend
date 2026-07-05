### transition

Transition animates mounting, unmounting, and visibility changes
[transition docs](https://mantine.dev/core/transition/)

#### Import

```tsx
import { Transition } from "@mantine/core";
```

#### Key props

- `mounted`: controls whether content is visible
- `transition`: predefined transition name or custom transition object
- `duration`: animation duration
- `timingFunction`: CSS timing function
- `keepMounted`: keeps content mounted when hidden
- `onEntered`, `onExited`: lifecycle callbacks

#### Syntax

```tsx
<Transition mounted={opened} transition="fade">
  {(styles) => <div style={styles}>Content</div>}
</Transition>
```

#### Rules

- Transition uses a render function that receives animated styles
- Apply the provided `styles` to the animated element
- Set `keepMounted` to hide instead of unmounting content
- Built-in transitions include `"fade"`, `"slide-up"`, `"slide-down"`, `"slide-left"`, `"slide-right"`, `"pop"`, `"scale"`, and others
- Use `Collapse` instead when only animating height changes
