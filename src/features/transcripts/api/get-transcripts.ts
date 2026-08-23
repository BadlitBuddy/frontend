import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

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
  duration: string;
};

export type GetTranscriptsParams = {
  page: number | string;
  limit: number | string;
  fileName?: string;
  status?: TranscriptionJobStatus;
  createdFrom?: string;
};

export const getTranscripts = (
  { page, limit, status, createdFrom, fileName }: GetTranscriptsParams = {
    page: 1,
    limit: 5,
  },
): Promise<PaginatedList<TranscriptDto>> => {
  return api.get("/Transcripts", {
    params: {
      page,
      limit,
      status,
      fileName,
      createdFrom,
    },
  });
};

export const getTranscriptsQueryOptions = (
  params: GetTranscriptsParams = {
    page: 1,
    limit: 5,
  },
) => {
  return queryOptions({
    queryKey: ["transcripts", params],
    queryFn: () => getTranscripts(params),
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
