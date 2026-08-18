import { EventType } from "@/types/api";
import { useState, useCallback, useRef, useEffect } from "react";

interface StartOptions {
  withCredentials?: boolean;
}

export function useEventSourceNative<TData>(targetEventType?: EventType) {
  const [data, setData] = useState<TData | null>(null);
  const [eventType, setEventType] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => esRef.current?.close();
  }, []);

  const start = useCallback((url: string, options: StartOptions = {}) => {
    esRef.current?.close();

    setData(null);
    setEventType(null);
    setError(null);
    setIsStreaming(true);

    const es = new EventSource(url, {
      withCredentials: options.withCredentials ?? false,
    });
    esRef.current = es;

    es.onopen = () => {
      setIsStreaming(true);
      setError(null);
    };

    const handleEvent = (ev: MessageEvent) => {
      const parsed = (() => {
        try {
          return JSON.parse(ev.data) as TData;
        } catch {
          console.error("Failed to parse event data:", ev.data);
          return ev.data as unknown as TData;
        }
      })();
      setEventType(ev.type);
      setData(parsed);
    };

    if (targetEventType) {
      es.addEventListener(targetEventType, handleEvent);
    } else {
      es.onmessage = handleEvent;
    }

    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) {
        setError("Stream error");
        setIsStreaming(false);
      }
    };
  }, []);

  const stop = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    setIsStreaming(false);
  }, []);

  return { data, eventType, isStreaming, error, start, stop };
}
