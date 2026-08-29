import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { TranscriptDto } from "@/features/transcripts/api/get-transcripts";
import {
  SrtSegment,
  TranscriptionResult,
  VttSegment,
} from "@/features/transcripts/types";

export type GetTranscriptResponse = {
  transcript: TranscriptDto;
  jsonData: TranscriptionResult;
  srtSegments: SrtSegment[] | null;
  vttSegments: VttSegment[] | null;
};

export const getTranscript = (
  id: string,
  includeSrtSegments?: boolean,
  includeVttSegments?: boolean,
): Promise<GetTranscriptResponse> => {
  return api.get(`/Transcripts/${encodeURIComponent(id)}`, {
    params: {
      includeSrtSegments,
      includeVttSegments,
    },
  });
};

export const getTranscriptQueryOptions = (
  id?: string,
  includeSrtSegments?: boolean,
  includeVttSegments?: boolean,
) => {
  return queryOptions({
    queryKey: ["transcripts", id, includeSrtSegments, includeVttSegments],
    queryFn: () => {
      if (!id) throw new Error("Transcript ID is required");
      return getTranscript(id, includeSrtSegments, includeVttSegments);
    },
    enabled: !!id,
  });
};

type UseGetTranscriptOptions = {
  id: string;
  includeSrtSegments?: boolean;
  includeVttSegments?: boolean;
  queryConfig?: QueryConfig<typeof getTranscriptQueryOptions>;
};

export const useGetTranscript = ({
  id,
  includeSrtSegments,
  includeVttSegments,
  queryConfig,
}: UseGetTranscriptOptions) => {
  return useQuery({
    ...getTranscriptQueryOptions(id, includeSrtSegments, includeVttSegments),
    ...queryConfig,
  });
};
