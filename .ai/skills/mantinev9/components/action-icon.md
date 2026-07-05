### action-icon
ActionIcon is a button designed to hold a single icon, used for compact icon-only actions
[action-icon docs](https://mantine.dev/core/action-icon/)
#### Import
```js
import { ActionIcon } from '@mantine/core';
```
#### Props
- `variant`: `filled` (default) | `light` | `outline` | `subtle` | `transparent` | `white` | `default` | `gradient`
- `color`: `MantineColor` – key of `theme.colors` or any valid CSS color
- `size`: `xs` | `sm` | `md` | `lg` | `xl` | number | `input-xs` | `input-sm` | `input-md` | `input-lg` | `input-xl` – controls width/height
- `radius`: `xs` | `sm` | `md` | `lg` | `xl` | number
- `gradient`: `{ from, to, deg }` – used only when `variant="gradient"`
- `disabled`: boolean – disables interaction and applies disabled styles
- `data-disabled`: use instead of `disabled` when the button must look disabled but stay interactive (e.g. as a link, or with Tooltip)
- `loading`: boolean – shows a `Loader` in place of children and disables the button
- `loaderProps`: props forwarded to the inner `Loader`
- `autoContrast`: boolean – adjusts icon color for contrast against `color` background, only with `variant="filled"`
- `component`: polymorphic root element/component (default `button`)
- `aria-label`: required for accessibility since `ActionIcon` has no visible text
#### Syntax
```html
<ActionIcon variant="{variant}" color="{color}" size="{size}" radius="{radius}" aria-label="{label}">
  {icon}
</ActionIcon>
```
#### Rules
- `ActionIcon` is icon-only; always set `aria-label` or wrap hidden text with `VisuallyHidden` so screen readers announce its purpose
- `size` controls the button's own dimensions only, not the icon inside it — set the icon's own size prop separately
- Use `data-disabled` instead of `disabled` when the component renders as a link (`component="a"`), since `<a>` does not support the `disabled` attribute; also prevent default in `onClick`
- Use `data-disabled` instead of `disabled` if you need a `Tooltip` on a disabled button, since `onMouseLeave` does not fire on truly disabled buttons
- `gradient` is ignored unless `variant="gradient"`
- Group multiple `ActionIcon` components with `ActionIcon.Group` (optionally `orientation="horizontal"|"vertical"`); do not wrap children in extra elements or borders break
- Use `ActionIcon.GroupSection` for non-button content (e.g. a counter) placed inside `ActionIcon.Group`
