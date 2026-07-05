### pin-input
PinInput is used for capturing a pin code or one-time password as a sequence of individual character boxes
[pin-input docs](https://mantine.dev/core/pin-input/)
#### Import
```tsx
import { PinInput } from '@mantine/core';
```
#### Key props
- `length`: number of input boxes (defaults to 4)
- `value` / `onChange` / `defaultValue`: controlled/uncontrolled value handling, value is a single concatenated string
- `type`: `'alphanumeric'` (default), `'number'`, or a custom `RegExp` — characters not matching are disregarded
- `mask`: renders entered characters as dots, like a password
- `placeholder`: character shown in empty boxes
- `oneTimeCode`: sets `autocomplete="one-time-code"` so mobile keyboards can suggest an SMS code
- `inputType` / `inputMode`: forwarded to each underlying `input` element (e.g. `inputType="tel"`, `inputMode="numeric"` for numeric-only mobile keyboards)
- `disabled`, `error`, `success`: standard state props
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
#### Syntax
```tsx
<PinInput length={{length}} type="{type}" />
```
#### Rules
- Use `type={/^[0-3]*$/}` (or similar) to restrict input to a custom character set beyond the built-in `'alphanumeric'`/`'number'` options
- Combine a numeric `RegExp` type with `inputType="tel"` and `inputMode="numeric"` to trigger numeric mobile keyboards
- Set `oneTimeCode` to allow the OS/keyboard to autofill a received SMS code
- For uncontrolled forms, set `name` and read the value via `FormData` on submit
- The individual boxes do not have associated labels — always set `aria-label` on the component for screen reader accessibility
