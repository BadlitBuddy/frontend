import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { TranscriptionJobStatus } from "@/features/dashboard/types";
import { PaginatedList } from "@/types/api";

export type TranscriptDto = {
  id: string;
  fileName: string;
  jobStatus: TranscriptionJobStatus;
  jobStatusDesc: string;
  createdAt: string;
};

export type GetTranscriptsParams = {
  page?: number | string;
  limit?: number | string;
};

export const getTranscripts = ({
  page,
  limit,
}: GetTranscriptsParams = {}): Promise<PaginatedList<TranscriptDto>> => {
  return api.get("/Transcripts", {
    params: {
      page,
      limit,
    },
  });
};

export const getTranscriptsQueryOptions = ({
  page,
  limit,
}: GetTranscriptsParams = {}) => {
  return queryOptions({
    queryKey: ["transcripts", { page, limit }],
    queryFn: () => getTranscripts({ page, limit }),
  });
};

type UseGetTranscriptsOptions = {
  params?: GetTranscriptsParams;
  queryConfig?: QueryConfig<typeof getTranscriptsQueryOptions>;
};

export const useGetTranscripts = ({
  params,
  queryConfig,
}: UseGetTranscriptsOptions = {}) => {
  return useQuery({
    ...getTranscriptsQueryOptions(params),
    ...queryConfig,
  });
};
