import { api } from "@/lib/api-client";
import { User } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const getUser = async (): Promise<User> => {
  return await api.get("/users/me");
};

export const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ["auth-user"],
    queryFn: getUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
