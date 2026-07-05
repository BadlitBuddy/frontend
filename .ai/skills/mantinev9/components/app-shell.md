### app-shell

AppShell is a layout component for building the common Header / Navbar / Aside / Footer application layout. All sections use `position: fixed` and do not scroll with the page.

[app-shell docs](https://mantine.dev/core/app-shell/)

#### Import

```jsx
import { AppShell, Burger } from "@mantine/core";
```

#### Sub-components

- root: `AppShell`
- part: `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, `AppShell.Footer`, `AppShell.Main`, `AppShell.Section`

#### Props (root)

- `header`: `{ height, collapsed?, offset? }` — enables `AppShell.Header`
- `navbar`: `{ width, breakpoint, collapsed?: { mobile?, desktop? } }` — enables `AppShell.Navbar`
- `aside`: `{ width, breakpoint, collapsed?: { mobile?, desktop? } }` — enables `AppShell.Aside`
- `footer`: `{ height, collapsed?, offset? }` — enables `AppShell.Footer`
- `padding`: padding applied to `AppShell.Main` (accepts responsive object)
- `layout`: `"default"` (navbar/aside height minus header/footer) | `"alt"` (navbar/aside full height, header/footer width shrinks)
- `withBorder`: boolean, default `true` — border on the edge adjacent to `AppShell.Main`
- `zIndex`: number, default `100`
- `transitionDuration` / `transitionTimingFunction`: control section animations
- `disabled`: boolean — when `true`, only `AppShell.Main` renders

#### Syntax

```jsx
<AppShell
  padding="md"
  header={{ height: 60 }}
  navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
>
  <AppShell.Header>
    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    <div>Logo</div>
  </AppShell.Header>

  <AppShell.Navbar>Navbar</AppShell.Navbar>

  <AppShell.Main>Main</AppShell.Main>
</AppShell>
```

#### Rules

- You must set the corresponding config prop (`header`, `navbar`, `aside`, `footer`) on `AppShell` before using the matching sub-component; otherwise it will not render as configured.
- `navbar`/`aside` are full width below `breakpoint` regardless of the configured `width`; their collapsed state is controlled independently for `mobile` and `desktop`.
- Do not put a `<main>` element inside `AppShell.Main` — only one `<main>` is allowed per page and `AppShell.Main` already renders one.
- Use `AppShell.Section` (with `grow` prop and optionally `component={ScrollArea}`) to create scrollable regions inside `AppShell.Navbar`/`AppShell.Aside`.
- Use the `offset` property in `header`/`footer` config to prevent `AppShell.Main` from being offset — useful when hiding the header on scroll (e.g. with `useHeadroom`).
- `withBorder` and `zIndex` can be set globally on `AppShell` or overridden per-section.
- Root elements: `AppShell.Header` → `header`, `AppShell.Footer` → `footer`, `AppShell.Main` → `main`, `AppShell.Navbar` → `nav`, `AppShell.Aside` → `aside`, `AppShell.Section` → `div`.
- CSS variables available: `--app-shell-navbar-width`, `--app-shell-navbar-offset`, `--app-shell-aside-width`, `--app-shell-aside-offset`, `--app-shell-header-height`, `--app-shell-header-offset`, `--app-shell-footer-height`, `--app-shell-footer-offset`.
