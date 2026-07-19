import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { TranscriptionJobStatus } from "../types";
import { UpdateFileStatusResponse } from "../types/api";

export const UpdateFileStatusRequestSchema = z.object({
  processedObjectKey: z.string().nullable(),
  transcriptionJobStatus: z.union([
    z.literal(TranscriptionJobStatus.Uploaded),
    z.literal(TranscriptionJobStatus.Processing),
    z.literal(TranscriptionJobStatus.Completed),
  ]),
});

export type UpdateFileStatusRequest = z.infer<
  typeof UpdateFileStatusRequestSchema
>;

export const updateFileStatus = ({
  unProcessedObjectKey,
  data,
}: {
  unProcessedObjectKey: string;
  data: UpdateFileStatusRequest;
}): Promise<UpdateFileStatusResponse> => {
  const queryParam = encodeURIComponent(unProcessedObjectKey);
  return api.post(`/Files/status?objectKey=${queryParam}`, data);
};

type UseUpdateFileStatusOptions = {
  mutationConfig?: MutationConfig<typeof updateFileStatus>;
};

export const useUpdateFileStatus = ({
  mutationConfig,
}: UseUpdateFileStatusOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateFileStatus,
  });
};
