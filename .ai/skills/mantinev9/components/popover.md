### popover

Popover displays floating content positioned relative to a target element, toggled by click or controlled state
[popover docs](https://mantine.dev/core/popover/)

#### Components

- root: `Popover`
- parts: `Popover.Target`, `Popover.Dropdown`
- context menu: `Popover.ContextMenu` (replaces `Popover.Target`, opens on right-click or long-press)
- key props: `opened`/`onChange` (controlled), `position`, `offset`, `width` (number, `"target"`, or CSS value), `withArrow`, `arrowPosition`, `arrowOffset`, `arrowSize`, `middlewares` (`shift`, `flip`, `inline`, `size`), `trapFocus`, `withOverlay`, `overlayProps`, `hideDetached`, `disabled`, `closeOnClickOutside`, `clickOutsideEvents`, `onDismiss`, `zIndex`

#### Syntax

```jsx
<Popover width={200} position="bottom" withArrow shadow="md">
  <Popover.Target>
    <Button>{TARGET_LABEL}</Button>
  </Popover.Target>
  <Popover.Dropdown>{CONTENT}</Popover.Dropdown>
</Popover>
```

#### Rules

- `Popover.Target` requires exactly one element/component child (no strings, numbers, fragments, or multiple nodes) — throws otherwise; custom components must forward `ref`
- Uncontrolled `Popover` is only keyboard-accessible (`Space`/`Enter`) when the target is a `button` or a component that renders one
- Set `trapFocus` if `Popover.Dropdown` contains interactive elements (inputs, buttons)
- Set `width="target"` to match dropdown width to the target element's width
- Enable the `inline` middleware when the target is an inline text element that may span multiple lines
- `middlewares.shift` and `middlewares.flip` are enabled by default to keep the dropdown in view; `inline` and `size` are disabled by default
- Set `withOverlay` to dim the background behind the dropdown; configure it via `overlayProps` (it renders an `Overlay` internally)
- By default `closeOnClickOutside` is `true`, listening to `mousedown`/`touchstart`; override detection events with `clickOutsideEvents`
- If `opened` is controlled but you still want outside-click/Escape dismissal, use `onDismiss` rather than `onChange`
- For nested popovers, disable the inner component's portal (e.g. `comboboxProps={{ withinPortal: false }}` on `Select`) — otherwise an outside click closes all popovers at once
- Add `data-autofocus` to an element inside `Popover.Dropdown` to control initial focus (via `FocusTrap`)
- Use `Popover.ContextMenu` instead of `Popover.Target` to open at the cursor position on right-click (long-press on touch devices)
