### Anchor

Anchor renders a link with Mantine theme styles. It is polymorphic, so it can render as an `a` tag, a `button`, or any custom component (e.g. a router `Link`).
[Anchor docs](https://mantine.dev/core/anchor/)

#### Import

`import { Anchor } from '@mantine/core';`

#### Props

- `component`: element or component to render as (default `a`), enables polymorphic usage
- `href`, `target`: standard link attributes (used when rendered as `a`)
- `underline`: `"always"` | `"hover"` | `"never"` | `"not-hover"` — controls `text-decoration`
- inherits all `Text` component props (`size`, `fw`, `fz`, `variant`, `gradient`, `c`, `truncate`, `lineClamp`, `inline`, `inherit`, `textWrap`)

#### Syntax

```tsx
<Anchor href="{url}" target="_blank" underline="{underline}">
  {content}
</Anchor>
```

#### Rules

- `{underline}` is optional; omit to use the theme default
- To change the root element, set `component="button"` or `component={RouterLink}` (e.g. Next.js `Link`, React Router `Link`)
- Since `Anchor` supports all `Text` props, use `variant="gradient"` with a `gradient` prop for gradient text links
- Polymorphic typing caveat: `AnchorProps` does not extend the HTML props of the default `a` element, so wrapper components that need HTML attrs should extend `ElementProps<'a', keyof AnchorProps>`
