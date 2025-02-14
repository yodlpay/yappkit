export type SourceType = "wallet" | "exchange" | "other";

export type Source = {
  id: string;
  name: string;
  icon: string;
  description: string;
  sourceType: SourceType;
  supportsMobile: boolean;
  supportsExtension: boolean;
  link: {
    mobile: string | ((ensOrAddress: string) => string);
    web: string;
  };
};

export type SourceConfig = {
  [K in SourceType]: Source[];
};

export const SOURCE_HEADERS: Record<SourceType, string> = {
  wallet: "Transfer from a wallet.",
  exchange: "Transfer from a centralized exchange.",
  other: "Transfer from other apps.",
};

export const SOURCES: SourceConfig = {
  wallet: [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "/icons/metamask-icon.svg",
      description: "Send tokens from MetaMask",
      sourceType: "wallet",
      supportsExtension: true,
      supportsMobile: true,
      link: {
        mobile: (ensName: string) => `dapp://yodl.me/${ensName}`,
        web: "https://metamask.app.link/",
      },
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: "/icons/phantom-icon.svg",
      description: "Send tokens from Phantom wallet",
      sourceType: "wallet",
      supportsExtension: true,
      supportsMobile: true,
      link: {
        mobile: (ensName: string) =>
          `https://phantom.app/ul/browse/${encodeURIComponent(`https://yodl.me/${ensName}`)}?ref=${encodeURIComponent("yodl.me")}`,
        web: "https://phantom.com/download",
      },
    },
    {
      id: "trustwallet",
      name: "TrustWallet",
      icon: "/icons/trustwallet-icon.svg",
      description: "Send tokens from Trust Wallet",
      sourceType: "wallet",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: (ensName: string) => `https://link.trustwallet.com/open_url?url=yodl.me/${ensName}`,
        web: "https://link.trustwallet.com/",
      },
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "/icons/coinbase-icon.svg",
      description: "Send tokens from Coinbase Wallet",
      sourceType: "wallet",
      supportsExtension: true,
      supportsMobile: true,
      link: {
        mobile: (ensName: string) => `https://go.cb-w.com/dapp?cb_url=yodl.me/${ensName}`,
        web: "https://wallet.coinbase.com/",
      },
    },
  ],
  exchange: [
    {
      id: "binance",
      name: "Binance",
      icon: "/icons/binance-icon.svg",
      description: "Send tokens from your Binance account",
      sourceType: "exchange",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: "bnc://app.binance.com/accounts/spot",
        web: "https://www.binance.com/en/my/wallet/account/main",
      },
    },
    {
      id: "mexc",
      name: "MEXC",
      icon: "/icons/mexc-icon.svg",
      description: "Send tokens from your MEXC account",
      sourceType: "exchange",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: "https://www.mexc.co/download",
        web: "https://www.mexc.com/assets/withdraw",
      },
    },
    {
      id: "bybit",
      name: "Bybit",
      icon: "/icons/bybit-icon.png",
      description: "Send tokens from your Bybit account",
      sourceType: "exchange",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: "https://bybit.onelink.me/EhY6/u3l3x25k",
        web: "https://www.bybit.com/app/assets/spot",
      },
    },
  ],
  other: [
    {
      id: "revolut",
      name: "Revolut",
      icon: "/icons/revolut-icon.svg",
      description: "Send tokens from your Revolut account",
      sourceType: "other",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: "revolut://app",
        web: "https://app.revolut.com/crypto",
      },
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "/icons/paypal-icon.svg",
      description: "Send tokens from your PayPal account",
      sourceType: "other",
      supportsExtension: false,
      supportsMobile: true,
      link: {
        mobile: "paypal://crypto",
        web: "https://www.paypal.com/myaccount/crypto",
      },
    },
  ],
};
