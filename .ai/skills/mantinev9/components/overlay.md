### overlay

Overlay is a simple element that covers its parent container (or the viewport) with a colored/gradient/blurred layer
[overlay docs](https://mantine.dev/core/overlay/)

#### Components

- root: `Overlay` (polymorphic, default element `div`)
- key props: `color`, `backgroundOpacity`, `gradient`, `blur`, `opacity`, `fixed`, `zIndex`, `component`

#### Syntax

```jsx
<div style={{ position: "relative" }}>
  {CONTENT}
  <Overlay color={COLOR} backgroundOpacity={OPACITY} blur={BLUR_PX} />
</div>
```

#### Rules

- `Overlay` takes 100% width/height of its positioned parent; set `fixed` to cover the viewport instead — the parent needs `position: relative` (or similar) for parent-relative sizing to work
- `backgroundOpacity` changes the alpha channel of the background-color (e.g. `rgba(0,0,0,0.85)`), it does NOT set CSS `opacity`
- Setting `gradient` switches to `background-image` and makes `color`/`backgroundOpacity` ignored
- `blur` applies `backdrop-filter: blur({value})`, which is not supported in all browsers
- As a polymorphic component, `component` can swap the root element/component (e.g. `component="a"` or a router `Link`); note that `OverlayProps` does not automatically extend that element's native props in TypeScript
- `Modal` and `Popover` (via `withOverlay`) already render an `Overlay` internally — configure it with `overlayProps` on those components rather than nesting a separate `Overlay`
