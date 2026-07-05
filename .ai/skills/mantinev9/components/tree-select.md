### TreeSelect
TreeSelect picks one or more values from hierarchical tree data. It supports three selection modes — single, multiple, and checkbox (with parent-child cascade) — and uses the same `data` shape as the `Tree` component
[tree-select docs](https://mantine.dev/core/tree-select/)
#### Import
```tsx
import { TreeSelect, TreeNodeData } from '@mantine/core';
```
#### Key props
- `data`: `TreeNodeData[]` — each node needs unique `value` and `label`, and an optional `children: TreeNodeData[]`
- `mode`: `'single' | 'multiple' | 'checkbox'` (default `'single'`) — single renders as a plain input, multiple/checkbox render as pills
- `value` / `onChange`: `string | null` in `single` mode, `string[]` in `multiple`/`checkbox` mode
- `checkStrictly`: boolean — in `checkbox` mode, disables parent-child cascade so each node's checked state is independent
- `checkedStrategy`: `'child' | 'all' | 'parent'` (default `'child'`) — controls which checked nodes appear in `value`/pills in `checkbox` mode
- `expandOnClick`: boolean — clicking a parent node also toggles expansion (not just the chevron)
- `withLines`: boolean (default `true`) — connecting lines between parent/child nodes
- `defaultExpandAll`, `defaultExpandedValues`: initial expand state; `expandedValues` / `onExpandedChange`: controlled expand state
- `searchable`, `nothingFoundMessage`: filtering; matching nodes and their ancestors are shown
- `clearable`: shows clear button
- `maxValues`: caps selected values in `multiple`/`checkbox` mode
- `renderNode`: custom node renderer, receives `{ node, level, expanded, hasChildren, selected, checked, indeterminate }`
- `withScrollArea`: boolean (default `true`), `maxDropdownHeight`: number
- `comboboxProps`: forwarded to underlying `Combobox` (`position`, `width`, `offset`, `middlewares`, `transitionProps`, `zIndex`, `shadow`, `dropdownPadding`, `withinPortal`, ...)
- `dropdownOpened`, `onDropdownOpen`, `onDropdownClose`: control/observe open state
- `leftSection` / `rightSection` (+ `*Width`, `*PointerEvents`)
- Inherits `Input`/`Input.Wrapper` props: `label`, `description`, `error`, `success`, `placeholder`, `disabled`, `readOnly`, `variant`, `size`, `radius`
#### Syntax
```tsx
const data: TreeNodeData[] = [
  { value: 'fruits', label: 'Fruits', children: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]},
  { value: 'milk', label: 'Milk' },
];

<TreeSelect
  label="Your favorite item"
  placeholder="Pick value"
  data={data}
  mode="multiple"
  defaultExpandAll
/>
```
#### Rules
- In `checkbox` mode (without `checkStrictly`), checking/unchecking a parent cascades to all its children, and partially-checked parents show an indeterminate state
- In `single`/`multiple` mode, only leaf nodes can be selected unless `expandOnClick` changes parent-click behavior; in `checkbox` mode, clicking a parent both toggles its checked state and expands it when `expandOnClick` is set
- Keyboard: `ArrowRight` expands, `ArrowLeft` collapses/moves to parent, `ArrowUp`/`ArrowDown` move between options, `Enter` selects
- Set `aria-label` (or `label`) so screen readers announce the input; use `clearButtonProps={{ 'aria-label': ... }}` when `clearable` is set
