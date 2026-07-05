---
name: typography
description: Configuration options for Mantine v9 typography (fonts, font sizes, line heights, headings)
---

## Config

Mantine v9 typography docs: https://mantine.dev/theming/typography/

Mantine without config (system fonts, default sizes):

```tsx
import { MantineProvider } from "@mantine/core";

function App() {
  return <MantineProvider>{/* Your app here */}</MantineProvider>;
}
```

Mantine with custom fonts for body text, monospace, and headings:

```tsx
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Outfit, sans-serif" },
});

function App() {
  return <MantineProvider theme={theme}>{/* Your app here */}</MantineProvider>;
}
```

Mantine with all default typography values set explicitly:

```tsx
const theme = createTheme({
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
  lineHeights: { xs: "1.4", sm: "1.45", md: "1.55", lg: "1.6", xl: "1.65" },
  headings: {
    fontFamily: undefined, // falls back to theme.fontFamily
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.125rem", lineHeight: "1.4" },
      h2: { fontSize: "1.625rem", lineHeight: "1.5" },
      h3: { fontSize: "1.375rem", lineHeight: "1.5" },
      h4: { fontSize: "1.125rem", lineHeight: "1.5" },
      h5: { fontSize: "1rem", lineHeight: "1.5" },
      h6: { fontSize: "0.875rem", lineHeight: "1.5" },
    },
  },
});
```

An example config:
In the config below, body text uses `Inter`, code/kbd use `Fira Code`, headings use `Roboto` with per-level overrides for `h1`/`h2`/`h6`, font sizes and line heights are bumped up slightly for readability.

```tsx
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "Fira Code, Monaco, monospace",
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 },
  lineHeights: { xs: "1.4", sm: "1.5", md: "1.6", lg: "1.65", xl: "1.7" },
  headings: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "400",
    sizes: {
      h1: { fontWeight: "100", fontSize: "2.25rem", lineHeight: "1.4" },
      h2: { fontSize: "1.875rem", lineHeight: "1.5" },
      h6: { fontWeight: "900" },
    },
  },
});

function App() {
  return <MantineProvider theme={theme}>{/* Your app here */}</MantineProvider>;
}
```

## Change fonts

Three separate theme properties control font-family, each scoped to different components:

- `theme.fontFamily` — controls font-family in all components except Title, Code, and Kbd.
- `theme.fontFamilyMonospace` — controls font-family of components that require monospace font: Code, Kbd, and CodeHighlight.
- `theme.headings.fontFamily` — controls font-family of h1-h6 tags in Title and Typography components; falls back to theme.fontFamily if not defined.

## System fonts (default behavior)

By default, Mantine uses system fonts, so different devices display components with the locally available font — macOS/iOS render San Francisco, Windows renders Segoe UI, and Android renders Roboto. This gives a familiar experience per platform and avoids problems from loading custom fonts, like layout shift or invisible text, so system fonts are recommended unless there's a strict brand requirement.

Default font-family values:

- `theme.fontFamily` and `theme.headings.fontFamily` default to -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji
- `theme.fontFamilyMonospace` defaults to ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace

## Font sizes

`theme.fontSizes` defines font-size values for all Mantine components, applied via the `fz` style prop (e.g. `<Text fz="md">`).

Default `theme.fontSizes` values:
| Key | Value | Value in px |
| --- | -------- | ----------- |
| xs | 0.75rem | 12px |
| sm | 0.875rem | 14px |
| md | 1rem | 16px |
| lg | 1.125rem | 18px |
| xl | 1.25rem | 20px |

## Line heights

`theme.lineHeights` defines line-height values for the Text component; most other components use theme.lineHeights.md by default, applied via the `lh` style prop (e.g. `<Text lh="md">`).

Default `theme.lineHeights` values:
| Key | Value |
| --- | ----- |
| xs | 1.4 |
| sm | 1.45 |
| md | 1.55 |
| lg | 1.6 |
| xl | 1.65 |

## h1-h6 styles

To customize heading styles in Title and Typography components, set theme.headings. It supports shared properties for all levels plus optional per-level overrides:

```tsx
const theme = createTheme({
  headings: {
    // properties for all headings
    fontWeight: "400",
    fontFamily: "Roboto",

    // properties for individual headings, all optional
    sizes: {
      h1: { fontWeight: "100", fontSize: 36, lineHeight: "1.4" },
      h2: { fontSize: 30, lineHeight: "1.5" },
      // ...up to h6
      h6: { fontWeight: "900" },
    },
  },
});
```

With theme.headings you can customize font-size, font-weight, and line-height per heading level. For anything beyond those three properties (e.g. margins, letter-spacing, text-transform), use the :is selector with the Styles API to target a specific heading level instead:

```tsx
// Demo.module.css
// .heading:is(h1, h2, h3, h4, h5, h6) { ... }

import { Title, createTheme } from "@mantine/core";
import classes from "./Demo.module.css";

const theme = createTheme({
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
});
```

## Notes

- `theme.fontSizes`, `theme.lineHeights`, and `theme.headings` are set inside the same `MantineThemeOverride` object passed to `createTheme` — see `theme-core.md` for the full theme object shape and `MantineProvider` setup.
- `theme.fontWeights` (`{ regular, medium, bold }`, mapped to CSS variables) is a separate, related theme property — also documented in `theme-core.md`.
