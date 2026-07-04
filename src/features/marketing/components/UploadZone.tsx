"use client";

import {
  ArrowRightIcon,
  CircleCheckBigIcon,
  CloudUploadIcon,
} from "lucide-react";
import React, { useState, useRef } from "react";

type UploadState = "idle" | "uploading" | "transcribing" | "completed";

export default function UploadZone() {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      startMockUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      startMockUpload(files[0]);
    }
  };

  const startMockUpload = (file: File) => {
    setFileName(file.name);
    setFileSize(formatBytes(file.size));
    setState("uploading");
    setProgress(0);

    // Mock Upload Progress
    let currentProgress = 0;
    const uploadInterval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(uploadInterval);
        // Transition to transcribing
        setState("transcribing");
        // Mock Transcription time
        setTimeout(() => {
          setState("completed");
        }, 2000);
      }
    }, 200);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setState("idle");
    setFileName("");
    setFileSize("");
    setProgress(0);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <button
            onClick={triggerFileSelect}
            className="flex flex-col items-start justify-center p-6 bg-ws-primary hover:opacity-90 text-ws-surface rounded-lg text-left transition-all duration-300 min-h-30 shadow-sm hover:shadow-md cursor-pointer group w-full"
          >
            <span className="text-lg font-semibold flex items-center gap-2">
              Transcribe Your First File
              <ArrowRightIcon
                size={25}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
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
                  Free preview: first 15 minutes, no account required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {(state === "uploading" || state === "transcribing") && (
        <div className="p-6 bg-ws-surface border border-ws-border rounded-lg shadow-sm w-full">
          <div className="flex items-center gap-3 mb-4">
            {/* Loading/Spinner */}
            <div className="w-8 h-8 rounded-full border-4 border-ws-border border-t-ws-primary animate-spin shrink-0" />
            <div>
              <p className="font-semibold text-sm text-ws-text-primary truncate max-w-62.5">
                {fileName}
              </p>
              <p className="text-xs text-ws-text-muted">{fileSize}</p>
            </div>
          </div>

          {state === "uploading" ? (
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
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-ws-text-secondary mb-1 animate-pulse">
                <span>AI Engine Transcribing...</span>
                <span>Analyzing speakers &amp; timestamps</span>
              </div>
              <div className="w-full bg-ws-background rounded-full h-2 overflow-hidden relative">
                <div className="bg-ws-success h-2 rounded-full absolute left-0 top-0 animate-indeterminate-bar" />
              </div>
            </div>
          )}
        </div>
      )}

      {state === "completed" && (
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
                  {fileName} ({fileSize})
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

          {/* Transcript preview box */}
          <div className="bg-ws-background p-3 rounded border border-ws-border text-xs font-mono text-ws-text-secondary space-y-2 mb-4 max-h-25 overflow-y-auto">
            <div>
              <span className="text-blue-600 font-semibold">
                [00:02 - Speaker 1]:
              </span>{" "}
              Welcome to WordScribe. In this quick video tutorial, we are going
              to show you...
            </div>
            <div>
              <span className="text-purple-600 font-semibold">
                [00:15 - Speaker 2]:
              </span>{" "}
              Wow, that was super fast. The punctuation and speaker diarization
              is extremely spot on.
            </div>
          </div>

          <a
            href="/dashboard"
            className="btn btn-sm btn-neutral w-full text-xs font-semibold normal-case rounded"
          >
            Open in Editor
          </a>
        </div>
      )}
    </div>
  );
}
