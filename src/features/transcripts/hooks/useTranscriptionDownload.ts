import { useState } from "react";
import {
  TranscriptionExporter,
  TranscriptionExportFormat,
} from "../helpers/transcriptionExporter";
import { TranscriptionResult } from "../types";
import { QueryClient } from "@tanstack/react-query";
import { getTranscriptDownloadUrlQueryOptions } from "../api/get-transcript-download-url";

export const MIME_TYPES: Record<TranscriptionExportFormat, string> = {
  json: "application/json",
  srt: "text/plain",
  vtt: "text/vtt",
  txt: "text/plain",
};

export function useTranscriptionDownload({
  transcriptId,
  queryClient,
}: {
  transcriptId: string;
  queryClient: QueryClient;
}) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (format: TranscriptionExportFormat) => {
    if (downloading || !transcriptId) return;
    setDownloading(format);

    try {
      const { fileName, downloadUrl } = await queryClient.fetchQuery(
        getTranscriptDownloadUrlQueryOptions(transcriptId),
      );

      if (format === "json") {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = swapExtension(fileName, "json");
        a.click();
        URL.revokeObjectURL(blobUrl);
      } else {
        const response = await fetch(downloadUrl);
        const result: TranscriptionResult = await response.json();
        const exporter = new TranscriptionExporter();
        const content = exporter.export(result, format);
        const outputFileName = swapExtension(fileName, format);
        triggerBlobDownload(content, outputFileName, MIME_TYPES[format]);
      }
    } finally {
      setDownloading(null);
    }
  };

  return { handleDownload, downloading };
}

function swapExtension(fileName: string, newExt: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  return `${base}.${newExt}`;
}

function triggerBlobDownload(
  content: string,
  fileName: string,
  mimeType: string,
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
