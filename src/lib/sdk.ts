import YappSDK, { isInIframe } from "@yodlpay/yapp-sdk";

console.log("🚀 process.env.NODE_ENV:", process.env.NODE_ENV);
// Single instance that can be imported anywhere
export const sdk = new YappSDK({
  ensName: "kitchensink-yapp.yodl.eth",
  // origin: "https://yodl.me",
  origin: process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "https://dapp-git-feat-superapp-poc-yodl.vercel.app/",
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // ES256 PEM encoded public key
});
