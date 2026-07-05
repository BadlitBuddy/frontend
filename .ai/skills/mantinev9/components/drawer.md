### drawer
Drawer displays an accessible overlay panel that slides in from any side of the screen (left, right, top, bottom). Built on the same accessible base as Modal.
[drawer docs](https://mantine.dev/core/drawer/)
#### Import
`import { Drawer, useDrawersStack } from '@mantine/core';`
#### Key props
- `opened`: boolean (required), `onClose`: `() => void` (required)
- `position`: `'left' | 'top' | 'right' | 'bottom'` — default `left`
- `size`: `MantineSize | number | string` — controls width/height depending on position
- `title`: React node — also sets `aria-labelledby` for accessibility
- `withCloseButton`: boolean, `closeButtonProps`: forwarded to the close button
- `offset`: number — gap from the viewport edge
- `overlayProps`: forwarded to the `Overlay` component (e.g. `{ backgroundOpacity, blur }`)
- `trapFocus`, `closeOnEscape`, `closeOnClickOutside`, `returnFocus`: booleans controlling accessible behavior (avoid disabling)
- `scrollAreaComponent`: e.g. `ScrollArea.Autosize`, for scrollable content with a sticky header
- `transitionProps`: forwarded to `Transition`
#### Syntax
```tsx
<Drawer opened={opened} onClose={close} title="{title}" position="{position}">
  {CONTENT}
</Drawer>
```
Compound (full control) form:
```tsx
<Drawer.Root opened={opened} onClose={close}>
  <Drawer.Overlay />
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>{title}</Drawer.Title>
      <Drawer.CloseButton />
    </Drawer.Header>
    <Drawer.Body>{CONTENT}</Drawer.Body>
  </Drawer.Content>
</Drawer.Root>
```
#### Rules
- Set the `title` prop (or `Drawer.Title` in compound form) to keep the drawer accessible — it wires up `aria-labelledby`
- To show multiple drawers at once, use `Drawer.Stack` together with the `useDrawersStack` hook — do not just render multiple independent `Drawer` components, since z-index and focus/escape handling won't be coordinated
- `Drawer.Stack` only works with the plain `Drawer` component, not with `Drawer.Root`/compound components
- Add `data-autofocus` to the element that should receive initial focus, or use `FocusTrap.InitialFocus` to avoid autofocusing the close button
- Use `RemoveScroll.classNames` on fixed-position siblings so they resize correctly while scroll is locked
