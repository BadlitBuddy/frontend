export type TranscriptDetails = {
  id: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  permissions: string;
  duration: string;
  currentTime: string;
  segments: TranscriptSegment[];
};

export type TranscriptSegment = {
  id: string;
  speaker: string;
  time: string;
  active: boolean;
  highlight?: { start: number; end: number };
  text: string;
};
