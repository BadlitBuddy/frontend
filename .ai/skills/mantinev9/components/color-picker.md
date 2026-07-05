### color-picker
ColorPicker is used for picking colors in hex(a), rgb(a), hsl(a) and hsv(a) formats
[color-picker docs](https://mantine.dev/core/color-picker/)
#### Import
```tsx
import { ColorPicker } from '@mantine/core';
```
#### Props
- `value`: string — controlled value, must be a string in one of the supported color formats
- `onChange`: `(value: string) => void` — called with a string value when color changes
- `defaultValue`: string — initial value for uncontrolled usage
- `name`: string — sets the `name` attribute so the value is included in `FormData` on uncontrolled form submission
- `format`: `'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'` — color format, default `'hex'`
- `swatches`: string[] — array of predefined color swatches
- `swatchesPerRow`: number — number of swatches per row, default `7`
- `withPicker`: boolean — set `false` to hide the saturation/hue/alpha picker and show only swatches, default `true`
- `fullWidth`: boolean — stretch component to 100% of parent width, picker has no fixed width in this case
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` — controls sizes of sliders and thumbs, default `'sm'`
- `saturationLabel`: string — aria-label for the saturation slider
- `hueLabel`: string — aria-label for the hue slider
- `alphaLabel`: string — aria-label for the alpha slider
- `classNames`: Styles API object — target inner elements: `wrapper`, `preview`, `body`, `slider`, `sliderOverlay`, `saturation`, `saturationOverlay`, `sliders`, `thumb`, `swatch`, `swatches`
#### Syntax
```tsx
<ColorPicker
  format="{format}"
  value={value}
  onChange={onChange}
  swatches={swatches}
  size="{size}"
/>
```
#### Rules
- {value} must always be a string; other types (objects, arrays) are not supported
- {onChange} receives a single string argument with the new color value
- The alpha slider and color preview are only displayed when {format} supports an alpha channel (`hexa`, `rgba`, `hsla`)
- For uncontrolled forms, set {name} and {defaultValue} instead of {value}/{onChange}
- To render swatches without the saturation/hue picker, set `withPicker={false}` together with `fullWidth`
- Set {saturationLabel}, {hueLabel}, and {alphaLabel} for screen reader accessibility; sliders are focusable and adjustable with arrow keys by default
