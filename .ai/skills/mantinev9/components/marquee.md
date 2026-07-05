### marquee

Marquee continuously scrolls its children horizontally or vertically
[marquee docs](https://mantine.dev/core/marquee/)

#### Import

```tsx
import { Marquee } from "@mantine/core";
```

#### Key props

- `children`: content to scroll
- `speed`: scrolling speed
- `direction`: `"left"` (default), `"right"`, `"up"`, or `"down"`
- `loop`: number of animation repetitions (`0` for infinite)
- `reverse`: reverses scroll direction
- `pauseOnHover`: pauses animation while hovered
- `fadeEdges`: fades content near container edges

#### Syntax

```tsx
<Marquee speed={40} pauseOnHover>
  {items}
</Marquee>
```

#### Rules

- Use for continuously scrolling badges, logos, announcements, or tickers
- Avoid placing important or required content exclusively inside a marquee
- Enable `pauseOnHover` when users may need to interact with the content
- Marquee duplicates children internally to create a seamless loop
