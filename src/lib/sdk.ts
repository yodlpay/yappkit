import YappSDK from "@yodlpay/yapp-sdk";

// Single instance that can be imported anywhere
export const sdk = new YappSDK({
  ensName: "kitchensink-yapp.yodl.eth",
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/"
      : "https://dapp-git-feat-superapp-poc-yodl.vercel.app/",
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // ES256 PEM encoded public key
});
