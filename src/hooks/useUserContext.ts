import { useQuery } from "@tanstack/react-query";
import { sdk } from "@/lib/sdk";
import { UserContext } from "@yodlpay/yapp-sdk/types";

/**
 * Hook to fetch and manage user data using Tanstack Query
 */
export function useUserContext() {
  return useQuery<UserContext>({
    queryKey: ["sdk-user-context"],
    queryFn: async () => {
      const userData = await sdk.getUserContext();
      return userData;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Refetch when user returns to the app
  });
}
