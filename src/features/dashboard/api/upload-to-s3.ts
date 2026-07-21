import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";

import { MutationConfig } from "@/lib/react-query";

type UploadFileToPresignedUrlInput = {
  presignedUrl: string;
  file: File;
};

type UploadFileToPresignedUrlInternalInput = UploadFileToPresignedUrlInput & {
  onProgress?: (progress: number) => void;
};

export const uploadFileToPresignedUrl = async ({
  presignedUrl,
  file,
  onProgress,
}: UploadFileToPresignedUrlInternalInput): Promise<void> => {
  await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress: (event: AxiosProgressEvent) => {
      if (!onProgress) return;

      const total = event.total ?? file.size;
      const percent = total ? Math.round((event.loaded * 100) / total) : 0;
      onProgress(percent);
    },
  });
};

type PublicUploadFn = (
  variables: UploadFileToPresignedUrlInput,
) => Promise<void>;

type UseUploadFileToPresignedUrlOptions = {
  mutationConfig?: MutationConfig<PublicUploadFn>;
};

export const useUploadFileToPresignedUrl = ({
  mutationConfig,
}: UseUploadFileToPresignedUrlOptions = {}) => {
  const { onSuccess, onMutate, onSettled, ...restConfig } =
    mutationConfig || {};
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    onMutate: (...args) => {
      setProgress(0);
      return onMutate?.(...args);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: (...args) => {
      onSettled?.(...args);
    },
    ...restConfig,
    mutationFn: (variables: UploadFileToPresignedUrlInput) =>
      uploadFileToPresignedUrl({
        ...variables,
        onProgress: setProgress,
      }),
  });

  return {
    ...mutation,
    progress,
  };
};
