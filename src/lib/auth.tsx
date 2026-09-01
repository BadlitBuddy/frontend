"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { paths } from "@/config/paths";
import { api } from "./api-client";
import { useGetUser } from "@/hooks/useGetUser";

const logout = (): Promise<void> => {
  return api.post("/users/logout");
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      router.push(paths.auth.login.getHref());
    },
  });
};

export const AuthLoader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      const loginUrl = paths.auth.login.getHref(pathname);
      router.replace(loginUrl);
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
