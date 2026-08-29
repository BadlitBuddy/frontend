import { TranscriptionJobStatus } from "@/features/dashboard/types";
import { Anchor, Box, Group, Text } from "@mantine/core";
import { DownloadMenu } from "./DownloadMenu";
import Link from "next/link";

type RowActionProps = {
  transcriptId: string;
  fileName: string;
  status: TranscriptionJobStatus;
};

export function RowAction({ transcriptId, fileName, status }: RowActionProps) {
  if (status === TranscriptionJobStatus.Processing) {
    return (
      <Text size="xs" fw={600} c="slate.4" lts="0.04em" tt="uppercase">
        Please wait…
      </Text>
    );
  }

  return (
    <Group gap={8} justify="flex-end">
      <Anchor
        component={Link}
        href={`/transcripts/${encodeURIComponent(transcriptId)}?fileName=${encodeURIComponent(fileName)}`}
        size="xs"
        fw={700}
        underline="hover"
        c="slate.9"
        lts="0.04em"
        tt="uppercase"
      >
        View
      </Anchor>
      <Box
        component="button"
        aria-label={`Download ${fileName}`}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "var(--mantine-color-slate-4)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--mantine-color-slate-7)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--mantine-color-slate-4)")
        }
      >
        <DownloadMenu transcriptId={transcriptId} />
      </Box>
    </Group>
  );
}
