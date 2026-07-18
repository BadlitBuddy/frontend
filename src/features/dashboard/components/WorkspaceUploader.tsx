"use client";

import { useState, type DragEvent } from "react";
import { Box, Button, FileButton, Stack, Text, Title } from "@mantine/core";
import { UploadIcon } from "lucide-react";
import classes from "../styles/WorkspaceUploader.module.css";
import { useUploadFile } from "../api/upload-file";
import { useNotifications } from "@/components/notifications/notifications-store";

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
  const [isDragging, setIsDragging] = useState(false);
  const { addNotification } = useNotifications();
  const [fileName, setFileName] = useState<string | null>(null);

  const uploadFileMutation = useUploadFile({
    mutationConfig: {
      onSuccess: (data) => {
        addNotification({
          type: "success",
          title: "File uploaded successfully",
          message: `Transcription has been initiated for ${fileName}.`,
        });
      },
    },
  });

  const handleFileUpload = (file: File) => {
    const fileName = file.name;
    setFileName(fileName);
    uploadFileMutation.mutate({ data: { fileName } });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
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
            >
              Browse Files
            </Button>
          )}
        </FileButton>
      </Stack>
    </Box>
  );
}
