### autocomplete
Autocomplete is a text input that shows suggestions as the user types, but does not restrict the value to those suggestions
[autocomplete docs](https://mantine.dev/core/autocomplete/)
#### Import
```tsx
import { Autocomplete } from '@mantine/core';
```
#### Components
- component: `Autocomplete`
#### Syntax
```tsx
<Autocomplete
  label="{label}"
  placeholder="{placeholder}"
  data={DATA}
  error="{ERROR}"
  clearable={CLEARABLE}
  limit={LIMIT}
  disabled={DISABLED}
/>
```
where `{DATA}` is one of:
```tsx
// array of strings
['React', 'Angular', 'Vue', 'Svelte']

// array of groups
[
  { group: 'Frontend', items: ['React', 'Angular'] },
  { group: 'Backend', items: ['Express', 'Django'] },
]
```
#### Rules
- `Autocomplete` is NOT a searchable select: values are never enforced to be one of the suggestions, users can type anything. Use `Select` instead if the value must be restricted to the list
- The value is always a string; `onChange` is called with a string, not an option object
- Use `value`/`onChange` for controlled state, or `defaultValue` for uncontrolled state
- Set `name` on an uncontrolled `Autocomplete` to include its value in `FormData` on submit
- `data` accepts an array of strings, an array of `{ value, label? }` objects, or grouped data `{ group, items }`; values must be unique
- By default, options are filtered by checking if the option label contains the input value; override with the `filter` prop, which receives `{ options, search, limit }` and must return the filtered/sorted options
- `limit` caps the number of options rendered at once (`Infinity` by default) — important for large data sets; if a custom `filter` is set, it must implement its own limiting
- `selectFirstOptionOnChange` auto-selects the first option when the input value changes, so the user can press `Enter` immediately
- `autoSelectOnBlur` auto-selects the highlighted option when the input loses focus
- `renderOption` customizes how each option renders; it receives the option object and must return a `ReactNode`
- There is no "nothing found" message support, since any typed string is a valid value
- `comboboxProps` passes props down to the underlying `Combobox` (e.g. `{ withinPortal: false }`, `{ position: 'top' }`, `{ zIndex: 1000 }`) since `Autocomplete` is built on top of `Combobox`
- `clearable` shows a clear button in the right section when there is a value; `clearSectionMode` controls whether to show `"both"` (default), only `"rightSection"`, or only `"clear"`
- `readOnly` disables suggestions and the `onChange` callback while keeping the input focusable; `disabled` fully disables interaction
- If used without a `label` prop, set `aria-label` for accessibility
