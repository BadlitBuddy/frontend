"use client";

import { ActionIcon, Text } from "@mantine/core";
import classes from "../styles/TranscriptDetail.module.css";
import { InfoIcon } from "lucide-react";

export default function TranscriptMetadata({
  fileType,
  uploadedBy,
  permissions,
}: {
  fileType: string;
  uploadedBy: string;
  permissions: string;
}) {
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
        <MetadataRow label="File Type" value={fileType} />
        <MetadataRow label="Uploaded By" value={uploadedBy} />
        <MetadataRow label="Permissions" value={permissions} />
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
