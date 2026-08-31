"use client";

import {
  Box,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const MONTHLY_USED = 43;
const MONTHLY_LIMIT = 300;
const RESET_DATE = "Nov 1, 2024";

export function BillingSection() {
  const usagePercent = Math.round((MONTHLY_USED / MONTHLY_LIMIT) * 100);

  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} c="slate.4" lts="0.1em" tt="uppercase">
        Billing
      </Text>

      <Paper withBorder p="lg" radius="sm" bg="white" bd="1px solid slate.2">
        <Stack gap="md">
          <Group justify="space-between" align="flex-end">
            <Box>
              <Text size="xs" c="slate.5" mb={4}>
                Current plan
              </Text>
              <Title order={3} fz="1.5rem" fw={700} c="slate.9">
                Free
              </Title>
            </Box>
            {/* <Button
              size="sm"
              bg="slate.9"
              c="white"
              radius="sm"
              fw={600}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-slate-7)",
                  },
                },
              }}
            >
              Upgrade to Pro
            </Button> */}
          </Group>

          <Divider color="slate.1" />

          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={600} c="slate.8">
                Monthly Usage
              </Text>
              <Text size="sm" c="slate.5">
                {MONTHLY_USED} / {MONTHLY_LIMIT} min
              </Text>
            </Group>
            <Progress
              value={usagePercent}
              color="slate.8"
              size="xs"
              radius="xl"
              bg="slate.2"
            />
            <Text size="xs" c="slate.4">
              Resets on {RESET_DATE}
            </Text>
          </Stack>

          {/* <Divider color="slate.1" /> */}

          {/* <Group gap="md">
            <Anchor
              size="sm"
              c="slate.6"
              underline="hover"
              fw={500}
              style={{ cursor: "pointer" }}
            >
              Manage payment method
            </Anchor>
            <Anchor
              size="sm"
              c="slate.6"
              underline="hover"
              fw={500}
              style={{ cursor: "pointer" }}
            >
              View invoices
            </Anchor>
          </Group> */}
        </Stack>
      </Paper>
    </Stack>
  );
}
