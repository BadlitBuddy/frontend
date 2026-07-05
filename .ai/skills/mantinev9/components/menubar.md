### menubar

Menubar is a desktop-application style horizontal row of menu triggers (File, Edit, View, ...) built on top of Menu
[menubar docs](https://mantine.dev/core/menubar/)

#### Components

- root: `Menubar`
- parts: `Menubar.Menu`, `Menubar.Target`, `Menubar.Dropdown`
- dropdown content: reuses `Menu.Item`, `Menu.Divider`, `Menu.Label`, `Menu.Sub`, `Menu.CheckboxItem`, `Menu.RadioGroup`, `Menu.RadioItem`
- key props: `trigger` (`click` | `hover`), `loop`, `position`, `openIndex`/`onOpenChange` (controlled), `defaultOpenIndex`

#### Syntax

```jsx
<Menubar trigger="click" position="bottom-start">
  <Menubar.Menu width={220}>
    <Menubar.Target>{TOP_LEVEL_LABEL}</Menubar.Target>
    <Menubar.Dropdown>
      <Menu.Item>{ITEM_LABEL}</Menu.Item>
      <Menu.Divider />
      <Menu.Item>{ITEM_LABEL}</Menu.Item>
    </Menubar.Dropdown>
  </Menubar.Menu>
  <Menubar.Menu width={220}>
    <Menubar.Target>{TOP_LEVEL_LABEL_2}</Menubar.Target>
    <Menubar.Dropdown>
      <Menu.Item>{ITEM_LABEL}</Menu.Item>
    </Menubar.Dropdown>
  </Menubar.Menu>
</Menubar>
```

#### Rules

- Use `Menubar` instead of `Menu` only when there are multiple sibling top-level triggers that should share arrow-key navigation; a single button with one dropdown should use `Menu` directly
- Only one `Menubar.Menu` in the bar is open at a time; moving to a sibling trigger while a menu is open switches which one is open immediately
- The whole bar is a single tab stop (roving tabindex); `Tab` moves focus into/out of the bar as a unit, arrow keys move between triggers
- With `trigger="click"` (default), a menu opens on click, but once any menu is open, hovering a sibling switches to it; `trigger="hover"` opens on hover even when all menus are closed
- `loop` (default `true`) controls whether arrow-key navigation wraps from last to first trigger and back
- Individual `Menubar.Menu` instances accept the same props as `Menu` (e.g. `position`, `withinPortal`, `closeOnItemClick`, `shadow`, `width`, `transitionProps`) to override the bar-level default for a single menu
- `openIndex` (controlled) is the zero-based index of the open `Menubar.Menu` in DOM order, or `null` when all are closed
