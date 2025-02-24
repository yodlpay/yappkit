"use client";

import { SUPPORTED_CHAIN_IDS } from "@/constants";
import { getPublicClientByChainId } from "@/lib/viem";
import { useState, createContext, useContext } from "react";
import { formatEther, Address } from "viem";
import { COUNTER_ABI } from "@/constants/contractAbi";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants/contracts";
import { base } from "viem/chains";
import { SupportedChainId } from "@/types";

type BlockchainState = {
  balances: {
    chainId: number;
    balance: bigint;
    formatted: string;
  }[];
  addressFromEns: Address | null;
  lastEnsQueried: string | null;
  lastAddressQueried: Address | null;
  counterValue: bigint | null;
};

type BlockchainContextType = {
  state: BlockchainState;
  fetchBalances: (address: Address) => Promise<void>;
  fetchEnsName: (ensName: string) => Promise<Address | null>;
  fetchCounterValue: (chainId?: number) => Promise<void>;
};

export const BlockchainContext = createContext<BlockchainContextType>({
  state: {
    balances: [],
    addressFromEns: null,
    lastEnsQueried: null,
    lastAddressQueried: null,
    counterValue: null,
  },
  fetchBalances: async () => {},
  fetchEnsName: async () => null,
  fetchCounterValue: async () => {},
});

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BlockchainState>({
    balances: [],
    addressFromEns: null,
    lastEnsQueried: null,
    lastAddressQueried: null,
    counterValue: null,
  });

  const fetchBalances = async (address: Address) => {
    const clients = SUPPORTED_CHAIN_IDS.map((chainId) => getPublicClientByChainId(chainId));

    const results = await Promise.all(
      clients.map(async (client, index) => {
        try {
          const balance = await client.getBalance({ address });
          return {
            chainId: SUPPORTED_CHAIN_IDS[index],
            balance,
            formatted: formatEther(balance),
          };
        } catch (error) {
          console.error(`Error fetching balance:`, error);
          return null;
        }
      })
    );

    setState((prev) => ({
      ...prev,
      balances: results.filter((r): r is NonNullable<typeof r> => Boolean(r)),
      lastAddressQueried: address,
    }));
  };

  const fetchEnsName = async (ensName: string): Promise<Address | null> => {
    try {
      const client = getPublicClientByChainId(1); // mainnet
      const address = await client.getEnsAddress({ name: ensName });
      if (address) {
        setState((prev) => ({
          ...prev,
          addressFromEns: address,
          lastEnsQueried: ensName,
        }));
        return address;
      }
      return null;
    } catch (error) {
      console.error("Error resolving ENS name:", error);
      return null;
    }
  };

  const fetchCounterValue = async (chainId: number = base.id) => {
    const client = getPublicClientByChainId(chainId as SupportedChainId);
    try {
      const value = await client.readContract({
        address: COUNTER_ADDRESS_BY_CHAIN[chainId],
        abi: COUNTER_ABI,
        functionName: "number",
      });
      setState((prev) => ({ ...prev, counterValue: value }));
    } catch (error) {
      console.error("Error reading counter value:", error);
    }
  };

  return (
    <BlockchainContext.Provider value={{ state, fetchBalances, fetchEnsName, fetchCounterValue }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
}
