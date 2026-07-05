### number-input
NumberInput is used for capturing numeric values, built on `react-number-format` and supporting formatting, clamping, increment/decrement controls, and BigInt values
[number-input docs](https://mantine.dev/core/number-input/)
#### Import
```tsx
import { NumberInput } from '@mantine/core';
```
#### Key props
- `value` / `onChange` / `defaultValue`: value is `number | string` (string for edge cases: empty `''`, standalone `'-'`, numbers beyond `Number.MAX_SAFE_INTEGER`, or trailing decimal states like `'0.'`)
- `onValueChange`: receives full `react-number-format` payload (`floatValue`, `formattedValue`, raw `value`, change source metadata) — use when you need more than the simplified `onChange` value
- `min` / `max`: value boundaries; also accept `bigint` in BigInt mode
- `clampBehavior`: `'blur'` (default, clamps on blur), `'strict'` (cannot type outside range), or `'none'` (no clamping)
- `onMinReached` / `onMaxReached`: callbacks fired when incrementing/decrementing hits a boundary
- `selectAllOnFocus`: selects the entire value when the field is focused
- `prefix` / `suffix`: strings prepended/appended to the displayed value (e.g. `"$"`, `"%"`)
- `allowNegative` (default `true`) / `allowDecimal` (default `true`): toggle sign/decimal support
- `decimalScale`: max digits after the decimal separator; `fixedDecimalScale`: always pad to that many digits
- `decimalSeparator` / `thousandSeparator` / `thousandsGroupStyle` (`'thousand' | 'lakh' | 'wan' | 'none'`)
- `trimLeadingZeroesOnBlur` (default `true`): strips leading zeros on blur
- `hideControls`: hides the default increment/decrement buttons in the right section
- `stepHoldDelay` / `stepHoldInterval`: control press-and-hold behavior on increment/decrement buttons (`stepHoldInterval` can be a number or a function of hold time for acceleration)
- `handlersRef`: ref exposing `increment()`/`decrement()` for custom external controls
- `step`: increment/decrement step size (supports `bigint`)
- `leftSection` / `rightSection`: React node with matching `*Width`/`*PointerEvents` props (setting `rightSection` replaces the default controls)
- `loading` / `loadingPosition`: loading indicator, `'left'` or `'right'`
#### Syntax
```tsx
<NumberInput
  label="{label}"
  min={min}
  max={max}
/>
```
#### Rules
- Prefer `onChange` for simple form handling; use `onValueChange` only when the formatted string or change metadata is needed
- BigInt mode is inferred automatically from `value`/`defaultValue` being a `bigint`; in this mode decimal props do not enable decimal parsing (integer-only), and `string` is still used as a fallback for intermediate states
- `clampBehavior="strict"` can conflict with a narrow `min`/`max` range since it blocks any out-of-range intermediate typing — test carefully with tight bounds
- For uncontrolled forms, set `name` and `defaultValue`, then read the value from `FormData` on submit
- Without a `label` prop, set `aria-label` for accessibility
