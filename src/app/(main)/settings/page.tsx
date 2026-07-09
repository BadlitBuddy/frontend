"use client";

import { Box, Stack, Text, Title } from "@mantine/core";
import { MainPageContainer } from "../_components/MainPageContainer";
import { ProfileSection } from "@/features/settings/components/ProfileSection";
import { TranscriptionDefaultsSection } from "@/features/settings/components/TranscriptionDefaultsSection";
import { ExportDefaultsSection } from "@/features/settings/components/ExportDefaultsSection";
import { BillingSection } from "@/features/settings/components/BillingSection";

export default function SettingsPage() {
  return (
    <MainPageContainer>
      <Stack gap="xl">
        <Box>
          <Title order={1} fz="1.875rem" c="slate.9" fw={800} lh="1.2">
            Settings
          </Title>
          <Text size="sm" mt={4} c="slate.5">
            Manage your account preferences and defaults.
          </Text>
        </Box>

        <Stack gap="xl">
          <ProfileSection />
          <TranscriptionDefaultsSection />
          <ExportDefaultsSection />
          <BillingSection />
        </Stack>
      </Stack>
    </MainPageContainer>
  );
}
