"use client";

import { SUPPORTED_CHAIN_IDS } from "@/constants";
import { getPublicClientByChainId } from "@/lib/viem";
import { useState, createContext, useContext } from "react";
import { formatEther, Address } from "viem";

type BlockchainState = {
  balances: {
    chainId: number;
    balance: bigint;
    formatted: string;
  }[];
  addressFromEns: Address | null;
  lastEnsQueried: string | null;
};

type BlockchainContextType = {
  state: BlockchainState;
  fetchBalances: (address: Address) => Promise<void>;
  fetchEnsName: (ensName: string) => Promise<Address | null>;
};

export const BlockchainContext = createContext<BlockchainContextType>({
  state: {
    balances: [],
    addressFromEns: null,
    lastEnsQueried: null,
  },
  fetchBalances: async () => {},
  fetchEnsName: async () => null,
});

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BlockchainState>({
    balances: [],
    addressFromEns: null,
    lastEnsQueried: null,
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

  return (
    <BlockchainContext.Provider value={{ state, fetchBalances, fetchEnsName }}>
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
