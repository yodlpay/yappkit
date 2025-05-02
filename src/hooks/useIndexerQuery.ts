import { useQuery } from "@tanstack/react-query";
import { sdk } from "@/lib/sdk";
import { QueryParams } from "@/app/indexer/types";

export function useIndexerQuery(params: QueryParams) {
  return useQuery({
    queryKey: ["indexer", params],
    queryFn: async () => {
      const result = await sdk.getPayments(params);
      return result;
    },
    enabled: false, // Manual trigger only
    gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
  });
}
