### combobox
Combobox is a low-level, headless set of components and hooks used to build custom select, multiselect, autocomplete, or tags input components
[combobox docs](https://mantine.dev/core/combobox/)
#### Import
```tsx
import { Combobox, useCombobox, InputBase, Input } from '@mantine/core';
```
#### Components
- component: `Combobox`
- parts: `Combobox.Target`, `Combobox.EventsTarget`, `Combobox.DropdownTarget`, `Combobox.Dropdown`, `Combobox.Options`, `Combobox.Option`, `Combobox.Group`, `Combobox.Search`, `Combobox.Empty`, `Combobox.Header`, `Combobox.Footer`, `Combobox.Chevron`
- hook: `useCombobox` (returns a `ComboboxStore`)
#### Syntax
```tsx
const combobox = useCombobox({
  onDropdownClose: () => combobox.resetSelectedOption(),
});

<Combobox store={combobox} onOptionSubmit={(val) => { /* set value */ combobox.closeDropdown(); }}>
  <Combobox.Target>
    <InputBase
      component="button"
      type="button"
      pointer
      rightSection={<Combobox.Chevron />}
      rightSectionPointerEvents="none"
      onClick={() => combobox.toggleDropdown()}
    >
      {value || <Input.Placeholder>{PLACEHOLDER}</Input.Placeholder>}
    </InputBase>
  </Combobox.Target>

  <Combobox.Dropdown>
    <Combobox.Options>
      <Combobox.Option value="{value}">{label}</Combobox.Option>
      {/* ...more options, or <Combobox.Empty>{message}</Combobox.Empty> when none match */}
    </Combobox.Options>
  </Combobox.Dropdown>
</Combobox>
```
#### Rules
- `useCombobox` must be called to create a store, and that store must be passed to `Combobox`'s `store` prop; the store holds dropdown opened state and exposes handlers like `openDropdown`, `closeDropdown`, `toggleDropdown`, `selectFirstOption`, `selectNextOption`, `selectPreviousOption`, `resetSelectedOption`, `clickSelectedOption`, `updateSelectedOptionIndex`, `focusSearchInput`, `focusTarget`
- `onDropdownClose`/`onDropdownOpen` (passed to `useCombobox`) commonly call `combobox.resetSelectedOption()` on close and `combobox.selectFirstOption()`/`selectActiveOption()` on open
- `Combobox.Target` wraps a single target child (any component accepting `ref` and other props, e.g. `TextInput`, `InputBase`, `Button`) and wires up `aria-*` attributes and keyboard navigation automatically
- Use `Combobox.EventsTarget` + `Combobox.DropdownTarget` instead of `Combobox.Target` when the events target and the dropdown-positioning target must be different elements (e.g. a searchable multiselect built on `PillsInput`); you can have multiple `EventsTarget`s but only one `DropdownTarget` per `Combobox`
- Use `Combobox.EventsTarget` alone (no `Combobox.Dropdown`) to use `Combobox` purely for keyboard/selection logic without any dropdown UI
- `Combobox.Option` requires a unique `value` prop; set `active` to mark it as the keyboard-active option (no built-in styles — style via the `data-combobox-active` attribute) and `disabled` to make it non-selectable and skipped by keyboard navigation
- `onOptionSubmit` on `Combobox` fires when an option is clicked or submitted via `Enter`, receiving the option's `value`
- When the options list changes due to filtering, call `combobox.updateSelectedOptionIndex()` in the search input's `onChange` handler to keep keyboard selection in sync
- Wrap `Combobox.Option` elements in `Combobox.Group` (with a `label` prop) to create option groups; the group label auto-hides if it has no children
- `Combobox.Search` renders a search input inside the dropdown (as opposed to using the target itself as the search field); call `combobox.focusSearchInput()` on dropdown open and `combobox.focusTarget()` on close to manage focus correctly
- `Combobox.Empty` renders a "nothing found" message; show it conditionally when the filtered options array is empty
- To make the dropdown scrollable, set a `max-height` (e.g. `mah={200}` style prop) on `Combobox.Options` or `Combobox.Dropdown`, optionally wrapping content in `ScrollArea.Autosize`
- Set `floatingHeight="viewport"` on `Combobox` to make the dropdown grow to fill available viewport space (disables the `flip` middleware); use the exposed `--combobox-floating-options-max-height` CSS variable as `mah` on a `ScrollArea.Autosize` inside the dropdown
- Set `hidden` on `Combobox.Dropdown` to conditionally hide the dropdown, e.g. when there are zero options
- To control dropdown opened state externally, pass `opened` (controlled) to `useCombobox`
- `Combobox` accepts most `Popover` props directly (e.g. `position`, `middlewares`, `withArrow`, `width`) since it is built on top of `Popover`
- For large datasets, use `useVirtualizedCombobox` instead of `useCombobox`; it requires externally tracked `selectedOptionIndex`/`activeOptionIndex` state and integrates with virtualization libraries like `@tanstack/react-virtual` or `react-virtuoso`
- `Autocomplete` and `Select` are pre-built, opinionated components built on top of `Combobox` for common cases — prefer them unless the required behavior isn't supported
