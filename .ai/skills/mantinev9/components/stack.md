### stack
Stack is a vertical flex container used to compose elements and components in a column
[stack docs](https://mantine.dev/core/stack/)
#### Import
- `import { Stack } from '@mantine/core';`
#### Props
- `gap` (spacing, key of `theme.spacing` or any valid CSS value)
- `align` (align-items, e.g. `"stretch"`, `"center"`, `"flex-start"`, `"flex-end"`)
- `justify` (justify-content, e.g. `"center"`, `"flex-start"`, `"flex-end"`, `"space-between"`, `"space-around"`)
#### Syntax
```tsx
<Stack align="{align}" justify="{justify}" gap="{gap}">
  {content}
</Stack>
```
#### Rules
- Use `Stack` for a vertical flex container; use `Group` for a horizontal flex container; use `Flex` if full control over flex container CSS properties is needed
- Uses flexbox `gap` for spacing between children; in browsers without flexbox gap support, children may render without spacing (a `flex-gap-polyfill` PostCSS plugin exists for this case)
