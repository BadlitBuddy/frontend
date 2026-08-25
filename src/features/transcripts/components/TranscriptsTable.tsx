"use client";

import {
  Box,
  Checkbox,
  Group,
  Pagination,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { AudioWaveformIcon } from "lucide-react";
import { SelectionBanner } from "./SelectionBanner";
import { TranscriptDto } from "../api/get-transcripts";
import classes from "../styles/Transcripts.module.css";
import { TranscriptStatusBadge } from "./TranscriptStatusBadge";
import { RowAction } from "./TranscriptRowAction";
import { TranscriptionExportFormat } from "../helpers/transcriptionExporter";

interface TranscriptsTableProps {
  transcripts: TranscriptDto[];
  isLoading?: boolean;
  isFetching?: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onDownloadSelected: (format: TranscriptionExportFormat) => void;
  onClearSelection: () => void;
  isDownloadingZip?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize: number;
}

export function TranscriptsTable({
  transcripts,
  isLoading = false,
  isFetching = false,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onDownloadSelected,
  onClearSelection,
  isDownloadingZip = false,
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

  return (
    <Box className={classes.tableCard}>
      <SelectionBanner
        selectedCount={selectedIds.size}
        onClear={onClearSelection}
        onDownload={onDownloadSelected}
        isDownloading={isDownloadingZip}
      />

      <Table
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="md"
        style={{
          opacity: isFetching && !isLoading ? 0.6 : 1,
          transition: "opacity 150ms",
        }}
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
                disabled={isLoading || transcripts.length === 0}
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
          {isLoading ? (
            Array.from({ length: pageSize > 5 ? 5 : pageSize }).map(
              (_, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Skeleton height={18} width={18} radius="xs" />
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
                  <Table.Td>
                    <Skeleton height={20} radius="sm" />
                  </Table.Td>
                </Table.Tr>
              ),
            )
          ) : transcripts.length === 0 ? (
            <Table.Tr style={{ cursor: "default" }}>
              <Table.Td colSpan={6} ta="center" py="2rem">
                <Text size="sm" c="slate.4" fw={500}>
                  No transcripts found.
                </Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            transcripts.map((transcript) => {
              const isChecked = selectedIds.has(transcript.id);
              const createdAt = transcript.createdAt
                ? new Date(transcript.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—";
              const duration = transcript.duration
                ? transcript.duration.substring(0, 8)
                : "00:00:00";

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
                        ff="var(--font-jetbrains-mono), monospace"
                        fz="0.8rem"
                      >
                        {transcript.fileName}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Text size="sm" c="slate.5">
                      {createdAt}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text
                      size="sm"
                      c="slate.6"
                      ff="var(--font-jetbrains-mono), monospace"
                      fz="0.82rem"
                    >
                      {duration}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <TranscriptStatusBadge status={transcript.jobStatus} />
                  </Table.Td>

                  <Table.Td ta="right">
                    <RowAction
                      transcriptId={transcript.id}
                      fileName={transcript.fileName}
                      status={transcript.jobStatus}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>

      {!isLoading && totalPages > 0 && (
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
