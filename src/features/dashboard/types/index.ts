// TODO: get actual transcript types
export type TranscriptStatus = "completed" | "processing" | "failed";

export type FileType = "mp3" | "mp4" | "wav" | "mov" | "m4a";

export interface Transcript {
  id: string;
  fileName: string;
  fileType: FileType;
  date: string;
  duration: string;
  status: TranscriptStatus;
}

export interface TranscriptionPreferences {
  speakerDetection: boolean;
  autoPunctuation: boolean;
  timecoding: boolean;
}

export const TranscriptionJobStatus = {
  Uploaded: 1,
  Processing: 2,
  Completed: 3,
} as const;

export type TranscriptionJobStatus =
  (typeof TranscriptionJobStatus)[keyof typeof TranscriptionJobStatus];
