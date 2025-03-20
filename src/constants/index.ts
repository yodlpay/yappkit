export * from "./chain";
export * from "./counterContract";
export * from "./publicEnsResolverContract";

export const CONFIG = {
  YAPP_URL: process.env.NEXT_PUBLIC_YAPP_URL,
  YAPP_ENS_NAME: process.env.NEXT_PUBLIC_YAPP_ENS_NAME,
  YAPP_DOMAIN: process.env.NEXT_PUBLIC_YAPP_DOMAIN,
  PARENT_URL: process.env.NEXT_PUBLIC_PARENT_URL,
  INDEXER_URL: "https://tx.yodl.me/api/v1",
  IS_DEV: process.env.NODE_ENV === "development",
};

export const accentColor = "iris";
export const accentGradient = "bg-gradient-to-r from-blue-500 to-purple-500";
