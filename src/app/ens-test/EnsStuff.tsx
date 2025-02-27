import { Button, Code, Flex, Text, TextField } from "@radix-ui/themes";
import { getEnsText, normalize } from "viem/ens";
import { useEnsText, useAccount, useSwitchChain } from "wagmi";
import { useState, useEffect, useMemo } from "react";
import { getPublicClientByChainId } from "@/lib/viem";
import { Address } from "viem";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  // useIsSubnameAvailable,
  useUpdateSubname,
  UseSubnameUpdateFunctionParams,
} from "@justaname.id/react";

export const EnsStuff = () => {
  const [ensTexts, setEnsTexts] = useState<Record<string, any>>({});
  const [resolverSupport, setResolverSupport] = useState<Record<string, boolean>>({});

  const { updateSubname, isUpdateSubnamePending: isUpdating } = useUpdateSubname();
  const { address, isConnected, chain } = useAccount();
  const { switchChainAsync, isPending: switchChainPending } = useSwitchChain();

  const client = getPublicClientByChainId(1);

  const ensNames = useMemo(
    () => [
      "andy.yodl.eth",
      "yodlmeister.eth",
      "billme.eth",
      "deposit.yodl.eth",
      "laurids.yodl.eth",
    ],
    []
  );

  const handleUpdateEns = async (ens: string = "andy.yodl.eth") => {
    if (!isConnected || !address) {
      console.log("Wallet not connected");
      return;
    }

    if (chain?.id !== 1) await switchChainAsync({ chainId: 1 });

    const ensText = await client.getEnsText({
      name: normalize(ens),
      key: "me.yodl",
    });
    console.log("🚀 ensText:", ensText);

    const ensTextAsObject: Record<string, any> = ensText ? JSON.parse(ensText) : {};

    console.log("🚀 ensTextAsObject:", ensTextAsObject);

    const newText = {
      "me.yodl": JSON.stringify({
        ...ensTextAsObject,
        webhooks: [...(ensTextAsObject.webhooks || []), "https://webhook.site/1234567890"],
      }),
    };

    console.log("🚀 newText:", newText);

    const params: UseSubnameUpdateFunctionParams = {
      text: newText,
      ens: normalize(ens),
    };

    try {
      await updateSubname(params);
    } catch (error) {
      console.error("🚀 error:", error);
    }
    console.log("🚀 ens:", ens);
  };

  const handleSupportsText = async (resolverAddress: Address) => {
    const supports = await client.readContract({
      address: resolverAddress,
      abi: [
        {
          inputs: [{ internalType: "bytes4", name: "interfaceID", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "pure",
          type: "function",
        },
      ],
      functionName: "supportsInterface",
      args: ["0x10f13a8c"],
    });
    console.log("🚀 supports:", supports);
  };

  // useEffect(() => {
  //   const getEnsText = async () => {
  //     const ensTextResults = await Promise.all(
  //       ensNames.map(async (ensName) => {
  //         const resolverAddress = await client.getEnsResolver({
  //           name: normalize(ensName),
  //         });
  //         console.log("🚀 resolverAddress:", resolverAddress);

  //         // Check if resolver supports text records
  //         let supportsText = false;
  //         if (resolverAddress) {
  //           try {
  //             const supports = await client.readContract({
  //               // address: resolverAddress,
  //               address: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
  //               abi: [
  //                 {
  //                   inputs: [{ internalType: "bytes4", name: "interfaceID", type: "bytes4" }],
  //                   name: "supportsInterface",
  //                   outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //                   stateMutability: "view",
  //                   type: "function",
  //                 },
  //               ],
  //               functionName: "supportsInterface",
  //               args: ["0x10f13a8c"],
  //               // args: ["0x59d1d43c"],
  //               // args: ["0xc7c3268b"],
  //             });
  //             console.log("🚀 supports:", supports);
  //             supportsText = supports as boolean;
  //           } catch (error) {
  //             console.error(`Failed to check interface support for ${ensName}:`, error);
  //           }
  //         }

  //         const ensText = await client.getEnsText({
  //           name: normalize(ensName),
  //           key: "me.yodl",
  //         });
  //         const ensText2 = await client.getEnsText({
  //           name: normalize(ensName),
  //           key: "me.yodl.preferences",
  //         });
  //         console.log("🚀 ensText2:", ensText2);

  //         return { ensName, ensText, resolverAddress, supportsText };
  //       })
  //     );

  //     const textRecord = ensTextResults.reduce(
  //       (acc, { ensName, ensText, resolverAddress, supportsText }) => {
  //         if (ensText) {
  //           acc[ensName] = { ensText, resolverAddress };
  //         }
  //         return acc;
  //       },
  //       {} as Record<string, { ensText: string | object; resolverAddress: string }>
  //     );

  //     // Store resolver support information
  //     const supportRecord = ensTextResults.reduce((acc, { ensName, supportsText }) => {
  //       acc[ensName] = supportsText;
  //       return acc;
  //     }, {} as Record<string, boolean>);

  //     setEnsTexts(textRecord);
  //     setResolverSupport(supportRecord);
  //   };
  //   getEnsText();
  // }, [ensNames]);

  const isLoading = switchChainPending || isUpdating;

  return (
    <Flex direction="column" gap="4">
      {Object.entries(ensTexts).map(([ensName, { ensText, resolverAddress }]) => (
        <Flex key={ensName} direction="column" gap="2">
          <Text>{ensName}</Text>
          <Text>{ensText}</Text>
          <Text>
            <Code>{resolverAddress}</Code>
          </Text>
          <Text>Supports Text Records: {resolverSupport[ensName] ? "Yes" : "No"}</Text>
        </Flex>
      ))}

      <Flex>
        <TextField.Root placeholder="Resolver Address">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button onClick={() => handleSupportsText("0x0000000000000000000000000000000000000000")}>
          Test
        </Button>
      </Flex>

      <Flex>
        <Button onClick={() => handleUpdateEns()} disabled={!isConnected || isLoading}>
          {isLoading ? (switchChainPending ? "Switching Network..." : "Updating...") : "Update ENS"}
        </Button>
      </Flex>
    </Flex>
  );
};
