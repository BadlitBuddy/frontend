import useEventSource from "@/hooks/useEventSource";
import { JobStatus } from "@/types/api";

export interface GetFileEventsRequestBody {
  unprocessedObjectKeys: string[];
}

export type TranscriptionFinishedMessageDto = {
  jobStatus?: { value?: JobStatus };
  unprocessedWavFileObjectKey: string;
  transcriptionFileObjectKey: string;
};

export const useGetFileEvents = () => {
  const eventSource = useEventSource<
    TranscriptionFinishedMessageDto,
    GetFileEventsRequestBody
  >();

  const start = (body: GetFileEventsRequestBody) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const url = `${cleanBaseUrl}/Files/events`;
    return eventSource.start(url, body);
  };

  return {
    ...eventSource,
    start,
  };
};
