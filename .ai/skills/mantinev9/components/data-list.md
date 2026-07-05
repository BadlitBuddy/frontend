### data-list
DataList displays label-value pairs as a semantic description list (`dl`/`dt`/`dd`)
[data-list docs](https://mantine.dev/core/data-list/)
#### Import
`import { DataList } from '@mantine/core';`
#### Component parts
- root: `DataList`
- subcomponent: `DataList.Item`
- subcomponent: `DataList.ItemLabel`
- subcomponent: `DataList.ItemValue`
#### Syntax
```tsx
<DataList size="{size}" orientation="{orientation}" withDivider>
  <DataList.Item>
    <DataList.ItemLabel>{label}</DataList.ItemLabel>
    <DataList.ItemValue>{value}</DataList.ItemValue>
  </DataList.Item>
</DataList>
```
#### Key props
- `DataList`: `orientation` (`horizontal` | `vertical` — horizontal places label/value side by side, vertical stacks value under label), `size` (controls font-size/line-height), `withDivider` (adds a border between items), `gap` (key of `theme.spacing`), `labelWidth` (min-width of the label/`dt` element)
- `DataList.Item`: no dedicated props beyond standard Box props; wraps one label/value pair
#### Rules
- `DataList` renders `dl`, `DataList.ItemLabel` renders `dt`, and `DataList.ItemValue` renders `dd` — use it for genuinely descriptive label/value data (profile details, specs, metadata), not as a general-purpose two-column layout
- Each `DataList.Item` must contain exactly one `DataList.ItemLabel` and one `DataList.ItemValue`
- Use `orientation="vertical"` for longer values or narrow containers where label and value don't fit on one line
- `labelWidth` is only meaningful with `orientation="horizontal"`, where it aligns labels into a fixed-width column
