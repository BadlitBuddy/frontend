### alert
Alert is used to attract user attention with an important static message
[alert docs](https://mantine.dev/core/alert/)
#### Import
`import { Alert } from '@mantine/core';`
#### Components
- component: `Alert`
#### Key props
- `title`: ReactNode — alert title, rendered above the message
- `icon`: ReactNode — displayed next to the title
- `color`: MantineColor — key of `theme.colors` or any valid CSS color
- `variant`: e.g. `"filled" | "light" | "outline"`
- `radius`: MantineRadius | number
- `withCloseButton`: boolean — shows a close button
- `closeButtonLabel`: string — `aria-label` for the close button, required whenever `withCloseButton` is set
- `onClose`: `() => void` — called when the close button is clicked
- `autoContrast`: boolean — adjusts text color for sufficient contrast, only affects `filled` variant
#### Syntax
```tsx
<Alert
  variant="{variant}"
  color="{color}"
  title="{title}"
  icon={icon}
  withCloseButton
  closeButtonLabel="{dismissLabel}"
  onClose={handleClose}
>
  {message}
</Alert>
```
#### Rules
- If `withCloseButton` is set, `closeButtonLabel` must also be set — otherwise the close button is not accessible to screen readers
- The root element has `role="alert"`; `aria-describedby` points to the body and `aria-labelledby` points to the title element automatically when `title` is provided
- `Alert` does not auto-dismiss or manage its own visibility — control mounting/rendering of `Alert` from outside (e.g. with local state) using `onClose` as the trigger
- `autoContrast` only has an effect when `variant="filled"`
