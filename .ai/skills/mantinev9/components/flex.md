### flex
Flex composes elements in a flexbox container, exposing flexbox CSS properties directly as responsive props.

[flex docs](https://mantine.dev/core/flex/)

#### Import
```jsx
import { Flex } from '@mantine/core';
```

#### Props
| Prop        | CSS Property     | Theme key       |
| ----------- | ---------------- | --------------- |
| `gap`       | `gap`            | `theme.spacing` |
| `rowGap`    | `rowGap`         | `theme.spacing` |
| `columnGap` | `columnGap`      | `theme.spacing` |
| `align`     | `alignItems`     | –               |
| `justify`   | `justifyContent` | –               |
| `wrap`      | `flexWrap`       | –               |
| `direction` | `flexDirection`  | –               |

All of the above props accept responsive object values, e.g. `direction={{ base: 'column', sm: 'row' }}`.

#### Syntax
```jsx
<Flex
  mih={50}
  gap="md"
  justify="flex-start"
  align="flex-start"
  direction="row"
  wrap="wrap"
>
  {CONTENT}
</Flex>
```

Responsive:
```jsx
<Flex
  direction={{ base: 'column', sm: 'row' }}
  gap={{ base: 'sm', sm: 'lg' }}
  justify={{ sm: 'center' }}
>
  {CONTENT}
</Flex>
```

#### Rules
- `Flex` is [polymorphic](https://mantine.dev/guides/polymorphic/) (default root `div`) and supports responsive style props, unlike `Group` and `Stack`.
- Use `Flex` instead of `Group`/`Stack` when you need both axes, wrapping, or responsive direction/gap/justify/align — use `Group`/`Stack` for simpler fixed-direction layouts (`Group` also gives equal-width children, which `Flex` does not).
- `Flex` relies on flexbox `gap` for spacing; in older browsers without flexbox-gap support, children may lack spacing — install a `flex-gap-polyfill` PostCSS plugin if needed.
- Comparison: `Group` = horizontal only, equal-width children supported, no responsive props, not polymorphic. `Stack` = vertical only, no wrap, no responsive props, not polymorphic. `Flex` = both directions, wrap supported, responsive props supported, polymorphic.
