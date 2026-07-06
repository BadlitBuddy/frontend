"use client";

import { Anchor, Badge, Box, Group, Table, Text } from "@mantine/core";
import { AudioWaveformIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import type { Transcript, TranscriptStatus } from "../types";
import classes from "../styles/RecentTranscriptions.module.css";

// TODO: fetch recent transcripts from the backend instead of hardcoding them here
const RECENT_TRANSCRIPTS: Transcript[] = [
  {
    id: "1",
    fileName: "Weekly_Product_Sync_23_Oct.mp3",
    fileType: "mp3",
    date: "Oct 23, 2024",
    duration: "42:15",
    status: "completed",
  },
  {
    id: "2",
    fileName: "Client_Interview_Jane_Doe.mp4",
    fileType: "mp4",
    date: "Oct 22, 2024",
    duration: "18:04",
    status: "completed",
  },
  {
    id: "3",
    fileName: "Internal_Strategy_Workshop.wav",
    fileType: "wav",
    date: "Oct 24, 2024",
    duration: "124:30",
    status: "processing",
  },
  {
    id: "4",
    fileName: "User_Testing_Session_04.mp3",
    fileType: "mp3",
    date: "Oct 20, 2024",
    duration: "25:12",
    status: "completed",
  },
];

function StatusBadge({ status }: { status: TranscriptStatus }) {
  if (status === "completed") {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="success.7"
        styles={{
          root: {
            backgroundColor: "var(--mantine-color-success-0)",
            color: "var(--mantine-color-success-7)",
            border: "1px solid var(--mantine-color-success-2)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        Completed
      </Badge>
    );
  }

  if (status === "processing") {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="warning.6"
        styles={{
          root: {
            backgroundColor: "var(--mantine-color-warning-0)",
            color: "var(--mantine-color-warning-7)",
            border: "1px solid var(--mantine-color-warning-2)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        Processing
      </Badge>
    );
  }

  return (
    <Badge variant="dot" size="sm" color="error.6">
      Failed
    </Badge>
  );
}

function RowAction({ transcript }: { transcript: Transcript }) {
  if (transcript.status === "processing") {
    return (
      <Text size="xs" fw={600} c="slate.4" lts="0.04em" tt="uppercase">
        Please wait…
      </Text>
    );
  }

  return (
    <Group gap={8} justify="flex-end">
      <Anchor
        component={Link}
        href={`/transcripts/${transcript.id}`}
        size="xs"
        fw={700}
        underline="hover"
        c="slate.9"
        lts="0.04em"
        tt="uppercase"
      >
        View
      </Anchor>
      <Box
        component="button"
        aria-label={`Download ${transcript.fileName}`}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "var(--mantine-color-slate-4)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--mantine-color-slate-7)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--mantine-color-slate-4)")
        }
      >
        <DownloadIcon size={14} />
      </Box>
    </Group>
  );
}

export function RecentTranscriptions() {
  return (
    <Box>
      <Group justify="space-between" mb="sm">
        <Text fw={700} size="lg" c="slate.9">
          Recent Transcriptions
        </Text>
        <Anchor
          component={Link}
          href="/transcripts"
          size="xs"
          fw={700}
          c="slate.5"
          td="none"
          tt="uppercase"
          lts="0.06em"
          display="flex"
          style={{
            alignItems: "center",
            gap: 4,
          }}
        >
          View All →
        </Anchor>
      </Group>

      <Table
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="md"
        style={{
          borderTop: "1px solid var(--mantine-color-slate-2)",
          borderBottom: "1px solid var(--mantine-color-slate-2)",
        }}
        styles={{
          tr: {
            borderBottom: "1px solid var(--mantine-color-slate-1)",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr style={{ backgroundColor: "transparent" }}>
            <Table.Th className={classes.tableHeader}>File Name</Table.Th>
            <Table.Th className={classes.tableHeader}>Date</Table.Th>
            <Table.Th className={classes.tableHeader}>Duration</Table.Th>
            <Table.Th className={classes.tableHeader}>Status</Table.Th>
            <Table.Th className={classes.tableHeader}>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {RECENT_TRANSCRIPTS.map((transcript) => (
            <Table.Tr
              key={transcript.id}
              style={{
                cursor:
                  transcript.status === "completed" ? "pointer" : "default",
              }}
            >
              <Table.Td>
                <Group gap="xs" wrap="nowrap">
                  <AudioWaveformIcon
                    size={16}
                    color="var(--mantine-color-slate-4)"
                  />
                  <Text
                    size="sm"
                    fw={500}
                    c="slate.8"
                    ff="var(--font-jetbrains-mono), monospace"
                    fz="0.8rem"
                  >
                    {transcript.fileName}
                  </Text>
                </Group>
              </Table.Td>

              <Table.Td>
                <Text size="sm" c="slate.5">
                  {transcript.date}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text
                  size="sm"
                  c="slate.6"
                  ff="var(--font-jetbrains-mono), monospace"
                  fz="0.82rem"
                >
                  {transcript.duration}
                </Text>
              </Table.Td>

              <Table.Td>
                <StatusBadge status={transcript.status} />
              </Table.Td>

              <Table.Td>
                <RowAction transcript={transcript} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
