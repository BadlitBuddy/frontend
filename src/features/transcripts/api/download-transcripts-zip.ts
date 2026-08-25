import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { MutationConfig } from "@/lib/react-query";
import { TranscriptionExportFormat } from "../helpers/transcriptionExporter";

const edgeBaseUrl = (
  process.env.NEXT_PUBLIC_EDGE_API_URL || "http://localhost:50000"
).replace(/\/$/, "");

export const DownloadTranscriptsZipSchema = z.object({
  format: z.enum(["srt", "vtt", "txt", "json"]),
  files: z
    .array(
      z.object({
        fileName: z.string(),
        downloadUrl: z.string().url(),
      }),
    )
    .min(1),
});

export type DownloadTranscriptsZipRequest = z.infer<
  typeof DownloadTranscriptsZipSchema
>;

export const downloadTranscriptsZip = ({
  data,
}: {
  data: DownloadTranscriptsZipRequest;
}): Promise<Blob> => {
  return axios
    .post<Blob>(`${edgeBaseUrl}/`, data, {
      headers: { "Content-Type": "application/json" },
      responseType: "blob",
    })
    .then((res) => res.data);
};

type UseDownloadTranscriptsZipOptions = {
  mutationConfig?: MutationConfig<typeof downloadTranscriptsZip>;
};

export const useDownloadTranscriptsZip = ({
  mutationConfig,
}: UseDownloadTranscriptsZipOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: downloadTranscriptsZip,
  });
};

export function buildZipFileName(format: TranscriptionExportFormat): string {
  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `transcripts-${format}-${ts}.zip`;
}
