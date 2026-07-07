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

export type DurationFilter =
  | "all"
  | "under5"
  | "fiveTo30"
  | "thirtyTo60"
  | "over60";
