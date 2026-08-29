"use client";

import { ActionIcon, Text } from "@mantine/core";
import classes from "../styles/TranscriptDetail.module.css";
import { InfoIcon } from "lucide-react";

type TranscriptMetadataProps = {
  fileName: string;
  duration: string;
  wordCount: number;
  language: string;
};

export default function TranscriptMetadata({
  fileName,
  duration,
  wordCount,
  language,
}: TranscriptMetadataProps) {
  return (
    <div className={classes.sidebarCard}>
      <div className={classes.sidebarCardHeader}>
        <Text fz="0.65rem" fw={700} c="slate.4" tt="uppercase" lts="0.08em">
          Project Metadata
        </Text>

        <ActionIcon
          variant="subtle"
          color="slate"
          size="xs"
          aria-label="Metadata info"
        >
          <InfoIcon size={13} />
        </ActionIcon>
      </div>
      <div className={classes.sidebarCardBody}>
        <MetadataRow label="File Name" value={fileName} />
        <MetadataRow label="Duration" value={duration.slice(0, 8)} />
        <MetadataRow label="Word Count" value={wordCount.toString()} />
        <MetadataRow label="Language" value={language} />
      </div>
    </div>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={classes.metaRow}>
      <div className={classes.metaLabel}>{label}</div>
      <div className={classes.metaValue}>{value}</div>
    </div>
  );
}
