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

export type JobStatus = "Processing" | "Finished";
