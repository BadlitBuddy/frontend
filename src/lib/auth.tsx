"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { paths } from "@/config/paths";
import { api } from "./api-client";
import { User } from "@/types/api";

const getUser = async (): Promise<User> => {
  return await api.get("/users/me");
};

const logout = (): Promise<void> => {
  return api.post("/users/logout");
};

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ["auth-user"],
    queryFn: getUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
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
  const { data: user, isLoading } = useUser();
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
