### radio

Radio is used to select one option from a set. Use `Radio.Group` to manage a set of radios as a single controlled/uncontrolled value.
[radio docs](https://mantine.dev/core/radio/)

#### Import

```jsx
import { Radio, Group, Stack } from "@mantine/core";
```

#### Components

- `Radio` — single radio input with optional label/description/error
- `Radio.Group` — wraps multiple `Radio` (or `Radio.Card`) and manages `name`/`value`/`onChange` for the group
- `Radio.Indicator` — visual-only radio dot, no keyboard/focus support, used inside custom clickable elements (e.g. `Radio.Card`)
- `Radio.Card` — clickable card container with `role="radio"`, used with `Radio.Indicator` to build card-style pickers

#### Key props

- `Radio`: `checked`, `label`, `description`, `error`, `value`, `name`, `disabled`, `size`, `color`, `variant` (`filled` | `outline`), `labelPosition` (`left` | `right`), `icon` (custom check icon component), `iconColor`
- `Radio.Group`: `value`, `defaultValue`, `onChange`, `name`, `label`, `description`, `error`, `disabled`, `withAsterisk`, `readOnly`
- `Radio.Card`: `checked`, `value`, `withBorder`, `radius`

#### Syntax

```jsx
<Radio.Group
  value={value}
  onChange={setValue}
  name={name}
  label={label}
  description={description}
>
  <Group mt="xs">
    <Radio value="a" label="Option A" />
    <Radio value="b" label="Option B" />
  </Group>
</Radio.Group>
```

Standalone (uncontrolled) radio:

```jsx
<Radio name={name} value={value} label={label} defaultChecked={checked} />
```

Card-style radio (inside `Radio.Group`):

```jsx
<Radio.Card value={value}>
  <Group wrap="nowrap" align="flex-start">
    <Radio.Indicator />
    <div>{content}</div>
  </Group>
</Radio.Card>
```

#### Rules

- Radios sharing a `name` (native, or automatically via `Radio.Group`) form one exclusive-choice group
- Set `name` and `value` on uncontrolled `Radio` so `FormData` picks up the selected value on submit
- Use `defaultChecked` for uncontrolled initial state, `checked`/`onChange` for controlled state
- `Radio.Indicator` is not accessible on its own — only use it inside a focusable/clickable wrapper like `Radio.Card`
- Always set `label` or `aria-label` on `Radio` for accessibility
