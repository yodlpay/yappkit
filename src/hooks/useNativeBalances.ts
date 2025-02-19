import { useQueries } from "@tanstack/react-query";
import { getPublicClientByChainId } from "@/lib/viem";
import { Address, formatEther } from "viem";
import { mainnet } from "viem/chains";
import { SUPPORTED_CHAIN_IDS } from "@/constants";

export function useNativeBalances(address: Address | undefined, enabled = false) {
  const results = useQueries({
    queries: SUPPORTED_CHAIN_IDS.map((chainId) => ({
      queryKey: ["nativeBalance", chainId, address],
      queryFn: async () => {
        if (!address) throw new Error("No address provided");
        try {
          const client = getPublicClientByChainId(chainId);
          const balance = await client.getBalance({ address });

          if (Number(balance) > 0) {
            return {
              chainId,
              balance,
              formatted: formatEther(balance),
            };
          }
        } catch (error) {
          console.error(`Error fetching balance for chain ${chainId}:`, error);
        }
      },
      enabled: enabled && !!address,
      // staleTime: 300_000,
      staleTime: 300_000,
    })),
  });

  const data = results.map((result) => result.data).filter((data) => data !== undefined);
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.every((result) => result.isError);

  return {
    data,
    isLoading,
    isError,
  };
}

export const useEns = ({ address, ensName }: { address: Address | null; ensName?: string }) => {
  return useQueries({
    queries: [
      {
        queryKey: ["ens", "address", ensName],
        queryFn: async () => {
          if (!ensName) return null;
          const viemMainnetClient = getPublicClientByChainId(mainnet.id);
          return viemMainnetClient.getEnsAddress({ name: ensName });
        },
        enabled: !!ensName,
        staleTime: 5 * 60 * 1000, // ENS data can be cached longer, 5 minutes
      },
      {
        queryKey: ["ens", "name", address],
        queryFn: async () => {
          if (!address) return null;
          const viemMainnetClient = getPublicClientByChainId(mainnet.id);
          return viemMainnetClient.getEnsName({ address });
        },
        enabled: !!address,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });
};
