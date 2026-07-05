---
name: mantine-colors
description: Explains and applies Mantine's color system and CSS styling conventions — theme colors, CSS variables, required style imports, global styles, and best practices for referencing colors consistently across CSS modules, style props, and the style prop. Use this skill whenever the user is working with Mantine (React UI library) and asks about colors, theming, CSS variables, dark mode, styling components, which CSS files to import, overriding Mantine styles, or why a Mantine color/style isn't applying correctly.
---

# Mantine Color System & Styling Conventions

Reference for applying Mantine's styling model correctly and consistently. Based on Mantine's official styling docs (styles overview, Mantine styles, CSS files list, global styles, CSS variables list).

## 1. Required CSS imports (do this first)

Mantine components are built with CSS modules but ship pre-bundled. Nothing is styled without importing CSS.

**Simplest, recommended approach** — import the whole package once, before any other styles:

```js
import "@mantine/core/styles.css";
```

If using other `@mantine/*` packages (e.g. `@mantine/dates`), import `@mantine/core` styles first, then the others, then your own app styles last:

```js
// ✅ correct order
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import classes from "./App.module.css"; // your styles override Mantine
```

Reversing this order lets Mantine styles clobber your own.

**Per-component imports** (smaller bundle) — only needed if you want to avoid shipping unused component CSS. Rules:

- Always import the three global files first, in this order:
  ```js
  import "@mantine/core/styles/baseline.css";
  import "@mantine/core/styles/default-css-variables.css";
  import "@mantine/core/styles/global.css";
  ```
- Then import each component's CSS file (see [CSS files list](https://mantine.dev/styles/css-files-list/) for the full table).
- Watch dependencies: some components are built on others and need both imported, in dependency order. E.g. `Button` depends on `UnstyledButton`:
  ```js
  import "@mantine/core/styles/UnstyledButton.css"; // dependency first
  import "@mantine/core/styles/Button.css"; // then the component
  ```
  Getting the order backwards means the dependency's styles override the component's.
- Common internal dependencies to know about: `ScrollArea`, `UnstyledButton`, `VisuallyHidden`, `Paper`, `Popover`, `CloseButton`, `Group`, `Loader`, `Overlay`, `ModalBase`, `Input`, `InlineInput`, `Flex`, `FloatingIndicator`, `ActionIcon`. Some components (e.g. `Select`) have no CSS of their own — they're built entirely from others.

**If you can't control stylesheet order** (e.g. Next.js doesn't guarantee import order): use the `.layer.css` variants instead, which wrap styles in `@layer mantine`. Never import both `styles.css` and `styles.layer.css` for the same package.

```js
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
```

CSS layers always apply before any un-layered CSS, so your regular (non-layered) app styles will override Mantine regardless of import order. To interleave with other libraries' layers, declare order explicitly:

```css
@layer base, mantine, components;
```

## 2. The color system

Colors live in `theme.colors` as an object where each key is a color name mapped to a **10-shade array** (indices `0`–`9`, light → dark). Built-in colors: `dark`, `gray`, `red`, `pink`, `grape`, `violet`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`.

- Reference a specific shade as `"colorName.index"`, e.g. `"blue.5"`, in any color-related prop (`color`, `c`, `bg`).
- `theme.primaryColor` (default `"blue"`) determines which color family component `color` props default to when unspecified, and which shade is used for `--mantine-primary-color-*` variables.
- `theme.primaryShade` (default `6` light / `8` dark, or an object `{ light: 6, dark: 8 }`) determines which index within a color's array is used as its "filled" shade.

### Semantic shade roles

Rather than hardcoding a shade index, most components resolve a color to one of these **semantic variants**, each with its own CSS variable per color:

| Variant         | Purpose                                 |
| --------------- | --------------------------------------- |
| `filled`        | Solid background (e.g. filled Button)   |
| `filled-hover`  | Hover state of filled                   |
| `light`         | Low-opacity background variant          |
| `light-hover`   | Hover state of light                    |
| `light-color`   | Text color used on a `light` background |
| `outline`       | Border/text color for outline variant   |
| `outline-hover` | Hover background for outline            |
| `text`          | Text-only usage of the color            |

These exist as `var(--mantine-color-{name}-{variant})`, e.g. `var(--mantine-color-blue-filled)`, `var(--mantine-color-red-light-color)`. **Prefer these over a raw shade index** when styling things like buttons, badges, or alerts, since they automatically adapt for light/dark scheme.

## 3. CSS variables

All theme values are exposed as CSS custom properties, generated from the default theme and re-generated per `MantineProvider` theme override. Use them in CSS modules, the `style` prop, or plain CSS — never hardcode hex values that duplicate the theme.

**Color scales**: `--mantine-color-{name}-0` through `-9` for every color, plus `--mantine-color-white` and `--mantine-color-black`.

**Semantic/contextual colors** (values differ between light and dark scheme):

- `--mantine-color-text` — default text color
- `--mantine-color-body` — page/body background
- `--mantine-color-bright` — high-contrast text (black in light, white in dark)
- `--mantine-color-dimmed` — muted/secondary text
- `--mantine-color-anchor` — link color
- `--mantine-color-error` / `--mantine-color-success`
- `--mantine-color-placeholder`
- `--mantine-color-default`, `-default-hover`, `-default-color`, `-default-border` — default variant surface (e.g. default Button)
- `--mantine-color-disabled`, `-disabled-color`, `-disabled-border`
- `--mantine-color-scheme` — resolves to `"light"` or `"dark"`, used for the CSS `color-scheme` property

**Primary color shortcuts**: `--mantine-primary-color-filled`, `-filled-hover`, `-light`, `-light-hover`, `-light-color`, and `-0` through `-9` — always point at whatever `theme.primaryColor` currently is, so use these instead of hardcoding a color name when you mean "the app's primary color."

**Other tokens**: `--mantine-spacing-{xs..xl}`, `--mantine-font-size-{xs..xl}`, `--mantine-line-height` / `-{xs..xl}`, `--mantine-radius-{xs..xl}` and `-default`, `--mantine-shadow-{xs..xl}`, `--mantine-breakpoint-{xs..xl}`, `--mantine-font-family`, `-monospace`, `-headings`, `--mantine-heading-font-weight`, `--mantine-h1..h6-font-size/-line-height/-font-weight`, `--mantine-z-index-{app,modal,popover,overlay,max}`.

Full reference table: [CSS variables list](https://mantine.dev/styles/css-variables-list/).

### Using variables in each styling method

- **CSS modules** (recommended default):
  ```css
  .control {
    background-color: var(--mantine-color-blue-1);
    color: var(--mantine-color-blue-filled);
    padding: var(--mantine-spacing-xl);
  }
  ```
- **Style props** — shorthand strings map to variables automatically: `bg="red.5"` → `var(--mantine-color-red-5)`, `mt="xl"` → `var(--mantine-spacing-xl)`.
- **`style` prop** — reference variables directly, or pull from the `theme` object via the callback form:
  ```jsx
  <Box style={{ color: 'var(--mantine-color-orange-5)' }} />
  <Box style={(theme) => ({ color: theme.colors.orange[5] })} />
  ```

## 4. Global styles (don't override without care)

`@mantine/core` ships required global styles: a minimal CSS reset (`box-sizing: border-box`, form-element font inheritance), plus `:root`/`body` rules that wire up color scheme and base typography:

```css
:root {
  color-scheme: var(--mantine-color-scheme);
}
body {
  font-family: var(--mantine-font-family);
  font-size: var(--mantine-font-size-md);
  line-height: var(--mantine-line-height);
  background-color: var(--mantine-color-body);
  color: var(--mantine-color-text);
}
```

Overriding these can break component behavior — change theme values instead of fighting the reset. For older-browser support, layer in `normalize.css` alongside Mantine's reset.

**Static utility classes** ship for free: `mantine-active`, `mantine-focus-auto`, `mantine-focus-always`, `mantine-focus-never`, `mantine-visible-from-{breakpoint}`, `mantine-hidden-from-{breakpoint}`.

**Adding your own global styles**: put them in a plain `.css` file (not `.module.css`) so they aren't scoped, e.g. `global.css`, and reference Mantine CSS variables inside it:

```css
body {
  background-color: var(--mantine-color-red-filled);
}
```

## 5. Best practices for consistent color usage

1. **Import `@mantine/core/styles.css` (or the global trio) before anything else** — components render unstyled otherwise.
2. **Never hardcode hex colors that duplicate the theme.** Use `var(--mantine-color-*)` or theme color paths (`"blue.5"`) so custom themes and dark mode propagate automatically.
3. **Prefer semantic/contextual variables over raw shades** for anything that should adapt to color scheme: `--mantine-color-text`, `--mantine-color-body`, `--mantine-color-dimmed`, and the `-filled`/`-light`/`-outline` variants.
4. **Use `--mantine-primary-color-*` (or `theme.primaryColor`) instead of naming a specific color** when you mean "the app's brand/primary color" — this keeps custom re-themes working without a find-and-replace.
5. **CSS modules are the default for component styling**; reach for style props only for 1–4 one-off property tweaks per component, and the `style` prop only for truly dynamic/inline values or setting custom CSS variables. Anything heavier belongs in a `.module.css` file.
6. **Respect import order**: `@mantine/core` styles → other `@mantine/*` package styles → your app's own CSS module imports. If you can't guarantee order (e.g. some Next.js setups), use the `.layer.css` variants instead of the plain `.css` ones — never mix both for the same package.
7. **When importing per-component styles**, always include the three global files (`baseline.css`, `default-css-variables.css`, `global.css`) first, and import any dependency components' CSS before the CSS of components built on top of them.
8. **Don't fight the global reset/body styles** by overriding them directly — adjust the theme (colors, fonts, spacing) via `MantineProvider` instead, so changes stay consistent everywhere.
