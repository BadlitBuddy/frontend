"use client";

import { Box, Stack } from "@mantine/core";
import classes from "@/features/transcript-details/styles/TranscriptDetail.module.css";
import ActionBar from "@/features/transcript-details/components/ActionBar";
import { AudioControls } from "@/features/transcript-details/components/AudioControls";
import TranscriptMetadata from "@/features/transcript-details/components/TranscriptMetadata";
import AIInsightsCard from "@/features/transcript-details/components/AIInsightsCard";
import { useParams, useSearchParams } from "next/navigation";
import { TranscriptContent } from "@/features/transcript-details/components/TranscriptContent";
import { useGetTranscript } from "@/features/transcripts/api/get-transcript";

export default function TranscriptDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const transcriptId = Array.isArray(params.transcriptId)
    ? (params.transcriptId[0] ?? "")
    : (params.transcriptId ?? "");
  const fileName = searchParams.get("fileName");

  const { data, isLoading } = useGetTranscript({
    id: transcriptId,
    includeSrtSegments: false,
    includeVttSegments: true,
  });

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  const duration = data?.metaData?.duration ?? "00:00:00";
  const wordCount = data?.metaData?.wordCount ?? 0;
  const language = data?.metaData?.language ?? "Unknown";

  return (
    <Stack gap={0}>
      <ActionBar fileName={fileName || ""} transcriptId={transcriptId} />

      <AudioControls transcriptId={transcriptId} fileName={fileName} />

      <Box pt="xl">
        <div className={classes.layout}>
          {data?.vttSegments ? (
            <TranscriptContent vttSegments={data.vttSegments} />
          ) : (
            <div>No transcript data available.</div>
          )}

          <Stack gap="md">
            <TranscriptMetadata
              fileName={fileName || "unknown"}
              duration={duration}
              wordCount={wordCount}
              language={language}
            />
            {/* TODO: Implement AI Insights card */}
            {/* <AIInsightsCard /> */}
          </Stack>
        </div>
      </Box>
    </Stack>
  );
}
