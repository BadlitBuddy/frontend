"use client";

import { useState } from "react";
import { Paper, Select, Stack, Text } from "@mantine/core";

const FORMAT_OPTIONS = [
  { value: "txt", label: "TXT" },
  { value: "pdf", label: "PDF" },
  { value: "srt", label: "SRT" },
  { value: "vtt", label: "VTT" },
];

export function ExportDefaultsSection() {
  const [format, setFormat] = useState<string | null>("txt");

  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} c="slate.4" lts="0.1em" tt="uppercase">
        Export Defaults
      </Text>
      <Paper withBorder p="lg" radius="sm" bg="white" bd="1px solid slate.2">
        <Stack gap="md">
          <Stack gap="xs">
            <Text size="sm" fw={600} c="slate.7">
              Default Format
            </Text>
            <Select
              value={format}
              onChange={setFormat}
              data={FORMAT_OPTIONS}
              size="sm"
              radius="sm"
              c="slate.9"
              styles={{
                input: {
                  borderColor: "var(--mantine-color-slate-2)",
                },
              }}
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
