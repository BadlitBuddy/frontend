### floating-window
FloatingWindow creates a draggable element with a fixed position on the screen — useful for movable panels, chat widgets, or picture-in-picture style UI. It is the component API for the `useFloatingWindow` hook.
[floating-window docs](https://mantine.dev/core/floating-window/)
#### Import
`import { FloatingWindow } from '@mantine/core';`
#### Key props
- `initialPosition`: `{ top?, left?, bottom?, right? }` — starting position; calculated from element styles if omitted
- `constrainToViewport`: boolean — restricts dragging to viewport bounds
- `constrainOffset`: number — edge offset used with `constrainToViewport`
- `axis`: `'x' | 'y'` — restricts dragging to one axis
- `dragHandleSelector`: string — CSS selector of the element used to initiate drag (default: whole root element)
- `excludeDragHandleSelector`: string — selector (within the drag handle) to exclude from dragging, e.g. buttons
- `enabled`: boolean — enable/disable dragging entirely
- `setPositionRef`: ref object used to programmatically set position via `.current({ top, left })`
- `withinPortal`: boolean, `portalProps`: forwarded to `Portal`
- `onDragStart` / `onDragEnd` / `onPositionChange`: callbacks
- `withBorder`, `radius`, `shadow`, `zIndex`: standard surface styling props
#### Syntax
```tsx
<FloatingWindow
  w={280}
  p="md"
  withBorder
  excludeDragHandleSelector="button"
  initialPosition={{ top: 300, left: 20 }}
  style={{ cursor: 'move' }}
>
  {CONTENT}
</FloatingWindow>
```
#### Rules
- Always exclude interactive children (close buttons, inputs) from dragging via `excludeDragHandleSelector`, or they'll trigger a drag instead of their own click
- Use `dragHandleSelector` to restrict dragging to a header/title bar instead of the entire window body
- Prefer the lower-level `useFloatingWindow` hook (paired with your own `Paper`/`Portal`) when you need full control over markup; use `FloatingWindow` for the batteries-included version
- `data-dragging` is set on the root element while dragging — use it in the Styles API for drag-state styling (e.g. shadow)
- Set `constrainToViewport` when the window must never be dragged off-screen
