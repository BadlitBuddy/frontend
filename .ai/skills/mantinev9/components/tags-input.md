### TagsInput
TagsInput captures a list of values from the user via free input plus optional suggestions. It is similar to `MultiSelect` but, unlike it, allows entering custom values not present in `data`. It is built on top of `Combobox`
[tags-input docs](https://mantine.dev/core/tags-input/)
#### Import
```tsx
import { TagsInput } from '@mantine/core';
```
#### Key props
- `data`: suggestions — array of strings, or grouped `{ group, items: string[] }` (optional; works without it)
- `value` / `onChange`: `string[]` only
- `maxTags`: caps number of tags
- `splitChars`: array of characters that split pasted/typed text into tags (default `[',']`)
- `allowDuplicates`: boolean (default `false`); `isDuplicate(tagValue, currentTags)`: custom duplicate check
- `acceptValueOnBlur`: boolean (default `true`) — whether blurring the input commits the typed value as a tag
- `clearable`, `clearSectionMode`: `'both' | 'rightSection' | 'clear'`
- `searchValue`, `onSearchChange`: control the current (uncommitted) input text
- `filter`: custom `OptionsFilter({ options, search, limit })`
- `limit`: caps rendered suggestions for large data sets
- `renderOption`: custom suggestion renderer, receives `{ option }`
- `renderPill`: custom pill renderer, receives `{ option, value, onRemove, disabled, reorderProps }`
- `withPillsReorder`: enables drag-and-drop / keyboard pill reordering
- `withScrollArea`: boolean (default `true`), `maxDropdownHeight`: number
- `comboboxProps`: forwarded to underlying `Combobox` (`position`, `width`, `offset`, `middlewares`, `transitionProps`, `zIndex`, `shadow`, `dropdownPadding`, `withinPortal`, ...)
- `dropdownOpened`, `onDropdownOpen`, `onDropdownClose`: control/observe open state
- `leftSection` / `rightSection` (+ `*Width`, `*PointerEvents`)
- Inherits `Input`/`Input.Wrapper` props: `label`, `description`, `error`, `placeholder`, `disabled`, `readOnly`, `variant`, `size`, `radius`
#### Syntax
```tsx
<TagsInput
  label="Press Enter to submit a tag"
  placeholder="Enter tag"
  data={['React', 'Angular', 'Svelte']}
/>
```
#### Rules
- Press `Enter`, click a suggestion, or type a `splitChars` character to commit a tag; pasted text is also split on those characters
- `value`/`onChange` always deal in `string[]`; `data` is optional and only supplies suggestions — user-entered values not in `data` are still accepted
- A value is a duplicate if already in `value` regardless of case/whitespace, unless `allowDuplicates` is set or `isDuplicate` says otherwise
- Set `aria-label` (or `label`) so screen readers announce the input; use `clearButtonProps={{ 'aria-label': ... }}` when `clearable` is set
- To use inside a `Popover`, set `comboboxProps={{ withinPortal: false }}`
