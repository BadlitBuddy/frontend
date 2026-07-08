"use client";

import { Anchor, Button, Group, Text } from "@mantine/core";
import Link from "next/link";
import {
  ChevronRightIcon,
  DownloadIcon,
  MessageSquareIcon,
  ShareIcon,
  SparklesIcon,
} from "lucide-react";

interface ActionBarProps {
  fileName: string;
}

export default function ActionBar({ fileName }: ActionBarProps) {
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
          TranscriptionPro
        </Anchor>
        <ChevronRightIcon size={12} color="var(--mantine-color-slate-4)" />
        <Text fz="0.8rem" fw={600} c="slate.8" truncate maw={300}>
          {fileName}
        </Text>
      </Group>

      <Group gap="xs">
        <Button
          variant="filled"
          color="slate.9"
          size="xs"
          // TODO: Implement download functionality
          leftSection={<DownloadIcon size={13} />}
        >
          Download
        </Button>

        <Button
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
        </Button>

        <Button
          variant="default"
          size="xs"
          leftSection={<ShareIcon size={13} />}
          c="slate.7"
          styles={{
            root: {
              borderColor: "var(--mantine-color-slate-2)",
            },
          }}
        >
          Share
        </Button>

        <Button
          variant="default"
          size="xs"
          leftSection={<MessageSquareIcon size={13} />}
          c="slate.7"
          styles={{
            root: {
              borderColor: "var(--mantine-color-slate-2)",
            },
          }}
        >
          Comments (3)
        </Button>
      </Group>
    </Group>
  );
}
