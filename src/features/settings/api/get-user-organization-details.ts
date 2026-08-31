import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export type UserOrganizationDetailsDto = {
  subscriptionType: number;
  subscriptionTypeDesc: string;
  transcriptionMinutesLimit: number;
  minutesUsed: number;
  minutesRemaining: number;
  planStart: string;
  planEnd: string;
};

export const getUserOrganizationDetails =
  (): Promise<UserOrganizationDetailsDto> => {
    return api.get("/Users/me/organization");
  };

export const getUserOrganizationDetailsQueryOptions = () => {
  return queryOptions({
    queryKey: ["users", "me", "organization"],
    queryFn: getUserOrganizationDetails,
  });
};

type UseGetUserOrganizationDetailsOptions = {
  queryConfig?: QueryConfig<typeof getUserOrganizationDetailsQueryOptions>;
};

export const useGetUserOrganizationDetails = ({
  queryConfig,
}: UseGetUserOrganizationDetailsOptions = {}) => {
  return useQuery({
    ...getUserOrganizationDetailsQueryOptions(),
    ...queryConfig,
  });
};
