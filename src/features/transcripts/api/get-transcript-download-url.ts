import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export type TranscriptDownloadUrlResponse = {
  fileName: string;
  downloadUrl: string;
  expiry: string;
};

export const getTranscriptDownloadUrl = (
  id: string,
): Promise<TranscriptDownloadUrlResponse> => {
  return api.get(`/Transcripts/${encodeURIComponent(id)}/download-url`);
};

export const getTranscriptDownloadUrlQueryOptions = (id?: string) => {
  return queryOptions({
    queryKey: ["transcripts", id, "download-url"],
    queryFn: () => {
      if (!id) throw new Error("Transcript ID is required");
      return getTranscriptDownloadUrl(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 4,
  });
};

type UseGetTranscriptDownloadUrlOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getTranscriptDownloadUrlQueryOptions>;
};

export const useGetTranscriptDownloadUrl = ({
  id,
  queryConfig,
}: UseGetTranscriptDownloadUrlOptions) => {
  return useQuery({
    ...getTranscriptDownloadUrlQueryOptions(id),
    ...queryConfig,
  });
};
