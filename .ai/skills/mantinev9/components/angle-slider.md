### angle-slider
AngleSlider is used for picking an angle value between `0` and `360`, for example a gradient angle. It is based on the `use-radial-move` hook.
[angle-slider docs](https://mantine.dev/core/angle-slider/)
#### Import
```tsx
import { AngleSlider } from '@mantine/core';
```
#### Props
- `value`: number — controlled component value
- `defaultValue`: number — uncontrolled component default value
- `onChange`: `(value: number) => void` — called on value change
- `onChangeEnd`: `(value: number) => void` — called after selection is finished (drag stop / keyboard change)
- `onScrubStart` / `onScrubEnd`: `() => void` — called on mouse/touch down and up
- `disabled`: boolean — sets `data-disabled` attribute, disables interactions
- `formatLabel`: `(value: number) => ReactNode` — formats the label shown inside the slider
- `withLabel`: boolean — if set, the label is displayed inside the slider
- `marks`: `{ value: number; label?: string }[]` — marks displayed on the slider
- `restrictToMarks`: boolean — if set, only values in `marks` can be selected
- `size`: number — slider size in px
- `thumbSize`: number — thumb size in px, derived from `size` by default
- `step`: number — step between values
- `name` / `hiddenInputProps` — used for uncontrolled forms; `name` sets a hidden input so the value is included in `FormData`
- `aria-label`: string — required for accessibility since there is no visible text label by default
#### Syntax
```tsx
<AngleSlider aria-label="{label}" value={value} onChange={onChange} />
```
#### Rules
- Value range is always `0`–`360`; keyboard `Home`/`End` set it to `0`/`359`
- Set `aria-label` whenever `withLabel` is not used, since the component has no accessible text by default
- Use `name` + `defaultValue` for uncontrolled usage inside native `<form>` elements
- `restrictToMarks` only works when `marks` is also provided
