import useEventSource from "@/hooks/useEventSource";
import { useEventSourceNative } from "@/hooks/useEventSourceNative";
import { EventTypes, JobStatus } from "@/types/api";

export type TranscriptionFinishedMessageDto = {
  jobStatus?: { value?: JobStatus };
  unprocessedWavFileObjectKey: string;
  transcriptionFileObjectKey: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

export const useGetTranscriptEvents = () => {
  const eventSource = useEventSource<TranscriptionFinishedMessageDto>("GET");

  const start = (id: string) => {
    const url = `${cleanBaseUrl}/Transcripts/${id}/events`;
    return eventSource.start(url, undefined);
  };

  return {
    ...eventSource,
    start,
  };
};

export const useGetTranscriptEventsNative = () => {
  const eventSource = useEventSourceNative<TranscriptionFinishedMessageDto>(
    EventTypes.TranscriptionEvent,
  );

  const start = (id: string) => {
    const url = `${cleanBaseUrl}/Transcripts/${id}/events`;
    return eventSource.start(url, { withCredentials: true });
  };

  return {
    ...eventSource,
    start,
  };
};
