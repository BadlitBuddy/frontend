### copy-button
CopyButton copies a given value to the clipboard, exposing render-prop state for building a custom trigger
[copy-button docs](https://mantine.dev/core/copy-button/)
#### Import
```js
import { CopyButton } from '@mantine/core';
```
#### Props
- `value`: string – the text copied to the clipboard (required)
- `timeout`: number – ms before `copied` resets back to `false` (default 500)
- `children`: function `({ copied, copy }) => ReactNode` – render prop, not a plain node
#### Syntax
```html
<CopyButton value="{value}" timeout="{timeout}">
  {({ copied, copy }) => (
    <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )}
</CopyButton>
```
#### Rules
- `children` must be a function, not a regular element — `CopyButton` is based on the `use-clipboard` hook and passes `{ copied, copy }` to it
- Not compatible with React Server Components because of the function-as-children pattern; add `"use client"` to the file
- Will not work inside iframes, and may not work with `file://` pages; works fine on `http://`/`https://` pages
- Wrap any button, ActionIcon, or other clickable element as the `children` render output — `copy` is the click handler and `copied` drives the visual state
