### spoiler

Spoiler truncates long content and lets the user expand/collapse it with a toggle button
[spoiler docs](https://mantine.dev/core/spoiler/)

#### Import

```tsx
import { Spoiler } from "@mantine/core";
```

#### Key props

- `maxHeight`: collapsed content height before the spoiler is shown
- `showLabel`: label displayed when content is collapsed (default: `"Show more"`)
- `hideLabel`: label displayed when content is expanded (default: `"Hide"`)
- `expanded`: controlled expanded state
- `defaultExpanded`: uncontrolled initial expanded state
- `onExpandedChange`: callback fired when expanded state changes
- `controlRef`: ref for the toggle button
- `children`: content to collapse/expand

#### Syntax

```tsx
<Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
  {content}
</Spoiler>
```

#### Rules

- `Spoiler` only renders the toggle button when the content exceeds `maxHeight`
- Use `expanded` with `onExpandedChange` for controlled state
- Use `defaultExpanded` for uncontrolled usage
- Best suited for long text blocks, descriptions, or comments that should not occupy excessive vertical space
