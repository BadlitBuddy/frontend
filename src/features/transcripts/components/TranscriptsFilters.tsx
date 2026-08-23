"use client";

import { Group, Menu, Text, TextInput } from "@mantine/core";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import classes from "../styles/Transcripts.module.css";
import {
  TranscriptionJobStatus,
  TranscriptionStatusLabels,
} from "@/features/dashboard/types";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

type TranscriptsFiltersProps = {
  onSearchChange: (val: string) => void;
  onStatusChange: (val: TranscriptionJobStatus | null) => void;
};

export function TranscriptsFilters({
  onSearchChange,
  onStatusChange,
}: TranscriptsFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);
  const [status, setStatus] = useState<TranscriptionJobStatus | null>(null);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleStatusChange = (newStatus: TranscriptionJobStatus | null) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <Group justify="space-between" align="center" gap="md" wrap="wrap">
      <Group gap="sm" wrap="wrap" style={{ flex: 1, minWidth: 280 }}>
        <TextInput
          placeholder="Search by file name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={
            <SearchIcon size={14} color="var(--mantine-color-slate-4)" />
          }
          styles={{
            input: {
              height: 36,
              fontSize: "0.875rem",
              borderRadius: "var(--mantine-radius-sm)",
              border: "1px solid var(--mantine-color-slate-2)",
              backgroundColor: "#ffffff",
              "&::placeholder": {
                color: "var(--mantine-color-slate-4)",
              },
              "&:focus": {
                borderColor: "var(--mantine-color-slate-9)",
              },
            },
          }}
          style={{ width: "100%", maxWidth: 250 }}
        />

        <Menu shadow="md" width={180}>
          <Menu.Target>
            <button className={classes.filterButton}>
              <Text span truncate size="sm">
                {status === null ? "All" : TranscriptionStatusLabels[status]}
              </Text>
              <ChevronDownIcon
                size={14}
                color="var(--mantine-color-slate-4)"
                style={{ flexShrink: 0 }}
              />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleStatusChange(null)}>All</Menu.Item>
            <Menu.Item
              onClick={() =>
                handleStatusChange(TranscriptionJobStatus.Completed)
              }
            >
              Completed
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                handleStatusChange(TranscriptionJobStatus.Processing)
              }
            >
              Processing
            </Menu.Item>
            <Menu.Item
              onClick={() => handleStatusChange(TranscriptionJobStatus.Failed)}
            >
              Failed
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
