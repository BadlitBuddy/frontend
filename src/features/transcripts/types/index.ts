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

export type TranscriptionTask = "transcribe" | "translate";

export const TranscriptionTask = {
  Transcribe: "transcribe" as TranscriptionTask,
  Translate: "translate" as TranscriptionTask,
} as const;

export interface TranscriptionResult {
  /** Full concatenated transcription text. Always present. */
  Text: string;

  /** Detected or forced language code (e.g., "en", "ja"). */
  Language?: string | null;

  /** Confidence of detected language (0–1)*/
  LanguageProbability?: number | null;

  /** Total audio duration in seconds. */
  Duration?: number | null;

  /** Audio duration after VAD filtering*/
  DurationAfterVad?: number | null;

  /** Task performed by the model. Defaults to 'transcribe'. */
  Task?: TranscriptionTask;

  /** Segment-level results with timestamps and confidence metrics. */
  Segments?: TranscriptionSegment[];

  /** Top-level word timestamps */
  Words?: TranscriptionWord[];

  /** Total word count*/
  WordCount?: number | null;

  /** WebVTT-formatted transcript blob */
  Vtt?: string | null;
}

/**
 * One transcribed segment
 */
export interface TranscriptionSegment {
  // --- Identity---
  Id?: number | null;
  Seek?: number | null;

  // --- Core content ---
  Text: string;
  /** Start time in seconds. */
  Start: number;
  /** End time in seconds. */
  End: number;

  /** Per-segment language  */
  Language?: string | null;

  // --- Confidence / quality metrics ---
  Probability?: number | null;
  MinProbability?: number | null;
  MaxProbability?: number | null;

  NoSpeechProbability?: number | null;

  AverageLogProbability?: number | null;
  CompressionRatio?: number | null;
  Temperature?: number | null;

  IsTransient?: boolean | null;

  // --- Token / word breakdown ---
  Tokens?: TranscriptionToken[];

  /** Inline word-level timestamps */
  Words?: TranscriptionWord[];
}

/**
 * A single transcribed word with timing.
 */
export interface TranscriptionWord {
  Word: string;
  /** Start time in seconds. */
  Start: number;
  /** End time in seconds. */
  End: number;

  /** Word-level probability */
  Probability?: number | null;
}

/**
 * A Whisper token. The common surface is `id` and (optionally)
 * `text`; the remaining fields are Whisper.net-specific.
 */
export interface TranscriptionToken {
  /** Whisper vocabulary token id. Always present when tokens are returned. */
  Id: number;

  /** Decoded text fragment for this token, when available. */
  Text?: string | null;

  /** Start time in seconds. */
  Start?: number | null;
  /** End time in seconds. */
  End?: number | null;

  // --- detailed metadata ---
  TimestampId?: number | null;
  Probability?: number | null;
  /** ProbabilityLog */
  LogProbability?: number | null;
  TimestampProbability?: number | null;
  TimestampProbabilitySum?: number | null;
  /** DTW-aligned timestamp (ms) */
  DtwTimestamp?: number | null;
  VoiceLength?: number | null;
}
