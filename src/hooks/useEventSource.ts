import { useState, useCallback, useRef, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

class RetriableError extends Error {}
class FatalError extends Error {}

interface StartOptions {
  headers?: Record<string, string>;
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

function useEventSource<TData, TBody = undefined>(method: Method) {
  const [data, setData] = useState<TData | null>(null);
  const [eventType, setEventType] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const ctrlRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => ctrlRef.current?.abort();
  }, []);

  const start = useCallback(
    async (url: string, body: TBody, options: StartOptions = {}) => {
      ctrlRef.current?.abort();
      const ctrl = new AbortController();
      ctrlRef.current = ctrl;

      setData(null);
      setEventType(null);
      setError(null);
      setIsStreaming(true);

      try {
        const isBodylessMethod = method === "GET" || method === "HEAD";
        await fetchEventSource(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            ...options.headers,
          },
          credentials: "include",
          body:
            isBodylessMethod || body === undefined
              ? undefined
              : JSON.stringify(body),
          signal: ctrl.signal,

          async onopen(response) {
            if (response.ok) return;
            if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              throw new FatalError(`Client error: ${response.status}`);
            }
            throw new RetriableError();
          },

          onmessage(ev) {
            const parsed = (() => {
              try {
                return JSON.parse(ev.data) as TData;
              } catch {
                console.error("Failed to parse event data:", ev.data);
                return ev.data as unknown as TData;
              }
            })();
            setEventType(ev.event);
            setData(parsed);
          },

          onclose() {
            setIsStreaming(false);
          },

          onerror(err) {
            setError(err?.message ?? "Stream error");
            if (err instanceof FatalError) throw err;
          },
        });
      } catch (err) {
        const e = err as Error;
        if (e.name !== "AbortError") {
          setError(e.message || "Stream failed");
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [],
  );

  const stop = useCallback(() => {
    ctrlRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { data, eventType, isStreaming, error, start, stop };
}

export default useEventSource;
