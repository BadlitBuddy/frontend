### Select
Select is a custom searchable select for capturing user input based on suggestions from a list. Unlike `Autocomplete`, it does not allow entering custom values. It is built on top of `Combobox`
[select docs](https://mantine.dev/core/select/)
#### Import
```tsx
import { Select } from '@mantine/core';
```
#### Key props
- `data`: options — array of strings, `{ value, label, disabled? }` objects, or grouped `{ group, items }`
- `value` / `onChange`: `value` is a primitive (`string | number | boolean`) or `null`; `onChange(value, option)` receives the selected option as a second argument
- `searchable`, `searchValue`, `onSearchChange`: enable and control search filtering
- `autoSelectOnBlur`: auto-selects the highlighted option on blur (only with `searchable`)
- `openOnFocus`: opens dropdown on focus (only with `searchable`)
- `nothingFoundMessage`: shown when no options match; if unset, dropdown hides on empty results
- `clearable`, `clearSectionMode`: `'both' | 'rightSection' | 'clear'`
- `allowDeselect`: boolean (default `true`) — click selected option again to clear it
- `filter`: custom `OptionsFilter({ options, search, limit })`
- `limit`: caps rendered options for large data sets
- `checkIconPosition`: `'left' | 'right'`, `withCheckIcon`: boolean, `withAlignedLabels`: boolean
- `renderOption`: custom option renderer, receives `{ option, checked }`
- `withScrollArea`: boolean (default `true`), `maxDropdownHeight`: number
- `floatingHeight`: set to `'viewport'` to fit dropdown to remaining viewport height
- `comboboxProps`: forwarded to underlying `Combobox` (`position`, `width`, `offset`, `middlewares`, `transitionProps`, `zIndex`, `shadow`, `dropdownPadding`, `withinPortal`, ...)
- `dropdownOpened`, `onDropdownOpen`, `onDropdownClose`: control/observe open state
- `leftSection` / `rightSection` (+ `*Width`, `*PointerEvents`)
- Inherits `Input`/`Input.Wrapper` props: `label`, `description`, `error`, `placeholder`, `disabled`, `readOnly`, `variant`, `size`, `radius`
#### Syntax
```tsx
<Select
  label="Your favorite library"
  placeholder="Pick value"
  data={['React', 'Angular', 'Vue', 'Svelte']}
/>
```
#### Rules
- `data` supports four shapes: array of primitives, array of `{ value, label, disabled? }`, grouped primitives `{ group, items: [...] }`, or grouped objects
- Value type is inferred from `data`; use `Select<T>` to set it explicitly for non-string primitive unions
- Set `aria-label` (or `label`) so screen readers announce the input; use `clearButtonProps={{ 'aria-label': ... }}` when `clearable` is set
- To use inside a `Popover`, set `comboboxProps={{ withinPortal: false }}`
- If experiencing horizontal infinite scroll in the dropdown, set `comboboxProps={{ middlewares: { shift: { padding: 0 } } }}`
