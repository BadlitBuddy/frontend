### dialog
Dialog displays a fixed, non-blocking overlay at any side of the screen. It is a simplified, less-accessible version of Modal, best for non-critical prompts like a newsletter signup.
[dialog docs](https://mantine.dev/core/dialog/)
#### Import
`import { Dialog } from '@mantine/core';`
#### Key props
- `opened`: boolean (required) — controls visibility
- `onClose`: `() => void` — called when the close button is clicked
- `position`: `{ top?, left?, bottom?, right? }` — fixed position on screen, default `{ bottom: 30, right: 30 }`
- `size`: `MantineSize | number` — controls dialog width, default `md`
- `withCloseButton`: boolean — show/hide the close button
- `transitionProps`: passed to the underlying `Transition` component, default `{ transition: 'pop-top-right', duration: 200 }`
- Also accepts all `Paper` props (`shadow`, `radius`, `withBorder`, `p`, etc.)
#### Syntax
```tsx
<Dialog opened={opened} withCloseButton onClose={close} size="lg" position={{ bottom: 20, left: 20 }}>
  {CONTENT}
</Dialog>
```
#### Rules
- Dialog is rendered in a `Portal` and always has a fixed position — use `position` to place it
- Unlike Modal, Dialog does NOT trap focus, does NOT close on outside click, and has NO overlay backdrop
- Dialog is not accessible and is unlikely to be announced by screen readers — never put important or required information inside it
- Prefer `Modal` or `Drawer` instead of `Dialog` when accessibility matters
- Manage `opened` state yourself, typically with `useDisclosure`
