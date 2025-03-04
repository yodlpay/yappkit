"use client";

import { getPublicClientByChainId } from "@/lib/viem";
import { COUNTER_ABI } from "@/constants/counterContract";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants";
import { base } from "viem/chains";
import { SupportedChainId } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";

export function useCounter(chainId: number = base.id) {
  const queryClient = useQueryClient();
  const { writeContractAsync: increment } = useWriteContract();

  const {
    data: value,
    isLoading: isReadLoading,
    error: readError,
  } = useQuery({
    queryKey: ["counterValue", chainId],
    queryFn: async () => {
      const client = getPublicClientByChainId(chainId as SupportedChainId);
      return client.readContract({
        address: COUNTER_ADDRESS_BY_CHAIN[chainId],
        abi: COUNTER_ABI,
        functionName: "number",
      });
    },
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });

  const {
    mutateAsync: incrementCounter,
    isPending: isIncrementing,
    error: writeError,
  } = useMutation({
    mutationKey: ["incrementCounter", chainId],
    mutationFn: async () => {
      if (!chainId || chainId === 1) return;
      await increment({
        address: COUNTER_ADDRESS_BY_CHAIN[chainId],
        abi: COUNTER_ABI,
        functionName: "increment",
        args: [],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counterValue", chainId] });
    },
  });

  return {
    value,
    increment: incrementCounter,
    isLoading: isReadLoading || isIncrementing,
    error: readError || writeError,
  };
}
