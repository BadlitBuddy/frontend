### json-input

JsonInput provides a textarea specialized for editing and validating JSON.

[json input docs](https://mantine.dev/core/json-input/)

#### Component

- `JsonInput`

#### Props

- `label`
- `description`
- `placeholder`
- `value`
- `defaultValue`
- `onChange`
- `validationError`
- `formatOnBlur`
- `autosize`
- `minRows`
- `maxRows`
- `error`
- `disabled`
- `required`

#### Syntax

```tsx
<JsonInput label="{label}" placeholder="{placeholder}" />
```

#### Rules

- Validates JSON entered by the user.
- `validationError` customizes the error message shown for invalid JSON.
- `formatOnBlur` automatically formats valid JSON when focus is lost.
- `autosize` grows the textarea based on its content.
- Use `minRows` and `maxRows` to control autosizing limits.
- Supports all standard Mantine input props such as `label`, `description`, `error`, and `required`.
