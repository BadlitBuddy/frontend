"use client";

import { Box, Stack, Text, Title } from "@mantine/core";
import { WorkspaceUploader } from "@/features/dashboard/components/WorkspaceUploader";
import { TranscriptionSettings } from "@/features/dashboard/components/TranscriptionSettings";
import { RecentTranscriptions } from "@/features/dashboard/components/RecentTranscriptions";
import classes from "./dashboard.module.css";
import { MainPageContainer } from "../_components/MainPageContainer";

export default function DashboardPage() {
  return (
    <MainPageContainer>
      <Stack gap="xl">
        <Box>
          <Title
            order={1}
            fz="1.875rem"
            c="slate.9"
            fw="800"
            style={{
              lineHeight: 1.2,
            }}
          >
            Workspace
          </Title>
          <Text size="sm" mt={4} c="slate.5">
            Upload audio or video files to generate professional transcripts.
          </Text>
        </Box>

        <div className={classes.workspaceGrid}>
          <WorkspaceUploader />
          <TranscriptionSettings />
        </div>

        <RecentTranscriptions />
      </Stack>
    </MainPageContainer>
  );
}
