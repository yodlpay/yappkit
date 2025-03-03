import { Address } from "viem";

export const COUNTER_ADDRESS_BY_CHAIN: Record<number, Address> = {
  137: "0xD54D2eFA7617e62ec133527c65dD178980c26CB4", // polygon
  42161: "0x006b0B8D00b9C632b5B44a42DCbd5D01bc2B73040x...", // arbitrum
  8453: "0xD1fbD6Efd5A46f2BC4B21545Ad186BFeaE338E03", // base
};

export const COUNTER_ABI = [
  { inputs: [], name: "increment", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "number",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newNumber", type: "uint256" }],
    name: "setNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
