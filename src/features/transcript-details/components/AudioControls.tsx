"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FileButton,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { Audio } from "@gfazioli/mantine-audio";
import { AlertTriangleIcon, InfoIcon, UploadIcon } from "lucide-react";
import { useOPFS } from "@/hooks/useOPFS";
import { useFFmpeg, isWavFile } from "@/hooks/useFFmpeg";

interface AudioControlsProps {
  transcriptId: string;
  fileName?: string | null;
}

type LoadState =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "error"; message: string }
  | { status: "ready"; url: string };

export function AudioControls({ transcriptId, fileName }: AudioControlsProps) {
  const { isSupported, isReady, readFileAsBlob, writeFile, exists } = useOPFS();
  const { convertToWav, loading: isConverting, progress } = useFFmpeg();

  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [isImporting, setIsImporting] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const revokeUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const audioPath = `transcriptAudio/${transcriptId}/${fileName}`;

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const loadFromOPFS = async () => {
      if (!fileName) {
        setLoadState({ status: "missing" });
        return;
      }

      setLoadState({ status: "loading" });

      try {
        const fileExists = await exists(audioPath);

        if (!fileExists) {
          setLoadState({ status: "missing" });
          return;
        }

        const blob = await readFileAsBlob(audioPath);

        revokeUrl();
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setLoadState({ status: "ready", url });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load audio file.";
        setLoadState({ status: "error", message });
      }
    };

    loadFromOPFS();
  }, [audioPath, exists, fileName, isReady, readFileAsBlob, revokeUrl]);

  useEffect(() => {
    return () => revokeUrl();
  }, [revokeUrl]);

  const handleImport = useCallback(
    async (file: File | null) => {
      if (!file || !fileName) return;

      setIsImporting(true);
      try {
        const audioFile = isWavFile(file) ? file : await convertToWav(file);

        const renamedFile = new File([audioFile], fileName, {
          type: audioFile.type,
        });

        await writeFile(audioPath, renamedFile);

        revokeUrl();
        const url = URL.createObjectURL(renamedFile);
        objectUrlRef.current = url;
        setLoadState({ status: "ready", url });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to import audio file.";
        setLoadState({ status: "error", message });
      } finally {
        setIsImporting(false);
      }
    },
    [audioPath, convertToWav, fileName, revokeUrl, writeFile],
  );

  if (!isSupported) {
    return (
      <StickyWrapper>
        <Alert
          icon={<AlertTriangleIcon size={16} />}
          color="yellow"
          radius={0}
          title="Audio not available"
          styles={{
            root: { borderBottom: "1px solid var(--mantine-color-slate-2)" },
          }}
        >
          <Text fz="sm" c="slate.7">
            Your browser does not support the Origin Private File System (OPFS),
            which is required for local audio playback. Try Chrome or Edge 86+.
          </Text>
        </Alert>
      </StickyWrapper>
    );
  }

  if (loadState.status === "loading" || !isReady) {
    return (
      <StickyWrapper>
        <Box
          bg="slate.9"
          px="xl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--mantine-spacing-sm)",
            height: 80,
          }}
        >
          <Loader size="xs" color="slate.4" type="dots" />
          <Text fz="sm" c="slate.4">
            Loading audio…
          </Text>
        </Box>
      </StickyWrapper>
    );
  }

  if (loadState.status === "missing") {
    const importingLabel = isConverting
      ? `Converting… ${progress}%`
      : isImporting
        ? "Importing…"
        : null;

    return (
      <StickyWrapper>
        <Alert
          icon={<InfoIcon size={16} />}
          color="blue"
          radius={0}
          styles={{
            root: { borderBottom: "1px solid var(--mantine-color-slate-2)" },
          }}
        >
          <Stack gap="xs">
            <Text fz="sm" c="slate.7">
              {fileName
                ? `The audio file for this transcript was not found in your local storage (OPFS). Import the original file to enable playback.`
                : `No audio file is associated with this transcript view. Import an audio file to enable playback.`}
            </Text>

            {importingLabel ? (
              <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Loader size="xs" color="blue" type="dots" />
                <Text fz="xs" c="slate.5">
                  {importingLabel}
                </Text>
              </Box>
            ) : (
              <FileButton
                onChange={handleImport}
                accept="audio/wav,audio/mpeg,audio/mp4,audio/aac,audio/ogg,audio/flac,audio/*"
                disabled={!fileName}
              >
                {(props) => (
                  <Button
                    {...props}
                    size="xs"
                    variant="light"
                    color="blue"
                    leftSection={<UploadIcon size={13} />}
                    disabled={!fileName}
                    style={{ alignSelf: "flex-start" }}
                  >
                    Import Audio
                  </Button>
                )}
              </FileButton>
            )}
          </Stack>
        </Alert>
      </StickyWrapper>
    );
  }

  if (loadState.status === "error") {
    return (
      <StickyWrapper>
        <Alert
          icon={<AlertTriangleIcon size={16} />}
          color="red"
          radius={0}
          title="Could not load audio"
          styles={{
            root: { borderBottom: "1px solid var(--mantine-color-slate-2)" },
          }}
        >
          <Text fz="sm" c="slate.7">
            {loadState.message}
          </Text>
        </Alert>
      </StickyWrapper>
    );
  }

  return (
    <StickyWrapper>
      <Audio
        color="slate.9"
        radius={0}
        src={loadState.url}
        styles={{
          playButton: { borderRadius: "4px" },
        }}
      >
        <Audio.Waveform height={32} />
        <Audio.Controls>
          <Audio.PlayButton />
          <Audio.Timeline />
          <Audio.SkipButton seconds={-10} />
          <Audio.TimeDisplay />
          <Audio.SkipButton seconds={10} />
          <Audio.MuteButton />
          <Audio.VolumeSlider />
          <Audio.SpeedControl />
        </Audio.Controls>
      </Audio>
    </StickyWrapper>
  );
}

function StickyWrapper({ children }: { children: React.ReactNode }) {
  const containerStyles = {
    marginLeft: "calc(var(--mantine-spacing-xl) * -1)",
    marginRight: "calc(var(--mantine-spacing-xl) * -1)",
    zIndex: 10,
  };

  return (
    <Box pos="sticky" top={0} style={containerStyles}>
      {children}
    </Box>
  );
}
