### space
Space adds horizontal or vertical spacing between elements using values from the theme
[space docs](https://mantine.dev/core/space/)
#### Import
- `import { Space } from '@mantine/core';`
#### Props
- `h` (spacing) – vertical spacing (height)
- `w` (spacing) – horizontal spacing (width)
#### Syntax
```tsx
<Space h="{spacing}" />
<Space w="{spacing}" />
```
#### Rules
- Use `Space` to add spacing between regular HTML elements that do not have access to Mantine's style props (like `mt`, `mb`, `ml`, `mr`)
- Prefer margin style props (e.g. `mt="md"` on the following element) over `Space` when composing Mantine components, since it avoids adding an extra element
- `h` produces vertical spacing (used between stacked/block elements), `w` produces horizontal spacing (used inside flex containers, e.g. between inline elements)
