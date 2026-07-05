### focus-trap

FocusTrap keeps keyboard focus inside its children while active
[focus-trap docs](https://mantine.dev/core/focus-trap/)

#### Import

```tsx
import { FocusTrap } from "@mantine/core";
```

#### Key props

- `active`: enables or disables focus trapping
- `initialFocus`: selector or callback indicating which element receives focus first
- `children`: focusable content

#### Syntax

```tsx
<FocusTrap active={opened}>{content}</FocusTrap>
```

#### Rules

- Use inside modals, popovers, drawers, and other overlays
- Ensure at least one focusable element exists within the trap
- Focus automatically cycles when the user presses Tab
- Disable the trap by setting `active={false}`
- FocusTrap only manages keyboard focus—it does not render any UI
