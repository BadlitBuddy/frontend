import { useTranscriptionDownload } from "@/features/transcripts/hooks/useTranscriptionDownload";
import { Box, Loader, Menu } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  CaptionsIcon,
  DownloadIcon,
  FileBracesCornerIcon,
  FileTextIcon,
} from "lucide-react";

type DownloadMenuProps = {
  transcriptId: string;
};
export function DownloadMenu({ transcriptId }: DownloadMenuProps) {
  const queryClient = useQueryClient();

  const { handleDownload, downloading } = useTranscriptionDownload({
    transcriptId,
    queryClient,
  });

  const isLoading = (format: string) => downloading === format;

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <Box component="span" style={{ display: "inline-flex" }}>
          {downloading ? (
            <Loader size={16} color="slate.5" />
          ) : (
            <DownloadIcon size={16} />
          )}
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Export Formats</Menu.Label>

        <Menu.Item
          leftSection={
            isLoading("json") ? (
              <Loader size={16} />
            ) : (
              <FileBracesCornerIcon size={16} />
            )
          }
          onClick={() => handleDownload("json")}
          disabled={!!downloading}
        >
          .json
        </Menu.Item>

        <Menu.Item
          leftSection={
            isLoading("srt") ? <Loader size={16} /> : <CaptionsIcon size={16} />
          }
          onClick={() => handleDownload("srt")}
          disabled={!!downloading}
        >
          .srt
        </Menu.Item>

        <Menu.Item
          leftSection={
            isLoading("vtt") ? <Loader size={16} /> : <CaptionsIcon size={16} />
          }
          onClick={() => handleDownload("vtt")}
          disabled={!!downloading}
        >
          .vtt
        </Menu.Item>

        <Menu.Item
          leftSection={
            isLoading("txt") ? <Loader size={16} /> : <FileTextIcon size={16} />
          }
          onClick={() => handleDownload("txt")}
          disabled={!!downloading}
        >
          .txt
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
