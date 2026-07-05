### avatar

Avatar displays a user profile image, initials, or a fallback icon
[avatar docs](https://mantine.dev/core/avatar/)

#### Import

`import { Avatar } from '@mantine/core';`

#### Component parts

- root: `Avatar`
- subcomponent: `Avatar.Group`

#### Syntax

```tsx
<Avatar
  src="{url}"
  alt="{description}"
  name="{fullName}"
  color="{color}"
  radius="{radius}"
  size="{size}"
  variant="{variant}"
/>
```

```tsx
<Avatar.Group>
  <Avatar src="{url}" />
  <Avatar src="{url}" />
  <Avatar>+5</Avatar>
</Avatar.Group>
```

#### Key props

- `Avatar`: `src` (image url, or `null` to force placeholder), `alt`, `name` (used for initials/color generation when `src` is unset), `color` (`theme.colors` key or `"initials"`), `allowedInitialsColors`, `radius`, `size`, `variant`, `gradient`, `autoContrast`, `imageProps`, `children` (custom placeholder content), `component` (polymorphic root, e.g. `"a"` or `"button"`)
- `Avatar.Group`: wraps children with negative spacing to create a stack; no dedicated width/spacing prop other than Styles API `--ag-spacing`

#### Rules

- If `src` fails to load or is `null`, Avatar renders `children` as a placeholder (defaults to an icon if no children given)
- Set `name="Full Name"` to auto-generate initials; combine with `color="initials"` to auto-generate a matching color from the name
- Always set `alt` when using `src` — it is also used as the `title` on the placeholder if the image fails
- Direct children of `Avatar.Group` must be `Avatar` components (or components like `Tooltip` that don't render their own DOM element) — do not wrap child avatars in a `div` or fragment, or the group spacing breaks
- Avatar is polymorphic: use `component="a"` with `href` to render it as a link
