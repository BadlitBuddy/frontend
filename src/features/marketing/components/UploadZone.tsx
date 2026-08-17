"use client";

import {
  ArrowRightIcon,
  CircleCheckBigIcon,
  CloudUploadIcon,
  AlertCircleIcon,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";

import { useGetPresignedUrl } from "@/features/dashboard/api/upload-file";
import { useUploadFileToPresignedUrl } from "@/features/dashboard/api/upload-to-s3";
import { useTranscribeFile } from "@/features/transcripts/api/transcribe";
import { CircleLoaderIcon } from "@/components/icons/CircleLoaderIcon";

import {
  AudioLinesIcon,
  AudioLinesIconHandle,
} from "@/components/icons/AudioLinesIcon";
import { useGetTranscriptEventsNative } from "@/features/transcripts/api/get-transcript-events";
import { useTranscriptionDownload } from "@/features/transcripts/hooks/useTranscriptionDownload";

type UploadState =
  | "idle"
  | "uploading"
  | "transcribing"
  | "completed"
  | "error";

function UploadZoneContent() {
  const [state, setState] = useState<UploadState>("idle");
  const [fileMeta, setFileMeta] = useState<{
    name: string;
    audioLength: string;
  }>({
    name: "",
    audioLength: "",
  });
  const [transcriptId, setTranscriptId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
  const { mutateAsync: uploadToS3, progress } = useUploadFileToPresignedUrl();
  const { mutateAsync: transcribeFile } = useTranscribeFile();

  const {
    data,
    error: eventError,
    start,
    stop,
  } = useGetTranscriptEventsNative();

  const handleFileUpload = async (file: File) => {
    setErrorMessage("");
    setState("uploading");

    try {
      const { url, objectKey } = await getPresignedUrl({
        data: { fileName: file.name, fileSize: file.size },
      });

      await uploadToS3({ presignedUrl: url, file });

      setState("transcribing");
      const result = await transcribeFile({
        data: { unprocessedObjectKey: objectKey, id: null },
      });

      setFileMeta({
        name: file.name,
        audioLength: result.duration.slice(0, 8),
      });
      setTranscriptId(result.id);
      start(result.id);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMessage(message);
      setState("error");
    }
  };

  useEffect(() => {
    if (!data) return;

    if (data.jobStatus?.value === "Finished") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("completed");
      stop();
    }
  }, [data, stop]);

  if (eventError) {
    console.error("Error receiving file events:", eventError);
  }

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setState("idle");
    setFileMeta({ name: "", audioLength: "" });
    setErrorMessage("");
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="audio/*,video/*"
      />

      {state === "idle" && (
        <IdleStateView
          triggerFileSelect={triggerFileSelect}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      )}

      {state === "uploading" && (
        <UploadingStateView fileName={fileMeta.name} progress={progress} />
      )}

      {state === "transcribing" && (
        <TranscribingStateView
          fileName={fileMeta.name}
          audioLength={fileMeta.audioLength}
        />
      )}

      {state === "error" && (
        <ErrorStateView
          errorMessage={errorMessage}
          triggerFileSelect={triggerFileSelect}
        />
      )}

      {state === "completed" && transcriptId && (
        <CompletedStateView
          fileName={fileMeta.name}
          audioLength={fileMeta.audioLength}
          transcriptId={transcriptId}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}

export default function UploadZone() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UploadZoneContent />
    </QueryClientProvider>
  );
}

type IdleStateViewProps = {
  triggerFileSelect: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
};

function IdleStateView({
  triggerFileSelect,
  handleDragOver,
  handleDrop,
}: IdleStateViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <button
        onClick={triggerFileSelect}
        className="flex items-center justify-center p-4.5 bg-ws-primary hover:opacity-90 text-ws-surface rounded-lg text-left transition-all duration-300 min-h-30 shadow-sm hover:shadow-md cursor-pointer group w-full"
      >
        <p>
          <span className=" inline-block text-lg w-max font-semibold ">
            Transcribe Your First File
          </span>
          <span className="inline-block text-[10px]">
            <b>*Note</b> preview uses a smaller model and may not be as accurate
            as the full version, sign-up to get better results.
          </span>
        </p>
        <ArrowRightIcon
          size={100}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      <div
        onClick={triggerFileSelect}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-ws-border hover:border-ws-text-secondary bg-ws-background/50 hover:bg-ws-background rounded-lg text-center cursor-pointer transition-all duration-300 min-h-30 w-full"
      >
        <div className="flex items-center gap-3">
          <CloudUploadIcon size={40} />
          <div className="text-left">
            <p className="text-sm font-semibold text-ws-text-primary">
              Drag a file or click to upload — no sign-up required
            </p>
            <p className="text-xs text-ws-text-muted mt-0.5">
              Free preview: Maximum of 60 minutes per file, no account required.
              (.wav, .mp3, .mp4, .m4a, .mov, .avi, .flv, .wmv)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type UploadingStateViewProps = {
  fileName: string;
  progress: number;
};

function UploadingStateView({ fileName, progress }: UploadingStateViewProps) {
  return (
    <div className="p-6 bg-ws-surface border border-ws-border rounded-lg shadow-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <CircleLoaderIcon size={28} />
        <div>
          <p className="font-semibold text-sm text-ws-text-primary truncate max-w-62.5">
            {fileName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-medium text-ws-text-secondary mb-1">
          <span>Uploading...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-ws-background rounded-full h-2">
          <div
            className="bg-ws-primary h-2 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const TRANSCRIBING_MESSAGES = [
  "Analyzing speakers & timestamps",
  "Extracting audio frequencies...",
  "Applying noise reduction...",
  "Detecting language & accents...",
  "Formatting transcript text...",
  "Refining word-level timing...",
];

type TranscribingStateViewProps = {
  fileName: string;
  audioLength: string;
};

function TranscribingStateView({
  fileName,
  audioLength,
}: TranscribingStateViewProps) {
  const audioLinesRef = useRef<AudioLinesIconHandle>(null);
  useEffect(() => {
    audioLinesRef.current?.startAnimation();
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(
        (prevIndex) => (prevIndex + 1) % TRANSCRIBING_MESSAGES.length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-ws-surface border border-ws-border rounded-lg shadow-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <AudioLinesIcon
          className="text-ws-text-primary"
          size={28}
          ref={audioLinesRef}
        />
        <div>
          <p className="font-semibold text-sm text-ws-text-primary truncate max-w-62.5">
            {fileName}
          </p>
          <p className="text-xs text-ws-text-muted">{audioLength}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-medium text-ws-text-secondary mb-1 animate-pulse">
          <span>AI Engine Transcribing...</span>
          <span className="transition-all duration-300">
            {TRANSCRIBING_MESSAGES[messageIndex]}
          </span>{" "}
        </div>
        <div className="w-full bg-ws-background rounded-full h-2 overflow-hidden relative">
          <div className="bg-ws-success h-2 rounded-full absolute left-0 top-0 animate-indeterminate-bar" />
        </div>
      </div>
    </div>
  );
}

type ErrorStateViewProps = {
  errorMessage: string;
  triggerFileSelect: () => void;
};

function ErrorStateView({
  errorMessage,
  triggerFileSelect,
}: ErrorStateViewProps) {
  return (
    <div className="p-6 bg-ws-surface border border-ws-error/40 rounded-lg shadow-sm animate-fade-in w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1 bg-ws-error/10 text-ws-error rounded-full shrink-0">
          <AlertCircleIcon size={22} />
        </span>
        <div>
          <p className="font-semibold text-sm text-ws-text-primary">
            An error occured during the upload or transcription process.
          </p>
          <p className="text-xs text-ws-text-muted truncate max-w-60">
            Please check your file and try again. Error: {errorMessage}
          </p>
        </div>
      </div>
      <button
        onClick={triggerFileSelect}
        className="btn btn-sm btn-neutral w-full text-xs font-semibold normal-case rounded"
      >
        Try again
      </button>
    </div>
  );
}

type CompletedStateViewProps = {
  fileName?: string;
  audioLength?: string;
  transcriptId: string;
  handleReset: () => void;
};
function CompletedStateView({
  fileName,
  audioLength,
  transcriptId,
  handleReset,
}: CompletedStateViewProps) {
  const queryClient = useQueryClient();

  const { handleDownload, downloading } = useTranscriptionDownload({
    transcriptId,
    queryClient,
  });

  return (
    <div className="p-6 bg-ws-surface border border-ws-success/40 rounded-lg shadow-sm animate-fade-in w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-ws-success/10 text-ws-success rounded-full shrink-0">
            <CircleCheckBigIcon size={22} />
          </span>
          <div>
            <p className="font-semibold text-sm text-ws-text-primary">
              Transcription Complete!
            </p>
            <p className="text-xs text-ws-text-muted truncate max-w-50">
              {fileName} ({audioLength})
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-ws-text-muted hover:text-ws-text-primary underline cursor-pointer"
        >
          Upload another
        </button>
      </div>

      <div className="border-primary/30 bg-ws-background border rounded-lg py-3 px-4 flex flex-col items-start gap-3">
        <h1 className="text-sm font-bold text-ws-text-primary mb-1">
          Download Transcription
        </h1>

        {downloading ? (
          <CircleLoaderIcon className="text-ws-text-secondary" size={22} />
        ) : (
          <div className="grid grid-cols-4 w-full gap-2">
            <button
              className="btn gap-0.5 flex flex-col items-start border-ws-primary/20"
              onClick={() => {
                handleDownload("srt");
              }}
            >
              <span className="font-semibold text-base leading-none">.srt</span>
              <span className="text-[10px] leading-none font-medium text-ws-text-secondary">
                SubRip subtitles.
              </span>
            </button>

            <button
              className="btn gap-0.5 flex flex-col items-start border-ws-primary/20"
              onClick={() => {
                handleDownload("vtt");
              }}
            >
              <span className="font-semibold text-base leading-none">.vtt</span>
              <span className="text-[10px] leading-none font-medium text-ws-text-secondary">
                Web subtitles
              </span>
            </button>

            <button
              className="btn gap-0.5 flex flex-col items-start border-ws-primary/20"
              onClick={() => {
                handleDownload("txt");
              }}
            >
              <span className="font-semibold text-base leading-none">.txt</span>
              <span className="text-[10px] leading-none font-medium text-ws-text-secondary">
                Plain text
              </span>
            </button>

            <button
              className="btn gap-0.5 flex flex-col items-start border-ws-primary/20"
              onClick={() => {
                handleDownload("json");
              }}
            >
              <span className="font-semibold text-base leading-none">
                .json
              </span>
              <span className="text-[10px] leading-none font-medium text-ws-text-secondary">
                Structured data
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
