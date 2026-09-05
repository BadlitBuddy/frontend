import {
  createTheme,
  DefaultMantineColor,
  MantineColorsTuple,
} from "@mantine/core";

export const badlitBuddyTheme = createTheme({
  primaryColor: "slate",
  primaryShade: { light: 9, dark: 0 },
  fontFamily:
    "var(--font-hanken-grotesk), system-ui, -apple-system, sans-serif",
  fontFamilyMonospace: "var(--font-jetbrains-mono), monospace",
  headings: {
    fontFamily:
      "var(--font-hanken-grotesk), system-ui, -apple-system, sans-serif",
  },
  colors: {
    slate: [
      "#f8fafc", // 0
      "#f1f5f9", // 1
      "#e2e8f0", // 2
      "#cbd5e1", // 3
      "#94a3b8", // 4
      "#64748b", // 5
      "#475569", // 6
      "#334155", // 7
      "#1e293b", // 8
      "#0f172a", // 9
    ],
    success: [
      "#f0fdf4", // 0
      "#dcfce7", // 1
      "#bbf7d0", // 2
      "#86efac", // 3
      "#4ade80", // 4
      "#22c55e", // 5
      "#16a34a", // 6
      "#15803d", // 7
      "#166534", // 8
      "#14532d", // 9
    ],
    warning: [
      "#fefbeb", // 0
      "#fef3c7", // 1
      "#fde68a", // 2
      "#fcd34d", // 3
      "#facc15", // 4
      "#eab308", // 5
      "#ca8a04", // 6
      "#a16207", // 7
      "#854d0e", // 8
      "#713f12", // 9
    ],
    error: [
      "#fef2f2", // 0
      "#fee2e2", // 1
      "#fecaca", // 2
      "#fca5a5", // 3
      "#f87171", // 4
      "#ef4444", // 5
      "#dc2626", // 6
      "#b91c1c", // 7
      "#991b1b", // 8
      "#7f1d1d", // 9
    ],
  },
  defaultRadius: "sm",
});

type ExtendedCustomColors =
  | "slate"
  | "success"
  | "warning"
  | "error"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
