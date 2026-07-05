### number-formatter

NumberFormatter formats numbers for display with prefixes, suffixes, separators, percentages, currencies, and more

[number-formatter docs](https://mantine.dev/core/number-formatter/)

#### Import

```tsx
import { NumberFormatter } from "@mantine/core";
```

#### Key props

- `value`: number or numeric string to format
- `prefix`: text before the formatted value
- `suffix`: text after the formatted value
- `decimalScale`: maximum number of decimal places
- `fixedDecimalScale`: always display the specified number of decimal places
- `decimalSeparator`: decimal separator character
- `thousandSeparator`: thousands separator (`true`, string, or character)
- `thousandsGroupStyle`: grouping style (`'thousand'`, `'lakh'`, `'wan'`)
- `allowNegative`: allows negative values
- `valueIsNumericString`: treats `value` as a numeric string instead of parsing it

#### Syntax

```tsx
<NumberFormatter value={12345.67} thousandSeparator prefix="$" />
```

#### Rules

- `NumberFormatter` is display-only and does not accept user input
- Use `fixedDecimalScale` together with `decimalScale` for values like prices that require trailing zeros
- Use `prefix`/`suffix` for currencies, percentages, units, etc.
- Set `valueIsNumericString` when passing numeric strings to avoid unnecessary parsing
- Use `thousandsGroupStyle="lakh"` or `"wan"` for locale-specific digit grouping
