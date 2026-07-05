### color-input
ColorInput is used to capture a color value from the user via a text field paired with a color picker dropdown, swatches, and an optional eye dropper. It supports all `Input` and `Input.Wrapper` features.
[color-input docs](https://mantine.dev/core/color-input/)
#### Import
```tsx
import { ColorInput } from '@mantine/core';
```
#### Props
- `value` / `defaultValue`: string — controlled / uncontrolled color value
- `onChange`: `(value: string) => void`
- `onChangeEnd`: `(value: string) => void` — called after slider drag or value change finishes
- `format`: `"hex" | "hexa" | "rgb" | "rgba" | "hsl" | "hsla"` — `hexa`/`rgba`/`hsla` render an alpha slider
- `fixOnBlur`: boolean — reverts to last valid value on blur when true (default); set `false` to preserve invalid input
- `disallowInput`: boolean — disables free text entry, forces picking via picker/swatches
- `withPicker`: boolean — set `false` to hide the dropdown color picker (swatches/input only)
- `withEyeDropper`: boolean — shows eye dropper button when the browser's EyeDropper API is available
- `eyeDropperIcon`: ReactNode — replaces the default eye dropper icon
- `swatches`: `string[]` — predefined color swatches shown below the picker
- `swatchesPerRow`: number — swatches per row, default `7`
- `closeOnColorSwatchClick`: boolean — closes the dropdown when a swatch is clicked
- `withPreview`: boolean — shows a color preview swatch in the left section
- `leftSection` / `rightSection`: ReactNode — custom content, e.g. replacing color preview or eye dropper
- `leftSectionPointerEvents` / `rightSectionPointerEvents` — set `"none"` for non-interactive section content
- `label` / `description` / `error` / `success`: ReactNode — standard `Input.Wrapper` fields
- `withAsterisk` / `required`: boolean
- `disabled` / `readOnly`: boolean
- `loading`: boolean — shows loading indicator; `loadingPosition`: `"left" | "right"`
- `size` / `radius` / `variant`: MantineSize / MantineRadius / `"default" | "filled" | "unstyled"`
- `popoverProps`: props forwarded to the internal `Popover`
#### Syntax
```tsx
<ColorInput
  label="{label}"
  format="{format}"
  value={value}
  onChange={onChange}
  swatches={['#2e2e2e', '#fa5252', '#40c057']}
/>
```
#### Rules
- Always set `label` or `aria-label`; without one, screen readers cannot announce the input
- To restrict picking to only the given swatches, set `disallowInput`, `withPicker={false}`, and `withEyeDropper={false}` together
- The alpha slider only appears when `format` is `hexa`, `rgba`, or `hsla`
- Use `onChangeEnd` instead of `onChange` when you need to avoid firing on every drag pixel
