### Breadcrumbs

Breadcrumbs separates a list of React nodes (usually `Anchor` links) by inserting a separator between each one.
[Breadcrumbs docs](https://mantine.dev/core/breadcrumbs/)

#### Import

`import { Breadcrumbs } from '@mantine/core';`

#### Props

- `children` (required): React nodes to separate — typically an array of `Anchor` components
- `separator`: React node placed between children, defaults to `/`
- `separatorMargin`: `MantineSpacing` — spacing on each side of the separator, defaults to `xs`

#### Syntax

```tsx
<Breadcrumbs separator="{separator}" separatorMargin="{spacing}">
  {items}
</Breadcrumbs>
```

where `{items}` is an array of nodes, typically:

```tsx
const items = data.map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
```

#### Rules

- `{separator}` and `{separatorMargin}` are optional
- `Breadcrumbs` only inserts separators between children; it does not add active/current-page styling itself — style the last item manually if needed (e.g. dimmed color, no link)
- Each child needs a unique `key` since children are typically produced via `.map()`
