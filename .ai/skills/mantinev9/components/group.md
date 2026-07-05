### group
Group is a horizontal flex container used to compose elements and components in a row
[group docs](https://mantine.dev/core/group/)
#### Import
- `import { Group } from '@mantine/core';`
#### Props
- `gap` (spacing, key of `theme.spacing` or any valid CSS value, default `md`)
- `justify` (justify-content)
- `align` (align-items)
- `wrap` (flex-wrap)
- `grow` (boolean) – each child gets `flex-grow: 1`
- `preventGrowOverflow` (boolean, default `true`) – limits each child's max-width to `(1 / children.length) * 100%` so children can't overflow the row when `grow` is set; set to `false` to let children grow past that limit based on their content
#### Syntax
```tsx
<Group gap="{gap}" justify="{justify}" align="{align}" grow={GROW} preventGrowOverflow={PREVENT}>
  {content}
</Group>
```
#### Rules
- Use `Group` for a horizontal flex container; use `Stack` for a vertical flex container; use `Flex` if full control over flex container CSS properties is needed
- `Group` works correctly only with React elements as direct children — strings, numbers, and fragments may render with incorrect styles when `grow` is set, since spacing/growth calculations rely on child elements
- Uses flexbox `gap` for spacing between children (no margin-based spacing hacks needed)
