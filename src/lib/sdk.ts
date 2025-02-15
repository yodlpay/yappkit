import YappSDK from "@yodl/yapp-sdk";

// Single instance that can be imported anywhere
export const sdk = new YappSDK({
  ensName: "kitchensink.yodl.eth",
  // origin: "https://my-test-env.dev",
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // ES256 PEM encoded public key
});
