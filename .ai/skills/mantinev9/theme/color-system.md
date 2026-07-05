---
name: color-system
description: Configuration options for Mantine v9 colors and color schemes (light/dark mode)
---

## Config

Mantine v9 color docs: https://mantine.dev/theming/colors/ and https://mantine.dev/theming/color-schemes/

Mantine without config (default `light` scheme, default `open-color` palette, `blue` primary):

```tsx
import { MantineProvider } from "@mantine/core";

function App() {
  return <MantineProvider>{/* Your app here */}</MantineProvider>;
}
```

Mantine with a custom color palette and default scheme:

```tsx
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "ocean-blue",
  colors: {
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

An example config with most color-system options set:
In the config below, a custom 10-shade `ocean-blue` color is added and set as `primaryColor`, `primaryShade` differs between light/dark, a `primary` virtual color swaps between `cyan`/`pink` depending on scheme, and `autoContrast` auto-picks black/white text on filled variants.

```tsx
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";

const theme = createTheme({
  primaryColor: "primary",
  primaryShade: { light: 6, dark: 8 },
  autoContrast: true,
  luminanceThreshold: 0.3,
  colors: {
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    primary: virtualColor({
      name: "primary",
      light: "cyan",
      dark: "pink",
    }),
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

## Colors

- Mantine's default theme uses `open-color` with 14 named colors (`dark`, `gray`, `red`, `pink`, `grape`, `violet`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`), each an array of **10 shades** (index `0`–`9`, larger index = darker).
- Access via `theme.colors.blue[5]` (from `useMantineTheme()`) or CSS variable `var(--mantine-color-blue-5)`.
- Add custom colors under `theme.colors`; **each override must supply at least 10 shades** or TypeScript errors and some variants lose proper colors. Extra shades beyond 10 are allowed and referenceable by index (e.g. `color="blue.11"`) but unused by default variants.
- Supported color value formats in `theme.colors`: HEX (`#fff`), RGB/RGBA (`rgb(...)`, `rgba(...)`), HSL/HSLA, OKLCH.
- `colorsTuple(value)` — turns a single color (or a dynamic 10-length string array) into a valid Mantine color tuple, e.g. `colorsTuple('#FFC0CB')`.
- `generateColors(hex)` (from `@mantine/colors-generator`, needs `chroma-js`) — generates 10 shades from one color; works best on darker base colors (blue/violet/red), can lose contrast on lighter ones (yellow/teal/orange). The web colors generator tool is at https://mantine.dev/colors-generator/.
- **Virtual colors** — a color whose value differs per color scheme, via `virtualColor({ name, light, dark })` where `name` matches its own key in `theme.colors`, and `light`/`dark` reference other keys of `theme.colors`. Supports `autoContrast` (computed separately per scheme).
- Add custom color names to TypeScript autocomplete via module augmentation:

```ts
import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors =
  | "primaryColorName"
  | "secondaryColorName"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
```

### primaryColor / primaryShade

- `theme.primaryColor`: must be a **key** of `theme.colors` (e.g. `'blue'`, `'orange'`, a custom color) — never a raw CSS color value, or theme merging throws. Used as the default `color` for most components and for the default focus ring outline.
- `theme.primaryShade`: number `0`–`9`, or `{ light, dark }` to differ per scheme. Determines which shade of the resolved color is used for `filled`/`light`/`outline` variants. Default `{ light: 6, dark: 8 }`.

### color prop vs. c prop

- `color` prop (on components like `Button`, `Badge`, `ActionIcon`) accepts: a key of `theme.colors` (`"blue"`), a key+index (`"blue.5"`), or a raw CSS color (`"#fff"`). It drives multiple CSS properties at once (background, hover background, text color, border), computed per-variant.
- `c` is a style prop that sets only the `color` (text) CSS property — combine `color` + `c` for custom contrast, e.g. `<Button color="#C3FF36" c="black">`.

### variantColorResolver

- `theme.variantColorResolver` is a function `(input: VariantColorsResolverInput) => VariantColorResolverResult` used by `Alert`, `Avatar`, `Button`, `Badge`, `ActionIcon` to compute `{ background, hover, color, border }` for a given `color`/`variant`/`gradient`.
- Wrap `defaultVariantColorsResolver(input)` to tweak specific cases, or return fully custom objects to add brand-new variant names (e.g. `variant="danger"`).
- Use `parseThemeColor({ color, theme })` to check `isThemeColor` and resolve the actual color value inside a custom resolver.

## Color schemes

- `MantineProvider` manages color scheme via React context; `defaultColorScheme` prop is `'light' | 'dark' | 'auto'` (`'auto'` = follow OS), default `'light'`.
- The resolved scheme is set as a `data-mantine-color-scheme` attribute on `<html>` (or the element from `getRootElement`), which all component styles key off of.
- `useMantineColorScheme()` hook:

```ts
function useMantineColorScheme(input?: { keepTransitions?: boolean }): {
  colorScheme: "dark" | "light" | "auto";
  setColorScheme: (colorScheme: "dark" | "light" | "auto") => void;
  toggleColorScheme: () => void; // if 'auto', infers from OS
  clearColorScheme: () => void; // clears storage, resets to defaultColorScheme
};
```

- By default, transitions are disabled during a scheme change to avoid flashes; pass `{ keepTransitions: true }` to keep them.
- `useComputedColorScheme(defaultValue, options?)` — collapses `'auto'` into an actual `'light' | 'dark'`; use this (not raw `colorScheme`) to implement a toggle, since `'auto'` alone can't be flipped correctly.
- **SSR / hydration**: the stored scheme (e.g. from `localStorage`) isn't available on the server, so don't branch rendering on `colorScheme` directly in SSR apps (Next.js, React Router) — use the `light`/`dark` CSS mixins from `postcss-preset-mantine` instead, or gate client-only reads with `useComputedColorScheme(default, { getInitialValueInEffect: true })`. Client-only apps (Vite, CRA) can read `colorScheme` directly since there's no hydration mismatch.
- `ColorSchemeScript` — renders a `<script>` (place in `<head>`) that sets `data-mantine-color-scheme` before hydration to prevent a flash of the wrong scheme in SSR apps:

```tsx
<ColorSchemeScript defaultColorScheme="dark" nonce="..." />
```

Must be kept in sync with `defaultColorScheme`/`forceColorScheme` passed to `MantineProvider`.

- `defaultColorScheme="auto"` (on both `MantineProvider` and `ColorSchemeScript`) makes the scheme follow the OS setting.
- `forceColorScheme` (`'light' | 'dark'`, on both `MantineProvider` and `ColorSchemeScript`) hard-locks the scheme; `defaultColorScheme` and `colorSchemeManager` are ignored, and `setColorScheme` becomes a no-op.
- `lightHidden` / `darkHidden` — boolean props on every Mantine component to hide it in a specific scheme, e.g. `<Button lightHidden>` (dark-mode only).
- **Color scheme manager** — by default schemes persist to `localStorage`. Supply a custom `MantineColorSchemeManager` (`{ get, set, subscribe, unsubscribe, clear }`) via the `colorSchemeManager` prop to persist elsewhere. Use the built-in `localStorageColorSchemeManager({ key })` to just change the storage key:

```tsx
import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-color-scheme",
});

<MantineProvider colorSchemeManager={colorSchemeManager}>
  {/* app */}
</MantineProvider>;
```

- **Disabled JavaScript**: if JS may be disabled, set `data-mantine-color-scheme` manually on `<html>` as a fallback (e.g. `<html data-mantine-color-scheme="light">`) in addition to `ColorSchemeScript`.
