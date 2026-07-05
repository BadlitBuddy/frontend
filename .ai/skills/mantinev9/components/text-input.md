### text-input
TextInput is used for capturing a single line of string input from the user
[text-input docs](https://mantine.dev/core/text-input/)
#### Import
```tsx
import { TextInput } from '@mantine/core';
```
#### Components
- component: `TextInput`
#### Syntax
```tsx
<TextInput
  label="{label}"
  description="{description}"
  placeholder="{placeholder}"
  error="{ERROR}"
  variant="{VARIANT}"
  size="{SIZE}"
  radius="{RADIUS}"
  withAsterisk={WITH_ASTERISK}
  disabled={DISABLED}
  leftSection={LEFT_SECTION}
  rightSection={RIGHT_SECTION}
/>
```
#### Rules
- Supports all native `input` element props plus `Input`/`Input.Wrapper` features (label, description, error, sections, etc.)
- Use `value`/`onChange` for controlled state, or `defaultValue` for uncontrolled state
- Set `name` on an uncontrolled `TextInput` to include its value in `FormData` on submit
- `leftSection`/`rightSection` render icons, buttons, or other elements inside the input border; pair with `leftSectionPointerEvents="none"` / `rightSectionPointerEvents="none"` when the section is not interactive, so clicks pass through to the input
- `leftSectionWidth`/`rightSectionWidth` control the section width and corresponding input padding; defaults to the input height
- `error` can be a boolean (shows red border only) or a `ReactNode` (shows red border and message below)
- `loading` shows a loading indicator; `loadingPosition` controls whether it's `"left"` or `"right"` (default right)
- `variant` accepts `"default" | "filled" | "unstyled"`; `size` and `radius` accept `xs | sm | md | lg | xl`
- `withAsterisk` shows a required asterisk next to the label without adding the HTML `required` attribute; use `required` to add the actual attribute
- If used without a `label` prop, set `aria-label` for accessibility
