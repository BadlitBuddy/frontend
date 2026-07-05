### modal

Modal is an accessible overlay dialog that traps focus and locks scroll
[modal docs](https://mantine.dev/core/modal/)

#### Components

- root: `Modal`
- compound parts (full control): `Modal.Root`, `Modal.Overlay`, `Modal.Content`, `Modal.Header`, `Modal.Title`, `Modal.CloseButton`, `Modal.Body`
- multi-modal: `Modal.Stack` + `useModalsStack` hook
- key props: `opened`, `onClose`, `title`, `centered`, `size` (`xs`–`xl`, `auto`, or any width, capped at `100vw`), `fullScreen`, `withCloseButton`, `overlayProps`, `yOffset`/`xOffset`, `transitionProps`, `trapFocus`, `closeOnEscape`, `closeOnClickOutside`, `returnFocus`, `scrollAreaComponent`, `closeButtonProps`, `onExitTransitionEnd`/`onEnterTransitionEnd`, `removeScrollProps`

#### Syntax

```jsx
const [opened, { open, close }] = useDisclosure(false);

<Modal opened={opened} onClose={close} title={TITLE} centered>
  {CONTENT}
</Modal>;
```

Full control via compound components:

```jsx
<Modal.Root opened={opened} onClose={close}>
  <Modal.Overlay />
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>{TITLE}</Modal.Title>
      <Modal.CloseButton />
    </Modal.Header>
    <Modal.Body>{CONTENT}</Modal.Body>
  </Modal.Content>
</Modal.Root>
```

#### Rules

- `opened` and `onClose` are required; pair with the `useDisclosure` hook from `@mantine/hooks` for local state
- Set `title` to make the modal accessible — it wires up `aria-labelledby` automatically; omit it only if `withCloseButton={false}` and content is otherwise labeled
- `size` is ignored when `fullScreen` is set; prefer `transitionProps={{ transition: 'fade' }}` with `fullScreen`
- Modal uses `Overlay` internally — customize it via `overlayProps` rather than rendering a separate overlay
- Add `data-autofocus` to the element that should receive initial focus (via `FocusTrap`); without it, the first focusable element (often the close button) is focused, or use `FocusTrap.InitialFocus` to focus nothing visible
- Use `Modal.Stack` + `useModalsStack(['id1', 'id2', ...])` to render multiple modals at once — it manages z-index ordering, disables focus trap/Escape for all but the active modal, and keeps only one overlay rendered; it only works with `Modal`, not `Modal.Root`
- Avoid disabling `trapFocus`, `closeOnEscape`, `closeOnClickOutside`, or `returnFocus` unless necessary — doing so reduces accessibility
