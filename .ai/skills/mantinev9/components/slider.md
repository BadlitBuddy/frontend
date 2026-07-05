### slider

Slider lets a user pick a single numeric value by dragging a thumb or with arrow keys.
[slider docs](https://mantine.dev/core/slider/)

#### Import

```jsx
import { Slider } from "@mantine/core";
```

#### Key props

- `value` / `defaultValue`: `number` — controlled/uncontrolled value
- `onChange`, `onChangeEnd` — fired on drag and on drag-end/keyboard-commit respectively (good for debounced use)
- `min`, `max`, `step`
- `domain`: `[number, number]` — restricts selectable range independently of the displayed `min`/`max` track
- `marks`: `{ value, label?, hidden? }[]` — tick marks on the track
- `restrictToMarks` — only allow values that match `marks` (ignores `step`)
- `label` — formatter function for the floating value label, `null` to disable
- `labelAlwaysOn`, `showLabelOnHover`
- `scale` — `(value: number) => number`, transforms the represented scale (e.g. exponential); pair with `thumbValueText` for correct screen-reader values
- `startPointValue` — origin the filled bar extends from, instead of always starting at `min` (ignored when `inverted`)
- `inverted`, `orientation` (`horizontal` | `vertical`; vertical has min at bottom, max at top)
- `thumbSize`, `thumbChildren` — custom thumb size/content
- `color`, `size`, `radius`, `disabled`, `name` (for uncontrolled forms via `FormData`)
- `thumbLabel` — `aria-label` for the thumb

#### Syntax

```jsx
<Slider
  value={value}
  onChange={setValue}
  onChangeEnd={setCommittedValue}
  min={0}
  max={100}
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
- Set `thumbLabel` (and `thumbValueText` when using `scale`/formatted display) for accessibility
- `RangeSlider` is the two-thumb counterpart of `Slider` — same props apply where relevant, but `value` is `[number, number]`
