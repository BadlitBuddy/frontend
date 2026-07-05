### image

Image displays an image with optional fallback content, placeholder, and fit controls
[image docs](https://mantine.dev/core/image/)

#### Import

```tsx
import { Image } from "@mantine/core";
```

#### Key props

- `src`: image URL
- `alt`: alternative text for accessibility
- `fallbackSrc`: image displayed if `src` fails to load
- `fit`: CSS `object-fit` value (`'contain'`, `'cover'`, `'fill'`, `'none'`, `'scale-down'`)
- `radius`: border radius
- `h` / `w`: height and width
- `mah` / `maw`: max height / max width
- `loading`: native image loading (`'lazy'` or `'eager'`)
- `imageProps`: props forwarded to the underlying `<img>`
- `component`: polymorphic root element

#### Syntax

```tsx
<Image
  src="{url}"
  alt="{description}"
  fit="cover"
  radius="{radius}"
  fallbackSrc="{fallbackUrl}"
/>
```

#### Rules

- Always provide meaningful `alt` text unless the image is purely decorative
- Use `fallbackSrc` to display a backup image when the original fails to load
- Use `fit="cover"` for thumbnails/cards and `fit="contain"` when the full image must remain visible
- Prefer native `loading="lazy"` for images below the fold
- Width and height can be controlled with Mantine style props (`w`, `h`) or CSS
