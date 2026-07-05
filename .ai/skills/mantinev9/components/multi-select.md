### MultiSelect
MultiSelect is a custom searchable multi-select input for choosing several values from a predefined list. It is built on top of `Combobox` and, unlike `TagsInput`, does not allow entering custom values
[multi-select docs](https://mantine.dev/core/multi-select/)
#### Import
```tsx
import { MultiSelect } from '@mantine/core';
```
#### Key props
- `data`: options — array of strings, `{ value, label, disabled? }` objects, or grouped `{ group, items }`
- `value` / `onChange`: `string[]` only (other types unsupported)
- `searchable`, `searchValue`, `onSearchChange`: enable and control search filtering
- `nothingFoundMessage`: shown when no options match; if unset, dropdown hides on empty results
- `clearable`, `clearSectionMode`: `'both' | 'rightSection' | 'clear'`
- `maxValues`: caps number of selected values
- `hidePickedOptions`: removes already-selected options from the list
- `filter`: custom `OptionsFilter({ options, search, limit })`
- `limit`: caps rendered options for large data sets
- `checkIconPosition`: `'left' | 'right'`, `withCheckIcon`: boolean, `withAlignedLabels`: boolean
- `renderOption`: custom option renderer, receives `{ option, checked }`
- `renderPill`: custom pill renderer, receives `{ option, value, onRemove, disabled, reorderProps }`
- `withPillsReorder`: enables drag-and-drop / keyboard pill reordering
- `withScrollArea`: boolean (default `true`), `maxDropdownHeight`: number
- `floatingHeight`: set to `'viewport'` to fit dropdown to remaining viewport height
- `comboboxProps`: forwarded to underlying `Combobox` (`position`, `width`, `offset`, `middlewares`, `transitionProps`, `zIndex`, `shadow`, `dropdownPadding`, `withinPortal`, ...)
- `dropdownOpened`, `onDropdownOpen`, `onDropdownClose`: control/observe open state
- `leftSection` / `rightSection` (+ `*Width`, `*PointerEvents`)
- Inherits `Input`/`Input.Wrapper` props: `label`, `description`, `error`, `success`, `placeholder`, `disabled`, `readOnly`, `variant`, `size`, `radius`
#### Syntax
```tsx
<MultiSelect
  label="Your favorite libraries"
  placeholder="Pick value"
  data={['React', 'Angular', 'Vue', 'Svelte']}
/>
```
#### Rules
- `data` supports the same four shapes as `Select`: primitives, objects, grouped primitives, grouped objects
- `value` and `onChange` always deal in `string[]`; `MultiSelect<T>` can be typed explicitly for non-string primitive unions
- When the search input is empty and `Backspace` is pressed, the last selected item is removed — this is built-in and cannot be disabled
- Set `aria-label` (or `label`) so screen readers announce the input; use `clearButtonProps={{ 'aria-label': ... }}` when `clearable` is set
- To use inside a `Popover`, set `comboboxProps={{ withinPortal: false }}`
