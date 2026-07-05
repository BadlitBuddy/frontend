### color-swatch
ColorSwatch displays a small preview of a given color, optionally as a clickable button
[color-swatch docs](https://mantine.dev/core/color-swatch/)
#### Import
`import { ColorSwatch } from '@mantine/core';`
#### Component parts
- root: `ColorSwatch`
#### Syntax
```tsx
<ColorSwatch color="{cssColor}" size={size} radius="{radius}" withShadow={true} />
```
```tsx
<ColorSwatch component="button" color="{cssColor}" onClick={handler}>
  {checkedIcon}
</ColorSwatch>
```
#### Key props
- `color` (required, any valid CSS color — hex, rgba, or a `var(--mantine-color-*)` token)
- `size` (width/height, any valid CSS value, numbers convert to rem)
- `radius` (key of `theme.radius` or any valid CSS value)
- `withShadow` (adds an inner box-shadow so the swatch stays visible on light backgrounds; on by default)
- `children` (rendered in an overlay on top of the color, e.g. a checkmark icon)
- `component` (polymorphic root — use `"button"` for an interactive swatch)
#### Rules
- `ColorSwatch` supports alpha colors (e.g. `rgba(...)`) and renders a checkerboard alpha overlay behind them automatically
- To build a color picker button, set `component="button"` and conditionally render a check icon as `children` based on selected state
- Use `withShadow={false}` if the swatch already has sufficient contrast against its background and the inner shadow is not wanted
