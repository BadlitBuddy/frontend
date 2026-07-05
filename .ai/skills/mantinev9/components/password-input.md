### password-input
PasswordInput is used for capturing password data, with a built-in visibility toggle button
[password-input docs](https://mantine.dev/core/password-input/)
#### Import
```tsx
import { PasswordInput } from '@mantine/core';
```
#### Key props
- `value` / `onChange` / `defaultValue`: controlled/uncontrolled value handling
- `visible` / `onVisibilityChange`: controls the show/hide state of the password text externally (e.g. to sync two inputs)
- `visibilityToggleIcon`: component accepting a `reveal: boolean` prop to customize the toggle icon
- `visibilityToggleButtonProps`: props (e.g. `aria-label`) forwarded to the visibility toggle button
- `leftSection` / `rightSection`: React node with matching `*Width`/`*PointerEvents` props — note setting `rightSection` replaces the visibility toggle button
- `disabled`: hides the visibility toggle button entirely when set
- `loading` / `loadingPosition`: loading indicator, `'left'` or `'right'`
- `error`, `label`, `description`: standard Input/Input.Wrapper props
#### Syntax
```tsx
<PasswordInput
  label="{label}"
  placeholder="{placeholder}"
/>
```
#### Rules
- Setting the `rightSection` prop replaces the default visibility toggle button — it will not be rendered
- Setting `disabled` also hides the visibility toggle button
- If a plain password field without the visibility toggle is needed, use `TextInput` with `type="password"` instead of `PasswordInput`
- For uncontrolled forms, set `name` and read the value via `FormData` on submit
- Without a `label` prop, set `aria-label` on the input for accessibility; set `aria-label` on the toggle button separately via `visibilityToggleButtonProps`
