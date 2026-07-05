### affix
Affix renders its children inside a Portal at a fixed position on the screen. Used for things like "scroll to top" buttons that must stay in place regardless of scroll.
[affix docs](https://mantine.dev/core/affix/)
#### Import
`import { Affix } from '@mantine/core';`
#### Key props
- `position`: `{ top?, left?, bottom?, right? }` — where on the screen the affix is pinned
- `withinPortal`: boolean — renders inside `Portal` when true (default)
- `portalProps`: props forwarded to `Portal` (ignored if `withinPortal={false}`)
- `zIndex`: sets the root element's `z-index`
#### Syntax
```tsx
<Affix position={{ bottom: 20, right: 20 }}>
  {CONTENT}
</Affix>
```
#### Rules
- `Affix` itself has no visible styles or open/close behavior — combine it with `Transition` and your own state (e.g. `useWindowScroll` or `useDisclosure`) to show/hide content conditionally
- Only one of `top`/`bottom` and one of `left`/`right` should be set in `position`
- Because it renders in a `Portal`, it escapes any parent `overflow: hidden` or `position: relative` containers
- Prefer `Affix` over manual `position: fixed` styles when you need Portal rendering and simple corner/edge placement
