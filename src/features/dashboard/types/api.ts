import { TranscriptionJobStatus } from ".";

export type UploadUrlDto = {
  url: string;
  objectKey: string;
};

export type UpdateFileStatusResponse = {
  unprocessedObjectKey: string;
  jobStatus: TranscriptionJobStatus;
  jobStatusName: string;
};
