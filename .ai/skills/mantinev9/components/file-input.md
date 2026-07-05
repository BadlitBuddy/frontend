### file-input

FileInput lets users select one or multiple files using the native file picker.

[file input docs](https://mantine.dev/core/file-input/)

#### Component

- `FileInput`

#### Props

- `label`
- `description`
- `placeholder`
- `accept`
- `multiple`
- `clearable`
- `disabled`
- `error`
- `leftSection`
- `rightSection`
- `value`
- `defaultValue`
- `onChange`
- `required`
- `withAsterisk`

#### Syntax

```tsx
<FileInput label="{label}" placeholder="{placeholder}" accept="{accept}" />
```

#### Rules

- `accept` limits selectable file types (for example `image/*` or `.pdf`).
- Set `multiple` to allow selecting multiple files.
- `value` is a `File | null` when `multiple` is false.
- `value` is a `File[]` when `multiple` is true.
- Use `clearable` to allow removing the selected file(s).
- Supports all standard Mantine input props such as `label`, `description`, `error`, and `required`.
