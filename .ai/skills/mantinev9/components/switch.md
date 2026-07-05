### switch
Switch is used for capturing boolean input from the user, like a toggle
[switch docs](https://mantine.dev/core/switch/)
#### Import
```tsx
import { Switch } from '@mantine/core';
```
#### Components
- component: `Switch`
- subcomponent (for grouped toggles): `Switch.Group`
#### Syntax
```tsx
<Switch
  {CHECKED}
  {LABEL}
  {DESCRIPTION}
  {ERROR}
  color="{COLOR}"
  size="{SIZE}"
  radius="{RADIUS}"
  labelPosition="{LABEL_POSITION}"
  onLabel="{ON_LABEL}"
  offLabel="{OFF_LABEL}"
  disabled={DISABLED}
/>
```
where grouped syntax is:
```tsx
<Switch.Group {VALUE_PROPS} label="{title}" description="{description}">
  <Switch value="{value}" label="{label}" />
  <Switch value="{value}" label="{label}" />
</Switch.Group>
```
#### Rules
- Use `checked`/`onChange` for controlled state, or `defaultChecked` for uncontrolled state
- Set `name` on an uncontrolled `Switch` to include its value in `FormData` on submit
- `label` accepts any `React.ReactNode`; if omitted, set `aria-label` so the input is accessible to screen readers
- `labelPosition` accepts `"left"` or `"right"`
- `onLabel`/`offLabel` render short inner labels inside the track (e.g. "ON"/"OFF") and work best at `size="md"` or larger
- `thumbIcon` renders an icon inside the thumb; often paired with controlled `checked` state to swap icons
- `withThumbIndicator` shows a colored dot inside the thumb that matches the track color
- `size` accepts `xs | sm | md | lg | xl`; `radius` accepts `xs | sm | md | lg | xl` or a CSS value
- `color` accepts a `theme.colors` key or any valid CSS color, applied to the track when checked
- To use `Switch` as a target for `Tooltip` or similar wrapper components, set `refProp="rootRef"` on the wrapper
- `Switch.Group` wraps multiple `Switch` components sharing one `value` (array) / `onChange`; use `defaultValue` for uncontrolled or `value`/`onChange` for controlled
- On `Switch.Group`, use `name` + `hiddenInputValuesSeparator` (default `,`) for uncontrolled forms, since it renders a single hidden input joining all checked values
- `maxSelectedValues` on `Switch.Group` disables remaining switches once the limit is reached
- `disabled` can be set on individual `Switch` components or on the whole `Switch.Group`
