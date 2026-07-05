### table

Table displays structured tabular data using semantic HTML table elements
[table docs](https://mantine.dev/core/table/)

#### Import

```tsx
import { Table } from "@mantine/core";
```

#### Component parts

- `Table`
- `Table.Thead`
- `Table.Tbody`
- `Table.Tfoot`
- `Table.Tr`
- `Table.Th`
- `Table.Td`
- `Table.Caption`
- `Table.ScrollContainer`

#### Syntax

```tsx
<Table striped highlightOnHover withTableBorder withColumnBorders>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Name</Table.Th>
      <Table.Th>Age</Table.Th>
    </Table.Tr>
  </Table.Thead>

  <Table.Tbody>
    <Table.Tr>
      <Table.Td>John</Table.Td>
      <Table.Td>25</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table>
```

#### Key props

- `striped` – alternating row backgrounds
- `highlightOnHover` – highlights row on hover
- `withTableBorder` – adds outer border
- `withColumnBorders` – adds vertical column borders
- `horizontalSpacing` – cell horizontal padding
- `verticalSpacing` – cell vertical padding
- `fontSize` – table font size
- `stickyHeader` – keeps header fixed while scrolling
- `stickyHeaderOffset` – offset for sticky header
- `captionSide` – `"top"` or `"bottom"`
- `layout` – CSS `table-layout`
- `data` – object describing table data for automatic rendering

#### Table.data format

```tsx
<Table
  data={{
    head: ["Name", "Age"],
    body: [
      ["John", "25"],
      ["Jane", "30"],
    ],
  }}
/>
```

#### Rules

- Use semantic subcomponents (`Thead`, `Tbody`, `Tr`, `Th`, `Td`) for custom tables
- Use the `data` prop for simple static tables to avoid repetitive markup
- Wrap wide tables in `Table.ScrollContainer` to enable horizontal scrolling
- Use `stickyHeader` together with `Table.ScrollContainer` for large datasets
- `Table` is intended for structured tabular data, not page layout
