### segmented-control

SegmentedControl is a linear, mutually-exclusive set of options rendered as buttons with a sliding indicator (built on radio inputs under the hood).
[segmented-control docs](https://mantine.dev/core/segmented-control/)

#### Import

```jsx
import { SegmentedControl } from "@mantine/core";
```

#### Key props

- `data`: `string[] | { value, label, disabled? }[]` — required; options to render
- `value` / `defaultValue`, `onChange` — controlled/uncontrolled selected value
- `disabled` — disables the whole control (use `data[i].disabled` to disable a single item)
- `readOnly` — prevents value changes while still displaying state
- `orientation`: `'horizontal' | 'vertical'`
- `fullWidth` — stretch to 100% of parent width
- `withItemsBorders` — show borders between items
- `color` — background color of the sliding indicator
- `autoContrast` — auto-adjusts label text color against the indicator color
- `transitionDuration`, `transitionTimingFunction` — indicator animation control (`transitionDuration={0}` disables animation)
- `size`, `radius`
- `name` — for uncontrolled forms via `FormData`

#### Syntax

```jsx
<SegmentedControl
  value={value}
  onChange={setValue}
  data={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ]}
/>
```

Simple string data (label === value):

```jsx
<SegmentedControl data={["React", "Angular", "Vue"]} />
```

Icon-only items (must add hidden text for accessibility):

```jsx
<SegmentedControl
  data={[
    {
      value: "preview",
      label: (
        <>
          <EyeIcon />
          <VisuallyHidden>Preview</VisuallyHidden>
        </>
      ),
    },
  ]}
/>
```

#### Rules

- `data` accepts either plain strings (value and label are the same) or `{ value, label }` objects when they differ
- Item `label` can be any ReactNode (icons, custom markup), not just text
- If labels have no visible text (icon-only), wrap hidden text in `VisuallyHidden` so the control remains accessible — it's a radio group under the hood
- Use `SegmentedControl<T>` generic (TS) when values aren't plain strings
- `disabled` (component-level) blocks all interaction; `disabled: true` on a `data` item blocks just that option
