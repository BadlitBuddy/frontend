import { Box } from "@mantine/core";

export function MainPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box maw={1024} mx="auto" px="xl">
      {children}
    </Box>
  );
}
