"use client";

import { Box, Stack, Title } from "@mantine/core";
import { MainPageContainer } from "../_components/MainPageContainer";
import { ProfileSection } from "@/features/settings/components/ProfileSection";
import { BillingSection } from "@/features/settings/components/BillingSection";
import { useGetUserOrganizationDetails } from "@/features/settings/api/get-user-organization-details";
import { useGetUser } from "@/hooks/useGetUser";

export default function SettingsPage() {
  const { data, isLoading } = useGetUserOrganizationDetails();
  const { data: userData } = useGetUser();

  if (!data || !userData) {
    return (
      <div>Failed to load organization details. Please try again later.</div>
    );
  }

  return (
    <MainPageContainer>
      <Stack gap="xl">
        <Box>
          <Title order={1} fz="1.875rem" c="slate.9" fw={800} lh="1.2">
            Settings
          </Title>
        </Box>

        <Stack gap="xl">
          <ProfileSection
            name={userData.firstName + " " + userData.lastName}
            email={userData.email}
            isLoading={isLoading}
          />
          {/* <TranscriptionDefaultsSection /> */}
          {/* <ExportDefaultsSection /> */}
          <BillingSection
            plan={data.subscriptionTypeDesc}
            monthlyUsed={data.minutesUsed}
            monthlyLimit={data.transcriptionMinutesLimit}
            resetDate={data.planEnd}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </MainPageContainer>
  );
}
