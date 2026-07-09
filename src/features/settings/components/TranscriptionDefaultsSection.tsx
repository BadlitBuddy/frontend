"use client";

import { useState } from "react";
import { Divider, Paper, Select, Stack, Text } from "@mantine/core";

const LANGUAGE_OPTIONS = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
];

export function TranscriptionDefaultsSection() {
  const [language, setLanguage] = useState<string | null>("en-US");

  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} c="slate.4" lts="0.1em" tt="uppercase">
        Transcription Defaults
      </Text>

      <Paper withBorder p="lg" radius="sm" bg="white" bd="1px solid slate.2">
        <Stack gap="md">
          <Stack gap="xs">
            <Text size="sm" fw={600} c="slate.7">
              Audio Language
            </Text>
            <Select
              value={language}
              onChange={setLanguage}
              data={LANGUAGE_OPTIONS}
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

          <Divider color="slate.1" />
        </Stack>
      </Paper>
    </Stack>
  );
}
