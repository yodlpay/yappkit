import { getChains } from "@yodlpay/tokenlists";

export const SUPPORTED_CHAINS = getChains().filter(chain => ![56, 100].includes(chain.chainId));
export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map(chain => chain.chainId);
export const YODL_UI_URL = "https://yodl.me";
export const INDEXER_URL = "https://tx.yodl.me/api/v1";
