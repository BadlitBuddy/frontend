import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { TranscriptionJobStatus } from "@/features/dashboard/types";

export const TranscribeFileCommandSchema = z.object({
  unprocessedObjectKey: z.string(),
  id: z.string().nullable(),
});

export type TranscribeFileRequest = z.infer<typeof TranscribeFileCommandSchema>;

export type TranscribedFileResponse = {
  id: string;
  jobStatus: TranscriptionJobStatus;
  duration: string;
};

export const transcribeFile = ({
  data,
}: {
  data: TranscribeFileRequest;
}): Promise<TranscribedFileResponse> => {
  return api.post("/Transcripts", data);
};

type UseTranscribeFileOptions = {
  mutationConfig?: MutationConfig<typeof transcribeFile>;
};

export const useTranscribeFile = ({
  mutationConfig,
}: UseTranscribeFileOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: transcribeFile,
  });
};
