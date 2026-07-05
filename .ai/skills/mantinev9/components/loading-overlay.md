### loading-overlay
LoadingOverlay renders a semi-transparent overlay with a centered loader on top of its parent element — typically used to show a loading state while a form or section is submitting/fetching.
[loading-overlay docs](https://mantine.dev/core/loading-overlay/)
#### Import
`import { LoadingOverlay } from '@mantine/core';`
#### Key props
- `visible`: boolean — controls whether the overlay is shown; drive with state (e.g. `useDisclosure`)
- `zIndex`: string | number — z-index of the overlay; the loader itself gets `zIndex + 1`
- `overlayProps`: forwarded to `Overlay` (e.g. `{ radius, blur, backgroundOpacity, color }`)
- `loaderProps`: forwarded to `Loader` (e.g. `{ color, type }`); set `loaderProps={{ children: <CustomNode /> }}` to replace the default spinner entirely
- `transitionProps`: forwarded to `Transition`, set `duration` to customize the fade
#### Syntax
```tsx
<Box pos="relative">
  <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
  {CONTENT}
</Box>
```
#### Rules
- The parent element MUST have `position: relative` (e.g. `<Box pos="relative">`) or the overlay will not be positioned correctly
- Elements underneath the overlay remain keyboard-focusable even while `visible` — disable inputs/buttons yourself if they must not be interacted with during loading
- Use `loaderProps.children` instead of fighting the default `Loader` styling when you need fully custom loading content
