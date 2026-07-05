### PillsInput
PillsInput is the base input component for building custom tags inputs and multi-selects. By itself it contains no selection logic — it just renders its children (typically `Pill.Group` + `Pill` + `PillsInput.Field`) inside a styled input wrapper
[pills-input docs](https://mantine.dev/core/pills-input/)
#### Import
```tsx
import { PillsInput, Pill } from '@mantine/core';
```
#### Parts
- component: `PillsInput`
- subcomponent: `PillsInput.Field` — the actual text input rendered alongside pills
#### Key props
- `loading`, `loadingPosition`: `'left' | 'right'` — shows a loader
- Inherits `Input`/`Input.Wrapper` props: `label`, `description`, `error`, `variant`, `size`, `radius`, plus all `div` element props
- `PillsInput.Field` accepts standard `input` props (`value`, `onChange`, `onFocus`, `onBlur`, `onKeyDown`, `placeholder`, `aria-label`, ...)
#### Syntax
```tsx
<PillsInput label="PillsInput">
  <Pill.Group>
    <Pill>React</Pill>
    <Pill>Vue</Pill>
    <Pill>Svelte</Pill>
    <PillsInput.Field placeholder="Enter tags" />
  </Pill.Group>
</PillsInput>
```
#### Rules
- Always wrap pills and the field in `Pill.Group` inside `PillsInput`
- `PillsInput` has no built-in logic — combine it with `Combobox` (via `useCombobox`) to implement search, filtering, and option selection, as `MultiSelect`/`TagsInput` do internally
- If used without a `label` prop, set `aria-label` on `PillsInput.Field` so screen readers announce it
