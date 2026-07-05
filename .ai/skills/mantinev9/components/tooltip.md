### tooltip

Tooltip renders a small label near a target element on hover, focus, or touch
[tooltip docs](https://mantine.dev/core/tooltip/)

#### Components

- root: `Tooltip`
- floating variant: `Tooltip.Floating` (follows the mouse cursor, same API as `Tooltip`)
- sync group: `Tooltip.Group` (shares open/close delay across multiple tooltips)
- key props: `label`, `target` (alternative to children: CSS selector string, HTML element, or ref), `opened` (controlled), `position`, `offset`, `withArrow`, `arrowPosition` (`center` | `side` | `merge`), `arrowOffset`, `arrowSize`, `arrowRadius`, `color`, `multiline` (pair with `w`), `inline`, `events` (`hover`/`focus`/`touch`), `openDelay`, `closeDelay`, `transitionProps`

#### Syntax

```jsx
<Tooltip label={LABEL} position="top" withArrow>
  <Button>{TARGET}</Button>
</Tooltip>
```

Using the `target` prop instead of children:

```jsx
<Tooltip target={SELECTOR_OR_REF} label={LABEL} />
<Button id={SELECTOR_ID}>{TARGET}</Button>
```

#### Rules

- `Tooltip` requires exactly one element/component child (no strings, numbers, fragments, or multiple nodes) unless using the `target` prop instead — throws otherwise
- Custom components passed as children must forward `ref` to their root element
- By default only `hover` events trigger the tooltip; set `events={{ hover: true, focus: true, touch: false }}` to also support keyboard/screen-reader users (recommended for accessibility)
- Set `multiline` together with a `w` style prop to enable wrapped, fixed-width tooltips
- Set `inline` when the target is an inline text element that may span multiple lines
- Use `Tooltip.Group` to share consistent `openDelay`/`closeDelay` across a set of adjacent tooltips (e.g. a toolbar)
- Use `Tooltip.Floating` instead of `Tooltip` when the tooltip should track the cursor position rather than stay anchored to the target; note it is ignored by screen readers
- `arrowPosition="merge"` only works with `*-start`/`*-end` positions and ignores `arrowOffset`/`arrowRadius`
