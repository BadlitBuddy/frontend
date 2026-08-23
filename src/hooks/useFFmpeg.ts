"use client";

import { useRef, useState, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

const BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const load = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    setLoading(true);
    const ffmpeg = new FFmpeg();

    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${BASE_URL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });

    ffmpegRef.current = ffmpeg;
    setLoaded(true);
    setLoading(false);
    return ffmpeg;
  }, []);

  const convertToWav = useCallback(
    async (file: File): Promise<File> => {
      const ffmpeg = await load();
      const inputName = "input" + getExt(file.name);
      const outputName = "output.wav";

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      await ffmpeg.exec([
        "-i",
        inputName,
        "-ar",
        "16000",
        "-ac",
        "1",
        "-c:a",
        "pcm_s16le",
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      const bytes =
        typeof data === "string"
          ? new TextEncoder().encode(data)
          : new Uint8Array(data);

      const outputFileName = file.name.replace(/\.[^/.]+$/, "") + ".wav";
      return new File([bytes], outputFileName, { type: "audio/wav" });
    },
    [load],
  );

  return { load, convertToWav, loaded, loading, progress };
}

export function isWavFile(file: File) {
  const ext = getExt(file.name).toLowerCase();
  const type = file.type.toLowerCase();
  return (
    ext === ".wav" ||
    type === "audio/wav" ||
    type === "audio/x-wav" ||
    type === "audio/wave"
  );
}

function getExt(filename: string) {
  const i = filename.lastIndexOf(".");
  return i === -1 ? "" : filename.slice(i);
}
