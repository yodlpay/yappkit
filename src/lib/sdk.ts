import YappSDK from "@yodlpay/yapp-sdk";

// Single instance that can be imported anywhere
export const sdk = new YappSDK({
  ensName: "kitchensink.yodl.eth",
  // origin: "http://localhost:3001",
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // ES256 PEM encoded public key
});


// origin: config.origin || 'https://yodl.me',
// ensName: config.ensName,
// publicKey: config.publicKey || YODL_PUBLIC_KEY,
