"use client";

import {
  Anchor,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "../styles/settings.module.css";

export function ProfileSection() {
  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} c="slate.4" lts="0.1em" tt="uppercase">
        Profile
      </Text>
      <Paper withBorder p="lg" radius="sm" bg="white" bd="1px solid slate.2">
        <Stack gap="md">
          <Grid gap="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Name"
                defaultValue="Kenneth Joshua"
                size="sm"
                c="slate.7"
                mb="4"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Email"
                defaultValue="kenneth@example.com"
                size="sm"
                c="slate.7"
                mb="4"
              />
            </Grid.Col>
          </Grid>

          <Divider color="slate.1" />

          <Box>
            <Group justify="space-between" align="center">
              <PasswordInput
                label="Password"
                defaultValue="password123"
                size="sm"
                style={{ flex: 1 }}
                c="slate.7"
                mb="4"
              />
            </Group>
          </Box>

          <Divider color="slate.1" />

          <Group justify="flex-end">
            <Button
              variant="transparent"
              size="sm"
              className={classes.inlineLink}
            >
              Change Password
            </Button>
            <Anchor
              size="sm"
              c="error.6"
              fw={500}
              underline="hover"
              style={{ cursor: "pointer" }}
            >
              Delete account
            </Anchor>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
