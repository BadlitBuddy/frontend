export type BaseEntity = {
  publicId: string;
  createdAt: number;
  modifiedAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
}>;

export type PaginatedList<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type JobStatus = "Processing" | "Finished";

export const EventTypes = {
  TranscriptionEvent: "transcription-event",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];
