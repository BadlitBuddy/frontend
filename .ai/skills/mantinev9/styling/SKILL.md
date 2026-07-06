---
name: mantine-styling
description: Mantine Component Styling skill. This skill is triggered when generating any JSX, TSX, React, or UI code for the (main) authenticated application surface.
metadata:
  version: 9.4.1
  source: https://mantine.dev/
---

# Styling Components with Built-in Properties

Every Mantine component that renders a root element supports **style props** — a set of universal
props that map directly to a single CSS property. They work the same way on `Box`, `Text`,
`Button`, `Paper`, `Stack`, `Group`, or any other Mantine component. Prefer these over inline
`style={{ ... }}` or ad-hoc CSS for simple, one-off adjustments (colors, spacing, sizing, borders).

> Rule of thumb: if you find yourself using more than 3–4 style props on a single component,
> move the styling into a CSS module instead. Style props are for quick, targeted tweaks — not
> primary styling.

## Spacing

| Prop  | CSS Property         | Theme key       |
| ----- | -------------------- | --------------- |
| `m`   | `margin`             | `theme.spacing` |
| `mt`  | `marginTop`          | `theme.spacing` |
| `mb`  | `marginBottom`       | `theme.spacing` |
| `ml`  | `marginLeft`         | `theme.spacing` |
| `mr`  | `marginRight`        | `theme.spacing` |
| `ms`  | `marginInlineStart`  | `theme.spacing` |
| `me`  | `marginInlineEnd`    | `theme.spacing` |
| `mis` | `marginInlineStart`  | `theme.spacing` |
| `mie` | `marginInlineEnd`    | `theme.spacing` |
| `mx`  | `marginInline`       | `theme.spacing` |
| `my`  | `marginBlock`        | `theme.spacing` |
| `p`   | `padding`            | `theme.spacing` |
| `pt`  | `paddingTop`         | `theme.spacing` |
| `pb`  | `paddingBottom`      | `theme.spacing` |
| `pl`  | `paddingLeft`        | `theme.spacing` |
| `pr`  | `paddingRight`       | `theme.spacing` |
| `ps`  | `paddingInlineStart` | `theme.spacing` |
| `pe`  | `paddingInlineEnd`   | `theme.spacing` |
| `pis` | `paddingInlineStart` | `theme.spacing` |
| `pie` | `paddingInlineEnd`   | `theme.spacing` |
| `px`  | `paddingInline`      | `theme.spacing` |
| `py`  | `paddingBlock`       | `theme.spacing` |

Spacing props accept theme spacing keys (`xs`, `sm`, `md`, `lg`, `xl`), numbers (converted to rem),
raw CSS strings (`"5rem"`), `"auto"`, and negative theme values (`"-md"`).

```tsx
<Box mt="xs" />      {/* margin-top: theme.spacing.xs */}
<Box mt="-md" />     {/* margin-top: theme.spacing.md * -1 */}
<Box mt="auto" />    {/* margin-top: auto */}
<Box mt={16} />      {/* margin-top: 1rem */}
<Box mt="5rem" />    {/* margin-top: 5rem */}
```

## Color & background

| Prop      | CSS Property | Theme key      |
| --------- | ------------ | -------------- |
| `bg`      | `background` | `theme.colors` |
| `c`       | `color`      | `theme.colors` |
| `opacity` | `opacity`    | –              |

`c`, `bd`, and `bg` accept theme color references (`"blue"`, `"orange.1"`, `"red.6"`), raw
hex/rgba values, and the special keywords `"dimmed"` and `"bright"`.

```tsx
<Box c="blue" />                    {/* theme.colors.blue[theme.primaryShade] */}
<Box bg="orange.1" />               {/* theme.colors.orange[1] */}
<Box c="dimmed" />                  {/* gray-6 (light) / dark-2 (dark) */}
<Box c="bright" />                  {/* black (light) / white (dark) */}
<Box bg="#EDFEFF" />
<Box bg="rgba(0, 34, 45, 0.6)" />
```

## Border

| Prop   | CSS Property   | Theme key |
| ------ | -------------- | --------- |
| `bd`   | `border`       | –         |
| `bdrs` | `borderRadius` | –         |

```tsx
<Box bd="1px solid red.6" />
```

## Typography

| Prop  | CSS Property     | Theme key           |
| ----- | ---------------- | ------------------- |
| `ff`  | `fontFamily`     | –                   |
| `fz`  | `fontSize`       | `theme.fontSizes`   |
| `fw`  | `fontWeight`     | –                   |
| `lts` | `letterSpacing`  | –                   |
| `ta`  | `textAlign`      | –                   |
| `lh`  | `lineHeight`     | `theme.lineHeights` |
| `fs`  | `fontStyle`      | –                   |
| `tt`  | `textTransform`  | –                   |
| `td`  | `textDecoration` | –                   |

## Sizing

| Prop  | CSS Property | Theme key       |
| ----- | ------------ | --------------- |
| `w`   | `width`      | `theme.spacing` |
| `miw` | `minWidth`   | `theme.spacing` |
| `maw` | `maxWidth`   | `theme.spacing` |
| `h`   | `height`     | `theme.spacing` |
| `mih` | `minHeight`  | `theme.spacing` |
| `mah` | `maxHeight`  | `theme.spacing` |

## Background image controls

| Prop   | CSS Property           | Theme key |
| ------ | ---------------------- | --------- |
| `bgsz` | `backgroundSize`       | –         |
| `bgp`  | `backgroundPosition`   | –         |
| `bgr`  | `backgroundRepeat`     | –         |
| `bga`  | `backgroundAttachment` | –         |

## Position

| Prop     | CSS Property | Theme key |
| -------- | ------------ | --------- |
| `pos`    | `position`   | –         |
| `top`    | `top`        | –         |
| `left`   | `left`       | –         |
| `bottom` | `bottom`     | –         |
| `right`  | `right`      | –         |
| `inset`  | `inset`      | –         |

## Layout

| Prop      | CSS Property | Theme key |
| --------- | ------------ | --------- |
| `display` | `display`    | –         |
| `flex`    | `flex`       | –         |

## Responsive style props

Any style prop above can take an object with `base` + breakpoint keys (`xs`, `sm`, `md`, `lg`, `xl`)
instead of a single value. `base` applies when no breakpoint matches; breakpoint values apply when
viewport width is greater than that breakpoint in `theme.breakpoints`.

```tsx
<Box
  w={{ base: 200, sm: 400, lg: 500 }}
  py={{ base: "xs", sm: "md", lg: "xl" }}
  bg={{ base: "blue.7", sm: "red.7", lg: "green.7" }}
  c="#fff"
  ta="center"
  mx="auto"
>
  Box with responsive style props
</Box>
```

Responsive style props are less performant than static ones — avoid using them inside large lists
of repeated elements.

## Other universal root-element props

These aren't part of the style-props table above, but are also supported by every Mantine
component with a root element:

- **`style`** — accepts a plain style object (same as native React `style`), a callback
  `(theme) => ({ ... })` for accessing theme values not exposed as CSS variables, an array of the
  above (merged), and can define custom CSS variables (e.g. `style={{ '--radius': '0.5rem' }}`).
- **`className`** — standard React className, composable with CSS modules.
- **`hiddenFrom`** / **`visibleFrom`** — accept a breakpoint (`xs`, `sm`, `md`, `lg`, `xl`) to hide
  the component below/above that breakpoint.

```tsx
<Button hiddenFrom="sm" color="orange">Hidden from sm</Button>
<Button visibleFrom="sm" color="cyan">Visible from sm</Button>
```

## Usage guidance

1. Use style props for quick, single-property, one-off adjustments (spacing, color, sizing on a
   specific instance).
2. Prefer component-specific props (`color`, `variant`, `size`, `radius`, etc.) when they exist —
   they control multiple related CSS properties consistently with the theme.
3. Fall back to CSS modules for anything reused, complex, pseudo-class/media-query dependent, or
   exceeding ~4 style props on one component.
4. Style props cannot be overridden by external CSS without `!important` — keep that in mind when
   building reusable/themeable components.
