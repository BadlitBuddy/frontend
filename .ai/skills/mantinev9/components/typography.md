### typography

Mantine typography components provide consistent text styling and semantic document structure
[typography docs](https://mantine.dev/core/typography/)

#### Main components

- `Text` – paragraphs, labels, inline text
- `Title` – semantic headings (`h1`–`h6`)
- `Blockquote` – quoted content
- `Code` – inline code snippets
- `CodeHighlight` / `CodeHighlightTabs` – syntax-highlighted code blocks
- `List` – ordered and unordered lists
- `Mark` – highlighted inline text

#### Typical usage

```tsx
<Title order={2}>Getting Started</Title>

<Text>
  Install the package and follow the setup guide.
</Text>

<List>
  <List.Item>Install</List.Item>
  <List.Item>Configure</List.Item>
</List>

<Blockquote>
  Documentation quote...
</Blockquote>
```

#### Typography guidelines

- Use `Title` for headings instead of styling `Text` to look like headings
- Use `Text` for paragraphs and general body content
- Use `Mark` only for short highlighted phrases
- Use `Code` for inline code and `CodeHighlight` for multi-line code blocks
- Use semantic HTML structure (`Title`, `Text`, `List`, etc.) for better accessibility and SEO
- Maintain heading hierarchy (`h1` → `h2` → `h3`) throughout a page
- Prefer Mantine typography components over raw HTML elements to ensure consistent spacing, colors, and theme integration
