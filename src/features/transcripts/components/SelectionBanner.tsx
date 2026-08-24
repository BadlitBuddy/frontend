"use client";

import { Box, Button, Group, Text } from "@mantine/core";
import { FolderDownIcon } from "lucide-react";
import classes from "../styles/SelectionBanner.module.css";

interface SelectionBannerProps {
  selectedCount: number;
  onClear: () => void;
  onDownload: () => void;
}

export function SelectionBanner({
  selectedCount,
  onClear,
  onDownload,
}: SelectionBannerProps) {
  if (selectedCount === 0) return null;

  return (
    <Box className={classes.selectionBanner}>
      <Group gap="sm">
        <Text fz="0.875rem" c="slate.9" fw={700}>
          {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
        </Text>
        <Button
          variant="subtle"
          color="slate.6"
          size="sm"
          fw="600"
          c="slate.7"
          onClick={onClear}
        >
          Clear selection
        </Button>
      </Group>

      <Group gap="sm">
        <Button
          variant="outline"
          size="sm"
          fw="600"
          c="slate.8"
          bd="1px solid slate.3"
          className={classes.downloadButton}
          leftSection={<FolderDownIcon size={15} />}
          onClick={onDownload}
        >
          Download as ZIP
        </Button>
      </Group>
    </Box>
  );
}
