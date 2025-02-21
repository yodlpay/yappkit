import { SupportedChainId } from "@/types";
import { getChains } from "@yodlpay/tokenlists";
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";

export const accentColor = "teal";

export const CHAINID_TO_VIEM_CHAIN = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [optimism.id]: optimism,
  [arbitrum.id]: arbitrum,
  [base.id]: base,
};
export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINID_TO_VIEM_CHAIN).map(
  Number
) as SupportedChainId[];

export const SUPPORTED_CHAINS = getChains().filter((chain) =>
  SUPPORTED_CHAIN_IDS.includes(chain.chainId as SupportedChainId)
);

export const YODL_UI_URL = "https://yodl.me";
export const INDEXER_URL = "https://tx.yodl.me/api/v1";

export const EXPLORERLINK_BY_CHAINID: Partial<Record<SupportedChainId, string>> = {
  [polygon.id]: "https://polygonscan.com/tx",
  [arbitrum.id]: "https://arbiscan.io/tx",
  [base.id]: "https://basescan.org/tx",
};
