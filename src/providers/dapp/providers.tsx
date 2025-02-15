// "use client";

// import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { ReactNode, useMemo } from "react";
// import { WagmiProvider } from "wagmi";

// import { generateWagmiConfig } from "./rainbowkit";

// type ProvidersProps = {
//   children: ReactNode;
// };

// export function Providers({ children }: ProvidersProps) {
//   const rainbowTheme = darkTheme();

//   const wagmiConfig = useMemo(() => generateWagmiConfig(), []);

//   return (
//     <WagmiProvider
//       config={wagmiConfig}
//       reconnectOnMount={true}
//       // initialState={}
//     >
//       {/* <QueryClientProvider client={queryClient}> */}
//       <RainbowKitProvider theme={rainbowTheme}>{children}</RainbowKitProvider>
//       {/* </QueryClientProvider> */}
//     </WagmiProvider>
//   );
// }
