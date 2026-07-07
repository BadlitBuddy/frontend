"use client";

import {
  Anchor,
  Badge,
  Box,
  Checkbox,
  Group,
  Pagination,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { AudioWaveformIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { SelectionBanner } from "./SelectionBanner";
import { Transcript, TranscriptStatus } from "../types";
import classes from "../styles/Transcripts.module.css";

interface TranscriptsTableProps {
  transcripts: Transcript[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onDownloadSelected: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize: number;
}

function StatusBadge({ status }: { status: TranscriptStatus }) {
  if (status === "completed") {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="slate.6"
        bg="slate.1"
        c="slate.7"
        bd="1px solid slate.2"
        tt="uppercase"
        fw={700}
        fz="0.65rem"
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
        color="blue.6"
        bg="blue.0"
        c="blue.7"
        bd="1px solid blue.2"
        tt="uppercase"
        lts="0.06em"
        fw={700}
        fz="0.65rem"
      >
        Processing
      </Badge>
    );
  }

  return (
    <Badge
      variant="dot"
      size="sm"
      color="error.6"
      bg="error.0"
      c="error.7"
      bd="1px solid error.2"
      tt="uppercase"
      lts="0.06em"
      fw={700}
      fz="0.65rem"
    >
      Failed
    </Badge>
  );
}

// TODO: Implement with actual functionality
function RowAction({
  transcript,
  onReTranscribe,
}: {
  transcript: Transcript;
  onReTranscribe: (id: string) => void;
}) {
  if (transcript.status === "processing") {
    return (
      <Text size="xs" fw={600} c="slate.4" lts="0.04em" tt="uppercase" pr="md">
        Please wait…
      </Text>
    );
  }

  if (transcript.status === "failed") {
    return (
      <UnstyledButton
        onClick={() => onReTranscribe(transcript.id)}
        c="error.7"
        fw={700}
        fz="0.75rem"
        lts="0.04em"
        style={{
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = "underline")
        }
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        Re-transcribe
      </UnstyledButton>
    );
  }

  return (
    <Group gap={8} justify="flex-end" pr="xs">
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
        bg="none"
        bd="none"
        p={0}
        display="flex"
        c="slate.4"
        style={{
          cursor: "pointer",
          alignItems: "center",
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

export function TranscriptsTable({
  transcripts,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onDownloadSelected,
  onDeleteSelected,
  onClearSelection,
  currentPage,
  onPageChange,
  totalCount,
  pageSize,
}: TranscriptsTableProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  const isAllSelected =
    transcripts.length > 0 && transcripts.every((t) => selectedIds.has(t.id));

  const handleReTranscribe = (id: string) => {
    // TODO: Implement actual re-transcription logic here
    alert(`Re-transcribing transcript ${id}...`);
  };

  return (
    <Box className={classes.tableCard}>
      <SelectionBanner
        selectedCount={selectedIds.size}
        onClear={onClearSelection}
        onDownload={onDownloadSelected}
        onDelete={onDeleteSelected}
      />

      <Table
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="md"
        styles={{
          tr: {
            borderBottom: "1px solid var(--mantine-color-slate-2)",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr bg="transparent">
            <Table.Th
              className={classes.cellCheckbox}
              w={40}
              style={{ verticalAlign: "middle" }}
            >
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  selectedIds.size > 0 &&
                  selectedIds.size < transcripts.length &&
                  !isAllSelected
                }
                onChange={onToggleSelectAll}
              />
            </Table.Th>
            <Table.Th className={classes.tableHeader}>File Name</Table.Th>
            <Table.Th className={classes.tableHeader}>Date</Table.Th>
            <Table.Th className={classes.tableHeader}>Duration</Table.Th>
            <Table.Th className={classes.tableHeader}>Status</Table.Th>
            <Table.Th ta="right" pr="1.5rem" className={classes.tableHeader}>
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {transcripts.length === 0 ? (
            <Table.Tr style={{ cursor: "default" }}>
              <Table.Td colSpan={6} ta="center" pb="2rem">
                <Text size="sm" c="slate.4" fw={500}>
                  No transcripts found matching your search and filters.
                </Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            transcripts.map((transcript) => {
              const isChecked = selectedIds.has(transcript.id);
              return (
                <Table.Tr key={transcript.id} style={{ cursor: "default" }}>
                  <Table.Td
                    className={classes.cellCheckbox}
                    style={{ verticalAlign: "middle" }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={() => onToggleSelect(transcript.id)}
                    />
                  </Table.Td>
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
                        ff="monospace"
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
                    <Text size="sm" c="slate.6" ff="monospace" fz="0.8rem">
                      {transcript.duration}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <StatusBadge status={transcript.status} />
                  </Table.Td>

                  <Table.Td ta="right">
                    <RowAction
                      transcript={transcript}
                      onReTranscribe={handleReTranscribe}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>

      {totalPages > 0 && (
        <Group
          justify="space-between"
          px="md"
          py="sm"
          style={{
            borderTop: "1px solid var(--mantine-color-slate-2)",
            backgroundColor: "#ffffff",
          }}
        >
          <Text size="sm" c="slate.5" fw={500}>
            Showing {startIndex}-{endIndex} of {totalCount}
          </Text>

          <Pagination.Root
            total={totalPages}
            value={currentPage}
            onChange={onPageChange}
            size="sm"
            classNames={{ control: classes.control }}
          >
            <Group gap={6}>
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
            </Group>
          </Pagination.Root>
        </Group>
      )}
    </Box>
  );
}
