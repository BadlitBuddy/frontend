"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type DragEvent } from "react";
import {
  Box,
  Button,
  FileButton,
  Flex,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { HeadsetIcon, UploadIcon } from "lucide-react";
import classes from "../styles/WorkspaceUploader.module.css";
import { useGetPresignedUrl } from "../api/upload-file";
import { useNotifications } from "@/components/notifications/notifications-store";
import { useUploadFileToPresignedUrl } from "../api/upload-to-s3";
import { useTranscribeFile } from "@/features/transcripts/api/transcribe";
import { useGetTranscriptEventsNative } from "@/features/transcripts/api/get-transcript-events";
import { CircleLoaderIcon } from "@/components/icons/CircleLoaderIcon";
import {
  AudioLinesIcon,
  AudioLinesIconHandle,
} from "@/components/icons/AudioLinesIcon";
import { useFFmpeg, isWavFile } from "@/hooks/useFFmpeg";
import { useOPFS } from "@/hooks/useOPFS";

const ACCEPTED_MIME_TYPES = ["audio/*", "video/*"];

export function WorkspaceUploader() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { convertToWav, progress: conversionProgress } = useFFmpeg();
  const { writeFile } = useOPFS();
  const { data, error, start, stop } = useGetTranscriptEventsNative();

  useEffect(() => {
    if (!data) return;

    if (data.jobStatus?.value === "Finished") {
      queryClient.invalidateQueries({
        queryKey: ["transcripts"],
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsProcessing(false);
      stop();
    }
  }, [data, queryClient, stop]);

  if (error) {
    console.error("Error receiving file events:", error);
  }

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const transcribeFileMutation = useTranscribeFile({
    mutationConfig: {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["transcripts"],
        });
        start(data.id);
      },
    },
  });

  const uploadToPresignedUrlMutation = useUploadFileToPresignedUrl({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: "success",
          title: "File uploaded successfully",
          message: `Transcription has been initiated for ${pendingFile?.name}.`,
        });
      },
      onError: () => {
        addNotification({
          type: "error",
          title: "Upload failed",
          message: `Could not upload ${pendingFile?.name}.`,
        });
        setPendingFile(null);
      },
    },
  });

  const uploadFileMutation = useGetPresignedUrl();

  const handleFileUpload = async (file: File) => {
    setPendingFile(file);

    try {
      let targetFile = file;

      if (!isWavFile(file)) {
        setIsConverting(true);
        targetFile = await convertToWav(file);
        setIsConverting(false);
        setPendingFile(targetFile);
      }

      setIsProcessing(true);

      const presignedData = await uploadFileMutation.mutateAsync({
        data: { fileName: targetFile.name, fileSize: targetFile.size },
      });

      await uploadToPresignedUrlMutation.mutateAsync({
        presignedUrl: presignedData.url,
        file: targetFile,
      });

      const transcribeResult = await transcribeFileMutation.mutateAsync({
        data: {
          unprocessedObjectKey: presignedData.objectKey,
          id: null,
        },
      });

      await writeFile(
        `transcriptAudio/${transcribeResult.id}/${targetFile.name}`,
        targetFile,
      );
    } catch (err) {
      setIsConverting(false);
      setIsProcessing(false);
      setPendingFile(null);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      addNotification({
        type: "error",
        title: "Processing failed",
        message,
      });
    }
  };

  const isUploading =
    uploadFileMutation.isPending || uploadToPresignedUrlMutation.isPending;

  if (isConverting) {
    return (
      <ConvertingView
        fileName={pendingFile?.name}
        progress={conversionProgress}
      />
    );
  }

  if (isUploading) {
    return (
      <ProgressView
        fileName={pendingFile?.name}
        progress={uploadToPresignedUrlMutation.progress}
      />
    );
  }

  if (isProcessing) {
    return <TranscriptionInProgressView fileName={pendingFile?.name} />;
  }

  return (
    <UploaderView
      handleFileUpload={handleFileUpload}
      isUploading={isUploading || isConverting}
    />
  );
}

const pseudoProcessingLabels = [
  "Uploading Audio",
  "Analyzing Audio Quality",
  "Transcribing Speech",
  "Applying Formatting & Punctuation",
  "Generating Timestamps",
  "Translating Text",
  "Running Quality Checks",
  "Finalizing Transcript",
  "Running Ai models",
  "Setting up the workspace",
];

type ConvertingViewProps = {
  fileName?: string;
  progress?: number;
};

function ConvertingView({ fileName, progress = 0 }: ConvertingViewProps) {
  const isIndeterminate = progress === undefined;
  const displayProgress = isIndeterminate ? 100 : progress > 100 ? 0 : progress;

  return (
    <Stack
      align="center"
      justify="center"
      gap="sm"
      px="xl"
      py="lg"
      bd="1px solid slate.2"
      bdrs="sm"
    >
      {fileName && (
        <Text fw={700} c="slate.9" size="sm">
          {fileName}
        </Text>
      )}
      <Progress
        value={displayProgress}
        color="slate.9"
        size="md"
        radius="xl"
        striped={isIndeterminate}
        animated={isIndeterminate}
        w="100%"
        transitionDuration={200}
      />
      <Text size="sm" c="slate.5">
        {isIndeterminate
          ? "Preparing file for upload…"
          : `Optimizing & converting audio to WAV... ${displayProgress}%`}
      </Text>
    </Stack>
  );
}

type TranscriptionInProgressViewProps = {
  fileName?: string;
  intervalMs?: number;
};
function TranscriptionInProgressView({
  fileName,
  intervalMs = 2000,
}: TranscriptionInProgressViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % pseudoProcessingLabels.length,
      );
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  const audioLinesRef = useRef<AudioLinesIconHandle>(null);
  useEffect(() => {
    audioLinesRef.current?.startAnimation();
  }, []);

  return (
    <Stack
      align="start"
      justify="start"
      gap="sm"
      px="xl"
      py="lg"
      bd="1px solid slate.2"
      bdrs="sm"
      bg="white"
    >
      <Flex w="100%">
        <Box p={10} bd="1px solid slate.3" bdrs="lg">
          <HeadsetIcon size={32} className="text-ws-text-secondary" />
        </Box>
        <Stack gap={0} ml="md">
          <Title order={5} c="slate.9">
            {fileName ?? "Unknown File"}
          </Title>
          <Text size="sm" c="slate.5">
            AI Transcription actively processing...
          </Text>
        </Stack>
      </Flex>

      <Box
        className="grow flex items-center justify-center"
        w="100%"
        bg="slate.1"
        bdrs="lg"
        p="sm"
      >
        <AudioLinesIcon
          className="text-ws-text-secondary"
          size={72}
          ref={audioLinesRef}
        />
      </Box>

      <Flex align="center" justify="space-between" gap="xs" w="100%">
        <Text size="sm" c="slate.5">
          {pseudoProcessingLabels[currentIndex]}...
        </Text>

        <Box>
          <CircleLoaderIcon className="text-ws-text-secondary" size={22} />
        </Box>
      </Flex>
    </Stack>
  );
}

type ProgressViewProps = {
  fileName?: string;
  progress?: number;
};

function ProgressView({ fileName, progress }: ProgressViewProps) {
  const isIndeterminate = progress === undefined;
  const displayProgress = isIndeterminate ? 100 : progress;

  return (
    <Stack
      align="center"
      justify="center"
      gap="sm"
      px="xl"
      py="lg"
      bd="1px solid slate.2"
      bdrs="sm"
    >
      {fileName && (
        <Text fw={700} c="slate.9" size="sm">
          {fileName}
        </Text>
      )}
      <Progress
        value={displayProgress}
        color="slate.9"
        size="md"
        radius="xl"
        striped={isIndeterminate}
        animated={isIndeterminate}
        w="100%"
        transitionDuration={200}
      />
      <Text size="sm" c="slate.5">
        {isIndeterminate
          ? "Preparing upload…"
          : `Uploading... ${displayProgress}%`}
      </Text>
    </Stack>
  );
}

type UploaderView = {
  handleFileUpload: (file: File) => void;
  isUploading: boolean;
};

function UploaderView({ handleFileUpload, isUploading }: UploaderView) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => setIsDragging(false);

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;

    handleFileUpload(file);
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    handleFileUpload(file);
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-dragging={isDragging || undefined}
      className={classes.dropzone}
    >
      <Stack align="center" gap="md">
        <Box
          bdrs="sm"
          bg="slate.1"
          w="52px"
          h="52px"
          display="flex"
          bd="1px solid slate.2"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UploadIcon size={24} color="var(--mantine-color-slate-5)" />
        </Box>

        <Stack align="center" gap={4} px="xl">
          <Title order={3} c="slate.9" fz="1.125rem" fw="700">
            Select audio or video
          </Title>
          <Text size="sm" c="slate.5" ta="center">
            Drag and drop files here, or click to browse (wav, mp3, mp4, mov,
            m4a, flac, webm, and
            <span
              className="tooltip tooltip-accent tooltip-right text-ws-primary underline"
              data-tip=".ogg, .opus, .wma, .avi, .aiff, .alac, .ape,
                .pcm, .mkv, .wmv, .flv, .mpeg, .3gp, .m4v, .aac"
            >
              15 more.
            </span>
            )
          </Text>
        </Stack>

        <FileButton
          onChange={handleFileSelect}
          accept={ACCEPTED_MIME_TYPES.join(",")}
        >
          {(props) => (
            <Button
              {...props}
              variant="outline"
              color="slate.9"
              size="sm"
              fw="600"
              c="slate.9"
              bd="1px solid slate.9"
              loading={isUploading}
              disabled={isUploading}
            >
              Browse Files
            </Button>
          )}
        </FileButton>
      </Stack>
    </Box>
  );
}
