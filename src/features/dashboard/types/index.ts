export type FileType = "mp3" | "mp4" | "wav" | "mov" | "m4a";

export interface TranscriptionPreferences {
  speakerDetection: boolean;
  autoPunctuation: boolean;
  timecoding: boolean;
}

export const TranscriptionJobStatus = {
  Uploaded: 0,
  Processing: 1,
  Completed: 2,
} as const;

export type TranscriptionJobStatus =
  (typeof TranscriptionJobStatus)[keyof typeof TranscriptionJobStatus];
