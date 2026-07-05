### input

Input is the low-level text input primitive used to build custom input components.

[input docs](https://mantine.dev/core/input/)

#### Components

- `Input`
- `Input.Wrapper`
- `Input.Label`
- `Input.Description`
- `Input.Error`
- `Input.Placeholder`

#### Props

- `placeholder`
- `value`
- `defaultValue`
- `disabled`
- `error`
- `leftSection`
- `rightSection`
- `size`
- `radius`
- `variant`
- `required`

#### Syntax

```tsx
<Input placeholder="{placeholder}" value="{value}" onChange="{onChange}" />
```

#### Wrapper Syntax

```tsx
<Input.Wrapper label="{label}" description="{description}" error="{error}">
  <Input />
</Input.Wrapper>
```

#### Rules

- `Input` is a primitive and does not include a label by itself.
- Use `Input.Wrapper` to add labels, descriptions, and errors.
- Use `leftSection` and `rightSection` to render icons or actions inside the input.
- `variant`, `size`, and `radius` control appearance.
- Suitable for building custom input components.
