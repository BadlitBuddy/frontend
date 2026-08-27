"use client";

import { Anchor, Group, Text } from "@mantine/core";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { DownloadMenu } from "@/features/transcripts/components/DownloadMenu";

interface ActionBarProps {
  fileName: string;
  transcriptId: string;
}

export default function ActionBar({ fileName, transcriptId }: ActionBarProps) {
  return (
    <Group
      justify="space-between"
      px="xl"
      py="sm"
      bg="white"
      mx="-xl"
      mt="-xl"
      style={{
        borderBottom: "1px solid var(--mantine-color-slate-2)",
      }}
    >
      <Group gap={8}>
        <Anchor
          component={Link}
          href="/transcripts"
          fz="0.8rem"
          fw={600}
          c="slate.5"
          td="none"
          style={{ transition: "color 100ms ease" }}
        >
          Transcript
        </Anchor>
        <ChevronRightIcon size={12} color="var(--mantine-color-slate-4)" />
        <Text fz="0.8rem" fw={600} c="slate.8" truncate maw={300}>
          {fileName}
        </Text>
      </Group>

      <Group gap="xs">
        <DownloadMenu transcriptId={transcriptId} variant="button" />

        {/* <Button
          variant="default"
          size="xs"
          leftSection={<SparklesIcon size={13} />}
          c="slate.7"
          styles={{
            root: {
              borderColor: "var(--mantine-color-slate-2)",
            },
          }}
        >
          Summarize with AI
        </Button> */}
      </Group>
    </Group>
  );
}
