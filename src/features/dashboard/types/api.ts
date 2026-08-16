import { TranscriptionJobStatus } from ".";

export type UpdateFileStatusResponse = {
  unprocessedObjectKey: string;
  jobStatus: TranscriptionJobStatus;
  jobStatusName: string;
};
