import { Stack, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import TranscriptSegment from "./TranscriptSegment";
import { VttSegment } from "@/features/transcripts/types";

type TranscriptContentProps = {
  vttSegments: VttSegment[];
};

export function TranscriptContent({ vttSegments }: TranscriptContentProps) {
  const [filteredSegments, setFilteredSegments] = useState(vttSegments);

  const onUpdateQuery = useCallback(
    (query: string) => {
      const newFilteredSegments = query.trim()
        ? vttSegments.filter((segment) =>
            segment.text.toLowerCase().includes(query.trim().toLowerCase()),
          )
        : vttSegments;
      setFilteredSegments(newFilteredSegments);
    },
    [vttSegments],
  );

  return (
    <Stack gap={0}>
      <SegmentFilter updateQuery={onUpdateQuery} />

      <Stack gap={0}>
        {filteredSegments.map((segment) => (
          <TranscriptSegment key={segment.index} segment={segment} />
        ))}
      </Stack>
    </Stack>
  );
}

type SegmentFilterProps = {
  updateQuery: (value: string) => void;
};

function SegmentFilter({ updateQuery }: SegmentFilterProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);

  useEffect(() => {
    updateQuery(debouncedQuery);
  }, [debouncedQuery, updateQuery]);

  return (
    <TextInput
      placeholder="Search in transcript…"
      leftSection={
        <SearchIcon size={14} color="var(--mantine-color-slate-4)" />
      }
      size="sm"
      mb="md"
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      styles={{
        input: {
          borderColor: "var(--mantine-color-slate-2)",
          backgroundColor: "#ffffff",
          color: "var(--mantine-color-slate-8)",
          "&::placeholder": {
            color: "var(--mantine-color-slate-4)",
          },
        },
      }}
    />
  );
}
