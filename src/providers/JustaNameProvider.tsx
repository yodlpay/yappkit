import {
  JustaNameProvider as JustaNameProviderImport,
  JustaNameProviderConfig,
} from "@justaname.id/react";
import { base, mainnet } from "viem/chains";

export const originProd = "https://kitchensink-yapp.vercel.app";
export const domainProd = "kitchensink-yapp.vercel.app";
export const originDev = "http://localhost:3000";
export const domainDev = "localhost:3000";
export const ORIGIN = process.env.NODE_ENV === "production" ? originProd : originDev;
export const DOMAIN = process.env.NODE_ENV === "production" ? domainProd : domainDev;

export const JustaNameProvider = ({ children }: { children: React.ReactNode }) => {
  const justaNameConfig: JustaNameProviderConfig = {
    config: {
      origin: ORIGIN,
      domain: DOMAIN,
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
