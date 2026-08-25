"use client";

import { Box, Button, Group, Loader, Menu, Text } from "@mantine/core";
import {
  CaptionsIcon,
  ChevronDownIcon,
  FileBracesCornerIcon,
  FileTextIcon,
  FolderDownIcon,
} from "lucide-react";
import { TranscriptionExportFormat } from "../helpers/transcriptionExporter";
import classes from "../styles/SelectionBanner.module.css";

interface SelectionBannerProps {
  selectedCount: number;
  onClear: () => void;
  onDownload: (format: TranscriptionExportFormat) => void;
  isDownloading?: boolean;
}

export function SelectionBanner({
  selectedCount,
  onClear,
  onDownload,
  isDownloading = false,
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
          disabled={isDownloading}
        >
          Clear selection
        </Button>
      </Group>

      <Group gap="sm">
        <Menu shadow="md" width={160} disabled={isDownloading}>
          <Menu.Target>
            <Button
              variant="outline"
              size="sm"
              fw="600"
              c="slate.8"
              bd="1px solid slate.3"
              className={classes.downloadButton}
              leftSection={
                isDownloading ? (
                  <Loader size={15} color="slate.6" />
                ) : (
                  <FolderDownIcon size={15} />
                )
              }
              rightSection={
                !isDownloading ? <ChevronDownIcon size={13} /> : undefined
              }
              loading={false}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading…" : "Download as ZIP"}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Export format</Menu.Label>

            <Menu.Item
              leftSection={<FileBracesCornerIcon size={15} />}
              onClick={() => onDownload("json")}
            >
              .json
            </Menu.Item>

            <Menu.Item
              leftSection={<CaptionsIcon size={15} />}
              onClick={() => onDownload("srt")}
            >
              .srt
            </Menu.Item>

            <Menu.Item
              leftSection={<CaptionsIcon size={15} />}
              onClick={() => onDownload("vtt")}
            >
              .vtt
            </Menu.Item>

            <Menu.Item
              leftSection={<FileTextIcon size={15} />}
              onClick={() => onDownload("txt")}
            >
              .txt
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
}
