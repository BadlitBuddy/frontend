"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@mantine/core/styles.css";
import "@gfazioli/mantine-audio/styles.css";
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
import { badlitBuddyTheme } from "./mantine-theme";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import classes from "./layout.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute, useLogout } from "@/lib/auth";
import { Notifications } from "@/components/notifications/notifications";
import { useGetUser } from "@/hooks/useGetUser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

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

function InnerAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: user } = useGetUser();
  const logoutMutation = useLogout();

  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
      "U"
    : "U";

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "User";

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <MantineProvider theme={badlitBuddyTheme} defaultColorScheme="light">
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
                  alt="Badlit Buddy Logo"
                  width={32}
                  height={32}
                />
              </Box>
              <Text
                fw={700}
                size="md"
                style={{ color: "var(--mantine-color-slate-9)" }}
              >
                Badlit Buddy
              </Text>
            </Anchor>
          </AppShell.Section>

          <Divider color="slate.2" />

          {/* Navigation */}
          <AppShell.Section grow p="sm">
            <Stack gap={2} mt="sm">
              {NAV_LINKS.map(({ href, label, Icon }) => (
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
                {userInitials}
              </Avatar>
              <Box style={{ flex: 1, overflow: "hidden" }}>
                <Text
                  size="sm"
                  fw={600}
                  style={{ color: "var(--mantine-color-slate-9)" }}
                  truncate
                >
                  {fullName}
                </Text>
                <Text
                  size="xs"
                  style={{ color: "var(--mantine-color-slate-4)" }}
                  truncate
                >
                  {user?.email || ""}
                </Text>
              </Box>
            </Group>

            <UnstyledButton
              onClick={handleLogout}
              className={classes.signOutButton}
              disabled={logoutMutation.isPending}
            >
              <LogOutIcon size={14} />
              {logoutMutation.isPending ? "Signing Out..." : "Sign Out"}
            </UnstyledButton>
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main bg="slate.0">{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <ProtectedRoute>
        <InnerAppLayout>{children}</InnerAppLayout>
      </ProtectedRoute>
    </QueryClientProvider>
  );
}
