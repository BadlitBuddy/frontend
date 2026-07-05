### checkbox
Checkbox is used to capture boolean input from the user. It is based on the native `input[type="checkbox"]` element and supports label, description, error, indeterminate state, and grouping via `Checkbox.Group`.
[checkbox docs](https://mantine.dev/core/checkbox/)
#### Import
```tsx
import { Checkbox } from '@mantine/core';
```
#### Related components
- `Checkbox.Group` — manages state of multiple checkboxes, supports `Input.Wrapper` props (`label`, `description`, `error`, `withAsterisk`)
- `Checkbox.Indicator` — visual-only checkbox representation, not focusable/accessible, useful inside custom cards
- `Checkbox.Card` — accessible `role="checkbox"` wrapper for building card/button-like checkboxes, works with `Checkbox.Group`
#### Props (Checkbox)
- `checked` / `defaultChecked`: boolean — controlled / uncontrolled value
- `onChange`: `(event) => void` — receives native change event, read `event.currentTarget.checked`
- `indeterminate`: boolean — indeterminate state; when set, `checked` is ignored
- `label`: ReactNode — label associated with the checkbox
- `labelPosition`: `"left" | "right"`
- `description` / `error`: ReactNode — helper text / error message below the label
- `withErrorStyles`: boolean — apply error styles when `error` is set
- `color` / `iconColor`: MantineColor — checked background color / icon color
- `icon`: `CheckboxIconComponent` — custom icon for checked/indeterminate state
- `autoContrast`: boolean — adjust icon color for contrast against `color` (filled variant only)
- `radius` / `size`: MantineRadius / MantineSize
- `readOnly`: boolean — displays state but blocks user interaction
- `disabled`: boolean
- `wrapperProps`: props forwarded to the root element (most props go to the `input` element instead)
- `rootRef`: ref to the root `div` element (use `ref` for the input element)
- `name` — for uncontrolled forms, includes value in `FormData`
#### Props (Checkbox.Group)
- `value` / `defaultValue`: `string[]` — array of checked checkbox values
- `onChange`: `(value: string[]) => void`
- `maxSelectedValues`: number — disables remaining checkboxes once limit is reached
- `disabled`: boolean — disables all checkboxes in the group
- `name` / `hiddenInputValuesSeparator` — for uncontrolled forms; separator defaults to `','`
#### Syntax
```tsx
<Checkbox
  checked={checked}
  onChange={(event) => setChecked(event.currentTarget.checked)}
  label="{label}"
/>
```
```tsx
<Checkbox.Group value={value} onChange={setValue} label="{label}">
  <Checkbox value="{value1}" label="{label1}" />
  <Checkbox value="{value2}" label="{label2}" />
</Checkbox.Group>
```
#### Rules
- Always set `label` or `aria-label` — an unlabeled `Checkbox` is inaccessible
- When `indeterminate` is set, `checked` is dismissed; manage indeterminate logic manually (e.g. "select all" patterns)
- Use `Checkbox.Indicator` only for non-interactive visual state, never as a replacement for `Checkbox` itself
- `Checkbox.Card` + `Checkbox.Indicator` is the recommended pattern for button-like/card-like checkboxes
