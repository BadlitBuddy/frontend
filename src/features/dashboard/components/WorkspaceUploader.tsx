"use client";

import { useState, type DragEvent } from "react";
import {
  Box,
  Button,
  FileButton,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { UploadIcon } from "lucide-react";
import classes from "../styles/WorkspaceUploader.module.css";
import { useUploadFile } from "../api/upload-file";
import { useNotifications } from "@/components/notifications/notifications-store";
import { useUploadFileToPresignedUrl } from "../api/upload-to-s3";

const ACCEPTED_MIME_TYPES = [
  "audio/*",
  "video/*",
  "audio/wav",
  "audio/webm",
  "audio/flac",
  "audio/mpeg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/ogg",
  "video/webm",
  "video/mp4",
];

export function WorkspaceUploader() {
  const { addNotification } = useNotifications();
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const uploadToPresignedUrlMutation = useUploadFileToPresignedUrl({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: "success",
          title: "File uploaded successfully",
          message: `Transcription has been initiated for ${pendingFile?.name}.`,
        });
        setPendingFile(null);
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

  const uploadFileMutation = useUploadFile({
    mutationConfig: {
      onSuccess: (data) => {
        if (!pendingFile) return;

        uploadToPresignedUrlMutation.mutate({
          presignedUrl: data.url,
          file: pendingFile,
        });
      },
    },
  });

  const handleFileUpload = (file: File): void => {
    setPendingFile(file);
    uploadFileMutation.mutate({ data: { fileName: file.name } });
  };

  const isUploading =
    uploadFileMutation.isPending || uploadToPresignedUrlMutation.isPending;

  if (isUploading) {
    return (
      <ProgressView
        fileName={pendingFile?.name}
        progress={uploadToPresignedUrlMutation.progress}
      />
    );
  }

  return (
    <UploaderView
      handleFileUpload={handleFileUpload}
      isUploading={isUploading}
    />
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
        color="blue"
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
            Drag and drop files here, or click to browse (wav, webm, flac, mp3,
            mpeg, mpga, mp4, m4a, ogg )
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
