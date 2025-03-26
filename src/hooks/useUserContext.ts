import { useQuery } from "@tanstack/react-query";
import { sdk } from "@/lib/sdk";
import { UserContext } from "@yodlpay/yapp-sdk/types";
import { Address } from "viem";

const exampleContext: UserContext = {
  address: "0x1234567890123456789012345678901234567890" as Address,
  primaryEnsName: "example.eth",
  community: {
    ensName: "community.example.eth",
    address: "0x1234567890123456789012345678901234567890" as Address,
    userEnsName: "user.example.eth",
  },
};

/**
 * Hook to fetch and manage user data using Tanstack Query
 */
export function useUserContext() {
  return {
    data: exampleContext,
    isLoading: false,
  };
  // return useQuery<UserContext>({
  //   queryKey: ["sdk-user-context"],
  //   queryFn: async () => {
  //     const userData = await sdk.getUserContext();
  //     return userData;
  //   },
  //   staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  //   refetchOnWindowFocus: true, // Refetch when user returns to the app
  // });
}
