import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <>
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="py-1 px-2 rounded-md border-2 [border-image:linear-gradient(to_right,var(--light-purple),var(--deep-purple))_1]"
                    >
                      <Text size="3" className="font-bold">
                        Connect
                      </Text>
                    </button>
                  </>
                  //   <Button
                  //     // className={accentGradient}
                  //     className='!border-2 !border-red-500'
                  //     // variant='outline'
                  //     variant='ghost'
                  //     onClick={openConnectModal}
                  //     type='button'>
                  //     <Text size='3' className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
                  //       Connect
                  //     </Text>
                  //   </Button>
                );
              }
              if (chain?.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <Flex gap="2">
                  <Button onClick={openChainModal} variant="outline">
                    {chain?.iconUrl ? (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name ?? "Chain icon"}
                        style={{ width: 12, height: 12 }}
                      />
                    ) : (
                      <GearIcon />
                    )}
                    {/* {chain?.name} */}
                  </Button>
                  <Button onClick={openAccountModal} variant="outline">
                    <PersonIcon />
                    {account?.displayName}
                  </Button>
                </Flex>
                // <div style={{ display: "flex", gap: 12 }}>
                //   <button onClick={openChainModal} style={{ display: "flex", alignItems: "center", backgroundColor: "red" }} type='button'>
                //     {chain?.hasIcon && (
                //       <div
                //         style={{
                //           background: chain?.iconBackground,
                //           width: 12,
                //           height: 12,
                //           borderRadius: 999,
                //           overflow: "hidden",
                //           marginRight: 4,
                //         }}>
                //         {chain.iconUrl && <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 12, height: 12 }} />}
                //       </div>
                //     )}
                //     {chain?.name}
                //   </button>
                //   <button onClick={openAccountModal} type='button'>
                //     {account?.displayName}
                //     Lalalalala
                //     {account?.displayBalance ? ` (${account?.displayBalance})` : ""}
                //   </button>
                // </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
