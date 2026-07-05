### box

Box is Mantine's base polymorphic component used to render any HTML element with Mantine style props
[box docs](https://mantine.dev/core/box/)

#### Import

```tsx
import { Box } from "@mantine/core";
```

#### Key props

- `component`: HTML tag or custom component to render (default `"div"`)
- `display`: CSS display value
- `pos`: CSS position (`"relative"`, `"absolute"`, etc.)
- `w`, `h`, `miw`, `mih`, `maw`, `mah`: width/height constraints
- `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`: margin style props
- `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`: padding style props
- `bg`: background color
- `c`: text color
- `style`: inline styles
- `className`: CSS class
- `hiddenFrom` / `visibleFrom`: responsive visibility helpers

#### Syntax

```tsx
<Box component="section" p="md" bg="gray.1">
  {children}
</Box>
```

#### Rules

- `Box` is the foundation for most Mantine components and supports all Mantine style props
- Use `component` to render semantic HTML such as `"section"`, `"article"`, `"button"`, or `"a"`
- Prefer style props (`p`, `m`, `bg`, etc.) over inline styles when possible
- `Box` adds no visual styling by default—it is simply a styled wrapper
- When rendering interactive elements via `component`, ensure appropriate accessibility attributes are provided
