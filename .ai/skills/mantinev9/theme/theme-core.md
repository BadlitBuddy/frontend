---
name: theme-core
description: Configuration options for Mantine v9 theming (MantineProvider + theme object)
---

## Config

Mantine v9 theming docs: https://mantine.dev/theming/mantine-provider/ and https://mantine.dev/theming/theme-object/

Mantine without config:

```tsx
import { MantineProvider } from "@mantine/core";

function App() {
  return <MantineProvider>{/* Your app here */}</MantineProvider>;
}
```

Mantine with a theme override (merged with the default theme):

```tsx
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "cyan",
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Mantine with all the default `MantineProvider` props set explicitly:

```tsx
<MantineProvider
  theme={theme} // MantineThemeOverride, merged with default theme
  colorSchemeManager={undefined} // defaults to window.localStorage
  defaultColorScheme="light" // 'light' | 'dark' | 'auto'
  forceColorScheme={undefined} // 'light' | 'dark', overrides manager + default
  cssVariablesSelector=":root" // selector CSS variables are written to (also :host)
  withCssVariables={true}
  deduplicateCssVariables={true}
  deduplicateInlineStyles={false}
  getRootElement={() => document.documentElement}
  classNamesPrefix="mantine"
  getStyleNonce={undefined}
  cssVariablesResolver={undefined}
  withStaticClasses={true}
  withGlobalClasses={true}
  env="default" // 'default' | 'test'
>
  {/* Your app here */}
</MantineProvider>
```

An example config:
In the config below, `primaryColor` is set to `orange`, `defaultRadius` is `0` for all components, a custom color `deepBlue` is added, the default `blue` shade is overridden, headings use `Roboto`, `cursorType` is `pointer` so non-native interactive elements show a pointer cursor, and `other` stores arbitrary app-specific tokens accessible via `theme.other`.

```tsx
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "orange",
  primaryShade: { light: 6, dark: 8 },
  defaultRadius: 0,
  cursorType: "pointer",
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily: "Open Sans, sans-serif",
  fontFamilyMonospace: "Menlo, monospace",
  fontWeights: { medium: "500" },
  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: { h1: { fontSize: "36px" } },
  },
  defaultGradient: { from: "orange", to: "red", deg: 45 },
  colors: {
    deepBlue: [
      "#eef3ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc1",
      "#5f7cb8",
      "#5474b4",
      "#44639f",
      "#39588f",
      "#2d4b81",
    ],
  },
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },
  other: {
    charcoal: "#333333",
    primaryHeadingSize: 45,
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Theme object properties (`MantineThemeOverride`, passed to `createTheme`)

- `focusRing`: `'auto' | 'always' | 'never'` — when the focus ring shows; `auto` (keyboard only) is recommended.
- `focusClassName` / `activeClassName`: custom classes for focus/active states; set `activeClassName: ''` to disable active styles globally.
- `scale`: number, rem-unit scale factor; change only if `<html>` font-size is customized. Default `1`.
- `fontSmoothing`: boolean, sets `font-smoothing` on `body`. Default `true`.
- `white` / `black`: base color strings.
- `colors`: object of color name → array of 10 shade strings (add new colors or override built-ins, e.g. `blue`).
- `primaryColor`: key of `theme.colors` used by default across components. Default `blue`.
- `primaryShade`: number (0–9) or `{ light, dark }` — which shade index is "primary" per color scheme. Default `{ light: 6, dark: 8 }`.
- `variantColorResolver`: function to deeply customize how colors map to variants (`Button`, `ActionIcon`, `ThemeIcon`, etc).
- `autoContrast`: boolean — auto-swap text to `white`/`black` based on background luminance for filled variants. Default `false`.
- `luminanceThreshold`: number, cutoff used by `autoContrast`. Default `0.3`.
- `fontFamily` / `fontFamilyMonospace`: base and monospace font stacks.
- `headings`: `{ fontFamily, fontWeight, textWrap, sizes: { h1..h6 } }` for `Title`/`Typography`.
- `radius`: object of named border-radius values (`xs`–`xl`).
- `defaultRadius`: key of `theme.radius` or any CSS value (numbers are treated as px, converted to rem).
- `spacing`: object of named spacing values (`xs`–`xl`).
- `fontSizes`: object of named font-size values.
- `lineHeights`: object of named line-height values (used in `Text`).
- `fontWeights`: `{ regular, medium, bold }`, default `400/600/700`; mapped to `--mantine-font-weight-*` CSS vars.
- `breakpoints`: object of named breakpoints, values in `em`.
- `shadows`: object of named `box-shadow` values.
- `respectReducedMotion`: boolean, honor OS reduce-motion setting. Default `false`.
- `cursorType`: `'default' | 'pointer'` — cursor for interactive elements lacking a pointer cursor by default (e.g. `Checkbox`, `NativeSelect`).
- `defaultGradient`: `{ from, to, deg }`, default for `variant="gradient"` components.
- `components`: per-component `classNames`, `styles`, and `defaultProps` overrides (Styles API / default props).
- `other`: free-form object for arbitrary app tokens, read via `theme.other`.

## MantineProvider props (outside the theme object)

- `theme`: `MantineThemeOverride`, deep-merged into the default theme.
- `colorSchemeManager`: reads/writes color scheme to external storage; defaults to `localStorage`. Use `localStorageColorSchemeManager({ key })` to customize the storage key.
- `defaultColorScheme`: `'light' | 'dark' | 'auto'`, used when the manager has no stored value (e.g. SSR). Default `light`.
- `forceColorScheme`: `'light' | 'dark'` — hard-overrides manager + default when set.
- `cssVariablesSelector`: CSS selector CSS variables are written to. Default `:root`/`:host`.
- `withCssVariables`: whether to inject theme CSS variables at all. Default `true`.
- `deduplicateCssVariables`: skip re-declaring variables identical to the default theme. Default `true`.
- `deduplicateInlineStyles`: React 19 style-tag hoisting/dedup for responsive style props. Default `false`.
- `getRootElement`: function returning the element that gets `data-mantine-color-scheme`; default `() => document.documentElement`. Must return `undefined` on the server.
- `classNamesPrefix`: prefix for components' static classes only (e.g. `mantine-Text-root`); does not affect utility or library classes. Default `mantine`.
- `withStaticClasses`: whether components get static classes like `mantine-Button-root`. Default `true`.
- `withGlobalClasses`: whether global utility classes (`hiddenFrom`/`visibleFrom`, `lightHidden`/`darkHidden`) are injected. Default `true`.
- `getStyleNonce`: function returning a `nonce` attribute for generated `<style />` tags (CSP support).
- `cssVariablesResolver`: function to generate custom CSS variable styles from the theme object.
- `env`: `'default' | 'test'` — `test` disables transitions/portals; use only with Jest/Vitest, not Cypress/Playwright or production.

## Helper utilities

- `createTheme(themeOverride)` — type-safe way to store a theme override in a variable.
- `mergeThemeOverrides(theme1, theme2, ...)` — merge multiple theme overrides into one.
- `useMantineTheme()` — hook returning the full merged theme object from context, e.g. `theme.colors.blue[5]`.
- `DEFAULT_THEME` — import the full default theme object from `@mantine/core`.
- `mergeMantineTheme(DEFAULT_THEME, themeOverride)` — build a complete theme object (default + override) for use **outside** of React components/context.
