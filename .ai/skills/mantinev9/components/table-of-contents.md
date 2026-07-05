### table-of-contents
TableOfContents renders a list of headings on the page and tracks the current heading visible in the viewport, based on the use-scroll-spy hook
[table-of-contents docs](https://mantine.dev/core/table-of-contents/)
#### Import
`import { TableOfContents } from '@mantine/core';`
#### Components
- component: `TableOfContents`
#### Key props
- `scrollSpyOptions`: `UseScrollSpyOptions` — passed to the underlying `use-scroll-spy` hook; commonly set `selector` (CSS selector for headings, e.g. `'h1, h2, h3, h4, h5, h6'`), `getDepth`, `getValue`
- `getControlProps`: `(payload: { active: boolean; data }) => props` — returns props spread onto each control; use to attach `onClick`/`component="a"`/`href`/`children`
- `initialData`: array of `{ id, value, depth }` — headings rendered before the component mounts (e.g. for SSR), replaced with real data on mount
- `minDepthToOffset`: number — minimum heading depth that receives left-padding offset, default `1`
- `depthOffset`: string | number — left-padding per depth level, default `20px`
- `variant`: `"filled" | "light" | "none"`
- `color`, `size`, `radius`, `autoContrast` — styling controls (`autoContrast` only affects `filled` variant)
- `reinitializeRef`: `RefObject<() => void>` — call `.current()` to re-scan the DOM for headings after they change
#### Syntax
```tsx
<TableOfContents
  variant="{variant}"
  color="{color}"
  scrollSpyOptions={{ selector: '{headingSelector}' }}
  getControlProps={({ data }) => ({
    onClick: () => data.getNode().scrollIntoView(),
    children: data.value,
  })}
/>
```
#### Rules
- `getControlProps` is required to make controls do anything (scroll into view, render as a link, etc.) — without it, controls render with no click behavior
- `TableOfContents` does not automatically track DOM changes after mount; if headings are added/removed dynamically, pass `reinitializeRef` and call `reinitializeRef.current()` after the change
- Use `initialData` only to avoid an empty flash before mount (e.g. during SSR) — it is discarded once real data is retrieved
- Set `minDepthToOffset={0}` if first and second level headings should also receive the depth-based left padding
