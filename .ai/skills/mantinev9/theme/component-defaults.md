---
name: component-defaults
description: Configuration options for Mantine v9 component default props (theme.components, useProps, withProps)
---

## Config

Mantine v9 default props docs: https://mantine.dev/theming/default-props/

Mantine without config (components use their built-in defaults):

```tsx
import { Button, MantineProvider } from "@mantine/core";

function Demo() {
  return (
    <MantineProvider>
      <Button>Default button</Button>
    </MantineProvider>
  );
}
```

Mantine with default props set for one component via `theme.components`:

```tsx
import { MantineProvider, Button, Group, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </MantineProvider>
  );
}
```

An example config:
In the config below, `Button` defaults to `cyan`/`outline`, `Menu.Item` (compound component) defaults to `red` text, and `Tabs.List` defaults to centered tabs. Any prop passed directly to a component instance still overrides these.

```tsx
import {
  createTheme,
  MantineProvider,
  Button,
  Menu,
  Tabs,
} from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
      },
    }),
    MenuItem: Menu.Item.extend({
      defaultProps: { color: "red" },
    }),
    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: "center",
      },
    }),
  },
});

function App() {
  return <MantineProvider theme={theme}>{/* Your app here */}</MantineProvider>;
}
```

## How it works

- Set `theme.components` (inside `createTheme`, same object documented in `theme-core.md`) to define default props for every Mantine component in the app.
- These defaults apply unless overridden by props passed directly to a specific component instance — instance props always win.
- Use `Component.extend({ defaultProps: {...} })` (e.g. `Button.extend(...)`) to build the entry for a given component key under `theme.components`.
- Besides `defaultProps`, `.extend()` also accepts `classNames`, `styles`, and `vars` for Styles API overrides (see the Styles API docs) — this skill covers `defaultProps` only.

## Scoping defaults to part of the app: `MantineThemeProvider`

`MantineThemeProvider` applies a theme (including `components` defaults) to only part of the component tree, without needing a second full `MantineProvider`:

```tsx
import { Button, createTheme, MantineThemeProvider } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
      },
    }),
  },
});

function Demo() {
  return (
    <>
      <MantineThemeProvider theme={theme}>
        {/* Part of the app with theme */}
      </MantineThemeProvider>

      {/* Another part without theme */}
    </>
  );
}
```

## Compound components

Components like `Menu` and `Tabs` have associated compound components (`Menu.Item`, `Tabs.List`, etc). Add default props to these by **omitting the dot** and concatenating the names as the `theme.components` key:

```tsx
import { createTheme, MantineProvider, Menu, Tabs } from "@mantine/core";

const theme = createTheme({
  components: {
    MenuItem: Menu.Item.extend({
      defaultProps: { color: "red" },
    }),

    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: "center",
      },
    }),
  },
});
```

E.g. `Menu.Item` → key `MenuItem`; `Tabs.List` → key `TabsList`.

## Adding default-props support to custom components: `useProps`

`useProps(componentName, defaultProps, props)` lets a custom (non-Mantine) component participate in the same `theme.components` default-props system:

- `componentName` (string) — connects the component to `theme.components` by name.
- `defaultProps` — component-level defaults, used only when the theme doesn't define any for this component name.
- `props` — the actual props passed to the component instance; these win over both theme and component-level defaults.

```tsx
import { useProps, MantineThemeProvider, createTheme } from "@mantine/core";

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: "red",
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps("CustomComponent", defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: "green",
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>Default color</CustomComponent>

      <MantineThemeProvider theme={theme}>
        <CustomComponent>Provider color</CustomComponent>
        <CustomComponent color="blue">Prop color</CustomComponent>
      </MantineThemeProvider>
    </div>
  );
}
```

Precedence (highest to lowest): explicit `props` on the instance → `theme.components[componentName].defaultProps` → the component's own `defaultProps` argument.

## One-off default props: `withProps`

Every Mantine component has a static `withProps(props)` function that returns a new component with those props baked in as defaults — an alternative to theming when you just want a pre-configured variant of a component (e.g. a `LinkButton`), without touching `theme.components` globally:

```tsx
import { Button, TextInput } from "@mantine/core";

const LinkButton = Button.withProps({
  component: "a",
  target: "_blank",
  rel: "noreferrer",
  variant: "subtle",
});

const PhoneInput = TextInput.withProps({
  label: "Your phone number",
  placeholder: "Your phone number",
});

function Demo() {
  return (
    <>
      {/* Additional props can still be passed */}
      <LinkButton href="https://mantine.dev">Mantine website</LinkButton>

      {/* Props passed at the call site override withProps defaults */}
      <PhoneInput placeholder="Personal phone" />
    </>
  );
}
```

## When to use which

- **`theme.components` (`Component.extend`)** — app-wide defaults for a built-in Mantine component, set once in the theme.
- **`MantineThemeProvider`** — same mechanism, scoped to a subtree instead of the whole app.
- **`useProps`** — add the same theme-driven default-props pattern to your own custom components.
- **`withProps`** — quick, local, non-thematic way to create a pre-configured variant of a component (no `theme.components` entry needed).
