### hue-slider

HueSlider lets users select a hue value from the color spectrum.

[hue slider docs](https://mantine.dev/core/hue-slider/)

#### Component

- `HueSlider`

#### Props

- `value`
- `defaultValue`
- `onChange`
- `size`
- `disabled`
- `thumbSize`

#### Syntax

```tsx
<HueSlider value="{value}" onChange="{onChange}" />
```

#### Rules

- Hue values range from `0` to `360`.
- Use controlled mode with `value` and `onChange`.
- Use `defaultValue` for uncontrolled usage.
- `size` controls the track height.
- `thumbSize` controls the slider thumb size.
- `disabled` prevents user interaction.
