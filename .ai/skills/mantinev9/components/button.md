### button
Button is used to render a clickable button or link with text, icons, loading and disabled states
[button docs](https://mantine.dev/core/button/)
#### Import
```js
import { Button } from '@mantine/core';
```
#### Props
- `variant`: `filled` (default) | `light` | `outline` | `subtle` | `transparent` | `white` | `default` | `gradient`
- `color`: `MantineColor`
- `size`: `xs` | `sm` | `md` | `lg` | `xl` | `compact-xs` … `compact-xl` – compact sizes keep font size but reduce padding/height
- `radius`: `xs` | `sm` | `md` | `lg` | `xl` | number
- `fullWidth`: boolean – button takes 100% of parent width
- `leftSection` / `rightSection`: React node rendered left/right of the label (flipped in RTL)
- `justify`: sets `justify-content` of the inner element, useful with sections (e.g. `"space-between"`)
- `gradient`: `{ from, to, deg }` – used only when `variant="gradient"`
- `disabled`: boolean
- `data-disabled`: use instead of `disabled` to keep the button visually disabled but interactive (links, Tooltip)
- `loading`: boolean – shows `Loader` overlay and disables the button
- `loaderProps`: props forwarded to the inner `Loader`
- `autoContrast`: boolean – adjusts text color for contrast, only with `variant="filled"`
- `component`: polymorphic root element/component (default `button`)
#### Syntax
```html
<Button variant="{variant}" color="{color}" size="{size}" leftSection="{icon}">
  {label}
</Button>
```
#### Rules
- Use `data-disabled` instead of `disabled` when `component="a"` (links don't support `disabled`), and call `event.preventDefault()` in `onClick`
- Use `data-disabled` instead of `disabled` if wrapping with `Tooltip`, since `onMouseLeave` never fires on a truly disabled button
- To align just one section to an edge, set `justify="space-between"` and add an empty `<span />` to the opposite section
- Group multiple `Button` components with `Button.Group` (optionally `orientation="horizontal"|"vertical"`); do not wrap children in extra elements or borders break
- Use `Button.GroupSection` for non-button content (e.g. a counter) placed inside `Button.Group`
- `gradient` is ignored unless `variant="gradient"`
