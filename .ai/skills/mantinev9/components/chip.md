### chip
Chip is used to pick one or multiple values with inline, pill-shaped controls. It is built on native checkbox/radio inputs and can be grouped with `Chip.Group`.
[chip docs](https://mantine.dev/core/chip/)
#### Import
```tsx
import { Chip } from '@mantine/core';
```
#### Props (Chip)
- `checked` / `defaultChecked`: boolean — controlled / uncontrolled checked state
- `onChange`: `(checked: boolean) => void`
- `children`: ReactNode (required) — label content shown inside the chip
- `value`: string — required when used inside `Chip.Group`
- `type`: `"checkbox" | "radio"` — chip input type
- `icon`: ReactNode — replaces the default check icon
- `color` / `variant`: MantineColor / `"filled" | "outline" | "light"`
- `autoContrast`: boolean — adjusts text color against background for `filled` variant
- `radius` / `size`: MantineRadius / MantineSize
- `disabled`: boolean
- `wrapperProps`: props forwarded to the root element
- `rootRef`: ref to root element
#### Props (Chip.Group)
- `value` / `defaultValue`: string or string[] depending on `multiple`
- `onChange`: `(value) => void` — array if `multiple`, string if not
- `multiple`: boolean — allow more than one chip selected at a time
#### Syntax
```tsx
<Chip.Group multiple={multiple} value={value} onChange={setValue}>
  <Chip value="{value1}">{label1}</Chip>
  <Chip value="{value2}">{label2}</Chip>
</Chip.Group>
```
```tsx
<Chip defaultChecked>{label}</Chip>
```
#### Rules
- `Chip.Group` without `multiple` behaves like a radio group (single string value or `null`)
- `Chip.Group` with `multiple` behaves like a checkbox group (array of string values)
- To allow deselecting a radio-style chip, handle `onClick` and set value to `null` when clicking the already-selected chip
- Wrap `Chip` with `Tooltip` using `refProp="rootRef"` so the tooltip attaches to the whole chip, not just the hidden input
