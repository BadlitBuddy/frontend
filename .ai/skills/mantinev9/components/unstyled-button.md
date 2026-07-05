### unstyled-button
UnstyledButton renders a button element with all default browser button styles removed, used as a base for custom clickable components
[unstyled-button docs](https://mantine.dev/core/unstyled-button/)
#### Import
```js
import { UnstyledButton } from '@mantine/core';
```
#### Props
- `component`: polymorphic root element/component (default `button`)
- accepts all standard `button` element props (`onClick`, `disabled`, etc.) plus any Mantine style props (`p`, `m`, `bg`, `c`, ...)
#### Syntax
```html
<UnstyledButton component="{component}" onClick="{onClick}">
  {content}
</UnstyledButton>
```
#### Rules
- Has no visual styling of its own — apply your own `className`/`style`/style-props to make it look like a button, card, nav item, etc.
- This is the same base component Mantine uses internally to build `Button`, `ActionIcon`, `NavLink`, and other clickable components
- Polymorphic: pass `component="a"` for a link, or a router `Link` component, to change the rendered element while keeping unstyled button behavior
- Polymorphic component prop types do not extend the HTML props of the default element — if wrapping `UnstyledButton` in a non-polymorphic component, extend `UnstyledButtonProps` and `ElementProps<'a', keyof UnstyledButtonProps>` (or the relevant element) manually
