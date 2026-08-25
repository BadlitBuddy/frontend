import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useNotifications } from "@/components/notifications/notifications-store";
import { TranscriptionExportFormat } from "../helpers/transcriptionExporter";
import {
  buildZipFileName,
  downloadTranscriptsZip,
} from "../api/download-transcripts-zip";
import { getTranscriptDownloadUrlQueryOptions } from "../api/get-transcript-download-url";

export type BulkDownloadState = "idle" | "fetching-urls" | "downloading";

export function useBulkDownloadZip() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const [state, setState] = useState<BulkDownloadState>("idle");

  const isDownloadingZip = state !== "idle";

  const downloadZip = async (
    transcriptIds: string[],
    format: TranscriptionExportFormat,
  ) => {
    if (state !== "idle" || transcriptIds.length === 0) return;

    try {
      setState("fetching-urls");

      const urlResults = await Promise.all(
        transcriptIds.map((id) =>
          queryClient.fetchQuery(getTranscriptDownloadUrlQueryOptions(id)),
        ),
      );

      const files = urlResults.map(({ fileName, downloadUrl }) => ({
        fileName,
        downloadUrl,
      }));

      setState("downloading");

      const blob = await downloadTranscriptsZip({ data: { format, files } });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = buildZipFileName(format);
      a.click();
      URL.revokeObjectURL(url);

      addNotification({
        type: "success",
        title: "Download ready",
        message: `${files.length} transcript${files.length === 1 ? "" : "s"} exported as ${format.toUpperCase()}.`,
      });
    } catch {
      addNotification({
        type: "error",
        title: "Download failed",
        message:
          "Could not generate the ZIP archive. Please check your connection and try again.",
      });
    } finally {
      setState("idle");
    }
  };

  return { downloadZip, isDownloadingZip, downloadState: state };
}
