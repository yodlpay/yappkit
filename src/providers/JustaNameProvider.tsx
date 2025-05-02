import {
  JustaNameProvider as JustaNameProviderImport,
  JustaNameProviderConfig,
} from "@justaname.id/react";
import { mainnet } from "viem/chains";

export const JustaNameProvider = ({ children }: { children: React.ReactNode }) => {
  const justaNameConfig: JustaNameProviderConfig = {
    config: {
      origin: process.env.NEXT_PUBLIC_YAPP_URL,
      domain: process.env.NEXT_PUBLIC_YAPP_DOMAIN,
      signInTtl: 120000,
    },
    networks: [
      {
        chainId: 1,
        providerUrl: mainnet.rpcUrls.default.http[0],
      },
    ],
  };

  return <JustaNameProviderImport config={justaNameConfig}>{children}</JustaNameProviderImport>;
};
