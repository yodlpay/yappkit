import { useQuery } from "@tanstack/react-query";
import { QueryParams } from "@/app/indexer/types";
import { fetchIndexerData } from '@/app/indexer/components/utils';

export function useIndexerQuery(params: QueryParams) {
  return useQuery({
    queryKey: ["indexer", params],
    queryFn: () => fetchIndexerData(params),
    enabled: false, // Manual trigger only
    gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
  });
}
