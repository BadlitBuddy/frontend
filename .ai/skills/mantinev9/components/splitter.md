### splitter
Splitter provides a resizable split pane layout, built on top of the use-splitter hook
[splitter docs](https://mantine.dev/core/splitter/)
#### Import
- `import { Splitter } from '@mantine/core';`
#### Components
- component: `Splitter`
- part: `Splitter.Pane`
#### Props
- `Splitter`: `orientation` (`"horizontal"` default | `"vertical"`), `sizes` + `onSizeChange` (controlled sizes array), `redistribute` (controls how space is borrowed from non-adjacent panes when the immediate neighbor hits its min/max, e.g. `"nearest"`), `lineSize` (separator thickness), `withHandle` (boolean, default `true`, shows/hides the grip handle), `splitterRef` (ref to imperative API: `collapse(index)`, `toggleCollapse(index)`, etc.)
- `Splitter.Pane`: `defaultSize` (number, `%` string = flexible size shared with other flexible panes; `px`/`rem` string = fixed size that persists on container resize), `min`, `max` (same unit rules as `defaultSize`), `collapsible` (boolean, allows collapsing past min size by dragging), `bg` and other style props
#### Syntax
```tsx
<Splitter orientation="{orientation}" h={HEIGHT} sizes={sizes} onSizeChange={setSizes}>
  <Splitter.Pane defaultSize={SIZE} min={MIN} max={MAX} collapsible>
    {content}
  </Splitter.Pane>
  {...more Splitter.Pane}
</Splitter>
```
#### Rules
- `Splitter.Pane` must be a direct child of `Splitter` — wrapping `Splitter.Pane` in another component breaks pane recognition; put pane content in a separate child component instead
- `defaultSize`/`min`/`max` as a plain number or `%` string are flexible and share leftover space with other flexible panes; as `px`/`rem` strings they are fixed and only change size when their own handle is dragged
- Sizes are reported back (in `sizes`/`onSizeChange`) in the same unit they were declared in
- Supports any number of panes; handles are automatically rendered between each pair of panes
- `Splitter` instances can be nested (e.g. an outer horizontal splitter containing an inner vertical splitter) to build complex layouts
- Use `splitterRef` for imperative control (e.g. programmatic collapse/expand) instead of trying to control collapse state via props alone
