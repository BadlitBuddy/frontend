"use client";

import { Box, Group, Menu, Text, TextInput } from "@mantine/core";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import classes from "../styles/Transcripts.module.css";
import { DurationFilter } from "../types";

interface TranscriptsFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  dateRange: string;
  onDateRangeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  duration: DurationFilter;
  onDurationChange: (val: DurationFilter) => void;
}

export function TranscriptsFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange,
  duration,
  onDurationChange,
}: TranscriptsFiltersProps) {
  const dateRangeLabel =
    dateRange === "all" ? "Date range" : `Date: ${dateRange}`;

  const statusLabel =
    status === "all"
      ? "Status: All"
      : `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`;

  // TODO: put this in a constant and write actual types for it
  const durationOptions: { label: string; value: DurationFilter }[] = [
    { label: "All", value: "all" },
    { label: "<5 min", value: "under5" },
    { label: "5-30", value: "fiveTo30" },
    { label: "30-60", value: "thirtyTo60" },
    { label: "60+", value: "over60" },
  ];

  return (
    <Group justify="space-between" align="center" gap="md" wrap="wrap">
      <Group gap="sm" wrap="wrap" style={{ flex: 1, minWidth: 280 }}>
        <TextInput
          placeholder="Search by file name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
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

        {/* //TODO: use an enum for this */}
        <Menu shadow="md" width={180}>
          <Menu.Target>
            <button className={classes.filterButton}>
              <Text span truncate size="sm">
                {dateRangeLabel}
              </Text>
              <ChevronDownIcon
                size={14}
                color="var(--mantine-color-slate-4)"
                style={{ flexShrink: 0 }}
              />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onDateRangeChange("all")}>
              All Dates
            </Menu.Item>
            <Menu.Item onClick={() => onDateRangeChange("Last 7 Days")}>
              Last 7 Days
            </Menu.Item>
            <Menu.Item onClick={() => onDateRangeChange("Last 30 Days")}>
              Last 30 Days
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* //TODO: use an enum for this */}
        <Menu shadow="md" width={180}>
          <Menu.Target>
            <button className={classes.filterButton}>
              <Text span truncate size="sm">
                {statusLabel}
              </Text>
              <ChevronDownIcon
                size={14}
                color="var(--mantine-color-slate-4)"
                style={{ flexShrink: 0 }}
              />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onStatusChange("all")}>
              All Statuses
            </Menu.Item>
            <Menu.Item onClick={() => onStatusChange("completed")}>
              Completed
            </Menu.Item>
            <Menu.Item onClick={() => onStatusChange("processing")}>
              Processing
            </Menu.Item>
            <Menu.Item onClick={() => onStatusChange("failed")}>
              Failed
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Box
          display="flex"
          style={{
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Text
            fz="0.65rem"
            fw={700}
            lts=" 0.08em"
            c="slate.4"
            tt="uppercase"
            mr="4px"
          >
            Duration
          </Text>
          {durationOptions.map((opt) => (
            <button
              key={opt.value}
              className={`${classes.durationPill} ${
                duration === opt.value ? classes.durationPillActive : ""
              }`}
              onClick={() => onDurationChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </Box>
      </Group>
    </Group>
  );
}
