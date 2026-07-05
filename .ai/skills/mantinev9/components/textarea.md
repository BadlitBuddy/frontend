### textarea
Textarea is used for capturing multi-line string input from the user, with optional autosizing
[textarea docs](https://mantine.dev/core/textarea/)
#### Import
```tsx
import { Textarea } from '@mantine/core';
```
#### Components
- component: `Textarea`
#### Syntax
```tsx
<Textarea
  label="{label}"
  description="{description}"
  placeholder="{placeholder}"
  error="{ERROR}"
  variant="{VARIANT}"
  size="{SIZE}"
  radius="{RADIUS}"
  withAsterisk={WITH_ASTERISK}
  disabled={DISABLED}
  autosize={AUTOSIZE}
  minRows={MIN_ROWS}
  maxRows={MAX_ROWS}
  resize="{RESIZE}"
/>
```
#### Rules
- Supports all native `textarea` element props plus `Input`/`Input.Wrapper` features (label, description, error, sections, etc.)
- Use `value`/`onChange` for controlled state, or `defaultValue` for uncontrolled state
- Set `name` on an uncontrolled `Textarea` to include its value in `FormData` on submit
- Set `autosize` to grow the textarea height with its content; use `minRows` to set the starting height and `maxRows` to cap growth (omit `maxRows` for unlimited growth)
- `resize` controls the CSS `resize` property and is `"none"` by default; set to `"vertical"` or `"both"` to let the user resize manually
- `error` can be a boolean (shows red border only) or a `ReactNode` (shows red border and message below); `success` works the same way but green, via the `success` prop
- `leftSection`/`rightSection` render icons or controls inside the input; pair with `leftSectionPointerEvents="none"` / `rightSectionPointerEvents="none"` for non-interactive icons
- `bottomSection` renders content inside the input border at the bottom, useful for character counters
- `loading` shows a loading indicator; `loadingPosition` controls whether it's `"left"` or `"right"` (default right)
- `variant` accepts `"default" | "filled" | "unstyled"`; `size` and `radius` accept `xs | sm | md | lg | xl`
- `withAsterisk` shows a required asterisk next to the label without adding the HTML `required` attribute; use `required` to add the actual attribute
- If used without a `label` prop, set `aria-label` for accessibility
