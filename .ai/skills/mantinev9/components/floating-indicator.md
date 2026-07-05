### floating-indicator
FloatingIndicator renders an animated element that moves and resizes to overlay the currently active item in a group — used to build custom segmented controls, tabs, and similar "sliding highlight" UI.
[floating-indicator docs](https://mantine.dev/core/floating-indicator/)
#### Import
`import { FloatingIndicator } from '@mantine/core';`
#### Key props
- `target`: `HTMLElement | null | undefined` (required) — the element currently being highlighted
- `parent`: `HTMLElement | null | undefined` (required) — the relatively-positioned container the indicator's position is calculated against
- `transitionDuration`: number | string — animation duration in ms
- `displayAfterTransitionEnd`: boolean — hide the indicator until the parent's own CSS transition finishes (use when the parent animates, e.g. `transform: scale()`)
- `onTransitionStart` / `onTransitionEnd`: callbacks
#### Syntax
```tsx
<div ref={setRootRef} style={{ position: 'relative' }}>
  {items.map((item) => (
    <button ref={setControlRef(item)} onClick={() => setActive(item)} key={item}>{item}</button>
  ))}
  <FloatingIndicator target={controlsRefs[active]} parent={rootRef} className={classes.indicator} />
</div>
```
#### Rules
- `parent` MUST have `position: relative` — positioning is calculated relative to it
- The component renders nothing (returns `null`) if either `target` or `parent` is missing
- `FloatingIndicator` has no visible styles by default — style it with `className` or the Styles API
- The indicator's `transform`, `width`, and `height` are set directly via JS for smooth animation and cannot be overridden through the Styles API
- Track `target`/`parent` elements with React state (via ref callbacks), not `useRef`, so re-renders pick up new DOM nodes
- Works for both single-row and multi-row/grid layouts of controls
