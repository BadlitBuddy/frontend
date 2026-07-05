### notification

Notification displays contextual messages such as success, warning, error, or informational alerts
[notification docs](https://mantine.dev/core/notification/)

#### Import

```tsx
import { Notification } from "@mantine/core";
```

#### Key props

- `title`: optional notification heading
- `children`: notification message
- `color`: notification color
- `icon`: custom icon displayed before the content
- `loading`: replaces the icon with a loader
- `withCloseButton`: shows or hides the close button
- `onClose`: callback fired when the close button is clicked
- `radius`: border radius
- `variant`: visual variant
- `closeButtonProps`: props forwarded to the close button

#### Syntax

```tsx
<Notification title="Upload complete" color="green" withCloseButton>
  Your file has been uploaded successfully.
</Notification>
```

#### Rules

- Use `title` for a short summary and `children` for additional details
- Set `loading` while an operation is in progress
- Provide `onClose` when the notification should be dismissible
- Use semantic colors (`green`, `red`, `yellow`, `blue`) to communicate status
- For toast notifications managed globally, use the Notifications system rather than rendering `Notification` directly
