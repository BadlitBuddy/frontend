"use client";

import { Group, Text } from "@mantine/core";
import classes from "../styles/TranscriptDetail.module.css";
import { VttSegment } from "@/features/transcripts/types";

type TranscriptSegmentProps = {
  segment: VttSegment;
};

export default function TranscriptSegment({ segment }: TranscriptSegmentProps) {
  return (
    <div className={`${classes.segment} ${false ? classes.segmentActive : ""}`}>
      <Group gap={8} mb={6}>
        <Text fz="0.78rem" fw={700} c="slate.9" ff="monospace">
          {segment.startTime} - {segment.endTime}
        </Text>
        <Text fz="0.82rem" fw={700} c="slate.8">
          {segment.voice}:
        </Text>
      </Group>
      <SegmentText text={segment.text} />
    </div>
  );
}

type SegmentTextProps = {
  text: string;
  highlight?: { start: number; end: number };
};

function SegmentText({ text, highlight }: SegmentTextProps) {
  if (!highlight) {
    return (
      <Text size="sm" c="slate.7" lh={1.7}>
        {text}
      </Text>
    );
  }

  const before = text.slice(0, highlight.start);
  const marked = text.slice(highlight.start, highlight.end);
  const after = text.slice(highlight.end);

  return (
    <Text size="sm" c="slate.7" lh={1.7}>
      {before}
      <mark className={classes.highlight}>{marked}</mark>
      {after}
    </Text>
  );
}
