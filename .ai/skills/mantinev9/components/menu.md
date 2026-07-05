### menu

Menu combines a list of secondary actions into a single interactive dropdown, triggered by a target element
[menu docs](https://mantine.dev/core/menu/)

#### Components

- root: `Menu`
- parts: `Menu.Target`, `Menu.Dropdown`, `Menu.Item`, `Menu.Label`, `Menu.Divider`, `Menu.Search`
- selectable items: `Menu.CheckboxItem`, `Menu.CheckboxGroup`, `Menu.RadioItem`, `Menu.RadioGroup`
- submenu: `Menu.Sub`, `Menu.Sub.Target`, `Menu.Sub.Item`, `Menu.Sub.Dropdown`
- context menu: `Menu.ContextMenu` (replaces `Menu.Target`, opens on right-click or long-press)
- key props: `trigger` (`click` | `hover` | `click-hover`), `opened`/`onChange` (controlled), `position`, `offset`, `withArrow`, `shadow`, `width`, `closeOnItemClick`, `checkIcon`, `alignItemsLabels`, `transitionProps`

#### Syntax

```jsx
<Menu shadow="md" width={200} position="bottom-start">
  <Menu.Target>
    <Button>{TARGET_LABEL}</Button>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Label>{LABEL}</Menu.Label>
    <Menu.Item leftSection={ICON} rightSection={ICON}>
      {ITEM_LABEL}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Sub>
      <Menu.Sub.Target>
        <Menu.Sub.Item>{SUBMENU_LABEL}</Menu.Sub.Item>
      </Menu.Sub.Target>
      <Menu.Sub.Dropdown>
        <Menu.Item>{SUB_ITEM_LABEL}</Menu.Item>
      </Menu.Sub.Dropdown>
    </Menu.Sub>
  </Menu.Dropdown>
</Menu>
```

#### Rules

- `Menu.Target` requires exactly one element/component child (no strings, numbers, fragments, or multiple nodes) — throws otherwise
- Custom components passed to `Menu.Target` or as `component` on `Menu.Item` must forward `ref` to their root element
- Only one top-level dropdown is open at a time per `Menu` instance; use `Menu.Sub` for nested submenus, each with its own open state
- `trigger="hover"` is not keyboard accessible; use `trigger="click-hover"` if both hover and click access are needed
- `Menu.CheckboxItem`/`Menu.RadioItem` do not close the menu on click by default; set `closeOnItemClick` (item) or `closeOnItemClick={false}` (menu-level default is true for `Menu.Item`, false for these)
- Wrap `Menu.RadioItem` in `Menu.RadioGroup` (value/onChange) and `Menu.CheckboxItem` in `Menu.CheckboxGroup` (value: string[]/onChange) for grouped state; items also work standalone with their own checked/onChange
- Use `Menu.Search` for a filterable dropdown; filtering logic (matching query to items) is left to the consumer
- Use `Menu.ContextMenu` instead of `Menu.Target` to trigger on right-click; set `disabled` to restore native context menu
