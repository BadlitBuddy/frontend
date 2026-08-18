import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const GetPresignedUrlRequestSchema = z.object({
  fileName: z.string().min(1, "Required"),
  fileSize: z.number().min(1, "Required"),
});

export type GetPresignedUrlRequest = z.infer<
  typeof GetPresignedUrlRequestSchema
>;

export type UploadUrlDto = {
  url: string;
  objectKey: string;
};

export const getPresignedUrl = ({
  data,
}: {
  data: GetPresignedUrlRequest;
}): Promise<UploadUrlDto> => {
  return api.post("/Files", data);
};

type UseGetPresignedUrlOptions = {
  mutationConfig?: MutationConfig<typeof getPresignedUrl>;
};

export const useGetPresignedUrl = ({
  mutationConfig,
}: UseGetPresignedUrlOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: getPresignedUrl,
  });
};
