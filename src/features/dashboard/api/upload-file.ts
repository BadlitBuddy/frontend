import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { UploadUrlDto } from "../types/api";
import { MutationConfig } from "@/lib/react-query";

export const FileUploadRequestSchema = z.object({
  fileName: z.string().min(1, "Required"),
  fileSize: z.number().min(1, "Required"),
});

export type FileUploadRequest = z.infer<typeof FileUploadRequestSchema>;

export const uploadFile = ({
  data,
}: {
  data: FileUploadRequest;
}): Promise<UploadUrlDto> => {
  return api.post("/Files", data);
};

type UseUploadFileOptions = {
  mutationConfig?: MutationConfig<typeof uploadFile>;
};

export const useUploadFile = ({
  mutationConfig,
}: UseUploadFileOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: uploadFile,
  });
};
