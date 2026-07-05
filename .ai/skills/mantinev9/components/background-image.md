### background-image
BackgroundImage displays an image as a CSS background so that other content can be layered on top of it
[background-image docs](https://mantine.dev/core/background-image/)
#### Import
`import { BackgroundImage } from '@mantine/core';`
#### Component parts
- root: `BackgroundImage`
#### Syntax
```tsx
<BackgroundImage src="{url}" radius="{radius}">
  {content}
</BackgroundImage>
```
#### Key props
- `src` (required, image url)
- `radius` (key of `theme.radius` or any valid CSS value, numbers convert to rem)
#### Rules
- `BackgroundImage` renders a `div` with `background-image` set to `src`; children are rendered on top of it, unlike `Image` which renders an `<img>` element
- Useful for hero sections and cards where text/content must overlay an image — wrap content in `Center`/`Text` etc. inside it
- Constrain the size of `BackgroundImage` with a parent (`Box`, `maw`/width) or its own style/height, since the component does not set an intrinsic height on its own
