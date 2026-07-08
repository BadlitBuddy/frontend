"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@mantine/core/styles.css";
import '@gfazioli/mantine-audio/styles.css';
import {
  AppShell,
  Anchor,
  Avatar,
  Box,
  Divider,
  Group,
  MantineProvider,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { wordscribeTheme } from "./mantine-theme";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import classes from "./layout.module.css";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboardIcon },
  { href: "/transcripts", label: "Transcripts", Icon: FileTextIcon },
  { href: "/settings", label: "Settings", Icon: SettingsIcon },
];

function NavItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: React.FC<{ size?: number; color?: string }>;
  active: boolean;
}) {
  return (
    <UnstyledButton
      component={Link}
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: "var(--mantine-radius-sm)",
        backgroundColor: active
          ? "var(--mantine-color-slate-1)"
          : "transparent",
        color: active
          ? "var(--mantine-color-slate-9)"
          : "var(--mantine-color-slate-5)",
        fontWeight: active ? 600 : 500,
        fontSize: "0.875rem",
        transition: "background-color 120ms ease, color 120ms ease",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor =
            "var(--mantine-color-slate-0)";
          e.currentTarget.style.color = "var(--mantine-color-slate-7)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--mantine-color-slate-5)";
        }
      }}
    >
      <Icon
        size={16}
        color={active ? "var(--mantine-color-slate-9)" : "currentColor"}
      />
      {label}
    </UnstyledButton>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MantineProvider theme={wordscribeTheme} defaultColorScheme="light">
      <AppShell navbar={{ width: 240, breakpoint: "md" }} padding="xl">
        <AppShell.Navbar>
          <AppShell.Section p="md">
            <Anchor
              component={Link}
              href="/dashboard"
              underline="never"
              display="flex"
              style={{ alignItems: "center", gap: 10 }}
            >
              <Box
                display="flex"
                w={32}
                h={32}
                bg="slate.9"
                bdrs="sm"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/logo/pulse-svgrepo-com.svg"
                  alt="WordScribe Logo"
                  width={32}
                  height={32}
                />
              </Box>
              <Text
                fw={700}
                size="md"
                style={{ color: "var(--mantine-color-slate-9)" }}
              >
                WordScribe
              </Text>
            </Anchor>
          </AppShell.Section>

          <Divider color="slate.2" />

          {/* Navigation */}
          <AppShell.Section grow p="sm">
            <Stack gap={2} mt="sm">
              {NAV_LINKS.map(({ href, label, Icon }) => (
                // TODO: component
                <NavItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  active={pathname === href}
                />
              ))}
            </Stack>
          </AppShell.Section>

          <Divider color="slate.2" />

          {/* User profile */}
          <AppShell.Section p="md">
            <Group gap="sm" mb="sm">
              <Avatar
                size={36}
                radius="xl"
                bg="slate.8"
                fw={700}
                style={{
                  color: "#fff",
                }}
              >
                {/* //TODO: Replace with actual user initial */}
                JD
              </Avatar>
              <Box style={{ flex: 1, overflow: "hidden" }}>
                <Text
                  size="sm"
                  fw={600}
                  style={{ color: "var(--mantine-color-slate-9)" }}
                  truncate
                >
                  {/* //TODO: Replace with actual user name */}
                  John Doe
                </Text>
                <Text
                  size="xs"
                  style={{ color: "var(--mantine-color-slate-4)" }}
                  truncate
                >
                  {/* //TODO: Replace with actual user email */}
                  john@example.com
                </Text>
              </Box>
            </Group>

            {/* // TODO: Implement sign out functionality */}
            <UnstyledButton
              component={Link}
              href="/"
              className={classes.signOutButton}
            >
              <LogOutIcon size={14} />
              Sign Out
            </UnstyledButton>
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main bg="slate.0">{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
