import {
  JustaNameProvider as JustaNameProviderImport,
  JustaNameProviderConfig,
} from "@justaname.id/react";
import { mainnet } from "viem/chains";

// export const ORIGIN = "https://yodl.me";
// export const DOMAIN = "yodl.me";
export const ORIGIN = "http://localhost:3000";
export const DOMAIN = "localhost:3000";

export const JustaNameProvider = ({ children }: { children: React.ReactNode }) => {
  const justaNameConfig: JustaNameProviderConfig = {
    config: {
    //   origin: ORIGIN,
    //   domain: DOMAIN,
      signInTtl: 120000,
    },
    networks: [
      {
        chainId: 1,
        providerUrl: mainnet.rpcUrls.default.http[0],
      },
    ],
    ensDomains: [
      {
        chainId: mainnet.id,
        ensDomain: "yodl.eth",
      },
    ],
  };

  return <JustaNameProviderImport config={justaNameConfig}>{children}</JustaNameProviderImport>;
};
