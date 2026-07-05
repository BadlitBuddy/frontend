### rolling-number

RollingNumber animates numeric value changes using vertically rolling digits

[rolling-number docs](https://mantine.dev/core/rolling-number/)

#### Import

```tsx
import { RollingNumber } from "@mantine/core";
```

#### Key props

- `value`: numeric value to display
- `transitionDuration`: animation duration in milliseconds
- `decimalSeparator`: decimal separator
- `decimalScale`: number of decimal places
- `thousandSeparator`: thousands separator
- `suffix`: text displayed after the number
- `prefix`: text displayed before the number
- `animateToPrevious`: animation direction when values decrease

#### Syntax

```tsx
<RollingNumber value={value} thousandSeparator transitionDuration={500} />
```

#### Rules

- Update the `value` prop to trigger the rolling animation
- Use for dashboards, counters, statistics, balances, and live metrics
- Combine with `prefix` and `suffix` for currencies and units
- Use `thousandSeparator` to improve readability of large values
- Prefer `NumberFormatter` when animation is unnecessary and only formatting is required
