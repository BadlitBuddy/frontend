"use client";

import { useState, useMemo } from "react";
import { Box, Stack, Text, Title } from "@mantine/core";
import { TranscriptsFilters } from "@/features/transcripts/components/TranscriptsFilters";
import { TranscriptsTable } from "@/features/transcripts/components/TranscriptsTable";
import { MOCK_TRANSCRIPTS } from "@/features/transcripts/data/mockTranscripts";
import { DurationFilter, Transcript } from "@/features/transcripts/types";
import { MainPageContainer } from "../_components/MainPageContainer";

// Helper to parse duration (MM:SS or HH:MM:SS) to seconds
function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    const [h = 0, m = 0, s = 0] = parts;
    return h * 3600 + m * 60 + s;
  }
  if (parts.length === 2) {
    const [m = 0, s = 0] = parts;
    return m * 60 + s;
  }
  return parts[0] ?? 0;
}

// Preset selection to match the mockup image state on first load
const INITIAL_SELECTED_IDS = new Set<string>(["3", "4"]);

export default function TranscriptsPage() {
  // State for dynamic mock data list (allows deleting items)
  const [transcriptsList, setTranscriptsList] =
    useState<Transcript[]>(MOCK_TRANSCRIPTS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [status, setStatus] = useState("all");
  const [duration, setDuration] = useState<DurationFilter>("all");

  // Selection & Pagination States
  const [selectedIds, setSelectedIds] =
    useState<Set<string>>(INITIAL_SELECTED_IDS);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [prevFilters, setPrevFilters] = useState({
    searchQuery,
    dateRange,
    status,
    duration,
  });

  if (
    prevFilters.searchQuery !== searchQuery ||
    prevFilters.dateRange !== dateRange ||
    prevFilters.status !== status ||
    prevFilters.duration !== duration
  ) {
    setPrevFilters({ searchQuery, dateRange, status, duration });
    setCurrentPage(1);
  }

  // Filtering Logics
  const filteredTranscripts = useMemo(() => {
    return transcriptsList.filter((item) => {
      // 1. Search Query
      if (
        searchQuery.trim() !== "" &&
        !item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Status
      if (status !== "all" && item.status !== status) {
        return false;
      }

      // 3. Duration
      if (duration !== "all") {
        const secs = parseDurationToSeconds(item.duration);
        if (duration === "under5" && secs >= 300) return false;
        if (duration === "fiveTo30" && (secs < 300 || secs > 1800))
          return false;
        if (duration === "thirtyTo60" && (secs <= 1800 || secs > 3600))
          return false;
        if (duration === "over60" && secs <= 3600) return false;
      }

      // 4. Date Range (Mocked filters based on the dataset dates)
      if (dateRange !== "all") {
        if (dateRange === "Last 7 Days") {
          // Oct 18 to Oct 24 in our mock dataset
          const datePart = item.date.split(" ")[1];
          const day = datePart ? parseInt(datePart, 10) : 0;
          if (!item.date.includes("Oct") || day < 18 || day > 24) return false;
        } else if (dateRange === "Last 30 Days") {
          // Show all October dates
          if (!item.date.includes("Oct")) return false;
        } else {
          // Specific Month Selection, e.g., "October 2024" -> contains "Oct"
          const firstWord = dateRange.split(" ")[0];
          const monthQuery = firstWord ? firstWord.substring(0, 3) : ""; // "Oct" or "Sep"
          if (!item.date.includes(monthQuery)) return false;
        }
      }

      return true;
    });
  }, [transcriptsList, searchQuery, status, duration, dateRange]);

  const paginatedTranscripts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTranscripts.slice(start, start + pageSize);
  }, [filteredTranscripts, currentPage]);

  const validSelectedIds = useMemo(() => {
    const next = new Set<string>();
    selectedIds.forEach((id) => {
      if (transcriptsList.some((t) => t.id === id)) {
        next.add(id);
      }
    });
    return next;
  }, [selectedIds, transcriptsList]);

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

  // TODO:
  const handleToggleSelectAll = () => {
    const pageIds = paginatedTranscripts.map((t) => t.id);
    const areAllPageIdsSelected = pageIds.every((id) =>
      validSelectedIds.has(id),
    );

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (areAllPageIdsSelected) {
        // Deselect all items on the current page
        pageIds.forEach((id) => next.delete(id));
      } else {
        // Select all items on the current page
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  // TODO: Implement actual logic
  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // TODO: Implement actual logic
  const handleDownloadSelected = () => {
    const count = validSelectedIds.size;
    const selectedNames = transcriptsList
      .filter((t) => validSelectedIds.has(t.id))
      .map((t) => t.fileName)
      .join("\n");
    alert(`Downloading ${count} files as ZIP:\n\n${selectedNames}`);
  };

  const handleDeleteSelected = () => {
    const count = validSelectedIds.size;
    if (
      confirm(
        `Are you sure you want to delete the ${count} selected transcript${
          count === 1 ? "" : "s"
        }?`,
      )
    ) {
      setTranscriptsList((prev) =>
        prev.filter((t) => !validSelectedIds.has(t.id)),
      );
      setSelectedIds(new Set());
    }
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          status={status}
          onStatusChange={setStatus}
          duration={duration}
          onDurationChange={setDuration}
        />

        <TranscriptsTable
          transcripts={paginatedTranscripts}
          selectedIds={validSelectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onDownloadSelected={handleDownloadSelected}
          onDeleteSelected={handleDeleteSelected}
          onClearSelection={handleClearSelection}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={filteredTranscripts.length}
          pageSize={pageSize}
        />
      </Stack>
    </MainPageContainer>
  );
}
