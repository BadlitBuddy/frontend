### ComboboxPopover
ComboboxPopover adds a combobox dropdown with selectable options to any button-like element. Unlike `Select`/`MultiSelect` it does not render its own input — you supply the target element via `ComboboxPopover.Target`
[combobox-popover docs](https://mantine.dev/core/combobox-popover/)
#### Import
```tsx
import { ComboboxPopover } from '@mantine/core';
```
#### Parts
- component: `ComboboxPopover`
- subcomponent: `ComboboxPopover.Target`
#### Key props
- `data`: options, same formats as `Select` (array of strings, `{ value, label, disabled? }` objects, or grouped `{ group, items }`)
- `value` / `onChange`: `string | null` (or `string[]` when `multiple`)
- `multiple`: boolean — switches value type to `string[]`
- `searchable`, `searchValue`, `onSearchChange`: enable and control an in-dropdown search input
- `nothingFoundMessage`: message shown when no options match
- `filter`: custom `OptionsFilter` function for filtering/sorting
- `limit`: caps number of rendered options (use with `searchable` for large data sets)
- `checkIconPosition`: `'left' | 'right'`, `allowDeselect`: boolean (default `true`)
- `renderOption`: custom option renderer, receives `{ option, checked }`
- `maxDropdownHeight`: number, dropdown wrapped in `ScrollArea.Autosize` by default
- `dropdownOpened`, `onDropdownOpen`, `onDropdownClose`: control/observe open state
- `comboboxProps`: forwarded to underlying `Combobox` (`position`, `width`, `middlewares`, `transitionProps`, `zIndex`, `shadow`, `dropdownPadding`, `withinPortal`, ...)
- `name`, `hiddenInputValuesDivider`: renders a hidden input for native form submission
#### Syntax
```tsx
<ComboboxPopover data={data} value={value} onChange={setValue}>
  <ComboboxPopover.Target>
    <Button variant="default">{value || 'Select framework'}</Button>
  </ComboboxPopover.Target>
</ComboboxPopover>
```
#### Rules
- `ComboboxPopover.Target` child must be a single element/component that accepts a `ref` — no fragments, strings, or other primitives
- `data` supports the same four shapes as `Select`: primitives, objects, grouped primitives, grouped objects
- When `multiple` is set, `value` becomes `string[]` and `onChange` receives an array
- To use inside a `Popover`, set `comboboxProps={{ withinPortal: false }}`
- By default the selected option can be deselected by clicking it again; set `allowDeselect={false}` to prevent this
