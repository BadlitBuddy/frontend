### fieldset

Fieldset groups related form controls and can display a legend and description.

[fieldset docs](https://mantine.dev/core/fieldset/)

#### Component

- `Fieldset`

#### Props

- `legend`
- `children`
- `variant`
- `radius`
- `disabled`
- `withBorder`
- `unstyled`
- All standard `Box` props

#### Syntax

```tsx
<Fieldset legend="{legend}">{CONTENT}</Fieldset>
```

#### Rules

- Use `legend` to provide a title for the group.
- Place related form controls inside the `Fieldset`.
- Use `disabled` to disable all nested form controls.
- `variant` controls the visual appearance.
- `radius` controls border radius.
- `withBorder={false}` removes the border.
- Accepts all `Box` style system props.
