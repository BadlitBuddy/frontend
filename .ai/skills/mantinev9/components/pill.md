### Pill
Pill renders removable and non-removable tags. It is designed to be used inside inputs to build custom multi-select or tags-input components
[pill docs](https://mantine.dev/core/pill/)
#### Import
```tsx
import { Pill } from '@mantine/core';
```
#### Parts
- component: `Pill`
- subcomponent: `Pill.Group` — wraps multiple pills, typically inside `InputBase`/`PillsInput`
#### Key props
- `children`: pill label content
- `withRemoveButton`: boolean — shows a remove ("×") button
- `onRemove`: callback fired when remove button is clicked
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `disabled`: boolean — disables the remove button
#### Syntax
```tsx
<InputBase component="div" multiline>
  <Pill.Group>
    <Pill withRemoveButton onRemove={() => {}}>React</Pill>
    <Pill withRemoveButton onRemove={() => {}}>Vue</Pill>
  </Pill.Group>
</InputBase>
```
#### Rules
- `Pill` is a building block, not a standalone input — pair it with `PillsInput` (or `InputBase`) and `Pill.Group` to build custom multi-select/tags inputs
- Styles API selectors: `root` (root element), `label` (pill children), `remove` (remove button)
