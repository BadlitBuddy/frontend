### rating

Rating displays and/or collects a star (or custom-icon) rating, optionally with fractional precision.
[rating docs](https://mantine.dev/core/rating/)

#### Import

```jsx
import { Rating } from "@mantine/core";
```

#### Key props

- `value` / `defaultValue`: `number` — controlled/uncontrolled rating
- `onChange`, `onHover` (receives `-1` when hover ends)
- `count` (default `5`) — number of symbols
- `fractions` (default `1`) — divides each symbol into N clickable fractions, enabling half/third/quarter ratings
- `readOnly` — display-only, no interaction
- `allowClear` — clicking the currently-selected value resets it to `0`
- `color` (default `'yellow'`), `size`
- `emptySymbol`, `fullSymbol` — `ReactNode` or `(value: number) => ReactNode`, for custom icons per position
- `highlightSelectedOnly` — only highlight the exact clicked symbol instead of all symbols up to it
- `getSymbolLabel` — `(index: number) => string`, customizes each symbol's `aria-label`
- `name` — for uncontrolled forms via `FormData`

#### Syntax

```jsx
<Rating value={value} onChange={setValue} count={5} fractions={2} />
```

Read-only display:

```jsx
<Rating value={3.5} fractions={2} readOnly />
```

#### Rules

- Use `defaultValue`/`name` for uncontrolled forms; `value`/`onChange` for controlled
- `fractions` and `step` behavior: fractional clicks produce values like `1.5`, `2.33`, etc., not whole numbers
- `readOnly` is for display; combine with a precise `value` (often with `fractions`) to show partial stars
- `emptySymbol`/`fullSymbol` as functions let each rating position have a different icon (e.g. mood faces per score)
