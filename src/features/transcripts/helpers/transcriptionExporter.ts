import { TranscriptionResult } from "../types";

export type TranscriptionExportFormat = "srt" | "vtt" | "txt" | "json";

export const TranscriptionExportFormat = {
  Srt: "srt" as TranscriptionExportFormat,
  Vtt: "vtt" as TranscriptionExportFormat,
  Txt: "txt" as TranscriptionExportFormat,
  Json: "json" as TranscriptionExportFormat,
} as const;

export class TranscriptionExporter {
  public export(
    result: TranscriptionResult,
    format: TranscriptionExportFormat,
  ): string {
    switch (format.toLowerCase()) {
      case "srt":
        return this.toSrt(result);
      case "vtt":
        return this.toVtt(result);
      case "txt":
        return this.toTxt(result);
      case "json":
        return this.toJson(result);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  public toSrt(result: TranscriptionResult): string {
    if (!result)
      throw new Error("Transcription result cannot be null or undefined.");

    const segments = result.Segments ?? [];

    if (segments.length === 0) {
      const end = result.Duration ?? 0;
      if (!result.Text || !result.Text.trim()) {
        return "";
      }
      return (
        `1\n` +
        `${this.formatSrtTimestamp(0)} --> ${this.formatSrtTimestamp(end)}\n` +
        `${result.Text.trim()}\n\n`
      );
    }

    let output = "";
    segments.forEach((segment, index) => {
      output += `${index + 1}\n`;
      output += `${this.formatSrtTimestamp(segment.Start)} --> ${this.formatSrtTimestamp(segment.End)}\n`;
      output += `${segment.Text.trim()}\n\n`;
    });

    return output;
  }

  public toVtt(result: TranscriptionResult): string {
    if (!result)
      throw new Error("Transcription result cannot be null or undefined.");

    if (result.Vtt && result.Vtt.trim()) {
      return result.Vtt;
    }

    let output = "WEBVTT\n\n";
    const segments = result.Segments ?? [];

    if (segments.length === 0) {
      if (result.Text && result.Text.trim()) {
        const end = result.Duration ?? 0;
        output += `${this.formatVttTimestamp(0)} --> ${this.formatVttTimestamp(end)}\n`;
        output += `${result.Text.trim()}\n\n`;
      }
      return output;
    }

    for (const segment of segments) {
      output += `${this.formatVttTimestamp(segment.Start)} --> ${this.formatVttTimestamp(segment.End)}\n`;
      output += `${segment.Text.trim()}\n\n`;
    }

    return output;
  }

  public toTxt(result: TranscriptionResult): string {
    if (!result)
      throw new Error("Transcription result cannot be null or undefined.");

    const segments = result.Segments ?? [];

    if (segments.length === 0) {
      return (result.Text ?? "").trim();
    }

    return segments
      .map((segment) => segment.Text.trim())
      .join("\n")
      .trimEnd();
  }

  public toJson(result: TranscriptionResult): string {
    return JSON.stringify(result, null, 2);
  }

  private formatSrtTimestamp(seconds: number): string {
    return this.formatTimestamp(seconds, ",");
  }

  private formatVttTimestamp(seconds: number): string {
    return this.formatTimestamp(seconds, ".");
  }

  private formatTimestamp(seconds: number, msSeparator: string): string {
    const safeSeconds = Math.max(0, seconds || 0);

    const totalMs = Math.round(safeSeconds * 1000);
    const ms = totalMs % 1000;
    const totalSec = Math.floor(totalMs / 1000);
    const s = totalSec % 60;
    const m = Math.floor(totalSec / 60) % 60;
    const h = Math.floor(totalSec / 3600);

    const pad = (num: number, size: number) =>
      num.toString().padStart(size, "0");

    return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}${msSeparator}${pad(ms, 3)}`;
  }
}
