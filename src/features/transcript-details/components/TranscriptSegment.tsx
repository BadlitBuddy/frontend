"use client";

import { Group, Text } from "@mantine/core";
import { TranscriptSegment as TranscriptSegmentType } from "../types";
import classes from "../styles/TranscriptDetail.module.css";

export default function TranscriptSegment({
  segment,
}: {
  segment: TranscriptSegmentType;
}) {
  return (
    <div
      className={`${classes.segment} ${segment.active ? classes.segmentActive : ""}`}
    >
      <Group gap={8} mb={6}>
        <Text fz="0.78rem" fw={700} c="slate.9" ff="monospace">
          {segment.time}
        </Text>
        <Text fz="0.82rem" fw={700} c="slate.8">
          {segment.speaker}:
        </Text>
      </Group>
      <SegmentText text={segment.text} highlight={segment.highlight} />
    </div>
  );
}

function SegmentText({
  text,
  highlight,
}: {
  text: string;
  highlight?: { start: number; end: number };
}) {
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
