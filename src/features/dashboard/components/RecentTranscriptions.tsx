"use client";

import { Anchor, Badge, Box, Group, Skeleton, Table, Text } from "@mantine/core";
import { AudioWaveformIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useGetTranscripts } from "@/features/transcripts/api/get-transcripts";
import { TranscriptionJobStatus } from "../types";
import classes from "../styles/RecentTranscriptions.module.css";

function StatusBadge({ status }: { status: TranscriptionJobStatus }) {
  if (status === TranscriptionJobStatus.Completed) {
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

  if (status === TranscriptionJobStatus.Processing) {
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
    <Badge variant="dot" size="sm" color="slate.5">
      Uploaded
    </Badge>
  );
}

function RowAction({
  id,
  fileName,
  status,
}: {
  id: string;
  fileName: string;
  status: TranscriptionJobStatus;
}) {
  if (status === TranscriptionJobStatus.Processing) {
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
        href={`/transcripts/${encodeURIComponent(id)}`}
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
        aria-label={`Download ${fileName}`}
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
  const { data, isLoading } = useGetTranscripts({
    params: { page: 1, limit: 5 },
  });

  const transcripts = data?.items || [];

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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Skeleton height={20} radius="sm" />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={20} radius="sm" />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={20} radius="sm" />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={20} radius="sm" />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={20} radius="sm" />
                </Table.Td>
              </Table.Tr>
            ))
          ) : transcripts.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text size="sm" c="slate.5" py="md" >
                  No transcripts found.
                </Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            transcripts.map((item) => {
              const id = item.unprocessedObjectKey;
              const fileName = item.originalUnprocessedFileName;
              const status = item.jobStatus;
              // TODO: Replace mocked duration with actual duration when available
              const mockedDuration = "--:--";
              const mockedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <Table.Tr
                  key={id}
                  style={{
                    cursor: status === TranscriptionJobStatus.Completed ? "pointer" : "default",
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
                        {fileName}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Text size="sm" c="slate.5">
                      {mockedDate}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text
                      size="sm"
                      c="slate.6"
                      ff="var(--font-jetbrains-mono), monospace"
                      fz="0.82rem"
                    >
                      {mockedDuration}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <StatusBadge status={status} />
                  </Table.Td>

                  <Table.Td>
                    <RowAction id={id} fileName={fileName} status={status} />
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
