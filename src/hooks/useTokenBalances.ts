"use client";

import { getPublicClientByChainId } from "@/lib/viem";
import { Address, erc20Abi, formatUnits } from "viem";
import { SupportedChainId } from "@/types";
import { getTokenBySymbol } from "@yodlpay/tokenlists";
import { useQuery } from "@tanstack/react-query";

export function useTokenBalances(
  address: Address | undefined,
  chainId: SupportedChainId,
  tokens: string[]
) {
  return useQuery({
    queryKey: ["tokenBalances", chainId, address],
    queryFn: async () => {
      const client = getPublicClientByChainId(chainId);
      const tokenBalances = await Promise.all(
        tokens.map(async (tokenSymbol) => {
          const token = getTokenBySymbol(tokenSymbol, chainId);
          if (!token) return;

          const balance = await client.readContract({
            address: token.address as Address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address!],
          });

          return {
            chainId,
            token,
            balance,
            formatted: formatUnits(balance, token.decimals),
          };
        })
      );

      const filteredTokenBalances = tokenBalances.filter((tokenBalance) => !!tokenBalance);
      return filteredTokenBalances;
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
}
