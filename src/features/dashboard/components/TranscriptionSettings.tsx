"use client";

import { useState } from "react";
import { Group, Paper, Select, Stack, Text } from "@mantine/core";
import { Settings2Icon } from "lucide-react";

const LANGUAGE_OPTIONS = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
];
// TODO: get the list of supported languages from the backend instead of hardcoding it here

export function TranscriptionSettings() {
  const [language, setLanguage] = useState<string | null>("en-US");

  return (
    <Paper withBorder p="lg" radius="sm" bg="#ffffff" bd="1px solid slate.2">
      <Stack gap="md">
        <Group gap={8} wrap="nowrap">
          <Settings2Icon size={14} color="var(--mantine-color-slate-5)" />
          <Text size="xs" fw={700} c="slate.5" lts="0.08em" tt="uppercase">
            Transcription Settings
          </Text>
        </Group>

        <Stack gap={6}>
          <Text size="xs" fw={600} c="slate.5" lts="0.07em" tt="uppercase">
            Audio Language
          </Text>
          <Select
            value={language}
            onChange={setLanguage}
            data={LANGUAGE_OPTIONS}
            size="sm"
            radius="sm"
            styles={{
              input: {
                borderColor: "var(--mantine-color-slate-2)",
                color: "var(--mantine-color-slate-9)",
                backgroundColor: "#ffffff",
              },
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
