import { getChains } from "@yodlpay/tokenlists";
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";

export const CHAINID_TO_VIEM_CHAIN = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [optimism.id]: optimism,
  [arbitrum.id]: arbitrum,
  [base.id]: base,
};
export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINID_TO_VIEM_CHAIN).map(Number);
export const SUPPORTED_CHAINS = getChains().filter((chain) =>
  SUPPORTED_CHAIN_IDS.includes(chain.chainId)
);

export const YODL_UI_URL = "https://yodl.me";
export const INDEXER_URL = "https://tx.yodl.me/api/v1";
