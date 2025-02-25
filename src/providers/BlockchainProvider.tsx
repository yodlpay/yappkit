"use client";

import { SUPPORTED_CHAIN_IDS } from "@/constants";
import { getPublicClientByChainId } from "@/lib/viem";
import { useState, createContext, useContext } from "react";
import { formatEther, Address, getContract, erc20Abi, formatUnits } from "viem";
import { COUNTER_ABI } from "@/constants/contractAbi";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants/contracts";
import { base } from "viem/chains";
import { SupportedChainId } from "@/types";
import { getTokenBySymbol, TokenInfo } from "@yodlpay/tokenlists";

type BlockchainState = {
  // balances: {
  //   chainId: number;
  //   balance: bigint;
  //   formatted: string;
  // }[];
  tokenBalances: {
    chainId: number;
    token: TokenInfo;
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
  // fetchBalances: (address: Address) => Promise<void>;
  fetchTokenBalances: (
    address: Address,
    chainId: SupportedChainId,
    tokenSymbols: string[]
  ) => Promise<void>;
  fetchEnsName: (ensName: string) => Promise<Address | null>;
  fetchCounterValue: (chainId?: number) => Promise<void>;
};

const BlockchainContext = createContext<BlockchainContextType>({
  state: {
    // balances: [],
    tokenBalances: [],
    addressFromEns: null,
    lastEnsQueried: null,
    lastAddressQueried: null,
    counterValue: null,
  },
  // fetchBalances: async () => {},
  fetchTokenBalances: async () => {},
  fetchEnsName: async () => null,
  fetchCounterValue: async () => {},
});

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BlockchainState>({
    // balances: [],
    tokenBalances: [],
    addressFromEns: null,
    lastEnsQueried: null,
    lastAddressQueried: null,
    counterValue: null,
  });

  const fetchTokenBalances = async (
    address: Address,
    chainId: SupportedChainId,
    tokenSymbols: string[]
  ) => {
    const client = getPublicClientByChainId(chainId);

    const tokenBalances = await Promise.all(
      tokenSymbols.map(async (tokenSymbol) => {
        const token = getTokenBySymbol(tokenSymbol, chainId);
        if (!token) return;

        const balance = await client.readContract({
          address: token.address as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        });

        if (balance === BigInt(0)) return;

        return {
          chainId,
          token,
          balance,
          formatted: formatUnits(balance, token.decimals),
        };
      })
    );

    const filteredTokenBalances = tokenBalances.filter((tokenBalance) => !!tokenBalance);

    setState((prev) => ({ ...prev, tokenBalances: filteredTokenBalances }));
  };

  // const fetchBalances = async (address: Address) => {
  //   const clients = SUPPORTED_CHAIN_IDS.map((chainId) => getPublicClientByChainId(chainId));

  //   const results = await Promise.all(
  //     clients.map(async (client, index) => {
  //       try {
  //         const balance = await client.getBalance({ address });
  //         return {
  //           chainId: SUPPORTED_CHAIN_IDS[index],
  //           balance,
  //           formatted: formatEther(balance),
  //         };
  //       } catch (error) {
  //         console.error(`Error fetching balance:`, error);
  //         return null;
  //       }
  //     })
  //   );

  //   setState((prev) => ({
  //     ...prev,
  //     balances: results.filter((r): r is NonNullable<typeof r> => Boolean(r)),
  //     lastAddressQueried: address,
  //   }));
  // };

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
    <BlockchainContext.Provider
      value={{
        state,
        // fetchBalances,
        fetchTokenBalances,
        fetchEnsName,
        fetchCounterValue,
      }}
    >
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
