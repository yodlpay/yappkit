// "use client";

// import { SUPPORTED_CHAINS } from "@/constants";
// // import { defaultPublicRpc } from "@frontend/utils/env.client";
// import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
// import { argentWallet, ledgerWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
// import { Address, Chain, http } from "viem";
// import { Config, cookieStorage, createStorage } from "wagmi";

// const walletConnectMeta = {
//   appName: "yodl",
//   appDescription: "yodl",
//   // required by wallet connect. if it does not match, then some wallets
//   // will show a nasty warning. You have to enable verify api on walletconnect cloud.
//   appUrl: "https://yodl.me",
//   // TODO: Move elsewhere
//   appIcon: "https://framerusercontent.com/images/AAmKW17l9jseK4hJPDy2uYxVEdU.png",
// };

// export const generateWagmiConfig = (): Config => {
//   const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

//   const createTransports = () => {
//     return Object.fromEntries(SUPPORTED_CHAINS.map(chain => [chain.id, http()]));
//   };

//   const transports = createTransports();
//   const { wallets } = getDefaultWallets();

//   const myWallets = [
//     ...wallets.map(wallet => ({ ...wallet, shimDisconnect: true })),
//     {
//       groupName: "Other",
//       wallets: [argentWallet, trustWallet, ledgerWallet],
//     },
//   ];

//   // Get origin safely accounting for SSR
//   const origin = typeof window !== "undefined" ? window?.location?.origin : "";

//   const wagmiConfig = getDefaultConfig({
//     chains: SUPPORTED_CHAINS,
//     transports,
//     multiInjectedProviderDiscovery: true,
//     projectId,
//     ...walletConnectMeta,
//     ssr: true,
//     storage: createStorage({
//       storage: cookieStorage,
//     }),
//     wallets: myWallets,
//     appIcon: `${origin}/assets/images/yodl_512.png`,
//   });

//   return wagmiConfig;
// };
