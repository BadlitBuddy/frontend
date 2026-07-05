### stepper
Stepper is used to display content divided into a steps sequence, with navigation between completed, current, and upcoming steps
[stepper docs](https://mantine.dev/core/stepper/)
#### Import
`import { Stepper } from '@mantine/core';`
#### Components
- component: `Stepper`
- part: `Stepper.Step`, `Stepper.Completed`
#### Key props (Stepper)
- `active`: number (required) — 0-based index of the active step
- `onStepClick`: `(stepIndex: number) => void` — called when a clickable step is clicked
- `orientation`: `"horizontal" | "vertical"`
- `iconPosition`: `"left" | "right"`
- `allowNextStepsSelect`: boolean — set `false` to block jumping ahead to steps not yet reached
- `color`, `radius`, `size`, `iconSize` — styling controls
- `completedIcon`, `icon`, `progressIcon`: ReactNode — override icons globally
- `contentPadding`: MantineSpacing
- `keepMounted`: boolean — keep all step content mounted
- `wrap`: boolean — allow steps to wrap to next line
#### Key props (Stepper.Step)
- `label`, `description`: ReactNode
- `icon`, `completedIcon`, `progressIcon`: ReactNode — per-step icon overrides
- `allowStepSelect`: boolean — per-step override of selectability
- `loading`: boolean — shows a Loader instead of the icon
- `color`: MantineColor — per-step color override
- `withIcon`: boolean — set `false` to hide the icon for a compact label-only step
- `state`: `"stepInactive" | "stepProgress" | "stepCompleted"` — set automatically by Stepper
#### Syntax
```tsx
<Stepper active={active} onStepClick={setActive} {MODIFIER_PROPS}>
  <Stepper.Step label="{label}" description="{description}">
    {stepContent}
  </Stepper.Step>
  <Stepper.Step label="{label}" description="{description}">
    {stepContent}
  </Stepper.Step>
  <Stepper.Completed>
    {completedContent}
  </Stepper.Completed>
</Stepper>
```
#### Rules
- `Stepper` relies on the order of its `Stepper.Step` children; wrapping `Stepper.Step` in another component breaks rendering of its children — render custom content components as children of `Stepper.Step` instead of wrapping it
- By default users can only navigate to steps already completed; set `allowNextStepsSelect={false}` on `Stepper` or `allowStepSelect` per `Stepper.Step` to control this precisely
- `Stepper.Step` renders a `button` element; if a step has no `label`/`description` (icon-only steps), set `aria-label` or `title` on it for accessibility
- `size` controls icon size plus label/description font size; use `iconSize` separately if only the icon size should change
- `Stepper.Completed` content is shown once `active` exceeds the last step's index
