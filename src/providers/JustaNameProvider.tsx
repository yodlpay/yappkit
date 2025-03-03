import {
  JustaNameProvider as JustaNameProviderImport,
  JustaNameProviderConfig,
} from "@justaname.id/react";
import { mainnet } from "viem/chains";
import { CONFIG } from "@/constants";

export const JustaNameProvider = ({ children }: { children: React.ReactNode }) => {
  const justaNameConfig: JustaNameProviderConfig = {
    config: {
      origin: CONFIG.IS_DEV ? "http://localhost:3000" : CONFIG.YAPP_URL,
      domain: CONFIG.IS_DEV ? "localhost:3000" : CONFIG.YAPP_DOMAIN,
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
