### range-slider

RangeSlider lets a user pick a numeric range (two thumbs: from/to) by dragging or with arrow keys.
[range-slider docs](https://mantine.dev/core/range-slider/)

#### Import

```jsx
import { RangeSlider } from "@mantine/core";
```

#### Key props

- `value` / `defaultValue`: `[number, number]` — controlled/uncontrolled range value
- `onChange`, `onChangeEnd` — fired on drag and on drag-end/keyboard-commit respectively
- `min`, `max`, `step` — value bounds and increment
- `domain`: `[number, number]` — restricts selectable range independently of the displayed `min`/`max` track
- `minRange`, `maxRange` — minimum/maximum allowed distance between the two thumbs (`minRange` default `10`, `maxRange` default `Infinity`)
- `pushOnOverlap` (default `true`) — whether one thumb pushes the other when `minRange`/`maxRange` is hit
- `marks`: `{ value, label?, hidden? }[]` — tick marks on the track
- `restrictToMarks` — only allow values that match `marks` (ignores `step`)
- `label` — formatter function for the floating value label, `null` to disable
- `labelAlwaysOn`, `showLabelOnHover` — label visibility behavior
- `inverted`, `orientation` (`horizontal` | `vertical`)
- `color`, `size`, `radius`, `disabled`, `name` (for uncontrolled forms via `FormData`)
- `thumbFromLabel`, `thumbToLabel` — `aria-label` for each thumb

#### Syntax

```jsx
<RangeSlider
  value={[from, to]}
  onChange={setValue}
  min={0}
  max={100}
  minRange={10}
  marks={[
    { value: 20, label: "20%" },
    { value: 80, label: "80%" },
  ]}
/>
```

#### Rules

- Use `defaultValue` for uncontrolled usage; set `name` so the value is included in `FormData` on submit
- `domain` only limits selectable values — `min`/`max` still control the visible track range
- When `restrictToMarks` is set, `step` is ignored
- Give both thumbs `aria-label`s via `thumbFromLabel`/`thumbToLabel` since there's no visible text label per thumb
- Use `scale` + `thumbValueText` together when displaying transformed (e.g. formatted/currency) values, so screen readers announce the real value
