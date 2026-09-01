"use client";

import { Grid, Paper, Skeleton, Stack, Text, TextInput } from "@mantine/core";

type ProfileSectionProps = {
  name: string;
  email: string;
  isLoading?: boolean;
};

export function ProfileSection({
  name,
  email,
  isLoading,
}: ProfileSectionProps) {
  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} c="slate.4" lts="0.1em" tt="uppercase">
        Profile
      </Text>

      {isLoading ? (
        <Skeleton mih={125} radius="xl" />
      ) : (
        <Paper withBorder p="lg" radius="sm" bg="white" bd="1px solid slate.2">
          <Stack gap="md">
            <Grid gap="md">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Name"
                  defaultValue={name}
                  readOnly
                  size="sm"
                  c="slate.7"
                  mb="4"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Email"
                  defaultValue={email}
                  readOnly
                  size="sm"
                  c="slate.7"
                  mb="4"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
