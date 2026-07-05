### file-button
FileButton opens the native file picker when its trigger is clicked, exposing render-prop input props
[file-button docs](https://mantine.dev/core/file-button/)
#### Import
```js
import { FileButton } from '@mantine/core';
```
#### Props
- `onChange`: `(file: File | null) => void` or `(files: File[]) => void` when `multiple` — called when selection changes (required)
- `accept`: string – comma-separated MIME types, e.g. `"image/png,image/jpeg"`
- `multiple`: boolean – allow picking multiple files, changes `onChange` payload to an array
- `resetRef`: ref object – call `resetRef.current?.()` to clear the stale hidden `<input type="file">` value after manually resetting state
- `children`: function `(props) => ReactNode` – render prop; spread `props` onto the trigger element (e.g. a `Button`)
- `disabled`: boolean
#### Syntax
```html
<FileButton onChange="{setFile}" accept="{accept}" multiple="{multiple}" resetRef="{resetRef}">
  {(props) => <Button {...props}>Upload</Button>}
</FileButton>
```
#### Rules
- `children` must be a function that spreads its `props` argument onto the actual clickable trigger — `FileButton` itself renders no visible UI
- Not compatible with React Server Components because of the function-as-children pattern; add `"use client"` to the file
- The underlying `<input type="file">` cannot be controlled, so clearing state (e.g. `setFile(null)`) alone will not let the same file be re-selected — call `resetRef.current?.()` whenever you manually clear the value
- When `multiple` is set, `onChange` receives `File[]` instead of a single `File | null`
