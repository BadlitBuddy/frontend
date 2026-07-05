### mask-input
MaskInput is used for capturing formatted text (phone numbers, credit cards, dates, etc.) by enforcing a fixed character pattern as the user types
[mask-input docs](https://mantine.dev/core/mask-input/)
#### Import
```tsx
import { MaskInput } from '@mantine/core';
```
#### Key props
- `mask`: string pattern (e.g. `"(999) 999-9999"`) or an array of string literals / `RegExp` for complex patterns
- `modify`: `(value: string) => { mask: string } | undefined` — dynamically swap the mask based on current value
- `tokens`: object overriding/extending built-in token map, e.g. `{ h: /[0-9a-fA-F]/ }`
- `transform`: `(char: string) => string` — transform each typed character before validation (e.g. auto-uppercase)
- `slotChar`: placeholder string shown for empty slots
- `resetRef`: ref exposing an imperative function to clear the input value (input is uncontrolled internally)
- `onChangeRaw`: callback receiving the raw unmasked value, used to sync with `use-form`
- `disabled`, `error`, `success`, `label`, `description`, `placeholder`: standard Input/Input.Wrapper props
#### Syntax
```tsx
<MaskInput
  label="{label}"
  placeholder="{placeholder}"
  mask="{mask}"
/>
```
#### Mask pattern syntax
Built-in tokens (editable slots):
- `9` – any digit (`[0-9]`)
- `a` – any letter (`[A-Za-z]`)
- `A` – any uppercase letter (`[A-Z]`)
- `*` – any alphanumeric character
- `#` – digit or sign (`[-+0-9]`)

All other characters in the mask are literals and are inserted automatically (e.g. `(`, `)`, `-`, space).
#### Rules
- `MaskInput` is uncontrolled internally; setting `value` from a parent will NOT clear it — use `resetRef` to clear imperatively instead
- To make remaining slots optional, append `?` after the last required character, e.g. `mask="(999) 999-9999? x9999"`
- To treat a token character as a literal instead of an editable slot, escape it with `\`, e.g. `mask="\A999"` makes the leading `A` literal
- Use `modify` when the mask itself must change based on what has been typed so far (e.g. switching credit card formats)
- Use `tokens` to define custom token characters beyond the built-in set
- For complex masks not expressible with tokens, pass `mask` as an array mixing string literals and `RegExp` objects, e.g. `[/[0-2]/, /\d/, ':', /[0-5]/, /\d/]`
- When integrating with `use-form` in uncontrolled mode, call `form.setFieldValue(name, raw, { forceUpdate: false })` inside `onChangeRaw` to avoid remounting the input on every keystroke
- Without a `label` prop, set `aria-label` for accessibility
