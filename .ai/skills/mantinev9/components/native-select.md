### native-select
NativeSelect renders a native browser `select` element wrapped with Input styling, used when a lightweight dropdown without a custom popover is preferred
[native-select docs](https://mantine.dev/core/native-select/)
#### Import
```tsx
import { NativeSelect } from '@mantine/core';
```
#### Key props
- `data`: array of options — strings, `{ label, value, disabled }` objects, or grouped variants (`{ group, items }`)
- `value` / `onChange` / `defaultValue`: controlled/uncontrolled value handling (`onChange` receives the native change event)
- `name`: required for uncontrolled forms to include the value in `FormData`
- `loading` / `loadingPosition`: shows a loading indicator (`'left'` or `'right'`, default right)
- `leftSection` / `rightSection`: React node rendered inside the input, with matching `*Width` and `*PointerEvents` props
- `disabled`, `error`, `label`, `description`: standard Input/Input.Wrapper props
- `children`: alternative to `data` — use `option`/`optgroup` elements directly (if `children` is set, `data` is ignored)
#### Syntax
```tsx
<NativeSelect
  label="{label}"
  data={[{ value, label }]}
/>
```
#### Rules
- If `children` is passed, the `data` prop is ignored entirely — pick one or the other
- `data` supports four shapes: array of strings, array of `{label, value, disabled}` objects, grouped string items (`{group, items: string[]}`), or grouped object items (`{group, items: {label,value,disabled}[]}`)
- Use `hr` elements between `option`/`optgroup` children to render visual dividers (only works with the `children` API, not `data`)
- For uncontrolled usage, set `name` and read the value via `FormData` on submit; set `defaultValue` for the initial selection
- Without a `label` prop, set `aria-label`, or the select will not be announced properly by screen readers
