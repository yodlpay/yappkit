import { CHAINID_TO_VIEM_CHAIN, SUPPORTED_CHAIN_IDS } from "@/constants";

export type SupportedChainId = keyof typeof CHAINID_TO_VIEM_CHAIN;
