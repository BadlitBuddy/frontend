### skeleton

Skeleton displays placeholder content while data or UI is loading
[skeleton docs](https://mantine.dev/core/skeleton/)

#### Import

```tsx
import { Skeleton } from "@mantine/core";
```

#### Key props

- `visible`: whether the skeleton overlay is shown (defaults to `true`); when wrapping existing content, toggle this to reveal or hide the content
- `height`: skeleton height (any valid CSS value)
- `width`: skeleton width (any valid CSS value, ignored when `circle` is set)
- `radius`: border radius (theme radius key or any valid CSS value)
- `circle`: makes the skeleton circular by setting its width and border radius equal to `height`
- `animate`: enables or disables the loading animation (defaults to `true`)

#### Syntax

```tsx
<Skeleton height={40} width={200} radius="md" />
```

```tsx
<Skeleton visible={loading}>{content}</Skeleton>
```

#### Rules

- Use standalone `Skeleton` components to mimic the layout of content that has not yet loaded
- Wrap existing content with `Skeleton` and control the loading state with the `visible` prop instead of conditionally rendering placeholders
- Set `circle` for avatar or icon placeholders; `height` determines both the width and diameter
- Disable animation with `animate={false}` for reduced motion or static loading states
- Match the dimensions of the final content as closely as possible to minimize layout shift during loading
