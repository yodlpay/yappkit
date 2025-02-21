import { Address } from 'viem';

export const COUNTER_ADDRESS_BY_CHAIN: Record<number, Address> = {
  // 1: "0x...", // mainnet
  137: "0xD54D2eFA7617e62ec133527c65dD178980c26CB4", // polygon
  // 10: "0x...", // optimism
  42161: "0x006b0B8D00b9C632b5B44a42DCbd5D01bc2B73040x...", // arbitrum
  8453: "0xD1fbD6Efd5A46f2BC4B21545Ad186BFeaE338E03", // base
};

// export type ContractName = keyof typeof COUNTER_ADDRESS_BY_CHAIN;

// export function getContractAddress(contractName: ContractName, chainId = 1) {
//   const addresses = COUNTER_ADDRESS_BY_CHAIN[contractName];
//   if (!addresses[chainId as keyof typeof addresses]) {
//     throw new Error(`Contract ${contractName} not deployed on chain ${chainId}`);
//   }
//   return addresses[chainId as keyof typeof addresses];
// }
