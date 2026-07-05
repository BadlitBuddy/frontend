### aspect-ratio
AspectRatio maintains a consistent responsive width/height ratio for its child. Useful for images, maps, and video embeds.

[aspect-ratio docs](https://mantine.dev/core/aspect-ratio/)

#### Import
```jsx
import { AspectRatio } from '@mantine/core';
```

#### Props
- `ratio`: number — width/height ratio, e.g. `16 / 9` or `1080 / 720`
- inherits standard style props (`maw`, `mx`, `flex`, etc.) since it renders a `div`

#### Syntax
```jsx
<AspectRatio ratio={16 / 9}>
  <img src="{src}" alt="{alt}" />
</AspectRatio>
```

#### Rules
- `AspectRatio` should wrap a single child element (image, iframe, video, etc.) that will be stretched to fill it.
- By default `AspectRatio` has no fixed width/height and expands to fill its parent container.
- Inside a flex container, `AspectRatio` will **not** stretch automatically — set `width` or `flex` explicitly (e.g. `flex="0 0 100px"`) to size it.
- Common ratios: `1` (square), `16 / 9` (video/map embeds), `4 / 3`.
- Works well for `iframe` embeds (maps, YouTube videos) by giving the iframe `style={{ border: 0 }}` and relying on `AspectRatio` for sizing.
