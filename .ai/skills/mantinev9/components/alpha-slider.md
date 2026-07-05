### alpha-slider
AlphaSlider is used for picking the alpha (opacity) channel of a color, as a value between `0` and `1`. It is a part of the ColorPicker component but can be used standalone.
[alpha-slider docs](https://mantine.dev/core/alpha-slider/)
#### Import
```tsx
import { AlphaSlider } from '@mantine/core';
```
#### Props
- `value`: number (required) — controlled component value, `0` to `1`
- `onChange`: `(value: number) => void` — called when value changes
- `onChangeEnd`: `(value: number) => void` — called when user stops dragging or uses keyboard to change value
- `onScrubStart` / `onScrubEnd`: `() => void` — called on drag start/end
- `color`: string (required) — base color used to render the gradient
- `size`: MantineSize — slider size
- `focusable`: boolean — if set, slider thumb can be focused
#### Syntax
```tsx
<AlphaSlider color="{color}" value={value} onChange={onChange} />
```
#### Rules
- {value} must be a number between `0` and `1`
- {color} accepts any valid CSS color and controls the hue shown in the gradient track
- Use with `useState` for controlled usage; pair with `onChangeEnd` to debounce expensive updates
- Combine with `HueSlider` and a saturation picker to build a custom `ColorPicker`
