### accordion
Accordion divides content into collapsible sections. By default only one item can be open at a time; set `multiple` to allow several open at once
[accordion docs](https://mantine.dev/core/accordion/)
#### Import
`import { Accordion } from '@mantine/core';`
#### Component parts
- root: `Accordion`
- subcomponent: `Accordion.Item`
- subcomponent: `Accordion.Control`
- subcomponent: `Accordion.Panel`
#### Syntax
```tsx
<Accordion defaultValue="{value}" variant="{variant}" chevronPosition="{position}" order={3}>
  <Accordion.Item value="{value}">
    <Accordion.Control icon={icon}>{title}</Accordion.Control>
    <Accordion.Panel>{content}</Accordion.Panel>
  </Accordion.Item>
</Accordion>
```
#### Key props
- `Accordion`: `variant` (`default` | `contained` | `filled` | `separated` | `unstyled`), `multiple`, `value`/`onChange` (controlled), `defaultValue` (uncontrolled), `chevron`, `chevronPosition` (`left` | `right`), `chevronSize`, `disableChevronRotation`, `radius`, `transitionDuration`, `loop`, `order` (2-6), `unstyled`
- `Accordion.Item`: `value` (required, unique id used for open state)
- `Accordion.Control`: `icon` (left section content), `disabled`, `children` (label)
#### Rules
- `Accordion.Item` `value` is the equivalent of the radio `name`/`checked` mechanism in CSS-only accordions — it identifies which item is open
- For `multiple={false}` (default), `value`/`defaultValue` is a single string or `null`. For `multiple={true}`, it must be an array of strings
- `order` sets the heading level (h2-h6) wrapping `Accordion.Control` for WAI-ARIA compliance; it has no visual effect but should be set to fit the page outline
- Do not put interactive elements (buttons, links) inside `Accordion.Control` — its root is already a `button`, and nested interactive elements break DOM validity. Render extra controls (e.g. a menu `ActionIcon`) next to `Accordion.Control`, not inside it
- When using custom/nested content as the control label, set `aria-label` on `Accordion.Control` for accessibility
- Panels stay mounted when collapsed by default; set `keepMounted={false}` to unmount them
