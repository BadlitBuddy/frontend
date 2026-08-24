"use client";

import { useCallback, useState } from "react";
import { Box, Stack, Text, Title } from "@mantine/core";
import { TranscriptsFilters } from "@/features/transcripts/components/TranscriptsFilters";
import { TranscriptsTable } from "@/features/transcripts/components/TranscriptsTable";
import { useGetTranscripts } from "@/features/transcripts/api/get-transcripts";
import { TranscriptionJobStatus } from "@/features/dashboard/types";
import { MainPageContainer } from "../_components/MainPageContainer";

export default function TranscriptsPage() {
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [status, setStatus] = useState<TranscriptionJobStatus | null>(null);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching } = useGetTranscripts({
    params: {
      page: currentPage,
      limit: pageSize,
      status: status ?? undefined,
      fileName: searchQuery ? searchQuery : undefined,
    },
  });

  const onSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const onSetStatus = useCallback((status: TranscriptionJobStatus | null) => {
    setStatus(status);
    setCurrentPage(1);
  }, []);

  const transcripts = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    const pageIds = transcripts.map((t) => t.id);
    const areAllPageIdsSelected =
      pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (areAllPageIdsSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleDownloadSelected = () => {
    const count = selectedIds.size;
    const selectedNames = transcripts
      .filter((t) => selectedIds.has(t.id))
      .map((t) => t.fileName)
      .join("\n");
    alert(`Downloading ${count} files as ZIP:\n\n${selectedNames}`);
  };

  return (
    <MainPageContainer>
      <Stack gap="xl">
        <Box>
          <Title
            order={1}
            fz="1.875rem"
            c="slate.9"
            fw="800"
            style={{
              lineHeight: 1.2,
            }}
          >
            Transcripts
          </Title>
          <Text size="sm" mt={4} c="slate.5">
            Your transcripts log.
          </Text>
        </Box>

        <TranscriptsFilters
          onSearchChange={onSetSearchQuery}
          onStatusChange={onSetStatus}
        />

        <TranscriptsTable
          transcripts={transcripts}
          isLoading={isLoading}
          isFetching={isFetching}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onDownloadSelected={handleDownloadSelected}
          onClearSelection={handleClearSelection}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      </Stack>
    </MainPageContainer>
  );
}
