### close-button
CloseButton is a button with a built-in X icon, used to dismiss modals, drawers, notifications, and similar UI
[close-button docs](https://mantine.dev/core/close-button/)
#### Import
```js
import { CloseButton } from '@mantine/core';
```
#### Props
- `size`: `xs` | `sm` | `md` | `lg` | `xl` | number
- `variant`: `transparent` | `subtle` (default)
- `icon`: React node to replace the default X icon — when set, `iconSize` is ignored and the icon's size must be set manually
- `disabled`: boolean
- `component`: polymorphic root element/component (default `button`)
- `aria-label`: required for accessibility since `CloseButton` has no visible text
#### Syntax
```html
<CloseButton size="{size}" variant="{variant}" aria-label="{label}" onClick="{onClick}" />
```
#### Rules
- `CloseButton` is icon-only; always set `aria-label` or wrap hidden text with `VisuallyHidden` so screen readers announce its purpose
- Setting `icon` disables the automatic `iconSize` handling — size the passed icon element yourself
- Commonly used internally by `Modal` and `Drawer`; use it directly for any custom dismiss control
