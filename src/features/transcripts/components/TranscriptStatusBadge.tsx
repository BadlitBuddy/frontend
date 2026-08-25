import { TranscriptionJobStatus } from "@/features/dashboard/types";
import { Badge } from "@mantine/core";

type StatusBadgeProps = {
  status: TranscriptionJobStatus;
};
export function TranscriptStatusBadge({ status }: StatusBadgeProps) {
  if (status === TranscriptionJobStatus.Completed) {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="success.7"
        styles={{
          root: {
            backgroundColor: "var(--mantine-color-success-0)",
            color: "var(--mantine-color-success-7)",
            border: "1px solid var(--mantine-color-success-2)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        Completed
      </Badge>
    );
  }

  if (status === TranscriptionJobStatus.Processing) {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="warning.6"
        styles={{
          root: {
            backgroundColor: "var(--mantine-color-warning-0)",
            color: "var(--mantine-color-warning-7)",
            border: "1px solid var(--mantine-color-warning-2)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        Processing
      </Badge>
    );
  }

  if (status === TranscriptionJobStatus.Failed) {
    return (
      <Badge
        variant="dot"
        size="sm"
        color="error.6"
        styles={{
          root: {
            backgroundColor: "var(--mantine-color-error-0)",
            color: "var(--mantine-color-error-7)",
            border: "1px solid var(--mantine-color-error-2)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        Failed
      </Badge>
    );
  }

  return (
    <Badge variant="dot" size="sm" color="slate.5">
      Uploaded
    </Badge>
  );
}
